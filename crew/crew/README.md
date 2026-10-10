# NavTool Crew – Ergänzungen

Enthalten sind das bestehende Crew-System plus Auftragsnummern, Reisevormerkungen für An-/Abreise, Kapitänsbestätigung der tatsächlichen Orte und Brückenprotokolle mit LT/UTC, voreingestellten Ereignissen und frei ergänzbaren Zeilen.

- `index.html`: Crew-App
- `portal.html`: Agentenportal für Aufträge und Reisevormerkungen
- `dashboard/index.html`: Kapitäns-Dashboard
- `crew-data.js`: gemeinsamer Daten-Store mit optionaler API-Konfiguration
- `../crew-api/`: PHP-Basis für serverseitige gemeinsame Daten

Wichtig: Ohne konfigurierten PHP-Webspace sind die Daten weiterhin browserlokal. GitHub Pages bietet selbst keine gemeinsame Datenbank. Siehe `../crew-api/README.md`. Die vorhandenen clientseitigen Beispiel-Zugangsdaten sind nicht für einen produktiven Einsatz geeignet.
