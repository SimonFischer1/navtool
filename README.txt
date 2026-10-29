NAVTOOL v6 – Website, Offline-App, Status & Admin
Hochladen: Alle Dateien in dein GitHub-Repository (Hauptordner) legen, bestehende ersetzen, CNAME behalten.
Ordner: /app/ Download-Seite · /app/start/ die App · /simulator/ Steering Simulator · /status/ Status · /admin/ Admin-Tool
Bilder: /pic/allgemein/ (Logo, Icons) · /pic/weather/ · /pic/navtext/ · /pic/app/
Konfiguration: /data/config.json (wird vom Admin-Tool geschrieben). Bei Dateiänderungen in sw.js die Version (navtool-app-v10) erhöhen.
Admin: GitHub-Token (Contents: Read & Write) unter Admin > GitHub eintragen, damit "Speichern" ins Repository schreibt.
Besucherzähler: abacus.jasoncameron.dev, Namespace navtool.de.

Neu in v6: Simulator mit Hebel-Maschinentelegraf, Logo im Handrad, grafische Obere Leiste · Cookie-Hinweis (alle Seiten außer Simulator und App; Besucherzähler nur nach Zustimmung) · App-Werbung statt Admin-Link und ohne Impressum · App geräteabhängig (Handy hoch/quer, iPad, Desktop). Das Admin-Tool bleibt unter /admin/ erreichbar, nur ohne Link.

Neu in v7: Footer-Link "Ersteller" (neben Cookies und Status) führt zu /me/ (Über-mich-Website von Simon).

Neu in v10 – SailingApp, Konto und Supabase:
/sailingapp/ = SailingApp (eigene installierbare App, eigener Service Worker, eigene Offline-Daten).
/app/ = Download-Seite für beide Apps (NavTool und SailingApp).
/konto/ = Registrierung, Anmeldung, Dashboard (Reisen mit Mitgliedern, Favoriten, Kalkulationen). Ein Konto gilt für alle Apps auf navtool.de.
Einrichtung: siehe SUPABASE-ANLEITUNG.txt. Pflicht: supabase/schema.sql im Supabase SQL Editor ausführen und den anon-Key in assets/supabase-config.js eintragen.
Bei Dateiänderungen: in sw.js (navtool-app-v13) und sailingapp/sw.js (sailing-v4) die Version erhöhen.
