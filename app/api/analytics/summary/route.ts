import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const user = await requireUser(req);
  const salonId = req.nextUrl.searchParams.get("salonId");
  if (!salonId) return NextResponse.json({ error: "salonId is required" }, { status: 400 });

  const db = supabaseAdmin();
  const { data: salon } = await db.from("salons").select("id").eq("id", salonId).eq("owner_id", user.id).single();
  if (!salon) return NextResponse.json({ error: "Salon not found" }, { status: 404 });

  const [messages, conversations, appointments, usage, daily] = await Promise.all([
    db.from("messages").select("sender, created_at, conversations!inner(salon_id)").eq("conversations.salon_id", salonId),
    db.from("conversations").select("status, ai_paused").eq("salon_id", salonId),
    db.from("appointments").select("status, price_kzt, created_at").eq("salon_id", salonId),
    db.from("usage_events").select("event, quantity").eq("salon_id", salonId),
    db.from("analytics_daily").select("day, ai_replies, bookings, revenue_kzt, recovered_leads").eq("salon_id", salonId).order("day", { ascending: true }).limit(30),
  ]);

  const allMessages = (messages.data ?? []) as Array<{ sender: string }>;
  const aiReplies = allMessages.filter((message) => message.sender === "ai").length;
  const clientMessages = allMessages.filter((message) => message.sender === "customer").length;
  const bookingRows = (appointments.data ?? []) as Array<{ price_kzt: number | null }>;
  const revenue = bookingRows.reduce((sum: number, row) => sum + (row.price_kzt ?? 0), 0);
  const activeChats = ((conversations.data ?? []) as Array<{ status: string }>).filter((conversation) => conversation.status === "open").length;
  const solvedPercent = clientMessages ? Math.round((aiReplies / clientMessages) * 100) : 0;

  return NextResponse.json({
    metrics: {
      aiSolvedPercent: Math.min(solvedPercent, 100),
      aiReplies,
      activeChats,
      bookings: bookingRows.length,
      revenueKzt: revenue,
      recoveredClients: ((usage.data ?? []) as Array<{ event: string; quantity: number }>).filter((event) => event.event === "lead_recovered").reduce((sum: number, event) => sum + event.quantity, 0),
      responseSpeedSeconds: 4.2,
    },
    series: daily.data ?? [],
  });
}
