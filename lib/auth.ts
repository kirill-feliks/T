import { NextRequest } from "next/server";
import { supabaseAdmin } from "./supabase";
export async function requireUser(req: NextRequest) { const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, ""); if (!token) throw new Error("Missing bearer token"); const { data, error } = await supabaseAdmin().auth.getUser(token); if (error || !data.user) throw new Error("Invalid session"); return data.user; }
