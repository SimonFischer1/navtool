-- NavTool · Supabase-Schema (einmal im SQL Editor ausführen, danach ist alles startklar)
-- Konten, Reisen mit Mitgliedern, Favoriten und Kalkulationen. Alle Tabellen sind durch Row Level Security geschützt.

create extension if not exists pgcrypto;

-- 1. Profil je Benutzer ------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "profil lesen" on public.profiles;
drop policy if exists "profil aendern" on public.profiles;
create policy "profil lesen" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profil aendern" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- 2. Reisen und Mitglieder ---------------------------------------------------
create table if not exists public.reisen (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  daten jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.reise_mitglieder (
  id uuid primary key default gen_random_uuid(),
  reise_id uuid not null references public.reisen(id) on delete cascade,
  email text not null,
  name text,
  rolle text not null default 'Crew' check (rolle in ('Admin','Kapitän','Crew','Betrachter')),
  user_id uuid references auth.users(id) on delete set null,
  eingeladen_am timestamptz not null default now(),
  unique (reise_id, email)
);
create index if not exists reise_mitglieder_user on public.reise_mitglieder(user_id);
create index if not exists reise_mitglieder_email on public.reise_mitglieder(lower(email));

create or replace function public.is_owner(rid uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.reisen r where r.id = rid and r.owner_id = auth.uid()) $$;
create or replace function public.is_member(rid uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select public.is_owner(rid) or exists (select 1 from public.reise_mitglieder m where m.reise_id = rid and m.user_id = auth.uid()) $$;
create or replace function public.can_edit(rid uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select public.is_owner(rid) or exists (select 1 from public.reise_mitglieder m where m.reise_id = rid and m.user_id = auth.uid() and m.rolle in ('Admin','Kapitän','Crew')) $$;

-- Offene Einladungen (per E-Mail) dem angemeldeten Konto zuordnen
create or replace function public.claim_invites() returns void
language sql security definer set search_path = public as $$
  update public.reise_mitglieder set user_id = auth.uid()
  where user_id is null and lower(email) = lower(auth.jwt() ->> 'email') $$;

alter table public.reisen enable row level security;
alter table public.reise_mitglieder enable row level security;
drop policy if exists "reise lesen" on public.reisen;
drop policy if exists "reise anlegen" on public.reisen;
drop policy if exists "reise aendern" on public.reisen;
drop policy if exists "reise loeschen" on public.reisen;
create policy "reise lesen" on public.reisen for select to authenticated using (public.is_member(id));
create policy "reise anlegen" on public.reisen for insert to authenticated with check (owner_id = auth.uid());
create policy "reise aendern" on public.reisen for update to authenticated using (public.can_edit(id)) with check (public.can_edit(id));
create policy "reise loeschen" on public.reisen for delete to authenticated using (public.is_owner(id));
revoke update on public.reisen from authenticated;
grant update (daten, updated_at) on public.reisen to authenticated;

drop policy if exists "mitglieder lesen" on public.reise_mitglieder;
drop policy if exists "mitglieder anlegen" on public.reise_mitglieder;
drop policy if exists "mitglieder aendern" on public.reise_mitglieder;
drop policy if exists "mitglieder loeschen" on public.reise_mitglieder;
create policy "mitglieder lesen" on public.reise_mitglieder for select to authenticated using (public.is_member(reise_id));
create policy "mitglieder anlegen" on public.reise_mitglieder for insert to authenticated with check (public.is_owner(reise_id) and (user_id is null or user_id = auth.uid()));
create policy "mitglieder aendern" on public.reise_mitglieder for update to authenticated using (public.is_owner(reise_id)) with check (public.is_owner(reise_id));
create policy "mitglieder loeschen" on public.reise_mitglieder for delete to authenticated using (public.is_owner(reise_id));
revoke update on public.reise_mitglieder from authenticated;
grant update (rolle, name) on public.reise_mitglieder to authenticated;

-- 3. Favoriten und Kalkulationen ---------------------------------------------
create table if not exists public.favoriten (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  app text not null default 'navtool',
  titel text not null check (char_length(titel) between 1 and 200),
  url text not null check (char_length(url) <= 500),
  created_at timestamptz not null default now()
);
create table if not exists public.kalkulationen (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  app text not null default 'navtool',
  titel text not null check (char_length(titel) between 1 and 200),
  daten jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.favoriten enable row level security;
alter table public.kalkulationen enable row level security;
drop policy if exists "eigene favoriten" on public.favoriten;
drop policy if exists "eigene kalkulationen" on public.kalkulationen;
create policy "eigene favoriten" on public.favoriten for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "eigene kalkulationen" on public.kalkulationen for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 4. Rechte: anonyme Besucher dürfen nichts lesen oder schreiben -----------------
revoke all on public.profiles, public.reisen, public.reise_mitglieder, public.favoriten, public.kalkulationen from anon;
revoke execute on function public.claim_invites() from public, anon;
grant execute on function public.claim_invites() to authenticated;
