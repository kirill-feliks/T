import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
export async function POST(req: NextRequest) { const user = await requireUser(req); const body = await req.json(); const { data, error } = await supabaseAdmin().from("salons").insert({ owner_id: user.id, name: body.name, niche: body.niche, employee_name: body.employeeName, communication_style: body.style }).select("id").single(); if (error) return NextResponse.json({ error: error.message }, { status: 400 }); return NextResponse.json({ salonId: data.id }); }
