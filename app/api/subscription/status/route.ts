import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { daysLeft, PLANS } from "@/lib/billing";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const user = await requireUser(req);
  const salonId = req.nextUrl.searchParams.get("salonId");
  if (!salonId) return NextResponse.json({ error: "salonId is required" }, { status: 400 });

  const { data, error } = await supabaseAdmin()
    .from("subscriptions")
    .select("*, salons!inner(owner_id)")
    .eq("salon_id", salonId)
    .eq("salons.owner_id", user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!data) return NextResponse.json({ status: "not_started", plan: PLANS.pro, trialDaysLeft: 7 });

  return NextResponse.json({ subscription: data, plan: PLANS[data.plan as keyof typeof PLANS], trialDaysLeft: daysLeft(data.trial_ends_at) });
}
