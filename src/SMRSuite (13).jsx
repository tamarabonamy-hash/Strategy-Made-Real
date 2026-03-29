// SMR STRATEGY EXECUTION SUITE — All 8 Tools
// Save as App.jsx in src/ — run with: npm create vite@latest smr -- --template react

import { useState } from "react";
import { exportDiagnostic, exportPrioritisation, exportDecisionStack, exportRoleAnalyser, exportRhythm, exportKPIs, exportCapability, exportChange } from './useWordExport';

const G="#2C4A3E",GOLD="#D4A847",CREAM="#F7F4EF",G_MID="#4a7a68",RED="#B94040",AMBER="#C89A2A";
// Light theme aliases
const BG="#F7F4EF",TEXT="#2C4A3E",BORDER="rgba(44,74,62,0.12)",CARD="rgba(44,74,62,0.04)",CARD2="rgba(44,74,62,0.08)",MUTED="rgba(44,74,62,0.5)",SUBTLE="rgba(44,74,62,0.35)";
const mono={fontFamily:"'DM Mono',monospace"};
const serif={fontFamily:"'Playfair Display',Georgia,serif"};
const sans={fontFamily:"'DM Sans',sans-serif"};
const CSS=`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}body,#root{background:#F7F4EF;color:#2C4A3E;font-family:'DM Sans',sans-serif;min-height:100vh;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#F7F4EF;}::-webkit-scrollbar-thumb{background:#6B8F71;border-radius:2px;}
input[type=range]{-webkit-appearance:none;appearance:none;height:3px;border-radius:2px;outline:none;cursor:pointer;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#2C4A3E;cursor:pointer;border:2px solid #F7F4EF;}
@keyframes spin{to{transform:rotate(360deg);}}`;

function SL({children,color=GOLD}){return <div style={{...mono,fontSize:10,color,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12}}>{children}</div>;}
function SectionLabel({children,color=GOLD}){return <SL color={color}>{children}</SL>;}
function Card({children,style={},gold=false}){return <div style={{background:"rgba(44,74,62,0.05)",border:`1px solid ${gold?"rgba(212,168,71,0.2)":"rgba(247,244,239,0.07)"}`,padding:24,...style}}>{children}</div>;}
function GBtn({children,onClick,disabled,style={}}){return <button onClick={onClick} disabled={disabled} style={{background:disabled?"rgba(212,168,71,0.3)":GOLD,color:G,border:"none",padding:"12px 28px",...mono,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",cursor:disabled?"not-allowed":"pointer",fontWeight:700,...style}}>{children}</button>;}
function GoldButton(p){return <GBtn {...p}/>;}
function OBtn({children,onClick,style={}}){return <button onClick={onClick} style={{background:"transparent",color:G,border:`1px solid ${G}`,padding:"10px 22px",...mono,fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",...style}}>{children}</button>;}
function OutlineButton(p){return <OBtn {...p}/>;}
function Callout({children}){return <div style={{background:"rgba(212,168,71,0.07)",border:"1px solid rgba(212,168,71,0.3)",padding:"14px 18px",marginBottom:24,fontSize:13,color:"rgba(44,74,62,0.9)",lineHeight:1.7}}>{children}</div>;}
function TabBar({tabs,active,onChange}){return(<div style={{display:"flex",borderBottom:"1px solid rgba(44,74,62,0.12)",marginBottom:24,overflowX:"auto"}}>{tabs.map(([id,label])=><button key={id} onClick={()=>onChange(id)} style={{background:"none",border:"none",padding:"11px 16px",...mono,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:active===id?GOLD:MUTED,borderBottom:active===id?`2px solid ${GOLD}`:"2px solid transparent",cursor:"pointer",marginBottom:-1,whiteSpace:"nowrap"}}>{label}</button>)}</div>);}
function DataTable({headers,rows}){return(<table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr>{headers.map((h,i)=><th key={i} style={{...mono,fontSize:9,color:"rgba(44,74,62,0.62)",letterSpacing:"0.1em",textTransform:"uppercase",padding:"10px 14px",textAlign:"left",borderBottom:"1px solid rgba(44,74,62,0.1)",background:"rgba(44,74,62,0.06)"}}>{h}</th>)}</tr></thead><tbody>{rows.map((row,ri)=><tr key={ri} style={{background:ri%2===0?"rgba(44,74,62,0.04)":"transparent"}}>{row.map((cell,ci)=><td key={ci} style={{padding:"11px 14px",borderBottom:"1px solid rgba(247,244,239,0.05)",color:"rgba(44,74,62,0.9)",lineHeight:1.5}}>{cell}</td>)}</tr>)}</tbody></table>);}
function scoreColor(s){if(!s)return"rgba(247,244,239,0.2)";if(s<=2)return RED;if(s===3)return AMBER;return G_MID;}

// ═══ TOOL 1 — STRATEGY DIAGNOSTIC ═══════════════════════════════════════════
const DIAG_DIMS=[{id:"strategy_clarity",num:"01",label:"Strategy Clarity",tagline:"Does everyone know where you're going — and why?",intro:"McKinsey research found only 28% of executives could list their company's top three priorities. Without clarity, every team makes its own version of the strategy.",levels:[{label:"Critical",color:RED,bg:"rgba(185,64,64,0.08)",desc:"No clear strategy exists. Direction shifts frequently or is held in the heads of one or two leaders.",examples:["No strategy document or narrative exists","Direction changes with each leadership conversation","Teams executing on last year's plan or personal assumptions","Ask three leaders what matters most — get three different answers"]},{label:"Weak",color:"#C0622A",bg:"rgba(192,98,42,0.08)",desc:"A strategy exists but lives in a deck, not in daily decisions. Not meaningfully translated below senior leadership.",examples:["Strategy presented at all-hands once but rarely referenced","No single-page narrative for managers to use","Frontline staff connect work to BAU not strategic goals","Strategy language differs between business units"]},{label:"Developing",color:AMBER,bg:"rgba(200,154,42,0.08)",desc:"Strategy is articulated and leaders broadly understand it. Some translation to team goals has occurred but consistency is uneven.",examples:["Strategy document exists and has been communicated","Some teams have OKRs linked to strategy","Managers can describe strategy but struggle to connect it daily","Quarterly reviews reference strategy but don't drive prioritisation"]},{label:"Capable",color:G_MID,bg:"rgba(74,122,104,0.08)",desc:"Strategy is clearly articulated, consistently communicated, and translated into meaningful team priorities across most of the organisation.",examples:["A one-page strategy narrative actively used by people leaders","Team goals visibly linked to strategic pillars","Leaders use strategy to make trade-off decisions and say no","New starters understand strategy within their first month"]},{label:"Leading",color:"#2C6B52",bg:"rgba(44,107,82,0.1)",desc:"Strategy is a living system. Continuously refreshed, deeply understood at all levels, used as operating logic for every significant decision.",examples:["Strategy reviewed quarterly with structured business input","Every initiative tested against strategic fit before being resourced","Frontline teams can articulate strategic contribution unprompted","Strategy is the primary filter for investment and prioritisation"]}]},{id:"leadership_alignment",num:"02",label:"Leadership Alignment",tagline:"Are your leaders pulling in the same direction?",intro:"Prosci research across 10,000+ projects identifies active executive sponsorship as the single highest contributor to change success. When leaders fragment, so does execution.",levels:[{label:"Critical",color:RED,bg:"rgba(185,64,64,0.08)",desc:"Leaders are visibly misaligned. Competing agendas and conflicting priorities play out in front of the organisation.",examples:["Different executives sponsor competing initiatives","Decisions made in one forum are relitigated elsewhere","Teams play leaders off against each other","Leaders publicly disagree on transformation priorities"]},{label:"Weak",color:"#C0622A",bg:"rgba(192,98,42,0.08)",desc:"Leaders agree in the room; mixed messages are sent outside it. Alignment reached at workshops but doesn't hold in daily behaviour.",examples:["Leadership team agrees in workshops but reverts to silos","No shared accountability framework exists","BAU priorities routinely crowd out transformation commitments","Sponsor visible at launch, absent during critical delivery phases"]},{label:"Developing",color:AMBER,bg:"rgba(200,154,42,0.08)",desc:"Most leaders are aligned on direction but accountability gaps and unresolved tensions create friction.",examples:["Executive team agreed priorities but no shared metrics","Some leaders champion transformation visibly; others are passive","Alignment requires constant brokering","Individual priorities sometimes override shared goals"]},{label:"Capable",color:G_MID,bg:"rgba(74,122,104,0.08)",desc:"Leaders are demonstrably aligned. Consistent messages, hold themselves accountable, actively remove barriers.",examples:["Leadership team has shared scorecard with collective accountability","Leaders visibly model the behaviours and priorities they ask of others","When challenges arise leaders problem-solve collectively","Sponsor attends key milestones and is accessible to programme team"]},{label:"Leading",color:"#2C6B52",bg:"rgba(44,107,82,0.1)",desc:"Leadership alignment is structural, not relational. Governance, accountability, and incentives sustain it through changes and pressure.",examples:["Executive performance frameworks explicitly link to transformation delivery","A leadership coalition is formally constituted","Leaders advocate for transformation in external forums and board reporting","Succession planning embeds strategic alignment from day one"]}]},{id:"initiative_prioritisation",num:"03",label:"Initiative Prioritisation",tagline:"Are you doing fewer things, better?",intro:"One practitioner reduced strategic priorities from 100+ to 12 and more than doubled execution rate. Organisations that fail to ruthlessly prioritise dilute focus, exhaust capacity, and deliver nothing well.",levels:[{label:"Critical",color:RED,bg:"rgba(185,64,64,0.08)",desc:"No meaningful prioritisation exists. Initiatives proliferate. Everything is urgent; nothing is resourced adequately.",examples:["20+ strategic priorities exist simultaneously","Teams allocated across 4-6 major workstreams with no capacity slack","New initiatives added without removing existing ones","No formal process for evaluating new work against strategic value"]},{label:"Weak",color:"#C0622A",bg:"rgba(192,98,42,0.08)",desc:"Prioritisation happens informally or reactively. Whoever asks most recently determines where effort goes.",examples:["Priority determined by executive relationships not strategic merit","A prioritised list exists on paper but isn't used to allocate resources","Teams re-prioritise constantly in response to ad hoc requests","No visibility of total initiative load across the organisation"]},{label:"Developing",color:AMBER,bg:"rgba(200,154,42,0.08)",desc:"A prioritisation framework exists but is used inconsistently. Strategic initiatives named but not always resourced to match stated priority.",examples:["A portfolio register exists but isn't actively managed","High-priority initiatives share resources equally with BAU","Prioritisation decisions revisited frequently without clear criteria","Effort-vs-impact mapping done but not operationalised"]},{label:"Capable",color:G_MID,bg:"rgba(74,122,104,0.08)",desc:"Initiatives are actively prioritised against strategic criteria. Resources follow priority. New requests go through formal intake.",examples:["A portfolio governance framework determines what proceeds","Resource allocation visibly reflects strategic priority","New initiative intake requires one-pager and strategic alignment check","Portfolio health dashboard reviewed monthly at leadership level"]},{label:"Leading",color:"#2C6B52",bg:"rgba(44,107,82,0.1)",desc:"Portfolio discipline is embedded in the operating rhythm. Stopping work is as valued as starting it. Capacity is a strategic asset.",examples:["Annual and quarterly planning includes explicit stop doing decisions","Resource forecasting links initiative pipeline to capacity 6-12 months out","Benefits realisation tracked and informs future prioritisation","The organisation has a defined strategic portfolio limit and holds to it"]}]},{id:"governance_maturity",num:"04",label:"Governance Maturity",tagline:"Are the right decisions being made, by the right people, at the right time?",intro:"PMI research consistently links governance maturity to on-time, on-budget delivery. Mature governance is not more bureaucracy — it is faster, cleaner decisions with clear ownership.",levels:[{label:"Critical",color:RED,bg:"rgba(185,64,64,0.08)",desc:"No governance structure exists for transformation. Decisions are made informally, inconsistently, or not at all.",examples:["No steering committee or programme board exists","Decisions require individual access to busy executives","Issues escalate to the CEO because no middle layer exists","RACI has never been defined for key workstreams"]},{label:"Weak",color:"#C0622A",bg:"rgba(192,98,42,0.08)",desc:"Governance structures exist on paper but don't function. Meetings are irregular, attendance poor, decisions not followed through.",examples:["A steering committee meets but agendas are ad hoc","Decision owners named but not held to commitments","Escalation paths exist but are routinely worked around","Governance meetings used to report not to decide"]},{label:"Developing",color:AMBER,bg:"rgba(200,154,42,0.08)",desc:"Governance is functional but inconsistent. Core structures in place and decisions being made, but oversight quality varies.",examples:["Steering committee meets monthly with a structured agenda","Decision logs exist and referenced though follow-through is uneven","RACI exists for major decisions but edge cases cause confusion","Escalation paths understood but threshold for escalating is unclear"]},{label:"Capable",color:G_MID,bg:"rgba(74,122,104,0.08)",desc:"Governance consistently applied. Decision rights are clear, meetings productive, issues escalated and resolved within defined timeframes.",examples:["Steering committee has clear TOR, regular attendance, and live decision log","RACI documented and actively referenced for significant decisions","Issues escalated within 48-72 hours and resolved within defined SLAs","Programme board reviews risk register and makes resourcing decisions monthly"]},{label:"Leading",color:"#2C6B52",bg:"rgba(44,107,82,0.1)",desc:"Governance is adaptive and lightweight. Structures are right-sized to each programme, reviewed regularly, trusted as primary resolution mechanism.",examples:["Governance cadence reviewed at each phase gate and adjusted accordingly","Decision-making authority clearly delegated","Governance health measured and reported as a programme metric","Governance lessons captured and feed the next programme's design"]}]},{id:"change_capability",num:"05",label:"Change Capability",tagline:"Can your organisation manage the human side of transformation?",intro:"Prosci research shows organisations with excellent change management are 6x more likely to meet project objectives. Yet most treat change as a comms plan. That gap is where transformations die.",levels:[{label:"Critical",color:RED,bg:"rgba(185,64,64,0.08)",desc:"Change management does not exist as a distinct discipline. People impacts are an afterthought.",examples:["No dedicated change resource on any programme","Communication is a single town hall or email at launch","Impacted employees told what is happening — not engaged in how","Resistance treated as insubordination not as information"]},{label:"Weak",color:"#C0622A",bg:"rgba(192,98,42,0.08)",desc:"Change management is confused with communications or training. Activity happens but not structured or linked to adoption outcomes.",examples:["A comms plan exists but not connected to a change strategy","Training scheduled close to go-live — not sequenced to build readiness","Change resourced at end of project not the beginning","No measurement of adoption, readiness, or resistance exists"]},{label:"Developing",color:AMBER,bg:"rgba(200,154,42,0.08)",desc:"Change management recognised as a discipline and applied on major programmes. Quality is inconsistent and capability sits with individuals.",examples:["Change management included in plans for large initiatives","A structured methodology (ADKAR, Kotter) used by some practitioners","Impact assessments conducted but not always actioned","Change capability depends on one or two skilled individuals — not embedded broadly"]},{label:"Capable",color:G_MID,bg:"rgba(74,122,104,0.08)",desc:"Change management consistently applied using a common methodology. Adoption is measured. People leaders equipped to lead through change.",examples:["All significant programmes have a dedicated change lead from initiation","ADKAR or equivalent used to assess readiness at multiple milestones","People leaders receive coaching to fulfil their change sponsorship role","Go-live decisions consider readiness — not just technical completion"]},{label:"Leading",color:"#2C6B52",bg:"rgba(44,107,82,0.1)",desc:"Change capability is an organisational competency embedded in how the organisation plans, resources, and measures all transformation work.",examples:["A change centre of excellence or internal capability exists","Change management ROI tracked: adoption rates, benefit realisation, productivity recovery","Senior leaders formally assessed and coached on sponsorship effectiveness","Change maturity reviewed annually using the Prosci Maturity Model Audit or equivalent"]}]},{id:"delivery_discipline",num:"06",label:"Delivery Discipline",tagline:"Do your projects actually deliver what they promised?",intro:"PMI research shows organisations with high project management maturity waste 13x less money than low-maturity peers. Benefits realisation, not go-live, is the real finish line.",levels:[{label:"Critical",color:RED,bg:"rgba(185,64,64,0.08)",desc:"No structured delivery framework exists. Projects are run informally. Nobody has a clear, consistent picture of what's on track.",examples:["No project plans, milestone tracking, or status reporting exists","Delivery timelines are estimates — not built from scope and resource","Issues surface at crisis point not through proactive reporting","Projects are done when system goes live — regardless of benefits"]},{label:"Weak",color:"#C0622A",bg:"rgba(192,98,42,0.08)",desc:"Basic delivery structures exist but inconsistently applied. Status reporting done but doesn't drive decisions.",examples:["Status reports produced but not used in decision-making forums","RAG ratings routinely inflated — green turns red overnight","Issues logged but rarely actioned with clear owners and dates","Project managers are administrators not delivery leaders"]},{label:"Developing",color:AMBER,bg:"rgba(200,154,42,0.08)",desc:"Delivery disciplines applied inconsistently across portfolio. Some projects well-run; others managed informally.",examples:["A delivery methodology exists but compliance varies by project","Milestone tracking in place for major programmes but not smaller workstreams","Risk and issue registers exist but updated irregularly","Escalation happens but not always through defined paths"]},{label:"Capable",color:G_MID,bg:"rgba(74,122,104,0.08)",desc:"Delivery managed with consistent rigour across portfolio. Status is visible, accurate, and trusted.",examples:["All significant programmes follow a common methodology with defined tollgates","Portfolio status dashboard updated weekly and reviewed at programme board","RAG reporting calibrated — ratings are honest and governance responds","Delivery risk formally assessed at each phase gate with documented mitigations"]},{label:"Leading",color:"#2C6B52",bg:"rgba(44,107,82,0.1)",desc:"Delivery discipline is a competitive advantage. The organisation learns from every project and continuously improves its delivery capability.",examples:["Post-implementation reviews conducted within 90 days and actioned","Benefits realisation tracked at 6 and 12 months post go-live","A PMO or delivery centre of excellence sets standards and coaches teams","Delivery metrics reported to the board"]}]}];
const SLABELS=["","Critical","Weak","Developing","Capable","Leading"];
const DRISK={strategy_clarity:"Without a clear strategy, execution is directionless. Every initiative competes equally — and none wins. Teams make locally rational decisions that collectively fragment the effort.",leadership_alignment:"Misaligned leaders send conflicting signals. Teams stall waiting for consensus that never comes. Fragmented leadership is the single fastest way to kill a transformation.",initiative_prioritisation:"Too many initiatives dilute focus and exhaust capacity. When everything is a priority, nothing is. Research shows reducing strategic priorities from 100+ to 12 can more than double execution rate.",governance_maturity:"Without governance, decisions loop endlessly. Issues sit unresolved for weeks. Accountability evaporates at exactly the moment it matters most — mid-delivery, under pressure.",change_capability:"Change is happening to people, not with them. Without structured change management, resistance mounts silently and surfaces as adoption failure long after go-live.",delivery_discipline:"Projects drift. Deadlines slip. The gap between plan and reality widens invisibly until it is too late to recover. PMI research shows low-maturity organisations waste 13x more money."};
const DROAD={strategy_clarity:["Facilitate a strategy articulation workshop and produce a single-page narrative for cascade","Translate strategy into team-level objectives using OKRs — test comprehension at frontline","Establish a quarterly strategy review cadence with structured leadership input"],leadership_alignment:["Run a leadership alignment diagnostic and define shared accountability for transformation outcomes","Constitute a formal leadership coalition with terms of reference and agreed collective scorecard","Build a sponsor coaching plan that equips leaders to fulfil their CLARC role"],initiative_prioritisation:["Map all active initiatives against strategic objectives in a single portfolio view","Apply an effort-vs-impact framework and make explicit stop/pause decisions","Establish a governance gate for new initiative intake — nothing proceeds without strategic alignment sign-off"],governance_maturity:["Define RACI for all significant transformation decisions and document escalation thresholds","Stand up a programme steering committee with clear TOR, decision log, and attendance commitment","Review governance effectiveness at every phase gate and right-size to programme needs"],change_capability:["Conduct an organisational readiness assessment (ADKAR or equivalent) before planning communications or training","Appoint dedicated change leads on all significant workstreams from programme initiation — not three weeks before go-live","Build a change leadership coaching plan for all people leaders with direct accountability for impacted teams"],delivery_discipline:["Implement a consistent delivery methodology with defined tollgates across all programmes","Stand up a portfolio health dashboard reviewed weekly at programme board — calibrate RAG ratings to be honest","Institute post-implementation reviews within 90 days and track benefits realisation at 6 and 12 months post go-live"]};

function Tool1Diagnostic(){
  const[scores,setScores]=useState({});
  const[expanded,setExpanded]=useState({strategy_clarity:true});
  const[view,setView]=useState("input");
  const scored=Object.keys(scores).length;
  const allScored=scored===6;
  const avg=allScored?Object.values(scores).reduce((a,b)=>a+b,0)/6:null;
  const risks=DIAG_DIMS.filter(d=>scores[d.id]<=2);
  const cautions=DIAG_DIMS.filter(d=>scores[d.id]===3);
  const strengths=DIAG_DIMS.filter(d=>scores[d.id]>=4);
  const ml=avg?(avg<2?"Critical":avg<3?"Weak":avg<4?"Developing":avg<5?"Capable":"Leading"):"-";
  function selectScore(dimId,val){
    setScores(p=>({...p,[dimId]:val}));
    const idx=DIAG_DIMS.findIndex(d=>d.id===dimId);
    const next=DIAG_DIMS.find((d,i)=>i>idx&&!scores[d.id]);
    if(next)setTimeout(()=>{setExpanded(p=>({...Object.fromEntries(Object.keys(p).map(k=>[k,false])),[next.id]:true}));},350);
  }
  function buildRadar(){
    const n=DIAG_DIMS.length,cx=130,cy=130,r=95,elems=[];
    [0.25,0.5,0.75,1].forEach(lv=>{const pts=DIAG_DIMS.map((_,i)=>{const a=Math.PI*2*i/n-Math.PI/2;return`${cx+Math.cos(a)*r*lv},${cy+Math.sin(a)*r*lv}`;}).join(" ");elems.push(<polygon key={lv} points={pts} fill="none" stroke={G} strokeWidth="0.8" strokeOpacity="0.12"/>);});
    DIAG_DIMS.forEach((_,i)=>{const a=Math.PI*2*i/n-Math.PI/2;elems.push(<line key={`ax${i}`} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} stroke={G} strokeWidth="0.8" strokeOpacity="0.12"/>);});
    const pts=DIAG_DIMS.map((d,i)=>{const a=Math.PI*2*i/n-Math.PI/2;const ratio=((scores[d.id]||1)-1)/4;return`${cx+Math.cos(a)*r*ratio},${cy+Math.sin(a)*r*ratio}`;}).join(" ");
    elems.push(<polygon key="data" points={pts} fill={GOLD} fillOpacity="0.18" stroke={GOLD} strokeWidth="1.8"/>);
    DIAG_DIMS.forEach((d,i)=>{const a=Math.PI*2*i/n-Math.PI/2;const ratio=((scores[d.id]||1)-1)/4;elems.push(<circle key={`dot${i}`} cx={cx+Math.cos(a)*r*ratio} cy={cy+Math.sin(a)*r*ratio} r="3.5" fill={GOLD}/>);elems.push(<text key={`lbl${i}`} x={cx+Math.cos(a)*(r+22)} y={cy+Math.sin(a)*(r+22)+4} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={G} fillOpacity="0.4">{d.num}</text>);});
    return elems;
  }
  return(<div>
    <TabBar tabs={[["input","01 — Score Inputs"],["results","02 — Results & Roadmap"]]} active={view} onChange={setView}/>
    {view==="input"&&(<div>
      <Callout><strong style={{color:GOLD}}>How to score:</strong> Read all five level descriptions and select the one that most accurately reflects your organisation right now — not your best project or your aspiration. If torn between two levels, choose the lower one.</Callout>
      <div style={{marginBottom:24}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{...mono,fontSize:10,color:"rgba(44,74,62,0.62)"}}>Scoring progress</span><strong style={{...mono,fontSize:10,color:GOLD}}>{scored} of 6 scored</strong></div><div style={{height:2,background:"rgba(44,74,62,0.1)",borderRadius:1}}><div style={{height:"100%",width:`${(scored/6)*100}%`,background:GOLD,borderRadius:1,transition:"width 0.4s"}}/></div></div>
      {DIAG_DIMS.map(dim=>{const s=scores[dim.id];const col=scoreColor(s);const isOpen=expanded[dim.id];return(<div key={dim.id} style={{background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.12)",marginBottom:2,overflow:"hidden"}}>
        <div onClick={()=>setExpanded(p=>({...p,[dim.id]:!p[dim.id]}))} style={{padding:"18px 22px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
          <div style={{display:"flex",gap:14,alignItems:"center",flex:1}}><span style={{...mono,fontSize:10,color:"rgba(212,168,71,0.55)"}}>{dim.num}</span><div><div style={{...serif,fontSize:15,fontWeight:700,color:TEXT}}>{dim.label}</div><div style={{fontSize:11,color:"rgba(44,74,62,0.92)",marginTop:2}}>{dim.tagline}</div></div></div>
          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            {s?<span style={{...mono,fontSize:9,color:col,background:`${col}18`,border:`1px solid ${col}44`,padding:"2px 8px",textTransform:"uppercase"}}>{s} — {SLABELS[s]}</span>:<span style={{...mono,fontSize:9,color:"rgba(44,74,62,0.9)",background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.18)",padding:"2px 8px"}}>Not scored</span>}
            <span style={{color:"rgba(44,74,62,0.62)",fontSize:10,transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
          </div>
        </div>
        {isOpen&&(<div style={{borderTop:"1px solid rgba(44,74,62,0.1)",padding:"0 22px 20px"}}>
          <div style={{fontSize:12,color:"rgba(44,74,62,0.72)",lineHeight:1.7,padding:"14px 0 16px",borderBottom:"1px solid rgba(247,244,239,0.05)",marginBottom:16,fontStyle:"italic"}}>{dim.intro}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:3}}>
            {dim.levels.map((lvl,i)=>{const isSel=s===i+1;return(<div key={i} onClick={()=>selectScore(dim.id,i+1)} style={{padding:"12px 10px 14px",cursor:"pointer",border:`2px solid ${isSel?lvl.color:"transparent"}`,background:lvl.bg,position:"relative",transition:"border-color 0.15s"}}>
              {isSel&&<div style={{position:"absolute",top:8,right:8,width:14,height:14,borderRadius:"50%",background:lvl.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:G,fontWeight:700}}>✓</div>}
              <div style={{...mono,fontSize:18,fontWeight:500,color:lvl.color,lineHeight:1}}>{i+1}</div>
              <div style={{...mono,fontSize:9,color:lvl.color,textTransform:"uppercase",letterSpacing:"0.08em",margin:"3px 0 8px"}}>{lvl.label}</div>
              <div style={{fontSize:11,color:isSel?"rgba(247,244,239,0.75)":"rgba(247,244,239,0.45)",lineHeight:1.5,marginBottom:8}}>{lvl.desc}</div>
              <ul style={{listStyle:"none"}}>{lvl.examples.map((ex,j)=><li key={j} style={{fontSize:10,color:isSel?"rgba(247,244,239,0.55)":"rgba(247,244,239,0.3)",lineHeight:1.5,paddingLeft:11,position:"relative",marginBottom:3}}><span style={{position:"absolute",left:0,color:"rgba(212,168,71,0.4)"}}>—</span>{ex}</li>)}</ul>
            </div>);})}
          </div>
        </div>)}
      </div>);})}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24,flexWrap:"wrap",gap:12}}>
        <span style={{...mono,fontSize:10,color:allScored?"rgba(212,168,71,0.7)":"rgba(247,244,239,0.27)"}}>{allScored?"All 6 scored — ready to generate results":"Score all 6 dimensions to generate results"}</span>
        <GBtn onClick={()=>setView("results")} disabled={!allScored}>Generate Results →</GBtn>
      </div>
    </div>)}
    {view==="results"&&avg&&(<div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,marginBottom:2}}>
        <Card gold style={{padding:28}}><SL>Overall Maturity Score</SL><div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:8}}><span style={{...serif,fontSize:56,fontWeight:700,color:GOLD,lineHeight:1}}>{avg.toFixed(1)}</span><span style={{...mono,fontSize:10,color:"rgba(44,74,62,0.92)",textTransform:"uppercase",letterSpacing:"0.1em",lineHeight:1.7}}>/ 5.0<br/>{ml}</span></div><div style={{...serif,fontSize:14,color:"rgba(44,74,62,0.88)",fontStyle:"italic",lineHeight:1.5,maxWidth:260,marginBottom:20}}>{avg<2.5?"Your organisation is at high risk of execution failure.":avg<3.5?"There are meaningful gaps between strategy and delivery.":avg<4.5?"Your foundation is sound — but gaps remain.":"Your organisation is executing with genuine discipline."}</div><div style={{display:"flex",gap:20}}>{[{l:"Critical",c:risks.length,col:RED},{l:"Caution",c:cautions.length,col:AMBER},{l:"Strength",c:strengths.length,col:G_MID}].map(s=><div key={s.l}><div style={{...serif,fontSize:26,fontWeight:700,color:s.col,lineHeight:1}}>{s.c}</div><div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.9)",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:3}}>{s.l}</div></div>)}</div></Card>
        <Card style={{padding:28,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><SL>Dimension Profile</SL><svg width="240" height="240" viewBox="0 0 260 260">{buildRadar()}</svg><div style={{display:"flex",flexWrap:"wrap",gap:"4px 12px",marginTop:8,justifyContent:"center"}}>{DIAG_DIMS.map(d=><div key={d.id} style={{...mono,fontSize:8,color:"rgba(44,74,62,0.62)"}}><span style={{color:GOLD}}>{d.num}</span> {d.label}</div>)}</div></Card>
      </div>
      <Card style={{padding:24,marginBottom:2}}><SL>Dimension Breakdown</SL>{DIAG_DIMS.map(dim=>{const s=scores[dim.id]||3;const col=scoreColor(s);return(<div key={dim.id} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5,alignItems:"baseline"}}><div style={{display:"flex",gap:8,alignItems:"baseline"}}><span style={{...mono,fontSize:9,color:"rgba(212,168,71,0.4)"}}>{dim.num}</span><span style={{...serif,fontSize:13,color:TEXT}}>{dim.label}</span></div><span style={{...mono,fontSize:10,color:col}}>{s} — {SLABELS[s]}</span></div><div style={{height:2,background:"rgba(44,74,62,0.1)",borderRadius:1}}><div style={{height:"100%",width:`${((s-1)/4)*100}%`,background:col,borderRadius:1,transition:"width 0.8s"}}/></div></div>);})}</Card>
      {risks.length>0&&<div style={{background:"rgba(185,64,64,0.06)",border:"1px solid rgba(185,64,64,0.25)",padding:24,marginBottom:2}}><SL color={RED}>⚠ Key Risk Areas</SL>{risks.map(dim=><div key={dim.id} style={{paddingLeft:16,borderLeft:`2px solid ${RED}`,marginBottom:16}}><div style={{...serif,fontSize:14,color:G,marginBottom:4}}>{dim.label}</div><div style={{fontSize:12,color:"rgba(44,74,62,0.88)",lineHeight:1.7}}>{DRISK[dim.id]}</div></div>)}</div>}
      <Card style={{padding:24,marginBottom:2}}><SL>Improvement Roadmap</SL>{[{label:"Immediate — Address First",dims:risks,color:RED,note:"These gaps are actively undermining execution. Act now — before the next major phase begins."},{label:"Short-Term — Strengthen",dims:cautions,color:AMBER,note:"Developing capability. Embed these into your programme plan in the next 90 days."},{label:"Sustain — Protect Strengths",dims:strengths,color:G_MID,note:"You have genuine capability here. Actively protect it — strengths erode under delivery pressure."}].filter(t=>t.dims.length>0).map((tier,ti)=><div key={ti} style={{marginBottom:28}}><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><div style={{width:6,height:6,borderRadius:"50%",background:tier.color,flexShrink:0}}/><span style={{...mono,fontSize:10,color:tier.color,textTransform:"uppercase",letterSpacing:"0.12em"}}>{tier.label}</span></div><p style={{fontSize:12,color:"rgba(44,74,62,0.9)",fontStyle:"italic",margin:"4px 0 12px 14px"}}>{tier.note}</p>{tier.dims.map(dim=><div key={dim.id} style={{marginBottom:12,paddingLeft:14}}><div style={{...serif,fontSize:13,color:"rgba(247,244,239,0.8)",marginBottom:5}}>{dim.label}</div>{DROAD[dim.id].map((a,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:3}}><span style={{color:GOLD,fontSize:11,marginTop:2,flexShrink:0}}>—</span><span style={{fontSize:12,color:"rgba(44,74,62,0.72)",lineHeight:1.6}}>{a}</span></div>)}</div>)}</div>)}</Card>
      <div style={{background:"rgba(212,168,71,0.07)",border:"1px solid rgba(212,168,71,0.3)",padding:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}><div><div style={{...serif,fontSize:16,color:G,marginBottom:4}}>Ready to close the gap?</div><div style={{fontSize:12,color:"rgba(44,74,62,0.92)"}}>Strategy Made Real works with leadership teams to turn strategy into disciplined execution.</div></div><div style={{display:"flex",gap:10,flexWrap:"wrap"}}><GBtn onClick={()=>exportDiagnostic({scores,dims:DIAG_DIMS,slabels:SLABELS,risks,cautions,strengths,roadmapActions:DROAD,riskMsgs:DRISK})}>↓ Download Report</GBtn><OBtn onClick={()=>setView("input")}>← Revise Inputs</OBtn></div></div>
    </div>)}
  </div>);
}

// ═══ TOOL 2 — INITIATIVE PRIORITISATION ══════════════════════════════════════
const PDIMS=[{id:"strategic",label:"Strategic Alignment",weight:0.28,tip:"1=No link to strategy / 3=Supports indirectly / 5=Core to top priority"},{id:"roi",label:"Return on Investment",weight:0.22,tip:"1=Unclear return / 3=Moderate ROI / 5=Strong ROI within 12mo"},{id:"complexity",label:"Delivery Complexity",weight:0.18,tip:"1=Extremely complex / 3=Moderate / 5=Well-defined low risk"},{id:"risk",label:"Delivery Risk",weight:0.16,tip:"1=High risk / 3=Moderate manageable / 5=Low risk proven approach"},{id:"capacity",label:"Organisational Capacity",weight:0.16,tip:"1=Severely overstretched / 3=Under pressure / 5=Clear capacity available"}];
const DCOLS=[GOLD,G_MID,"#3a6b8a",AMBER,"#7a9a8a"];
const PTIERS=[{label:"Do Now",color:GOLD,bg:"rgba(212,168,71,0.12)",border:"rgba(212,168,71,0.3)",min:3.8},{label:"Plan",color:G_MID,bg:"rgba(74,122,104,0.12)",border:"rgba(74,122,104,0.3)",min:2.8},{label:"Defer",color:"#3a6b8a",bg:"rgba(58,107,138,0.12)",border:"rgba(58,107,138,0.3)",min:2.0},{label:"Stop",color:RED,bg:"rgba(185,64,64,0.12)",border:"rgba(185,64,64,0.3)",min:0}];
function getTier(s){for(const t of PTIERS)if(s>=t.min)return t;return PTIERS[3];}
function calcW(sc){return Math.round(PDIMS.reduce((s,d)=>s+(sc[d.id]||0)*d.weight,0)*100)/100;}
const PSAMPLES=[{id:1,name:"ERP Finance Transformation",owner:"CFO",duration:4,scores:{strategic:5,roi:4,complexity:2,risk:2,capacity:3}},{id:2,name:"Customer Portal Redesign",owner:"CCO",duration:3,scores:{strategic:4,roi:4,complexity:3,risk:3,capacity:4}},{id:3,name:"Workforce Planning System",owner:"CHRO",duration:3,scores:{strategic:3,roi:3,complexity:3,risk:3,capacity:3}},{id:4,name:"Regulatory Compliance Uplift",owner:"CRO",duration:2,scores:{strategic:5,roi:3,complexity:4,risk:4,capacity:4}},{id:5,name:"Data & Analytics Platform",owner:"CTO",duration:4,scores:{strategic:4,roi:5,complexity:2,risk:2,capacity:2}},{id:6,name:"Branch Network Rationalisation",owner:"COO",duration:5,scores:{strategic:3,roi:4,complexity:1,risk:1,capacity:2}}];

function Tool2Prioritisation(){
  const[initiatives,setInitiatives]=useState([]);
  const[view,setView]=useState("input");
  const[fname,setFname]=useState(""),fowner=useState(""),fdur=useState("2"),fscores=useState({});
  const[fw,setFw]=useState("");const[fo,setFo]=useState("");const[fd,setFd]=useState("2");const[fs,setFs]=useState({});
  function addInit(){if(!fw.trim())return;if(!PDIMS.every(d=>fs[d.id]>0)){alert("Please score all 5 dimensions.");return;}const ws=calcW(fs);setInitiatives(p=>[...p,{id:Date.now(),name:fw.trim(),owner:fo||"—",duration:parseInt(fd),scores:{...fs},weightedScore:ws}]);setFw("");setFo("");setFd("2");setFs({});}
  function loadSample(){setInitiatives(PSAMPLES.map(s=>({...s,weightedScore:calcW(s.scores)})));}
  const sorted=[...initiatives].sort((a,b)=>b.weightedScore-a.weightedScore);
  const qs=[{label:"Q1",sub:"Now → 3 months",items:[]},{label:"Q2",sub:"3–6 months",items:[]},{label:"Q3",sub:"6–9 months",items:[]},{label:"Q4+",sub:"9–12+ months",items:[]}];
  sorted.filter(i=>getTier(i.weightedScore)!==PTIERS[3]).forEach(init=>{const tier=getTier(init.weightedScore);let q=tier===PTIERS[0]?0:tier===PTIERS[1]?1:2;while(qs[q].items.length>=3&&q<3)q++;qs[Math.min(q,3)].items.push(init);});
  return(<div>
    <TabBar tabs={[["input","01 — Add Initiatives"],["results","02 — Priority Ranking"],["sequence","03 — Delivery Sequence"],["resources","04 — Resource View"]]} active={view} onChange={setView}/>
    {view==="input"&&(<div>
      <Callout><strong style={{color:GOLD}}>How it works:</strong> Add each initiative and score across 5 weighted dimensions. Strategic Alignment carries 28% because it most reliably predicts execution success. Load sample data to explore first.</Callout>
      <Card style={{padding:22,marginBottom:12}}>
        <SL>+ Add Initiative</SL>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <div style={{gridColumn:"1/-1"}}><div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Initiative Name</div><input value={fw} onChange={e=>setFw(e.target.value)} placeholder="e.g. ERP Finance Transformation" style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"8px 11px",color:G,...sans,fontSize:13,outline:"none"}}/></div>
          <div><div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Owner</div><input value={fo} onChange={e=>setFo(e.target.value)} placeholder="e.g. CFO" style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"8px 11px",color:G,...sans,fontSize:13,outline:"none"}}/></div>
          <div><div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Duration</div><select value={fd} onChange={e=>setFd(e.target.value)} style={{width:"100%",background:BG,border:"1px solid rgba(44,74,62,0.18)",padding:"8px 11px",color:G,...mono,fontSize:11,outline:"none"}}>{[["1","< 3 months"],["2","3–6 months"],["3","6–12 months"],["4","12–18 months"],["5","18+ months"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:3,marginBottom:14}}>
          {PDIMS.map((dim,di)=>{const col=DCOLS[di];const val=fs[dim.id]||0;return(<div key={dim.id} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.1)",padding:"10px 10px 12px"}}>
            <div style={{...mono,fontSize:8,color:col,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>{dim.label} <span style={{color:"rgba(212,168,71,0.5)"}}>×{Math.round(dim.weight*100)}%</span></div>
            <div style={{fontSize:10,color:"rgba(44,74,62,0.62)",lineHeight:1.4,marginBottom:8}}>{dim.tip}</div>
            <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(n=><div key={n} onClick={()=>setFs(p=>({...p,[dim.id]:n}))} style={{flex:1,height:22,display:"flex",alignItems:"center",justifyContent:"center",...mono,fontSize:10,cursor:"pointer",border:`1px solid ${n<=val?col+"55":"rgba(247,244,239,0.1)"}`,background:n<=val?col+"22":"rgba(247,244,239,0.03)",color:n<=val?col:"rgba(247,244,239,0.3)",transition:"all 0.12s"}}>{n}</div>)}</div>
          </div>);})}
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><OBtn onClick={loadSample}>Load Sample Data</OBtn><GBtn onClick={addInit}>Add Initiative →</GBtn></div>
      </Card>
      <div style={{...mono,fontSize:10,color:"rgba(44,74,62,0.9)",letterSpacing:"0.1em",marginBottom:10}}>{initiatives.length} initiative{initiatives.length!==1?"s":""} added</div>
      {initiatives.length===0?(<div style={{padding:32,textAlign:"center",border:"1px dashed rgba(44,74,62,0.2)",background:"rgba(44,74,62,0.04)"}}><div style={{...serif,fontSize:14,color:"rgba(44,74,62,0.9)",fontStyle:"italic",marginBottom:4}}>No initiatives added yet</div><div style={{fontSize:11,color:"rgba(44,74,62,0.88)"}}>Add your first above, or load sample data to explore the model</div></div>):<div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:20}}>{initiatives.map(init=>{const tier=getTier(init.weightedScore);return(<div key={init.id} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}><div style={{flex:1,...serif,fontSize:13,color:TEXT}}>{init.name}</div><div style={{...mono,fontSize:10,color:"rgba(44,74,62,0.9)"}}>{init.owner}</div><div style={{display:"flex",gap:4}}>{PDIMS.map((d,di)=><div key={d.id} style={{width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",...mono,fontSize:9,fontWeight:700,background:DCOLS[di]+"22",color:DCOLS[di],border:`1px solid ${DCOLS[di]}44`}}>{init.scores[d.id]}</div>)}</div><div style={{...mono,fontSize:11,color:tier.color,minWidth:40,textAlign:"right"}}>{init.weightedScore.toFixed(2)}</div><button onClick={()=>setInitiatives(p=>p.filter(i=>i.id!==init.id))} style={{background:"none",border:"none",color:"rgba(44,74,62,0.58)",cursor:"pointer",fontSize:13}}>✕</button></div>);})}</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{...mono,fontSize:10,color:initiatives.length>=3?"rgba(212,168,71,0.65)":"rgba(247,244,239,0.27)"}}>{initiatives.length>=3?"Ready to generate rankings":`Add ${3-initiatives.length} more to generate results`}</span><GBtn onClick={()=>setView("results")} disabled={initiatives.length<3}>Generate Rankings →</GBtn></div>
    </div>)}
    {view==="results"&&(<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,marginBottom:2}}>{[{label:"Initiatives Scored",value:sorted.length,sub:`Avg: ${sorted.length?(sorted.reduce((s,i)=>s+i.weightedScore,0)/sorted.length).toFixed(2):"—"}/5.0`,color:GOLD},{label:"Do Now",value:sorted.filter(i=>getTier(i.weightedScore)===PTIERS[0]).length,sub:"Tier 1 — resource immediately",color:GOLD},{label:"Reconsider or Stop",value:sorted.filter(i=>getTier(i.weightedScore)===PTIERS[3]).length,sub:"Tier 4 — consuming capacity without return",color:RED}].map((s,i)=><Card key={i} gold={i===0} style={{padding:22}}><SL>{s.label}</SL><div style={{...serif,fontSize:36,fontWeight:700,color:s.color,lineHeight:1}}>{s.value}</div><div style={{fontSize:11,color:"rgba(44,74,62,0.92)",marginTop:4}}>{s.sub}</div></Card>)}</div>
      <Card style={{padding:24,marginBottom:2}}>
        <SL>Priority Ranking</SL>
        <div style={{display:"flex",gap:14,marginBottom:16,flexWrap:"wrap"}}>{PTIERS.map(t=><div key={t.label} style={{display:"flex",alignItems:"center",gap:6,...mono,fontSize:9,color:"rgba(44,74,62,0.72)",letterSpacing:"0.06em"}}><div style={{width:8,height:8,background:t.color}}/>{t.label}</div>)}</div>
        {sorted.map((init,idx)=>{const tier=getTier(init.weightedScore);const pct=(init.weightedScore/5)*100;return(<div key={init.id} style={{display:"grid",gridTemplateColumns:"32px 1fr auto auto",gap:14,alignItems:"center",padding:"12px 0",borderBottom:"1px solid rgba(247,244,239,0.05)"}}><div style={{...serif,fontSize:20,fontWeight:700,color:idx<3?GOLD:"rgba(247,244,239,0.2)"}}>{idx+1}</div><div><div style={{...serif,fontSize:14,color:TEXT}}>{init.name}</div><div style={{...mono,fontSize:10,color:"rgba(44,74,62,0.9)",marginTop:2}}>{init.owner} · {["<3mo","3–6mo","6–12mo","12–18mo","18+mo"][init.duration-1]}</div></div><span style={{...mono,fontSize:9,color:tier.color,background:tier.bg,border:`1px solid ${tier.border}`,padding:"2px 7px",textTransform:"uppercase",letterSpacing:"0.08em"}}>{tier.label}</span><div style={{textAlign:"right"}}><div style={{...mono,fontSize:13,color:tier.color,fontWeight:500}}>{init.weightedScore.toFixed(2)}</div><div style={{height:2,width:60,background:"rgba(44,74,62,0.1)",marginTop:4}}><div style={{height:"100%",width:`${pct}%`,background:tier.color}}/></div></div></div>);})}
      </Card>
    <div style={{marginTop:16,display:"flex",justifyContent:"flex-end"}}><GBtn onClick={()=>exportPrioritisation({initiatives,tiers:PTIERS})}>↓ Download Report</GBtn></div>
    </div>)}
    {view==="sequence"&&(<div>
      <Callout><strong style={{color:GOLD}}>Delivery Sequencing</strong> — Initiatives sequenced across four quarters based on priority tier and delivery complexity.</Callout>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2}}>{qs.map((q,qi)=><div key={qi} style={{border:"1px solid rgba(44,74,62,0.12)",overflow:"hidden"}}><div style={{background:"rgba(44,74,62,0.06)",padding:"10px 12px",borderBottom:"1px solid rgba(247,244,239,0.07)"}}><div style={{...mono,fontSize:10,color:"rgba(44,74,62,0.9)",letterSpacing:"0.12em",textTransform:"uppercase"}}>{q.label}</div><div style={{fontSize:11,color:"rgba(44,74,62,0.58)",marginTop:2}}>{q.sub} · {q.items.length} item{q.items.length!==1?"s":""}</div></div><div style={{padding:8,minHeight:80}}>{q.items.length===0?<div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.78)",textAlign:"center",paddingTop:16}}>—</div>:q.items.map(init=>{const tier=getTier(init.weightedScore);return(<div key={init.id} style={{borderLeft:`3px solid ${tier.color}`,background:"rgba(44,74,62,0.06)",padding:"8px 10px",marginBottom:5}}><div style={{...serif,fontSize:11,color:G,marginBottom:2}}>{init.name}</div><div style={{...mono,fontSize:8,color:tier.color}}>{init.owner} · {init.weightedScore.toFixed(2)}</div></div>);})}</div></div>)}</div>
    </div>)}
    {view==="resources"&&(<div>
      <Callout><strong style={{color:GOLD}}>Resource Allocation View</strong> — Priority score vs resource demand for every initiative.</Callout>
      <div style={{display:"flex",flexDirection:"column",gap:2}}>{sorted.map(init=>{const tier=getTier(init.weightedScore);const dr=(6-init.scores.complexity)+(6-init.scores.risk)+(6-init.scores.capacity);const dp=Math.min(Math.round((dr/15)*100),100);const pp=Math.round((init.weightedScore/5)*100);const dc=dp>70?RED:dp>40?AMBER:G_MID;const dl=dp>70?"High Demand":dp>40?"Moderate":"Low Demand";return(<div key={init.id} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",padding:"14px 18px",display:"grid",gridTemplateColumns:"200px 1fr auto",gap:14,alignItems:"center"}}><div><div style={{...serif,fontSize:13,color:TEXT}}>{init.name}</div><div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.9)",marginTop:2}}>{init.owner}</div></div><div>{[["Priority Score",pp,init.weightedScore.toFixed(1),tier.color],["Resource Demand",dp,dl.split(" ")[0],dc]].map(([label,pct,val,col])=><div key={label} style={{display:"flex",gap:8,alignItems:"center",marginBottom:5}}><span style={{...mono,fontSize:9,color:"rgba(44,74,62,0.62)",width:110}}>{label}</span><div style={{flex:1,height:5,background:"rgba(44,74,62,0.1)",borderRadius:3}}><div style={{height:"100%",width:`${pct}%`,background:col,borderRadius:3}}/></div><span style={{...mono,fontSize:10,color:col,width:36}}>{val}</span></div>)}</div><div style={{...mono,fontSize:10,color:dc,textAlign:"right"}}>{dl}</div></div>);})}
      </div>
    </div>)}
  </div>);
}

// ═══ TOOL 3 — DECISION STACK ══════════════════════════════════════════════════
const DDIMS=[{id:"strategic",label:"Strategic Alignment",weight:0.25,guidance:"How directly does this option advance the organisation's stated strategy and top priorities?"},{id:"longterm",label:"Long-Term Benefit",weight:0.20,guidance:"What durable value does this option create over 3–5 years?"},{id:"shortterm",label:"Short-Term Benefit",weight:0.15,guidance:"What value is realised in the first 12 months?"},{id:"cost",label:"Cost",weight:0.15,guidance:"Score high if the cost is affordable and proportionate to return. Score low if cost is excessive or uncertain."},{id:"impact",label:"People & Org Impact",weight:0.13,guidance:"Score high if the people impact is manageable and well-supported. Score low if disruption is severe or unsupported."},{id:"complexity",label:"Complexity",weight:0.12,guidance:"Score high if this option is straightforward to execute. Score low if it involves significant unknowns."}];
const OCOLS=[GOLD,G_MID,"#3a6b8a"];
const OLIGHTS=["rgba(212,168,71,0.08)","rgba(74,122,104,0.08)","rgba(58,107,138,0.08)"];
const OLABELS=["Full Commitment","Partial / Phased","Do Nothing"];

function Tool3DecisionStack(){
  const[step,setStep]=useState("setup");
  const[title,setTitle]=useState("");
  const[names,setNames]=useState(["","",""]);
  const[descs,setDescs]=useState(["","",""]);
  const[scores,setScores]=useState({a:{},b:{},c:{}});
  const opts=["a","b","c"];
  function setOS(opt,dimId,val){setScores(p=>({...p,[opt]:{...p[opt],[dimId]:val}}));}
  function getW(opt){return Math.round(DDIMS.reduce((s,d)=>s+((scores[opt][d.id]||0)*d.weight),0)*100)/100;}
  const ws={a:getW("a"),b:getW("b"),c:getW("c")};
  const winner=Object.entries(ws).sort((x,y)=>y[1]-x[1])[0][0];
  const wi=opts.indexOf(winner);
  const allScored=opts.every(opt=>DDIMS.every(d=>scores[opt][d.id]>0));
  function buildRadar(){
    const n=DDIMS.length,cx=160,cy=160,r=110,elems=[];
    [0.2,0.4,0.6,0.8,1].forEach(lv=>{const pts=DDIMS.map((_,i)=>{const a=Math.PI*2*i/n-Math.PI/2;return`${cx+Math.cos(a)*r*lv},${cy+Math.sin(a)*r*lv}`;}).join(" ");elems.push(<polygon key={`g${lv}`} points={pts} fill="none" stroke={G} strokeWidth="0.7" strokeOpacity="0.12"/>);});
    DDIMS.forEach((_,i)=>{const a=Math.PI*2*i/n-Math.PI/2;elems.push(<line key={`ax${i}`} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} stroke={G} strokeWidth="0.7" strokeOpacity="0.12"/>);});
    DDIMS.forEach((d,i)=>{const a=Math.PI*2*i/n-Math.PI/2;const lx=cx+Math.cos(a)*(r+22),ly=cy+Math.sin(a)*(r+22);elems.push(<text key={`lbl${i}`} x={lx} y={ly+4} textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill={G} fillOpacity="0.4">{d.label.split(" ")[0]}</text>);});
    opts.forEach((opt,oi)=>{const col=OCOLS[oi];const pts=DDIMS.map((d,i)=>{const a=Math.PI*2*i/n-Math.PI/2;const ratio=((scores[opt][d.id]||1)-1)/4;return`${cx+Math.cos(a)*r*ratio},${cy+Math.sin(a)*r*ratio}`;}).join(" ");elems.push(<polygon key={`poly${opt}`} points={pts} fill={col} fillOpacity="0.12" stroke={col} strokeWidth="1.8" strokeOpacity="0.8"/>);DDIMS.forEach((d,i)=>{const a=Math.PI*2*i/n-Math.PI/2;const ratio=((scores[opt][d.id]||1)-1)/4;elems.push(<circle key={`dot${opt}${i}`} cx={cx+Math.cos(a)*r*ratio} cy={cy+Math.sin(a)*r*ratio} r="3" fill={col}/>);});});
    return elems;
  }
  return(<div>
    <TabBar tabs={[["setup","01 — Set Up"],["score","02 — Score Options"],["result","03 — The Stack"]]} active={step} onChange={s=>s!=="result"?setStep(s):(allScored&&setStep(s))}/>
    {step==="setup"&&(<div>
      <div style={{background:"rgba(44,74,62,0.06)",border:"1px solid rgba(212,168,71,0.15)",padding:24,marginBottom:24}}>
        <div style={{...serif,fontSize:18,fontWeight:700,color:G,marginBottom:8}}>The Mental Model</div>
        <div style={{fontSize:13,color:"rgba(44,74,62,0.88)",lineHeight:1.7,marginBottom:18}}>Most change decisions are held hostage by the wrong question — "should we do this?" The right question is "which version of this gives us the best return on disruption?" The Decision Stack forces three options into the same room and lets the evidence decide.</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>{[["A","Full commitment","The complete change. Maximum investment, maximum potential. Name it honestly.",OCOLS[0],OLIGHTS[0]],["B","Partial or phased","Scoped-down or staged. Lower cost and risk — but does it still deliver enough value to justify the disruption?",OCOLS[1],OLIGHTS[1]],["C","Do nothing","Not absence of risk — presence of a different risk. Naming this forces the room to confront what inaction actually costs.",OCOLS[2],OLIGHTS[2]]].map(([letter,t,desc,col,bg])=><div key={letter} style={{background:bg,borderTop:`3px solid ${col}`,padding:"14px 16px"}}><div style={{...mono,fontSize:9,color:col,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:4}}>Option {letter}</div><div style={{...serif,fontSize:14,fontWeight:700,color:G,marginBottom:6}}>{t}</div><div style={{fontSize:11,color:"rgba(44,74,62,0.72)",lineHeight:1.6}}>{desc}</div></div>)}</div>
      </div>
      <Card style={{padding:22,marginBottom:12}}>
        <SL>Name the Decision</SL>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Finance ERP Transformation" style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"9px 12px",color:G,...sans,fontSize:13,outline:"none",marginBottom:18}}/>
        <SL>Name the Three Options</SL>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>{opts.map((opt,i)=><div key={opt}><div style={{...mono,fontSize:9,color:OCOLS[i],letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Option {opt.toUpperCase()} — {OLABELS[i]}</div><input value={names[i]} onChange={e=>{const n=[...names];n[i]=e.target.value;setNames(n);}} placeholder={["e.g. Full ERP implementation","e.g. Phase 1 only: GL & AP","e.g. Continue on legacy system"][i]} style={{width:"100%",background:OLIGHTS[i],border:`1px solid ${OCOLS[i]}33`,padding:"8px 11px",color:G,...sans,fontSize:12,outline:"none",marginBottom:6}}/></div>)}</div>
      </Card>
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:16}}><GBtn onClick={()=>setStep("score")} disabled={!title.trim()||names.some(n=>!n.trim())}>Score the Options →</GBtn></div>
    </div>)}
    {step==="score"&&(<div>
      <Callout>Score each option 1–5 on every dimension. <strong style={{color:GOLD}}>Higher is always better</strong> — for cost and complexity, score high if the option is affordable or simple.</Callout>
      <div style={{display:"grid",gridTemplateColumns:"200px repeat(3,1fr)",gap:2,marginBottom:2}}><div/>{opts.map((opt,i)=><div key={opt} style={{background:OLIGHTS[i],border:`1px solid ${OCOLS[i]}22`,padding:"10px 12px"}}><div style={{...mono,fontSize:9,color:OCOLS[i],letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>Option {opt.toUpperCase()}</div><div style={{...serif,fontSize:13,fontWeight:700,color:TEXT}}>{names[i]||`Option ${opt.toUpperCase()}`}</div></div>)}</div>
      {DDIMS.map(dim=><div key={dim.id} style={{display:"grid",gridTemplateColumns:"200px repeat(3,1fr)",gap:2,marginBottom:2}}><div style={{background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.1)",padding:"12px 14px",display:"flex",flexDirection:"column",justifyContent:"center"}}><div style={{...serif,fontSize:13,color:G,marginBottom:3}}>{dim.label}</div><div style={{fontSize:10,color:"rgba(44,74,62,0.62)",lineHeight:1.5,marginBottom:4}}>{dim.guidance}</div><div style={{...mono,fontSize:9,color:"rgba(212,168,71,0.45)"}}>Weight: {Math.round(dim.weight*100)}%</div></div>{opts.map((opt,oi)=>{const val=scores[opt][dim.id]||0;const col=OCOLS[oi];return(<div key={opt} style={{background:OLIGHTS[oi],border:`1px solid ${col}15`,padding:"12px"}}><div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(n=><div key={n} onClick={()=>setOS(opt,dim.id,n)} style={{flex:1,height:24,display:"flex",alignItems:"center",justifyContent:"center",...mono,fontSize:11,cursor:"pointer",border:`1px solid ${n<=val?col+"55":"rgba(247,244,239,0.1)"}`,background:n<=val?col+"22":"rgba(247,244,239,0.03)",color:n<=val?col:"rgba(247,244,239,0.3)",transition:"all 0.12s"}}>{n}</div>)}</div></div>);})}
      </div>)}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}><OBtn onClick={()=>setStep("setup")}>← Back</OBtn><GBtn onClick={()=>setStep("result")} disabled={!allScored}>Generate The Stack →</GBtn></div>
    </div>)}
    {step==="result"&&(<div>
      <div style={{borderLeft:`4px solid ${OCOLS[wi]}`,background:"rgba(44,74,62,0.06)",padding:"24px 28px",marginBottom:2}}><div style={{...mono,fontSize:10,color:OCOLS[wi],letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:6}}>The Stack recommends</div><div style={{...serif,fontSize:24,fontWeight:700,color:G,marginBottom:8}}>{names[wi]||`Option ${winner.toUpperCase()}`}</div><div style={{fontSize:13,color:"rgba(44,74,62,0.78)",lineHeight:1.7,maxWidth:580}}>{winner==="a"?"The full commitment option scores highest across the dimensions that matter. The investment appears proportionate to the strategic return.":winner==="b"?"The phased approach delivers meaningful value at lower risk. It may not capture the full strategic opportunity — but it is the option the organisation can most confidently execute.":"The analysis suggests that neither current change option clears the bar. The case for change needs strengthening before a resource commitment is made."}</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,marginBottom:2}}>{opts.map((opt,i)=>{const col=OCOLS[i];const score=ws[opt];const isW=opt===winner;return(<div key={opt} style={{background:"rgba(44,74,62,0.05)",border:`1px solid ${isW?"rgba(212,168,71,0.3)":"rgba(247,244,239,0.07)"}`,padding:22,position:"relative"}}>{isW&&<div style={{position:"absolute",top:-1,right:14,background:GOLD,color:G,...mono,fontSize:8,letterSpacing:"0.1em",textTransform:"uppercase",padding:"2px 7px"}}>Recommended</div>}<div style={{...mono,fontSize:9,color:col,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>Option {opt.toUpperCase()}</div><div style={{...serif,fontSize:14,fontWeight:700,color:G,marginBottom:14}}>{names[i]||OLABELS[i]}</div><div style={{...serif,fontSize:44,fontWeight:700,color:col,lineHeight:1}}>{score.toFixed(2)}</div><div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.9)",letterSpacing:"0.08em",marginBottom:16}}>/ 5.0</div>{DDIMS.map(d=>{const val=scores[opt][d.id]||0;return(<div key={d.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:10,color:"rgba(44,74,62,0.92)",flex:1}}>{d.label}</span><div style={{width:50,height:2,background:"rgba(247,244,239,0.08)"}}><div style={{height:"100%",width:`${(val/5)*100}%`,background:`${col}88`,borderBottom:`1.5px solid ${col}`}}/></div><span style={{...mono,fontSize:10,color:col,minWidth:12}}>{val}</span></div>);})}</div>);})}
      </div>
      <Card style={{padding:24,display:"flex",flexDirection:"column",alignItems:"center",marginBottom:2}}><SL>Dimension Profile — All Three Options</SL><svg width="300" height="300" viewBox="0 0 320 320">{buildRadar()}</svg><div style={{display:"flex",gap:18,marginTop:10}}>{opts.map((opt,i)=><div key={opt} style={{display:"flex",alignItems:"center",gap:6,...mono,fontSize:9,color:"rgba(44,74,62,0.72)"}}><div style={{width:8,height:8,borderRadius:"50%",background:OCOLS[i]}}/>{names[i]||`Option ${opt.toUpperCase()}`}</div>)}</div></Card>
      <Card style={{padding:24,marginBottom:2}}><SL>Before You Decide</SL><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[[OCOLS[0],"If you choose Option A",`${names[0]||"Option A"} — What does success look like in 12 months? Who owns the decision to stop if delivery fails?`],[OCOLS[1],"If you choose Option B",`${names[1]||"Option B"} — Is this genuinely strategic or a way to avoid the harder conversation? When is the decision point to scale up?`],[OCOLS[2],"If you choose Option C",`${names[2]||"Option C"} — What is the cost of inaction compounding over 12–24 months? Is this a decision to stop, or a decision to wait?`],["rgba(247,244,239,0.3)","Before any option","What assumption, if proven wrong, would change this decision? Who needs to own this decision — not just approve it? What would you need to see in 90 days to confirm you chose correctly?"]].map(([col,label,text])=><div key={label} style={{borderLeft:`3px solid ${col}`,background:"rgba(44,74,62,0.03)",padding:"14px 16px"}}><div style={{...mono,fontSize:9,color:col,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>{label}</div><div style={{fontSize:12,color:"rgba(44,74,62,0.72)",lineHeight:1.6}}>{text}</div></div>)}</div></Card>
      <div style={{background:"rgba(212,168,71,0.07)",border:"1px solid rgba(212,168,71,0.3)",padding:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}><div><div style={{...serif,fontSize:16,color:G,marginBottom:4}}>Turn this into a decision your leadership team owns.</div><div style={{fontSize:12,color:"rgba(44,74,62,0.92)"}}>Strategy Made Real facilitates structured decision sessions that move from The Stack to a committed, documented decision in a single session.</div></div><div style={{display:"flex",gap:10,flexWrap:"wrap"}}><GBtn onClick={()=>exportDecisionStack({title,names,scores,ws,winner,dims:DDIMS})}>↓ Download Report</GBtn><OBtn onClick={()=>setStep("setup")}>← Start Over</OBtn></div></div>
    </div>)}
  </div>);
}

// ═══ TOOL 4 — ROLE & STRATEGY ANALYSER ════════════════════════════════════════
function Tool4RoleAnalyser(){
  const[form,setForm]=useState({role:"",org:"",level:"",reports:"",context:"",pillars:"",challenges:""});
  const[loading,setLoading]=useState(false);
  const[result,setResult]=useState(null);
  const[error,setError]=useState("");
  const[open,setOpen]=useState({});
  async function analyse(){
    if(!form.role.trim()||!form.org.trim())return;
    setLoading(true);setError("");setResult(null);
    try{
      const jsonStructure = '{"roleContext":{"title":"string","function":"string","reportsTo":"string","location":"string"},"purposeAndStrategy":{"organisationPurpose":"string","roleContribution":"string"},"successInBusiness":"string","roleSuccessStatement":"string","accountabilityPillars":["pillar1","pillar2","pillar3","pillar4","pillar5"],"responsibilitiesByPillar":[{"pillar":"string","purpose":"string","responsibilities":["r1","r2","r3"]}],"keyCompetencies":[{"name":"string","description":"string"}],"whatSuccessLooksLike":[{"areaOfFocus":"string","purpose":"string","keyActivities":["a1","a2","a3"]}],"circleOfInfluence":{"internal":["s1","s2"],"external":["s1","s2"]},"valuesAndBehaviours":[{"value":"string","description":"string"}],"timeBasedMetrics":{"quarterly":["q1","q2","q3"],"sixMonth":["g1","g2","g3"],"annual":["a1","a2","a3"]}}';
      const prompt = "You are an expert organisational design consultant. Generate a Role Success Profile. Write in Australian English. Be practical, clear and structured. Avoid corporate jargon. Use bullet points. Output ONLY valid JSON with no markdown or backticks." +
        " Role Title: " + form.role +
        " Organisation: " + form.org +
        " Level: " + (form.level || "Not specified") +
        " Direct Reports: " + (form.reports || "Not specified") +
        " Context: " + (form.context || "Not specified") +
        " Strategic Pillars: " + (form.pillars || "Not specified") +
        " Key Challenges: " + (form.challenges || "Not specified") +
        " Return this exact JSON structure: " + jsonStructure +
        " Rules: Australian spelling. Plain language. No jargon. 5-8 accountability pillars. 6-10 competencies. 3-5 quarterly priorities. 3-5 six-month goals. 3-5 annual measures.";
      const response=await fetch("/api/analyse",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,messages:[{role:"user",content:prompt}]})});
      const data=await response.json();
      const text=data.content?.[0]?.text||"";
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      setResult(parsed);setOpen({"1":true});
    }catch(e){setError("Something went wrong generating the analysis. Please check your inputs and try again.");}
    setLoading(false);
  }
  const sections=result?[
    {id:"1",num:"01",title:"Role Context & Purpose",content:(<div>
      <div style={{background:"rgba(44,74,62,0.08)",border:"1px solid rgba(212,168,71,0.2)",padding:20,marginBottom:12}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[["Role Title",result.roleContext?.title||form.role],["Reports To",result.roleContext?.reportsTo||"—"],["Function",result.roleContext?.function||"—"],["Location",result.roleContext?.location||"—"]].map(([l,v])=><div key={l}><div style={{...mono,fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>{l}</div><div style={{fontSize:13,color:TEXT}}>{v}</div></div>)}
        </div>
      </div>
      <div style={{marginBottom:10}}><div style={{...mono,fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Organisation Purpose</div><div style={{fontSize:13,color:"rgba(44,74,62,0.88)",lineHeight:1.6}}>{result.purposeAndStrategy?.organisationPurpose}</div></div>
      <div><div style={{...mono,fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Strategic Contribution</div><div style={{fontSize:13,color:"rgba(44,74,62,0.88)",lineHeight:1.6}}>{result.purposeAndStrategy?.roleContribution}</div></div>
    </div>)},
    {id:"2",num:"02",title:"Role Success Statement",content:(<div>
      <div style={{background:"rgba(44,74,62,0.05)",border:"1px solid rgba(212,168,71,0.15)",padding:22,marginBottom:14}}><div style={{...serif,fontSize:14,color:G,lineHeight:1.7}}>{result.roleSuccessStatement}</div></div>
      <div style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",padding:16}}><div style={{...mono,fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Success in This Business</div><div style={{fontSize:12,color:"rgba(44,74,62,0.9)",lineHeight:1.7}}>{result.successInBusiness}</div></div>
    </div>)},
    {id:"3",num:"03",title:"Core Accountability Pillars",content:(<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
      {result.accountabilityPillars?.map((p,i)=><div key={i} style={{background:"rgba(44,74,62,0.06)",border:`1px solid ${GOLD}33`,borderTop:`3px solid ${GOLD}`,padding:"14px 16px"}}><div style={{...mono,fontSize:9,color:GOLD,marginBottom:4}}>{String(i+1).padStart(2,"0")}</div><div style={{...serif,fontSize:13,fontWeight:700,color:TEXT}}>{p}</div></div>)}
    </div>)},
    {id:"4",num:"04",title:"Responsibilities by Pillar",content:(<div style={{display:"flex",flexDirection:"column",gap:2}}>
      {result.responsibilitiesByPillar?.map((pillar,i)=><div key={i} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",padding:"16px 20px",borderLeft:`3px solid ${GOLD}`}}>
        <div style={{...serif,fontSize:14,fontWeight:700,color:G,marginBottom:4}}>{pillar.pillar}</div>
        <div style={{fontSize:12,color:"rgba(44,74,62,0.88)",fontStyle:"italic",lineHeight:1.5,marginBottom:10}}>{pillar.purpose}</div>
        <ul style={{listStyle:"none"}}>{pillar.responsibilities?.map((r,j)=><li key={j} style={{fontSize:12,color:"rgba(44,74,62,0.9)",lineHeight:1.5,paddingLeft:14,position:"relative",marginBottom:5}}><span style={{position:"absolute",left:0,color:GOLD}}>—</span>{r}</li>)}</ul>
      </div>)}
    </div>)},
    {id:"5",num:"05",title:"Key Competencies",content:(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      {result.keyCompetencies?.map((c,i)=><div key={i} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",padding:"12px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
        <span style={{...mono,fontSize:11,color:GOLD,fontWeight:700,flexShrink:0}}>{String(i+1).padStart(2,"0")}</span>
        <div><div style={{...serif,fontSize:13,fontWeight:700,color:G,marginBottom:3}}>{c.name}</div><div style={{fontSize:12,color:"rgba(44,74,62,0.88)",lineHeight:1.5}}>{c.description}</div></div>
      </div>)}
    </div>)},
    {id:"6",num:"06",title:"What Success Looks Like",content:(<div>
      {result.whatSuccessLooksLike?.map((item,i)=><div key={i} style={{marginBottom:16,background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",padding:"14px 18px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:8}}>
          <div><div style={{...mono,fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Area of Focus</div><div style={{...serif,fontSize:13,fontWeight:700,color:TEXT}}>{item.areaOfFocus}</div></div>
          <div><div style={{...mono,fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Purpose</div><div style={{fontSize:12,color:"rgba(44,74,62,0.9)",lineHeight:1.5}}>{item.purpose}</div></div>
        </div>
        <div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Key Activities & Measures</div>
        <ul style={{listStyle:"none"}}>{item.keyActivities?.map((a,j)=><li key={j} style={{fontSize:12,color:"rgba(44,74,62,0.9)",lineHeight:1.5,paddingLeft:14,position:"relative",marginBottom:4}}><span style={{position:"absolute",left:0,color:GOLD}}>—</span>{a}</li>)}</ul>
      </div>)}
    </div>)},
    {id:"7",num:"07",title:"Circle of Influence",content:(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      {[["Key Internal Relationships",result.circleOfInfluence?.internal,GOLD],["Key External Relationships",result.circleOfInfluence?.external,"#3a6b8a"]].map(([label,items,col])=><div key={label} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",borderTop:`3px solid ${col}`,padding:16}}><div style={{...mono,fontSize:9,color:col,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>{label}</div>{items?.map((item,i)=><div key={i} style={{fontSize:12,color:"rgba(44,74,62,0.9)",lineHeight:1.5,paddingLeft:12,position:"relative",marginBottom:4}}><span style={{position:"absolute",left:0,color:col,fontSize:10}}>—</span>{item}</div>)}</div>)}
    </div>)},
    {id:"8",num:"08",title:"Values & Behaviour Alignment",content:(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      {result.valuesAndBehaviours?.map((v,i)=><div key={i} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",padding:"12px 14px"}}><div style={{...serif,fontSize:13,fontWeight:700,color:G,marginBottom:4}}>{v.value}</div><div style={{fontSize:12,color:"rgba(44,74,62,0.78)",lineHeight:1.5}}>{v.description}</div></div>)}
    </div>)},
    {id:"9",num:"09",title:"Time-Based Success Metrics",content:(<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
      {[["Quarterly Priorities",result.timeBasedMetrics?.quarterly,GOLD],["6-Month Goals",result.timeBasedMetrics?.sixMonth,G_MID],["Annual Measures",result.timeBasedMetrics?.annual,"#3a6b8a"]].map(([label,items,col])=><div key={label} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",borderTop:`3px solid ${col}`,padding:16}}><div style={{...mono,fontSize:9,color:col,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>{label}</div>{items?.map((item,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}><span style={{...mono,fontSize:10,color:col,fontWeight:700,flexShrink:0}}>{i+1}</span><span style={{fontSize:12,color:"rgba(44,74,62,0.9)",lineHeight:1.5}}>{item}</span></div>)}</div>)}
    </div>)},
  ]:[];
  return(<div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:0,minHeight:600}}>
    <div style={{borderRight:"1px solid rgba(44,74,62,0.12)",padding:"24px 20px",background:"rgba(44,74,62,0.04)"}}>
      <SL>Role Details</SL>
      {[["role","Role Title *","e.g. Head of Customer Experience"],["org","Organisation *","e.g. Regional Bank"],["level","Level / Seniority","e.g. Senior Manager"],["reports","Direct Reports","e.g. 4 direct, 12 total"]].map(([key,label,ph])=><div key={key} style={{marginBottom:10}}><div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>{label}</div><input value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} placeholder={ph} style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"8px 11px",color:G,...sans,fontSize:12,outline:"none"}}/></div>)}
      <div style={{height:1,background:"rgba(247,244,239,0.07)",margin:"16px 0"}}/>
      <SL>Context</SL>
      {[["context","Organisational Context","What is happening right now? Key priorities, changes underway, pressures..."],["pillars","Strategic Pillars","e.g. Customer first, operational excellence, digital transformation"],["challenges","Key Challenges","What are the biggest challenges this role needs to solve?"]].map(([key,label,ph])=><div key={key} style={{marginBottom:10}}><div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>{label}</div><textarea value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} placeholder={ph} rows={3} style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"8px 11px",color:G,...sans,fontSize:12,outline:"none",resize:"vertical",lineHeight:1.5}}/></div>)}
      <GBtn onClick={analyse} disabled={loading||!form.role.trim()||!form.org.trim()} style={{width:"100%",marginTop:8}}>{loading?"Analysing...":"Generate Analysis →"}</GBtn>
      {result&&<button onClick={()=>setResult(null)} style={{width:"100%",background:"transparent",border:"1px solid rgba(44,74,62,0.18)",color:"rgba(44,74,62,0.62)",padding:"9px",...mono,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",marginTop:8}}>Clear & Start Over</button>}
    </div>
    <div style={{padding:"24px 28px"}}>
      {loading&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400,textAlign:"center"}}><div style={{width:44,height:44,border:"3px solid rgba(212,168,71,0.15)",borderTop:`3px solid ${GOLD}`,borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 18px"}}/><div style={{...mono,fontSize:11,color:"rgba(44,74,62,0.92)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Analysing role...</div><div style={{fontSize:12,color:"rgba(44,74,62,0.9)",marginTop:6,fontStyle:"italic"}}>Building your strategy playbook</div></div>}
      {error&&<div style={{background:"rgba(185,64,64,0.1)",border:"1px solid rgba(185,64,64,0.25)",padding:18,fontSize:13,color:"rgba(44,74,62,0.9)",lineHeight:1.6}}>{error}</div>}
      {!loading&&!result&&!error&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400,textAlign:"center"}}><div style={{opacity:0.1,marginBottom:20}}><div style={{width:60,height:60,borderRadius:"50%",background:"rgba(212,168,71,0.1)",border:"2px solid rgba(212,168,71,0.2)"}}/></div><div style={{...serif,fontSize:20,color:"rgba(44,74,62,0.9)",marginBottom:6}}>Enter role details to begin</div><div style={{fontSize:12,color:"rgba(44,74,62,0.58)",lineHeight:1.6,maxWidth:280}}>Fill in the role title and organisation, add context, and generate a full role and strategy analysis.</div></div>}
      {result&&<div>
        <div style={{marginBottom:24,paddingBottom:18,borderBottom:"1px solid rgba(44,74,62,0.1)"}}><div style={{...serif,fontSize:26,fontWeight:700,color:G,marginBottom:4}}>{form.role}</div><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:8}}>{[form.org,form.level,form.reports].filter(Boolean).map((m,i)=><span key={i} style={{...mono,fontSize:10,color:"rgba(44,74,62,0.72)",background:"rgba(44,74,62,0.06)",border:"1px solid rgba(44,74,62,0.18)",padding:"2px 9px"}}>{m}</span>)}</div></div>
        {sections.map(sec=><div key={sec.id} style={{marginBottom:2,background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.1)"}}><div onClick={()=>setOpen(p=>({...p,[sec.id]:!p[sec.id]}))} style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}><span style={{...mono,fontSize:10,color:GOLD}}>{sec.num}</span><span style={{...serif,fontSize:15,fontWeight:700,color:TEXT}}>{sec.title}</span><span style={{marginLeft:"auto",color:"rgba(44,74,62,0.62)",fontSize:10,transform:open[sec.id]?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span></div>{open[sec.id]&&<div style={{padding:"0 18px 18px"}}>{sec.content}</div>}</div>)}
      {result&&<div style={{marginTop:16,display:"flex",justifyContent:"flex-end"}}><GBtn onClick={()=>exportRoleAnalyser({form,result})}>↓ Download Report</GBtn></div>}
      </div>}
    </div>
  </div>);
}

// ═══ TOOLS 5-8 DATA CONSTANTS ════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────────
// SMR STRATEGY EXECUTION SUITE — TOOLS 5, 6, 7, 8
// Paste these four components into your main App.jsx alongside Tools 1–4
// Then register them in the TOOLS array and add to the router at the bottom
// ─────────────────────────────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════
// TOOL 5 — OPERATING RHYTHM BUILDER
// "How do we run it?"
// ═════════════════════════════════════════════════════════════════════════════
const CADENCE_OPTIONS = [
  { id:"daily",     label:"Daily",     sub:"Stand-ups, escalations, blockers" },
  { id:"weekly",    label:"Weekly",    sub:"Team check-ins, progress reporting" },
  { id:"fortnightly",label:"Fortnightly",sub:"Workstream reviews, decisions" },
  { id:"monthly",   label:"Monthly",   sub:"Programme board, performance review" },
  { id:"quarterly", label:"Quarterly", sub:"Strategy review, portfolio health" },
];
const MEETING_TYPES = [
  { id:"standup",    label:"Daily Stand-up",        purpose:"Surface blockers and align on day priorities", duration:"15 min", attendees:"Delivery team", owner:"Team Lead" },
  { id:"workstream", label:"Workstream Review",     purpose:"Track milestones, escalate risks, review actions", duration:"60 min", attendees:"Workstream leads + PM", owner:"Programme Manager" },
  { id:"steering",   label:"Steering Committee",    purpose:"Decisions, resource calls, strategic issues", duration:"90 min", attendees:"Sponsor + SLT", owner:"Programme Sponsor" },
  { id:"board",      label:"Programme Board",       purpose:"Portfolio health, escalations, benefit tracking", duration:"60 min", attendees:"Executive team", owner:"Programme Director" },
  { id:"strategy",   label:"Strategy Review",       purpose:"Strategic alignment, pivot decisions, roadmap refresh", duration:"Half day", attendees:"Leadership team", owner:"CEO / ELT" },
  { id:"retro",      label:"Retrospective",         purpose:"What's working, what's not, how we improve", duration:"60 min", attendees:"Delivery team", owner:"Team Lead" },
  { id:"lessons",    label:"Lessons Learned",       purpose:"Post-milestone knowledge capture", duration:"90 min", attendees:"All programme leads", owner:"PMO" },
];
const RHYTHM_COLOURS = {
  daily:"#3a6b8a", weekly:G_MID, fortnightly:"#5a7a4e", monthly:GOLD, quarterly:AMBER,
};

// ═══ TOOL 5 — OPERATING RHYTHM BUILDER ══════════════════════════════════════
function Tool5OperatingRhythm() {
  const [view, setView] = useState("builder");
  const [selected, setSelected] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [customMeetings, setCustomMeetings] = useState([]);
  const [addingCustom, setAddingCustom] = useState(false);
  const [customForm, setCustomForm] = useState({ label:"", purpose:"", cadence:"weekly", duration:"60 min", owner:"", attendees:"" });

  const WEEK_DAYS = ["Mon","Tue","Wed","Thu","Fri"];

  function toggleMeeting(id) {
    setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  }

  function addCustom() {
    if (!customForm.label.trim()) return;
    setCustomMeetings(p => [...p, { ...customForm, id: `custom_${Date.now()}`, isCustom: true }]);
    setCustomForm({ label:"", purpose:"", cadence:"weekly", duration:"60 min", owner:"", attendees:"" });
    setAddingCustom(false);
  }

  const allMeetings = [
    ...MEETING_TYPES.map(m => ({ ...m, cadence: m.id==="standup"?"daily":m.id==="workstream"?"weekly":m.id==="steering"?"fortnightly":m.id==="board"?"monthly":m.id==="strategy"?"quarterly":m.id==="retro"?"weekly":"monthly" })),
    ...customMeetings,
  ].filter(m => selected.includes(m.id));

  // Group selected by cadence for the calendar view
  const byDay = { Mon:[], Tue:[], Wed:[], Thu:[], Fri:[] };
  allMeetings.forEach(m => {
    if (m.cadence === "daily") WEEK_DAYS.forEach(d => byDay[d].push(m));
    else if (m.cadence === "weekly") byDay["Wed"].push(m);
    else if (m.cadence === "fortnightly") byDay["Thu"].push(m);
  });

  const monthlyCadence = allMeetings.filter(m => m.cadence==="monthly" || m.cadence==="quarterly");

  return (
    <div>
      <TabBar
        tabs={[["builder","01 — Select Meetings"],["calendar","02 — Weekly View"],["register","03 — Full Register"],["principles","04 — Rhythm Principles"]]}
        active={view}
        onChange={setView}
      />

      {view === "builder" && (
        <div>
          <Callout>
            <strong style={{color:GOLD}}>Build your operating rhythm.</strong> Select the meetings and cadences that match your programme's needs. A strong operating rhythm is not more meetings — it's the right meetings, at the right frequency, with the right people and a clear purpose for each.
          </Callout>

          <div style={{marginBottom:16}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Organisation / Programme Name</div>
            <input value={orgName} onChange={e=>setOrgName(e.target.value)} placeholder="e.g. Customer Transformation Programme" style={{background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"8px 12px",color:G,fontFamily:"'DM Sans',sans-serif",fontSize:13,outline:"none",width:400}} />
          </div>

          <SectionLabel>Core Meeting Types</SectionLabel>
          <div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:24}}>
            {MEETING_TYPES.map(m => {
              const cadence = m.id==="standup"?"daily":m.id==="workstream"?"weekly":m.id==="steering"?"fortnightly":m.id==="board"?"monthly":m.id==="strategy"?"quarterly":"monthly";
              const col = RHYTHM_COLOURS[cadence];
              const isOn = selected.includes(m.id);
              return (
                <div key={m.id} onClick={() => toggleMeeting(m.id)} style={{
                  background: isOn ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.12)",
                  border: `1px solid ${isOn ? col+"55" : "rgba(247,244,239,0.07)"}`,
                  padding:"16px 20px",
                  cursor:"pointer",
                  display:"grid",
                  gridTemplateColumns:"28px 1fr auto auto auto",
                  gap:14,
                  alignItems:"center",
                  transition:"all 0.15s",
                }}>
                  <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${isOn?col:"rgba(247,244,239,0.2)"}`,background:isOn?col:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {isOn && <span style={{color:G,fontSize:10,fontWeight:700}}>✓</span>}
                  </div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:G,marginBottom:2}}>{m.label}</div>
                    <div style={{fontSize:11,color:"rgba(44,74,62,0.72)",lineHeight:1.5}}>{m.purpose}</div>
                  </div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:col,background:`${col}18`,border:`1px solid ${col}33`,padding:"2px 8px",textTransform:"uppercase",letterSpacing:"0.08em",whiteSpace:"nowrap"}}>{cadence}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.9)",whiteSpace:"nowrap"}}>{m.duration}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.9)",whiteSpace:"nowrap"}}>{m.owner}</div>
                </div>
              );
            })}
          </div>

          {/* Custom meetings */}
          <SectionLabel>Custom Meetings</SectionLabel>
          {customMeetings.map(m => (
            <div key={m.id} style={{background:"rgba(44,74,62,0.03)",border:"1px solid rgba(212,168,71,0.15)",padding:"12px 18px",display:"flex",alignItems:"center",gap:12,marginBottom:2}}>
              <div onClick={() => toggleMeeting(m.id)} style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${selected.includes(m.id)?GOLD:"rgba(247,244,239,0.2)"}`,background:selected.includes(m.id)?GOLD:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                {selected.includes(m.id) && <span style={{color:G,fontSize:10,fontWeight:700}}>✓</span>}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:TEXT}}>{m.label}</div>
                <div style={{fontSize:11,color:"rgba(44,74,62,0.92)"}}>{m.cadence} · {m.duration} · {m.owner}</div>
              </div>
              <button onClick={() => setCustomMeetings(p => p.filter(x => x.id!==m.id))} style={{background:"none",border:"none",color:"rgba(44,74,62,0.58)",cursor:"pointer",fontSize:13}}>✕</button>
            </div>
          ))}

          {addingCustom ? (
            <div style={{background:"rgba(44,74,62,0.06)",border:"1px solid rgba(212,168,71,0.2)",padding:20,marginTop:8}}>
              <SectionLabel>Add Custom Meeting</SectionLabel>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                {[["label","Meeting Name","e.g. Change Champion Sync"],["owner","Owner","e.g. Change Lead"],["attendees","Attendees","e.g. Change champions, team leads"],["duration","Duration","e.g. 45 min"]].map(([key,label,ph]) => (
                  <div key={key}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
                    <input value={customForm[key]} onChange={e => setCustomForm(p=>({...p,[key]:e.target.value}))} placeholder={ph} style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"7px 10px",color:G,fontFamily:"'DM Sans',sans-serif",fontSize:12,outline:"none"}} />
                  </div>
                ))}
                <div style={{gridColumn:"1/-1"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Purpose</div>
                  <input value={customForm.purpose} onChange={e => setCustomForm(p=>({...p,purpose:e.target.value}))} placeholder="What does this meeting exist to do?" style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"7px 10px",color:G,fontFamily:"'DM Sans',sans-serif",fontSize:12,outline:"none"}} />
                </div>
                <div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Cadence</div>
                  <select value={customForm.cadence} onChange={e=>setCustomForm(p=>({...p,cadence:e.target.value}))} style={{width:"100%",background:"#F7F4EF",border:"1px solid rgba(44,74,62,0.18)",padding:"7px 10px",color:G,fontFamily:"'DM Mono',monospace",fontSize:11,outline:"none"}}>
                    {CADENCE_OPTIONS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <GoldButton onClick={addCustom}>Add Meeting</GoldButton>
                <OutlineButton onClick={() => setAddingCustom(false)}>Cancel</OutlineButton>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingCustom(true)} style={{background:"transparent",border:"1px dashed rgba(44,74,62,0.25)",color:"rgba(44,74,62,0.9)",padding:"10px 18px",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",marginTop:8}}>+ Add Custom Meeting</button>
          )}

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28,flexWrap:"wrap",gap:12}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:selected.length>0?"rgba(212,168,71,0.65)":"rgba(247,244,239,0.27)"}}>{selected.length} meeting{selected.length!==1?"s":""} selected</span>
            <GoldButton onClick={() => setView("calendar")} disabled={selected.length===0}>View Calendar →</GoldButton>
          </div>
        </div>
      )}

      {view === "calendar" && (
        <div>
          <div style={{marginBottom:20}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:G,marginBottom:4}}>{orgName || "Programme"} — Operating Rhythm</div>
            <div style={{fontSize:12,color:"rgba(44,74,62,0.92)"}}>Weekly recurring meetings shown below. Monthly and quarterly cadences listed separately.</div>
          </div>

          {/* Weekly grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:2,marginBottom:24}}>
            {WEEK_DAYS.map(day => (
              <div key={day} style={{border:"1px solid rgba(44,74,62,0.12)",overflow:"hidden"}}>
                <div style={{background:"rgba(44,74,62,0.08)",padding:"10px 12px",borderBottom:"1px solid rgba(247,244,239,0.07)"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(44,74,62,0.88)",letterSpacing:"0.12em",textTransform:"uppercase"}}>{day}</div>
                </div>
                <div style={{padding:8,minHeight:80}}>
                  {byDay[day].filter((m,i,arr) => arr.findIndex(x=>x.id===m.id)===i).map(m => {
                    const cadence = m.cadence||"weekly";
                    const col = RHYTHM_COLOURS[cadence];
                    return (
                      <div key={m.id} style={{borderLeft:`3px solid ${col}`,background:"rgba(44,74,62,0.06)",padding:"8px 10px",marginBottom:5}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:11,color:G,marginBottom:2}}>{m.label}</div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:col}}>{m.duration}</div>
                      </div>
                    );
                  })}
                  {byDay[day].length === 0 && <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.88)",textAlign:"center",paddingTop:16}}>—</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Monthly / quarterly */}
          {monthlyCadence.length > 0 && (
            <Card style={{padding:20,marginBottom:16}}>
              <SectionLabel>Monthly & Quarterly Cadences</SectionLabel>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {monthlyCadence.map(m => {
                  const col = RHYTHM_COLOURS[m.cadence||"monthly"];
                  return (
                    <div key={m.id} style={{display:"grid",gridTemplateColumns:"120px 1fr auto",gap:14,alignItems:"center",padding:"10px 14px",background:"rgba(44,74,62,0.04)",border:`1px solid rgba(247,244,239,0.07)`}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:col,background:`${col}18`,border:`1px solid ${col}33`,padding:"2px 8px",textTransform:"uppercase",letterSpacing:"0.08em",textAlign:"center"}}>{m.cadence}</div>
                      <div>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:G,marginBottom:2}}>{m.label}</div>
                        <div style={{fontSize:11,color:"rgba(44,74,62,0.92)"}}>{m.purpose}</div>
                      </div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.9)",textAlign:"right"}}>
                        <div>{m.duration}</div>
                        <div style={{marginTop:2}}>{m.owner}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          <OutlineButton onClick={() => setView("builder")}>← Edit Selection</OutlineButton>
        </div>
      )}

      {view === "register" && (
        <div>
          <Card style={{padding:0,overflow:"hidden"}}>
            <DataTable
              headers={["Meeting","Cadence","Duration","Purpose","Owner","Attendees"]}
              rows={allMeetings.map(m => [
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:G,fontWeight:700}}>{m.label}</span>,
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:RHYTHM_COLOURS[m.cadence||"weekly"],background:`${RHYTHM_COLOURS[m.cadence||"weekly"]}18`,border:`1px solid ${RHYTHM_COLOURS[m.cadence||"weekly"]}33`,padding:"2px 6px",textTransform:"uppercase"}}>{m.cadence}</span>,
                m.duration, m.purpose||"—", m.owner||"—", m.attendees||"—"
              ])}
            />
          </Card>
          {allMeetings.length === 0 && (
            <div style={{textAlign:"center",padding:40,color:"rgba(44,74,62,0.62)",fontStyle:"italic",fontSize:13}}>No meetings selected. Go to the Builder tab to add meetings.</div>
          )}
        </div>
      )}

      {view === "principles" && (
        <div>
          <Callout>A strong operating rhythm is not about having more meetings — it is about having the right ones, at the right frequency, with clear purpose and genuine accountability at each.</Callout>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2}}>
            {[
              ["Every meeting needs a job", "If you can't answer 'what decision gets made here?' or 'what gets unblocked here?', the meeting should not exist. Review your current calendar and delete any meeting that fails this test.", GOLD],
              ["Match cadence to pace of change", "Daily stand-ups only work when daily blockers exist. Monthly reviews only work when monthly data exists. Mismatched cadence is one of the most common causes of meeting fatigue.", G_MID],
              ["Right people in the room", "Too many people in a meeting signals unclear decision rights. The person who owns the decision should be there. People who need to know the outcome should get a summary, not an invitation.", "#3a6b8a"],
              ["Escalation before the meeting, not during", "Steering committees should not hear about a crisis for the first time in the meeting. Establish escalation protocols so issues arrive before the forum — and use the forum for decisions, not discovery.", AMBER],
              ["Actions, owners, dates — every time", "A meeting without a decision log and action register is a conversation, not governance. Every meeting should close with: what was decided, what needs to happen, who owns it, and by when.", G_MID],
              ["Review the rhythm every quarter", "The operating rhythm that works at programme initiation will not be the right rhythm at go-live. At every phase gate, ask: do we still need all of these meetings? Do we need different ones?", GOLD],
            ].map(([title, text, col]) => (
              <div key={title} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",borderTop:`3px solid ${col}`,padding:20}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:G,marginBottom:8}}>{title}</div>
                <div style={{fontSize:12,color:"rgba(44,74,62,0.78)",lineHeight:1.7}}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  {(view==="calendar"||view==="register")&&allMtgs.length>0&&<div style={{marginTop:20,display:"flex",justifyContent:"flex-end"}}><GBtn onClick={()=>exportRhythm({orgName,meetings:allMtgs})}>↓ Download Register</GBtn></div>}}

// ═════════════════════════════════════════════════════════════════════════════
// TOOL 6 — KPI & PERFORMANCE BUILDER
// "How do we measure it?"
// ═════════════════════════════════════════════════════════════════════════════

const KPI_PILLARS = [
  { id:"financial",   label:"Financial",             icon:"$", color:GOLD },
  { id:"customer",    label:"Customer",              icon:"◎", color:"#3a6b8a" },
  { id:"process",     label:"Process & Efficiency",  icon:"▣", color:G_MID },
  { id:"people",      label:"People & Capability",   icon:"◉", color:AMBER },
  { id:"strategic",   label:"Strategic",             icon:"◈", color:"#7a5aaa" },
];

const KPI_TEMPLATES = {
  financial: [
    { name:"Cost reduction (%)", formula:"(Baseline cost − Current cost) ÷ Baseline cost × 100", frequency:"Monthly", target:"≥ 10% within 12 months", lead:false },
    { name:"ROI on initiative investment", formula:"(Net benefit − Cost) ÷ Cost × 100", frequency:"Quarterly", target:"Positive within 18 months", lead:false },
    { name:"Budget variance", formula:"(Actual spend − Budgeted spend) ÷ Budgeted spend × 100", frequency:"Monthly", target:"< ±5%", lead:true },
  ],
  customer: [
    { name:"Customer satisfaction score (CSAT)", formula:"Sum of scores ÷ Number of responses", frequency:"Monthly", target:"≥ 8/10", lead:false },
    { name:"Net Promoter Score (NPS)", formula:"% Promoters − % Detractors", frequency:"Quarterly", target:"≥ +30", lead:false },
    { name:"First contact resolution rate", formula:"Resolved at first contact ÷ Total contacts × 100", frequency:"Weekly", target:"≥ 80%", lead:true },
    { name:"Average handling time", formula:"Total handle time ÷ Number of interactions", frequency:"Weekly", target:"Reduce by 15% vs baseline", lead:true },
  ],
  process: [
    { name:"Process cycle time", formula:"End time − Start time (average across transactions)", frequency:"Weekly", target:"Reduce by 20% within 6 months", lead:true },
    { name:"Error / rework rate", formula:"Rework items ÷ Total items processed × 100", frequency:"Weekly", target:"< 3%", lead:true },
    { name:"Process automation rate", formula:"Automated transactions ÷ Total transactions × 100", frequency:"Monthly", target:"≥ 60% within 12 months", lead:true },
    { name:"Compliance rate", formula:"Compliant items ÷ Total items audited × 100", frequency:"Monthly", target:"≥ 98%", lead:false },
  ],
  people: [
    { name:"Employee engagement score", formula:"Survey average (scale 1–10)", frequency:"Quarterly", target:"≥ 7.5/10", lead:false },
    { name:"Change adoption rate", formula:"Actively using new process ÷ Total impacted × 100", frequency:"Monthly", target:"≥ 80% within 90 days of go-live", lead:true },
    { name:"Training completion rate", formula:"Completions ÷ Enrolled × 100", frequency:"Monthly", target:"100% before go-live", lead:true },
    { name:"Manager readiness score", formula:"Leaders rated 'ready' ÷ Total leaders × 100", frequency:"Monthly", target:"≥ 85% before go-live", lead:true },
    { name:"Voluntary turnover rate", formula:"Voluntary departures ÷ Average headcount × 100", frequency:"Quarterly", target:"< 10% per annum", lead:false },
  ],
  strategic: [
    { name:"Strategic initiative completion rate", formula:"Completed milestones ÷ Planned milestones × 100", frequency:"Monthly", target:"≥ 85%", lead:true },
    { name:"Portfolio health score", formula:"Green programmes ÷ Total active programmes × 100", frequency:"Monthly", target:"≥ 80% green", lead:true },
    { name:"Benefits realisation rate", formula:"Realised benefits ÷ Planned benefits × 100", frequency:"Quarterly", target:"≥ 90% at 12 months post go-live", lead:false },
    { name:"Decision velocity", formula:"Average days from issue raised to decision made", frequency:"Monthly", target:"< 5 business days", lead:true },
  ],
};

// ═══ TOOL 6 — KPI & PERFORMANCE BUILDER ══════════════════════════════════════
function Tool6KPIBuilder() {
  const [view, setView] = useState("builder");
  const [selectedKPIs, setSelectedKPIs] = useState([]);
  const [customKPIs, setCustomKPIs] = useState([]);
  const [activePillar, setActivePillar] = useState("financial");
  const [addingCustom, setAddingCustom] = useState(false);
  const [cForm, setCForm] = useState({ name:"", pillar:"financial", formula:"", frequency:"Monthly", target:"", lead:false, notes:"" });

  function toggleKPI(pillar, idx) {
    const key = `${pillar}_${idx}`;
    setSelectedKPIs(p => p.includes(key) ? p.filter(x=>x!==key) : [...p, key]);
  }
  function toggleCustomKPI(id) {
    setSelectedKPIs(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  }

  const allSelected = [
    ...Object.entries(KPI_TEMPLATES).flatMap(([pillar, kpis]) =>
      kpis.map((kpi, idx) => selectedKPIs.includes(`${pillar}_${idx}`) ? { ...kpi, pillar } : null).filter(Boolean)
    ),
    ...customKPIs.filter(k => selectedKPIs.includes(k.id)),
  ];

  const leadKPIs = allSelected.filter(k => k.lead);
  const lagKPIs  = allSelected.filter(k => !k.lead);

  return (
    <div>
      <TabBar
        tabs={[["builder","01 — Select KPIs"],["scorecard","02 — Scorecard View"],["leadlag","03 — Lead vs Lag"],["guidance","04 — Measurement Guidance"]]}
        active={view}
        onChange={setView}
      />

      {view === "builder" && (
        <div>
          <Callout>
            <strong style={{color:GOLD}}>Build your KPI set.</strong> Select from proven templates across five pillars, then add custom measures. Aim for 8–12 total KPIs — enough to give a complete picture, few enough to actually track. For each pillar, include at least one lead indicator (predictive) and one lag indicator (outcome).
          </Callout>

          {/* Pillar selector */}
          <div style={{display:"flex",gap:2,marginBottom:16,flexWrap:"wrap"}}>
            {KPI_PILLARS.map(p => (
              <button key={p.id} onClick={() => setActivePillar(p.id)} style={{
                background: activePillar===p.id ? `${p.color}22` : "rgba(0,0,0,0.15)",
                border: `1px solid ${activePillar===p.id ? p.color+"55" : "rgba(247,244,239,0.08)"}`,
                color: activePillar===p.id ? p.color : "rgba(247,244,239,0.4)",
                padding:"8px 16px",
                fontFamily:"'DM Mono',monospace",
                fontSize:10,
                letterSpacing:"0.1em",
                textTransform:"uppercase",
                cursor:"pointer",
              }}>
                {p.icon} {p.label}
                <span style={{marginLeft:8,opacity:0.6}}>{KPI_TEMPLATES[p.id].filter((_,i) => selectedKPIs.includes(`${p.id}_${i}`)).length || ""}</span>
              </button>
            ))}
          </div>

          {/* KPIs for active pillar */}
          <div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:20}}>
            {KPI_TEMPLATES[activePillar].map((kpi, idx) => {
              const key = `${activePillar}_${idx}`;
              const isOn = selectedKPIs.includes(key);
              const col = KPI_PILLARS.find(p=>p.id===activePillar).color;
              return (
                <div key={idx} onClick={() => toggleKPI(activePillar, idx)} style={{
                  background: isOn ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.12)",
                  border: `1px solid ${isOn ? col+"44" : "rgba(247,244,239,0.07)"}`,
                  padding:"14px 18px",
                  cursor:"pointer",
                  display:"grid",
                  gridTemplateColumns:"26px 1fr auto auto",
                  gap:12,
                  alignItems:"center",
                }}>
                  <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isOn?col:"rgba(247,244,239,0.2)"}`,background:isOn?col:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {isOn && <span style={{color:G,fontSize:9,fontWeight:700}}>✓</span>}
                  </div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:G,marginBottom:3}}>{kpi.name}</div>
                    <div style={{fontSize:11,color:"rgba(44,74,62,0.92)",fontFamily:"'DM Mono',monospace"}}>Target: {kpi.target}</div>
                  </div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.9)",whiteSpace:"nowrap"}}>{kpi.frequency}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,padding:"2px 7px",border:`1px solid ${kpi.lead?G_MID+"55":AMBER+"55"}`,color:kpi.lead?G_MID:AMBER,textTransform:"uppercase",letterSpacing:"0.07em",whiteSpace:"nowrap"}}>{kpi.lead?"Lead":"Lag"}</div>
                </div>
              );
            })}
          </div>

          {/* Custom KPIs */}
          {customKPIs.length > 0 && (
            <div style={{marginBottom:12}}>
              <SectionLabel>Custom KPIs</SectionLabel>
              {customKPIs.map(k => {
                const isOn = selectedKPIs.includes(k.id);
                return (
                  <div key={k.id} style={{background:"rgba(44,74,62,0.03)",border:"1px solid rgba(212,168,71,0.15)",padding:"12px 16px",display:"grid",gridTemplateColumns:"26px 1fr auto",gap:12,alignItems:"center",marginBottom:2}}>
                    <div onClick={() => toggleCustomKPI(k.id)} style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isOn?GOLD:"rgba(247,244,239,0.2)"}`,background:isOn?GOLD:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                      {isOn && <span style={{color:G,fontSize:9,fontWeight:700}}>✓</span>}
                    </div>
                    <div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:TEXT}}>{k.name}</div>
                      <div style={{fontSize:11,color:"rgba(44,74,62,0.92)"}}>{k.pillar} · {k.frequency} · Target: {k.target}</div>
                    </div>
                    <button onClick={() => setCustomKPIs(p=>p.filter(x=>x.id!==k.id))} style={{background:"none",border:"none",color:"rgba(44,74,62,0.58)",cursor:"pointer",fontSize:13}}>✕</button>
                  </div>
                );
              })}
            </div>
          )}

          {addingCustom ? (
            <div style={{background:"rgba(44,74,62,0.06)",border:"1px solid rgba(212,168,71,0.2)",padding:20,marginTop:8}}>
              <SectionLabel>Add Custom KPI</SectionLabel>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                {[["name","KPI Name","e.g. Supplier on-time delivery rate"],["formula","Formula / Calculation","e.g. On-time deliveries ÷ Total deliveries × 100"],["target","Target","e.g. ≥ 95%"],["frequency","Measurement Frequency","e.g. Weekly"]].map(([key,label,ph]) => (
                  <div key={key} style={{gridColumn:key==="name"||key==="formula"?"1/-1":"auto"}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
                    <input value={cForm[key]} onChange={e=>setCForm(p=>({...p,[key]:e.target.value}))} placeholder={ph} style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"7px 10px",color:G,fontFamily:"'DM Sans',sans-serif",fontSize:12,outline:"none"}} />
                  </div>
                ))}
                <div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Pillar</div>
                  <select value={cForm.pillar} onChange={e=>setCForm(p=>({...p,pillar:e.target.value}))} style={{width:"100%",background:"#F7F4EF",border:"1px solid rgba(44,74,62,0.18)",padding:"7px 10px",color:G,fontFamily:"'DM Mono',monospace",fontSize:11,outline:"none"}}>
                    {KPI_PILLARS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,paddingTop:20}}>
                  <input type="checkbox" checked={cForm.lead} onChange={e=>setCForm(p=>({...p,lead:e.target.checked}))} id="lead-toggle" />
                  <label htmlFor="lead-toggle" style={{fontSize:12,color:"rgba(44,74,62,0.88)",cursor:"pointer"}}>Lead indicator (predictive)</label>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <GoldButton onClick={() => { if(!cForm.name.trim()) return; setCustomKPIs(p=>[...p,{...cForm,id:`custom_${Date.now()}`}]); setCForm({name:"",pillar:"financial",formula:"",frequency:"Monthly",target:"",lead:false,notes:""}); setAddingCustom(false); }}>Add KPI</GoldButton>
                <OutlineButton onClick={() => setAddingCustom(false)}>Cancel</OutlineButton>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingCustom(true)} style={{background:"transparent",border:"1px dashed rgba(44,74,62,0.25)",color:"rgba(44,74,62,0.9)",padding:"10px 18px",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",marginTop:8}}>+ Add Custom KPI</button>
          )}

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24,flexWrap:"wrap",gap:12}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:allSelected.length>0?"rgba(212,168,71,0.65)":"rgba(247,244,239,0.27)"}}>{allSelected.length} KPI{allSelected.length!==1?"s":""} selected {allSelected.length>12?" — consider reducing to 12 or fewer":""}</span>
            <GoldButton onClick={() => setView("scorecard")} disabled={allSelected.length===0}>View Scorecard →</GoldButton>
          </div>
        </div>
      )}

      {view === "scorecard" && (
        <div>
          {KPI_PILLARS.map(pillar => {
            const pillKPIs = allSelected.filter(k => k.pillar === pillar.id);
            if (pillKPIs.length === 0) return null;
            return (
              <div key={pillar.id} style={{marginBottom:20}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:14,color:pillar.color}}>{pillar.icon}</span>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:TEXT}}>{pillar.label}</div>
                  <div style={{height:1,flex:1,background:`${pillar.color}33`}} />
                </div>
                <Card style={{padding:0,overflow:"hidden"}}>
                  <DataTable
                    headers={["KPI","Target","Frequency","Type","Formula"]}
                    rows={pillKPIs.map(k => [
                      <span style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:TEXT}}>{k.name}</span>,
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:pillar.color}}>{k.target}</span>,
                      k.frequency,
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,padding:"2px 6px",border:`1px solid ${k.lead?G_MID+"55":AMBER+"55"}`,color:k.lead?G_MID:AMBER,textTransform:"uppercase"}}>{k.lead?"Lead":"Lag"}</span>,
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(44,74,62,0.9)"}}>{k.formula}</span>,
                    ])}
                  />
                </Card>
              </div>
            );
          })}
          {allSelected.length === 0 && <div style={{textAlign:"center",padding:40,color:"rgba(44,74,62,0.62)",fontStyle:"italic",fontSize:13}}>No KPIs selected. Go to the Builder tab to add KPIs.</div>}
        </div>
      )}

      {view === "leadlag" && (
        <div>
          <Callout>
            <strong style={{color:GOLD}}>Lead indicators</strong> predict future performance — they tell you if you're on track before outcomes land. <strong style={{color:AMBER}}>Lag indicators</strong> confirm what happened. You need both. Most organisations over-index on lag — they measure outcomes long after the window to intervene has passed.
          </Callout>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:G_MID,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:G_MID}} />Lead Indicators ({leadKPIs.length})
              </div>
              {leadKPIs.length === 0 ? <div style={{fontSize:12,color:"rgba(44,74,62,0.9)",fontStyle:"italic",padding:"20px 0"}}>No lead indicators selected yet. Add KPIs marked as lead indicators.</div> :
                leadKPIs.map((k,i) => (
                  <div key={i} style={{background:"rgba(74,122,104,0.06)",border:"1px solid rgba(74,122,104,0.15)",borderLeft:`3px solid ${G_MID}`,padding:"12px 14px",marginBottom:6}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:G,marginBottom:3}}>{k.name}</div>
                    <div style={{fontSize:11,color:"rgba(44,74,62,0.72)"}}>{k.frequency} · Target: {k.target}</div>
                  </div>
                ))
              }
            </div>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:AMBER,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:AMBER}} />Lag Indicators ({lagKPIs.length})
              </div>
              {lagKPIs.length === 0 ? <div style={{fontSize:12,color:"rgba(44,74,62,0.9)",fontStyle:"italic",padding:"20px 0"}}>No lag indicators selected yet.</div> :
                lagKPIs.map((k,i) => (
                  <div key={i} style={{background:"rgba(200,154,42,0.06)",border:"1px solid rgba(200,154,42,0.15)",borderLeft:`3px solid ${AMBER}`,padding:"12px 14px",marginBottom:6}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:G,marginBottom:3}}>{k.name}</div>
                    <div style={{fontSize:11,color:"rgba(44,74,62,0.72)"}}>{k.frequency} · Target: {k.target}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {view === "guidance" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2}}>
            {[
              ["Measure what matters, not what's easy", "The most important things are often the hardest to measure. Don't let ease of measurement drive KPI selection. If customer trust matters, measure it — even if imperfectly.", GOLD],
              ["Aim for 8–12 KPIs total", "More than 12 KPIs and the signal gets lost in the noise. Leadership attention fragments. If you can't fit your most important measures on one page, you have too many.", G_MID],
              ["Set targets before you start measuring", "A target set after seeing first results is not a target — it is a description of what happened. Set targets before the programme begins and hold to them.", "#3a6b8a"],
              ["Every KPI needs an owner", "A KPI without an owner is a hope, not a measure. Assign a named person accountable for each KPI — not a team, not a function. One person.", AMBER],
              ["Review targets every 90 days", "As the programme evolves, some targets become too easy; others become impossible. Review and recalibrate quarterly — but be transparent about changes.", G_MID],
              ["Build a data collection plan before go-live", "Nothing undermines a KPI framework faster than discovering data doesn't exist or can't be extracted. Map your data sources and collection method for every measure before you commit to reporting it.", GOLD],
            ].map(([title, text, col]) => (
              <div key={title} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",borderTop:`3px solid ${col}`,padding:20}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:G,marginBottom:8}}>{title}</div>
                <div style={{fontSize:12,color:"rgba(44,74,62,0.78)",lineHeight:1.7}}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

    {allSel.length>0&&view==="scorecard"&&<div style={{marginTop:16,display:"flex",justifyContent:"flex-end"}}><GBtn onClick={()=>exportKPIs({kpis:allSel,pillars:KPI_PILLARS})}>↓ Download Scorecard</GBtn></div>}}

// ═════════════════════════════════════════════════════════════════════════════
// TOOL 7 — CAPABILITY & GAP MAPPER
// "Can we actually do it?"
// ═════════════════════════════════════════════════════════════════════════════

const CAP_DOMAINS = [
  { id:"strategy",    label:"Strategy & Direction",     desc:"Ability to set, communicate, and maintain strategic clarity across the organisation." },
  { id:"leadership",  label:"Leadership & Alignment",   desc:"Capability of leaders to align, sponsor, and role-model transformation behaviours." },
  { id:"delivery",    label:"Delivery & Execution",     desc:"Project management discipline, delivery rigour, and milestone accountability." },
  { id:"change",      label:"Change Management",        desc:"Structured capability to prepare people, manage resistance, and drive adoption." },
  { id:"data",        label:"Data & Insight",           desc:"Access to quality data and capability to use it for decision-making." },
  { id:"technology",  label:"Technology & Systems",     desc:"Technical capability to implement, integrate, and support new systems." },
  { id:"process",     label:"Process Improvement",      desc:"Ability to analyse, redesign, and embed improved ways of working." },
  { id:"governance",  label:"Governance & Oversight",   desc:"Structures, decision rights, and accountability frameworks for transformation." },
  { id:"culture",     label:"Culture & Engagement",     desc:"Organisational culture's readiness and openness to change and transformation." },
];

const CAP_LEVELS = [
  { score:1, label:"Critical Gap",    color:RED,    desc:"Capability is absent or severely inadequate. Major risk to delivery." },
  { score:2, label:"Significant Gap", color:"#C0622A", desc:"Some capability exists but insufficient for what's required." },
  { score:3, label:"Partial",         color:AMBER,  desc:"Capability exists but is inconsistent, fragile, or dependent on a few individuals." },
  { score:4, label:"Capable",         color:G_MID,  desc:"Capability is adequate and broadly available. Some development still needed." },
  { score:5, label:"Strong",          color:"#2C6B52", desc:"Capability is a genuine strength. Could even support others." },
];

// ═══ TOOL 7 — CAPABILITY & GAP MAPPER ════════════════════════════════════════
function Tool7CapabilityMapper() {
  const [view, setView] = useState("assess");
  const [scores, setScores] = useState({});
  const [importance, setImportance] = useState({});
  const [notes, setNotes] = useState({});
  const [activeDomain, setActiveDomain] = useState("strategy");

  function capColor(s) {
    if (!s) return "rgba(247,244,239,0.2)";
    return CAP_LEVELS[s-1].color;
  }
  function capLabel(s) { return s ? CAP_LEVELS[s-1].label : "Not assessed"; }

  const scored = Object.keys(scores).filter(k => scores[k] > 0).length;
  const allDomains = CAP_DOMAINS.length;

  const gaps = CAP_DOMAINS.filter(d => {
    const s = scores[d.id] || 0;
    const imp = importance[d.id] || 3;
    return s > 0 && s < 3 && imp >= 3;
  });
  const critGaps = CAP_DOMAINS.filter(d => scores[d.id] === 1);
  const strengths = CAP_DOMAINS.filter(d => scores[d.id] >= 4);

  return (
    <div>
      <TabBar
        tabs={[["assess","01 — Assess Capabilities"],["heatmap","02 — Gap Heat Map"],["priorities","03 — Priority Gaps"],["actions","04 — Build Actions"]]}
        active={view}
        onChange={setView}
      />

      {view === "assess" && (
        <div>
          <Callout>
            <strong style={{color:GOLD}}>Rate your current capability</strong> in each domain — not your aspiration, not your best project. Score what you observe right now. Then rate how important each domain is for your current transformation. The gap map uses both to surface what matters most.
          </Callout>

          {/* Domain selector */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,marginBottom:20}}>
            {CAP_DOMAINS.map(d => {
              const s = scores[d.id];
              const col = capColor(s);
              const isActive = activeDomain === d.id;
              return (
                <div key={d.id} onClick={() => setActiveDomain(d.id)} style={{
                  background: isActive ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.12)",
                  border: `1px solid ${isActive ? (col+"55") : "rgba(247,244,239,0.07)"}`,
                  padding:"12px 14px",
                  cursor:"pointer",
                  transition:"all 0.15s",
                }}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:G,marginBottom:4}}>{d.label}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:col}}>{capLabel(s)}</div>
                </div>
              );
            })}
          </div>

          {/* Scoring panel */}
          {(() => {
            const dom = CAP_DOMAINS.find(d => d.id === activeDomain);
            if (!dom) return null;
            const s = scores[dom.id] || 0;
            const imp = importance[dom.id] || 3;
            return (
              <Card style={{padding:24}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:G,marginBottom:6}}>{dom.label}</div>
                <div style={{fontSize:12,color:"rgba(44,74,62,0.88)",lineHeight:1.6,marginBottom:20,fontStyle:"italic"}}>{dom.desc}</div>

                <div style={{marginBottom:20}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Current Capability Level</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:3}}>
                    {CAP_LEVELS.map(lvl => {
                      const isOn = s === lvl.score;
                      return (
                        <div key={lvl.score} onClick={() => setScores(p => ({...p,[dom.id]:lvl.score}))} style={{
                          padding:"12px 10px 14px",
                          cursor:"pointer",
                          border:`2px solid ${isOn ? lvl.color : "transparent"}`,
                          background:`${lvl.color}${isOn?"22":"0a"}`,
                          position:"relative",
                          transition:"all 0.12s",
                        }}>
                          {isOn && <div style={{position:"absolute",top:7,right:7,width:12,height:12,borderRadius:"50%",background:lvl.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:G,fontWeight:700}}>✓</div>}
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:500,color:lvl.color,lineHeight:1,marginBottom:4}}>{lvl.score}</div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:lvl.color,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{lvl.label}</div>
                          <div style={{fontSize:10,color:"rgba(44,74,62,0.72)",lineHeight:1.5}}>{lvl.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{marginBottom:16}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Importance for current transformation (1–5)</div>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <input type="range" min="1" max="5" value={imp} onChange={e => setImportance(p=>({...p,[dom.id]:Number(e.target.value)}))} style={{flex:1,background:`linear-gradient(to right,${GOLD} ${(imp-1)/4*100}%,rgba(247,244,239,0.12) ${(imp-1)/4*100}%)`}} />
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:GOLD,minWidth:80}}>{imp}/5 — {["","Low","Below avg","Moderate","High","Critical"][imp]}</div>
                  </div>
                </div>

                <div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Notes (optional)</div>
                  <textarea value={notes[dom.id]||""} onChange={e=>setNotes(p=>({...p,[dom.id]:e.target.value}))} placeholder="What is driving this score? What specific evidence or examples?" rows={2} style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"8px 11px",color:G,fontFamily:"'DM Sans',sans-serif",fontSize:12,outline:"none",resize:"vertical",lineHeight:1.5}} />
                </div>
              </Card>
            );
          })()}

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20,flexWrap:"wrap",gap:12}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:scored>0?"rgba(212,168,71,0.65)":"rgba(247,244,239,0.27)"}}>{scored} of {allDomains} domains assessed</span>
            <GoldButton onClick={() => setView("heatmap")} disabled={scored===0}>View Gap Map →</GoldButton>
          </div>
        </div>
      )}

      {view === "heatmap" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,marginBottom:24}}>
            {[
              {label:"Critical Gaps",value:critGaps.length,color:RED,sub:"Score 1 — highest priority"},
              {label:"Significant Gaps",value:CAP_DOMAINS.filter(d=>scores[d.id]===2).length,color:"#C0622A",sub:"Score 2 — address this quarter"},
              {label:"Strengths",value:strengths.length,color:G_MID,sub:"Score 4–5 — protect and leverage"},
            ].map((s,i) => (
              <Card key={i} style={{padding:20}}>
                <SectionLabel color={s.color}>{s.label}</SectionLabel>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:700,color:s.color,lineHeight:1}}>{s.value}</div>
                <div style={{fontSize:11,color:"rgba(44,74,62,0.92)",marginTop:4}}>{s.sub}</div>
              </Card>
            ))}
          </div>

          {/* Heat map grid */}
          <Card style={{padding:24}}>
            <SectionLabel>Capability vs Importance Matrix</SectionLabel>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {CAP_DOMAINS.map(dom => {
                const s = scores[dom.id] || 0;
                const imp = importance[dom.id] || 3;
                const col = capColor(s);
                const barW = s > 0 ? ((s-1)/4)*100 : 0;
                const gapScore = s > 0 ? Math.max(0, imp - s) : 0;
                const isHighPriority = gapScore >= 2;
                return (
                  <div key={dom.id} style={{display:"grid",gridTemplateColumns:"180px 1fr 60px 100px",gap:12,alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(247,244,239,0.05)"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,color:TEXT}}>{dom.label}</div>
                    <div>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.62)"}}>Capability</span>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:col}}>{s>0?s:"-"}/5</span>
                      </div>
                      <div style={{height:6,background:"rgba(44,74,62,0.1)",borderRadius:2}}>
                        <div style={{height:"100%",width:`${barW}%`,background:col,borderRadius:2,transition:"width 0.6s"}} />
                      </div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.62)",marginBottom:2}}>Imp.</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:GOLD}}>{imp}/5</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      {s > 0 ? (
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:isHighPriority?RED:col,background:`${isHighPriority?RED:col}18`,border:`1px solid ${isHighPriority?RED:col}33`,padding:"2px 7px",textTransform:"uppercase",letterSpacing:"0.07em"}}>
                          {isHighPriority?"Priority gap":capLabel(s)}
                        </span>
                      ) : <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.58)"}}>Not assessed</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {view === "priorities" && (
        <div>
          {gaps.length === 0 && critGaps.length === 0 ? (
            <div style={{textAlign:"center",padding:48,color:"rgba(44,74,62,0.62)",fontStyle:"italic",fontSize:13}}>No high-priority gaps identified. Assess all domains first, or your organisation is in strong shape.</div>
          ) : (
            <>
              {critGaps.length > 0 && (
                <div style={{background:"rgba(185,64,64,0.06)",border:"1px solid rgba(185,64,64,0.25)",padding:24,marginBottom:12}}>
                  <SectionLabel color={RED}>⚠ Critical Gaps — Act Now</SectionLabel>
                  {critGaps.map(dom => (
                    <div key={dom.id} style={{borderLeft:`2px solid ${RED}`,paddingLeft:16,marginBottom:16}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:G,marginBottom:4}}>{dom.label}</div>
                      <div style={{fontSize:12,color:"rgba(44,74,62,0.88)",lineHeight:1.6,marginBottom:4}}>{dom.desc}</div>
                      {notes[dom.id] && <div style={{fontSize:11,color:AMBER,fontStyle:"italic",marginTop:4}}>"{notes[dom.id]}"</div>}
                    </div>
                  ))}
                </div>
              )}
              {gaps.filter(d=>scores[d.id]===2).length > 0 && (
                <Card style={{padding:24,marginBottom:12}}>
                  <SectionLabel color="#C0622A">Significant Gaps — Address This Quarter</SectionLabel>
                  {gaps.filter(d=>scores[d.id]===2).map(dom => (
                    <div key={dom.id} style={{borderLeft:`2px solid #C0622A`,paddingLeft:16,marginBottom:14}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:G,marginBottom:3}}>{dom.label}</div>
                      <div style={{fontSize:12,color:"rgba(44,74,62,0.88)",lineHeight:1.6}}>{dom.desc}</div>
                    </div>
                  ))}
                </Card>
              )}
              {strengths.length > 0 && (
                <Card style={{padding:24}}>
                  <SectionLabel color={G_MID}>Strengths — Protect and Leverage</SectionLabel>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {strengths.map(dom => (
                      <div key={dom.id} style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:G_MID,background:"rgba(74,122,104,0.1)",border:"1px solid rgba(74,122,104,0.2)",padding:"4px 12px"}}>
                        {dom.label} ({scores[dom.id]}/5)
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      )}

      {view === "actions" && (
        <div>
          <Callout>For each gap, there are three types of response: <strong style={{color:GOLD}}>Build</strong> (develop internal capability), <strong style={{color:G_MID}}>Buy</strong> (bring in external capability), or <strong style={{color:"#3a6b8a"}}>Bridge</strong> (temporary workaround while building). Choose based on time available and strategic importance.</Callout>
          {CAP_DOMAINS.filter(d => scores[d.id] > 0 && scores[d.id] < 4).map(dom => {
            const s = scores[dom.id];
            const col = capColor(s);
            const buildBuyBridge = s <= 2 && (importance[dom.id]||3) >= 4 ? "Buy or Bridge immediately" : s <= 2 ? "Bridge now, Build longer term" : "Build — invest in targeted development";
            return (
              <div key={dom.id} style={{background:"rgba(44,74,62,0.04)",border:"1px solid rgba(44,74,62,0.12)",borderLeft:`3px solid ${col}`,padding:"16px 20px",marginBottom:2}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8,flexWrap:"wrap",gap:8}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:TEXT}}>{dom.label}</div>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:col,background:`${col}18`,border:`1px solid ${col}33`,padding:"2px 8px",textTransform:"uppercase"}}>{capLabel(s)}</span>
                </div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:GOLD,marginBottom:6}}>Recommended response: {buildBuyBridge}</div>
                {notes[dom.id] && <div style={{fontSize:11,color:AMBER,fontStyle:"italic",marginBottom:6}}>Evidence: "{notes[dom.id]}"</div>}
                <div style={{fontSize:12,color:"rgba(44,74,62,0.72)",lineHeight:1.6}}>{dom.desc}</div>
              </div>
            );
          })}
          {CAP_DOMAINS.filter(d => scores[d.id] > 0 && scores[d.id] < 4).length === 0 && (
            <div style={{textAlign:"center",padding:48,color:"rgba(44,74,62,0.62)",fontStyle:"italic",fontSize:13}}>No gaps to action. All assessed domains are at Capable or Strong.</div>
          )}
        </div>
      )}
    </div>
  );

    {scored>0&&(view==="heatmap"||view==="priorities"||view==="actions")&&<div style={{marginTop:16,display:"flex",justifyContent:"flex-end"}}><GBtn onClick={()=>exportCapability({domains:CAP_DOMAINS,scores,imp,notes})}>↓ Download Gap Map</GBtn></div>}}

// ═════════════════════════════════════════════════════════════════════════════
// TOOL 8 — CHANGE & ADOPTION PLANNER
// "Will people adopt it?"
// ═════════════════════════════════════════════════════════════════════════════

const ADKAR_ELEMENTS = [
  { id:"awareness",     label:"Awareness",     icon:"A", color:"#3a6b8a",  desc:"Do people know why the change is happening? Do they understand what is changing and why the organisation can't stay where it is?", barrier:"Most common barrier when: the change is announced without context, people hear about it through the grapevine, or communications are inconsistent." },
  { id:"desire",        label:"Desire",        icon:"D", color:G_MID,      desc:"Do people want to support and participate in the change? Awareness creates the case; desire is the individual's choice to engage.", barrier:"Most common barrier when: people don't see personal benefit, trust in leadership is low, or the change feels imposed rather than co-designed." },
  { id:"knowledge",     label:"Knowledge",     icon:"K", color:GOLD,       desc:"Do people know how to change? Do they have the skills, tools, and understanding to perform in the new state?", barrier:"Most common barrier when: training is too late, too generic, or focused on systems rather than behaviours and judgment calls." },
  { id:"ability",       label:"Ability",       icon:"A2",color:AMBER,      desc:"Can people actually do it? Knowing how and being able to do it in real conditions are different. This gap closes through practice, coaching, and feedback.", barrier:"Most common barrier when: the environment doesn't support practice, managers can't coach the new behaviours, or go-live happens before ability is established." },
  { id:"reinforcement", label:"Reinforcement",  icon:"R", color:"#2C6B52",  desc:"What will make the change stick? Without reinforcement, people revert. This is the most neglected stage — organisations celebrate go-live and walk away.", barrier:"Most common barrier when: recognition doesn't exist, managers allow reversion, or the old way remains easier or lower risk than the new." },
];

const CHANGE_TYPES = [
  { id:"process", label:"Process change",      sub:"How work gets done" },
  { id:"tech",    label:"Technology change",   sub:"New systems or tools" },
  { id:"structure",label:"Structural change",  sub:"Roles, teams, reporting" },
  { id:"culture", label:"Cultural change",     sub:"Behaviours and norms" },
  { id:"strategy",label:"Strategic change",    sub:"Direction and priorities" },
];

// ═══ TOOL 8 — CHANGE & ADOPTION PLANNER ══════════════════════════════════════
function Tool8ChangeAdoption() {
  const [view, setView] = useState("setup");
  const [changeName, setChangeName] = useState("");
  const [changeType, setChangeType] = useState("process");
  const [impactedGroups, setImpactedGroups] = useState("");
  const [scope, setScope] = useState(3);
  const [adkarScores, setAdkarScores] = useState({});
  const [resistanceFactors, setResistanceFactors] = useState([]);
  const [activeAdkar, setActiveAdkar] = useState("awareness");

  const RESISTANCE = [
    { id:"trust",     label:"Low trust in leadership",       risk:"High" },
    { id:"capacity",  label:"Change fatigue / too much at once", risk:"High" },
    { id:"benefit",   label:"No clear personal benefit",     risk:"High" },
    { id:"skills",    label:"Fear of not having required skills", risk:"Medium" },
    { id:"job",       label:"Concerns about job security",   risk:"High" },
    { id:"process",   label:"Current process feels easier",  risk:"Medium" },
    { id:"comms",     label:"Inconsistent communications",   risk:"Medium" },
    { id:"sponsor",   label:"Absent or weak sponsorship",    risk:"High" },
    { id:"history",   label:"History of failed changes",     risk:"Medium" },
    { id:"inclusion", label:"Not involved in design",        risk:"Medium" },
  ];

  function toggleResistance(id) {
    setResistanceFactors(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  }

  const adkarComplete = ADKAR_ELEMENTS.every(e => adkarScores[e.id] > 0);
  const weakestADKAR = ADKAR_ELEMENTS.reduce((min, el) => !adkarScores[el.id] || (adkarScores[el.id] < (adkarScores[min?.id]||6)) ? el : min, null);
  const overallReadiness = adkarComplete ? Math.round(ADKAR_ELEMENTS.reduce((s,e) => s+(adkarScores[e.id]||0),0) / ADKAR_ELEMENTS.length * 10) / 10 : null;

  return (
    <div>
      <TabBar
        tabs={[["setup","01 — Change Profile"],["adkar","02 — ADKAR Assessment"],["resistance","03 — Resistance Factors"],["plan","04 — Adoption Plan"]]}
        active={view}
        onChange={setView}
      />

      {view === "setup" && (
        <div>
          <Callout>
            <strong style={{color:GOLD}}>Prosci research</strong> across 10,000+ projects shows organisations with excellent change management are 6× more likely to meet objectives. Start by defining the change — clarity about what is changing for whom is the foundation of every effective adoption plan.
          </Callout>
          <Card style={{padding:24,marginBottom:12}}>
            <SectionLabel>The Change</SectionLabel>
            <div style={{marginBottom:12}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Change / Initiative Name</div>
              <input value={changeName} onChange={e=>setChangeName(e.target.value)} placeholder="e.g. Customer Service Process Redesign" style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"9px 12px",color:G,fontFamily:"'DM Sans',sans-serif",fontSize:13,outline:"none"}} />
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:8}}>Type of Change</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {CHANGE_TYPES.map(t => (
                  <div key={t.id} onClick={() => setChangeType(t.id)} style={{padding:"8px 14px",cursor:"pointer",border:`1px solid ${changeType===t.id?G_MID+"55":"rgba(247,244,239,0.1)"}`,background:changeType===t.id?"rgba(74,122,104,0.12)":"rgba(0,0,0,0.15)",color:changeType===t.id?CREAM:"rgba(247,244,239,0.4)",transition:"all 0.15s"}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>{t.label}</div>
                    <div style={{fontSize:10,color:changeType===t.id?"rgba(247,244,239,0.5)":"rgba(247,244,239,0.25)",marginTop:2}}>{t.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:4}}>Impacted Groups</div>
              <textarea value={impactedGroups} onChange={e=>setImpactedGroups(e.target.value)} placeholder="e.g. Customer service team (45 people), Team leaders (8), Operations manager" rows={2} style={{width:"100%",background:"rgba(44,74,62,0.05)",border:"1px solid rgba(44,74,62,0.18)",padding:"8px 11px",color:G,fontFamily:"'DM Sans',sans-serif",fontSize:12,outline:"none",resize:"vertical",lineHeight:1.5}} />
            </div>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(44,74,62,0.92)",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:8}}>Scale of Change (1 = minor, 5 = transformational)</div>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <input type="range" min="1" max="5" value={scope} onChange={e=>setScope(Number(e.target.value))} style={{flex:1,background:`linear-gradient(to right,${GOLD} ${(scope-1)/4*100}%,rgba(247,244,239,0.12) ${(scope-1)/4*100}%)`}} />
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:GOLD,minWidth:140}}>{scope}/5 — {["","Minor tweak","Moderate update","Significant change","Major transformation","Transformational"][scope]}</span>
              </div>
            </div>
          </Card>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <GoldButton onClick={() => setView("adkar")} disabled={!changeName.trim()}>Assess Readiness →</GoldButton>
          </div>
        </div>
      )}

      {view === "adkar" && (
        <div>
          <Callout>
            The <strong style={{color:GOLD}}>ADKAR model</strong> (Prosci) identifies where people are in their change journey. The lowest-scoring element is the current barrier point — address it before investing in elements further along the chain. Use this to target your change interventions, not spray activity across all five.
          </Callout>

          {/* ADKAR nav */}
          <div style={{display:"flex",gap:2,marginBottom:16}}>
            {ADKAR_ELEMENTS.map(el => {
              const s = adkarScores[el.id] || 0;
              const isActive = activeAdkar === el.id;
              const col = el.color;
              return (
                <div key={el.id} onClick={() => setActiveAdkar(el.id)} style={{flex:1,padding:"10px 8px",cursor:"pointer",border:`1px solid ${isActive?col+"55":"rgba(247,244,239,0.07)"}`,background:isActive?"rgba(0,0,0,0.25)":"rgba(0,0,0,0.12)",textAlign:"center",transition:"all 0.15s"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:isActive?col:"rgba(247,244,239,0.3)"}}>{el.icon}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:isActive?col:"rgba(247,244,239,0.25)",textTransform:"uppercase",letterSpacing:"0.07em",marginTop:2}}>{el.label}</div>
                  {s > 0 && <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:col,marginTop:4,fontWeight:700}}>{s}/5</div>}
                </div>
              );
            })}
          </div>

          {(() => {
            const el = ADKAR_ELEMENTS.find(e => e.id === activeAdkar);
            const s = adkarScores[el.id] || 0;
            return (
              <Card style={{padding:24}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:G,marginBottom:4}}>{el.label}</div>
                <div style={{fontSize:12,color:"rgba(44,74,62,0.88)",lineHeight:1.6,marginBottom:14}}>{el.desc}</div>
                <div style={{background:"rgba(44,74,62,0.06)",borderLeft:`3px solid ${el.color}`,padding:"10px 14px",marginBottom:18,fontSize:11,color:"rgba(44,74,62,0.72)",lineHeight:1.6,fontStyle:"italic"}}>{el.barrier}</div>

                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:GOLD,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>
                  Score your organisation's current {el.label} level for "{changeName||"this change"}"
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:3,marginBottom:16}}>
                  {[1,2,3,4,5].map(n => {
                    const isOn = s === n;
                    const labels = {1:"Very low",2:"Low",3:"Moderate",4:"Good",5:"Strong"};
                    return (
                      <div key={n} onClick={() => setAdkarScores(p=>({...p,[el.id]:n}))} style={{padding:"12px 8px",cursor:"pointer",border:`2px solid ${isOn?el.color:"transparent"}`,background:`${el.color}${isOn?"22":"0a"}`,textAlign:"center",transition:"all 0.12s"}}>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:22,fontWeight:500,color:el.color,lineHeight:1}}>{n}</div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:isOn?el.color:"rgba(44,74,62,0.62)",textTransform:"uppercase",letterSpacing:"0.07em",marginTop:4}}>{labels[n]}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigate buttons */}
                <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
                  {ADKAR_ELEMENTS.findIndex(e=>e.id===activeAdkar) > 0 && (
                    <OutlineButton onClick={() => setActiveAdkar(ADKAR_ELEMENTS[ADKAR_ELEMENTS.findIndex(e=>e.id===activeAdkar)-1].id)}>← Previous</OutlineButton>
                  )}
                  {ADKAR_ELEMENTS.findIndex(e=>e.id===activeAdkar) < ADKAR_ELEMENTS.length-1 && (
                    <GoldButton onClick={() => setActiveAdkar(ADKAR_ELEMENTS[ADKAR_ELEMENTS.findIndex(e=>e.id===activeAdkar)+1].id)} style={{marginLeft:"auto"}}>Next →</GoldButton>
                  )}
                  {ADKAR_ELEMENTS.findIndex(e=>e.id===activeAdkar) === ADKAR_ELEMENTS.length-1 && (
                    <GoldButton onClick={() => setView("resistance")} style={{marginLeft:"auto"}}>Review Resistance →</GoldButton>
                  )}
                </div>
              </Card>
            );
          })()}
        </div>
      )}

      {view === "resistance" && (
        <div>
          <Callout>
            Resistance is not a problem to be solved — it is information to be understood. Select the resistance factors that are present or likely for this change. Each one has a specific intervention that works better than generic communications.
          </Callout>
          <div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:24}}>
            {RESISTANCE.map(r => {
              const isOn = resistanceFactors.includes(r.id);
              const riskCol = r.risk==="High" ? RED : AMBER;
              return (
                <div key={r.id} onClick={() => toggleResistance(r.id)} style={{
                  background:isOn?"rgba(0,0,0,0.25)":"rgba(0,0,0,0.12)",
                  border:`1px solid ${isOn?riskCol+"44":"rgba(247,244,239,0.07)"}`,
                  padding:"12px 18px",
                  cursor:"pointer",
                  display:"grid",
                  gridTemplateColumns:"24px 1fr auto",
                  gap:12,
                  alignItems:"center",
                }}>
                  <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${isOn?riskCol:"rgba(247,244,239,0.2)"}`,background:isOn?riskCol:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {isOn && <span style={{color:G,fontSize:8,fontWeight:700}}>✓</span>}
                  </div>
                  <div style={{fontSize:13,color:isOn?CREAM:"rgba(247,244,239,0.6)"}}>{r.label}</div>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:riskCol,background:`${riskCol}18`,border:`1px solid ${riskCol}33`,padding:"1px 6px",textTransform:"uppercase",letterSpacing:"0.07em",whiteSpace:"nowrap"}}>{r.risk} risk</span>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"rgba(44,74,62,0.9)"}}>{resistanceFactors.length} factor{resistanceFactors.length!==1?"s":""} identified</span>
            <GoldButton onClick={() => setView("plan")}>Build Adoption Plan →</GoldButton>
          </div>
        </div>
      )}

      {view === "plan" && (
        <div>
          {/* Readiness summary */}
          {adkarComplete && (
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:2,marginBottom:20}}>
              {ADKAR_ELEMENTS.map(el => {
                const s = adkarScores[el.id] || 0;
                const isBarrier = el.id === weakestADKAR?.id;
                return (
                  <div key={el.id} style={{
                    background: isBarrier ? `${el.color}18` : "rgba(0,0,0,0.15)",
                    border: `1px solid ${isBarrier ? el.color+"55" : "rgba(247,244,239,0.07)"}`,
                    padding:"14px 12px",
                    textAlign:"center",
                    position:"relative",
                  }}>
                    {isBarrier && <div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:el.color,color:G,fontFamily:"'DM Mono',monospace",fontSize:7,letterSpacing:"0.08em",textTransform:"uppercase",padding:"1px 8px",whiteSpace:"nowrap"}}>Barrier Point</div>}
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:el.color,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,marginTop:isBarrier?8:0}}>{el.label}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:el.color,lineHeight:1}}>{s}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:"rgba(44,74,62,0.62)",marginTop:2}}>/5</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Interventions by ADKAR element */}
          <Card style={{padding:24,marginBottom:12}}>
            <SectionLabel>Recommended Interventions</SectionLabel>
            {ADKAR_ELEMENTS.map(el => {
              const s = adkarScores[el.id] || 0;
              if (s >= 4) return null;
              const interventions = {
                awareness: ["Leadership town hall with clear 'why now' narrative","Email cascade with personal relevance by role","Q&A sessions with direct managers","Visual change story posted in team areas","1:1 briefings for critical stakeholders"],
                desire: ["Co-design sessions where impacted people shape the solution","Clear articulation of 'what's in it for me' by group","Address job security concerns directly — not through euphemisms","Change champion network from within impacted groups","Early adopter programme with visible recognition"],
                knowledge: ["Role-specific training tailored to job function, not just system","Job aids and quick reference cards available at the point of work","Practice scenarios before go-live — not just classroom","Manager coaching on new expectations and how to support teams","Tiered learning: awareness → skill → mastery"],
                ability: ["Supervised practice in a safe environment before go-live","On-floor coaching support in the first 2–4 weeks post go-live","Performance support tools (checklists, guides) embedded in workflow","Identify and address individual performance gaps without blame","Go-live readiness assessment before switching off old process"],
                reinforcement: ["Visible recognition of people using the new way well","Regular check-ins from managers — not one-off comms","Remove the ability to revert to the old process where possible","Celebrate early wins publicly","Track adoption data and share progress with the team"],
              };
              return (
                <div key={el.id} style={{marginBottom:16,paddingBottom:16,borderBottom:"1px solid rgba(247,244,239,0.05)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:16,color:el.color,fontWeight:700}}>{el.icon}</span>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:TEXT}}>{el.label}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:el.color,background:`${el.color}18`,border:`1px solid ${el.color}33`,padding:"2px 7px"}}>{s>0?`Score: ${s}/5`:"Not scored"}</span>
                    {el.id === weakestADKAR?.id && <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:RED,background:"rgba(185,64,64,0.15)",border:"1px solid rgba(185,64,64,0.3)",padding:"2px 7px"}}>Barrier point</span>}
                  </div>
                  {interventions[el.id].slice(0, s===1?5:s===2?4:3).map((action,i) => (
                    <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:5}}>
                      <span style={{color:GOLD,fontSize:11,marginTop:2,flexShrink:0}}>—</span>
                      <span style={{fontSize:12,color:"rgba(44,74,62,0.78)",lineHeight:1.6}}>{action}</span>
                    </div>
                  ))}
                </div>
              );
            })}
            {ADKAR_ELEMENTS.every(el => (adkarScores[el.id]||0) >= 4) && (
              <div style={{textAlign:"center",padding:24,color:"rgba(44,74,62,0.92)",fontStyle:"italic",fontSize:13}}>Strong ADKAR scores across all elements. Focus on reinforcement to sustain adoption.</div>
            )}
          </Card>

          {/* Resistance response plan */}
          {resistanceFactors.length > 0 && (
            <Card style={{padding:24}}>
              <SectionLabel color={RED}>Resistance Response Plan</SectionLabel>
              {resistanceFactors.map(id => {
                const factor = RESISTANCE.find(r=>r.id===id);
                const responses = {
                  trust: "Visible leadership presence and consistent follow-through. Leaders must do what they say — every time. Address past failures directly, don't pretend they didn't happen.",
                  capacity: "Reduce the portfolio of active changes where possible. Be explicit about sequencing. Give people permission to focus on one thing at a time.",
                  benefit: "Develop role-specific 'what's in it for me' messaging. Avoid organisation-level benefits — make it personal and specific.",
                  skills: "Create safe practice environments before go-live. Celebrate learning, not just performance. Pair less confident people with change champions.",
                  job: "Address directly and early. Silence amplifies fear. If roles are changing, say so clearly and support people through the transition.",
                  process: "Measure and share the pain of the old process. Make the old way visibly more costly than the new. Remove workarounds proactively.",
                  comms: "Establish a single source of truth for programme communications. Brief managers before general comms go out so they can answer questions.",
                  sponsor: "Sponsor coaching — many sponsors don't know what active sponsorship looks like in practice. Provide a clear sponsor action plan.",
                  history: "Acknowledge the history explicitly. Name what went wrong before. Describe specifically what is different this time and why.",
                  inclusion: "Run targeted co-design sessions with the most resistant groups. Even small input creates ownership. 'Nothing about us without us.'",
                };
                const riskCol = factor.risk==="High" ? RED : AMBER;
                return (
                  <div key={id} style={{borderLeft:`2px solid ${riskCol}`,paddingLeft:16,marginBottom:14}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:TEXT}}>{factor.label}</div>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:riskCol,background:`${riskCol}18`,border:`1px solid ${riskCol}33`,padding:"1px 6px",textTransform:"uppercase"}}>{factor.risk} risk</span>
                    </div>
                    <div style={{fontSize:12,color:"rgba(44,74,62,0.78)",lineHeight:1.6}}>{responses[id]}</div>
                  </div>
                );
              })}
            </Card>
          )}
        </div>
      )}
    </div>
  );

    {view==="plan"&&<div style={{marginTop:16,display:"flex",justifyContent:"flex-end"}}><GBtn onClick={()=>exportChange({changeName:cname,changeType:ctype,groups,scope,adkarScores,rfactors,adkar:ADKAR,resistance:RESISTANCE,resResp:RES_RESP,interventions:ADKAR_INTERVENTIONS})}>↓ Download Plan</GBtn></div>}}



// ═══ MAIN APP SHELL ════════════════════════════════════════════════════════════
const TOOLS=[
  {id:"diagnostic",     num:"01",label:"Strategy Diagnostic",        sub:"Are we clear?",           icon:"◈"},
  {id:"prioritisation", num:"02",label:"Initiative Prioritisation",   sub:"What matters most?",      icon:"◉"},
  {id:"decision",       num:"03",label:"The Decision Stack",          sub:"What should we choose?",  icon:"◐"},
  {id:"role",           num:"04",label:"Role & Strategy Analyser",    sub:"Who owns what?",          icon:"◑"},
  {id:"rhythm",         num:"05",label:"Operating Rhythm Builder",    sub:"How do we run it?",       icon:"◫"},
  {id:"kpi",            num:"06",label:"KPI & Performance Builder",   sub:"How do we measure it?",  icon:"◧"},
  {id:"capability",     num:"07",label:"Capability & Gap Mapper",     sub:"Can we actually do it?",  icon:"◨"},
  {id:"change",         num:"08",label:"Change & Adoption Planner",   sub:"Will people adopt it?",  icon:"◩"},
];

export default function SMRSuite(){
  const[activeTool,setActiveTool]=useState("diagnostic");
  const active=TOOLS.find(t=>t.id===activeTool);
  return(<div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
    <style>{CSS}</style>

    {/* Header */}
    <header style={{borderBottom:"1px solid rgba(44,74,62,0.12)",padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",background:BG,boxShadow:"0 1px 0 rgba(44,74,62,0.12)",position:"sticky",top:0,zIndex:200,flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <svg width="30" height="30" viewBox="0 0 120 120" fill="none"><ellipse cx="62" cy="60" rx="48" ry="52" stroke={CREAM} strokeWidth="1.5" strokeOpacity="0.5"/><ellipse cx="68" cy="60" rx="32" ry="52" stroke={CREAM} strokeWidth="1.5" strokeOpacity="0.5"/><ellipse cx="62" cy="60" rx="18" ry="20" stroke={CREAM} strokeWidth="1.5" strokeOpacity="0.5"/><circle cx="74" cy="60" r="10" fill={GOLD}/><circle cx="74" cy="60" r="5" fill={CREAM} fillOpacity="0.25"/><line x1="38" y1="28" x2="44" y2="90" stroke={CREAM} strokeWidth="1.2" strokeOpacity="0.4"/></svg>
        <div>
          <div style={{...serif,fontSize:13,fontWeight:700,color:G,lineHeight:1.1}}>STRATEGY <em style={{fontWeight:400,color:GOLD}}>Made Real</em></div>
          <div style={{...mono,fontSize:7,color:"rgba(44,74,62,0.62)",letterSpacing:"0.14em",textTransform:"uppercase",marginTop:2}}>Beyond theory. Into delivery. Powered by people.</div>
        </div>
      </div>
      <div style={{...mono,fontSize:9,color:"rgba(44,74,62,0.62)",letterSpacing:"0.12em",textAlign:"right",lineHeight:1.9,textTransform:"uppercase"}}>Strategy Execution Suite</div>
    </header>

    {/* Body — sidebar + content */}
    <div style={{display:"flex",flex:1,overflow:"hidden"}}>

      {/* Sidebar nav */}
      <div style={{width:240,flexShrink:0,borderRight:"1px solid rgba(44,74,62,0.12)",background:"rgba(44,74,62,0.04)",overflowY:"auto",position:"sticky",top:57,height:"calc(100vh - 57px)"}}>
        <div style={{padding:"16px 0"}}>
          {TOOLS.map(tool=>(
            <button key={tool.id} onClick={()=>setActiveTool(tool.id)} style={{width:"100%",background:activeTool===tool.id?"rgba(212,168,71,0.12)":"transparent",border:"none",borderLeft:activeTool===tool.id?`3px solid ${GOLD}`:"3px solid transparent",padding:"12px 18px",cursor:"pointer",textAlign:"left",transition:"all 0.15s",display:"flex",gap:12,alignItems:"center"}}>
              <span style={{...mono,fontSize:13,color:activeTool===tool.id?GOLD:"rgba(212,168,71,0.3)",flexShrink:0}}>{tool.icon}</span>
              <div style={{minWidth:0}}>
                <div style={{...mono,fontSize:9,color:activeTool===tool.id?GOLD:"rgba(247,244,239,0.3)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:2}}>{tool.num}</div>
                <div style={{...serif,fontSize:12,fontWeight:700,color:activeTool===tool.id?CREAM:"rgba(247,244,239,0.4)",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tool.label}</div>
                <div style={{fontSize:10,color:activeTool===tool.id?"rgba(247,244,239,0.5)":"rgba(247,244,239,0.2)",marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tool.sub}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{padding:"16px 18px",borderTop:"1px solid rgba(44,74,62,0.1)",marginTop:"auto"}}>
          <div style={{...mono,fontSize:8,color:"rgba(44,74,62,0.88)",letterSpacing:"0.08em",lineHeight:1.8}}>Strategy Made Real<br/>Execution Suite<br/>Eight Tools</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>

        {/* Tool hero strip */}
        <div style={{padding:"24px 32px 20px",borderBottom:"1px solid rgba(44,74,62,0.1)",position:"relative",overflow:"hidden",flexShrink:0}}>
          <div style={{position:"absolute",right:24,top:"50%",transform:"translateY(-50%)",opacity:0.04,pointerEvents:"none"}}><svg width="130" height="130" viewBox="0 0 120 120" fill="none"><ellipse cx="62" cy="60" rx="48" ry="52" stroke={CREAM} strokeWidth="1.5"/><ellipse cx="68" cy="60" rx="32" ry="52" stroke={CREAM} strokeWidth="1.5"/><ellipse cx="62" cy="60" rx="18" ry="20" stroke={CREAM} strokeWidth="1.5"/><circle cx="74" cy="60" r="10" fill={GOLD}/><line x1="38" y1="28" x2="44" y2="90" stroke={CREAM} strokeWidth="1.2"/></svg></div>
          <div style={{...mono,fontSize:10,color:GOLD,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:4}}>Tool {active.num}</div>
          <div style={{...serif,fontSize:"clamp(18px,2.5vw,30px)",fontWeight:700,color:G,lineHeight:1.15}}>{active.label}</div>
          <div style={{fontSize:13,color:"rgba(44,74,62,0.72)",marginTop:4}}>{active.sub}</div>
        </div>

        {/* Tool body */}
        <div style={{padding:"28px 32px 64px",maxWidth:activeTool==="role"?"none":960,flex:1,background:BG}}>
          {activeTool==="diagnostic"     && <Tool1Diagnostic/>}
          {activeTool==="prioritisation" && <Tool2Prioritisation/>}
          {activeTool==="decision"       && <Tool3DecisionStack/>}
          {activeTool==="role"           && <Tool4RoleAnalyser/>}
          {activeTool==="rhythm"         && <Tool5OperatingRhythm/>}
          {activeTool==="kpi"            && <Tool6KPIBuilder/>}
          {activeTool==="capability"     && <Tool7CapabilityMapper/>}
          {activeTool==="change"         && <Tool8ChangeAdoption/>}
        </div>

      </div>
    </div>
  </div>);
}
