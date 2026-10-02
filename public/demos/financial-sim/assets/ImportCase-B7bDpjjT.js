import{c as I,w as M,x as v,y as x,z as T,A as P,O as S,B as A,r as g,j as e,U as E,E as k,H as w}from"./index-DhJ4OoW1.js";import{s as L,S as O}from"./SourceCell-CHLM2Cea.js";import{S as F}from"./sparkles-4bTMwGnI.js";import{C as U}from"./copy-DHU4z3MU.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=I("BrainCircuit",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=I("FileJson",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]]);function q(a,t=M()){return`Eres un investigador financiero. Necesito datos VERIFICADOS y con FUENTE para evaluar la viabilidad de un auto en plataforma Uber en México.

VEHÍCULO A INVESTIGAR: ${a||"[ingresa el modelo aquí]"}

Reglas:
- Responde ÚNICAMENTE con un objeto JSON válido. Sin markdown, sin texto extra, sin comentarios.
- Para CADA dato numérico incluye su fuente dentro de "sources", usando EXACTAMENTE la misma llave del dato.
- Usa fuentes reputables: fabricante, AMDA, INEGI, Profeco, CFE, Hacienda/gobiernos estatales, Uber México, aseguradoras (GNP, Qualitas), o portales de seminuevos reconocidos.
- Si un dato NO es verificable, da una estimación conservadora y en su fuente escribe "[ESTIMACIÓN] " con el razonamiento.
- Precios en pesos MXN, sólo números (sin símbolos ni comas).

Esquema EXACTO:

\`\`\`json
{
  "vehicle": {
    "name": "Nombre completo del modelo y versión",
    "year": ${t},
    "condition": "new | used",
    "odometerKm": 0,
    "usedDepreciationRate": 0.12,
    "warrantyYearsRemaining": 3,
    "type": "gasoline | diesel | hybrid | electric",
    "plugInHybrid": false,
    "price": 280000,
    "kmpl": 18.5,
    "kmPerKwh": null,
    "batteryCapacityKwh": null,
    "chargerPowerKw": null,
    "description": "Descripción breve del vehículo",
    "justification": "3-4 razones por las que es (o no) buena opción"
  },
  "costs": {
    "monthlyInsurance": 2000,
    "insuranceMode": "fixed",
    "insurancePctOfValue": 0.045,
    "annualMaintenance": 8000,
    "monthlyRefrendo": 500,
    "dataPlan": 400,
    "carWash": 800,
    "carWashTips": 400,
    "miscellaneous": 2000,
    "accessories": 100,
    "repairReserveAnnual": 0,
    "uberWearFactor": 0.30,
    "uberKmPerTrip": 8,
    "publicChargeFraction": 0.15,
    "publicChargePrice": 8.0
  },
  "uber": { "taxRegime": "resico", "resicoRate": 0.025, "uberCommission": 0.25, "taxRate": 0.30 },
  "financing": { "financeType": "annuity", "balloonPct": 0.35, "leaseMonthly": 6500, "leaseDownPayment": 20000, "leaseTermMonths": 48, "leaseKmCapYear": 20000, "leaseExcessKmFee": 3 },
  "oneTime": { "toxicologyReport": 400, "uberCertification": 900, "acquisitionFees": 0 },
  "projection": { "depreciationMethod": "declining", "depreciationRate": 0.20, "firstYearDepreciation": 0.25, "salesFactor": 1.0, "sellingCostPct": 0.0, "interestRate": 0.135, "theftLossProbAnnual": 0.015, "theftDeductiblePct": 0.05 },
  "sources": {
    "price": "URL fabricante o seminuevos (para usados, cita el precio de seminuevo del año y km)",
    "condition": "nuevo o usado según el precio cotizado",
    "odometerKm": "[ESTIMACIÓN] km típicos para ese año si es usado, si no 0",
    "usedDepreciationRate": "[ESTIMACIÓN] si es usado, depreciación anual más lenta que un auto nuevo (típico 0.10-0.15)",
    "warrantyYearsRemaining": "[ESTIMACIÓN] años de garantía de fábrica restantes (nuevos 3-5; usados normalmente 0)",
    "kmpl": "URL ficha técnica / EPA / fabricante",
    "plugInHybrid": "URL ficha técnica que confirme si es híbrido enchufable; si no aplica, null",
    "kmPerKwh": "URL si aplica, si no null",
    "batteryCapacityKwh": "URL si aplica, si no null",
    "chargerPowerKw": "URL/estimación potencia de cargador doméstico recomendado (si EV/híbrido enchufable)",
    "monthlyInsurance": "URL aseguradora — si lo usarás en Uber cotiza póliza COMERCIAL (más cara)",
    "insuranceMode": "fixed si das un monto plano; pctOfValue si la prima es % del valor del auto (cobertura amplia)",
    "insurancePctOfValue": "[ESTIMACIÓN] prima anual como % del valor (cobertura amplia 3-6%) si insuranceMode=pctOfValue",
    "taxRegime": "resico (realista: retención de plataforma), gross (simplificado: % de tarifa bruta), o net (% sobre utilidad)",
    "resicoRate": "URL/Hacienda — retención RESICO de plataformas digitales (~2.1-2.5% del ingreso bruto)",
    "financeType": "annuity (crédito normal), balloon (pago final/residual), o lease (arrendamiento)",
    "balloonPct": "[ESTIMACIÓN] valor residual del plan de agencia si financeType=balloon (típico 0.25-0.45)",
    "leaseMonthly": "URL/cotización renta mensual de arrendamiento (si financeType=lease)",
    "leaseDownPayment": "URL/cotización pago inicial del arrendamiento (no recuperable)",
    "annualMaintenance": "URL costos de servicio del fabricante/taller",
    "repairReserveAnnual": "[ESTIMACIÓN] reserva de reparaciones/año; para usados fuera de garantía 5,000-15,000",
    "monthlyRefrendo": "URL gobierno del estado (el refrendo/tenencia varía por estado)",
    "dataPlan": "URL plan de datos típico",
    "carWash": "URL/estimación precio lavado x frecuencia mensual",
    "carWashTips": "[ESTIMACIÓN] propinas mensuales",
    "miscellaneous": "[ESTIMACIÓN] imprevistos/casetas/estacionamiento mensuales",
    "accessories": "[ESTIMACIÓN] cargador, soporte, etc. prorrateado",
    "uberWearFactor": "[ESTIMACIÓN] desgaste extra por uso intensivo 0.2-0.5",
    "uberKmPerTrip": "[ESTIMACIÓN] km promedio por viaje incl. traslado vacío (típico 6-12)",
    "publicChargeFraction": "[ESTIMACIÓN] fracción de carga en estaciones públicas si es eléctrico/enchufable (0-0.3)",
    "publicChargePrice": "URL/estimación precio por kWh en cargadores públicos (suele superar la tarifa CFE doméstica)",
    "depreciationMethod": "declining para autos (saldo decreciente); straight sólo si quieres depreciación lineal",
    "depreciationRate": "URL guía de depreciación / valor seminuevos (15-25% típico)",
    "firstYearDepreciation": "[ESTIMACIÓN] caída del 1er año si method=realistic (autos nuevos ~20-25%)",
    "salesFactor": "[ESTIMACIÓN] ajuste de reventa frente al valor calculado 0.7-1.1",
    "sellingCostPct": "[ESTIMACIÓN] costo de vender (comisión/traspaso) 0-5%",
    "interestRate": "URL banco — tasa de crédito (autos usados suelen ser más caros, 14-20%)",
    "theftLossProbAnnual": "[ESTIMACIÓN] prob. anual de robo/pérdida total (INEGI/aseguradoras; típico 0.01-0.03)",
    "theftDeductiblePct": "[ESTIMACIÓN] deducible de cobertura amplia para robo/pérdida total (3-10%)",
    "toxicologyReport": "URL costo antidoping / requisitos Uber MX",
    "uberCertification": "URL requisitos de registro Uber MX",
    "acquisitionFees": "[ESTIMACIÓN] placas/alta/ISAN/revisión/traspaso al comprar"
  }
}
\`\`\`

Notas técnicas:
- gasolina/diésel: llena kmpl, deja kmPerKwh y batería en null.
- eléctrico: llena kmPerKwh y batería, deja kmpl en null.
- híbrido convencional: plugInHybrid=false, llena kmpl y deja datos eléctricos en null si no aplica.
- híbrido enchufable: plugInHybrid=true, llena kmpl, kmPerKwh, batería y cargador.
- monthlyInsurance, monthlyRefrendo, dataPlan, carWash, carWashTips, miscellaneous, accessories son MENSUALES.
- annualMaintenance es ANUAL.
- toxicologyReport y uberCertification son pagos ÚNICOS (una sola vez).
- "uber.taxRegime": usa "resico" salvo que quieras el supuesto simplificado (entonces "gross"). leaseMonthly/leaseDownPayment sólo si financeType="lease".
- "costs.insuranceMode": usa "pctOfValue" sólo si cotizaste el seguro como porcentaje del valor; si no, "fixed" con monthlyInsurance.

Recuerda: SOLO el JSON, con una fuente por cada dato en "sources".`}const D=[["vehicle","name","carName","text"],["vehicle","type","vehicleType","option"],["vehicle","plugInHybrid","plugInHybrid","boolean"],["vehicle","price","carPrice","number"],["vehicle","year","carYear","number"],["vehicle","kmpl","kmpl","number"],["vehicle","kmPerKwh","kmPerKwh","number"],["vehicle","batteryCapacityKwh","batteryCapacityKwh","number"],["vehicle","chargerPowerKw","chargerPowerKw","number"],["vehicle","condition","vehicleCondition","option"],["vehicle","odometerKm","odometerKm","number"],["vehicle","usedDepreciationRate","usedDepreciationRate","number"],["vehicle","warrantyYearsRemaining","warrantyYearsRemaining","number"],["vehicle","description","carDescription","text"],["vehicle","justification","carJustification","text"],["costs","monthlyInsurance","monthlyInsurance","number"],["costs","insuranceMode","insuranceMode","option"],["costs","insurancePctOfValue","insurancePctOfValue","number"],["costs","annualMaintenance","annualMaintenance","number"],["costs","monthlyRefrendo","monthlyRefrendo","number"],["costs","dataPlan","dataPlan","number"],["costs","carWash","carWash","number"],["costs","carWashTips","carWashTips","number"],["costs","miscellaneous","miscellaneous","number"],["costs","accessories","accessories","number"],["costs","repairReserveAnnual","repairReserveAnnual","number"],["costs","uberWearFactor","uberWearFactor","number"],["costs","uberKmPerTrip","uberKmPerTrip","number"],["costs","publicChargeFraction","publicChargeFraction","number"],["costs","publicChargePrice","publicChargePrice","number"],["oneTime","toxicologyReport","toxicologyReport","number"],["oneTime","uberCertification","uberCertification","number"],["oneTime","acquisitionFees","acquisitionFees","number"],["uber","taxRegime","taxRegime","option"],["uber","resicoRate","resicoRate","number"],["uber","uberCommission","uberCommission","number"],["uber","taxRate","taxRate","number"],["financing","financeType","financeType","option"],["financing","balloonPct","balloonPct","number"],["financing","leaseMonthly","leaseMonthly","number"],["financing","leaseDownPayment","leaseDownPayment","number"],["financing","leaseTermMonths","leaseTermMonths","number"],["financing","leaseKmCapYear","leaseKmCapYear","number"],["financing","leaseExcessKmFee","leaseExcessKmFee","number"],["projection","depreciationMethod","depreciationMethod","option"],["projection","depreciationRate","depreciationRate","number"],["projection","firstYearDepreciation","firstYearDepreciation","number"],["projection","salesFactor","salesFactor","number"],["projection","sellingCostPct","sellingCostPct","number"],["projection","interestRate","interestRate","number"],["projection","theftLossProbAnnual","theftLossProbAnnual","number"],["projection","theftDeductiblePct","theftDeductiblePct","number"]],$=["vehicle","costs","oneTime","uber","financing","projection"],V=(a,t,r)=>{if(a==="boolean")return!!r;if(a==="text")return typeof r=="string"&&r?r:void 0;if(a==="option")return S[t].includes(r)?r:void 0;const o=+r;return Number.isFinite(o)?A(t,o):void 0};function W(a,t){var d;if(!v(a))return{ok:!1,error:"se esperaba un objeto JSON con las secciones vehicle, costs, uber, etc."};const r={...t},o=[],l=[];for(const n of $)a[n]!=null&&!v(a[n])&&o.push(n);const f=n=>v(a[n])?a[n]:null;for(const[n,c,i,y]of D){const h=(d=f(n))==null?void 0:d[c];if(h==null)continue;const m=V(y,i,h);m===void 0?o.push(`${n}.${c}`):y==="text"&&m.length>x[i]?(r[i]=m.slice(0,x[i]),l.push(`${n}.${c}`)):r[i]=m}const u=f("vehicle");u&&(r.carPreset="custom",u.warrantyYearsRemaining==null&&(u.condition==="used"?r.warrantyYearsRemaining=0:u.condition==="new"&&(r.warrantyYearsRemaining=3)));const p=T(a.sources);if(v(a.sources)){const n=Object.values(a.sources),c=n.length-(p?Object.keys(p).length:0);c>0&&o.push(`sources (${c} omitidas)`),n.some(i=>typeof i=="string"&&i.length>P.value)&&l.push("sources")}else a.sources!=null&&o.push("sources");return{ok:!0,inputs:r,sources:p,ignored:o,trimmed:l}}const Y=a=>String(a).replace(/```json\s*/g,"").replace(/```\s*$/g,"").trim(),C=1e5;function B(a,t){if(String(a).length>C)return{ok:!1,error:`El texto pegado es demasiado grande (máximo ${C.toLocaleString("es-MX")} caracteres).`};let r;try{r=JSON.parse(Y(a))}catch(l){return{ok:!1,error:`JSON inválido: ${l.message}`}}const o=W(r,t);return o.ok?o:{ok:!1,error:`Error: ${o.error}`}}const _=({inputs:a,setInputs:t,sources:r,setSources:o})=>{const[l,f]=g.useState(""),[u,p]=g.useState(""),[d,n]=g.useState(""),[c,i]=g.useState(null),[y,h]=g.useState(!1),m=()=>{if(!l.trim()){i({type:"error",msg:"Escribe el nombre/modelo del vehículo primero."});return}p(q(l)),i(null)},j=()=>{navigator.clipboard.writeText(u).then(()=>{h(!0),setTimeout(()=>h(!1),2e3)})},R=()=>{const s=B(d,a);if(!s.ok){i({type:"error",msg:s.error});return}t(s.inputs),s.sources&&o(s.sources);const b=s.ignored.length?` Se ignoraron valores no válidos: ${s.ignored.join(", ")}.`:"",N=s.trimmed.length?` Se recortaron textos demasiado largos: ${s.trimmed.join(", ")}.`:"";i({type:"success",msg:`¡Caso importado! Ve al Dashboard para visualizar. Las fuentes aparecen abajo.${b}${N}`})};return e.jsxs("div",{style:{maxWidth:880},children:[e.jsx("h1",{className:"serif",style:{fontSize:38,margin:"0 0 8px"},children:"Importar otro vehículo"}),e.jsxs("p",{style:{color:"var(--muted)",marginBottom:28,lineHeight:1.7},children:["¿Quieres probar otro auto? Genera un prompt para que una IA (Claude, ChatGPT, Gemini, Perplexity) investigue TODAS las variables del vehículo"," ",e.jsx("strong",{children:"con una fuente para cada dato"}),", copia la respuesta JSON aquí, y la app cargará el caso automáticamente — incluyendo las ligas de respaldo para que verifiques la información."]}),e.jsxs("div",{className:"card",style:{marginBottom:22},children:[e.jsxs("div",{className:"card-title",children:[e.jsx(K,{size:11})," Paso 1 · Generar prompt para la IA"]}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-end",marginBottom:14},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"field-label",style:{marginBottom:4},children:"¿Qué vehículo quieres investigar?"}),e.jsx("input",{className:"input",type:"text",value:l,onChange:s=>f(s.target.value),placeholder:"Ej. Tesla Model 3 2026, Ford Ranger Diesel, BYD Atto 3..."})]}),e.jsxs("button",{className:"btn accent",onClick:m,children:[e.jsx(F,{size:12})," Generar prompt"]})]}),u&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[e.jsx("span",{className:"pill accent",children:"Prompt generado"}),e.jsxs("button",{className:"btn outline",onClick:j,children:[e.jsx(U,{size:11})," ",y?"Copiado ✓":"Copiar al portapapeles"]})]}),e.jsx("pre",{className:"json-out",children:u}),e.jsx("p",{style:{fontSize:12,color:"var(--muted)",marginTop:10,marginBottom:0},children:"Pega esto en tu IA preferida. Te devolverá un JSON con cada variable y su fuente, que copias al paso 2."})]})]}),e.jsxs("div",{className:"card",style:{marginBottom:r?22:0},children:[e.jsxs("div",{className:"card-title",children:[e.jsx(z,{size:11})," Paso 2 · Importar el JSON"]}),e.jsx("p",{style:{fontSize:12,color:"var(--muted)",marginTop:0,marginBottom:12},children:"Pega el JSON que recibiste de la IA. La app aplicará todos los valores al escenario actual y guardará las fuentes."}),e.jsx("textarea",{className:"textarea",value:d,onChange:s=>n(s.target.value),placeholder:`{
  "vehicle": {...},
  "costs": {...},
  "oneTime": {...},
  "projection": {...},
  "sources": {...}
}`,style:{minHeight:220}}),e.jsxs("div",{style:{display:"flex",gap:10,marginTop:12,alignItems:"center"},children:[e.jsxs("button",{className:"btn accent",onClick:R,disabled:!d.trim(),children:[e.jsx(E,{size:11})," Importar y aplicar"]}),e.jsx("button",{className:"btn outline",onClick:()=>{n(""),i(null)},children:"Limpiar"})]}),c&&e.jsx("div",{className:`toast ${c.type}`,children:c.msg})]}),r&&e.jsxs("div",{className:"card",style:{marginBottom:22},children:[e.jsxs("div",{className:"card-title",children:[e.jsx(k,{size:11})," Fuentes de los datos importados"]}),e.jsx("div",{className:"card-blurb",children:"Cada dato del vehículo importado, con su liga de respaldo. Verifica que provengan de fuentes confiables."}),e.jsxs("table",{className:"tbl",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Variable"}),e.jsx("th",{children:"Fuente"})]})}),e.jsx("tbody",{children:Object.entries(r).map(([s,b])=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontFamily:"Manrope",fontWeight:500},children:L(s)}),e.jsx("td",{style:{wordBreak:"break-all",fontSize:11},children:e.jsx(O,{value:b,highlightEstimates:!0})})]},s))})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsx(w,{size:11})," Notas y fuentes"]}),e.jsx("div",{className:"card-blurb",children:"Anota de dónde salieron tus números: precios de lista o cotizaciones de agencia, tasas de tu banco, cotizaciones de seguro, ligas de referencia, supuestos personales. Lo que escribas aquí aparece en el Reporte y se incluye al descargar el .md."}),e.jsx("textarea",{className:"textarea",value:a.userNotes,maxLength:x.userNotes,onChange:s=>t(b=>({...b,userNotes:s.target.value})),placeholder:`Ej.
- Precio: cotización agencia KIA Monterrey, 15-jun-2026.
- Tasa 13.5%: simulador BBVA Auto.
- Seguro $2,000/mes: cotización Qualitas cobertura amplia comercial.
- Gasolina $24.5: promedio CRE Nuevo León.`,style:{minHeight:160}})]})]})};export{_ as ImportCase};
