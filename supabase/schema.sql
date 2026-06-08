-- ╔══════════════════════════════════════════════════════════════╗
-- ║  finggu-life — Supabase Database Schema                     ║
-- ║  Run this in: Supabase Dashboard → SQL Editor → Run         ║
-- ║  By Finggu (finggu.com)                                     ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ── Enable UUID extension ─────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── User profiles ─────────────────────────────────────────────────────────────
create table if not exists finggu_profiles (
  id            uuid references auth.users on delete cascade primary key,
  email         text,
  display_name  text,
  monthly_income numeric(15,2) default 0,
  reminder_days  integer default 5,
  lang           text default 'en',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Expenses ──────────────────────────────────────────────────────────────────
create table if not exists finggu_expenses (
  id          text primary key,            -- client-generated (Date.now())
  user_id     uuid references auth.users on delete cascade not null,
  type        text not null check (type in ('expense','income')),
  amount      numeric(15,2) not null,
  description text not null,
  category    text not null,
  date        date not null,
  month       text not null,              -- 'YYYY-MM'
  member_id   text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── EMIs ──────────────────────────────────────────────────────────────────────
create table if not exists finggu_emis (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade not null,
  name        text not null,
  bank        text,
  amount      numeric(15,2) not null,
  total       numeric(15,2) default 0,
  paid        numeric(15,2) default 0,
  due_day     integer,
  tenure      integer,
  rate        numeric(5,2),
  start_date  date,
  active      boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Bills ─────────────────────────────────────────────────────────────────────
create table if not exists finggu_bills (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade not null,
  name        text not null,
  amount      numeric(15,2) not null,
  due_day     integer not null,
  icon        text,
  recurrence  text default 'monthly',
  paid        boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Savings Goals ─────────────────────────────────────────────────────────────
create table if not exists finggu_goals (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade not null,
  name        text not null,
  target      numeric(15,2) not null,
  saved       numeric(15,2) default 0,
  deadline    date,
  emoji       text default '🎯',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Family Members ────────────────────────────────────────────────────────────
create table if not exists finggu_members (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade not null,
  name        text not null,
  icon        text default '👤',
  budget      numeric(15,2) default 0,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- ── Custom Categories ─────────────────────────────────────────────────────────
create table if not exists finggu_categories (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade not null,
  label       text not null,
  icon        text not null,
  color       text not null,
  type        text default 'expense',
  is_hidden   boolean default false,      -- for hiding default categories
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- ── Sync log (for conflict resolution) ───────────────────────────────────────
create table if not exists finggu_sync_log (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references auth.users on delete cascade not null,
  synced_at   timestamptz default now(),
  device_info text
);

-- ══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY — users can only see their own data
-- ══════════════════════════════════════════════════════════════

alter table finggu_profiles   enable row level security;
alter table finggu_expenses   enable row level security;
alter table finggu_emis       enable row level security;
alter table finggu_bills      enable row level security;
alter table finggu_goals      enable row level security;
alter table finggu_members    enable row level security;
alter table finggu_categories enable row level security;
alter table finggu_sync_log   enable row level security;

-- Profiles
create policy "finggu_profiles_own" on finggu_profiles
  for all using (auth.uid() = id);

-- Expenses
create policy "finggu_expenses_own" on finggu_expenses
  for all using (auth.uid() = user_id);

-- EMIs
create policy "finggu_emis_own" on finggu_emis
  for all using (auth.uid() = user_id);

-- Bills
create policy "finggu_bills_own" on finggu_bills
  for all using (auth.uid() = user_id);

-- Goals
create policy "finggu_goals_own" on finggu_goals
  for all using (auth.uid() = user_id);

-- Members
create policy "finggu_members_own" on finggu_members
  for all using (auth.uid() = user_id);

-- Categories
create policy "finggu_categories_own" on finggu_categories
  for all using (auth.uid() = user_id);

-- Sync log
create policy "finggu_sync_own" on finggu_sync_log
  for all using (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════
-- AUTO-UPDATE updated_at trigger
-- ══════════════════════════════════════════════════════════════

create or replace function finggu_fn_update_timestamp()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger finggu_expenses_updated_at   before update on finggu_expenses   for each row execute function finggu_fn_update_timestamp();
create trigger finggu_emis_updated_at       before update on finggu_emis       for each row execute function finggu_fn_update_timestamp();
create trigger finggu_bills_updated_at      before update on finggu_bills      for each row execute function finggu_fn_update_timestamp();
create trigger finggu_goals_updated_at      before update on finggu_goals      for each row execute function finggu_fn_update_timestamp();
create trigger finggu_profiles_updated_at   before update on finggu_profiles   for each row execute function finggu_fn_update_timestamp();

-- ══════════════════════════════════════════════════════════════
-- AUTO-CREATE profile on signup
-- ══════════════════════════════════════════════════════════════

create or replace function finggu_fn_handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into finggu_profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger finggu_on_auth_user_created
  after insert on auth.users
  for each row execute function finggu_fn_handle_new_user();

-- ══════════════════════════════════════════════════════════════
-- INDEXES for performance
-- ══════════════════════════════════════════════════════════════

create index if not exists idx_finggu_expenses_user_month on finggu_expenses(user_id, month);
create index if not exists idx_finggu_expenses_user_date  on finggu_expenses(user_id, date);
create index if not exists idx_finggu_emis_user           on finggu_emis(user_id);
create index if not exists idx_finggu_bills_user          on finggu_bills(user_id);
create index if not exists idx_finggu_goals_user          on finggu_goals(user_id);
create index if not exists idx_finggu_members_user        on finggu_members(user_id);
create index if not exists idx_finggu_categories_user     on finggu_categories(user_id);
