# AruAI — Premium AI Employee Platform for Beauty Salons

AruAI is a production-ready Next.js 15 SaaS starter for CIS/Kazakhstan beauty salons. Its core differentiation is not prompt templates: it trains an AI salon employee from real Telegram/WhatsApp conversations, FAQs, PDFs and service lists so responses inherit the salon's real tone, prices, objections and booking patterns.

## Product architecture

- **Frontend:** Next.js 15 App Router, TypeScript, TailwindCSS, shadcn-compatible styling primitives, Framer Motion.
- **Backend:** Next.js route handlers, Supabase Auth/Postgres/RLS, pgvector.
- **AI:** OpenAI chat completions, `text-embedding-3-small`, RAG retrieval, persistent customer memory.
- **Integrations:** Telegram bot token onboarding, automatic `setWebhook`, webhook response pipeline.

## Core flows

1. Owner signs up in Supabase Auth.
2. Owner creates a salon and chooses niche, AI name and communication style.
3. Owner uploads real chat history or knowledge documents to `/api/training/upload`.
4. The app extracts training insights, embeds chunks and stores them in `knowledge_chunks`.
5. Owner connects Telegram with `/api/integrations/telegram` by pasting only the bot token.
6. Telegram sends messages to `/api/telegram/webhook`; AruAI retrieves knowledge/memory and replies.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Enable the `vector` extension.
3. Run `supabase/migrations/001_initial_schema.sql`.
4. Copy project URL, anon key and service role key into `.env.local`.

## Telegram setup

1. Create a bot with BotFather and copy the token.
2. In production set `APP_URL` to your Vercel URL and `TELEGRAM_WEBHOOK_SECRET` to a long random value.
3. POST `{ "salonId": "...", "botToken": "..." }` to `/api/integrations/telegram`.
4. The route calls Telegram `setWebhook` automatically.

## What to do next

See the Russian product/operator guide in [`docs/product-next-steps.ru.md`](docs/product-next-steps.ru.md). It explains what the SaaS can currently do, what to build next, MVP acceptance criteria, and the first commercial launch path for salons.

## Deployment

Deploy to Vercel, add the environment variables from `.env.example`, then run the Supabase migration. No custom server is required.
