create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references salons(id) on delete cascade unique,
  plan text not null check (plan in ('free', 'pro', 'business')),
  status text not null check (status in ('trialing', 'active', 'past_due', 'canceled')) default 'trialing',
  trial_ends_at timestamptz not null,
  current_period_ends_at timestamptz not null,
  provider text not null default 'manual_kaspi',
  provider_customer_id text,
  limits jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table usage_events (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references salons(id) on delete cascade,
  event text not null,
  quantity integer not null default 1,
  metadata jsonb not null default '{}',
  created_at timestamptz default now()
);

create table analytics_daily (
  salon_id uuid not null references salons(id) on delete cascade,
  day date not null,
  ai_replies integer not null default 0,
  human_replies integer not null default 0,
  client_messages integer not null default 0,
  bookings integer not null default 0,
  recovered_leads integer not null default 0,
  revenue_kzt integer not null default 0,
  avg_response_seconds numeric not null default 0,
  primary key (salon_id, day)
);

create table salon_playbooks (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references salons(id) on delete cascade,
  name text not null,
  trigger text not null,
  instructions text not null,
  enabled boolean not null default true,
  created_at timestamptz default now()
);

alter table subscriptions enable row level security;
alter table usage_events enable row level security;
alter table analytics_daily enable row level security;
alter table salon_playbooks enable row level security;

create policy "owner subscriptions" on subscriptions for all using (exists (select 1 from salons where salons.id = salon_id and salons.owner_id = auth.uid())) with check (exists (select 1 from salons where salons.id = salon_id and salons.owner_id = auth.uid()));
create policy "owner usage events" on usage_events for all using (exists (select 1 from salons where salons.id = salon_id and salons.owner_id = auth.uid())) with check (exists (select 1 from salons where salons.id = salon_id and salons.owner_id = auth.uid()));
create policy "owner analytics" on analytics_daily for all using (exists (select 1 from salons where salons.id = salon_id and salons.owner_id = auth.uid())) with check (exists (select 1 from salons where salons.id = salon_id and salons.owner_id = auth.uid()));
create policy "owner playbooks" on salon_playbooks for all using (exists (select 1 from salons where salons.id = salon_id and salons.owner_id = auth.uid())) with check (exists (select 1 from salons where salons.id = salon_id and salons.owner_id = auth.uid()));

create index usage_events_salon_event_idx on usage_events (salon_id, event, created_at desc);
create index analytics_daily_salon_day_idx on analytics_daily (salon_id, day desc);
