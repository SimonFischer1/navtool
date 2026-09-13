/* =========================================================
   CREW — CUNO ESSBERGER
   Shipboard Operations System
   ========================================================= */

/*
  IMPORTANT

  This is a browser-based operational recording system.

  Local data is stored in localStorage.
  For real multi-device shipboard use, a database/backend
  should be connected later.

  MarineTraffic API credentials must NEVER be placed here.
*/


const CONFIG = {

  vesselName: "CUNO ESSBERGER",

  marineTrafficShipId: "5627050",

  /*
    AFTER creating the Cloudflare Worker:

    Example:
    marineApiUrl:
      "https://crew-ais.your-name.workers.dev/ais"

    Leave empty until configured.
  */

  marineApiUrl: "",

  marineTrafficUrl:
    "https://www.marinetraffic.com/en/ais/details/ships/shipid:5627050",

  marineRefreshMs: 60000,

  dailyCargoCapacity: 20000,

  baseHourlyRate: 15.60

};


const STORAGE_KEY = "CREW_CUNO_ESSBERGER_V1";


/* =========================================================
   WORK RATES
   ========================================================= */

const WORK_RATES = {

  watch: {
    label: "Watch",
    multiplier: 1.5
  },

  maintenance: {
    label: "Maintenance",
    multiplier: 1.2
  },

  manoeuvring: {
    label: "Manouvering",
    multiplier: 1.5
  },

  tankCleaning: {
    label: "Tank Cleaning",
    multiplier: 1.3
  },

  provision: {
    label: "Provision",
    multiplier: 1.1
  },

  other: {
    label: "Other",
    multiplier: 1.0
  }

};


/* =========================================================
   CHECKLIST DEFINITIONS
   ========================================================= */

const CHECKLISTS = [

  {
    id: "pre-loading",
    title: "Pre-Loading",
    items: [
      "Cargo plan checked and approved.",
      "Cargo tanks identified and status confirmed.",
      "Cargo compatibility confirmed according to vessel procedures.",
      "Loading arms / hoses / connections checked.",
      "Communication with terminal established.",
      "Emergency shutdown arrangements confirmed.",
      "Tank venting / vapour arrangements checked.",
      "Ship-shore safety checklist completed.",
      "Personnel briefed.",
      "Loading sequence confirmed."
    ]
  },

  {
    id: "loading-start",
    title: "Loading Commencement",
    items: [
      "Loading commenced at agreed rate.",
      "Initial tank levels checked.",
      "Pressure / flow monitored.",
      "No abnormal leakage observed.",
      "Communications maintained.",
      "Cargo quantity recording started."
    ]
  },

  {
    id: "loading-completion",
    title: "Loading Completion",
    items: [
      "Final cargo quantities recorded.",
      "Tank levels / ullages checked.",
      "Loading stopped safely.",
      "Lines / connections handled according to procedure.",
      "Final figures agreed with terminal.",
      "Documentation completed."
    ]
  },

  {
    id: "pre-discharging",
    title: "Pre-Discharging",
    items: [
      "Discharge plan checked.",
      "Receiving terminal requirements confirmed.",
      "Cargo tanks identified.",
      "Discharge lines / valves checked.",
      "Communication established.",
      "Emergency procedures reviewed.",
      "Personnel briefed."
    ]
  },

  {
    id: "discharging",
    title: "Discharging",
    items: [
      "Discharge commenced at agreed rate.",
      "Flow / pressure monitored.",
      "Tank levels monitored.",
      "Cargo quantity recorded.",
      "No abnormal condition observed.",
      "Next tank sequence confirmed."
    ]
  },

  {
    id: "pilot",
    title: "Pilot Operation",
    items: [
      "Pilot boarding arrangement prepared.",
      "Pilot ladder / access arrangement checked.",
      "Bridge team briefed.",
      "Pilot boarded safely.",
      "Passage information exchanged.",
      "Pilot disembarkation completed."
    ]
  },

  {
    id: "departure",
    title: "Departure",
    items: [
      "Departure checklist completed.",
      "Navigation equipment checked.",
      "Main propulsion ready.",
      "Steering tested.",
      "Anchors / mooring arrangements checked.",
      "Engine room ready.",
      "Bridge / deck communication established.",
      "Pilot / tug arrangements confirmed.",
      "Final departure permission received."
    ]
  },

  {
    id: "arrival",
    title: "Arrival",
    items: [
      "Arrival information received.",
      "Navigation status confirmed.",
      "Pilot arrangements confirmed.",
      "Mooring team briefed.",
      "Mooring equipment prepared.",
      "Engine room informed.",
      "Cargo / terminal information prepared."
    ]
  },

  {
    id: "ballast",
    title: "Ballast Operation",
    items: [
      "Ballast plan checked.",
      "Tank sequence confirmed.",
      "Ballast valves checked.",
      "Pump / transfer arrangement checked.",
      "Tank levels monitored.",
      "Trim / stability monitored.",
      "Operation recorded."
    ]
  },

  {
    id: "tank-cleaning",
    title: "Tank Cleaning",
    items: [
      "Tank cleaning plan approved.",
      "Tank atmosphere requirements checked.",
      "Equipment checked.",
      "Tank identification confirmed.",
      "Personnel briefed.",
      "Cleaning operation monitored.",
      "Waste / residues handled according to procedure.",
      "Tank status updated."
    ]
  }

];


/* =========================================================
   STATE
   ========================================================= */

function createCargoTanks() {

  const tanks = [];

  for (let i = 1; i <= 7; i++) {

    tanks.push({
      id: `P${i}`,
      name: `P${i}`,
      side: "port",
      status: "empty",
      capacityM3: 0,
      currentM3: 0,
      loadedTodayM3: 0,
      dischargedTodayM3: 0,
      product: "",
      temperature: "",
      ullage: ""
    });

  }

  for (let i = 1; i <= 7; i++) {

    tanks.push({
      id: `S${i}`,
      name: `S${i}`,
      side: "starboard",
      status: "empty",
      capacityM3: 0,
      currentM3: 0,
      loadedTodayM3: 0,
      dischargedTodayM3: 0,
      product: "",
      temperature: "",
      ullage: ""
    });

  }

  return tanks;

}


function createBallastTanks() {

  const tanks = [];

  for (let i = 1; i <= 7; i++) {

    tanks.push({
      id: `PB${i}`,
      name: `B${i}`,
      displayName: `P-B${i}`,
      side: "port",
      status: "idle",
      capacityM3: 0,
      currentM3: 0,
      targetM3: 0
    });

  }

  for (let i = 1; i <= 7; i++) {

    tanks.push({
      id: `SB${i}`,
      name: `B${i}`,
      displayName: `S-B${i}`,
      side: "starboard",
      status: "idle",
      capacityM3: 0,
      currentM3: 0,
      targetM3: 0
    });

  }

  return tanks;

}


function createDefaultState() {

  return {

    vessel: {

      name: CONFIG.vesselName,

      marineTrafficShipId:
        CONFIG.marineTrafficShipId,

      position: null,

      sog: null,
      cog: null,
      heading: null,

      aisTimestamp: null,

      destination: "",

      draught: null

    },


    voyage: {

      from: "Dublin",
      to: "Belfast",

      eta: "",
      etd: "",

      pilotArrival: "",
      pilotDeparture: "",

      nextPortLat: "",
      nextPortLon: ""

    },


    condition: {

      freeboardPort: "",
      freeboardStarboard: "",

      draftFwd: "",
      draftAft: "",

      airDraft: "",
      waterDepth: "",

      airTemp: "",
      waterTemp: ""

    },


    cargo: {

      dailyCapacity:
        CONFIG.dailyCargoCapacity,

      tanks:
        createCargoTanks()

    },


    ballast: {

      tanks:
        createBallastTanks()

    },


    operations: [],


    crew: {

      profile: {

        firstName: "",
        lastName: "",
        dob: "",
        birthPlace: "",
        company: "",
        position: ""

      },

      workEntries: []

    },


    checklists: {}

  };

}


function mergeState(target, source) {

  if (!source || typeof source !== "object") {
    return target;
  }

  for (const key of Object.keys(source)) {

    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {

      if (
        !target[key] ||
        typeof target[key] !== "object" ||
        Array.isArray(target[key])
      ) {
        target[key] = {};
      }

      mergeState(target[key], source[key]);

    } else {

      target[key] = source[key];

    }

  }

  return target;

}


let state = createDefaultState();


try {

  const saved =
    JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null"
    );

  if (saved) {
    mergeState(state, saved);
  }

} catch (error) {

  console.warn(
    "Could not load local CREW data.",
    error
  );

}


function saveState() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Lokale Speicherung fehlgeschlagen."
    );

  }

}


/* =========================================================
   HELPERS
   ========================================================= */

function $(selector) {
  return document.querySelector(selector);
}


function $all(selector) {
  return [...document.querySelectorAll(selector)];
}


function esc(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function num(value) {

  const n = Number(value);

  return Number.isFinite(n)
    ? n
    : 0;

}


function numberOrBlank(value) {

  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return num(value);

}


function formatNumber(value, digits = 1) {

  if (
    value === "" ||
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "—";
  }

  return Number(value).toLocaleString(
    "de-DE",
    {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }
  );

}


function formatEuro(value) {

  return Number(value || 0).toLocaleString(
    "de-DE",
    {
      style: "currency",
      currency: "EUR"
    }
  );

}


function localDateTimeValue(date = new Date()) {

  const pad =
    n => String(n).padStart(2, "0");

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-") + "T" + [
    pad(date.getHours()),
    pad(date.getMinutes())
  ].join(":");

}


function formatDateTime(value) {

  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(
    "de-DE",
    {
      dateStyle: "short",
      timeStyle: "short"
    }
  );

}


function formatDate(value) {

  if (!value) {
    return "—";
  }

  const date =
    new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(
    "de-DE"
  );

}


function initials(first, last) {

  const a =
    (first || "").trim().charAt(0);

  const b =
    (last || "").trim().charAt(0);

  return (
    `${a}${b}`.toUpperCase() ||
    "--"
  );

}


function calculateAge(dob) {

  if (!dob) {
    return "—";
  }

  const birth =
    new Date(`${dob}T00:00:00`);

  if (Number.isNaN(birth.getTime())) {
    return "—";
  }

  const today = new Date();

  let age =
    today.getFullYear() -
    birth.getFullYear();

  const month =
    today.getMonth() -
    birth.getMonth();

  if (
    month < 0 ||
    (
      month === 0 &&
      today.getDate() < birth.getDate()
    )
  ) {
    age--;
  }

  return age >= 0
    ? age
    : "—";

}


function showToast(message) {

  const toast = $("#toast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer =
    setTimeout(
      () => toast.classList.remove("show"),
      2500
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

const VIEW_TITLES = {

  dashboard: "Dashboard",
  cargo: "Cargo",
  ballast: "Ballast",
  voyage: "Voyage",
  operations: "Operations",
  crew: "Crew Service",
  reports: "Reports",
  checklists: "Checklists"

};


function showView(viewName) {

  if (!VIEW_TITLES[viewName]) {
    return;
  }

  $all(".view")
    .forEach(view => {
      view.classList.toggle(
        "active",
        view.id === `view-${viewName}`
      );
    });

  $all(".nav-item")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.view === viewName
      );
    });

  $("#pageTitle").textContent =
    VIEW_TITLES[viewName];

  if (viewName === "dashboard") {
    setTimeout(() => {
      if (map) {
        map.invalidateSize();
      }
    }, 150);
  }

  if (viewName === "crew") {
    renderWorkCalendar();
    renderCrew();
  }

  if (window.innerWidth <= 700) {
    $("#sidebar").classList.remove("open");
  }

}


$all(".nav-item")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => showView(button.dataset.view)
    );

  });


$all("[data-view-link]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => showView(button.dataset.viewLink)
    );

  });


$("#mobileMenuBtn")
  .addEventListener(
    "click",
    () => {
      $("#sidebar")
        .classList.toggle("open");
    }
  );


$("#crewLoginBtn")
  .addEventListener(
    "click",
    openCrewProfile
  );


$("#topCrewBtn")
  .addEventListener(
    "click",
    openCrewProfile
  );


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

  const now = new Date();

  $("#currentDate").textContent =
    now.toLocaleDateString(
      "de-DE",
      {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }
    );

  $("#currentClock").textContent =
    now.toLocaleTimeString(
      "de-DE"
    );

}


updateClock();

setInterval(
  updateClock,
  1000
);


/* =========================================================
   MAP
   ========================================================= */

let map = null;
let vesselMarker = null;
let routeLine = null;


function initMap() {

  if (
    typeof L === "undefined"
  ) {

    $("#mapStatus").textContent =
      "MAP ERROR";

    return;

  }

  map =
    L.map(
      "shipMap",
      {
        zoomControl: true,
        attributionControl: true
      }
    )
    .setView(
      [53.4, -6.3],
      5
    );


  L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; OpenStreetMap contributors'
    }
  )
  .addTo(map);


  updateMap();

}


function updateMap() {

  if (!map) {
    return;
  }

  const position =
    state.vessel.position;

  if (
    position &&
    Number.isFinite(Number(position.lat)) &&
    Number.isFinite(Number(position.lon))
  ) {

    const lat =
      Number(position.lat);

    const lon =
      Number(position.lon);


    if (!vesselMarker) {

      const icon =
        L.divIcon({
          className: "vessel-marker-wrap",
          html:
            `<div class="vessel-marker">⚓</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

      vesselMarker =
        L.marker(
          [lat, lon],
          { icon }
        )
        .addTo(map);

    } else {

      vesselMarker.setLatLng(
        [lat, lon]
      );

    }


    vesselMarker.bindTooltip(
      `<strong>${esc(CONFIG.vesselName)}</strong>`,
      {
        direction: "top"
      }
    );


    $("#mapLat").textContent =
      lat.toFixed(5);

    $("#mapLon").textContent =
      lon.toFixed(5);


    $("#mapSog").textContent =
      state.vessel.sog !== null
        ? `${formatNumber(state.vessel.sog, 1)} kn`
        : "—";


    $("#mapCog").textContent =
      state.vessel.cog !== null
        ? `${formatNumber(state.vessel.cog, 0)}°`
        : "—";


  } else {

    $("#mapLat").textContent = "—";
    $("#mapLon").textContent = "—";
    $("#mapSog").textContent = "—";
    $("#mapCog").textContent = "—";

  }


  drawNextPortRoute();

}


function drawNextPortRoute() {

  if (routeLine) {

    routeLine.remove();
    routeLine = null;

  }

  if (
    !map ||
    !state.vessel.position
  ) {
    return;
  }

  const lat =
    Number(state.vessel.position.lat);

  const lon =
    Number(state.vessel.position.lon);

  const nextLat =
    Number(state.voyage.nextPortLat);

  const nextLon =
    Number(state.voyage.nextPortLon);


  if (
    !Number.isFinite(nextLat) ||
    !Number.isFinite(nextLon)
  ) {
    return;
  }


  routeLine =
    L.polyline(
      [
        [lat, lon],
        [nextLat, nextLon]
      ],
      {
        color: "#00d6c2",
        weight: 2,
        opacity: .7,
        dashArray: "8 8"
      }
    )
    .addTo(map);

}


$("#saveManualPosition")
  .addEventListener(
    "click",
    () => {

      const lat =
        Number($("#manualLat").value);

      const lon =
        Number($("#manualLon").value);


      if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lon) ||
        lat < -90 ||
        lat > 90 ||
        lon < -180 ||
        lon > 180
      ) {

        showToast(
          "Ungültige Position."
        );

        return;

      }


      state.vessel.position = {
        lat,
        lon
      };

      state.vessel.aisTimestamp =
        new Date().toISOString();

      saveState();

      updateMap();
      updateDashboard();

      showToast(
        "Manuelle Schiffsposition gesetzt."
      );

    }
  );


$("#refreshAISBtn")
  .addEventListener(
    "click",
    refreshAIS
  );


/* =========================================================
   MARINETRAFFIC
   ========================================================= */

async function refreshAIS() {

  if (!CONFIG.marineApiUrl) {

    showToast(
      "MarineTraffic Worker ist noch nicht konfiguriert."
    );

    return;

  }


  const button =
    $("#refreshAISBtn");

  const original =
    button.textContent;

  button.textContent =
    "↻ Loading...";

  button.disabled = true;


  try {

    const url =
      `${CONFIG.marineApiUrl}` +
      `?shipId=${encodeURIComponent(
        CONFIG.marineTrafficShipId
      )}`;


    const response =
      await fetch(
        url,
        {
          headers: {
            Accept: "application/json"
          }
        }
      );


    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );

    }


    const data =
      await response.json();


    if (!data.ok) {

      throw new Error(
        data.error ||
        "AIS response invalid"
      );

    }


    const vessel =
      data.vessel;


    if (
      !vessel ||
      !Number.isFinite(
        Number(vessel.lat)
      ) ||
      !Number.isFinite(
        Number(vessel.lon)
      )
    ) {

      throw new Error(
        "Keine gültige AIS-Position."
      );

    }


    state.vessel.position = {
      lat: Number(vessel.lat),
      lon: Number(vessel.lon)
    };


    state.vessel.sog =
      vessel.sog ?? null;

    state.vessel.cog =
      vessel.cog ?? null;

    state.vessel.heading =
      vessel.heading ?? null;

    state.vessel.destination =
      vessel.destination || "";

    state.vessel.draught =
      vessel.draught ?? null;

    state.vessel.aisTimestamp =
      vessel.timestamp ||
      new Date().toISOString();


    saveState();

    updateMap();
    updateDashboard();


    showAISOnline();


    showToast(
      "AIS-Position aktualisiert."
    );


  } catch (error) {

    console.error(error);

    showAISOffline(
      error.message
    );

    showToast(
      `AIS Fehler: ${error.message}`
    );


  } finally {

    button.textContent =
      original;

    button.disabled = false;

  }

}


function showAISOnline() {

  $("#mapStatus").textContent =
    "AIS ONLINE";

  $("#mapStatus")
    .classList.add("online");

  $("#dashAIS").textContent =
    "ONLINE";

  $("#dashAISInfo").textContent =
    state.vessel.aisTimestamp
      ? formatDateTime(
          state.vessel.aisTimestamp
        )
      : "Position received";

}


function showAISOffline(reason = "") {

  $("#mapStatus").textContent =
    "AIS OFFLINE";

  $("#mapStatus")
    .classList.remove("online");

  $("#dashAIS").textContent =
    "OFFLINE";

  $("#dashAISInfo").textContent =
    reason ||
    "No live connection";

}


if (CONFIG.marineApiUrl) {

  setInterval(
    refreshAIS,
    CONFIG.marineRefreshMs
  );

}


/* =========================================================
   CARGO
   ========================================================= */

function cargoTotals() {

  const tanks =
    state.cargo.tanks;

  return {

    current:
      tanks.reduce(
        (sum, tank) =>
          sum + num(tank.currentM3),
        0
      ),

    loaded:
      tanks.reduce(
        (sum, tank) =>
          sum + num(tank.loadedTodayM3),
        0
      ),

    discharged:
      tanks.reduce(
        (sum, tank) =>
          sum + num(tank.dischargedTodayM3),
        0
      )

  };

}


function tankProgress(tank) {

  const capacity =
    num(tank.capacityM3);

  if (capacity <= 0) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      num(tank.currentM3) /
      capacity *
      100
    )
  );

}


function renderTankCard(tank, type) {

  const progress =
    tankProgress(tank);


  const quantity =
    type === "cargo"
      ? `${formatNumber(tank.currentM3)} m³`
      : `${formatNumber(tank.currentM3)} m³`;


  const status =
    tank.status || "idle";


  return `
    <div
      class="tank-card"
      data-tank-type="${esc(type)}"
      data-tank-id="${esc(tank.id)}"
    >

      <div class="tank-card-top">

        <strong>
          ${esc(
            tank.displayName ||
            tank.name
          )}
        </strong>

        <span class="tank-status">
          ${esc(status)}
        </span>

      </div>

      <div class="tank-info">

        <span>
          ${quantity}
        </span>

        <span>
          ${progress.toFixed(0)}%
        </span>

      </div>

      <div
        class="tank-level-bar"
        style="width:${progress}%"
      ></div>

    </div>
  `;

}


function renderCargo() {

  const port =
    state.cargo.tanks
      .filter(t => t.side === "port");

  const starboard =
    state.cargo.tanks
      .filter(t => t.side === "starboard");


  $("#cargoPortTanks").innerHTML =
    port
      .map(t => renderTankCard(t, "cargo"))
      .join("");


  $("#cargoStarboardTanks").innerHTML =
    starboard
      .map(t => renderTankCard(t, "cargo"))
      .join("");


  $all(
    '#view-cargo .tank-card'
  )
  .forEach(card => {

    card.addEventListener(
      "click",
      () => openTank(
        "cargo",
        card.dataset.tankId
      )
    );

  });


  const totals =
    cargoTotals();


  $("#cargoTotal").textContent =
    `${formatNumber(totals.current)} m³`;

  $("#cargoLoadedToday").textContent =
    `${formatNumber(totals.loaded)} m³`;

  $("#cargoDischargedToday").textContent =
    `${formatNumber(totals.discharged)} m³`;


  const daily =
    CONFIG.dailyCargoCapacity;


  const loadedPercent =
    Math.min(
      100,
      totals.loaded /
      daily *
      100
    );


  const dischargedPercent =
    Math.min(
      100,
      totals.discharged /
      daily *
      100
    );


  $("#loadingProgress").style.width =
    `${loadedPercent}%`;

  $("#loadingPercent").textContent =
    `${loadedPercent.toFixed(1)}%`;


  $("#dischargingProgress").style.width =
    `${dischargedPercent}%`;

  $("#dischargingPercent").textContent =
    `${dischargedPercent.toFixed(1)}%`;

}


function renderDashboardCargo() {

  const container =
    $("#dashboardCargoTanks");

  container.innerHTML =
    state.cargo.tanks
      .map(tank => {

        const progress =
          tankProgress(tank);

        return `
          <div
            class="mini-tank"
            title="${esc(
              tank.name
            )} — ${formatNumber(
              tank.currentM3
            )} m³"
          >

            <strong>
              ${esc(tank.name)}
            </strong>

            <span>
              ${formatNumber(
                tank.currentM3
              )} m³
            </span>

            <div
              class="tank-level"
              style="height:${progress}%"
            ></div>

          </div>
        `;

      })
      .join("");

}


function openTank(type, id) {

  const collection =
    type === "cargo"
      ? state.cargo.tanks
      : state.ballast.tanks;

  const tank =
    collection.find(
      item => item.id === id
    );


  if (!tank) {
    return;
  }


  $("#tankType").value =
    type;

  $("#tankId").value =
    id;


  $("#tankModalTitle").textContent =
    type === "cargo"
      ? `Cargo Tank ${tank.name}`
      : `Ballast Tank ${
          tank.displayName ||
          tank.name
        }`;


  $("#tankStatus").value =
    tank.status || "empty";

  $("#tankCapacity").value =
    tank.capacityM3 ?? "";

  $("#tankCurrent").value =
    tank.currentM3 ?? "";

  $("#tankLoadedToday").value =
    tank.loadedTodayM3 ?? "";

  $("#tankDischargedToday").value =
    tank.dischargedTodayM3 ?? "";

  $("#tankProduct").value =
    tank.product || "";

  $("#tankTemperature").value =
    tank.temperature ?? "";

  $("#tankUllage").value =
    tank.ullage ?? "";


  const cargo =
    type === "cargo";


  $("#tankProductWrap")
    .classList.toggle(
      "hidden",
      !cargo
    );

  $("#tankTemperatureWrap")
    .classList.toggle(
      "hidden",
      !cargo
    );

  $("#tankUllageWrap")
    .classList.toggle(
      "hidden",
      !cargo
    );


  $("#tankDialog").showModal();

}


$("#addCargoTankBtn")
  .addEventListener(
    "click",
    () => {

      showView("cargo");

      openTank(
        "cargo",
        "P1"
      );

    }
  );


$("#addBallastBtn")
  .addEventListener(
    "click",
    () => {

      showView("ballast");

      openTank(
        "ballast",
        "PB1"
      );

    }
  );


$("#tankForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const type =
        $("#tankType").value;

      const id =
        $("#tankId").value;


      const collection =
        type === "cargo"
          ? state.cargo.tanks
          : state.ballast.tanks;


      const tank =
        collection.find(
          item => item.id === id
        );


      if (!tank) {
        return;
      }


      tank.status =
        $("#tankStatus").value;

      tank.capacityM3 =
        numberOrBlank(
          $("#tankCapacity").value
        );

      tank.currentM3 =
        numberOrBlank(
          $("#tankCurrent").value
        );


      if (type === "cargo") {

        tank.loadedTodayM3 =
          numberOrBlank(
            $("#tankLoadedToday").value
          );

        tank.dischargedTodayM3 =
          numberOrBlank(
            $("#tankDischargedToday").value
          );

        tank.product =
          $("#tankProduct").value.trim();

        tank.temperature =
          numberOrBlank(
            $("#tankTemperature").value
          );

        tank.ullage =
          numberOrBlank(
            $("#tankUllage").value
          );

      }


      saveState();

      renderAll();


      $("#tankDialog").close();

      showToast(
        `${type === "cargo" ? "Cargo" : "Ballast"} Tank gespeichert.`
      );

    }
  );


/* =========================================================
   BALLAST
   ========================================================= */

function renderBallast() {

  const port =
    state.ballast.tanks
      .filter(t => t.side === "port");

  const starboard =
    state.ballast.tanks
      .filter(t => t.side === "starboard");


  $("#ballastPortTanks").innerHTML =
    port
      .map(t => renderTankCard(t, "ballast"))
      .join("");


  $("#ballastStarboardTanks").innerHTML =
    starboard
      .map(t => renderTankCard(t, "ballast"))
      .join("");


  $all(
    '#view-ballast .tank-card'
  )
  .forEach(card => {

    card.addEventListener(
      "click",
      () => openTank(
        "ballast",
        card.dataset.tankId
      )
    );

  });


  const total =
    state.ballast.tanks
      .reduce(
        (sum, tank) =>
          sum + num(tank.currentM3),
        0
      );


  const filling =
    state.ballast.tanks
      .filter(
        tank =>
          tank.status === "filling"
      )
      .length;


  const discharging =
    state.ballast.tanks
      .filter(
        tank =>
          tank.status === "discharging"
      )
      .length;


  $("#ballastTotal").textContent =
    `${formatNumber(total)} m³`;

  $("#ballastFilling").textContent =
    filling;

  $("#ballastDischarging").textContent =
    discharging;

}


/* =========================================================
   VOYAGE
   ========================================================= */

function loadVoyageForm() {

  $("#voyageFrom").value =
    state.voyage.from || "";

  $("#voyageTo").value =
    state.voyage.to || "";

  $("#voyageETA").value =
    state.voyage.eta || "";

  $("#voyageETD").value =
    state.voyage.etd || "";

  $("#pilotArrival").value =
    state.voyage.pilotArrival || "";

  $("#pilotDeparture").value =
    state.voyage.pilotDeparture || "";

  $("#nextPortLat").value =
    state.voyage.nextPortLat || "";

  $("#nextPortLon").value =
    state.voyage.nextPortLon || "";


  $("#freeboardPort").value =
    state.condition.freeboardPort || "";

  $("#freeboardStarboard").value =
    state.condition.freeboardStarboard || "";

  $("#draftFwd").value =
    state.condition.draftFwd || "";

  $("#draftAft").value =
    state.condition.draftAft || "";

  $("#airDraft").value =
    state.condition.airDraft || "";

  $("#waterDepth").value =
    state.condition.waterDepth || "";

  $("#airTemp").value =
    state.condition.airTemp || "";

  $("#waterTemp").value =
    state.condition.waterTemp || "";


  $("#pilotArrivalDisplay").textContent =
    state.voyage.pilotArrival
      ? formatDateTime(
          state.voyage.pilotArrival
        )
      : "Not set";


  $("#pilotDepartureDisplay").textContent =
    state.voyage.pilotDeparture
      ? formatDateTime(
          state.voyage.pilotDeparture
        )
      : "Not set";

}


$("#voyageForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      state.voyage.from =
        $("#voyageFrom").value.trim();

      state.voyage.to =
        $("#voyageTo").value.trim();

      state.voyage.eta =
        $("#voyageETA").value;

      state.voyage.etd =
        $("#voyageETD").value;

      state.voyage.pilotArrival =
        $("#pilotArrival").value;

      state.voyage.pilotDeparture =
        $("#pilotDeparture").value;

      state.voyage.nextPortLat =
        $("#nextPortLat").value;

      state.voyage.nextPortLon =
        $("#nextPortLon").value;


      saveState();

      renderAll();

      showToast(
        "Voyage gespeichert."
      );

    }
  );


$("#conditionForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      state.condition.freeboardPort =
        numberOrBlank(
          $("#freeboardPort").value
        );

      state.condition.freeboardStarboard =
        numberOrBlank(
          $("#freeboardStarboard").value
        );

      state.condition.draftFwd =
        numberOrBlank(
          $("#draftFwd").value
        );

      state.condition.draftAft =
        numberOrBlank(
          $("#draftAft").value
        );

      state.condition.airDraft =
        numberOrBlank(
          $("#airDraft").value
        );

      state.condition.waterDepth =
        numberOrBlank(
          $("#waterDepth").value
        );

      state.condition.airTemp =
        numberOrBlank(
          $("#airTemp").value
        );

      state.condition.waterTemp =
        numberOrBlank(
          $("#waterTemp").value
        );


      saveState();

      renderAll();

      showToast(
        "Schiffszustand gespeichert."
      );

    }
  );


/* =========================================================
   OPERATIONS
   ========================================================= */

$("#operationTime").value =
  localDateTimeValue();


$("#operationForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const done =
        $("#operationDone")
          .value
          .trim();


      if (!done) {

        showToast(
          "Bitte eintragen, was gemacht wurde."
        );

        return;

      }


      const entry = {

        id:
          crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),

        timestamp:
          $("#operationTime").value ||
          localDateTimeValue(),

        type:
          $("#operationType").value,

        done,

        next:
          $("#operationNext")
            .value
            .trim()

      };


      state.operations.push(entry);

      state.operations.sort(
        (a, b) =>
          new Date(b.timestamp) -
          new Date(a.timestamp)
      );


      saveState();

      $("#operationDone").value = "";
      $("#operationNext").value = "";
      $("#operationTime").value =
        localDateTimeValue();


      renderAll();

      showToast(
        "Operation gespeichert."
      );

    }
  );


$("#clearOperationsBtn")
  .addEventListener(
    "click",
    () => {

      if (
        !confirm(
          "Wirklich den kompletten Operations-Log löschen?"
        )
      ) {
        return;
      }


      state.operations = [];

      saveState();

      renderAll();

      showToast(
        "Operations-Log gelöscht."
      );

    }
  );


function renderOperations() {

  const html =
    state.operations
      .map(entry => {

        return `
          <div class="timeline-entry">

            <div class="timeline-time">
              ${esc(
                formatDateTime(
                  entry.timestamp
                )
              )}
            </div>

            <div class="timeline-type">
              ${esc(entry.type)}
            </div>

            <div class="timeline-done">
              ${esc(entry.done)}
            </div>

            ${
              entry.next
                ? `
                  <div class="timeline-next">
                    NEXT → ${esc(entry.next)}
                  </div>
                `
                : ""
            }

          </div>
        `;

      })
      .join("");


  $("#operationsTimeline").innerHTML =
    html ||
    `
      <div class="empty-state">
        No operations recorded.
      </div>
    `;


  $("#dashboardOperations").innerHTML =
    state.operations
      .slice(0, 4)
      .map(entry => {

        return `
          <div class="timeline-entry">

            <div class="timeline-time">
              ${esc(
                formatDateTime(
                  entry.timestamp
                )
              )}
            </div>

            <div class="timeline-type">
              ${esc(entry.type)}
            </div>

            <div class="timeline-done">
              ${esc(entry.done)}
            </div>

            ${
              entry.next
                ? `
                  <div class="timeline-next">
                    NEXT → ${esc(entry.next)}
                  </div>
                `
                : ""
            }

          </div>
        `;

      })
      .join("") ||
    `
      <div class="empty-state">
        No operations recorded.
      </div>
    `;


  const nextSteps =
    state.operations
      .filter(entry => entry.next)
      .slice(0, 4);


  $("#dashboardNextSteps").innerHTML =
    nextSteps
      .map(entry => {

        return `
          <div class="next-step">

            <strong>
              ${esc(entry.next)}
            </strong>

            <small>
              From:
              ${esc(entry.done)}
            </small>

          </div>
        `;

      })
      .join("") ||
    `
      <div class="empty-state">
        No next step recorded.
      </div>
    `;

}


/* =========================================================
   CREW PROFILE
   ========================================================= */

function openCrewProfile() {

  const profile =
    state.crew.profile;


  $("#crewFirstName").value =
    profile.firstName || "";

  $("#crewLastName").value =
    profile.lastName || "";

  $("#crewDOB").value =
    profile.dob || "";

  $("#crewBirthPlace").value =
    profile.birthPlace || "";

  $("#crewCompanyInput").value =
    profile.company || "";

  $("#crewPosition").value =
    profile.position || "";


  $("#crewDialog").showModal();

}


$("#openCrewProfile")
  .addEventListener(
    "click",
    openCrewProfile
  );


$("#crewForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      state.crew.profile = {

        firstName:
          $("#crewFirstName")
            .value
            .trim(),

        lastName:
          $("#crewLastName")
            .value
            .trim(),

        dob:
          $("#crewDOB").value,

        birthPlace:
          $("#crewBirthPlace")
            .value
            .trim(),

        company:
          $("#crewCompanyInput")
            .value
            .trim(),

        position:
          $("#crewPosition")
            .value
            .trim()

      };


      saveState();

      renderCrew();

      $("#crewDialog").close();

      showToast(
        "Crew-Profil gespeichert."
      );

    }
  );


function renderCrew() {

  const profile =
    state.crew.profile;


  const name =
    profile.lastName &&
    profile.firstName
      ? `${profile.lastName}, ${profile.firstName}`
      : "No profile";


  const initialsText =
    initials(
      profile.firstName,
      profile.lastName
    );


  $("#sidebarAvatar").textContent =
    initialsText;

  $("#topAvatar").textContent =
    initialsText;

  $("#crewLargeAvatar").textContent =
    initialsText;


  $("#sidebarCrewName").textContent =
    profile.firstName ||
    profile.lastName
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : "No crew profile";


  $("#topCrewName").textContent =
    profile.firstName ||
    profile.lastName
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : "Crew";


  $("#crewFullName").textContent =
    name;

  $("#crewCompany").textContent =
    profile.company ||
    "Company not set";


  $("#profileName").textContent =
    name;

  $("#profileDOB").textContent =
    profile.dob
      ? formatDate(profile.dob)
      : "—";

  $("#profileAge").textContent =
    calculateAge(profile.dob);

  $("#profileBirthPlace").textContent =
    profile.birthPlace || "—";

  $("#profileCompany").textContent =
    profile.company || "—";

  $("#profilePosition").textContent =
    profile.position || "—";


  renderRates();

  renderMonthlyEarnings();

}


function renderRates() {

  $("#rateList").innerHTML =
    Object.entries(WORK_RATES)
      .map(
        ([key, rate]) => {

          const hourly =
            CONFIG.baseHourlyRate *
            rate.multiplier;


          return `
            <div class="rate-row">

              <span>
                ${esc(rate.label)}
              </span>

              <span class="multiplier">
                ×${rate.multiplier.toFixed(1)}
              </span>

              <strong>
                ${formatEuro(hourly)} / h
              </strong>

            </div>
          `;

        }
      )
      .join("");

}


function calculateMonthlyEarnings() {

  const entries =
    state.crew.workEntries;


  return entries.reduce(
    (sum, entry) => {

      const rate =
        WORK_RATES[entry.type];


      if (!rate) {
        return sum;
      }


      const hours =
        num(entry.endHour) -
        num(entry.startHour);


      return (
        sum +
        hours *
        CONFIG.baseHourlyRate *
        rate.multiplier
      );

    },
    0
  );

}


function renderMonthlyEarnings() {

  $("#monthlyEarnings").textContent =
    formatEuro(
      calculateMonthlyEarnings()
    );

}


/* =========================================================
   WORK CALENDAR
   ========================================================= */

let calendarMonth =
  new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );


let workSelection = null;
let workSelecting = false;


function dateKey(date) {

  const pad =
    n => String(n).padStart(2, "0");

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-");

}


function selectionDateTime(date, hour) {

  const d =
    new Date(date);

  d.setHours(
    hour,
    0,
    0,
    0
  );

  return d;

}


function normalizeSelection() {

  if (!workSelection) {
    return null;
  }


  const start =
    selectionDateTime(
      workSelection.startDate,
      workSelection.startHour
    );


  const end =
    selectionDateTime(
      workSelection.endDate,
      workSelection.endHour + 1
    );


  if (start <= end) {

    return {
      start,
      end
    };

  }


  return {
    start: end,
    end: start
  };

}


function cellInSelection(
  cellDate,
  hour
) {

  const selection =
    normalizeSelection();


  if (!selection) {
    return false;
  }


  const start =
    selectionDateTime(
      cellDate,
      hour
    );


  const end =
    selectionDateTime(
      cellDate,
      hour + 1
    );


  return (
    start < selection.end &&
    end > selection.start
  );

}


function renderWorkCalendar() {

  const calendar =
    $("#workCalendar");


  const year =
    calendarMonth.getFullYear();

  const month =
    calendarMonth.getMonth();


  const days =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  $("#workMonthTitle").textContent =
    new Date(
      year,
      month,
      1
    ).toLocaleDateString(
      "de-DE",
      {
        month: "long",
        year: "numeric"
      }
    );


  calendar.style.gridTemplateColumns =
    `58px repeat(${days}, minmax(32px, 1fr))`;


  let html = "";


  html += `
    <div class="work-header-cell work-corner">
      UTC / LOCAL
    </div>
  `;


  for (let d = 1; d <= days; d++) {

    const date =
      new Date(
        year,
        month,
        d
      );


    html += `
      <div class="work-header-cell">

        <span>
          ${date.toLocaleDateString(
            "de-DE",
            { weekday: "short" }
          )}
        </span>

        <strong>
          ${String(d).padStart(2, "0")}
        </strong>

      </div>
    `;

  }


  for (
    let hour = 0;
    hour < 24;
    hour++
  ) {

    html += `
      <div class="work-hour-label">
        ${String(hour).padStart(2, "0")}:00
      </div>
    `;


    for (
      let d = 1;
      d <= days;
      d++
    ) {

      const date =
        new Date(
          year,
          month,
          d
        );


      const dateString =
        dateKey(date);


      const entry =
        findWorkEntry(
          dateString,
          hour
        );


      let classes =
        "work-cell";


      if (entry) {

        classes +=
          ` work-${entry.type}`;

      }


      if (
        cellInSelection(
          date,
          hour
        )
      ) {

        classes +=
          " selected";

      }


      html += `
        <div
          class="${classes}"
          data-date="${dateString}"
          data-hour="${hour}"
          title="${
            entry
              ? esc(
                  `${WORK_RATES[
                    entry.type
                  ]?.label || entry.type} — ${
                    entry.notes || ""
                  }`
                )
              : ""
          }"
        ></div>
      `;

    }

  }


  calendar.innerHTML =
    html;


  bindWorkCells();

}


function findWorkEntry(
  date,
  hour
) {

  return state.crew.workEntries.find(
    entry =>
      entry.date === date &&
      hour >= entry.startHour &&
      hour < entry.endHour
  );

}


function bindWorkCells() {

  $all(".work-cell")
    .forEach(cell => {

      cell.addEventListener(
        "pointerdown",
        event => {

          event.preventDefault();

          workSelecting = true;

          workSelection = {

            startDate:
              new Date(
                `${cell.dataset.date}T00:00:00`
              ),

            startHour:
              Number(
                cell.dataset.hour
              ),

            endDate:
              new Date(
                `${cell.dataset.date}T00:00:00`
              ),

            endHour:
              Number(
                cell.dataset.hour
              )

          };


          renderWorkCalendar();

        }
      );


      cell.addEventListener(
        "pointerenter",
        () => {

          if (!workSelecting) {
            return;
          }


          workSelection.endDate =
            new Date(
              `${cell.dataset.date}T00:00:00`
            );

          workSelection.endHour =
            Number(
              cell.dataset.hour
            );


          renderWorkCalendar();

        }
      );

    });


  document.addEventListener(
    "pointerup",
    finishWorkSelection,
    {
      once: true
    }
  );

}


function finishWorkSelection() {

  if (!workSelecting) {
    return;
  }


  workSelecting = false;


  const selection =
    normalizeSelection();


  if (!selection) {
    return;
  }


  const hours =
    (
      selection.end -
      selection.start
    ) /
    36e5;


  if (hours <= 0) {
    return;
  }


  $("#workSelectionInfo").textContent =
    `${selection.start.toLocaleString(
      "de-DE"
    )} → ${selection.end.toLocaleString(
      "de-DE"
    )} · ${hours.toFixed(1)} h`;


  updateWorkRatePreview();


  $("#workDialog").showModal();

}


$("#workActivity")
  .addEventListener(
    "change",
    updateWorkRatePreview
  );


function updateWorkRatePreview() {

  const selection =
    normalizeSelection();


  if (!selection) {
    return;
  }


  const hours =
    (
      selection.end -
      selection.start
    ) /
    36e5;


  const type =
    $("#workActivity").value;


  const rate =
    WORK_RATES[type];


  if (!rate) {
    return;
  }


  const hourly =
    CONFIG.baseHourlyRate *
    rate.multiplier;


  const total =
    hours * hourly;


  $("#workRatePreview").textContent =
    `${hours.toFixed(1)} h × ` +
    `${formatEuro(hourly)} / h = ` +
    `${formatEuro(total)}`;

}


$("#workForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const selection =
        normalizeSelection();


      if (!selection) {
        return;
      }


      const type =
        $("#workActivity").value;


      const notes =
        $("#workNotes")
          .value
          .trim();


      /*
        Split a selection over midnight
        into separate daily entries.
      */

      let cursor =
        new Date(selection.start);


      while (
        cursor < selection.end
      ) {

        const date =
          new Date(cursor);


        const dayEnd =
          new Date(
            date
          );

        dayEnd.setHours(
          24,
          0,
          0,
          0
        );


        const segmentEnd =
          new Date(
            Math.min(
              dayEnd.getTime(),
              selection.end.getTime()
            )
          );


        const startHour =
          date.getHours();

        const endHour =
          segmentEnd.getHours() === 0
            ? 24
            : segmentEnd.getHours();


        state.crew.workEntries.push({

          id:
            crypto.randomUUID
              ? crypto.randomUUID()
              : String(Date.now()),

          date:
            dateKey(date),

          startHour,

          endHour,

          type,

          notes

        });


        cursor =
          new Date(segmentEnd);


        if (
          cursor <= date
        ) {
          break;
        }

      }


      saveState();

      workSelection = null;

      $("#workNotes").value = "";

      $("#workDialog").close();

      renderWorkCalendar();

      renderMonthlyEarnings();

      showToast(
        "Arbeitszeit gespeichert."
      );

    }
  );


$("#previousMonth")
  .addEventListener(
    "click",
    () => {

      calendarMonth =
        new Date(
          calendarMonth.getFullYear(),
          calendarMonth.getMonth() - 1,
          1
        );

      renderWorkCalendar();

    }
  );


$("#nextMonth")
  .addEventListener(
    "click",
    () => {

      calendarMonth =
        new Date(
          calendarMonth.getFullYear(),
          calendarMonth.getMonth() + 1,
          1
        );

      renderWorkCalendar();

    }
  );


$("#todayMonth")
  .addEventListener(
    "click",
    () => {

      const now =
        new Date();

      calendarMonth =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          1
        );

      renderWorkCalendar();

    }
  );


/* =========================================================
   REPORTS
   ========================================================= */

$("#reportPeriod")
  .addEventListener(
    "change",
    () => {

      const custom =
        $("#reportPeriod").value ===
        "custom";


      $("#customStartWrap")
        .classList.toggle(
          "hidden",
          !custom
        );

      $("#customEndWrap")
        .classList.toggle(
          "hidden",
          !custom
        );

    }
  );


function getReportRange() {

  const now =
    new Date();


  const period =
    $("#reportPeriod").value;


  if (period === "today") {

    const start =
      new Date(now);

    start.setHours(
      0, 0, 0, 0
    );

    return {
      start,
      end: now
    };

  }


  if (period === "24h") {

    return {
      start:
        new Date(
          now.getTime() -
          24 * 60 * 60 * 1000
        ),
      end: now
    };

  }


  const days =
    {
      "7d": 7,
      "14d": 14,
      "30d": 30
    }[period];


  if (days) {

    return {
      start:
        new Date(
          now.getTime() -
          days *
          24 *
          60 *
          60 *
          1000
        ),
      end: now
    };

  }


  if (period === "custom") {

    const start =
      new Date(
        `${$("#reportStart").value}T00:00:00`
      );

    const end =
      new Date(
        `${$("#reportEnd").value}T23:59:59`
      );


    return {
      start,
      end
    };

  }


  return {
    start:
      new Date(
        now.getTime() -
        24 * 60 * 60 * 1000
      ),
    end: now
  };

}


function filteredOperations() {

  const range =
    getReportRange();


  return state.operations
    .filter(entry => {

      const time =
        new Date(entry.timestamp);

      return (
        time >= range.start &&
        time <= range.end
      );

    })
    .sort(
      (a, b) =>
        new Date(a.timestamp) -
        new Date(b.timestamp)
    );

}


function reportHeader(title) {

  return `
    <div class="report-title">

      <div class="eyebrow">
        CREW / SHIPBOARD OPERATIONS SYSTEM
      </div>

      <h2>
        ${esc(title)}
      </h2>

      <p>
        Vessel:
        <strong>
          ${esc(CONFIG.vesselName)}
        </strong>
        · Generated:
        ${esc(
          formatDateTime(
            new Date().toISOString()
          )
        )}
      </p>

    </div>
  `;

}


function reportCondition() {

  const c =
    state.condition;


  const meanDraft =
    (
      num(c.draftFwd) +
      num(c.draftAft)
    ) / 2;


  return `
    <div class="report-section">

      <h3>Ship Condition</h3>

      <table class="report-table">

        <tr>
          <th>Parameter</th>
          <th>Value</th>
        </tr>

        <tr>
          <td>Freeboard Port</td>
          <td>${formatNumber(c.freeboardPort, 2)} m</td>
        </tr>

        <tr>
          <td>Freeboard Starboard</td>
          <td>${formatNumber(c.freeboardStarboard, 2)} m</td>
        </tr>

        <tr>
          <td>Draft Forward</td>
          <td>${formatNumber(c.draftFwd, 2)} m</td>
        </tr>

        <tr>
          <td>Draft Aft</td>
          <td>${formatNumber(c.draftAft, 2)} m</td>
        </tr>

        <tr>
          <td>Mean Draft</td>
          <td>${formatNumber(meanDraft, 2)} m</td>
        </tr>

        <tr>
          <td>Air Draft</td>
          <td>${formatNumber(c.airDraft, 2)} m</td>
        </tr>

        <tr>
          <td>Water Depth</td>
          <td>${formatNumber(c.waterDepth, 2)} m</td>
        </tr>

        <tr>
          <td>Air Temperature</td>
          <td>${formatNumber(c.airTemp, 1)} °C</td>
        </tr>

        <tr>
          <td>Water Temperature</td>
          <td>${formatNumber(c.waterTemp, 1)} °C</td>
        </tr>

      </table>

    </div>
  `;

}


function reportVoyage() {

  const v =
    state.voyage;


  return `
    <div class="report-section">

      <h3>Voyage</h3>

      <table class="report-table">

        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>

        <tr>
          <td>From</td>
          <td>${esc(v.from)}</td>
        </tr>

        <tr>
          <td>Next Port</td>
          <td>${esc(v.to)}</td>
        </tr>

        <tr>
          <td>ETA</td>
          <td>${esc(formatDateTime(v.eta))}</td>
        </tr>

        <tr>
          <td>ETD</td>
          <td>${esc(formatDateTime(v.etd))}</td>
        </tr>

        <tr>
          <td>Pilot Arrival</td>
          <td>${esc(formatDateTime(v.pilotArrival))}</td>
        </tr>

        <tr>
          <td>Pilot Departure</td>
          <td>${esc(formatDateTime(v.pilotDeparture))}</td>
        </tr>

      </table>

    </div>
  `;

}


function reportCargo() {

  const totals =
    cargoTotals();


  return `
    <div class="report-section">

      <h3>Cargo</h3>

      <table class="report-table">

        <tr>
          <th>Metric</th>
          <th>Quantity</th>
        </tr>

        <tr>
          <td>Cargo onboard</td>
          <td>${formatNumber(totals.current)} m³</td>
        </tr>

        <tr>
          <td>Loaded today</td>
          <td>${formatNumber(totals.loaded)} m³</td>
        </tr>

        <tr>
          <td>Discharged today</td>
          <td>${formatNumber(totals.discharged)} m³</td>
        </tr>

        <tr>
          <td>Daily capacity</td>
          <td>${formatNumber(CONFIG.dailyCargoCapacity, 0)} m³</td>
        </tr>

      </table>


      <h3>Tank Status</h3>

      <table class="report-table">

        <tr>
          <th>Tank</th>
          <th>Status</th>
          <th>Product</th>
          <th>Current</th>
          <th>Capacity</th>
        </tr>

        ${
          state.cargo.tanks
            .map(
              tank => `
                <tr>

                  <td>${esc(tank.name)}</td>

                  <td>${esc(tank.status)}</td>

                  <td>${esc(tank.product)}</td>

                  <td>
                    ${formatNumber(tank.currentM3)} m³
                  </td>

                  <td>
                    ${formatNumber(tank.capacityM3)} m³
                  </td>

                </tr>
              `
            )
            .join("")
        }

      </table>

    </div>
  `;

}


function reportBallast() {

  const total =
    state.ballast.tanks
      .reduce(
        (sum, tank) =>
          sum + num(tank.currentM3),
        0
      );


  return `
    <div class="report-section">

      <h3>Ballast</h3>

      <table class="report-table">

        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>

        <tr>
          <td>Total ballast onboard</td>
          <td>${formatNumber(total)} m³</td>
        </tr>

      </table>

      <table class="report-table">

        <tr>
          <th>Tank</th>
          <th>Status</th>
          <th>Current</th>
          <th>Capacity</th>
        </tr>

        ${
          state.ballast.tanks
            .map(
              tank => `
                <tr>

                  <td>
                    ${esc(
                      tank.displayName ||
                      tank.name
                    )}
                  </td>

                  <td>
                    ${esc(tank.status)}
                  </td>

                  <td>
                    ${formatNumber(tank.currentM3)} m³
                  </td>

                  <td>
                    ${formatNumber(tank.capacityM3)} m³
                  </td>

                </tr>
              `
            )
            .join("")
        }

      </table>

    </div>
  `;

}


function reportOperations() {

  const entries =
    filteredOperations();


  return `
    <div class="report-section">

      <h3>Operations</h3>

      ${
        entries.length
          ? `
            <table class="report-table">

              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Done</th>
                <th>Next</th>
              </tr>

              ${
                entries
                  .map(
                    entry => `
                      <tr>

                        <td>
                          ${esc(
                            formatDateTime(
                              entry.timestamp
                            )
                          )}
                        </td>

                        <td>
                          ${esc(entry.type)}
                        </td>

                        <td>
                          ${esc(entry.done)}
                        </td>

                        <td>
                          ${esc(entry.next)}
                        </td>

                      </tr>
                    `
                  )
                  .join("")
              }

            </table>
          `
          : `
            <div class="empty-state">
              No operations in selected period.
            </div>
          `
      }

    </div>
  `;

}


function reportCrew() {

  const entries =
    state.crew.workEntries;


  const total =
    calculateMonthlyEarnings();


  const hours =
    entries.reduce(
      (sum, entry) =>
        sum +
        num(entry.endHour) -
        num(entry.startHour),
      0
    );


  return `
    <div class="report-section">

      <h3>Crew Work</h3>

      <table class="report-table">

        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>

        <tr>
          <td>Crew Member</td>
          <td>
            ${esc(
              state.crew.profile.lastName
            )},
            ${esc(
              state.crew.profile.firstName
            )}
          </td>
        </tr>

        <tr>
          <td>Company</td>
          <td>${esc(state.crew.profile.company)}</td>
        </tr>

        <tr>
          <td>Position</td>
          <td>${esc(state.crew.profile.position)}</td>
        </tr>

        <tr>
          <td>Total Hours</td>
          <td>${hours.toFixed(1)} h</td>
        </tr>

        <tr>
          <td>Calculated Earnings</td>
          <td>${formatEuro(total)}</td>
        </tr>

      </table>

    </div>
  `;

}


function generateReport() {

  const type =
    $("#reportType").value;


  const titles = {

    daily: "Daily Ship Report",
    voyage: "Voyage Report",
    cargo: "Cargo Report",
    ballast: "Ballast Report",
    operations: "Operations Report",
    crew: "Crew Work Report",
    full: "Full Ship Report"

  };


  let html =
    `<div class="report-sheet">` +
    reportHeader(
      titles[type]
    );


  if (
    type === "daily" ||
    type === "voyage" ||
    type === "full"
  ) {

    html += reportVoyage();

  }


  if (
    type === "daily" ||
    type === "full"
  ) {

    html += reportCondition();

  }


  if (
    type === "cargo" ||
    type === "daily" ||
    type === "full"
  ) {

    html += reportCargo();

  }


  if (
    type === "ballast" ||
    type === "full"
  ) {

    html += reportBallast();

  }


  if (
    type === "operations" ||
    type === "daily" ||
    type === "full"
  ) {

    html += reportOperations();

  }


  if (
    type === "crew" ||
    type === "full"
  ) {

    html += reportCrew();

  }


  html += `

    <div class="print-signature">

      <div>
        Master / Officer
      </div>

      <div>
        Date / Time
      </div>

    </div>

  </div>`;


  $("#reportPreview").innerHTML =
    html;


  $("#printSheet").innerHTML =
    html;


  showToast(
    "Report erstellt."
  );

}


$("#generateReportBtn")
  .addEventListener(
    "click",
    generateReport
  );


$("#printReportBtn")
  .addEventListener(
    "click",
    () => {

      if (
        !$("#reportPreview")
          .querySelector(".report-sheet")
      ) {

        generateReport();

      }

      setTimeout(
        () => window.print(),
        100
      );

    }
  );


/* =========================================================
   BACKUP / IMPORT
   ========================================================= */

$("#exportDataBtn")
  .addEventListener(
    "click",
    () => {

      const data =
        JSON.stringify(
          state,
          null,
          2
        );


      const blob =
        new Blob(
          [data],
          {
            type:
              "application/json"
          }
        );


      const url =
        URL.createObjectURL(
          blob
        );


      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        `CREW_CUNO_ESSBERGER_BACKUP_${
          new Date()
            .toISOString()
            .slice(0, 10)
        }.json`;

      a.click();

      URL.revokeObjectURL(url);


      showToast(
        "Backup JSON erstellt."
      );

    }
  );


$("#importDataInput")
  .addEventListener(
    "change",
    event => {

      const file =
        event.target.files?.[0];


      if (!file) {
        return;
      }


      const reader =
        new FileReader();


      reader.onload =
        () => {

          try {

            const imported =
              JSON.parse(
                reader.result
              );


            state =
              mergeState(
                createDefaultState(),
                imported
              );


            saveState();

            renderAll();

            showToast(
              "Backup erfolgreich importiert."
            );


          } catch (error) {

            console.error(error);

            showToast(
              "Ungültige JSON-Datei."
            );

          }

        };


      reader.readAsText(file);

      event.target.value = "";

    }
  );


/* =========================================================
   CHECKLISTS
   ========================================================= */

let activeChecklist =
  CHECKLISTS[0].id;


function getChecklistState(id) {

  if (!state.checklists[id]) {

    const checklist =
      CHECKLISTS.find(
        item => item.id === id
      );


    state.checklists[id] = {

      checked:
        checklist.items.map(
          () => false
        ),

      notes: "",
      officer: ""

    };

  }


  return state.checklists[id];

}


function renderChecklistMenu() {

  $("#checklistButtons").innerHTML =
    CHECKLISTS
      .map(
        checklist => `

          <button
            class="checklist-button ${
              checklist.id ===
              activeChecklist
                ? "active"
                : ""
            }"
            data-checklist="${esc(
              checklist.id
            )}"
          >

            ${esc(
              checklist.title
            )}

          </button>

        `
      )
      .join("");


  $all(
    ".checklist-button"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        activeChecklist =
          button.dataset.checklist;

        renderChecklists();

      }
    );

  });

}


function renderChecklistForm() {

  const checklist =
    CHECKLISTS.find(
      item =>
        item.id === activeChecklist
    );


  if (!checklist) {
    return;
  }


  const saved =
    getChecklistState(
      checklist.id
    );


  $("#checklistTitle").textContent =
    checklist.title;


  $("#checklistForm").innerHTML = `

    <div>

      ${
        checklist.items
          .map(
            (item, index) => `

              <div class="check-item">

                <input
                  type="checkbox"
                  id="check-${index}"
                  data-check-index="${index}"
                  ${
                    saved.checked[index]
                      ? "checked"
                      : ""
                  }
                >

                <label for="check-${index}">
                  ${esc(item)}
                </label>

              </div>

            `
          )
          .join("")
      }

    </div>


    <div class="checklist-footer">

      <label>
        Notes

        <textarea
          id="checklistNotes"
          rows="5"
        >${esc(
          saved.notes
        )}</textarea>

      </label>


      <div class="checklist-sign">

        <label>
          Officer / Responsible
          <input
            id="checklistOfficer"
            value="${esc(
              saved.officer
            )}"
          >
        </label>

        <label>
          Date / Time
          <input
            value="${esc(
              formatDateTime(
                new Date().toISOString()
              )
            )}"
            disabled
          >
        </label>

      </div>

    </div>

  `;


  $all(
    "[data-check-index]"
  )
  .forEach(input => {

    input.addEventListener(
      "change",
      () => {

        saved.checked[
          Number(
            input.dataset.checkIndex
          )
        ] =
          input.checked;

        saveState();

      }
    );

  });


  $("#checklistNotes")
    .addEventListener(
      "input",
      () => {

        saved.notes =
          $("#checklistNotes").value;

        saveState();

      }
    );


  $("#checklistOfficer")
    .addEventListener(
      "input",
      () => {

        saved.officer =
          $("#checklistOfficer").value;

        saveState();

      }
    );

}


function renderChecklists() {

  renderChecklistMenu();
  renderChecklistForm();

}


function checklistPrintHTML() {

  const checklist =
    CHECKLISTS.find(
      item =>
        item.id === activeChecklist
    );


  const saved =
    getChecklistState(
      activeChecklist
    );


  return `

    <div class="report-sheet">

      ${reportHeader(
        `Checklist — ${checklist.title}`
      )}


      <div class="report-section">

        <table class="report-table">

          <tr>
            <th style="width:70px">
              Status
            </th>

            <th>
              Item
            </th>
          </tr>


          ${
            checklist.items
              .map(
                (item, index) => `

                  <tr>

                    <td>
                      ${
                        saved.checked[index]
                          ? "✓"
                          : "☐"
                      }
                    </td>

                    <td>
                      ${esc(item)}
                    </td>

                  </tr>

                `
              )
              .join("")
          }

        </table>

      </div>


      <div class="report-section">

        <h3>Notes</h3>

        <p>
          ${esc(
            saved.notes ||
            "—"
          )}
        </p>

      </div>


      <div class="report-section">

        <p>
          Officer / Responsible:
          <strong>
            ${esc(
              saved.officer ||
              "—"
            )}
          </strong>
        </p>

      </div>


      <div class="print-signature">

        <div>
          Signature
        </div>

        <div>
          Date / Time
        </div>

      </div>

    </div>

  `;

}


$("#printChecklistBtn")
  .addEventListener(
    "click",
    () => {

      const html =
        checklistPrintHTML();


      $("#printSheet").innerHTML =
        html;


      window.print();

    }
  );


$("#downloadChecklistBtn")
  .addEventListener(
    "click",
    () => {

      const html =
        `<!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <title>
            CREW Checklist
          </title>

          <style>

            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              color: #111;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th, td {
              padding: 8px;
              border: 1px solid #aaa;
              text-align: left;
            }

            h1 {
              border-bottom: 2px solid #111;
              padding-bottom: 10px;
            }

            .signature {
              margin-top: 70px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 50px;
            }

            .signature div {
              border-top: 1px solid #111;
              padding-top: 5px;
            }

          </style>

        </head>

        <body>

          ${checklistPrintHTML()}

        </body>
        </html>`;


      const blob =
        new Blob(
          [html],
          {
            type:
              "text/html;charset=utf-8"
          }
        );


      const url =
        URL.createObjectURL(blob);


      const a =
        document.createElement("a");


      a.href = url;

      a.download =
        `CREW_Checklist_${
          activeChecklist
        }_${
          new Date()
            .toISOString()
            .slice(0, 10)
        }.html`;


      a.click();

      URL.revokeObjectURL(url);


      showToast(
        "Checklist heruntergeladen."
      );

    }
  );


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

  const totals =
    cargoTotals();


  $("#dashCargoTotal").textContent =
    `${formatNumber(totals.current)} m³`;

  $("#dashLoadedToday").textContent =
    `${formatNumber(totals.loaded)} m³`;

  $("#dashDischargedToday").textContent =
    `${formatNumber(totals.discharged)} m³`;


  const draftFwd =
    num(
      state.condition.draftFwd
    );

  const draftAft =
    num(
      state.condition.draftAft
    );


  const hasDraft =
    state.condition.draftFwd !== "" ||
    state.condition.draftAft !== "";


  const meanDraft =
    (
      draftFwd +
      draftAft
    ) / 2;


  $("#dashMeanDraft").textContent =
    hasDraft
      ? `${formatNumber(meanDraft, 2)} m`
      : "—";


  const freeboardValues = [
    state.condition.freeboardPort,
    state.condition.freeboardStarboard
  ]
  .filter(
    value =>
      value !== "" &&
      value !== null &&
      value !== undefined
  )
  .map(Number);


  const averageFreeboard =
    freeboardValues.length
      ? freeboardValues.reduce(
          (a, b) => a + b,
          0
        ) /
        freeboardValues.length
      : null;


  $("#dashFreeboard").textContent =
    averageFreeboard !== null
      ? `${formatNumber(
          averageFreeboard,
          2
        )} m`
      : "—";


  $("#dashFrom").textContent =
    state.voyage.from || "—";

  $("#dashTo").textContent =
    state.voyage.to || "—";

  $("#dashETA").textContent =
    formatDateTime(
      state.voyage.eta
    );

  $("#dashETD").textContent =
    formatDateTime(
      state.voyage.etd
    );


  const pilot =
    state.voyage.pilotArrival ||
    state.voyage.pilotDeparture;


  $("#dashPilot").textContent =
    pilot
      ? formatDateTime(pilot)
      : "—";


  $("#dashDraftFwd").textContent =
    state.condition.draftFwd !== ""
      ? `${formatNumber(
          state.condition.draftFwd,
          2
        )} m`
      : "—";

  $("#dashDraftAft").textContent =
    state.condition.draftAft !== ""
      ? `${formatNumber(
          state.condition.draftAft,
          2
        )} m`
      : "—";

  $("#dashAirDraft").textContent =
    state.condition.airDraft !== ""
      ? `${formatNumber(
          state.condition.airDraft,
          2
        )} m`
      : "—";

  $("#dashWaterDepth").textContent =
    state.condition.waterDepth !== ""
      ? `${formatNumber(
          state.condition.waterDepth,
          2
        )} m`
      : "—";

  $("#dashAirTemp").textContent =
    state.condition.airTemp !== ""
      ? `${formatNumber(
          state.condition.airTemp,
          1
        )} °C`
      : "—";

  $("#dashWaterTemp").textContent =
    state.condition.waterTemp !== ""
      ? `${formatNumber(
          state.condition.waterTemp,
          1
        )} °C`
      : "—";


  if (
    state.vessel.aisTimestamp
  ) {

    $("#dashAISInfo").textContent =
      formatDateTime(
        state.vessel.aisTimestamp
      );

  }


  renderDashboardCargo();

}


/* =========================================================
   RENDER ALL
   ========================================================= */

function renderAll() {

  renderCargo();

  renderBallast();

  loadVoyageForm();

  renderOperations();

  renderCrew();

  renderChecklists();

  updateDashboard();

  updateMap();

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initMap();

    renderAll();

    $("#operationTime").value =
      localDateTimeValue();


    /*
      If there is no crew profile yet,
      open the local profile dialog once.
    */

    if (
      !state.crew.profile.firstName &&
      !state.crew.profile.lastName
    ) {

      setTimeout(
        () => openCrewProfile(),
        600
      );

    }


    /*
      Initial AIS attempt only if a
      Worker URL has been configured.
    */

    if (CONFIG.marineApiUrl) {

      refreshAIS();

    } else {

      showAISOffline(
        "MarineTraffic Worker not configured"
      );

    }

  }
);
