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
    "https://commons.wikimedia.org/wiki/File:Knot_clove.svg"

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
  {id:"power",day:"none",dayDe:"Keine Signalkörper. Ein Segelfahrzeug, das gleichzeitig die Maschine benutzt, zeigt tagsüber einen Kegel Spitze unten.",dayEn:"No shapes. A sailing vessel also using her engine shows a cone, point down, by day.",de:"Maschinenfahrzeug in Fahrt",en:"Power-driven vessel underway",rule:23,descDe:"Topplicht(e), Seitenlichter und Hecklicht. Bei größeren Fahrzeugen können mehrere Topplichter erforderlich sein.",descEn:"Masthead light(s), sidelights and sternlight. Larger vessels may require more than one masthead light.",src:SRC.lights},
  {id:"towing",day:"diamond",dayDe:"Beträgt die Länge des Schlepps mehr als 200 m: ein Rhombus (zwei Kegel Basis an Basis) am Schlepper und am letzten Anhang.",dayEn:"If the tow is longer than 200 m: a diamond shape (two cones base to base) on the tug and on the last vessel of the tow.",de:"Schleppendes Fahrzeug",en:"Vessel engaged in towing",rule:24,descDe:"Beim Schleppen: zusätzliche weiße Topplichter in vertikaler Linie und ein gelbes Schlepplicht; je nach Länge weitere Kennungen.",descEn:"When towing: additional masthead lights in a vertical line and a yellow towing light; further requirements depend on tow length.",src:IMO},
  {id:"sailing",day:"none",dayDe:"Unter Segeln keine Signalkörper. Mit Maschine zusätzlich: Kegel Spitze unten (siehe Motorsegler).",dayEn:"No shapes under sail alone. With engine running: cone point down (see motor-sailing vessel).",de:"Segelfahrzeug in Fahrt",en:"Sailing vessel underway",rule:25,descDe:"Seitenlichter und Hecklicht; bei bestimmten kleinen Fahrzeugen sind kombinierte Laternen möglich.",descEn:"Sidelights and sternlight; certain small sailing vessels may use a combined lantern.",src:IMO},
  {id:"fishing",day:"cones2",dayDe:"Zwei Kegel mit den Spitzen zueinander, senkrecht übereinander. Ragt das Fanggerät mehr als 150 m seitlich hinaus: zusätzlich ein Kegel Spitze oben in Richtung des Geräts.",dayEn:"Two cones with points together, one above the other. If gear extends more than 150 m horizontally: an additional cone, point up, in the direction of the gear.",de:"Fischereifahrzeug",en:"Vessel engaged in fishing",rule:26,descDe:"Beim Schleppnetzfischen: grün über weiß. Bei anderer Fischerei: rot über weiß, mit zusätzlichen Kennungen je nach Tätigkeit.",descEn:"Trawling: green over white. Other fishing: red over white, with additional signals depending on the operation.",src:IMO},
  {id:"nuc",day:"balls2",dayDe:"Zwei schwarze Bälle (Kugeln) senkrecht übereinander.",dayEn:"Two black balls in a vertical line.",de:"Manövrierunfähiges Fahrzeug",en:"Vessel not under command",rule:27,descDe:"Zwei rote Rundumlichter senkrecht übereinander; zusätzliche Seiten-/Hecklichter je nach Fahrtzustand.",descEn:"Two all-round red lights vertically arranged, with additional lights depending on whether the vessel is making way.",src:IMO},
  {id:"ram",day:"rbr",dayDe:"Ball – Rhombus – Ball senkrecht übereinander. Bei Behinderung durch Arbeiten an Unterwasseranlagen/Baggern zusätzliche Bälle/Rhomben (siehe Baggern).",dayEn:"Ball – diamond – ball in a vertical line. For dredging/underwater operations additional balls/diamonds apply (see dredging).",de:"Manövrierbehindertes Fahrzeug",en:"Vessel restricted in ability to manoeuvre",rule:27,descDe:"Rot–weiß–rot als markante vertikale Kennung; zusätzliche Lichter und Signalkörper nach Tätigkeit.",descEn:"Red–white–red vertical identification, with additional lights and shapes according to the operation.",src:IMO},
  {id:"draft",day:"cyl",dayDe:"Ein schwarzer Zylinder.",dayEn:"One black cylinder.",de:"Tiefgangbeschränktes Fahrzeug",en:"Vessel constrained by draught",rule:28,descDe:"Drei rote Rundumlichter senkrecht übereinander, zusätzlich zu den für Maschinenfahrzeuge vorgeschriebenen Lichtern.",descEn:"Three all-round red lights in a vertical line, in addition to the lights prescribed for power-driven vessels.",src:IMO},
  {id:"pilot",day:"flagH",dayDe:"Flagge „H“ des Internationalen Signalbuchs (links weiß, rechts rot): Lotse an Bord / Lotsendienst.",dayEn:"International Code flag “H” (left half white, right half red): pilot on board / pilotage duty.",de:"Lotsenfahrzeug im Lotsendienst",en:"Pilot vessel on pilotage duty",rule:29,descDe:"Weiß über rot. Zusätzlich gelten je nach Fahrtzustand die entsprechenden Navigationslichter.",descEn:"White over red. The appropriate navigation lights are also shown according to the vessel's condition.",src:IMO},
  {id:"anchor",day:"ball1",dayDe:"Ein schwarzer Ball im vorderen Schiffsteil. Fahrzeuge unter 7 m außerhalb enger Fahrwasser benötigen kein Signal.",dayEn:"One black ball in the forepart. Vessels under 7 m outside narrow channels need not show it.",de:"Fahrzeug vor Anker",en:"Vessel at anchor",rule:30,descDe:"Weiße Rundumlichter entsprechend der Fahrzeuglänge; bei Bedarf zusätzlich Signalkörper.",descEn:"White all-round anchor light(s) according to vessel length, with shapes where required.",src:IMO},
  {id:"aground",day:"balls3",dayDe:"Drei schwarze Bälle senkrecht übereinander.",dayEn:"Three black balls in a vertical line.",de:"Fahrzeug auf Grund",en:"Vessel aground",rule:30,descDe:"Ankerlichter plus zwei rote Rundumlichter senkrecht übereinander und die vorgeschriebenen Signalkörper.",descEn:"Anchor lights plus two all-round red lights vertically arranged and the prescribed shapes.",src:IMO},
  {id:"seaplane",day:"none",dayDe:"Soweit möglich ähnliche Signalkörper wie Fahrzeuge auf dem Wasser.",dayEn:"As far as practicable, shapes similar to vessels on the water.",de:"Wasserflugzeug auf dem Wasser",en:"Seaplane on the water",rule:31,descDe:"Soweit praktikabel Lichter und Signalkörper ähnlich wie bei Fahrzeugen auf dem Wasser.",descEn:"As far as practicable, lights and shapes as closely similar to vessels as circumstances permit.",src:IMO},
  {id:"motorsail",day:"cone",dayDe:"Ein Kegel mit der Spitze nach unten, im vorderen Teil.",dayEn:"One cone, point down, in the forepart.",img:"./pic/day-cone.svg",de:"Motorsegler (Segel + Maschine)",en:"Motor-sailing vessel",rule:25,descDe:"Ein Segelfahrzeug, das gleichzeitig die Maschine benutzt, gilt als Maschinenfahrzeug: Lichter für Maschinenfahrzeuge, tagsüber der Kegel Spitze unten.",descEn:"A sailing vessel also using her engine is a power-driven vessel: power-driven lights, by day a cone point down.",src:IMO},
  {id:"dredge",day:"dredge",dayDe:"Zwei Bälle auf der behinderten Seite, zwei Rhomben auf der Seite, an der Passieren möglich ist.",dayEn:"Two balls on the side where an obstruction exists, two diamonds on the side where passage is safe.",img:"./pic/day-dredge.svg",de:"Baggern / Unterwasserarbeiten",en:"Dredging / underwater operations",rule:27,descDe:"Manövrierbehindert: Rot–Weiß–Rot, zusätzlich zwei rote Lichter auf der behinderten Seite und zwei grüne auf der Seite, an der gefahrlos passiert werden kann.",descEn:"Restricted in ability to manoeuvre: red–white–red, plus two red lights on the obstructed side and two green lights on the side where passing is safe.",src:IMO},
  {id:"mine",day:"mine",dayDe:"Drei schwarze Bälle: einer am Fockmast-Topp, je einer an den Enden der Rah.",dayEn:"Three black balls: one at the foremast head, one at each end of the fore yard.",img:"./pic/day-mine.svg",de:"Minenräumfahrzeug",en:"Mine-clearance vessel",rule:27,descDe:"Drei grüne Rundumlichter, zusätzlich zu den Lichtern eines Maschinenfahrzeugs. Andere Fahrzeuge sollen mindestens 1000 m Abstand halten.",descEn:"Three all-round green lights in addition to power-driven lights. Other vessels should keep at least 1000 m away.",src:IMO}
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
  img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/IALA_north_cardinal_mark.png",
  localPic:"./pic/N-Tonne.svg",

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
  img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/IALA_east_cardinal_mark.png",
  localPic:"./pic/E-Tonne.svg",

  descDe:
    "Östlich passieren. Zwei schwarze Kegel mit den Grundflächen aneinander (Rautenform).",

  descEn:
    "Pass to the east. Two black cones base to base (diamond shape)."
},


{
  id:"south",

  de:"Süd-Kardinalzeichen",

  en:"South Cardinal Mark",

  tag:"S",
  img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/IALA_south_cardinal_mark.png",
  localPic:"./pic/S-Tonne.svg",

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
  img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/IALA_west_cardinal_mark.png",
  localPic:"./pic/W-Tonne.svg",

  descDe:
    "Westlich passieren. Zwei schwarze Kegel mit den Spitzen aneinander (Sanduhrform).",

  descEn:
    "Pass to the west. Two black cones point to point (hourglass shape)."
},


{
  id:"starboard",

  de:"Steuerbord-Lateralzeichen",

  en:"Starboard-hand Lateral Mark",

  tag:"SB",
  img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/IALA_green_mark.png",
  localPic:"./pic/Steuerbord-Tonne.svg",

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
  img:"https://commons.wikimedia.org/wiki/Special:Redirect/file/IALA_red_mark.png",
  localPic:"./pic/Backbord-Tonne.svg",

  descDe:
    "Im IALA-A-Gebiet beim Einlaufen grundsätzlich an Backbord.",

  descEn:
    "In IALA Region A, normally keep it to port when entering from sea."
}
,{id:"safe",de:"Mitte-Fahrwasser-Zeichen (Safe Water)",en:"Safe Water Mark",tag:"SW",localPic:"./pic/safe-water.svg",descDe:"Rot-weiß senkrecht gestreift, rote Kugel. Sicheres Wasser ringsum, Mitte des Fahrwassers bzw. Ansteuerungstonne.",descEn:"Red and white vertical stripes, red sphere. Safe water all round, mid-channel or landfall mark."}
,{id:"isolated",de:"Einzelgefahrenzeichen (Isolated Danger)",en:"Isolated Danger Mark",tag:"ID",localPic:"./pic/isolated-danger.svg",descDe:"Schwarz mit roten Bändern, zwei schwarze Kugeln übereinander. Gefahr an dieser Stelle – rundum mit Abstand passieren.",descEn:"Black with red bands, two black spheres. Danger at this spot – pass all round with clearance."}
,{id:"special",de:"Sonderzeichen (Special Mark)",en:"Special Mark",tag:"SP",localPic:"./pic/special-mark.svg",descDe:"Gelb mit gelbem X-Toppzeichen. Kennzeichnet Sondergebiete (Kabel, Übungsgebiete, Messstationen), kein Fahrwasserzeichen.",descEn:"Yellow with yellow X topmark. Marks special areas (cables, exercise areas, data buoys), not a channel mark."}
,{id:"wreck",de:"Wrackmarkierung (Emergency Wreck Marking)",en:"Emergency Wreck Marking Buoy",tag:"WRK",localPic:"./pic/wreck-mark.svg",descDe:"Blau-gelb senkrecht gestreift, gelbes Kreuz. Neues Wrack bzw. Hindernis – mit Abstand passieren, Gebiet meiden.",descEn:"Blue and yellow vertical stripes, yellow upright cross. New wreck or obstruction – keep clear."}

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
{id:"bowline",de:"Palstek",en:"Bowline",useDe:"Der „König der Knoten“: feste Schlaufe, die sich nicht zuzieht und auch unter Last wieder lösen lässt.",useEn:"The “king of knots”: a fixed loop that does not slip or jam and can be untied after loading.",img:"./pic/knot-bowline.svg",src:"https://de.wikipedia.org/wiki/Palstek",stepsDe:["Am Ende der Leine eine kleine Schlaufe legen (Arbeitsende liegt oben) – das ist das „Kaninchenloch“.","Das Arbeitsende von unten durch die Schlaufe stecken („das Kaninchen kommt aus dem Loch“).","Das Arbeitsende hinter dem stehenden Part (dem „Baum“) herumführen.","Das Arbeitsende wieder in die Schlaufe zurückstecken („zurück ins Loch“).","Knoten festziehen, indem du am stehenden Part und an der großen Schlaufe ziehst. Das Ende soll mindestens eine Handbreit überstehen."],stepsEn:["Make a small loop near the end of the line, working end on top – this is the “rabbit hole”.","Pass the working end up through the loop (“the rabbit comes out of the hole”).","Take the working end behind the standing part (“around the tree”).","Pass the working end back down into the loop (“back into the hole”).","Tighten by pulling the standing part and the large loop. Leave a tail of at least a hand’s width."],tipDe:"Mit einem Sicherungs-Halbschlag am Ende sichern, wenn die Last wechselt.",tipEn:"Add a stopper half hitch on the tail if the load varies."},
{id:"eight",de:"Achtknoten",en:"Figure-eight knot (stopper)",useDe:"Stopperknoten am Leinenende, damit die Leine nicht durch einen Block, eine Klampe oder ein Auge ausrauscht.",useEn:"Stopper knot at the end of a line so it cannot run out through a block, fairlead or eye.",img:"./pic/knot-eight.svg",src:"https://de.wikipedia.org/wiki/Achtknoten",stepsDe:["Mit dem Arbeitsende eine Schlaufe (Bucht) legen.","Das Arbeitsende um den stehenden Part herumführen.","Danach das Arbeitsende wieder nach vorn über die Schlaufe führen, sodass eine „8“ entsteht.","Arbeitsende von oben durch die erste Schlaufe stecken.","Fest anziehen – der Knoten sieht aus wie eine Acht."],stepsEn:["Make a loop (bight) with the working end.","Take the working end around the standing part.","Bring the working end back over the loop so that a figure “8” forms.","Pass the working end down through the first loop.","Tighten; the finished knot looks like the number eight."],tipDe:"Lässt sich auch nach starker Belastung noch gut lösen.",tipEn:"Remains easy to untie after heavy loading."},
{id:"clove",de:"Webeleinenstek",en:"Clove hitch",useDe:"Schnelles Festmachen an Pfahl, Reling oder Stange. Gut verstell- und lösbar, kann sich bei wechselnder Last aber lockern.",useEn:"Quick attachment to a post, rail or spar. Easy to adjust and release but may loosen under changing load.",img:"./pic/knot-clove.svg",src:"https://de.wikipedia.org/wiki/Webeleinenstek",stepsDe:["Leine einmal um den Pfahl legen.","Die Leine über den stehenden Part kreuzen und ein zweites Mal um den Pfahl führen.","Das Arbeitsende unter der zweiten Windung (der Kreuzung) hindurchstecken.","Beide Windungen sauber nebeneinander legen und festziehen.","Bei Bedarf mit einem halben Schlag sichern."],stepsEn:["Pass the line once around the post.","Cross over the standing part and take a second turn around the post.","Tuck the working end under the second turn (under the crossing).","Lay both turns neatly side by side and tighten.","Secure with a half hitch if needed."],tipDe:"Nicht als dauerhafte Festmachung ohne Sicherung verwenden.",tipEn:"Do not rely on it unsecured for permanent mooring."},
{id:"sheet",de:"Schotstek",en:"Sheet bend",useDe:"Verbindet zwei Leinen, auch unterschiedlicher Stärke, z. B. eine Leine an eine Schot. Der Doppelte Schotstek hält noch besser.",useEn:"Joins two lines, even of different thickness. The double sheet bend holds even better.",img:"./pic/knot-sheet.svg",src:"https://de.wikipedia.org/wiki/Schotstek",stepsDe:["Mit der dickeren Leine eine Bucht (Schlaufe) bilden und in der Hand halten.","Das Ende der zweiten Leine von unten durch die Bucht stecken.","Mit dem zweiten Ende hinter beiden Strängen der Bucht herumführen.","Das Ende unter die eigene Leine (unter sich selbst) stecken – nicht durch die Bucht zurück.","Festziehen: Beide freien Enden sollen auf derselben Seite liegen."],stepsEn:["Form a bight in the thicker line and hold it.","Pass the end of the second line up through the bight.","Take it around behind both parts of the bight.","Tuck the end under its own part (not back through the bight).","Tighten; both free ends should lie on the same side."],tipDe:"Liegen die Enden auf entgegengesetzten Seiten, ist es ein falscher (schwacher) Knoten.",tipEn:"If the ends lie on opposite sides it is a weak “left-handed” version."},
{id:"reef",de:"Kreuzknoten",en:"Reef knot (square knot)",useDe:"Verbindet zwei gleich dicke Leinen, z. B. beim Reffen oder Zusammenbinden von Segel und Persenning.",useEn:"Joins two lines of equal thickness, e.g. when reefing or tying up a sail or cover.",img:"./pic/knot-reef.svg",src:"https://de.wikipedia.org/wiki/Kreuzknoten",stepsDe:["Rechtes Ende über das linke legen und einmal umeinander schlingen.","Jetzt das linke Ende (das nun rechts liegt) über das rechte legen.","Wieder einmal umeinander schlingen.","Beide Enden liegen nun auf derselben Seite – der Knoten ist symmetrisch.","Festziehen. Ein Altweiberknoten (Enden gekreuzt) rutscht und ist unsicher."],stepsEn:["Pass the right end over the left and wrap once.","Now place the end that is on the right over the other end.","Wrap once more.","Both ends lie on the same side; the knot is symmetrical.","Tighten. A granny knot (crossed ends) slips and is unsafe."],tipDe:"Nicht zum Verbinden tragender Leinen verwenden, er kann sich unter Last lösen.",tipEn:"Do not use for load-bearing joins; it can capsize under load."},
{id:"roundturn",de:"Rundtörn mit zwei halben Schlägen",en:"Round turn and two half hitches",useDe:"Der Standardknoten zum Festmachen an Ring, Poller oder Rahe. Trägt auch unter starker Last und lässt sich gut lösen.",useEn:"The standard knot for making fast to a ring, bollard or spar. Holds under heavy load and is easy to release.",img:"./pic/knot-roundturn.svg",src:"https://de.wikipedia.org/wiki/Rundt%C3%B6rn_mit_zwei_halben_Schl%C3%A4gen",stepsDe:["Die Leine zweimal rund um den Pfahl oder durch den Ring legen (Rundtörn).","Das Arbeitsende um den stehenden Part herumführen und durch die entstehende Schlaufe stecken – erster halber Schlag.","Einen zweiten halben Schlag in gleicher Richtung darüber legen.","Beide Schläge dicht an den Rundtörn schieben.","Festziehen."],stepsEn:["Take two full turns around the post or through the ring (round turn).","Pass the working end around the standing part and through the loop – first half hitch.","Add a second half hitch in the same direction.","Slide both hitches snug against the round turn.","Tighten."],tipDe:"Durch Aufstoppen (Ende an den stehenden Part binden) zusätzlich sichern.",tipEn:"Secure further by seizing the tail to the standing part."},
{id:"rolling",de:"Stopperstek",en:"Rolling hitch",useDe:"Hält auch in Längsrichtung einer Stange oder einer anderen Leine, z. B. zum Entlasten einer Leine oder Befestigen an einer Leine unter Zug.",useEn:"Grips along a spar or another line, e.g. to take the strain off a line or to attach to a loaded line.",img:"./pic/knot-rolling.svg",src:"https://de.wikipedia.org/wiki/Stopperstek",stepsDe:["Das Arbeitsende einmal in Zugrichtung um die Stange bzw. Leine legen.","Eine zweite Windung dicht daneben in dieselbe Richtung legen.","Das Arbeitsende auf die Gegenseite über beide Windungen führen und einmal herumlegen.","Das Ende unter dem letzten Törn durchstecken (halber Schlag).","Festziehen und in Zugrichtung belasten."],stepsEn:["Take one turn around the spar or line in the direction of pull.","Add a second turn right beside it in the same direction.","Take the working end across both turns to the other side and around once.","Tuck it under the last turn (half hitch).","Tighten and load in the direction of pull."],tipDe:"Zug immer auf die zwei Windungen der Zugseite, sonst rutscht der Knoten.",tipEn:"The load must come on the side of the two turns, otherwise it slips."},
{id:"anchor",de:"Ankerstek",en:"Anchor bend (fisherman’s bend)",useDe:"Befestigt die Ankerleine am Anker oder Festmacher an einem Ring. Hält sehr sicher und löst sich nicht durch Ruckbelastung.",useEn:"Attaches the anchor line to the anchor or a mooring ring. Very secure and does not shake loose under snatch loads.",img:"./pic/knot-anchor.svg",src:"https://de.wikipedia.org/wiki/Ankerstek",stepsDe:["Die Leine zweimal durch den Ring bzw. um den Ankerbügel führen (Rundtörn).","Das Arbeitsende hinter dem stehenden Part herumführen und unter beiden Törns durchstecken (erster halber Schlag).","Einen zweiten halben Schlag darüber legen.","Optional das Ende mit Takelgarn auf den stehenden Part aufstoppen.","Festziehen."],stepsEn:["Pass the line twice through the ring or around the anchor shackle (round turn).","Take the working end behind the standing part and tuck it under both turns (first half hitch).","Add a second half hitch over it.","Optionally seize the tail to the standing part with twine.","Tighten."],tipDe:"Ankerleine regelmäßig auf Scheuerstellen am Knoten kontrollieren.",tipEn:"Check the anchor line regularly for chafe at the knot."}
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

const LIGHT_SVG=["power","towing","sailing","fishing","nuc","ram","draft","pilot","anchor","aground"];
const SC_ANIM={13:"overtaking",14:"headon",15:"crossing",19:"fog"};
const LOCAL_PIC_MAP = {
  north:'./pic/N-Tonne.svg', east:'./pic/E-Tonne.svg', south:'./pic/S-Tonne.svg', west:'./pic/W-Tonne.svg', starboard:'./pic/Steuerbord-Tonne.svg', port:'./pic/Backbord-Tonne.svg',
  portToPort:'./pic/port-to-port.svg', overtaking:'./pic/overtaking.svg', crossing:'./pic/crossing.svg',
  giveway:'./pic/give-way.svg', standon:'./pic/stand-on.svg', restricted:'./pic/restricted-visibility.svg',
  power:'./pic/power-driven-vessel.svg', towing:'./pic/towing-vessel.svg', sailing:'./pic/sailing-vessel.svg',
  fishing:'./pic/fishing-vessel.svg', ncu:'./pic/not-under-command.svg', nuc:'./pic/not-under-command.svg', ram:'./pic/restricted-manoeuvre.svg', rams:'./pic/restricted-manoeuvre.svg',
  cbd:'./pic/constrained-by-draught.svg', pilot:'./pic/pilot-vessel.svg', anchor:'./pic/at-anchor.svg', aground:'./pic/aground.svg'
};
function localPicFor(item){ if(item.localPic) return item.localPic; if(LOCAL_PIC_MAP[item.id]) return LOCAL_PIC_MAP[item.id]; if(item.rule===14) return LOCAL_PIC_MAP.portToPort; if(item.rule===13) return LOCAL_PIC_MAP.overtaking; if(item.rule===15) return LOCAL_PIC_MAP.crossing; if(item.rule===19) return LOCAL_PIC_MAP.restricted; return null; }

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
        ${LIGHT_SVG.includes(light.id)?'<img class="navtool-media" src="./pic/light-'+light.id+'.svg" alt="" loading="lazy">':LIGHT_VISUALS[light.id] || `<img class="navtool-media" src="${localPicFor(light) || light.img || ''}" alt="${name(light)}" loading="lazy" onerror="this.outerHTML='<div class=\"media-placeholder\">IMAGE / BILD</div>'">`}
      </div>


      <div class="light-card-body">

        <h3>
          ${name(light)}
        </h3>

        <p>
          ${desc(light)}
        </p>
        ${light.day?`<div class="day-box"><img src="./pic/day-${light.day}.svg" alt="" loading="lazy"><div><b>${state.lang==="de"?"Tageskennzeichen":"Day shapes"}</b><span>${state.lang==="de"?light.dayDe:light.dayEn}</span></div></div>`:""}


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

      <div class="navtool-media-wrap buoy-photo">
        <img class="navtool-media" src="${localPicFor(buoy) || buoy.img || ''}" alt="${name(buoy)}" loading="lazy" onerror="this.onerror=null;this.src='${buoy.img || ''}';">
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



/* NAVTOOL · Situationsgrafiken (je Situation 3 Beispiele) */
const SC_EX={
15:[{o:[100,132,0],t:[168,74,270],a:'M100 116C100 98 118 94 134 80',c:['Schiff von Steuerbord: du bist ausweichpflichtig. Früh nach Steuerbord drehen und hinter dem anderen passieren.','Vessel on your starboard side: you give way. Alter to starboard early and pass astern.']},
 {o:[100,132,0],t:[32,74,90],a:'M100 116V70',s:1,c:['Schiff von Backbord: du bist Kurshalter. Kurs und Fahrt beibehalten (Regel 17), aufmerksam bleiben.','Vessel on your port side: you stand on. Keep course and speed (Rule 17) and keep watching.']},
 {o:[100,132,0],t:[150,90,270],a:'M100 116V100',x:'<path d="M92 96h16M92 90h16" stroke="#ff7070" stroke-width="3"/>',c:['Wird es eng: Fahrt verringern oder stoppen. Nie vor dem Schiff von Steuerbord kreuzen.','If it gets tight: reduce speed or stop. Never cross ahead of the vessel on your starboard side.']}],
13:[{o:[100,138,0],t:[100,70,0],a:'M100 122C100 108 70 100 68 70C68 52 90 44 100 30',c:['Du überholst: du hältst dich frei, bis du klar vorbei bist. Genug Abstand, nicht dicht aufschließen.','You overtake: keep clear until finally past and clear. Leave plenty of room.']},
 {o:[100,70,0],t:[100,138,0],a:'M100 54V20',s:1,c:['Du wirst überholt: Kurs und Fahrt beibehalten. Der Überholer muss ausweichen.','You are being overtaken: keep course and speed. The overtaking vessel keeps clear.']},
 {o:[100,138,0],t:[100,80,0],a:'M100 122C100 104 132 96 134 72',x:'<path d="M88 126c-6-4-6-10 0-14M82 130c-10-6-10-18 0-24" fill="none" stroke="#67dfff" stroke-width="1.6"/>',c:['Nicht sicher? Schallsignal geben (zwei lang, ein kurz = rechts überholen), Abstand halten.','Unsure? Sound the signal (two prolonged, one short = overtake on starboard) and keep your distance.']}],
14:[{o:[100,132,0],t:[100,28,180],a:'M100 116C100 98 122 90 134 70',c:['Gegenkurs: beide weichen nach Steuerbord aus und passieren Backbord an Backbord.','Head-on: both alter to starboard and pass port to port.']},
 {o:[100,132,0],t:[116,28,180],a:'M100 116C100 98 116 92 124 76',c:['Auch bei leichtem Versatz: früh und deutlich nach Steuerbord, nicht abwarten.','Even with a slight offset: alter to starboard early and clearly. Do not wait.']},
 {o:[100,132,0],t:[100,36,180],a:'M100 116C100 98 122 90 134 70',x:'<circle cx="96" cy="54" r="3.2" fill="#ff5050"/><circle cx="104" cy="54" r="3.2" fill="#3fdc7e"/><circle cx="100" cy="46" r="2.6" fill="#fff"/>',c:['Nachts: beide Seitenlichter und Topplicht voraus gesehen = Gegenkurs. Früh nach Steuerbord.','At night: both sidelights and masthead light ahead means head-on. Alter to starboard early.']}],
19:[{o:[100,132,0],t:[100,48,0],a:'M100 116V96',x:'<circle cx="100" cy="70" r="60" fill="#8aa6a3" opacity=".18"/><path d="M92 100h16M92 94h16" stroke="#ff7070" stroke-width="3"/>',c:['Nebel: sichere Geschwindigkeit, Maschine bereit. Radar nutzen und Fahrt verringern, wenn ein Schiff voraus auftaucht.','Fog: safe speed, engines ready. Use radar and reduce speed when a vessel appears ahead.']},
 {o:[100,100,0],t:[60,96,0],a:'M100 84V50',x:'<circle cx="100" cy="100" r="70" fill="#8aa6a3" opacity=".16"/><path d="M92 78l-12 6" stroke="#ff7070" stroke-width="3"/>',c:['Schiff querab oder achterlicher: keine Kursänderung nach Backbord gegen ein Schiff vorlicher als querab.','Vessel abeam or abaft: do not alter to port for a vessel forward of the beam.']},
 {o:[100,120,0],t:[100,40,0],a:'M100 104V86',x:'<circle cx="100" cy="86" r="52" fill="#8aa6a3" opacity=".2"/><path d="M86 100c-8-6-8-16 0-22M78 106c-12-8-12-26 0-34" fill="none" stroke="#67dfff" stroke-width="1.6"/>',c:['Nebelsignal geben: Maschinenfahrzeug in Fahrt = ein lang alle zwei Minuten. Wachen verstärken.','Sound the fog signal: power-driven vessel underway = one prolonged blast every 2 minutes. Add lookouts.']}]};
function ntShip(x,y,h,col){return `<g transform="translate(${x} ${y}) rotate(${h})"><path d="M0-15L8 11 0 6-8 11Z" fill="${col}" stroke="#05090c" stroke-width="1.2"/></g>`}
function ntSceneSVG(ex){return `<svg class="nt-sc" viewBox="0 0 200 160" role="img"><defs><marker id="ntah" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4 0 8z" fill="#67dfff"/></marker></defs><rect width="200" height="160" rx="12" fill="#06121a"/>${ex.x||''}<path d="${ex.s?'M0 0':ex.a}" fill="none" stroke="#67dfff" stroke-width="2.6" stroke-dasharray="${ex.s?0:'1 0'}" marker-end="url(#ntah)"/>${ex.s?`<path d="${ex.a}" fill="none" stroke="#3fdc7e" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#ntah)"/>`:''}${ntShip(ex.t[0],ex.t[1],ex.t[2],'#ffd166')}${ntShip(ex.o[0],ex.o[1],ex.o[2],'#55e5d1')}</svg>`}
function ntExamples(sc){const L=state.lang==="de"?0:1,ex=SC_EX[sc.id];if(!ex)return"";return `<div class="nt-ex"><h3>${L?"3 EXAMPLES":"3 BEISPIELE"}</h3><div class="nt-ex-grid">${ex.map((e,i)=>`<figure>${ntSceneSVG(e)}<figcaption><b>${i+1}</b> ${e.c[L]}</figcaption></figure>`).join("")}</div><p class="nt-leg"><span style="color:#55e5d1">▲</span> ${L?"you":"du"} · <span style="color:#ffd166">▲</span> ${L?"other vessel":"anderes Fahrzeug"} · <span style="color:#67dfff">→</span> ${L?"your manoeuvre":"dein Manöver"}</p></div>`}
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


        <div class="nt-card-sc">${SC_EX[scenario.id]?ntSceneSVG(SC_EX[scenario.id][0]):""}</div>


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


      ${SC_ANIM[scenario.id]?`<img class="scn-anim" src="./pic/anim-${SC_ANIM[scenario.id]}.svg" alt="${name(scenario)}">`:""}


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


      ${ntExamples(scenario)}<ol class="step-list">
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

        <h3>${knot.de}<small class="en-name">${knot.en}</small></h3>


        <p>
          ${
            state.lang === "de"
              ? knot.useDe
              : knot.useEn
          }
        </p>


        <div class="source-mini">

          <span>
            ${state.lang==="de"?"ANLEITUNG":"HOW TO TIE"}
          </span>

          <span>
            ${state.lang==="de"?"ÖFFNEN →":"OPEN →"}
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

  if(!item.img){ const lp=localPicFor(item); if(lp) item={...item,img:lp}; }

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
      ${item.day?`<div class="day-box"><img src="./pic/day-${item.day}.svg" alt="" loading="lazy"><div><b>${state.lang==="de"?"Tageskennzeichen":"Day shapes"}</b><span>${state.lang==="de"?item.dayDe:item.dayEn}</span></div></div>`:""}


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

        <h2>${knot.de}<small class="en-name">${knot.en}</small></h2>

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


      <h3>${state.lang==="de"?"VERWENDUNG":"USE"}</h3>
      <p>${state.lang==="de"?knot.useDe:knot.useEn}</p>

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
      <p class="knot-tip"><b>${state.lang==="de"?"Tipp":"Tip"}:</b> ${state.lang==="de"?knot.tipDe:knot.tipEn}</p>


      <a
        class="modal-source"
        href="${knot.src}"
        target="_blank"
        rel="noopener"
      >

        ${
          state.lang === "de"
            ? "MEHR ZUM KNOTEN ↗"
            : "MORE ABOUT THIS KNOT ↗"
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
