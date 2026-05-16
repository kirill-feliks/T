import { createClient } from "@supabase/supabase-js";
import { env, publicEnv } from "./env";
export function supabaseBrowser() { const e = publicEnv(); return createClient(e.url, e.anon); }
export function supabaseAdmin() { const e = env(); return createClient(e.NEXT_PUBLIC_SUPABASE_URL, e.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } }); }
