/* =========================================================
   NAVTEX SIMULATOR — APPLICATION
========================================================= */

/* Configuration */
const CONFIG = {
    appName: "NAVTEX",
    stations: {
        "A": { name: "EMDEN", region: "Deutsche Bucht" },
        "B": { name: "BREMEN", region: "Dogger" },
        "C": { name: "HAMBURG", region: "Fisher" },
        "D": { name: "KIEL", region: "Deutsches Bucht" },
        "E": { name: "ROSTOCK", region: "Bornholm" },
        "F": { name: "LÜBECK", region: "Øresund" },
        "G": { name: "STRALSUND", region: "Arkona" },
        "H": { name: "WISMAR", region: "Bornholm" },
        "I": { name: "CUXHAVEN", region: "Dogger" },
        "J": { name: "HELGOLAND", region: "Fisher" },
        "K": { name: "BORKUM", region: "German Bight" },
        "L": { name: "BÜSUM", region: "Bailey" },
        "M": { name: "AMRUM", region: "SE Bailey" },
        "N": { name: "SYLT", region: "Fair Isle" },
        "O": { name: "FÖHR", region: "Faeroes" },
        "P": { name: "PELLWORM", region: "SE Faeroes" },
        "Q": { name: "NORDDEICH", region: "Hebrides" },
        "R": { name: "BENSERSIEL", region: "Bailey" },
        "S": { name: "HUSUM", region: "Fair Isle" },
        "T": { name: "FRIEDRICHSKOOG", region: "Faeroes" },
        "U": { name: "BRUNSBÜTTEL", region: "SE Faeroes" },
        "V": { name: "GLÜCKSTADT", region: "NE Atlantic" },
        "W": { name: "WEDEL", region: "Hebrides" },
        "X": { name: "HAMBURG PORT", region: "Bailey" },
        "Y": { name: "HAMBURG WEST", region: "Fair Isle" },
        "Z": { name: "HAMBURG OST", region: "Faeroes" }
    },
    messageTypes: ["WETTER", "WETTERVORHERSAGE", "NAV. EREIGNISSE", "STURM"],
    weatherData: [
        "WINDRICHTUNG 180 - 210 GRAD, WINDGESCHWINDIGKEIT 12 - 16 KN",
        "WINDRICHTUNG 240 - 270 GRAD, WINDGESCHWINDIGKEIT 18 - 24 KN",
        "WINDRICHTUNG 150 - 180 GRAD, WINDGESCHWINDIGKEIT 8 - 12 KN",
        "WINDRICHTUNG 300 - 330 GRAD, WINDGESCHWINDIGKEIT 14 - 18 KN",
        "WINDRICHTUNG 90 - 120 GRAD, WINDGESCHWINDIGKEIT 10 - 15 KN",
    ],
    forecastData: [
        "VORHERSAGE: ZUNEHMEND NORDWESTWIND, WINDGESCHWINDIGKEIT 20 - 28 KN AM ABEND",
        "VORHERSAGE: WECHSELNDE WINDRICHTUNG, WINDGESCHWINDIGKEIT 12 - 16 KN DAUERND",
        "VORHERSAGE: FLACHWERD. WIND, WINDGESCHWINDIGKEIT UNTER 8 KN",
        "VORHERSAGE: AUFFRISCHENDER WESTWIND, WINDGESCHWINDIGKEIT 16 - 24 KN",
    ],
    navigationData: [
        "WRACK IN POSITION 54.30N 08.15E - TIEFE 12 METER - SICHTBARKEITSBEREICH 2 NM",
        "NAVIGATORISCHER HINWEIS: KABELVERLEGUNG ZWISCHEN 55.10N 09.20E UND 55.15N 09.35E",
        "BAUSTELLE OFFSHORE-ANLAGE IN POSITION 54.45N 07.50E - SPERRZONE 500M",
        "ÖLPLATTFORM WARTUNG: BEREICH UM 53.80N 06.50E MEIDEN - KRANE BETRIEB",
    ],
    hurricaneNames: [
        "ALICE", "BOB", "CARLOS", "DIANA", "ERNEST", "FIONA", "GEORGE",
        "HANNAH", "IVAN", "JULIA", "KARL", "LISA", "MARCO", "NORA",
        "OTTO", "PAULA", "RICHARD", "SHARY", "TOBIAS", "URSULA", "VICTOR", "WANDA"
    ],
    hurricaneStrengths: [
        { name: "TROPICAL STORM", windKt: 45, windMph: 52 },
        { name: "HURRICANE CAT 1", windKt: 75, windMph: 86 },
        { name: "HURRICANE CAT 2", windKt: 95, windMph: 109 },
        { name: "HURRICANE CAT 3", windKt: 110, windMph: 127 }
    ]
};

/* DOM Elements */
const areaInput = document.getElementById("areaInput");
const displayArea = document.getElementById("displayArea");
const displayStation = document.getElementById("displayStation");
const displayTime = document.getElementById("displayTime");
const displayScreen = document.getElementById("displayScreen");
const statusText = document.getElementById("statusText");
const statusIndicator = document.getElementById("statusIndicator");
const activeArea = document.getElementById("activeArea");
const enterButton = document.getElementById("enterButton");
const clearButton = document.getElementById("clearButton");
const printButton = document.getElementById("printButton");
const hurricaneToggleBtn = document.getElementById("hurricaneToggleBtn");
const areaButtons = document.querySelectorAll(".area-btn");
const messagesGrid = document.getElementById("messagesGrid");
const pageProgress = document.getElementById("pageProgress");

/* State */
let currentArea = null;
let currentMessage = null;
let messageHistory = [];
let isDisplaying = false;
let hurricanesEnabled = false;

/* Initialization */
document.addEventListener("DOMContentLoaded", () => {
    initializeEventListeners();
    updateClock();
    setInterval(updateClock, 1000);
    document.getElementById("year").textContent = new Date().getFullYear();
    setupScrollReveal();
    setupScrollProgress();
});

/* Event Listeners */
function initializeEventListeners() {
    enterButton.addEventListener("click", handleEnter);
    clearButton.addEventListener("click", handleClear);
    printButton.addEventListener("click", handlePrint);
    if (hurricaneToggleBtn) {
        hurricaneToggleBtn.addEventListener("click", toggleHurricanes);
    }
    
    areaInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleEnter();
        } else if (e.key.toUpperCase().match(/[A-Z]/)) {
            const area = e.key.toUpperCase();
            if (CONFIG.stations[area]) {
                areaInput.value = area;
            }
        }
    });

    areaInput.addEventListener("input", (e) => {
        let value = e.target.value.toUpperCase();
        value = value.replace(/[^A-Z]/g, "");
        if (value.length > 1) {
            value = value.slice(-1);
        }
        e.target.value = value;
    });

    areaButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const area = btn.dataset.area;
            areaInput.value = area;
            currentArea = area;
            updateAreaButtons();
            handleEnter();
        });
    });
}

/* Toggle Hurricanes */
function toggleHurricanes() {
    hurricanesEnabled = !hurricanesEnabled;
    if (hurricaneToggleBtn) {
        hurricaneToggleBtn.classList.toggle("active", hurricanesEnabled);
        hurricaneToggleBtn.textContent = hurricanesEnabled ? 
            "⚠ STURMWARNUNGEN: AN" : 
            "🌀 STURMWARNUNGEN: AUS";
    }
}

/* Area Button Updates */
function updateAreaButtons() {
    areaButtons.forEach(btn => {
        if (btn.dataset.area === currentArea) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

/* Clock Update */
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    displayTime.textContent = time;
}

/* Generate Hurricane Message */
function generateHurricaneMessage(area) {
    const station = CONFIG.stations[area];
    const hurricaneName = CONFIG.hurricaneNames[Math.floor(Math.random() * CONFIG.hurricaneNames.length)];
    const strength = CONFIG.hurricaneStrengths[Math.floor(Math.random() * CONFIG.hurricaneStrengths.length)];
    
    // Random position in Atlantic/North Sea area
    const latitude = 18 + Math.random() * 25;
    const longitude = 20 + Math.random() * 60;
    const movement = 280 + Math.floor(Math.random() * 80); // 280-360 degrees
    const speed = 8 + Math.floor(Math.random() * 20); // 8-28 kt
    
    // Generate forecast positions
    const now = new Date();
    const today = now.getDate();
    const tomorrow = today + 1;
    const nextDay = today + 2;
    
    const lat1 = (latitude + Math.random() * 3).toFixed(1);
    const lon1 = (longitude + Math.random() * 3).toFixed(1);
    const lat2 = (latitude + Math.random() * 6).toFixed(1);
    const lon2 = (longitude + Math.random() * 6).toFixed(1);
    
    const forecastContent = `ZCZC MIATCMAT3 ALL
TTAA00 KNHC DDHHMM CCA
HURRICANE ${hurricaneName} FORECAST/ADVISORY...CORRECTED
NWS TPC/NATIONAL HURRICANE CENTER MIAMI FL AL${(Math.floor(Math.random() * 900) + 100).toString()}
${String(today).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')} UTC
SPECIAL ADVISORY ISSUED

AT ${String(now.getHours()).padStart(2, '0')} AST...${String(now.getHours() + 4).padStart(2, '0')} UTC...
A HURRICANE WATCH HAS BEEN ISSUED FOR THE COASTAL AREAS.

HURRICANE CENTER LOCATED NEAR ${latitude.toFixed(1)}N ${longitude.toFixed(1)}W AT ${today}/${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}Z
POSITION ACCURATE WITHIN 10 NM

PRESENT MOVEMENT TOWARD ${movement} DEGREES AT ${speed} KT
ESTIMATED MINIMUM CENTRAL PRESSURE 965 MB
EYE DIAMETER 25 NM
MAX SUSTAINED WINDS ${strength.windKt} KT WITH GUSTS TO ${strength.windKt + 25} KT.

64 KT....... 100NE 60SE 40SW 80NW.
50 KT.......140NE 110SE 80SW 120NW.
34 KT.......250NE 220SE 120SW 220NW.

FORECAST VALID ${tomorrow}/${String((now.getHours() + 12) % 24).padStart(2, '0')}00Z ${lat1}N ${lon1}W
MAX WIND ${strength.windKt + 5} KT...GUSTS ${strength.windKt + 30} KT.

FORECAST VALID ${nextDay}/${String((now.getHours() + 24) % 24).padStart(2, '0')}00Z ${lat2}N ${lon2}W
MAX WIND ${Math.max(34, strength.windKt - 10)} KT...GUSTS ${Math.max(34, strength.windKt + 15)} KT.

REQUEST FOR 3 HOURLY SHIP REPORTS WITHIN 300 MILES OF ${latitude.toFixed(1)}N ${longitude.toFixed(1)}W

NEXT ADVISORY AT ${String((now.getHours() + 6) % 24).padStart(2, '0')}00Z
$$
FORECASTER AUTOMATIC SYSTEM
NNNN`;

    return {
        area: area,
        station: station.name,
        region: station.region,
        type: "STURM/HURRICANE",
        content: forecastContent,
        time: new Date().toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit"
        }),
        hurricaneName: hurricaneName,
        strength: strength.name,
        latitude: latitude.toFixed(1),
        longitude: longitude.toFixed(1),
        movement: movement,
        speed: speed,
        windKt: strength.windKt,
        isHurricane: true
    };
}

/* Generate Message */
function generateMessage(area) {
    // Wenn Hurrikane aktiviert sind, 30% Chance für Sturmmeldung
    if (hurricanesEnabled && Math.random() < 0.3) {
        return generateHurricaneMessage(area);
    }

    const station = CONFIG.stations[area];
    const messageType = CONFIG.messageTypes[Math.floor(Math.random() * (CONFIG.messageTypes.length - 1))];
    
    let content = "";
    switch(messageType) {
        case "WETTER":
            content = CONFIG.weatherData[Math.floor(Math.random() * CONFIG.weatherData.length)];
            break;
        case "WETTERVORHERSAGE":
            content = CONFIG.forecastData[Math.floor(Math.random() * CONFIG.forecastData.length)];
            break;
        case "NAV. EREIGNISSE":
            content = CONFIG.navigationData[Math.floor(Math.random() * CONFIG.navigationData.length)];
            break;
    }

    return {
        area: area,
        station: station.name,
        region: station.region,
        type: messageType,
        content: content,
        time: new Date().toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit"
        }),
        isHurricane: false
    };
}

/* Display Message */
async function displayMessage(message) {
    isDisplaying = true;
    currentMessage = message;
    
    displayArea.textContent = message.area;
    displayStation.textContent = message.station;
    activeArea.textContent = message.area;
    
    statusIndicator.style.background = message.isHurricane ? "#ff6b35" : "var(--mint)";
    statusText.textContent = message.isHurricane ? 
        `⚠ STURM: ${message.hurricaneName}` : 
        "MELDUNG EMPFANGEN";

    const screenContent = document.createElement("div");
    screenContent.className = "screen-content";
    
    const header = message.isHurricane ? 
        `NAVTEX SENDER ${message.station}
BEREICH: ${message.area}
REGION: ${message.region}
MELDUNGSTYP: ${message.type}
STURM: ${message.hurricaneName}
────────────────────────────

` :
        `NAVTEX SENDER ${message.station}
BEREICH: ${message.area}
REGION: ${message.region}
MELDUNGSTYP: ${message.type}
────────────────────────────

`;

    screenContent.textContent = header + message.content;
    displayScreen.innerHTML = "";
    displayScreen.appendChild(screenContent);

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    isDisplaying = false;
}

/* Handle Enter */
async function handleEnter() {
    const area = areaInput.value.toUpperCase();
    
    if (!area || !CONFIG.stations[area]) {
        statusText.textContent = "UNGÜLTIGER BEREICH";
        statusIndicator.style.background = "var(--danger)";
        areaInput.value = "";
        return;
    }

    if (isDisplaying) return;

    currentArea = area;
    updateAreaButtons();
    
    statusIndicator.style.background = "#ffa500";
    statusText.textContent = "MELDUNG WIRD EMPFANGEN...";

    const message = generateMessage(area);
    await displayMessage(message);
    
    messageHistory.push(message);
    updateMessageHistory();
    
    areaInput.value = "";
    statusIndicator.style.background = message.isHurricane ? "#ff6b35" : "var(--mint)";
    statusText.textContent = message.isHurricane ? 
        `⚠ STURM: ${message.hurricaneName}` : 
        "BEREIT";
}

/* Handle Clear */
function handleClear() {
    areaInput.value = "";
    displayArea.textContent = "—";
    displayStation.textContent = "—";
    activeArea.textContent = "—";
    displayScreen.innerHTML = `
        <div class="screen-placeholder">
            <i class="fa-solid fa-display"></i>
            <p>Bereich eingeben und ENT drücken</p>
        </div>
    `;
    statusText.textContent = "GELÖSCHT";
    statusIndicator.style.background = "var(--danger)";
    currentArea = null;
    currentMessage = null;
    updateAreaButtons();
    
    setTimeout(() => {
        statusIndicator.style.background = "var(--mint)";
        statusText.textContent = "BEREIT";
    }, 1500);
}

/* Update Message History */
function updateMessageHistory() {
    if (messageHistory.length === 0) {
        messagesGrid.innerHTML = `
            <div class="no-messages">
                <i class="fa-solid fa-inbox"></i>
                <p>Keine Meldungen gesendet. Wähle einen Bereich und drücke ENTER!</p>
            </div>
        `;
        return;
    }

    messagesGrid.innerHTML = messageHistory.map((msg, index) => `
        <div class="message-card ${msg.isHurricane ? 'hurricane' : ''}">
            <div class="message-header">
                <div>
                    <div class="message-area">${msg.isHurricane ? '⚠ BEREICH ' + msg.area : 'BEREICH ' + msg.area}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
                <span class="message-type">${msg.type}</span>
            </div>
            <div class="message-content">${msg.station} (${msg.region})

────────────────────────────

${msg.content}</div>
        </div>
    `).join("");
}

/* Handle Print */
function handlePrint() {
    if (!currentMessage) {
        alert("Keine Meldung zum Drucken. Wähle zuerst einen Bereich.");
        return;
    }

    const printWindow = window.open("", "", "width=800,height=600");
    const msg = currentMessage;

    let printContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>NAVTEX Druck</title>
    <style>
        body {
            font-family: "Courier Prime", monospace;
            background: white;
            color: black;
            padding: 40px;
            line-height: 1.6;
        }
        .print-container {
            max-width: 600px;
            margin: 0 auto;
        }
        .print-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid black;
            padding-bottom: 20px;
        }
        .print-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .print-header p {
            margin: 5px 0 0 0;
            font-size: 12px;
        }
        .message-content {
            white-space: pre-wrap;
            font-size: 11px;
            margin: 20px 0;
        }
        .print-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 10px;
            border-top: 1px solid black;
            padding-top: 20px;
        }
        .warning {
            margin-top: 20px;
            border: 2px solid red;
            padding: 15px;
            text-align: center;
            font-weight: bold;
            color: red;
        }
        .hurricane-warning {
            margin-top: 20px;
            border: 2px solid darkred;
            padding: 15px;
            text-align: center;
            font-weight: bold;
            color: darkred;
            background-color: #ffe6e6;
        }
    </style>
</head>
<body>
    <div class="print-container">
        <div class="print-header">
            <h1>${msg.isHurricane ? '⚠ HURRICANE ADVISORY' : 'NAVTEX MELDUNG'}</h1>
            <p>NAVTEX SENDER ${msg.station}</p>
            <p>BEREICH: ${msg.area} | REGION: ${msg.region}</p>
            <p>MELDUNGSTYP: ${msg.type}</p>
            ${msg.isHurricane ? `<p>HURRICANE NAME: ${msg.hurricaneName}</p>
            <p>POSITION: ${msg.latitude}N ${msg.longitude}W</p>
            <p>MAX WINDS: ${msg.windKt} KT</p>` : ''}
            <p>EMPFANGSZEIT: ${msg.time}</p>
        </div>

        <div class="message-content">
────────────────────────────────────────────────────

NAVTEX SENDER ${msg.station}
BEREICH: ${msg.area}
REGION: ${msg.region}
MELDUNGSTYP: ${msg.type}
${msg.isHurricane ? `HURRICANE: ${msg.hurricaneName}
STRENGTH: ${msg.strength}` : ''}

────────────────────────────────────────────────────

${msg.content}

────────────────────────────────────────────────────
        </div>

        <div class="${msg.isHurricane ? 'hurricane-warning' : 'warning'}">
            ${msg.isHurricane ? `⚠ HURRICANE ${msg.hurricaneName} ADVISORY ⚠<br>
            ALLE SCHIFFE IN DER REGION SOLLTEN VORSICHTSMASSNAHMEN TREFFEN!` : `⚠ ES IST NUR EINE DEMO! ⚠<br>
            ALLE DATEN SIND FREI ERFUNDEN!`}
        </div>

        <div class="print-footer">
            © NavTool.de ${new Date().getFullYear()}
        </div>
    </div>
</body>
</html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

/* Scroll Reveal Animation */
function setupScrollReveal() {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.08 }
    );

    document.querySelectorAll(".reveal").forEach(element => {
        revealObserver.observe(element);
    });
}

/* Scroll Progress */
function setupScrollProgress() {
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        pageProgress.style.width = progress + "%";
    });
}

/* Active Navigation */
function setupActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${entry.target.id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

setupActiveNavigation();

/* Initial Setup */
setTimeout(() => {
    document.querySelectorAll(".reveal").forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add("visible");
        }
    });
}, 100);
