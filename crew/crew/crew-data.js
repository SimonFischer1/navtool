/* NavTool Crew data store — JavaScript only, no PHP/API connection.
   GitHub Pages is static: data is saved in this browser's localStorage only.
   For shared multi-device data, a hosted backend is required. */
(function(){
  const KEY = "NAVTOOL_CREW_DATA_V1";
  const defaults = {
    members: [
      {id:"ce-001",firstName:"Max",lastName:"Mustermann",rank:"Chief Officer",room:"B-12",permissions:["Bridge","Safety","Maneuvering"],arrival:"2026-10-01",departure:"2026-11-15",phone:"",notes:"",username:"max",password:"NavTool1!"},
      {id:"ce-002",firstName:"Anna",lastName:"Beispiel",rank:"2nd Engineer",room:"C-07",permissions:["Engine Room","Maintenance"],arrival:"2026-10-03",departure:"2026-12-01",phone:"",notes:"",username:"anna",password:"NavTool1!"}
    ],
    tasks: [], events: [], jobs: [], movements: [], bridgeLogs: [],
    settings: {shipName:"CUNO ESSBERGER", voyageNumber:""}
  };
  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function normalize(value){
    const base = clone(defaults);
    if (!value || typeof value !== "object") return base;
    return Object.assign(base, value, {
      members: Array.isArray(value.members) ? value.members : base.members,
      tasks: Array.isArray(value.tasks) ? value.tasks : [],
      events: Array.isArray(value.events) ? value.events : [],
      jobs: Array.isArray(value.jobs) ? value.jobs : [],
      movements: Array.isArray(value.movements) ? value.movements : [],
      bridgeLogs: Array.isArray(value.bridgeLogs) ? value.bridgeLogs : [],
      settings: Object.assign({}, base.settings, value.settings || {})
    });
  }
  function load(){
    try { return normalize(JSON.parse(localStorage.getItem(KEY) || "null")); }
    catch(error){ console.warn("Crew-Daten konnten nicht gelesen werden.", error); return clone(defaults); }
  }
  function save(value){
    const data = normalize(value);
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("navtool-crew-updated"));
      return true;
    } catch(error){
      console.error("Crew-Daten konnten nicht gespeichert werden.", error);
      alert("Speichern fehlgeschlagen. Prüfe den verfügbaren Browser-Speicher.");
      return false;
    }
  }
  async function refresh(){ return load(); }
  window.NAVTOOL_CREW_STORE = { load, save, refresh, defaults, configureOnline(){}, onlineConfigured(){ return false; } };
})();
