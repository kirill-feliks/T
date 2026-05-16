# AruAI Architecture

## Folder structure

```txt
app/                         Next.js 15 App Router screens and route handlers
  api/ai/preview             AI preview endpoint for onboarding demos
  api/integrations/telegram  Telegram token connect + automatic webhook setup
  api/telegram/webhook       Telegram inbound message webhook and AI reply pipeline
  api/training/upload        Chat-history, FAQ and PDF ingestion
  billing                    Pricing page for Free / Pro / Business
  chats                      Realtime-style premium chat workspace
  crm                        Lightweight salon CRM pipeline
  dashboard                  Live AI Business OS metrics
  integrations               Channel integrations page
  onboarding                 Six-step premium salon setup
components/                  Shared premium shell and metric cards
lib/                         Environment, auth, Supabase, AI and training services
supabase/migrations/         PostgreSQL, pgvector and RLS schema
```

## Frontend architecture

The product is mobile-first and intentionally avoids a generic admin-dashboard feel. The UI uses:

- dark graphite base surfaces;
- purple/pink/champagne gradients;
- glassmorphism panels;
- large emotional hero copy;
- live AI activity, chats and booking metrics;
- Telegram-first onboarding for non-technical salon owners.

## Backend architecture

All production logic is implemented as Next.js route handlers:

- `POST /api/onboarding` creates the salon and AI employee for the authenticated Supabase user.
- `POST /api/training/upload` ingests Telegram/WhatsApp/chat/FAQ/PDF files.
- `POST /api/integrations/telegram` stores the Telegram integration and calls Telegram `setWebhook`.
- `POST /api/telegram/webhook` verifies Telegram's secret token, stores customer messages, retrieves relevant knowledge and sends the AI response back to Telegram.
- `POST /api/ai/preview` generates a live onboarding preview using the same RAG pipeline.

## AI training system

The training system is the core product moat:

1. Normalize uploaded salon communication history.
2. Extract quick insights such as tone, price mentions and objections.
3. Chunk real conversations into retrieval-sized passages.
4. Generate OpenAI embeddings with `text-embedding-3-small`.
5. Store vectors in Supabase Postgres with pgvector.
6. Retrieve the most relevant chunks at reply time.
7. Compose a premium salon-administrator system prompt with salon knowledge and customer memory.

## Database architecture

The schema supports:

- owners and salon profiles;
- Telegram integrations;
- training documents and vector chunks;
- customers, conversations and messages;
- appointments;
- persistent customer memories;
- RLS policies for owner-scoped access.

## Deployment checklist

1. Create a Supabase project and run `supabase/migrations/001_initial_schema.sql`.
2. Deploy the Next.js app to Vercel.
3. Add all variables from `.env.example`.
4. Create a Telegram bot in BotFather.
5. Paste the token in the app or call `/api/integrations/telegram`.
6. Upload real salon chat history and test the live preview.
