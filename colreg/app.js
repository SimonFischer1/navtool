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

    "nav.sounds":
      "SCHALL",

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

    "nav.sounds":
      "SOUND",

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
  {id:"power",de:"Maschinenfahrzeug in Fahrt",en:"Power-driven vessel underway",rule:23,descDe:"Topplicht(e), Seitenlichter und Hecklicht. Bei größeren Fahrzeugen können mehrere Topplichter erforderlich sein.",descEn:"Masthead light(s), sidelights and sternlight. Larger vessels may require more than one masthead light.",src:SRC.lights},
  {id:"towing",de:"Schleppendes Fahrzeug",en:"Vessel engaged in towing",rule:24,descDe:"Beim Schleppen: zusätzliche weiße Topplichter in vertikaler Linie und ein gelbes Schlepplicht; je nach Länge weitere Kennungen.",descEn:"When towing: additional masthead lights in a vertical line and a yellow towing light; further requirements depend on tow length.",src:IMO},
  {id:"sailing",de:"Segelfahrzeug in Fahrt",en:"Sailing vessel underway",rule:25,descDe:"Seitenlichter und Hecklicht; bei bestimmten kleinen Fahrzeugen sind kombinierte Laternen möglich.",descEn:"Sidelights and sternlight; certain small sailing vessels may use a combined lantern.",src:IMO},
  {id:"fishing",de:"Fischereifahrzeug",en:"Vessel engaged in fishing",rule:26,descDe:"Beim Schleppnetzfischen: grün über weiß. Bei anderer Fischerei: rot über weiß, mit zusätzlichen Kennungen je nach Tätigkeit.",descEn:"Trawling: green over white. Other fishing: red over white, with additional signals depending on the operation.",src:IMO},
  {id:"nuc",de:"Manövrierunfähiges Fahrzeug",en:"Vessel not under command",rule:27,descDe:"Zwei rote Rundumlichter senkrecht übereinander; zusätzliche Seiten-/Hecklichter je nach Fahrtzustand.",descEn:"Two all-round red lights vertically arranged, with additional lights depending on whether the vessel is making way.",src:IMO},
  {id:"ram",de:"Manövrierbehindertes Fahrzeug",en:"Vessel restricted in ability to manoeuvre",rule:27,descDe:"Rot–weiß–rot als markante vertikale Kennung; zusätzliche Lichter und Signalkörper nach Tätigkeit.",descEn:"Red–white–red vertical identification, with additional lights and shapes according to the operation.",src:IMO},
  {id:"draft",de:"Tiefgangbeschränktes Fahrzeug",en:"Vessel constrained by draught",rule:28,descDe:"Drei rote Rundumlichter senkrecht übereinander, zusätzlich zu den für Maschinenfahrzeuge vorgeschriebenen Lichtern.",descEn:"Three all-round red lights in a vertical line, in addition to the lights prescribed for power-driven vessels.",src:IMO},
  {id:"pilot",de:"Lotsenfahrzeug im Lotsendienst",en:"Pilot vessel on pilotage duty",rule:29,descDe:"Weiß über rot. Zusätzlich gelten je nach Fahrtzustand die entsprechenden Navigationslichter.",descEn:"White over red. The appropriate navigation lights are also shown according to the vessel's condition.",src:IMO},
  {id:"anchor",de:"Fahrzeug vor Anker",en:"Vessel at anchor",rule:30,descDe:"Weiße Rundumlichter entsprechend der Fahrzeuglänge; bei Bedarf zusätzlich Signalkörper.",descEn:"White all-round anchor light(s) according to vessel length, with shapes where required.",src:IMO},
  {id:"aground",de:"Fahrzeug auf Grund",en:"Vessel aground",rule:30,descDe:"Ankerlichter plus zwei rote Rundumlichter senkrecht übereinander und die vorgeschriebenen Signalkörper.",descEn:"Anchor lights plus two all-round red lights vertically arranged and the prescribed shapes.",src:IMO},
  {id:"seaplane",de:"Wasserflugzeug auf dem Wasser",en:"Seaplane on the water",rule:31,descDe:"Soweit praktikabel Lichter und Signalkörper ähnlich wie bei Fahrzeugen auf dem Wasser.",descEn:"As far as practicable, lights and shapes as closely similar to vessels as circumstances permit.",src:IMO}
];



/* =========================================================
   SOUND SIGNALS
========================================================= */

const SOUND_SIGNALS = [
  {id:"kvr34-starboard",group:"kvr34",rule:"KVR 34(a)",de:"Kursänderung nach Steuerbord",en:"Altering course to starboard",pattern:["S"],meaningDe:"Ein kurzer Ton bedeutet: Ich ändere meinen Kurs nach Steuerbord.",meaningEn:"One short blast means: I am altering my course to starboard.",source:IMO},
  {id:"kvr34-port",group:"kvr34",rule:"KVR 34(a)",de:"Kursänderung nach Backbord",en:"Altering course to port",pattern:["S","S"],meaningDe:"Zwei kurze Töne bedeuten: Ich ändere meinen Kurs nach Backbord.",meaningEn:"Two short blasts mean: I am altering my course to port.",source:IMO},
  {id:"kvr34-astern",group:"kvr34",rule:"KVR 34(a)",de:"Maschine arbeitet rückwärts",en:"Operating astern propulsion",pattern:["S","S","S"],meaningDe:"Drei kurze Töne bedeuten: Ich arbeite rückwärts.",meaningEn:"Three short blasts mean: I am operating astern propulsion.",source:IMO},
  {id:"kvr34-overtake-sb",group:"kvr34",rule:"KVR 34(c)",de:"Überholen an Steuerbord",en:"Overtaking on starboard side",pattern:["L","L","S"],meaningDe:"Zwei lange, ein kurzer Ton: Ich beabsichtige, Sie an Ihrer Steuerbordseite zu überholen.",meaningEn:"Two prolonged followed by one short blast: I intend to overtake you on your starboard side.",source:IMO},
  {id:"kvr34-overtake-bb",group:"kvr34",rule:"KVR 34(c)",de:"Überholen an Backbord",en:"Overtaking on port side",pattern:["L","L","S","S"],meaningDe:"Zwei lange, zwei kurze Töne: Ich beabsichtige, Sie an Ihrer Backbordseite zu überholen.",meaningEn:"Two prolonged followed by two short blasts: I intend to overtake you on your port side.",source:IMO},
  {id:"kvr34-agree",group:"kvr34",rule:"KVR 34(c)",de:"Einverständnis beim Überholen",en:"Agreement to overtaking",pattern:["L","S","L","S"],meaningDe:"Lang–kurz–lang–kurz: Einverständnis des zu überholenden Fahrzeugs.",meaningEn:"Prolonged–short–prolonged–short: agreement by the vessel being overtaken.",source:IMO},
  {id:"kvr34-doubt",group:"kvr34",rule:"KVR 34(d)",de:"Zweifel- und Gefahrensignal",en:"Signal of doubt / danger",pattern:["S","S","S","S","S"],meaningDe:"Mindestens fünf kurze, schnelle Töne: Zweifel an den Absichten oder an ausreichenden Ausweichmaßnahmen.",meaningEn:"At least five short and rapid blasts: doubt about another vessel's intentions or whether sufficient action is being taken.",source:IMO},
  {id:"kvr34-bend",group:"kvr34",rule:"KVR 34(e)",de:"Unübersichtliche Biegung / Engstelle",en:"Bend or obstructed channel",pattern:["L"],meaningDe:"Ein langer Ton beim Nähern an eine Biegung oder Stelle, an der andere Fahrzeuge verdeckt sein können.",meaningEn:"One prolonged blast when nearing a bend or area where other vessels may be obscured.",source:IMO},
  {id:"kvr35-making-way",group:"kvr35",rule:"KVR 35(a)",de:"Maschinenfahrzeug in Fahrt bei verminderter Sicht",en:"Power-driven vessel making way",pattern:["L"],interval:"≤ 2 min",meaningDe:"Bei verminderter Sicht mindestens alle zwei Minuten ein langer Ton.",meaningEn:"In restricted visibility, one prolonged blast at intervals of not more than two minutes.",source:IMO},
  {id:"kvr35-stopped",group:"kvr35",rule:"KVR 35(b)",de:"Maschinenfahrzeug gestoppt",en:"Power-driven vessel stopped",pattern:["L","L"],interval:"≤ 2 min",meaningDe:"Zwei lange Töne nacheinander, mit etwa zwei Sekunden Abstand.",meaningEn:"Two prolonged blasts in succession, with about two seconds between them.",source:IMO},
  {id:"kvr35-nuc-ram",group:"kvr35",rule:"KVR 35(c)",de:"NUC / RAM / Tiefgang / Segel / Fischerei / Schleppen",en:"NUC / RAM / constrained draft / sailing / fishing / towing",pattern:["L","S","S"],interval:"≤ 2 min",meaningDe:"Ein langer und zwei kurze Töne. Das Signal gilt für die in Regel 35(c) genannten Fahrzeuge.",meaningEn:"One prolonged followed by two short blasts for the vessels listed in Rule 35(c).",source:IMO},
  {id:"kvr35-tow",group:"kvr35",rule:"KVR 35(e)",de:"Letztes geschlepptes Fahrzeug",en:"Last manned vessel of a tow",pattern:["L","S","S","S"],interval:"≤ 2 min",meaningDe:"Ein langer und drei kurze Töne, wenn das letzte Fahrzeug des Schleppzuges bemannt ist.",meaningEn:"One prolonged followed by three short blasts by the last manned vessel of a tow.",source:IMO},
  {id:"kvr35-anchor",group:"kvr35",rule:"KVR 35(g)",de:"Fahrzeug vor Anker",en:"Vessel at anchor",pattern:["BELL"],interval:"≤ 1 min",meaningDe:"Glocke etwa fünf Sekunden lang schnell läuten. Ab 100 m zusätzlich Gong im Achterschiff.",meaningEn:"Rapid bell ringing for about five seconds at intervals of not more than one minute; vessels 100 m or more also sound the gong aft.",source:IMO},
  {id:"kvr35-additional",group:"kvr35",rule:"KVR 35(g)",de:"Zusätzliches Ankersignal",en:"Additional anchor signal",pattern:["S","L","S"],meaningDe:"Ein kurzer, ein langer und ein kurzer Ton kann zusätzlich von einem Fahrzeug vor Anker gegeben werden.",meaningEn:"A short–prolonged–short signal may additionally be sounded by a vessel at anchor.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"kvr36-attention",group:"kvr36",rule:"KVR 36",de:"Aufmerksamkeitssignal",en:"Signal to attract attention",pattern:["CUSTOM"],meaningDe:"Licht- oder Schallsignale dürfen zur Aufmerksamkeit verwendet werden, sofern sie nicht mit einem vorgeschriebenen Signal verwechselt werden können.",meaningEn:"Light or sound signals may be used to attract attention if they cannot be mistaken for an authorized signal.",source:IMO},
  {id:"kvr37-sos",group:"kvr36",rule:"KVR 37 / Annex IV",de:"Notzeichen / SOS",en:"Distress signal / SOS",pattern:["S","S","S","L","L","L","S","S","S"],meaningDe:"SOS ist eines der in Anhang IV aufgeführten Notzeichen.",meaningEn:"SOS is one of the distress signals listed in Annex IV.",source:IMO},
  {id:"see-achtung",group:"seeschstro",rule:"SeeSchStrO",de:"Achtung",en:"Attention",pattern:["S"],meaningDe:"Ein kurzer Ton als wichtiges deutsches Aufmerksamkeitssignal im SeeSchStrO-Kontext.",meaningEn:"One short blast as an important German waterways attention signal.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-stop",group:"seeschstro",rule:"SeeSchStrO",de:"Anhalten",en:"Stop",pattern:["L","S","S"],meaningDe:"Anhalten auf Aufforderung durch Fahrzeuge des öffentlichen Dienstes.",meaningEn:"Stop on the signal given by an official/public-service vessel.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-danger",group:"seeschstro",rule:"SeeSchStrO",de:"Allgemeines Gefahr- und Warnsignal",en:"General danger and warning signal",pattern:["L","L","S","S","S","S"],meaningDe:"Allgemeines Gefahr- und Warnsignal nach der deutschen SeeSchStrO-Übersicht.",meaningEn:"General danger and warning signal in the German SeeSchStrO overview.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-bleibweg",group:"seeschstro",rule:"SeeSchStrO",de:"Bleib-weg-Signal",en:"Keep-clear signal",pattern:["S","L","S"],meaningDe:"Kurzer–langer–kurzer Ton; nach der deutschen Übersicht wiederholt abzugeben.",meaningEn:"Short–prolonged–short; repeated according to the German waterways guidance.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-closed",group:"seeschstro",rule:"SeeSchStrO",de:"Sperrung der Seeschifffahrtsstraße",en:"Waterway closed",pattern:["L","L","L"],meaningDe:"Drei lange Töne kennzeichnen in der SeeSchStrO-Übersicht die Sperrung der Seeschifffahrtsstraße.",meaningEn:"Three prolonged blasts indicate closure of the sea waterway in the SeeSchStrO overview.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-four",group:"seeschstro",rule:"SeeSchStrO",de:"Durchfahrt vorübergehend nicht möglich",en:"Passage temporarily unavailable",pattern:["S","S","S","S"],meaningDe:"Vier kurze Töne: Durchfahrt bzw. Öffnung einer Brücke, eines Sperrwerks oder einer Schleuse vorübergehend nicht möglich.",meaningEn:"Four short blasts: passage or opening of a bridge, barrier or lock is temporarily unavailable.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-attention-west",group:"seeschstro",rule:"SeeSchStrO / NOK",de:"Achtungssignal westwärts",en:"Attention signal westbound",pattern:["L"],meaningDe:"Auf dem Nord-Ostsee-Kanal in den dafür genannten Situationen: ein langer Ton.",meaningEn:"On the Kiel Canal in the specified situations: one prolonged blast.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-attention-east",group:"seeschstro",rule:"SeeSchStrO / NOK",de:"Achtungssignal ostwärts",en:"Attention signal eastbound",pattern:["L","L"],meaningDe:"Auf dem Nord-Ostsee-Kanal in den dafür genannten Situationen: zwei lange Töne.",meaningEn:"On the Kiel Canal in the specified situations: two prolonged blasts.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-nok-slow",group:"seeschstro",rule:"SeeSchStrO / NOK",de:"Geschwindigkeit vermindern",en:"Reduce speed",pattern:["L","S","S","S","L","S","S","S"],meaningDe:"Besonderes Warnsignal auf dem Nord-Ostsee-Kanal beim Vermindern der Geschwindigkeit.",meaningEn:"Special Kiel Canal warning signal when reducing speed.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-nok-moor",group:"seeschstro",rule:"SeeSchStrO / NOK",de:"Ich will anlegen",en:"I intend to berth",pattern:["L","S","S","S"],meaningDe:"Besonderes Warnsignal auf dem Nord-Ostsee-Kanal beim beabsichtigten Festmachen.",meaningEn:"Special Kiel Canal warning signal when intending to berth.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-ferry-free",group:"seeschstro",rule:"SeeSchStrO",de:"Freifahrende Fähre bei verminderter Sicht",en:"Free-running ferry in restricted visibility",pattern:["S","L","L"],meaningDe:"Kurzer und zwei lange Töne während der Fahrt bei verminderter Sicht.",meaningEn:"One short followed by two prolonged blasts during restricted visibility.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-ferry-notfree",group:"seeschstro",rule:"SeeSchStrO",de:"Nicht freifahrende Fähre bei verminderter Sicht",en:"Non-free-running ferry in restricted visibility",pattern:["BELL"],meaningDe:"Kontinuierliche Einzelschläge der Glocke während der gesamten Fahrt bei verminderter Sicht.",meaningEn:"Continuous individual bell strokes throughout the voyage in restricted visibility.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-push",group:"seeschstro",rule:"SeeSchStrO",de:"Bugsierendes Maschinenfahrzeug",en:"Power-driven vessel engaged in pushing",pattern:["L","S","L","L"],meaningDe:"Besonderes Signal für bugsierende Maschinenfahrzeuge in Fahrt bei verminderter Sicht.",meaningEn:"Special signal for a power-driven vessel engaged in pushing in restricted visibility.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-avoid-left",group:"seeschstro",rule:"SeeSchStrO / NOK",de:"Nach links ausweichen",en:"Intend to alter to port",pattern:["L","S","S","S","S"],meaningDe:"Hinweissignal und Antwortsignal auf dem Nord-Ostsee-Kanal für ein Ausweichmanöver nach links.",meaningEn:"Kiel Canal indication and reply signal for an intended alteration to port.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-open",group:"seeschstro",rule:"SeeSchStrO",de:"Brücke / Sperrtor / Schleuse öffnen",en:"Request opening of bridge / barrier / lock",pattern:["L","L"],meaningDe:"Zwei lange Töne als Anforderungssignal; örtliche Sonderfälle können abweichen.",meaningEn:"Two prolonged blasts as the opening request; local special cases may differ.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-open-inland",group:"seeschstro",rule:"SeeSchStrO / Trave",de:"Binnenwärts: Öffnung anfordern",en:"Inland-bound: request opening",pattern:["S","S","S","S"],meaningDe:"Vier kurze Töne für den in der Übersicht genannten Trave-Fall.",meaningEn:"Four short blasts for the specified Trave case.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-final-lift",group:"seeschstro",rule:"SeeSchStrO / Trave",de:"Letzte Hubstufe anfordern",en:"Request final lift stage",pattern:["L","L","S"],meaningDe:"Zwei lange und ein kurzer Ton für den genannten Hubbrücken-Fall.",meaningEn:"Two prolonged and one short blast for the specified lifting-bridge case.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-tug-request",group:"seeschstro",rule:"SeeSchStrO",de:"Schlepper benötigt",en:"Tug required",pattern:["S","L","S","L"],meaningDe:"Kurzer–langer–kurzer–langer Ton: Schlepper wird benötigt.",meaningEn:"Short–prolonged–short–prolonged: a tug is required.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-tug-take",group:"seeschstro",rule:"SeeSchStrO",de:"Bugschlepper: Leine nehmen / beginnen",en:"Bow tug: take line / start towing",pattern:["L","S","S","L"],meaningDe:"Signal zur Koordination des Schleppmanövers.",meaningEn:"Signal used to coordinate the towing manoeuvre.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-tug-stern",group:"seeschstro",rule:"SeeSchStrO",de:"Heckschlepper: Leine nehmen / beginnen",en:"Stern tug: take line / start towing",pattern:["L","S","S","L","L"],meaningDe:"Signal zur Koordination des Schleppmanövers.",meaningEn:"Signal used to coordinate the towing manoeuvre.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-tug-starboard",group:"seeschstro",rule:"SeeSchStrO",de:"Bugschlepper nach Steuerbord",en:"Bow tug to starboard",pattern:["S"],meaningDe:"Ein kurzer Ton: Bugschlepper nach Steuerbord schleppen oder fieren.",meaningEn:"One short blast: bow tug to starboard.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-tug-port",group:"seeschstro",rule:"SeeSchStrO",de:"Bugschlepper nach Backbord",en:"Bow tug to port",pattern:["S","S"],meaningDe:"Zwei kurze Töne: Bugschlepper nach Backbord schleppen oder fieren.",meaningEn:"Two short blasts: bow tug to port.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-tug-astern",group:"seeschstro",rule:"SeeSchStrO",de:"Heckschlepper achtern",en:"Stern tug astern",pattern:["S","S","S"],meaningDe:"Drei kurze Töne: Heckschlepper nach achtern schleppen oder achtern fieren.",meaningEn:"Three short blasts: stern tug astern.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-tug-slow",group:"seeschstro",rule:"SeeSchStrO",de:"Schleppmanöver verlangsamen / einstellen",en:"Slow or stop towing manoeuvre",pattern:["L"],meaningDe:"Ein langer Ton zur Koordination: Manöver verlangsamen oder einstellen.",meaningEn:"One prolonged blast: slow down or stop the towing manoeuvre.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
  {id:"see-tug-danger",group:"seeschstro",rule:"SeeSchStrO",de:"Gefahr beim Schleppen",en:"Danger during towing",pattern:["S","S","S","S","S"],meaningDe:"Mehrere kurze Töne: Gefahr.",meaningEn:"Repeated short blasts: danger.",source:"https://www.elwis.de/DE/Sportschifffahrt/Seebereich/Sichtzeichen-und-Schallsignale-SeeSchStrO.pdf?__blob=publicationFile&v=4"},
];

/* =========================================================
   LIGHT VISUALS
========================================================= */

const LIGHT_VISUALS = {
  power:`<div class="light-stack"><i class="white"></i><i class="red"></i><i class="green"></i><i class="white stern"></i></div>`,
  towing:`<div class="light-stack tow"><i class="white"></i><i class="white"></i><i class="yellow"></i><i class="red"></i><i class="green"></i></div>`,
  sailing:`<div class="light-stack sail"><i class="red"></i><i class="green"></i><i class="white stern"></i></div>`,
  fishing:`<div class="light-stack fish"><i class="green"></i><i class="white"></i></div>`,
  nuc:`<div class="light-stack"><i class="red"></i><i class="red"></i></div>`,
  ram:`<div class="light-stack"><i class="red"></i><i class="white"></i><i class="red"></i></div>`,
  draft:`<div class="light-stack"><i class="red"></i><i class="red"></i><i class="red"></i></div>`,
  pilot:`<div class="light-stack"><i class="white"></i><i class="red"></i></div>`,
  anchor:`<div class="light-stack"><i class="white anchor-light"></i></div>`,
  aground:`<div class="light-stack"><i class="white"></i><i class="red"></i><i class="red"></i></div>`,
  seaplane:`<div class="light-stack"><i class="white"></i><i class="red"></i><i class="green"></i></div>`
};

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
  renderSounds();

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


let soundFilter="all";
let activeSoundTimer=null;

function toneDuration(type){
  if(type==="S") return 1.0;
  if(type==="L") return 4.5;
  return 5.0;
}

function toneLabel(type){
  if(type==="S") return "●";
  if(type==="L") return "▬";
  if(type==="BELL") return "🔔";
  return "•";
}

function playPattern(pattern, card){
  if(activeSoundTimer){
    clearTimeout(activeSoundTimer);
    activeSoundTimer=null;
  }
  document.querySelectorAll(".sound-tone.playing").forEach(x=>x.classList.remove("playing"));
  const AudioCtx=window.AudioContext||window.webkitAudioContext;
  if(!AudioCtx){alert(state.lang==="de"?"Audio wird von diesem Browser nicht unterstützt.":"Audio is not supported by this browser.");return;}
  const ctx=new AudioCtx();
  let t=ctx.currentTime+0.05;
  const toneEls=[...card.querySelectorAll(".sound-tone")];
  pattern.forEach((type,i)=>{
    const d=toneDuration(type);
    if(type==="BELL"){
      const osc=ctx.createOscillator(); const gain=ctx.createGain();
      osc.type="sine"; osc.frequency.setValueAtTime(780,t);
      gain.gain.setValueAtTime(0.0001,t); gain.gain.exponentialRampToValueAtTime(0.18,t+0.01); gain.gain.exponentialRampToValueAtTime(0.0001,t+1.2);
      osc.connect(gain).connect(ctx.destination); osc.start(t); osc.stop(t+1.25);
    }else{
      const osc=ctx.createOscillator(); const gain=ctx.createGain();
      osc.type="square"; osc.frequency.setValueAtTime(440,t);
      gain.gain.setValueAtTime(0.0001,t); gain.gain.exponentialRampToValueAtTime(0.12,t+0.02); gain.gain.setValueAtTime(0.12,t+d-0.03); gain.gain.exponentialRampToValueAtTime(0.0001,t+d);
      osc.connect(gain).connect(ctx.destination); osc.start(t); osc.stop(t+d+0.02);
    }
    const el=toneEls[i];
    if(el){
      const delay=Math.max(0,(t-ctx.currentTime)*1000);
      setTimeout(()=>el.classList.add("playing"),delay);
      setTimeout(()=>el.classList.remove("playing"),delay+d*1000);
    }
    t+=d+0.45;
  });
  activeSoundTimer=setTimeout(()=>ctx.close(),Math.max(1000,(t-ctx.currentTime)*1000+250));
}

function renderSounds(){
  const box=document.getElementById("soundGrid");
  if(!box)return;
  const list=SOUND_SIGNALS.filter(x=>soundFilter==="all"||x.group===soundFilter);
  box.innerHTML="";
  list.forEach(signal=>{
    const card=document.createElement("article");
    card.className="sound-card";
    const patternHtml=signal.pattern.map((type,i)=>`<span class="sound-tone ${type==='L'?'long':''}" title="${type}">${toneLabel(type)}</span>`).join("");
    card.innerHTML=`
      <div class="sound-top">
        <span class="sound-rule">${signal.rule}</span>
        <button class="sound-play" type="button">▶ PLAY</button>
      </div>
      <h3>${state.lang==='de'?signal.de:signal.en}</h3>
      <div class="sound-pattern">${patternHtml}</div>
      <div class="sound-meta">${signal.pattern.join(" ")} ${signal.interval?` · ${signal.interval}`:""}</div>
      <p>${state.lang==='de'?signal.meaningDe:signal.meaningEn}</p>
      <a class="sound-source" href="${signal.source}" target="_blank" rel="noopener">${state.lang==='de'?"QUELLE ÖFFNEN ↗":"OPEN SOURCE ↗"}</a>
    `;
    card.querySelector(".sound-play").onclick=e=>{e.stopPropagation();playPattern(signal.pattern,card)};
    box.appendChild(card);
  });
}

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
        ${LIGHT_VISUALS[light.id] || `<img src="${light.img || ''}" alt="${name(light)}" loading="lazy">`}
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



document.querySelectorAll("[data-sound-filter]").forEach(button=>{
  button.addEventListener("click",()=>{
    soundFilter=button.dataset.soundFilter;
    document.querySelectorAll("[data-sound-filter]").forEach(b=>b.classList.toggle("active",b===button));
    renderSounds();
  });
});

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
