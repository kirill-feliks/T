import { z } from "zod";
const schema = z.object({ NEXT_PUBLIC_SUPABASE_URL: z.string().url(), NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20), SUPABASE_SERVICE_ROLE_KEY: z.string().min(20), OPENAI_API_KEY: z.string().min(20), APP_URL: z.string().url().default("http://localhost:3000"), TELEGRAM_WEBHOOK_SECRET: z.string().min(16).default("dev-secret-change-me") });
export function env() { const parsed = schema.safeParse(process.env); if (!parsed.success) throw new Error(`Missing environment: ${parsed.error.issues.map(i=>i.path.join(".")).join(", ")}`); return parsed.data; }
export function publicEnv() { return { url: process.env.NEXT_PUBLIC_SUPABASE_URL!, anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! }; }
