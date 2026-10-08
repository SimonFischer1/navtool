# Navtext stations UI — Demo

This update expands the demo for the `navtext` project with invented station areas and a fully self-contained demo map (SVG). Everything is invented for demonstration only — coordinates and station coverage are not authoritative.

What changed
- `assets/navtex-map.svg` — simple invented SVG map used by the demo (no external image needed).
- `navtext-stations.html` — updated to include a "Start Demo" button that cycles languages and storm warnings automatically.
- `assets/stations.js` — now contains more invented stations across the demo map, a randomized demo mode, and the demo control logic.
- `assets/style.css` — small styling for the demo button and improved banner styling.

How to run the demo
1. Open `navtext-stations.html` in a browser. (No extra assets are required; the SVG map is included.)
2. Click station areas to view their demo information.
3. Use "English/Deutsch" to toggle language.
4. Click "Show Storm Warnings" to highlight stations that currently have storm warnings.
5. Click "Start Demo" to let the demo randomly toggle warnings and switch languages every few seconds.

Notes
- The demo is self-contained and safe to include in a website for demonstration or UI testing.
- If you want real, authoritative NAVTEX station boundaries, replace the circle areas with GeoJSON polygons and load real coordinates.

