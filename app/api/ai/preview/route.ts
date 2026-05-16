import { NextRequest, NextResponse } from "next/server";
import { generateSalonReply } from "@/lib/ai";
export async function POST(req: NextRequest) { const body = await req.json(); const reply = await generateSalonReply({ salonId: body.salonId, profile: body.profile, messages: body.messages }); return NextResponse.json({ reply }); }
