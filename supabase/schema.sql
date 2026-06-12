-- ── Frontdesk AI — database schema ─────────────────────────────────────────
-- Run this once in Supabase → SQL Editor → New query → paste → Run.

-- Each signed-in user owns chatbots; each chatbot collects leads.

create table if not exists chatbots (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users(id) on delete cascade,
  name text not null,
  business_name text not null,
  greeting text not null default 'Hi! How can I help you today?',
  knowledge text not null default '',           -- pasted hours/services/FAQ
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid not null references chatbots(id) on delete cascade,
  name text,
  contact text,
  intent text,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  owner uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'none',            -- none | starter | pro | agency
  status text not null default 'inactive',      -- active | inactive | canceled
  stripe_customer text,
  updated_at timestamptz not null default now()
);

-- ── Row Level Security: owners only see their own data ─────────────────────
alter table chatbots enable row level security;
alter table leads enable row level security;
alter table subscriptions enable row level security;

create policy "own bots" on chatbots
  for all using (auth.uid() = owner) with check (auth.uid() = owner);

create policy "own leads" on leads
  for select using (
    exists (select 1 from chatbots b where b.id = leads.bot_id and b.owner = auth.uid())
  );

create policy "own sub" on subscriptions
  for select using (auth.uid() = owner);

-- The public chat endpoint and Stripe webhook write using the service-role key,
-- which bypasses RLS, so no insert policies are needed for those paths.
