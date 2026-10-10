NAVTOOL CREW — JavaScript/CSS/HTML only (no PHP)

Contents:
- crew/index.html: Crew app
- crew/portal.html: Agent portal for jobs and crew travel pre-bookings
- crew/dashboard/index.html: Captain dashboard, crew accounts, jobs, movements and bridge log
- crew/app.js, crew/styles.css, crew/crew-data.js, crew/crew-lookup.js
- assets/navtool-global.css and assets/navtool-global.js: shared header dependencies

Upload the crew/ and assets/ folders into the root of your GitHub Pages repository, preserving the folder structure.

IMPORTANT: Without a backend, data is stored in localStorage in each browser. It does not synchronize across devices or users. GitHub Pages cannot provide shared online storage by itself. This package intentionally contains no PHP and no API files.

Demo accounts in the starter data:
Crew: max / NavTool1!
Crew: anna / NavTool1!
Captain dashboard: Kapitän / Kapitän1
Change these demo credentials before using the system. Because this is static hosting, client-side login is not secure authentication.
