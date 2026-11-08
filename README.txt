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

Neu in v11 – Furuno-Simulatoren: /navtext/ = NAVTEX NX-700 (Gerätebild mit klickbaren Tasten), /navtext/navtext-stations.html = neue Seekarte mit Sendestationen und Empfangsgebieten (Leaflet, Esri Ocean, OpenSeaMap; online nötig), /inmarsat/ = Inmarsat-C FELCOM 15, /simulator/ = Steering mit HAND/NFU/AUTO. Neue Dateien: assets/furuno.js, furuno.css, sim-data.js. sw.js jetzt navtool-app-v14.

Neu in v12 – eine App, Menü, Sprachen, Admin:
/app/ = Download-Seite für EINE App (NavTool inklusive SailingApp). /sailingapp/ hat keine eigene Installation und keinen eigenen Service Worker mehr; sw.js (navtool-app-v15) cached sie mit. Alte SailingApp-Installationen räumen sich beim nächsten Öffnen selbst auf.
Kopfleiste: wenige Kategorien (Navigation, Regeln & Funk, Simulatoren, Segeln), Unterpunkte öffnen beim Darüberfahren. Menü-Einträge stehen in assets/navtool-global.js (const MENU). Rechts: App-Werbung, Sprachwahl DE/EN/FIL mit Drei-Punkte-Knopf für weitere Sprachen, Konto.
Sprachen: Deutsch, English und Filipino laufen komplett offline über assets/i18n-dict.js (Schlüssel = deutscher Originaltext). Weitere Sprachen (Drei-Punkte-Knopf) übersetzt der Browser-Übersetzungsdienst von Google maschinell, dafür ist Internet nötig. COLREG und WEATHER haben eigene englische Inhalte und folgen der gemeinsamen Sprachwahl; Filipino zeigt dort die englischen Fachtexte.
Fehlende Übersetzungen finden: Seite mit ?i18n=debug öffnen, in der Browser-Konsole erscheint die Liste der Texte ohne Übersetzung. Neue Texte einfach als Zeile in assets/i18n-dict.js ergänzen.
Admin (/admin/): Anmeldung mit dem normalen NavTool-Konto, Zugriff nur für Konten in der Tabelle public.admins. Einrichtung: supabase/admin.sql ausführen (E-Mail unten im Skript anpassen). Das feste Passwort im alten Admin-Code ist entfernt.
Bei Dateiänderungen: sw.js Version (navtool-app-v15) erhöhen.

Neu in V13 – Radar-Simulator: /radar/ (Furuno FAR-2228 NXT BB nachempfunden, mit AIS, Parallel Index, EBL/VRM, CPA/TCPA, Zufallsziele). Eingebunden in Menü, App-Kacheln, Suche, sw.js (navtool-app-v16) und data/config.json (Modul radar).

Neu in V14 – App im iOS-Look (große Titel, gruppierte Listen, Tab-Leiste in voller Breite, Wischen zurück), Kategorien in App und Startseite (Navigation, Kalkulation, Simulatoren, Wetter, Regeln), Radar eingebunden, automatischer Offline-Download aller Inhalte (sw.js navtool-app-v17), Radar-Werte per Antippen eintippbar.
