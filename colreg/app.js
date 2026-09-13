/* =========================================================
   COLREG NAVIGATOR
   Interactive / DE + EN
========================================================= */


const state = {

  lang:
    localStorage.getItem("colreg-lang")
    || "de",

  group:"all",

  query:""

};



/* =========================================================
   SOURCES
========================================================= */


const IMO =
  "https://www.imo.org/en/about/conventions/pages/colreg.aspx";


const SRC = {

  imo:
    IMO,

  prevent:
    "https://www.imo.org/en/ourwork/safety/pages/preventing-collisions.aspx",

  lights:
    "https://commons.wikimedia.org/wiki/File:Propmec50.PNG",

  cardinal:
    "https://commons.wikimedia.org/wiki/File:Diagram_of_Cardinal_marks_used_in_coastal_navigation.png",

  bowline:
    "https://commons.wikimedia.org/wiki/File:Bowline_knot_family.png",

  eight:
    "https://commons.wikimedia.org/wiki/File:Figure_Eight_Knot.png",

  clove:
    "https://commons.wikimedia.org/wiki/File:Knot_clove.jpg"

};



/* =========================================================
   TRANSLATIONS
========================================================= */


const T = {

  de: {

    "nav.rules":
      "KVR / COLREG",

    "nav.lights":
      "LICHTER",

    "nav.buoys":
      "TONNEN",

    "nav.practice":
      "PRAXIS",

    "nav.knots":
      "KNOTEN",


    "hero.eyebrow":
      "MARITIME KNOWLEDGE SYSTEM",

    "hero.title":
      "EINFACH VERSTANDEN.",

    "hero.lead":
      "Regeln, Lichter, Tonnen, Ausweichsituationen und Knoten – klar erklärt und interaktiv gelernt.",

    "hero.cta1":
      "REGELN STARTEN",

    "hero.cta2":
      "PRAXIS TRAINIEREN",

    "hero.rules":
      "COLREG-Regeln",

    "hero.lang":
      "zweisprachig",

    "hero.iala":
      "Seezeichen",


    "quick.rules":
      "REGELN",

    "quick.rulesSub":
      "Deutsch + English",

    "quick.lights":
      "LICHTER",

    "quick.lightsSub":
      "Schiffskennungen",

    "quick.buoys":
      "TONNEN",

    "quick.buoysSub":
      "IALA & Kardinalsystem",

    "quick.knots":
      "KNOTEN",

    "quick.knotsSub":
      "Schritt für Schritt",


    "rules.heading":
      "KVR / COLREG",

    "rules.intro":
      "Suche nach Regelnummer, Begriff oder Situation – z. B. „Überholen“, „Nebel“, „Steuerbord“ oder „Kollisionsgefahr“.",

    "rules.search":
      "Regel, Stichwort oder Situation suchen …",

    "source.imo":
      "OFFIZIELLE IMO-SEITE ↗",


    "lights.heading":
      "LICHTER & KENNUNGEN",

    "lights.intro":
      "Karte anklicken für Bedeutung, Sichtbarkeit und Quelle.",


    "buoys.heading":
      "TONNEN & SEEZEICHEN",

    "buoys.intro":
      "Kardinal- und laterale Zeichen mit klarer Merkhilfe.",


    "scenarios.heading":
      "WAS MUSS ICH JETZT TUN?",

    "scenarios.intro":
      "Typische Begegnungen als interaktive Entscheidungshilfe.",


    "knots.heading":
      "KNOTEN LERNEN",

    "knots.intro":
      "Deutsch + Englisch, Einsatzgebiet und grafische Anleitung.",


    "sources.heading":
      "QUELLEN",

    "sources.imo":
      "Offizielle Übersicht und Publikationsinformationen.",

    "sources.prevent":
      "Hintergrundinformationen zur Kollisionsverhütung.",

    "sources.lights":
      "Grafikquelle für Schiffslichter.",

    "sources.knots":
      "Grafikquelle für den Achtknoten.",


    "notice.label":
      "Hinweis:",

    "notice.text":
      "Diese Website ist eine Lern- und Orientierungshilfe. Für Prüfung, Fahrt und rechtliche Fragen sind der amtliche COLREG/KVR-Text sowie die jeweils geltenden nationalen Vorschriften maßgeblich."

  },


  en: {

    "nav.rules":
      "COLREG",

    "nav.lights":
      "LIGHTS",

    "nav.buoys":
      "BUOYS",

    "nav.practice":
      "PRACTICE",

    "nav.knots":
      "KNOTS",


    "hero.eyebrow":
      "MARITIME KNOWLEDGE SYSTEM",

    "hero.title":
      "MADE SIMPLE.",

    "hero.lead":
      "Rules, lights, buoys, collision-avoidance situations and knots – clearly explained and learned interactively.",

    "hero.cta1":
      "START RULES",

    "hero.cta2":
      "TRAIN PRACTICE",

    "hero.rules":
      "COLREG rules",

    "hero.lang":
      "bilingual",

    "hero.iala":
      "marks",


    "quick.rules":
      "RULES",

    "quick.rulesSub":
      "Deutsch + English",

    "quick.lights":
      "LIGHTS",

    "quick.lightsSub":
      "Vessel identification",

    "quick.buoys":
      "BUOYS",

    "quick.buoysSub":
      "IALA & cardinal system",

    "quick.knots":
      "KNOTS",

    "quick.knotsSub":
      "Step by step",


    "rules.heading":
      "COLREG",

    "rules.intro":
      "Search by rule number, term or situation – for example “overtaking”, “restricted visibility”, “starboard” or “risk of collision”.",

    "rules.search":
      "Search rule, keyword or situation …",

    "source.imo":
      "OFFICIAL IMO PAGE ↗",


    "lights.heading":
      "LIGHTS & SHAPES",

    "lights.intro":
      "Open a card for meaning, visibility and source.",


    "buoys.heading":
      "BUOYS & MARKS",

    "buoys.intro":
      "Cardinal and lateral marks with simple memory aids.",


    "scenarios.heading":
      "WHAT DO I DO NOW?",

    "scenarios.intro":
      "Typical encounters as an interactive decision aid.",


    "knots.heading":
      "LEARN KNOTS",

    "knots.intro":
      "German + English, use case and illustrated instructions.",


    "sources.heading":
      "SOURCES",

    "sources.imo":
      "Official overview and publication information.",

    "sources.prevent":
      "Background information on preventing collisions.",

    "sources.lights":
      "Graphic source for navigation lights.",

    "sources.knots":
      "Graphic source for the figure-eight knot.",


    "notice.label":
      "Note:",

    "notice.text":
      "This website is a learning and orientation aid. For examinations, navigation and legal questions, the official COLREG text and applicable national regulations are authoritative."

  }

};



/* =========================================================
   HELPER
========================================================= */


function t(key){

  return (
    T[state.lang][key]
    || key
  );

}


function name(item){

  return state.lang === "de"
    ? item.de
    : item.en;

}


function desc(item){

  return state.lang === "de"
    ? item.descDe
    : item.descEn;

}



/* =========================================================
   COLREG RULES
========================================================= */


const R = [

[
1,
"Application",
"Anwendung",
"These Rules apply to all vessels upon the high seas and waters connected with the high seas and navigable by seagoing vessels.",
"Diese Regeln gelten für alle Fahrzeuge auf hoher See und auf damit verbundenen schiffbaren Gewässern.",
"all",
"scope"
],

[
2,
"Responsibility",
"Verantwortung",
"Nothing in these Rules exonerates any vessel or master from the consequences of neglecting the Rules or ordinary practice of seamen.",
"Nichts in diesen Regeln entbindet ein Fahrzeug oder seinen Führer von den Folgen der Nichtbeachtung der Regeln oder der guten Seemannschaft.",
"all",
"verantwortung"
],

[
3,
"General Definitions",
"Allgemeine Begriffsbestimmungen",
"Defines vessel, power-driven vessel, sailing vessel, vessel engaged in fishing, seaplane, vessel not under command, vessel restricted in ability to manoeuvre and more.",
"Definiert unter anderem Fahrzeug, Maschinenfahrzeug, Segelfahrzeug, fischendes Fahrzeug, manövrierunfähiges Fahrzeug und manövrierbehindertes Fahrzeug.",
"all",
"begriffe"
],

[
4,
"Application",
"Anwendung",
"Rules in this section apply in any condition of visibility.",
"Die Regeln dieses Abschnitts gelten bei jeder Sichtweite.",
"steering",
"sichtweite"
],

[
5,
"Look-out",
"Ausguck",
"Every vessel shall at all times maintain a proper look-out by sight and hearing and all available means.",
"Jedes Fahrzeug muss jederzeit einen geeigneten Ausguck durch Sehen, Hören und alle verfügbaren Mittel halten.",
"steering",
"ausguck sehen hören"
],

[
6,
"Safe Speed",
"Sichere Geschwindigkeit",
"Every vessel shall proceed at a safe speed so that proper and effective action can be taken to avoid collision.",
"Jedes Fahrzeug muss mit sicherer Geschwindigkeit fahren, damit wirksame Maßnahmen zur Kollisionsverhütung möglich sind.",
"steering",
"geschwindigkeit safe speed"
],

[
7,
"Risk of Collision",
"Kollisionsgefahr",
"Every vessel shall use all available means to determine if risk of collision exists; if in doubt, such risk shall be deemed to exist.",
"Mit allen verfügbaren Mitteln ist festzustellen, ob Kollisionsgefahr besteht; im Zweifel ist sie anzunehmen.",
"steering",
"kollision peilung bearing"
],

[
8,
"Action to Avoid Collision",
"Maßnahmen zur Kollisionsverhütung",
"Action shall be positive, made in ample time and with due regard to good seamanship; avoid a succession of small alterations.",
"Maßnahmen müssen deutlich, rechtzeitig und nach guter Seemannschaft erfolgen; viele kleine Kursänderungen sind zu vermeiden.",
"steering",
"ausweichen kursänderung manöver"
],

[
9,
"Narrow Channels",
"Enge Fahrwasser",
"Vessels proceeding along a narrow channel shall keep as near to the outer limit on their starboard side as is safe and practicable.",
"In engem Fahrwasser ist möglichst nahe an der Steuerbordgrenze zu bleiben, soweit sicher und praktikabel.",
"steering",
"fahrwasser eng steuerbord"
],

[
10,
"Traffic Separation Schemes",
"Verkehrstrennungsgebiete",
"Vessels using a traffic separation scheme shall proceed in the appropriate traffic lane and cross, when necessary, as nearly as practicable at right angles.",
"Verkehrstrennungsgebiete sind entsprechend der Fahrtrichtung zu benutzen; notwendiges Queren möglichst rechtwinklig.",
"steering",
"verkehrstrennung TSS"
],

[
11,
"Application",
"Anwendung",
"This section applies to vessels in sight of one another.",
"Dieser Abschnitt gilt für Fahrzeuge, die einander in Sicht haben.",
"conduct",
"sicht"
],

[
12,
"Sailing Vessels",
"Segelfahrzeuge",
"When sailing vessels approach one another, one gives way according to the specified sail and wind situations.",
"Bei Annäherung von Segelfahrzeugen gelten die besonderen Ausweichregeln für Wind- und Segelstellung.",
"conduct",
"segel wind luv lee"
],

[
13,
"Overtaking",
"Überholen",
"Any vessel overtaking any other shall keep out of the way of the vessel being overtaken.",
"Ein überholendes Fahrzeug muss dem überholten Fahrzeug aus dem Weg bleiben.",
"conduct",
"überholen overtaking"
],

[
14,
"Head-on Situation",
"Gegenkurs",
"When two power-driven vessels meet on reciprocal or nearly reciprocal courses, both shall alter course to starboard.",
"Bei Gegenkurs von zwei Maschinenfahrzeugen müssen beide nach Steuerbord ausweichen.",
"conduct",
"gegenkurs head on steuerbord"
],

[
15,
"Crossing Situation",
"Kreuzende Kurse",
"When two power-driven vessels cross so as to involve risk of collision, the vessel which has the other on her starboard side shall keep out of the way.",
"Bei kreuzenden Kursen weicht das Fahrzeug aus, das das andere an seiner Steuerbordseite hat.",
"conduct",
"kreuzen kreuzende kurse steuerbord"
],

[
16,
"Action by Give-way Vessel",
"Maßnahmen des Ausweichpflichtigen",
"Every vessel which is directed to keep out of the way shall, so far as possible, take early and substantial action.",
"Das ausweichpflichtige Fahrzeug muss möglichst frühzeitig und deutlich handeln.",
"conduct",
"ausweichpflicht give way"
],

[
17,
"Action by Stand-on Vessel",
"Maßnahmen des Kurshalters",
"The stand-on vessel shall keep her course and speed, but may act when it becomes apparent the give-way vessel is not taking appropriate action.",
"Der Kurshalter hält Kurs und Geschwindigkeit, darf aber eingreifen, wenn das Ausweichmanöver ausbleibt.",
"conduct",
"kurshalter stand on"
],

[
18,
"Responsibilities Between Vessels",
"Verantwortlichkeiten zwischen Fahrzeugen",
"Specifies the responsibilities between power-driven, sailing, fishing, not-under-command and restricted-manoeuvrability vessels.",
"Regelt die Ausweichverantwortung zwischen Maschinenfahrzeugen, Seglern, Fischern, manövrierunfähigen und manövrierbehinderten Fahrzeugen.",
"conduct",
"verantwortung fahrzeuge"
],

[
19,
"Conduct in Restricted Visibility",
"Verhalten bei verminderter Sicht",
"Applies to vessels not in sight of one another when navigating in or near an area of restricted visibility.",
"Gilt bei verminderter Sicht für Fahrzeuge, die einander nicht in Sicht haben.",
"conduct",
"nebel eingeschränkte sicht radar"
],

[
20,
"Application",
"Anwendung der Lichter",
"Rules concerning lights and shapes apply from sunset to sunrise and in other circumstances where visibility requires them.",
"Regeln über Lichter und Signalkörper gelten von Sonnenuntergang bis Sonnenaufgang und bei erforderlicher Sichtbarkeit auch darüber hinaus.",
"lights",
"lichter nacht"
],

[
21,
"Definitions",
"Begriffsbestimmungen der Lichter",
"Defines masthead light, sidelights, sternlight, towing light, all-round light and flashing light.",
"Definiert unter anderem Topplicht, Seitenlichter, Hecklicht, Schlepplicht, Rundumlicht und Funkellicht.",
"lights",
"topplicht seitenlicht hecklicht"
],

[
22,
"Visibility of Lights",
"Tragweite der Lichter",
"Prescribes minimum ranges for the different navigation lights according to vessel size and light type.",
"Legt Mindesttragweiten der verschiedenen Navigationslichter abhängig von Fahrzeuggröße und Lichtart fest.",
"lights",
"tragweite"
],

[
23,
"Power-driven Vessels Underway",
"Maschinenfahrzeuge in Fahrt",
"Prescribes the navigation lights for power-driven vessels underway, including masthead, sidelights and sternlight.",
"Legt die Lichter von Maschinenfahrzeugen in Fahrt fest, insbesondere Topp-, Seiten- und Hecklicht.",
"lights",
"maschinenfahrzeug fahrt"
],

[
24,
"Towing and Pushing",
"Schleppen und Schieben",
"Prescribes lights and shapes for towing and pushing operations and for vessels being towed or pushed.",
"Regelt Lichter und Signalkörper beim Schleppen und Schieben sowie für geschleppte Fahrzeuge.",
"lights",
"schleppen schieben"
],

[
25,
"Sailing Vessels Underway and Vessels Under Oar",
"Segelfahrzeuge und Ruderfahrzeuge",
"Prescribes lights for sailing vessels underway and vessels under oars.",
"Regelt die Lichter von Segelfahrzeugen in Fahrt und Ruderfahrzeugen.",
"lights",
"segelboot ruderfahrzeug"
],

[
26,
"Fishing Vessels",
"Fischereifahrzeuge",
"Prescribes lights and shapes for vessels engaged in fishing, including distinctions for trawling.",
"Regelt Lichter und Signalkörper für fischende Fahrzeuge einschließlich Schleppnetzfischerei.",
"lights",
"fischen trawler fischereifahrzeug"
],

[
27,
"Vessels Not Under Command or Restricted in Ability to Manoeuvre",
"Manövrierunfähige / manövrierbehinderte Fahrzeuge",
"Prescribes distinctive lights and shapes for vessels not under command and vessels restricted in their ability to manoeuvre.",
"Regelt die besonderen Lichter und Signalkörper für manövrierunfähige und manövrierbehinderte Fahrzeuge.",
"lights",
"NUC RAM"
],

[
28,
"Vessels Constrained by Their Draught",
"Tiefgangbeschränkte Fahrzeuge",
"A vessel constrained by her draught may exhibit three all-round red lights in a vertical line.",
"Ein tiefgangbeschränktes Fahrzeug darf drei rote Rundumlichter senkrecht übereinander führen.",
"lights",
"tiefgangbeschränkt"
],

[
29,
"Pilot Vessels",
"Lotsenfahrzeuge",
"A pilot vessel engaged on pilotage duty shall exhibit the prescribed white over red lights and other required lights.",
"Ein Lotsenfahrzeug im Lotsendienst führt die vorgeschriebenen weißen über roten Rundumlichter und weitere Lichter.",
"lights",
"lotse pilot"
],

[
30,
"Vessels at Anchor and Aground",
"Vor Anker / auf Grund",
"Prescribes anchor lights and shapes; an aground vessel adds the prescribed red lights and balls.",
"Vor Anker sind die vorgeschriebenen Ankerlichter zu führen; auf Grund kommen zusätzliche rote Lichter und schwarze Bälle hinzu.",
"lights",
"anker auf grund"
],

[
31,
"Seaplanes",
"Wasserflugzeuge",
"Seaplanes on the water shall, insofar as practicable, exhibit lights and shapes as closely similar to vessels as circumstances permit.",
"Wasserflugzeuge auf dem Wasser führen soweit praktikabel möglichst ähnliche Lichter und Signalkörper wie Fahrzeuge.",
"lights",
"wasserflugzeug"
],

[
32,
"Definitions",
"Schallsignale – Begriffe",
"Defines whistle, short blast and prolonged blast for the sound-signal rules.",
"Definiert Pfeifsignal, kurzen Ton und langen Ton für die Schallsignalregeln.",
"signals",
"schallsignal pfeife"
],

[
33,
"Equipment for Sound Signals",
"Ausrüstung für Schallsignale",
"Vessels of specified lengths shall be equipped with a whistle and, where required, a bell and gong.",
"Fahrzeuge bestimmter Länge müssen mit Pfeife und gegebenenfalls Glocke und Gong ausgerüstet sein.",
"signals",
"pfeife glocke gong"
],

[
34,
"Manoeuvring and Warning Signals",
"Manöver- und Warnsignale",
"Prescribes sound signals for manoeuvring, warning and overtaking situations when vessels are in sight.",
"Regelt Schallsignale für Manöver, Warnung und Überholen bei Sichtverbindung.",
"signals",
"ein kurzer zwei kurze drei kurze"
],

[
35,
"Sound Signals in Restricted Visibility",
"Schallsignale bei verminderter Sicht",
"Prescribes sound signals at intervals in or near restricted visibility.",
"Regelt die Schallsignale in bestimmten Zeitabständen bei verminderter Sicht.",
"signals",
"nebel signal"
],

[
36,
"Signals to Attract Attention",
"Signale zur Aufmerksamkeit",
"Any vessel may use light or sound signals to attract attention, provided they cannot be mistaken for other authorized signals.",
"Zur Aufmerksamkeit dürfen Licht- oder Schallsignale gegeben werden, sofern sie nicht mit anderen vorgeschriebenen Signalen verwechselt werden können.",
"signals",
"aufmerksamkeit"
],

[
37,
"Distress Signals",
"Notzeichen",
"Annex IV contains examples of signals indicating distress and need of assistance.",
"Anhang IV enthält Beispiele für Notzeichen, die Notlage und Hilfsbedarf anzeigen.",
"signals",
"notzeichen mayday notsignal"
],

[
38,
"Exemptions",
"Ausnahmen",
"Ships complying with the 1960 Rules may be exempted from specified requirements under the conditions stated in the Rule.",
"Für bestimmte ältere Fahrzeuge können unter den genannten Bedingungen Ausnahmen vorgesehen sein.",
"exemptions",
"ausnahme"
]

];



/* =========================================================
   LIGHTS
========================================================= */


const LIGHTS = [

{
  id:"power",

  de:"Maschinenfahrzeug in Fahrt",

  en:"Power-driven vessel underway",

  rule:23,

  descDe:
    "Typische Kombination aus Topplicht, Seitenlichtern und Hecklicht.",

  descEn:
    "Typical combination of masthead, sidelights and sternlight.",

  img:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Propmec50.PNG",

  src:
    SRC.lights
},


{
  id:"anchor",

  de:"Fahrzeug vor Anker",

  en:"Vessel at anchor",

  rule:30,

  descDe:
    "Ein weißes Rundumlicht kennzeichnet das Fahrzeug vor Anker; weitere Anforderungen hängen von der Größe ab.",

  descEn:
    "A white all-round light identifies a vessel at anchor; additional requirements depend on size.",

  img:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Propmec50.PNG",

  src:
    SRC.lights
},


{
  id:"pilot",

  de:"Lotsenfahrzeug",

  en:"Pilot vessel",

  rule:29,

  descDe:
    "Im Lotsendienst: weiß über rot als charakteristische Kennung.",

  descEn:
    "When engaged on pilotage duty: white over red as the characteristic identification.",

  img:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Propmec50.PNG",

  src:
    SRC.lights
},


{
  id:"diving",

  de:"Tauchbetrieb",

  en:"Diving operations",

  rule:27,

  descDe:
    "Besondere Lichter zeigen ein Fahrzeug mit eingeschränkter Manövrierfähigkeit an; lokale Regeln beachten.",

  descEn:
    "Special lights identify a vessel restricted in her ability to manoeuvre; observe local rules.",

  img:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/ColRegs_Diving_operation_lights_signal.png",

  src:
    "https://commons.wikimedia.org/wiki/File:ColRegs_Diving_operation_lights_signal.png"
}

];



/* =========================================================
   BUOYS
========================================================= */


const BUOYS = [

{
  id:"north",

  de:"Nord-Kardinalzeichen",

  en:"North Cardinal Mark",

  tag:"N",

  descDe:
    "Nördlich passieren. Schwarze Spitzen zeigen nach oben.",

  descEn:
    "Pass to the north. The black cones point upward."
},


{
  id:"east",

  de:"Ost-Kardinalzeichen",

  en:"East Cardinal Mark",

  tag:"E",

  descDe:
    "Östlich passieren. Schwarze Kegel zeigen Spitze an Spitze.",

  descEn:
    "Pass to the east. The black cones point tip-to-tip."
},


{
  id:"south",

  de:"Süd-Kardinalzeichen",

  en:"South Cardinal Mark",

  tag:"S",

  descDe:
    "Südlich passieren. Schwarze Spitzen zeigen nach unten.",

  descEn:
    "Pass to the south. The black cones point downward."
},


{
  id:"west",

  de:"West-Kardinalzeichen",

  en:"West Cardinal Mark",

  tag:"W",

  descDe:
    "Westlich passieren. Schwarze Kegel zeigen Basis an Basis.",

  descEn:
    "Pass to the west. The black cones point base-to-base."
},


{
  id:"starboard",

  de:"Steuerbord-Lateralzeichen",

  en:"Starboard-hand Lateral Mark",

  tag:"SB",

  descDe:
    "Im IALA-A-Gebiet beim Einlaufen grundsätzlich an Steuerbord.",

  descEn:
    "In IALA Region A, normally keep it to starboard when entering from sea."
},


{
  id:"port",

  de:"Backbord-Lateralzeichen",

  en:"Port-hand Lateral Mark",

  tag:"BB",

  descDe:
    "Im IALA-A-Gebiet beim Einlaufen grundsätzlich an Backbord.",

  descEn:
    "In IALA Region A, normally keep it to port when entering from sea."
}

];



/* =========================================================
   PRACTICE
========================================================= */


const SCENARIOS = [

{
  id:15,

  de:"Kreuzende Kurse",

  en:"Crossing situation",

  rule:15,

  descDe:
    "Du siehst das andere Maschinenfahrzeug an deiner Steuerbordseite.",

  descEn:
    "You see the other power-driven vessel on your starboard side.",

  actionDe:
    "Du bist ausweichpflichtig → frühzeitig und deutlich handeln.",

  actionEn:
    "You are the give-way vessel → act early and substantially.",

  stepsDe:[
    "Kollisionsgefahr prüfen",
    "Andere Seite an Steuerbord? → ausweichpflichtig",
    "Deutliche Kurs-/Geschwindigkeitsänderung",
    "CPA/TCPA und Lage weiter überwachen"
  ],

  stepsEn:[
    "Assess risk of collision",
    "Other vessel on your starboard side? → give way",
    "Make an early, substantial manoeuvre",
    "Continue monitoring CPA/TCPA and the situation"
  ]
},


{
  id:13,

  de:"Überholen",

  en:"Overtaking",

  rule:13,

  descDe:
    "Du kommst von hinten in einem Überholsektor.",

  descEn:
    "You are approaching from a position more than 22.5° abaft the beam.",

  actionDe:
    "Der Überholer bleibt aus dem Weg, bis er klar vorbei ist.",

  actionEn:
    "The overtaking vessel keeps clear until finally past and clear.",

  stepsDe:[
    "Erkennen, ob du überholst",
    "Nicht darauf verlassen, dass das andere Fahrzeug ausweicht",
    "Sicheren Passierabstand herstellen",
    "Erst nach eindeutigem Klarsein als frei betrachten"
  ],

  stepsEn:[
    "Determine whether you are overtaking",
    "Do not rely on the other vessel to manoeuvre",
    "Establish a safe passing distance",
    "Remain clear until finally past and clear"
  ]
},


{
  id:14,

  de:"Gegenkurs",

  en:"Head-on situation",

  rule:14,

  descDe:
    "Zwei Maschinenfahrzeuge nähern sich auf nahezu entgegengesetzten Kursen.",

  descEn:
    "Two power-driven vessels approach on reciprocal or nearly reciprocal courses.",

  actionDe:
    "Beide nach Steuerbord → Backbord-an-Backbord-Passage.",

  actionEn:
    "Both alter to starboard → pass port-to-port.",

  stepsDe:[
    "Gegenkurs bestätigen",
    "Beide Kursänderung nach Steuerbord",
    "Deutliche Änderung statt kleiner Korrekturen",
    "Sichere Passage bestätigen"
  ],

  stepsEn:[
    "Confirm head-on situation",
    "Both alter course to starboard",
    "Make a substantial rather than minor alteration",
    "Confirm safe passing"
  ]
},


{
  id:19,

  de:"Verminderte Sicht / Nebel",

  en:"Restricted visibility / fog",

  rule:19,

  descDe:
    "Keine Sichtverbindung: sichere Geschwindigkeit, Radar und zusätzliche Vorsicht.",

  descEn:
    "No visual contact: safe speed, radar use and extra caution are essential.",

  actionDe:
    "Sichere Geschwindigkeit und besondere Vorsicht – nicht einfach eine normale Begegnungsregel anwenden.",

  actionEn:
    "Use safe speed and special caution – do not simply apply a normal visual-encounter rule.",

  stepsDe:[
    "Sichere Geschwindigkeit herstellen",
    "Radar/alle verfügbaren Mittel nutzen",
    "Kollisionsgefahr früh erkennen",
    "Manöver mit ausreichendem Abstand und Vorsicht durchführen"
  ],

  stepsEn:[
    "Adopt a safe speed",
    "Use radar and all available means",
    "Detect collision risk early",
    "Manoeuvre with adequate margin and caution"
  ]
}

];



/* =========================================================
   KNOTS
========================================================= */


const KNOTS = [

{
  id:"bowline",

  de:"Palstek",

  en:"Bowline",

  useDe:
    "Feste Schlaufe, z. B. zum Anschlagen.",

  useEn:
    "Fixed loop, e.g. for securing a line.",

  img:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bowline_knot_family.png",

  src:
    SRC.bowline,

  stepsDe:[
    "Bucht bilden.",
    "Arbeitsende durch die Bucht führen.",
    "Um das stehende Ende herumführen.",
    "Arbeitsende zurück durch die Bucht und festziehen."
  ],

  stepsEn:[
    "Make a loop.",
    "Pass the working end through the loop.",
    "Take it around the standing part.",
    "Bring it back through the loop and tighten."
  ]
},


{
  id:"eight",

  de:"Achtknoten",

  en:"Figure-eight knot",

  useDe:
    "Stopperknoten am Leinenende.",

  useEn:
    "Stopper knot at the end of a line.",

  img:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Figure_Eight_Knot.png",

  src:
    SRC.eight,

  stepsDe:[
    "Arbeitsende kreuzen.",
    "Eine Schlaufe bilden.",
    "Arbeitsende um die stehende Part führen.",
    "Durch die erste Schlaufe zurückführen und festziehen."
  ],

  stepsEn:[
    "Cross the working end.",
    "Form a loop.",
    "Take the working end around the standing part.",
    "Feed it back through the first loop and tighten."
  ]
},


{
  id:"clove",

  de:"Webeleinenstek",

  en:"Clove hitch",

  useDe:
    "Schnelles Befestigen an einem Pfahl oder einer Stange.",

  useEn:
    "Quick attachment to a post, rail or spar.",

  img:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Knot_clove.jpg",

  src:
    SRC.clove,

  stepsDe:[
    "Erste Windung legen.",
    "Zweite Windung über die erste legen.",
    "Arbeitsende unter der zweiten Windung durchführen.",
    "Beide Parten gleichmäßig anziehen."
  ],

  stepsEn:[
    "Make the first turn.",
    "Make a second turn over the first.",
    "Pass the working end under the second turn.",
    "Dress and tighten evenly."
  ]
},


{
  id:"sheet",

  de:"Schotstek",

  en:"Sheet bend",

  useDe:
    "Verbindet zwei Leinen, auch bei unterschiedlicher Stärke.",

  useEn:
    "Joins two lines, including lines of different size.",

  img:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sheet_bend.png",

  src:
    "https://commons.wikimedia.org/wiki/File:Sheet_bend.png",

  stepsDe:[
    "Dicke Leine zur Bucht legen.",
    "Dünne Leine von unten durch die Bucht.",
    "Um beide Parten herum.",
    "Unter der eigenen Part hindurch und festziehen."
  ],

  stepsEn:[
    "Make a bight in the thicker line.",
    "Pass the thinner line up through the bight.",
    "Take it around both parts.",
    "Tuck it under its own part and tighten."
  ]
}

];



/* =========================================================
   FILTER GROUPS
========================================================= */


const GROUPS = {

  de:[
    ["all","ALLE"],
    ["steering","REGELN 4–10"],
    ["conduct","AUSWEICHREGELN 11–19"],
    ["lights","LICHTER 20–31"],
    ["signals","SCHALL 32–37"],
    ["exemptions","AUSNAHMEN 38"]
  ],

  en:[
    ["all","ALL"],
    ["steering","RULES 4–10"],
    ["conduct","STEERING 11–19"],
    ["lights","LIGHTS 20–31"],
    ["signals","SOUND 32–37"],
    ["exemptions","EXEMPTIONS 38"]
  ]

};



/* =========================================================
   LANGUAGE
========================================================= */


function applyLanguage(){

  document.documentElement.lang =
    state.lang;


  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      element.textContent =
        t(element.dataset.i18n);

    });


  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {

      element.placeholder =
        t(element.dataset.i18nPlaceholder);

    });


  document
    .getElementById("langToggle")
    .classList
    .toggle(
      "en",
      state.lang === "en"
    );


  renderFilters();

  renderRules();

  renderLights();

  renderBuoys();

  renderScenarios();

  renderKnots();

}



/* =========================================================
   RULE FILTERS
========================================================= */


function renderFilters(){

  const box =
    document.getElementById(
      "ruleFilters"
    );


  box.innerHTML = "";


  GROUPS[state.lang]
    .forEach(([id,label]) => {

      const button =
        document.createElement("button");


      button.className =
        "chip"
        +
        (
          state.group === id
            ? " active"
            : ""
        );


      button.textContent =
        label;


      button.onclick = () => {

        state.group =
          id;

        renderFilters();

        renderRules();

      };


      box.appendChild(button);

    });

}



/* =========================================================
   RULES
========================================================= */


function renderRules(){

  const q =
    state.query
      .trim()
      .toLowerCase();


  const list =
    R.filter(rule => {

      const text = [

        rule[0],
        rule[1],
        rule[2],
        rule[3],
        rule[4],
        rule[6]

      ]
      .join(" ")
      .toLowerCase();


      return (

        (
          state.group === "all"
          ||
          rule[5] === state.group
        )

        &&

        (
          !q
          ||
          text.includes(q)
        )

      );

    });


  const box =
    document.getElementById(
      "ruleResults"
    );


  box.innerHTML = "";


  if(!list.length){

    box.innerHTML = `

      <div
        class="notice"
        style="grid-column:1/-1"
      >

        ${
          state.lang === "de"
            ? "Keine passenden Regeln gefunden."
            : "No matching rules found."
        }

      </div>

    `;

    return;

  }


  list.forEach(rule => {

    const card =
      document.createElement("article");


    card.className =
      "rule-card reveal visible";


    card.innerHTML = `

      <span class="card-code">
        RULE ${rule[0]}
      </span>

      <h3>
        ${
          state.lang === "de"
            ? rule[2]
            : rule[1]
        }
      </h3>

      <p>
        ${
          state.lang === "de"
            ? rule[4]
            : rule[3]
        }
      </p>

      <div class="card-bottom">

        <b>
          ${rule[5].toUpperCase()}
        </b>

        <span class="card-arrow">
          ↗
        </span>

      </div>

    `;


    card.onclick =
      () => openRule(rule[0]);


    box.appendChild(card);

  });

}



/* =========================================================
   RULE MODAL
========================================================= */


function openRule(num){

  const rule =
    R.find(
      item => item[0] === num
    );


  if(!rule) return;


  const title =
    state.lang === "de"
      ? rule[2]
      : rule[1];


  const text =
    state.lang === "de"
      ? rule[4]
      : rule[3];


  modal(`

    <div class="modal-head">

      <div>

        <div class="modal-code">
          COLREG RULE ${rule[0]}
        </div>

        <h2>
          ${title}
        </h2>

      </div>


      <button
        class="modal-close"
        onclick="closeModal()"
      >
        ×
      </button>

    </div>


    <div class="modal-body">

      <h3>
        ${
          state.lang === "de"
            ? "EINFACH ERKLÄRT"
            : "PLAIN EXPLANATION"
        }
      </h3>


      <p>
        ${text}
      </p>


      <h3>
        ${
          state.lang === "de"
            ? "OFFIZIELLER QUELLTEXT"
            : "OFFICIAL SOURCE"
        }
      </h3>


      <p>
        ${
          state.lang === "de"

          ?

          "Für den verbindlichen Wortlaut bitte den offiziellen IMO-/COLREG-Text verwenden."

          :

          "Use the official IMO/COLREG text for the legally authoritative wording."
        }
      </p>


      <a
        class="modal-source"
        href="${IMO}"
        target="_blank"
        rel="noopener"
      >

        ${
          state.lang === "de"
            ? "IMO QUELLE ÖFFNEN ↗"
            : "OPEN IMO SOURCE ↗"
        }

      </a>

    </div>

  `);

}



/* =========================================================
   LIGHTS
========================================================= */


function renderLights(){

  const box =
    document.getElementById(
      "lightGrid"
    );


  box.innerHTML = "";


  LIGHTS.forEach(light => {

    const card =
      document.createElement("article");


    card.className =
      "light-card reveal";


    card.innerHTML = `

      <div class="light-visual">

        <img
          src="${light.img}"
          alt="${name(light)}"
          loading="lazy"
        >

      </div>


      <div class="light-card-body">

        <h3>
          ${name(light)}
        </h3>

        <p>
          ${desc(light)}
        </p>


        <div class="source-mini">

          <span>
            RULE ${light.rule}
          </span>

          <span>
            SOURCE ↗
          </span>

        </div>

      </div>

    `;


    card.onclick =
      () => openInfo(light);


    box.appendChild(card);

  });

}



/* =========================================================
   BUOYS
========================================================= */


function renderBuoys(){

  const box =
    document.getElementById(
      "buoyGrid"
    );


  box.innerHTML = "";


  BUOYS.forEach(buoy => {

    const card =
      document.createElement("article");


    card.className =
      "buoy-card reveal";


    card.innerHTML = `

      <span class="buoy-tag">
        ${buoy.tag}
      </span>


      <div
        class="buoy-symbol ${buoy.id}"
      >

        <div class="buoy-top">

          <span></span>
          <span></span>

        </div>

        <div class="buoy-body"></div>

      </div>


      <h3>
        ${name(buoy)}
      </h3>


      <p>
        ${desc(buoy)}
      </p>

    `;


    card.onclick =
      () => openInfo(buoy);


    box.appendChild(card);

  });

}



/* =========================================================
   SCENARIOS
========================================================= */


function renderScenarios(){

  const box =
    document.getElementById(
      "scenarioGrid"
    );


  box.innerHTML = "";


  SCENARIOS.forEach(
    (scenario,index) => {

      const card =
        document.createElement("article");


      card.className =
        "scenario-card reveal";


      card.innerHTML = `

        <span class="scenario-number">

          SCENARIO
          ${String(index+1).padStart(2,"0")}

          /

          RULE
          ${scenario.rule}

        </span>


        <div class="scenario-diagram">

          <span class="ship-dot"></span>

        </div>


        <h3>
          ${name(scenario)}
        </h3>


        <p>
          ${desc(scenario)}
        </p>


        <div class="scenario-action">

          ${
            state.lang === "de"
              ? "ENTSCHEIDUNG ÖFFNEN ↗"
              : "OPEN DECISION ↗"
          }

        </div>

      `;


      card.onclick =
        () => openScenario(scenario);


      box.appendChild(card);

    }
  );

}



/* =========================================================
   SCENARIO MODAL
========================================================= */


function openScenario(scenario){

  const steps =
    state.lang === "de"
      ? scenario.stepsDe
      : scenario.stepsEn;


  const title =
    state.lang === "de"
      ? scenario.actionDe
      : scenario.actionEn;


  const list =
    steps
      .map(
        (step,index) => `

          <li>
            <b>${index+1}</b>
            ${step}
          </li>

        `
      )
      .join("");


  modal(`

    <div class="modal-head">

      <div>

        <div class="modal-code">
          RULE ${scenario.rule} / PRACTICE
        </div>

        <h2>
          ${name(scenario)}
        </h2>

      </div>


      <button
        class="modal-close"
        onclick="closeModal()"
      >
        ×
      </button>

    </div>


    <div class="modal-body">


      <div class="scenario-visual">

        <span class="own">
          ▲
        </span>

        <span class="other">
          ▲
        </span>

        <span class="course"></span>

        <span class="course red"></span>

      </div>


      <h3>
        ${
          state.lang === "de"
            ? "DEINE ENTSCHEIDUNG"
            : "YOUR DECISION"
        }
      </h3>


      <p>
        ${title}
      </p>


      <ol class="step-list">
        ${list}
      </ol>


      <a
        class="modal-source"
        href="${IMO}"
        target="_blank"
        rel="noopener"
      >

        ${
          state.lang === "de"

            ?

            `REGEL ${scenario.rule} BEI IMO ↗`

            :

            `RULE ${scenario.rule} AT IMO ↗`
        }

      </a>

    </div>

  `);

}



/* =========================================================
   KNOTS
========================================================= */


function renderKnots(){

  const box =
    document.getElementById(
      "knotGrid"
    );


  box.innerHTML = "";


  KNOTS.forEach(knot => {

    const card =
      document.createElement("article");


    card.className =
      "info-card knot-card reveal";


    card.innerHTML = `

      <div class="knot-image">

        <img
          src="${knot.img}"
          alt="${name(knot)}"
          loading="lazy"
        >

      </div>


      <div class="knot-body">

        <h3>
          ${name(knot)}
        </h3>


        <p>
          ${
            state.lang === "de"
              ? knot.useDe
              : knot.useEn
          }
        </p>


        <div class="source-mini">

          <span>
            WIKIMEDIA COMMONS
          </span>

          <span>
            QUELLE ↗
          </span>

        </div>

      </div>

    `;


    card.onclick =
      () => openKnot(knot);


    box.appendChild(card);

  });

}



/* =========================================================
   INFO MODAL
========================================================= */


function openInfo(item){

  const title =
    name(item);


  const text =
    desc(item);


  const src =
    item.src
    ||
    SRC.cardinal;


  modal(`

    <div class="modal-head">

      <div>

        <div class="modal-code">

          ${
            item.rule
              ? `RULE ${item.rule}`
              : "IALA / MARK"
          }

        </div>

        <h2>
          ${title}
        </h2>

      </div>


      <button
        class="modal-close"
        onclick="closeModal()"
      >
        ×
      </button>

    </div>


    <div class="modal-body">


      ${
        item.img

        ?

        `

          <div
            class="knot-image"
            style="
              height:220px;
              margin-bottom:20px;
            "
          >

            <img
              src="${item.img}"
              alt="${title}"
              style="
                width:100%;
                height:100%;
                object-fit:contain;
              "
            >

          </div>

        `

        :

        ""

      }


      <h3>

        ${
          state.lang === "de"
            ? "ERKLÄRUNG"
            : "EXPLANATION"
        }

      </h3>


      <p>
        ${text}
      </p>


      <a
        class="modal-source"
        href="${src}"
        target="_blank"
        rel="noopener"
      >

        ${
          state.lang === "de"
            ? "QUELLE ÖFFNEN ↗"
            : "OPEN SOURCE ↗"
        }

      </a>

    </div>

  `);

}



/* =========================================================
   KNOT MODAL
========================================================= */


function openKnot(knot){

  const steps =
    (
      state.lang === "de"
        ? knot.stepsDe
        : knot.stepsEn
    )
    .map(
      (step,index) => `

        <li>

          <b>
            ${index+1}
          </b>

          ${step}

        </li>

      `
    )
    .join("");


  modal(`

    <div class="modal-head">

      <div>

        <div class="modal-code">
          SEAMANSHIP / KNOT
        </div>

        <h2>
          ${name(knot)}
        </h2>

      </div>


      <button
        class="modal-close"
        onclick="closeModal()"
      >
        ×
      </button>

    </div>


    <div class="modal-body">


      <div
        class="knot-image"
        style="
          height:250px;
          margin-bottom:20px;
        "
      >

        <img
          src="${knot.img}"
          alt="${name(knot)}"
          style="
            width:100%;
            height:100%;
            object-fit:contain;
          "
        >

      </div>


      <h3>

        ${
          state.lang === "de"
            ? "SCHRITT FÜR SCHRITT"
            : "STEP BY STEP"
        }

      </h3>


      <ol class="step-list">

        ${steps}

      </ol>


      <a
        class="modal-source"
        href="${knot.src}"
        target="_blank"
        rel="noopener"
      >

        ${
          state.lang === "de"
            ? "BILDQUELLE ÖFFNEN ↗"
            : "OPEN IMAGE SOURCE ↗"
        }

      </a>

    </div>

  `);

}



/* =========================================================
   MODAL
========================================================= */


function modal(content){

  document.getElementById(
    "modalRoot"
  ).innerHTML = `

    <div
      class="modal-backdrop"
      onclick="
        if(event.target===this)
          closeModal()
      "
    >

      <div class="modal">

        ${content}

      </div>

    </div>

  `;


  document.body.style.overflow =
    "hidden";

}


function closeModal(){

  document.getElementById(
    "modalRoot"
  ).innerHTML = "";


  document.body.style.overflow =
    "";

}



/* =========================================================
   SCROLL INTERACTION
========================================================= */


function setupScroll(){

  const progress =
    document.getElementById(
      "scrollProgress"
    );


  const links =
    [
      ...document.querySelectorAll(
        ".main-nav a"
      )
    ];


  const sections =
    links
      .map(
        link =>
          document.querySelector(
            link.getAttribute("href")
          )
      )
      .filter(Boolean);


  const activeObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if(entry.isIntersecting){

            links.forEach(link => {

              link.classList.toggle(

                "active",

                link.getAttribute("href")
                ===
                `#${entry.target.id}`

              );

            });

          }

        });

      },

      {
        rootMargin:
          "-35% 0px -55% 0px",

        threshold:0

      }

    );


  sections.forEach(
    section =>
      activeObserver.observe(section)
  );


  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if(entry.isIntersecting){

            entry.target
              .classList
              .add("visible");


            revealObserver
              .unobserve(entry.target);

          }

        });

      },

      {
        threshold:.08
      }

    );


  document
    .querySelectorAll(".reveal")
    .forEach(element =>
      revealObserver.observe(element)
    );


  window.addEventListener(

    "scroll",

    () => {

      const height =
        document.documentElement
          .scrollHeight
        -
        window.innerHeight;


      const percentage =
        height > 0

          ?

          (
            window.scrollY /
            height
          ) * 100

          :

          0;


      progress.style.width =
        percentage + "%";

    },

    {
      passive:true
    }

  );

}



/* =========================================================
   RADAR INTERACTION
========================================================= */


function setupRadar(){

  const radar =
    document.getElementById(
      "radar"
    );


  if(!radar) return;


  radar.addEventListener(
    "mousemove",
    event => {

      const rect =
        radar.getBoundingClientRect();


      const x =
        (
          event.clientX -
          rect.left
        )
        /
        rect.width
        -
        .5;


      const y =
        (
          event.clientY -
          rect.top
        )
        /
        rect.height
        -
        .5;


      radar.style.transform = `

        perspective(500px)

        rotateX(${y * -3}deg)

        rotateY(${x * 3}deg)

      `;

    }
  );


  radar.addEventListener(
    "mouseleave",
    () => {

      radar.style.transform =
        "";

    }
  );

}



/* =========================================================
   SEARCH
========================================================= */


document
  .getElementById("ruleSearch")
  .addEventListener(
    "input",
    event => {

      state.query =
        event.target.value;

      renderRules();

    }
  );



/* =========================================================
   CLEAR SEARCH
========================================================= */


document
  .getElementById("clearSearch")
  .addEventListener(
    "click",
    () => {

      state.query = "";

      document
        .getElementById("ruleSearch")
        .value = "";

      renderRules();

    }
  );



/* =========================================================
   LANGUAGE SWITCH
========================================================= */


document
  .getElementById("langToggle")
  .addEventListener(
    "click",
    () => {

      state.lang =
        state.lang === "de"
          ? "en"
          : "de";


      localStorage.setItem(
        "colreg-lang",
        state.lang
      );


      applyLanguage();

    }
  );



/* =========================================================
   ESCAPE = CLOSE MODAL
========================================================= */


document.addEventListener(
  "keydown",
  event => {

    if(event.key === "Escape"){

      closeModal();

    }

  }
);



/* =========================================================
   YEAR
========================================================= */


document.getElementById(
  "year"
).textContent =
  new Date().getFullYear();



/* =========================================================
   START
========================================================= */


applyLanguage();

setupScroll();

setupRadar();
