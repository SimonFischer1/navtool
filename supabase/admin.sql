-- NavTool · Admin-Bereich (einmal im Supabase SQL Editor ausführen, NACH schema.sql)
-- Nur Konten in der Tabelle public.admins dürfen unter navtool.de/admin/ Nutzer sehen, ändern und löschen.
-- Die Prüfung passiert hier in der Datenbank, nicht im Browser. Ohne Eintrag liefern alle Funktionen einen Fehler.
-- Passwörter: Supabase speichert sie nur als Hash (bcrypt). Sie lassen sich von niemandem auslesen, auch nicht von dir.
-- Du kannst für jedes Konto ein NEUES Passwort setzen (admin_set_password).

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid()) $$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Liste aller Konten: Name, E-Mail, registriert am, letzte Anmeldung, bestätigt
create or replace function public.admin_list_users()
returns table (id uuid, name text, email text, created_at timestamptz, last_sign_in_at timestamptz, confirmed boolean, is_admin boolean, reisen bigint)
language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'Kein Zugriff' using errcode = '42501'; end if;
  return query
    select u.id,
           coalesce(p.name, u.raw_user_meta_data->>'name', split_part(u.email, '@', 1))::text,
           u.email::text,
           u.created_at,
           u.last_sign_in_at,
           (u.email_confirmed_at is not null),
           exists (select 1 from public.admins a where a.user_id = u.id),
           (select count(*) from public.reisen r where r.owner_id = u.id)
    from auth.users u left join public.profiles p on p.id = u.id
    order by u.created_at desc;
end $$;

-- Name und/oder E-Mail ändern
create or replace function public.admin_update_user(uid uuid, new_name text default null, new_email text default null)
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'Kein Zugriff' using errcode = '42501'; end if;
  if new_name is not null and char_length(btrim(new_name)) between 1 and 120 then
    update public.profiles set name = btrim(new_name) where id = uid;
    update auth.users set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('name', btrim(new_name)) where id = uid;
  end if;
  if new_email is not null and btrim(new_email) <> '' then
    if new_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then raise exception 'Ungültige E-Mail'; end if;
    if exists (select 1 from auth.users x where lower(x.email) = lower(btrim(new_email)) and x.id <> uid) then raise exception 'Diese E-Mail ist schon vergeben'; end if;
    update auth.users set email = lower(btrim(new_email)), email_confirmed_at = coalesce(email_confirmed_at, now()) where id = uid;
    update auth.identities set identity_data = coalesce(identity_data, '{}'::jsonb) || jsonb_build_object('email', lower(btrim(new_email))) where user_id = uid and provider = 'email';
  end if;
end $$;

-- Neues Passwort setzen (das alte kann niemand lesen)
create or replace function public.admin_set_password(uid uuid, new_password text)
returns void language plpgsql security definer set search_path = public, auth, extensions as $$
begin
  if not public.is_admin() then raise exception 'Kein Zugriff' using errcode = '42501'; end if;
  if char_length(coalesce(new_password, '')) < 8 then raise exception 'Das Passwort braucht mindestens 8 Zeichen'; end if;
  update auth.users set encrypted_password = extensions.crypt(new_password, extensions.gen_salt('bf')) where id = uid;
end $$;

-- Konto löschen (Profil, Reisen, Favoriten und Kalkulationen werden mit gelöscht)
create or replace function public.admin_delete_user(uid uuid)
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'Kein Zugriff' using errcode = '42501'; end if;
  if uid = auth.uid() then raise exception 'Das eigene Admin-Konto kann hier nicht gelöscht werden'; end if;
  delete from auth.users where id = uid;
end $$;

revoke execute on function public.admin_list_users(), public.admin_update_user(uuid, text, text), public.admin_set_password(uuid, text), public.admin_delete_user(uuid) from public, anon;
grant execute on function public.admin_list_users(), public.admin_update_user(uuid, text, text), public.admin_set_password(uuid, text), public.admin_delete_user(uuid) to authenticated;

-- ===== SCHRITT FÜR DICH: dein Konto als Admin eintragen =====
-- 1. Auf navtool.de/konto/ mit deinem normalen Konto registrieren (falls noch nicht geschehen).
-- 2. Unten DEINE@EMAIL.DE durch die E-Mail dieses Kontos ersetzen und den Befehl ausführen.
insert into public.admins (user_id)
select id from auth.users where lower(email) = lower('DEINE@EMAIL.DE')
on conflict do nothing;
-- Kontrolle: select a.user_id, u.email from public.admins a join auth.users u on u.id = a.user_id;
