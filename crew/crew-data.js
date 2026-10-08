(function(){
const KEY="NAVTOOL_CREW_DATA_V1";
const defaults={members:[
 {id:"ce-001",firstName:"Max",lastName:"Mustermann",rank:"Chief Officer",room:"B-12",permissions:["Bridge","Safety","Maneuvering"],arrival:"2026-10-01",departure:"2026-11-15",phone:"",notes:"",username:"max",password:"NavTool1!"},
 {id:"ce-002",firstName:"Anna",lastName:"Beispiel",rank:"2nd Engineer",room:"C-07",permissions:["Engine Room","Maintenance"],arrival:"2026-10-03",departure:"2026-12-01",phone:"",notes:"",username:"anna",password:"NavTool1!"}
],tasks:[],events:[]};
window.NAVTOOL_CREW_STORE={
 load(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(defaults)}catch(e){return structuredClone(defaults)}},
 save(v){localStorage.setItem(KEY,JSON.stringify(v));window.dispatchEvent(new CustomEvent("navtool-crew-updated"));},
 defaults
};
})();
