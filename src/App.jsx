import { useState, useEffect } from "react";

const FONT = "'Century Gothic', CenturyGothic, AppleGothic, sans-serif";

const THEMES = {
  vintage: {
    bg:"#FDFCFA", bgSec:"#F7F3EC", bgTert:"#F0EAE0", bgCard:"#FFFFFF", bgInput:"#FFFFFF",
    text:"#2D1C06", textSec:"#7A6030", textMuted:"#A08840", textDis:"#D4C090",
    accent:"#B07D2E", accentBg:"#FBF3E2",
    border:"rgba(160,130,60,0.20)", borderLight:"rgba(160,130,60,0.10)",
    dot:"#B07D2E",
    totalBg:"#F5EDD8", totalBorder:"#B07D2E", totalText:"#2D1C06",
    btnBg:"#B07D2E", btnText:"#FFFFFF",
    tabActive:"#B07D2E", deleteText:"#8B2020",
    shadow:"rgba(160,130,60,0.13)", useShadow:true,
  },
  cyberpunk: {
    bg:"#0A1210", bgSec:"#0F1A18", bgTert:"#141F1D", bgCard:"#0C1614", bgInput:"#0F1A18",
    text:"#A8CCBA", textSec:"#85C4B0", textMuted:"#5E9682", textDis:"#2E4A3C",
    accent:"#C8B840", accentBg:"#1A180A",
    border:"rgba(179,222,193,0.12)", borderLight:"rgba(179,222,193,0.07)",
    dot:"#A8CCBA",
    totalBg:"#0F1A18", totalBorder:"#C8B840", totalText:"#C8B840",
    btnBg:"#C8B840", btnText:"#111118",
    tabActive:"#A8CCBA", deleteText:"#A8CCBA",
    shadow:"rgba(200,184,64,0.10)", useShadow:false,
  }
};

const RANGO = {
  diseño:{min:0.20,max:0.50}, pe:{min:0.10,max:0.35}, recepcion:{min:0.30,max:0.50},
  levantamiento:{min:0.05,max:0.20}, interior:{min:0.20,max:0.50},
};
const DESGLOSE = {
  diseño:["Visita a terreno","Anteproyecto","Proyecto definitivo","Especificaciones técnicas","Gestión con mandante"],
  pe:["Visita a terreno","Elaboración de carpeta DOM","Tramitación municipal","Seguimiento de expediente","Certificados y documentos requeridos"],
  recepcion:["Visita final a obra","Elaboración de carpeta de recepción","Tramitación ante la DOM","Gestión de certificados finales"],
  levantamiento:["Visita a terreno","Medición en obra","Dibujo de planos existentes"],
  interior:["Visita y toma de requerimientos","Concept board / moodboard","Planos de distribución","Especificaciones de materiales y mobiliario","Renders o vistas 3D"],
};
const SERVICIOS = [
  {key:"diseño",   label:"Diseño de arquitectura",  deriv:false, rate:"0.30"},
  {key:"pe",       label:"Permiso de edificación",  deriv:false, rate:"0.20"},
  {key:"recepcion",label:"Recepción definitiva",    deriv:true,  rate:"0.40"},
  {key:"levantamiento",label:"Levantamiento de planos",deriv:true, rate:"0.10"},
  {key:"interior", label:"Diseño de interiores",    deriv:false, rate:"0.30"},
];
const DEF_PRODUCTOS = [
  {key:"rint_simple", label:"Render interior simple",           clp:"40000"},
  {key:"rint_pro",    label:"Render interior Pro",              clp:"64000"},
  {key:"rext",        label:"Render exterior",                  clp:"240000"},
  {key:"rext_com",    label:"Render exterior comercial",        clp:"480000"},
  {key:"video10",     label:"Video 10 seg",                     clp:"160000"},
  {key:"video30",     label:"Video 30 seg",                     clp:"384000"},
  {key:"planta3d",    label:"Planta 3D",                        clp:"64000"},
  {key:"aereo",       label:"Render aéreo / masterplan",        clp:"480000"},
  {key:"panoramico",  label:"Render panorámico",                clp:"160000"},
  {key:"hd_impresion",label:"Render HD impresión gran formato", clp:"160000"},
];
const DEF_BUNDLES = [
  {key:"b1",label:"Promo 3 renders simples", items:[{productKey:"rint_simple",qty:3}],margin:20},
  {key:"b2",label:"Promo 3 renders Pro",     items:[{productKey:"rint_pro",qty:3}],margin:15},
  {key:"b3",label:"Pack inmobiliario básico",items:[{productKey:"rint_simple",qty:5},{productKey:"rext",qty:1},{productKey:"planta3d",qty:1}],margin:20},
  {key:"b4",label:"Pack inmobiliario Plus",  items:[{productKey:"rint_simple",qty:5},{productKey:"rext",qty:2},{productKey:"video10",qty:1}],margin:10},
  {key:"b5",label:"Pack comercial básico",   items:[{productKey:"rint_simple",qty:4},{productKey:"rext",qty:2},{productKey:"planta3d",qty:1},{productKey:"video10",qty:1}],margin:20},
];

function ls(k,fb){try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch{return fb;}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}
function fmt(n){return n.toLocaleString("es-CL",{minimumFractionDigits:1,maximumFractionDigits:1});}
function fmtC(n){return Math.round(n).toLocaleString("es-CL");}
function bBase(b,prods){return b.items.reduce((s,it)=>{const p=prods.find(p=>p.key===it.productKey);return s+(p?(parseInt(p.clp)||0)*it.qty:0);},0);}
function bFinal(b,prods){return Math.round(bBase(b,prods)*(1-(b.margin||0)/100));}
let uid=1;


export default function App() {
  const [theme,setTheme]=useState(()=>ls("th","vintage"));
  const T=THEMES[theme];
  const isShadow=T.useShadow;
  const COL="26px 1fr 130px 100px 110px";

  // Shadow vs neon border helpers
  const outerShadow = isShadow
    ? "0 2px 20px rgba(160,130,60,0.12), 0 1px 5px rgba(160,130,60,0.08)"
    : `0 0 0 1px ${T.border}, 0 0 20px ${T.shadow}, 0 0 50px ${T.shadow}`;
  const inpBorder = isShadow ? "none" : `1px solid ${T.border}`;
  const inpShadow = isShadow ? "0 1px 4px rgba(160,130,60,0.12), inset 0 0 0 1px rgba(160,130,60,0.18)" : `0 0 0 1px ${T.borderLight}`;
  const rowSep = isShadow ? "none" : `1px solid ${T.borderLight}`;

  const [m2,setM2]=useState("");
  const [ufv,setUfv]=useState("");
  const [rates,setRates]=useState(()=>Object.fromEntries(SERVICIOS.map(s=>[s.key,s.rate])));
  const [sel,setSel]=useState(()=>Object.fromEntries([...SERVICIOS.map(s=>[s.key,true]),["mob",true],["ren",true]]));
  const [exp,setExp]=useState(()=>Object.fromEntries([...SERVICIOS.map(s=>[s.key,false]),["mob",false],["ren",false]]));
  const [ufv2,setUfv2]=useState("0.05");
  const [muebles,setMuebles]=useState([{id:uid++,nombre:"",vistas:""}]);
  const [rtab,setRtab]=useState("productos");
  const [cant,setCant]=useState(()=>Object.fromEntries(DEF_PRODUCTOS.map(p=>[p.key,0])));
  const [selB,setSelB]=useState({});
  const [prods,setProds]=useState(()=>ls("prods3",DEF_PRODUCTOS));
  const [bunds,setBunds]=useState(()=>ls("bunds3",DEF_BUNDLES));
  const [editK,setEditK]=useState(null);
  const [draft,setDraft]=useState(null);

  useEffect(()=>sv("th",theme),[theme]);
  useEffect(()=>sv("prods3",prods),[prods]);
  useEffect(()=>sv("bunds3",bunds),[bunds]);

  const ufNum=parseFloat(ufv)||0;
  const peUF=(parseFloat(rates["pe"])||0)*(parseFloat(m2)||0);
  function calcUF(s){return s.deriv?(parseFloat(rates[s.key])||0)*peUF:(parseFloat(rates[s.key])||0)*(parseFloat(m2)||0);}
  function updProd(k,f,v){setProds(ps=>ps.map(p=>p.key===k?{...p,[f]:v}:p));}
  function addMueble(){setMuebles(ms=>[...ms,{id:uid++,nombre:"",vistas:""}]);}
  function delMueble(id){setMuebles(ms=>ms.filter(m=>m.id!==id));}
  function updMueble(id,f,v){setMuebles(ms=>ms.map(m=>m.id===id?{...m,[f]:v}:m));}
  function setCantP(k,v){setCant(c=>({...c,[k]:Math.max(0,parseInt(v)||0)}));}
  function startEdit(b){setDraft(JSON.parse(JSON.stringify(b)));setEditK(b.key);}
  function startNew(){const nb={key:"b"+Date.now(),label:"Nuevo pack",items:[],margin:0};setDraft(nb);setEditK(nb.key);}
  function saveDraft(){if(!draft)return;setBunds(bs=>{const ex=bs.find(b=>b.key===draft.key);return ex?bs.map(b=>b.key===draft.key?draft:b):[...bs,draft];});setEditK(null);setDraft(null);}
  function cancelEdit(){setEditK(null);setDraft(null);}
  function delBundle(k){setBunds(bs=>bs.filter(b=>b.key!==k));setSelB(sb=>{const c={...sb};delete c[k];return c;});}
  function draftQty(pk){return draft?.items.find(it=>it.productKey===pk)?.qty||0;}
  function draftSetQty(pk,q){setDraft(d=>{const items=d.items.filter(it=>it.productKey!==pk);if(q>0)items.push({productKey:pk,qty:q});return{...d,items};});}

  const totProdCLP=prods.reduce((s,p)=>s+(cant[p.key]||0)*(parseInt(p.clp)||0),0);
  const totBundCLP=bunds.filter(b=>selB[b.key]).reduce((s,b)=>s+bFinal(b,prods),0);
  const totRenCLP=totProdCLP+totBundCLP;
  const totRenUF=ufNum>0?totRenCLP/ufNum:0;
  const totMobUF=muebles.reduce((s,m)=>s+(parseFloat(m.vistas)||0)*(parseFloat(ufv2)||0),0);
  const totUF=SERVICIOS.filter(s=>sel[s.key]).reduce((s,sv)=>s+calcUF(sv),0)+(sel.mob?totMobUF:0)+(sel.ren?totRenUF:0);

  // Shared style objects
  const I={border:inpBorder,boxShadow:inpShadow,background:T.bgInput,color:T.text,outline:"none",fontFamily:FONT};
  const inp={...I,width:"100%",padding:"8px 10px",fontSize:14,borderRadius:7,boxSizing:"border-box"};
  const rInp={...I,width:65,padding:"5px 8px",fontSize:13,borderRadius:7,textAlign:"right"};
  const sInp={...I,padding:"6px 8px",fontSize:13,borderRadius:7};
  const pInp={...I,width:80,padding:"4px 6px",fontSize:13,borderRadius:6,textAlign:"right"};
  const spn={width:22,height:22,borderRadius:5,border:`1px solid ${T.border}`,background:T.bgSec,cursor:"pointer",fontSize:14,color:T.text,lineHeight:1,fontFamily:FONT};

  const onMob=sel.mob,opMob=exp.mob,onRen=sel.ren,opRen=exp.ren;

  function BundleEditor(){
    if(!draft)return null;
    const base=bBase(draft,prods),final=Math.round(base*(1-(draft.margin||0)/100));
    return(
      <div style={{background:T.bgSec,border:`1px solid ${T.accent}`,borderRadius:10,padding:"14px 16px",marginBottom:12,boxShadow:"none"}}>
        <div style={{fontSize:11,fontWeight:500,color:T.accent,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.06em",fontFamily:FONT}}>
          {bunds.find(b=>b.key===draft.key)?"Editando pack":"Nuevo pack"}
        </div>
        <input type="text" value={draft.label} onChange={e=>setDraft(d=>({...d,label:e.target.value}))} placeholder="Nombre del pack" style={{...sInp,width:"100%",marginBottom:10,fontWeight:500}}/>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.04em",fontFamily:FONT}}>Selecciona productos</div>
        <div style={{display:"grid",gap:6,marginBottom:12}}>
          {prods.map(p=>{
            const q=draftQty(p.key),sub=(parseInt(p.clp)||0)*q;
            return(
              <div key={p.key} style={{display:"grid",gridTemplateColumns:"1fr 90px 90px",gap:8,alignItems:"center",opacity:q>0?1:0.5}}>
                <div style={{fontSize:13,color:T.text,fontFamily:FONT}}>{p.label}</div>
                <div style={{display:"flex",alignItems:"center",gap:3}}>
                  <button onClick={()=>draftSetQty(p.key,Math.max(0,q-1))} style={spn}>−</button>
                  <span style={{fontSize:13,fontWeight:500,minWidth:18,textAlign:"center",color:T.text,fontFamily:FONT}}>{q}</span>
                  <button onClick={()=>draftSetQty(p.key,q+1)} style={spn}>+</button>
                </div>
                <div style={{textAlign:"right",fontSize:12,color:q>0?T.text:T.textDis,fontFamily:FONT}}>{q>0?"$"+fmtC(sub):"–"}</div>
              </div>
            );
          })}
        </div>
        <div style={{borderTop:`1px solid ${T.border}`,paddingTop:12,display:"grid",gap:8}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontFamily:FONT}}>
            <span style={{color:T.textSec}}>Precio base</span>
            <span style={{fontWeight:500,color:T.text}}>${fmtC(base)}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:13}}>
            <span style={{color:T.textSec,fontFamily:FONT}}>Margen de descuento</span>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <input type="number" min="0" max="100" value={draft.margin} onFocus={e=>e.target.select()} onChange={e=>setDraft(d=>({...d,margin:Math.min(100,Math.max(0,parseInt(e.target.value)||0))}))} style={{...rInp,width:50}}/>
              <span style={{fontSize:12,color:T.textMuted,fontFamily:FONT}}>%</span>
            </div>
          </div>
          {base-final>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textMuted,fontFamily:FONT}}><span>Descuento</span><span>−${fmtC(base-final)}</span></div>}
          <div style={{display:"flex",justifyContent:"space-between",fontSize:15,fontWeight:500,color:T.accent,borderTop:`1px solid ${T.border}`,paddingTop:8,fontFamily:FONT}}>
            <span>Precio final del pack</span><span>${fmtC(final)}</span>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <button onClick={saveDraft} style={{flex:1,padding:"9px 0",borderRadius:8,border:"none",background:T.btnBg,color:T.btnText,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:FONT}}>Listo</button>
          <button onClick={cancelEdit} style={{padding:"9px 16px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",color:T.textSec,fontSize:13,cursor:"pointer",fontFamily:FONT}}>Cancelar</button>
        </div>
      </div>
    );
  }

  return(
    <div style={{fontFamily:FONT,maxWidth:640,width:"100%",padding:"1.5rem 1rem",color:T.text,background:T.bg,margin:"0 auto",minHeight:"100vh",boxSizing:"border-box"}}>

      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:T.accent}}>Calculadora de honorarios</div>
          <div style={{fontSize:13,color:T.textMuted,marginTop:3}}>Selecciona servicios · ajusta tu tarifa · el rango es solo referencia</div>
        </div>
        <button onClick={()=>setTheme(t=>t==="vintage"?"cyberpunk":"vintage")} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${T.accent}`,background:"transparent",color:T.accent,fontSize:11,cursor:"pointer",fontFamily:FONT,boxShadow:"none"}}>
          {theme==="vintage"?"◑ Oscuro":"◑ Claro"}
        </button>
      </div>

      {/* Superficie y UF */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20,maxWidth:"100%",boxSizing:"border-box"}}>
        <div>
          <div style={{fontSize:12,color:T.textSec,marginBottom:5}}>Superficie (m²)</div>
          <input type="number" value={m2} placeholder="Indicar superficie" onChange={e=>setM2(e.target.value)} style={inp}/>
        </div>
        <div>
          <div style={{fontSize:12,color:T.textSec,marginBottom:5}}>Valor UF (CLP)</div>
          <input type="number" value={ufv} placeholder="Valor UF del día" onChange={e=>setUfv(e.target.value)} style={inp}/>
        </div>
      </div>

      {/* Tabla */}
      <div style={{overflowX:"auto",marginBottom:14,boxShadow:outerShadow,borderRadius:10}}><div style={{minWidth:520}}>

        {/* Header */}
        <div style={{display:"grid",gridTemplateColumns:COL,gap:8,padding:"8px 14px",background:T.bgTert,fontSize:11,color:T.textMuted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",alignItems:"center"}}>
          <div/><div style={{textAlign:"left"}}>Servicio(s)</div><div style={{textAlign:"center"}}>Tarifa</div><div style={{textAlign:"center"}}>UF</div><div style={{textAlign:"center"}}>CLP</div>
        </div>

        {/* Servicios */}
        {SERVICIOS.map((s,i)=>{
          const uf=calcUF(s),clp=uf*ufNum,rango=RANGO[s.key],on=sel[s.key],open=exp[s.key];
          return(
            <div key={s.key}>
              <div style={{display:"grid",gridTemplateColumns:COL,gap:8,padding:"12px 14px",alignItems:"center",borderTop:i===0?"none":rowSep,background:on?T.bgCard:T.bgSec,opacity:on?1:0.45,transition:"opacity 0.15s"}}>
                <input type="checkbox" checked={on} onChange={e=>setSel(sl=>({...sl,[s.key]:e.target.checked}))} style={{width:15,height:15,cursor:"pointer",accentColor:T.accent}}/>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:13,fontWeight:500,color:T.text}}>{s.label}</span>
                    <button onClick={()=>setExp(e=>({...e,[s.key]:!e[s.key]}))} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:T.textMuted,padding:"0 4px",lineHeight:1}}>
                      {open?"▲":"▼"}
                    </button>
                  </div>
                  <div style={{fontSize:11,color:T.textMuted,marginTop:2}}>
                    {s.deriv?`Rango ref: ${rango.min}–${rango.max} × P.E.`:`Rango ref: ${rango.min}–${rango.max} UF/m²`}
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                  <input type="text" inputMode="decimal" value={rates[s.key]} onFocus={e=>e.target.select()} onChange={e=>setRates(r=>({...r,[s.key]:e.target.value}))} style={{...rInp,opacity:on?1:0.5}} disabled={!on}/>
                  <span style={{fontSize:11,color:T.textMuted,whiteSpace:"nowrap",minWidth:36}}>{s.deriv?"× P.E.":"UF/m²"}</span>
                </div>
                <div style={{textAlign:"center",fontSize:14,fontWeight:500,color:on?T.text:T.textDis}}>{on?fmt(uf):"–"}</div>
                <div style={{textAlign:"center",fontSize:13,color:on?T.textSec:T.textDis}}>{on?"$"+fmtC(clp):"–"}</div>
              </div>
              {open&&(
                <div style={{padding:"8px 14px 12px 54px",background:T.bgSec,borderTop:`1px dashed ${T.borderLight}`}}>
                  <div style={{fontSize:11,color:T.textMuted,marginBottom:6,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.04em"}}>Incluye</div>
                  {DESGLOSE[s.key].map((item,idx)=>(
                    <div key={idx} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:T.dot,flexShrink:0}}/>
                      <span style={{fontSize:12,color:T.textSec}}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Mobiliario */}
        <div style={{borderTop:rowSep,background:onMob?T.bgCard:T.bgSec,opacity:onMob?1:0.45,transition:"opacity 0.15s"}}>
          <div style={{display:"grid",gridTemplateColumns:COL,gap:8,padding:"12px 14px",alignItems:"center"}}>
            <input type="checkbox" checked={onMob} onChange={e=>setSel(sl=>({...sl,mob:e.target.checked}))} style={{width:15,height:15,cursor:"pointer",accentColor:T.accent}}/>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:13,fontWeight:500,color:T.text}}>Diseño de mobiliario personalizado</span>
                <button onClick={()=>setExp(e=>({...e,mob:!e.mob}))} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:T.textMuted,padding:"0 4px",lineHeight:1}}>{opMob?"▲":"▼"}</button>
              </div>
              <div style={{fontSize:11,color:T.textMuted,marginTop:2}}>Cobro por vista de plano</div>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              <input type="text" inputMode="decimal" value={ufv2} onFocus={e=>e.target.select()} onChange={e=>setUfv2(e.target.value)} style={{...rInp,opacity:onMob?1:0.5}} disabled={!onMob}/>
              <span style={{fontSize:11,color:T.textMuted,whiteSpace:"nowrap",minWidth:36}}>UF/vista</span>
            </div>
            <div style={{textAlign:"center",fontSize:14,fontWeight:500,color:onMob?T.text:T.textDis}}>{onMob?fmt(totMobUF):"–"}</div>
            <div style={{textAlign:"center",fontSize:13,color:onMob?T.textSec:T.textDis}}>{onMob?"$"+fmtC(totMobUF*ufNum):"–"}</div>
          </div>
          {opMob&&(
            <div style={{background:T.bgSec,borderTop:`1px dashed ${T.borderLight}`,padding:"12px 14px 12px 54px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 80px 80px 100px 24px",gap:8,fontSize:11,color:T.textMuted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8}}>
                <div>Mueble / conjunto</div><div style={{textAlign:"center"}}>Vistas</div><div style={{textAlign:"center"}}>UF</div><div style={{textAlign:"center"}}>CLP</div><div/>
              </div>
              {muebles.map((m,i)=>{
                const ufM=(parseFloat(m.vistas)||0)*(parseFloat(ufv2)||0);
                return(
                  <div key={m.id} style={{display:"grid",gridTemplateColumns:"1fr 80px 80px 100px 24px",gap:8,alignItems:"center",marginBottom:8}}>
                    <input type="text" value={m.nombre} placeholder={i===0?"ej: Cocina completa":"ej: Closet principal"} onChange={e=>updMueble(m.id,"nombre",e.target.value)} style={{...sInp,width:"100%"}}/>
                    <input type="number" value={m.vistas} placeholder="0" onChange={e=>updMueble(m.id,"vistas",e.target.value)} style={{...sInp,textAlign:"center",width:"100%"}}/>
                    <div style={{textAlign:"center",fontSize:13,fontWeight:500,color:T.text}}>{ufM>0?fmt(ufM):"–"}</div>
                    <div style={{textAlign:"center",fontSize:12,color:T.textSec}}>{ufM>0?"$"+fmtC(ufM*ufNum):"–"}</div>
                    <button onClick={()=>delMueble(m.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:15,color:T.textDis,padding:0,lineHeight:1}}>×</button>
                  </div>
                );
              })}
              <button onClick={addMueble} style={{background:"none",border:`1px dashed ${T.textMuted}`,borderRadius:7,padding:"5px 14px",fontSize:12,color:T.textMuted,cursor:"pointer",width:"100%",marginTop:4,fontFamily:FONT}}>
                + Agregar mueble o conjunto
              </button>
            </div>
          )}
        </div>

        {/* Renders */}
        <div style={{borderTop:rowSep,background:onRen?T.bgCard:T.bgSec,opacity:onRen?1:0.45,transition:"opacity 0.15s"}}>
          <div style={{display:"grid",gridTemplateColumns:COL,gap:8,padding:"12px 14px",alignItems:"center"}}>
            <input type="checkbox" checked={onRen} onChange={e=>setSel(sl=>({...sl,ren:e.target.checked}))} style={{width:15,height:15,cursor:"pointer",accentColor:T.accent}}/>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:13,fontWeight:500,color:T.text}}>Renders y animaciones</span>
                <button onClick={()=>setExp(e=>({...e,ren:!e.ren}))} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:T.textMuted,padding:"0 4px",lineHeight:1}}>{opRen?"▲":"▼"}</button>
              </div>
              <div style={{fontSize:11,color:T.textMuted,marginTop:2}}>Precio fijo por producto · guardado por dispositivo</div>
            </div>
            <div style={{textAlign:"center",fontSize:12,color:T.textMuted}}>–</div>
            <div style={{textAlign:"center",fontSize:14,fontWeight:500,color:onRen&&totRenUF>0?T.text:T.textDis}}>{onRen&&totRenUF>0?fmt(totRenUF):"–"}</div>
            <div style={{textAlign:"center",fontSize:13,color:onRen&&totRenCLP>0?T.textSec:T.textDis}}>{onRen&&totRenCLP>0?"$"+fmtC(totRenCLP):"–"}</div>
          </div>
          {opRen&&(
            <div style={{background:T.bgSec,borderTop:`1px dashed ${T.borderLight}`}}>
              <div style={{display:"flex",borderBottom:`1px solid ${T.borderLight}`}}>
                {["productos","bundles"].map(tab=>(
                  <button key={tab} onClick={()=>setRtab(tab)} style={{flex:1,padding:"8px 0",fontSize:12,fontWeight:rtab===tab?500:400,color:rtab===tab?T.tabActive:T.textMuted,background:"none",border:"none",borderBottom:rtab===tab?`2px solid ${T.tabActive}`:"2px solid transparent",cursor:"pointer",fontFamily:FONT}}>
                    {tab==="productos"?"Productos individuales":"Bundles / packs"}
                  </button>
                ))}
              </div>

              {rtab==="productos"&&(
                <div style={{padding:"10px 14px 10px 54px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 90px 100px 100px",gap:8,fontSize:11,color:T.textMuted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8}}>
                    <div>Producto</div><div style={{textAlign:"center"}}>Cant.</div><div style={{textAlign:"right"}}>Precio unit.</div><div style={{textAlign:"center"}}>Total</div>
                  </div>
                  {prods.map(p=>{
                    const c=cant[p.key]||0,pr=parseInt(p.clp)||0;
                    return(
                      <div key={p.key} style={{display:"grid",gridTemplateColumns:"1fr 90px 100px 100px",gap:8,alignItems:"center",marginBottom:10,opacity:c>0?1:0.6}}>
                        <div style={{fontSize:13,color:T.text}}>{p.label}</div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:3}}>
                          <button onClick={()=>setCantP(p.key,c-1)} style={spn}>−</button>
                          <span style={{fontSize:13,fontWeight:500,minWidth:16,textAlign:"center",color:T.text}}>{c}</span>
                          <button onClick={()=>setCantP(p.key,c+1)} style={spn}>+</button>
                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:3}}>
                          <span style={{fontSize:11,color:T.textMuted}}>$</span>
                          <input type="number" value={p.clp} onFocus={e=>e.target.select()} onChange={e=>updProd(p.key,"clp",e.target.value)} style={pInp}/>
                        </div>
                        <div style={{textAlign:"center",fontSize:13,fontWeight:500,color:c>0?T.text:T.textDis}}>{c>0?"$"+fmtC(c*pr):"–"}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {rtab==="bundles"&&(
                <div style={{padding:"10px 14px"}}>
                  {editK&&<BundleEditor/>}
                  {!editK&&(
                    <>
                      {bunds.map(b=>{
                        const on=selB[b.key]||false,final=bFinal(b,prods),base=bBase(b,prods);
                        const resumen=b.items.map(it=>{const p=prods.find(p=>p.key===it.productKey);return p?`${it.qty}× ${p.label}`:""}).filter(Boolean).join(", ");
                        return(
                          <div key={b.key} style={{marginBottom:10,padding:"10px 12px",borderRadius:8,border:on?`1.5px solid ${T.accent}`:`1px solid ${T.border}`,background:on?T.accentBg:T.bgCard,boxShadow:"none"}}>
                            <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                              <input type="checkbox" checked={on} onChange={()=>setSelB(sb=>({...sb,[b.key]:!sb[b.key]}))} style={{width:15,height:15,cursor:"pointer",accentColor:T.accent,marginTop:3,flexShrink:0}}/>
                              <div style={{flex:1}}>
                                <div style={{fontSize:13,fontWeight:500,color:T.text}}>{b.label}</div>
                                <div style={{fontSize:11,color:T.textMuted,marginTop:2}}>{resumen||"Sin productos"}</div>
                                <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:4}}>
                                  {b.margin>0&&<span style={{fontSize:11,color:T.textMuted,textDecoration:"line-through"}}>${fmtC(base)}</span>}
                                  <span style={{fontSize:14,fontWeight:500,color:T.accent}}>${fmtC(final)}{b.margin>0?` (−${b.margin}%)`:""}</span>
                                </div>
                              </div>
                              <div style={{display:"flex",gap:6,flexShrink:0}}>
                                <button onClick={()=>startEdit(b)} style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",color:T.textSec,cursor:"pointer",fontFamily:FONT}}>Editar</button>
                                <button onClick={()=>delBundle(b.key)} style={{fontSize:11,padding:"4px 8px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",color:T.deleteText,cursor:"pointer"}}>×</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <button onClick={startNew} style={{width:"100%",padding:"8px 0",borderRadius:8,border:`1px dashed ${T.accent}`,background:"transparent",color:T.accent,fontSize:13,cursor:"pointer",fontFamily:FONT,boxShadow:"none"}}>
                        + Nuevo pack
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Total */}
        <div style={{display:"grid",gridTemplateColumns:COL,gap:8,padding:"14px",background:T.totalBg,borderTop:`2px solid ${T.totalBorder}`,alignItems:"center",boxShadow:isShadow?"0 -2px 10px rgba(160,130,60,0.08)":"none"}}>
          <div/><div style={{fontSize:13,fontWeight:500,color:T.totalText}}>Total general</div><div/>
          <div style={{textAlign:"center",fontSize:17,fontWeight:700,color:T.totalText}}>{fmt(totUF)} UF</div>
          <div style={{textAlign:"center",fontSize:13,fontWeight:500,color:T.totalText}}>${fmtC(totUF*ufNum)}</div>
        </div>
      </div></div>

      <p style={{fontSize:11,color:T.textMuted,lineHeight:1.6}}>
        Recepción y levantamiento calculados como factor del P.E. · Precios y bundles guardados por dispositivo.
      </p>
    </div>
  );
}
