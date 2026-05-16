import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { PLANS, PlanKey, trialEndsAt } from "@/lib/billing";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const user = await requireUser(req);
  const { salonId, plan = "pro" } = (await req.json()) as { salonId?: string; plan?: PlanKey };

  if (!salonId) return NextResponse.json({ error: "salonId is required" }, { status: 400 });
  if (!PLANS[plan]) return NextResponse.json({ error: "Unknown plan" }, { status: 400 });

  const db = supabaseAdmin();
  const { data: salon, error: salonError } = await db
    .from("salons")
    .select("id, owner_id")
    .eq("id", salonId)
    .eq("owner_id", user.id)
    .single();

  if (salonError || !salon) return NextResponse.json({ error: "Salon not found" }, { status: 404 });

  const planConfig = PLANS[plan];
  const trialEnd = trialEndsAt(plan);
  const { data, error } = await db
    .from("subscriptions")
    .upsert(
      {
        salon_id: salonId,
        plan,
        status: "trialing",
        trial_ends_at: trialEnd,
        current_period_ends_at: trialEnd,
        limits: planConfig.limits,
      },
      { onConflict: "salon_id" },
    )
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await db.from("usage_events").insert({ salon_id: salonId, event: "trial_started", quantity: 1, metadata: { plan } });

  return NextResponse.json({ subscription: data, checkoutMode: "trial_started", plan: planConfig });
}
