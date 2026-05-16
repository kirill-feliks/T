import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { PLANS, PlanKey, trialEndsAt } from "@/lib/billing";
import { supabaseAdmin } from "@/lib/supabase";

const defaultPlaybooks = [
  { name: "Booking flow", trigger: "client asks for appointment", instructions: "Ask service, preferred day, time and master. Confirm booking clearly and warmly." },
  { name: "Soft upsell", trigger: "client chooses a service", instructions: "Suggest one relevant add-on only when it naturally improves the result." },
  { name: "Lost lead recovery", trigger: "client has not replied", instructions: "Send a gentle follow-up with two available slots and a warm tone." },
];

export async function POST(req: NextRequest) {
  const user = await requireUser(req);
  const body = await req.json();
  const plan = (body.plan ?? "pro") as PlanKey;
  if (!PLANS[plan]) return NextResponse.json({ error: "Unknown plan" }, { status: 400 });

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("salons")
    .insert({
      owner_id: user.id,
      name: body.name || "My Salon",
      niche: body.niche,
      employee_name: body.employeeName,
      communication_style: body.style,
      tone_profile: {
        avatar: body.avatar,
        tone: body.style,
        niche: body.niche,
        launchChecklist: body.launchChecklist ?? [],
      },
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const trialEnd = trialEndsAt(plan);
  await db.from("subscriptions").insert({
    salon_id: data.id,
    plan,
    status: "trialing",
    trial_ends_at: trialEnd,
    current_period_ends_at: trialEnd,
    limits: PLANS[plan].limits,
  });

  await db.from("salon_playbooks").insert(defaultPlaybooks.map((playbook) => ({ ...playbook, salon_id: data.id })));
  await db.from("usage_events").insert({ salon_id: data.id, event: "onboarding_completed", quantity: 1, metadata: { plan, niche: body.niche } });

  return NextResponse.json({ salonId: data.id, subscription: { plan, status: "trialing", trialEndsAt: trialEnd, limits: PLANS[plan].limits } });
}
