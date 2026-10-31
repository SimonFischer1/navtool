// NavTool Admin API. Deploy with Supabase Edge Functions; never expose SUPABASE_SERVICE_ROLE_KEY in browser code.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
const ADMIN_EMAIL = "fischersimonluca@icloud.com";
const cors = { "Access-Control-Allow-Origin": "https://navtool.de", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return reply({ error: "Anmeldung erforderlich." }, 401);
  const url = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authClient = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error: authError } = await authClient.auth.getUser(token);
  if (authError || !user || user.email?.toLowerCase() !== ADMIN_EMAIL || !user.email_confirmed_at) return reply({ error: "Kein Administratorzugriff." }, 403);
  const admin = createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
  try {
    const input = await req.json();
    if (input.action === "list") {
      const users: any[] = []; let page = 1; const perPage = 100;
      while (true) { const { data, error } = await admin.auth.admin.listUsers({ page, perPage }); if (error) throw error; users.push(...data.users); if (data.users.length < perPage || users.length >= data.total) break; page++; }
      const profiles = await admin.from("profiles").select("id,name");
      if (profiles.error) throw profiles.error;
      const names = new Map((profiles.data || []).map((p: any) => [p.id, p.name]));
      return reply({ total: users.length, users: users.map(u => ({ id: u.id, email: u.email, name: names.get(u.id) || u.user_metadata?.name || "", created_at: u.created_at, last_sign_in_at: u.last_sign_in_at, email_confirmed_at: u.email_confirmed_at })) });
    }
    if (typeof input.id !== "string") return reply({ error: "Ungültige Konto-ID." }, 400);
    if (input.id === user.id && ["delete"].includes(input.action)) return reply({ error: "Das eigene Administratorkonto kann hier nicht gelöscht werden." }, 400);
    if (input.action === "update") {
      const email = String(input.email || "").trim().toLowerCase(); const name = String(input.name || "").trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || name.length > 120) return reply({ error: "Bitte eine gültige E-Mail-Adresse und einen Namen mit maximal 120 Zeichen eingeben." }, 400);
      const { error: updateError } = await admin.auth.admin.updateUserById(input.id, { email, user_metadata: { name } }); if (updateError) throw updateError;
      const { error: profileError } = await admin.from("profiles").upsert({ id: input.id, name }, { onConflict: "id" }); if (profileError) throw profileError;
      return reply({ ok: true });
    }
    if (input.action === "password") {
      if (typeof input.password !== "string" || input.password.length < 8 || input.password.length > 128) return reply({ error: "Das Passwort muss 8 bis 128 Zeichen lang sein." }, 400);
      const { error } = await admin.auth.admin.updateUserById(input.id, { password: input.password }); if (error) throw error; return reply({ ok: true });
    }
    if (input.action === "delete") { const { error } = await admin.auth.admin.deleteUser(input.id); if (error) throw error; return reply({ ok: true }); }
    return reply({ error: "Unbekannte Aktion." }, 400);
  } catch (error) { console.error("admin-users failure", error); return reply({ error: error instanceof Error ? error.message : "Interner Fehler." }, 500); }
});
