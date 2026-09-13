/* =========================================================
   NAVTOOL MAP
   STABLE ROUTING ENGINE
   ========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

/*
   LEER LASSEN = funktioniert sofort ohne API.

   Wenn du später eine echte SeaRoutes-Seeroute möchtest,
   trägst du hier deine Cloudflare-Worker-URL ein:

   const SEA_PROXY_URL =
       "https://dein-worker.dein-account.workers.dev";

*/

const SEA_PROXY_URL = "";


/* =========================================================
   CONSTANTS
========================================================= */

const NM_IN_KM = 1.852;
const EARTH_RADIUS_KM = 6371.0088;


/* =========================================================
   STATE
========================================================= */

const state = {

    map: null,

    start: {
        lat: 53.5396,
        lon: 9.9899,
        name: "Hamburg"
    },

    destination: {
        lat: 53.5396,
        lon: 8.5809,
        name: "Bremerhaven"
    },

    waypoints: [],

    startMarker: null,

    destinationMarker: null,

    waypointMarkers: [],

    routeLayers: [],

    mode: null,

    lastCalculation: null

};


/* =========================================================
   DOM
========================================================= */

const $ = (id) => document.getElementById(id);

const startInput = $("startInput");
const destinationInput = $("destinationInput");

const startSearchBtn = $("startSearchBtn");
const destinationSearchBtn = $("destinationSearchBtn");

const swapBtn = $("swapBtn");

const setStartMapBtn = $("setStartMapBtn");
const setDestinationMapBtn = $("setDestinationMapBtn");

const addWaypointBtn = $("addWaypointBtn");
const clearWaypointsBtn = $("clearWaypointsBtn");

const calculateBtn = $("calculateBtn");

const speedInput = $("speedInput");
const departureInput = $("departureInput");
const routingMode = $("routingMode");

const errorBox = $("errorBox");

const mapInstruction = $("mapInstruction");

const mapStatus = $("mapStatus");

const mapCoordinates = $("mapCoordinates");

const waypointCounter = $("waypointCounter");

const distanceNm = $("distanceNm");
const distanceKm = $("distanceKm");
const resultSpeed = $("resultSpeed");
const travelTime = $("travelTime");

const etaValue = $("etaValue");
const etaDate = $("etaDate");

const resultStart = $("resultStart");
const resultWaypoints = $("resultWaypoints");
const resultDestination = $("resultDestination");
const resultRouting = $("resultRouting");

const calculationNote = $("calculationNote");

const routeStateText = $("routeStateText");


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setDefaultDeparture();

    initializeMap();

    bindEvents();

});


/* =========================================================
   DEFAULT DEPARTURE
========================================================= */

function setDefaultDeparture() {

    const now = new Date();

    now.setMinutes(
        Math.ceil(now.getMinutes() / 5) * 5
    );

    now.setSeconds(0);
    now.setMilliseconds(0);

    const local = toDateTimeLocalValue(now);

    departureInput.value = local;
}


/* =========================================================
   MAP INITIALIZATION
========================================================= */

function initializeMap() {

    if (typeof L === "undefined") {

        mapStatus.textContent =
            "LEAFLET NICHT GELADEN";

        showError(
            "Die Kartenbibliothek Leaflet konnte nicht geladen werden. " +
            "Bitte prüfe die Internetverbindung bzw. ob der CDN-Aufruf blockiert wird."
        );

        return;
    }


    state.map = L.map("map", {

        zoomControl: true,

        attributionControl: true,

        preferCanvas: false,

        worldCopyJump: true,

        zoomAnimation: true,

        fadeAnimation: true

    });


    /*
       STANDARD OSM TILE SERVER

       Wichtig:
       tile.openstreetmap.org
       nicht irgendein alter / falscher Tile-Pfad.
    */

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            minZoom: 2,

            tileSize: 256,

            keepBuffer: 3,

            updateWhenIdle: false,

            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        }
    ).addTo(state.map);


    /*
       Initiale Ansicht Norddeutschland
    */

    state.map.setView(
        [53.35, 9.15],
        8
    );


    /*
       Kartenstatus
    */

    mapStatus.textContent =
        "KARTE BEREIT";


    /*
       Mauskoordinaten
    */

    state.map.on(
        "mousemove",
        (event) => {

            const lat =
                event.latlng.lat.toFixed(5);

            const lon =
                event.latlng.lng.toFixed(5);

            mapCoordinates.textContent =
                `LAT ${lat} / LON ${lon}`;

        }
    );


    /*
       Kartenklick
    */

    state.map.on(
        "click",
        handleMapClick
    );


    /*
       Marker zeichnen
    */

    renderAllMarkers();


    /*
       Karte auf Start/Ziel setzen
    */

    fitToPoints();


    /*
       Leaflet braucht nach dem Anzeigen
       einen invalidateSize.
    */

    setTimeout(
        () => state.map.invalidateSize(true),
        150
    );

    setTimeout(
        () => state.map.invalidateSize(true),
        700
    );


    /*
       ResizeObserver verhindert,
       dass die Karte nach Responsive-Änderungen
       unsichtbar wird.
    */

    if (window.ResizeObserver) {

        const observer =
            new ResizeObserver(() => {

                if (state.map) {
                    state.map.invalidateSize(true);
                }

            });

        observer.observe(
            document.getElementById("map")
        );

    }

}


/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

    startSearchBtn.addEventListener(
        "click",
        () => searchLocation("start")
    );


    destinationSearchBtn.addEventListener(
        "click",
        () => searchLocation("destination")
    );


    startInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                event.preventDefault();
                searchLocation("start");
            }

        }
    );


    destinationInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                event.preventDefault();
                searchLocation("destination");
            }

        }
    );


    swapBtn.addEventListener(
        "click",
        swapStartDestination
    );


    setStartMapBtn.addEventListener(
        "click",
        () => activateMapMode("start")
    );


    setDestinationMapBtn.addEventListener(
        "click",
        () => activateMapMode("destination")
    );


    addWaypointBtn.addEventListener(
        "click",
        () => activateMapMode("waypoint")
    );


    clearWaypointsBtn.addEventListener(
        "click",
        clearWaypoints
    );


    calculateBtn.addEventListener(
        "click",
        calculateRoute
    );


    /*
       Wenn Speed geändert wird,
       Ergebnis direkt neu berechnen,
       sofern schon eine Route vorhanden ist.
    */

    speedInput.addEventListener(
        "change",
        () => {

            if (state.lastCalculation) {
                calculateRoute();
            }

        }
    );


    departureInput.addEventListener(
        "change",
        () => {

            if (state.lastCalculation) {
                updateTimeResult(
                    state.lastCalculation.distanceNm
                );
            }

        }
    );

}


/* =========================================================
   MAP CLICK
========================================================= */

function handleMapClick(event) {

    if (!state.mode) {
        return;
    }


    const point = {

        lat: event.latlng.lat,

        lon: event.latlng.lng,

        name: ""

    };


    if (state.mode === "start") {

        state.start = point;

        startInput.value =
            formatCoordinateName(point);

        state.mode = null;

        setActiveButton(null);

        renderAllMarkers();

        markRouteDirty();

        return;
    }


    if (state.mode === "destination") {

        state.destination = point;

        destinationInput.value =
            formatCoordinateName(point);

        state.mode = null;

        setActiveButton(null);

        renderAllMarkers();

        markRouteDirty();

        return;
    }


    if (state.mode === "waypoint") {

        if (state.waypoints.length >= 18) {

            showError(
                "Maximal 18 Waypoints können gesetzt werden."
            );

            return;
        }


        state.waypoints.push(point);

        state.mode = null;

        setActiveButton(null);

        renderAllMarkers();

        markRouteDirty();

        return;
    }

}


/* =========================================================
   MAP MODE
========================================================= */

function activateMapMode(mode) {

    if (!state.map) {
        return;
    }

    state.mode = mode;

    setActiveButton(mode);


    if (mode === "start") {

        mapInstruction.textContent =
            "Klicke jetzt auf die Karte, um den START zu setzen.";

    }


    if (mode === "destination") {

        mapInstruction.textContent =
            "Klicke jetzt auf die Karte, um das ZIEL zu setzen.";

    }


    if (mode === "waypoint") {

        mapInstruction.textContent =
            "Klicke jetzt auf die Karte. Jeder Klick setzt einen Waypoint.";

    }

}


function setActiveButton(mode) {

    setStartMapBtn.classList.remove("active");
    setDestinationMapBtn.classList.remove("active");
    addWaypointBtn.classList.remove("active");


    if (mode === "start") {
        setStartMapBtn.classList.add("active");
    }

    if (mode === "destination") {
        setDestinationMapBtn.classList.add("active");
    }

    if (mode === "waypoint") {
        addWaypointBtn.classList.add("active");
    }


    if (!mode) {

        mapInstruction.textContent =
            "Tipp: Klicke auf „Waypoint hinzufügen“ und anschließend auf die Karte. " +
            "Der Punkt kann danach per Drag & Drop verschoben werden.";

    }

}


/* =========================================================
   MARKERS
========================================================= */

function renderAllMarkers() {

    if (!state.map) {
        return;
    }


    /*
       Alte Marker entfernen
    */

    if (state.startMarker) {
        state.map.removeLayer(
            state.startMarker
        );
    }


    if (state.destinationMarker) {
        state.map.removeLayer(
            state.destinationMarker
        );
    }


    state.waypointMarkers.forEach(
        marker => {

            state.map.removeLayer(marker);

        }
    );


    state.waypointMarkers = [];


    /*
       START
    */

    state.startMarker =
        createStartMarker(
            state.start
        );


    state.startMarker.addTo(
        state.map
    );


    /*
       ZIEL
    */

    state.destinationMarker =
        createDestinationMarker(
            state.destination
        );


    state.destinationMarker.addTo(
        state.map
    );


    /*
       WAYPOINTS
    */

    state.waypoints.forEach(
        (point, index) => {

            const marker =
                createWaypointMarker(
                    point,
                    index
                );

            marker.addTo(
                state.map
            );

            state.waypointMarkers.push(
                marker
            );

        }
    );


    updateWaypointCounter();

}


/* =========================================================
   START MARKER
========================================================= */

function createStartMarker(point) {

    const icon =
        L.divIcon({

            className: "",

            html:
                `<div class="nav-marker start-marker">S</div>`,

            iconSize: [26, 26],

            iconAnchor: [13, 13],

            popupAnchor: [0, -13]

        });


    const marker =
        L.marker(
            [point.lat, point.lon],
            {
                icon: icon,

                draggable: true,

                autoPan: true
            }
        );


    marker.bindPopup(
        createPointPopup(
            "START",
            point,
            null
        )
    );


    marker.on(
        "dragend",
        () => {

            const position =
                marker.getLatLng();

            state.start.lat =
                position.lat;

            state.start.lon =
                position.lng;

            startInput.value =
                formatCoordinateName(
                    state.start
                );

            markRouteDirty();

        }
    );


    return marker;
}


/* =========================================================
   DESTINATION MARKER
========================================================= */

function createDestinationMarker(point) {

    const icon =
        L.divIcon({

            className: "",

            html:
                `<div class="nav-marker destination-marker">Z</div>`,

            iconSize: [26, 26],

            iconAnchor: [13, 13],

            popupAnchor: [0, -13]

        });


    const marker =
        L.marker(
            [point.lat, point.lon],
            {
                icon: icon,

                draggable: true,

                autoPan: true
            }
        );


    marker.bindPopup(
        createPointPopup(
            "ZIEL",
            point,
            null
        )
    );


    marker.on(
        "dragend",
        () => {

            const position =
                marker.getLatLng();

            state.destination.lat =
                position.lat;

            state.destination.lon =
                position.lng;

            destinationInput.value =
                formatCoordinateName(
                    state.destination
                );

            markRouteDirty();

        }
    );


    return marker;
}


/* =========================================================
   WAYPOINT MARKER
========================================================= */

function createWaypointMarker(
    point,
    index
) {

    const icon =
        L.divIcon({

            className: "",

            html:
                `<div class="nav-marker waypoint-marker">${index + 1}</div>`,

            iconSize: [26, 26],

            iconAnchor: [13, 13],

            popupAnchor: [0, -13]

        });


    const marker =
        L.marker(
            [point.lat, point.lon],
            {
                icon: icon,

                draggable: true,

                autoPan: true
            }
        );


    marker.bindPopup(
        createPointPopup(
            `WAYPOINT ${index + 1}`,
            point,
            index
        )
    );


    marker.on(
        "dragend",
        () => {

            const position =
                marker.getLatLng();

            state.waypoints[index].lat =
                position.lat;

            state.waypoints[index].lon =
                position.lng;

            markRouteDirty();

        }
    );


    return marker;
}


/* =========================================================
   POPUP
========================================================= */

function createPointPopup(
    title,
    point,
    waypointIndex
) {

    const lat =
        point.lat.toFixed(5);

    const lon =
        point.lon.toFixed(5);


    let html = `

        <div class="popup-title">
            ${title}
        </div>

        <div class="popup-coords">
            ${lat}° / ${lon}°
        </div>

    `;


    if (
        waypointIndex !== null &&
        waypointIndex !== undefined
    ) {

        html += `

            <button
                type="button"
                class="popup-delete"
                onclick="window.navtoolDeleteWaypoint(${waypointIndex})"
            >
                WAYPOINT ENTFERNEN
            </button>

        `;

    }


    return html;
}


/* =========================================================
   GLOBAL DELETE FUNCTION
========================================================= */

window.navtoolDeleteWaypoint =
    function(index) {

        if (
            index < 0 ||
            index >= state.waypoints.length
        ) {
            return;
        }


        state.waypoints.splice(
            index,
            1
        );


        renderAllMarkers();

        markRouteDirty();

    };


/* =========================================================
   CLEAR WAYPOINTS
========================================================= */

function clearWaypoints() {

    state.waypoints = [];

    renderAllMarkers();

    markRouteDirty();

}


/* =========================================================
   SWAP
========================================================= */

function swapStartDestination() {

    const temp =
        state.start;

    state.start =
        state.destination;

    state.destination =
        temp;


    const inputTemp =
        startInput.value;

    startInput.value =
        destinationInput.value;

    destinationInput.value =
        inputTemp;


    renderAllMarkers();

    markRouteDirty();

}


/* =========================================================
   SEARCH LOCATION
========================================================= */

async function searchLocation(type) {

    const input =
        type === "start"
            ? startInput
            : destinationInput;


    const query =
        input.value.trim();


    if (!query) {

        showError(
            "Bitte zuerst einen Ort oder Hafen eingeben."
        );

        return;
    }


    hideError();

    setBusy(
        true,
        "ORT WIRD GESUCHT …"
    );


    try {

        /*
           1. Wenn SeaRoutes-Proxy vorhanden,
           zuerst dessen Hafensuche benutzen.
        */

        if (SEA_PROXY_URL.trim()) {

            try {

                const result =
                    await seaGeocode(
                        query
                    );


                if (result) {

                    setPoint(
                        type,
                        result
                    );

                    setBusy(
                        false,
                        "BEREIT"
                    );

                    return;
                }

            } catch (error) {

                console.warn(
                    "SeaRoutes Geocoding fehlgeschlagen:",
                    error
                );

            }

        }


        /*
           2. Fallback: OpenStreetMap Nominatim
        */

        const result =
            await nominatimGeocode(
                query
            );


        if (!result) {

            throw new Error(
                "Ort wurde nicht gefunden."
            );

        }


        setPoint(
            type,
            result
        );


        setBusy(
            false,
            "BEREIT"
        );

    } catch (error) {

        console.error(error);

        setBusy(
            false,
            "FEHLER"
        );

        showError(
            "Ort konnte nicht gefunden werden. " +
            "Du kannst den Punkt alternativ direkt auf der Karte setzen."
        );

    }

}


/* =========================================================
   NOMINATIM
========================================================= */

let lastGeocodeTime = 0;

async function nominatimGeocode(query) {

    /*
       Nominatim verlangt Rücksicht auf die API.
       Deshalb mindestens ~1 Sekunde zwischen Anfragen.
    */

    const now =
        Date.now();

    const wait =
        Math.max(
            0,
            1100 - (now - lastGeocodeTime)
        );


    if (wait > 0) {

        await sleep(wait);

    }


    lastGeocodeTime =
        Date.now();


    const url =
        new URL(
            "https://nominatim.openstreetmap.org/search"
        );


    url.searchParams.set(
        "q",
        query
    );

    url.searchParams.set(
        "format",
        "jsonv2"
    );

    url.searchParams.set(
        "limit",
        "1"
    );

    url.searchParams.set(
        "addressdetails",
        "1"
    );


    const response =
        await fetch(
            url.toString(),
            {
                method: "GET",

                headers: {
                    "Accept":
                        "application/json"
                }
            }
        );


    if (!response.ok) {

        throw new Error(
            `Nominatim HTTP ${response.status}`
        );

    }


    const data =
        await response.json();


    if (
        !Array.isArray(data) ||
        !data.length
    ) {

        return null;

    }


    const item =
        data[0];


    return {

        lat:
            Number(item.lat),

        lon:
            Number(item.lon),

        name:
            item.display_name ||
            query

    };

}


/* =========================================================
   SEAROUTES GEOCODING
========================================================= */

async function seaGeocode(query) {

    const base =
        SEA_PROXY_URL.replace(
            /\/+$/,
            ""
        );


    const url =
        `${base}/geocode?query=${encodeURIComponent(query)}`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            `SeaRoutes Geocode HTTP ${response.status}`
        );

    }


    const data =
        await response.json();


    if (
        !data ||
        !data.ok ||
        !data.coordinates
    ) {

        return null;

    }


    return {

        lat:
            Number(data.coordinates[1]),

        lon:
            Number(data.coordinates[0]),

        name:
            data.name ||
            query

    };

}


/* =========================================================
   SET POINT
========================================================= */

function setPoint(
    type,
    point
) {

    if (type === "start") {

        state.start =
            point;

        startInput.value =
            point.name ||
            formatCoordinateName(point);

    } else {

        state.destination =
            point;

        destinationInput.value =
            point.name ||
            formatCoordinateName(point);

    }


    renderAllMarkers();

    fitToPoints();

    markRouteDirty();

}


/* =========================================================
   CALCULATE ROUTE
========================================================= */

async function calculateRoute() {

    hideError();


    if (!state.map) {

        showError(
            "Die Karte wurde nicht initialisiert."
        );

        return;
    }


    const speed =
        Number(
            speedInput.value
        );


    if (
        !Number.isFinite(speed) ||
        speed <= 0
    ) {

        showError(
            "Bitte eine gültige Geschwindigkeit größer als 0 kn eingeben."
        );

        speedInput.focus();

        return;
    }


    const points = [
        state.start,
        ...state.waypoints,
        state.destination
    ];


    if (points.length < 2) {

        showError(
            "Mindestens Start und Ziel sind erforderlich."
        );

        return;
    }


    setBusy(
        true,
        "ROUTE WIRD BERECHNET …"
    );


    calculateBtn.classList.add(
        "loading"
    );


    try {

        /*
           SEA ROUTE
        */

        if (
            routingMode.value === "sea" &&
            SEA_PROXY_URL.trim()
        ) {

            try {

                const result =
                    await calculateSeaRoute(
                        points,
                        speed
                    );


                if (result) {

                    drawRoute(
                        result.coordinates,
                        true
                    );


                    showCalculation(
                        result.distanceMeters / 1852,
                        speed,
                        "SEA ROUTE"
                    );


                    calculationNote.textContent =
                        "Echte SeaRoutes-Seeroute. " +
                        Die Distanz stammt aus der Routingantwort.";

                    state.lastCalculation = {

                        distanceNm:
                            result.distanceMeters / 1852

                    };


                    setBusy(
                        false,
                        "ROUTE BERECHNET"
                    );

                    calculateBtn.classList.remove(
                        "loading"
                    );

                    return;
                }

            } catch (error) {

                console.error(
                    "SeaRoutes Fehler:",
                    error
                );


                /*
                   Nicht die komplette Anwendung
                   zerstören.

                   Stattdessen lokale Berechnung.
                */

                calculationNote.textContent =
                    "SeaRoutes war nicht erreichbar. " +
                    "Es wurde automatisch die lokale Berechnung verwendet.";

            }

        }


        /*
           LOKALE BERECHNUNG

           Funktioniert immer ohne API.
        */

        const result =
            calculateDirectRoute(
                points
            );


        drawRoute(
            result.coordinates,
            false
        );


        showCalculation(
            result.distanceNm,
            speed,
            "DIREKT"
        );


        state.lastCalculation = {

            distanceNm:
                result.distanceNm

        };


        if (
            routingMode.value === "sea"
        ) {

            calculationNote.textContent =
                "Lokale Berechnung aktiv: Großkreis-/Segmentdistanz " +
                "zwischen deinen Punkten. Für echte nautische Seerouting-" +
                "Daten muss der SeaRoutes-Proxy eingerichtet werden.";

        } else {

            calculationNote.textContent =
                "Lokale Direktberechnung über alle Start-, Waypoint- " +
                "und Zielsegmente.";

        }


        setBusy(
            false,
            "ROUTE BERECHNET"
        );


    } catch (error) {

        console.error(error);

        showError(
            "Bei der Berechnung ist ein Fehler aufgetreten: " +
            error.message
        );


        setBusy(
            false,
            "FEHLER"
        );

    }


    calculateBtn.classList.remove(
        "loading"
    );

}


/* =========================================================
   DIRECT ROUTE
========================================================= */

function calculateDirectRoute(points) {

    const coordinates = [];

    let totalKm = 0;


    for (
        let i = 0;
        i < points.length - 1;
        i++
    ) {

        const from =
            points[i];

        const to =
            points[i + 1];


        /*
           Route nicht nur mit einem einzelnen
           geraden Liniensegment darstellen.

           Wir interpolieren mehrere Punkte entlang
           jedes Abschnitts.
        */

        const segment =
            interpolateGreatCircle(
                from,
                to,
                30
            );


        if (i > 0) {

            segment.shift();

        }


        segment.forEach(
            p => coordinates.push(p)
        );


        totalKm +=
            haversineKm(
                from.lat,
                from.lon,
                to.lat,
                to.lon
            );

    }


    return {

        coordinates,

        distanceNm:
            totalKm / NM_IN_KM

    };

}


/* =========================================================
   GREAT CIRCLE INTERPOLATION
========================================================= */

function interpolateGreatCircle(
    from,
    to,
    steps
) {

    const lat1 =
        degToRad(from.lat);

    const lon1 =
        degToRad(from.lon);

    const lat2 =
        degToRad(to.lat);

    const lon2 =
        degToRad(to.lon);


    const vector1 =
        sphericalVector(
            lat1,
            lon1
        );

    const vector2 =
        sphericalVector(
            lat2,
            lon2
        );


    let dot =
        vector1.x * vector2.x +
        vector1.y * vector2.y +
        vector1.z * vector2.z;


    dot =
        Math.max(
            -1,
            Math.min(1, dot)
        );


    const omega =
        Math.acos(dot);


    if (omega < 0.000001) {

        return [
            [from.lat, from.lon],
            [to.lat, to.lon]
        ];

    }


    const sinOmega =
        Math.sin(omega);

    const result = [];


    for (
        let i = 0;
        i <= steps;
        i++
    ) {

        const t =
            i / steps;


        const a =
            Math.sin(
                (1 - t) * omega
            ) / sinOmega;

        const b =
            Math.sin(
                t * omega
            ) / sinOmega;


        const x =
            a * vector1.x +
            b * vector2.x;

        const y =
            a * vector1.y +
            b * vector2.y;

        const z =
            a * vector1.z +
            b * vector2.z;


        const lat =
            Math.atan2(
                z,
                Math.sqrt(
                    x * x +
                    y * y
                )
            );

        const lon =
            Math.atan2(
                y,
                x
            );


        result.push([
            radToDeg(lat),
            normalizeLongitude(
                radToDeg(lon)
            )
        ]);

    }


    return result;

}


/* =========================================================
   SPHERICAL VECTOR
========================================================= */

function sphericalVector(
    lat,
    lon
) {

    return {

        x:
            Math.cos(lat) *
            Math.cos(lon),

        y:
            Math.cos(lat) *
            Math.sin(lon),

        z:
            Math.sin(lat)

    };

}


/* =========================================================
   HAVERSINE
========================================================= */

function haversineKm(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const phi1 =
        degToRad(lat1);

    const phi2 =
        degToRad(lat2);

    const deltaPhi =
        degToRad(
            lat2 - lat1
        );

    const deltaLambda =
        degToRad(
            lon2 - lon1
        );


    const a =
        Math.sin(deltaPhi / 2) ** 2 +
        Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) ** 2;


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return EARTH_RADIUS_KM * c;

}


/* =========================================================
   DRAW ROUTE
========================================================= */

function drawRoute(
    coordinates,
    isSeaRoute
) {

    clearRoute();


    if (
        !coordinates ||
        !coordinates.length
    ) {

        return;

    }


    /*
       GeoJSON-Koordinaten:

       [longitude, latitude]

       Unsere lokale Route:

       [latitude, longitude]

       Deshalb normalisieren.
    */

    const latLngs =
        coordinates.map(
            point => {

                if (
                    Array.isArray(point)
                ) {

                    /*
                       SeaRoutes = [lon, lat]

                       lokale Route = [lat, lon]

                       Wir erkennen SeaRoutes anhand
                       des isSeaRoute-Parameters.
                    */

                    if (isSeaRoute) {

                        return [
                            Number(point[1]),
                            Number(point[0])
                        ];

                    }

                    return [
                        Number(point[0]),
                        Number(point[1])
                    ];

                }

                return [
                    point.lat,
                    point.lon
                ];

            }
        );


    /*
       Schatten
    */

    const shadow =
        L.polyline(
            latLngs,
            {

                className:
                    "route-line-shadow",

                color:
                    "#001b16",

                weight:
                    10,

                opacity:
                    0.9,

                lineCap:
                    "round",

                lineJoin:
                    "round",

                interactive:
                    false

            }
        ).addTo(
            state.map
        );


    /*
       Hauptlinie
    */

    const line =
        L.polyline(
            latLngs,
            {

                className:
                    "route-line",

                color:
                    "#00d8b8",

                weight:
                    4,

                opacity:
                    1,

                lineCap:
                    "round",

                lineJoin:
                    "round",

                interactive:
                    false

            }
        ).addTo(
            state.map
        );


    state.routeLayers.push(
        shadow,
        line
    );


    /*
       Karte an Route anpassen
    */

    const bounds =
        line.getBounds();


    if (bounds.isValid()) {

        state.map.fitBounds(
            bounds,
            {
                padding: [60, 60],

                maxZoom: 11
            }
        );

    }

}


/* =========================================================
   CLEAR ROUTE
========================================================= */

function clearRoute() {

    state.routeLayers.forEach(
        layer => {

            if (
                state.map &&
                state.map.hasLayer(layer)
            ) {

                state.map.removeLayer(
                    layer
                );

            }

        }
    );


    state.routeLayers = [];

}


/* =========================================================
   SEA ROUTE
========================================================= */

async function calculateSeaRoute(
    points,
    speed
) {

    const base =
        SEA_PROXY_URL.replace(
            /\/+$/,
            ""
        );


    const locations =
        points
            .map(
                point =>
                    `${point.lon},${point.lat}`
            )
            .join(";");


    const url =
        new URL(
            `${base}/route`
        );


    url.searchParams.set(
        "locations",
        locations
    );


    url.searchParams.set(
        "speedInKts",
        String(speed)
    );


    const departure =
        departureInput.value;


    if (departure) {

        const date =
            new Date(departure);


        if (!Number.isNaN(date.getTime())) {

            url.searchParams.set(
                "departure",
                date.toISOString()
            );

        }

    }


    const response =
        await fetch(
            url.toString(),
            {
                method: "GET"
            }
        );


    if (!response.ok) {

        throw new Error(
            `SeaRoutes HTTP ${response.status}`
        );

    }


    const data =
        await response.json();


    if (
        !data ||
        !data.ok ||
        !data.route
    ) {

        throw new Error(
            "SeaRoutes lieferte keine gültige Route."
        );

    }


    return {

        coordinates:
            data.route.geometry.coordinates,

        distanceMeters:
            Number(
                data.route.distanceMeters
            )

    };

}


/* =========================================================
   CALCULATION DISPLAY
========================================================= */

function showCalculation(
    nm,
    speed,
    routing
) {

    const km =
        nm * NM_IN_KM;


    distanceNm.textContent =
        formatNumber(
            nm,
            1
        );


    distanceKm.textContent =
        `${formatNumber(km, 1)} KM`;


    resultSpeed.textContent =
        formatNumber(
            speed,
            1
        );


    resultStart.textContent =
        state.start.name ||
        formatCoordinateName(
            state.start
        );


    resultDestination.textContent =
        state.destination.name ||
        formatCoordinateName(
            state.destination
        );


    resultWaypoints.textContent =
        String(
            state.waypoints.length
        );


    resultRouting.textContent =
        routing;


    updateTimeResult(
        nm
    );

}


/* =========================================================
   TIME RESULT
========================================================= */

function updateTimeResult(
    nm
) {

    const speed =
        Number(
            speedInput.value
        );


    if (
        !Number.isFinite(speed) ||
        speed <= 0
    ) {

        return;

    }


    const hours =
        nm / speed;


    travelTime.textContent =
        formatDuration(
            hours
        );


    const departure =
        parseDateTimeLocal(
            departureInput.value
        );


    if (!departure) {

        etaValue.textContent =
            "—";

        etaDate.textContent =
            "Keine Abfahrtszeit";

        return;

    }


    const eta =
        new Date(
            departure.getTime() +
            hours *
            3600000
        );


    etaValue.textContent =
        formatTime(
            eta
        );


    etaDate.textContent =
        formatDate(
            eta
        );

}


/* =========================================================
   DURATION
========================================================= */

function formatDuration(hours) {

    const totalMinutes =
        Math.round(
            hours * 60
        );


    const h =
        Math.floor(
            totalMinutes / 60
        );


    const m =
        totalMinutes % 60;


    if (h === 0) {

        return `${m} min`;

    }


    return `${h} h ${String(m).padStart(2, "0")} min`;

}


/* =========================================================
   ETA
========================================================= */

function formatTime(date) {

    return new Intl.DateTimeFormat(
        "de-DE",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    ).format(date);

}


function formatDate(date) {

    return new Intl.DateTimeFormat(
        "de-DE",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    ).format(date);

}


/* =========================================================
   FIT MAP
========================================================= */

function fitToPoints() {

    if (
        !state.map
    ) {
        return;
    }


    const bounds =
        L.latLngBounds([]);


    bounds.extend([
        state.start.lat,
        state.start.lon
    ]);


    bounds.extend([
        state.destination.lat,
        state.destination.lon
    ]);


    state.waypoints.forEach(
        point => {

            bounds.extend([
                point.lat,
                point.lon
            ]);

        }
    );


    if (
        bounds.isValid()
    ) {

        state.map.fitBounds(
            bounds,
            {
                padding: [70, 70],

                maxZoom: 10
            }
        );

    }

}


/* =========================================================
   WAYPOINT COUNTER
========================================================= */

function updateWaypointCounter() {

    waypointCounter.textContent =
        `WAYPOINTS: ${state.waypoints.length}`;

}


/* =========================================================
   DIRTY STATE
========================================================= */

function markRouteDirty() {

    clearRoute();

    state.lastCalculation = null;

    routeStateText.textContent =
        "NEUE ROUTE";


    calculationNote.textContent =
        "Route geändert – bitte erneut berechnen.";


    /*
       Ergebnis nicht löschen.
       Dadurch sieht der Benutzer,
       dass die neue Route noch nicht gerechnet wurde.
    */

}


/* =========================================================
   BUSY STATE
========================================================= */

function setBusy(
    busy,
    text
) {

    routeStateText.textContent =
        text;


    if (busy) {

        calculateBtn.classList.add(
            "loading"
        );

    } else {

        calculateBtn.classList.remove(
            "loading"
        );

    }

}


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

    errorBox.textContent =
        message;

    errorBox.classList.remove(
        "hidden"
    );

}


function hideError() {

    errorBox.classList.add(
        "hidden"
    );

}


/* =========================================================
   HELPERS
========================================================= */

function formatNumber(
    number,
    decimals
) {

    return new Intl.NumberFormat(
        "de-DE",
        {
            minimumFractionDigits:
                decimals,

            maximumFractionDigits:
                decimals
        }
    ).format(number);

}


function formatCoordinateName(point) {

    return (
        `${point.lat.toFixed(5)}, ` +
        `${point.lon.toFixed(5)}`
    );

}


function degToRad(value) {

    return value *
        Math.PI /
        180;

}


function radToDeg(value) {

    return value *
        180 /
        Math.PI;

}


function normalizeLongitude(
    lon
) {

    return (
        ((lon + 540) % 360) -
        180
    );

}


function sleep(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


/* =========================================================
   DATETIME HELPERS
========================================================= */

function toDateTimeLocalValue(
    date
) {

    const pad =
        value =>
            String(value).padStart(
                2,
                "0"
            );


    return (
        `${date.getFullYear()}-` +
        `${pad(date.getMonth() + 1)}-` +
        `${pad(date.getDate())}T` +
        `${pad(date.getHours())}:` +
        `${pad(date.getMinutes())}`
    );

}


function parseDateTimeLocal(
    value
) {

    if (!value) {
        return null;
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;

}
