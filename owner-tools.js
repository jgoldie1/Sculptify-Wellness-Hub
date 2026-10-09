const GRANT_DRAFT_URL=window.SCULPTIFY_FUNCTION_URL('sculptify-grant-draft');
const OWNER_EXPORT_URL=window.SCULPTIFY_FUNCTION_URL('sculptify-owner-export');
const OWNER_COACH_URL=window.SCULPTIFY_FUNCTION_URL('sculptify-owner-coach');
function os(id,msg,bad=false){const e=document.querySelector(id);if(!e)return;e.textContent=msg;e.style.color=bad?'#ff8c9b':'#87e4ab';}
function fm(v){return v==null?'Amount not listed':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(v));}
function fd(v){if(!v)return'No deadline';const d=new Date(v);return isNaN(d)?'No deadline':d.toLocaleDateString();}
async function ownerSession(){return (await db.auth.getSession()).data.session;}

async function loadOwnerTasks(){
 const e=document.querySelector('#owner-task-list');if(!e)return;
 const {data,error}=await db.from('sculptify_owner_tasks').select('*').order('sort_order');
 if(error){e.textContent='Task list unavailable.';return;}
 e.innerHTML=(data||[]).map(t=>`<div class="ops-row"><div><b>${safe(t.title)}</b><small>${safe(t.cadence)} • ${safe(t.category)}</small><p>${safe(t.instructions)}</p></div><select class="ops-status" data-id="${t.id}"><option value="open" ${t.status==='open'?'selected':''}>Open</option><option value="in_progress" ${t.status==='in_progress'?'selected':''}>In progress</option><option value="done" ${t.status==='done'?'selected':''}>Done</option><option value="blocked" ${t.status==='blocked'?'selected':''}>Blocked</option><option value="not_applicable" ${t.status==='not_applicable'?'selected':''}>N/A</option></select></div>`).join('');
 document.querySelectorAll('.ops-status').forEach(x=>x.onchange=async()=>{await db.from('sculptify_owner_tasks').update({status:x.value,last_completed_at:x.value==='done'?new Date().toISOString():null,updated_at:new Date().toISOString()}).eq('id',x.dataset.id);});
}

async function loadBusinessAcademy(){
 const e=document.querySelector('#business-academy');if(!e)return;
 const {data,error}=await db.from('sculptify_business_training').select('*').eq('active',true).order('sort_order');
 if(error){e.textContent='Business Academy unavailable.';return;}
 e.innerHTML=(data||[]).map(m=>`<details class="academy-item"><summary>${safe(m.title)} <span>${safe(m.category)}</span></summary><p>${safe(m.summary)}</p><p>${safe(m.lesson)}</p><ul>${(Array.isArray(m.checklist)?m.checklist:[]).map(i=>`<li>${safe(i)}</li>`).join('')}</ul></details>`).join('');
}

async function loadProductPipeline(){
 const e=document.querySelector('#product-pipeline');if(!e)return;
 const {data,error}=await db.from('sculptify_product_candidates').select('*').order('created_at');
 if(error){e.textContent='Product pipeline unavailable.';return;}
 e.innerHTML=(data||[]).map(p=>`<div class="ops-row"><div><b>${safe(p.product_name)}</b><small>${safe(p.category)} • ${safe(p.supplier_name||'Supplier not chosen')}</small><p>${safe(p.quality_notes||p.compliance_notes||'Research supplier, margin, shipping and compliance before publishing.')}</p></div><select class="product-stage" data-id="${p.id}"><option value="researching" ${p.status==='researching'?'selected':''}>Researching</option><option value="sample_ordered" ${p.status==='sample_ordered'?'selected':''}>Sample ordered</option><option value="approved" ${p.status==='approved'?'selected':''}>Approved</option><option value="rejected" ${p.status==='rejected'?'selected':''}>Rejected</option><option value="published" ${p.status==='published'?'selected':''}>Published</option></select></div>`).join('');
 document.querySelectorAll('.product-stage').forEach(x=>x.onchange=async()=>{await db.from('sculptify_product_candidates').update({status:x.value,updated_at:new Date().toISOString()}).eq('id',x.dataset.id);});
}

async function loadGrantCenter(){
 const e=document.querySelector('#grant-list');if(!e)return;
 const [or,ar,dr,sr]=await Promise.all([db.from('sculptify_grant_opportunities').select('*').order('deadline',{ascending:true,nullsFirst:false}),db.from('sculptify_grant_applications').select('*'),db.from('sculptify_grant_documents').select('*').order('category'),db.from('sculptify_grant_sources').select('*').eq('active',true).order('name')]);
 if(or.error){e.textContent='Grant Center unavailable.';return;}
 const apps=new Map((ar.data||[]).map(a=>[a.opportunity_id,a]));
 const docs=document.querySelector('#grant-docs');if(docs)docs.innerHTML=(dr.data||[]).map(d=>`<div class="doc-row"><span>${safe(d.label)}</span><select data-id="${d.id}" class="doc-state"><option value="missing" ${d.status==='missing'?'selected':''}>Missing</option><option value="requested" ${d.status==='requested'?'selected':''}>Requested</option><option value="ready" ${d.status==='ready'?'selected':''}>Ready</option><option value="needs_update" ${d.status==='needs_update'?'selected':''}>Needs update</option><option value="not_applicable" ${d.status==='not_applicable'?'selected':''}>N/A</option></select></div>`).join('');
 document.querySelectorAll('.doc-state').forEach(x=>x.onchange=async()=>{await db.from('sculptify_grant_documents').update({status:x.value,updated_at:new Date().toISOString()}).eq('id',x.dataset.id);});
 const sources=document.querySelector('#grant-sources');if(sources)sources.innerHTML=(sr.data||[]).map(s=>`<a class="source-row" href="${safe(s.url)}" target="_blank" rel="noopener"><b>${safe(s.name)}</b><small>${safe(s.focus||s.source_type)}</small></a>`).join('');
 e.innerHTML=(or.data||[]).map(o=>{const a=apps.get(o.id);const stage=a?.stage||o.status||'new';return `<article class="grant-card"><div><span class="mini-tag">${safe(o.funding_type)}</span><h5>${safe(o.title)}</h5><small>${safe(o.sponsor||'Sponsor not entered')}</small></div><div class="grant-meta"><span>${fm(o.amount_max)}</span><span>${fd(o.deadline)}</span><span>${safe(stage)}</span></div>${o.women_owned_relevance?`<p><b>Women-owned:</b> ${safe(o.women_owned_relevance)}</p>`:''}${a?`<details><summary>Prepared draft</summary><p>${safe(a.business_summary||'')}</p><p>${safe(a.project_description||'')}</p><p>${safe(a.narrative||'')}</p></details>`:''}<div class="grant-actions"><button class="button purple prepare-grant" data-id="${o.id}">Prepare Draft</button>${a?`<button class="button outline approve-grant" data-id="${a.id}">Owner Approve</button>`:''}${o.url?`<a class="text-button" href="${safe(o.url)}" target="_blank" rel="noopener">Official page</a>`:''}</div></article>`;}).join('')||'<div class="owner-mini-card">No saved opportunities yet. Monthly search can add candidates here.</div>';
 document.querySelectorAll('.prepare-grant').forEach(x=>x.onclick=()=>prepareGrant(x.dataset.id));
 document.querySelectorAll('.approve-grant').forEach(x=>x.onclick=()=>approveGrant(x.dataset.id));
}

async function prepareGrant(id){
 os('#grant-status','HoloGPT is preparing a draft for owner review…');const s=await ownerSession();if(!s){os('#grant-status','Sign in again.',true);return;}
 const r=await fetch(GRANT_DRAFT_URL,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+s.access_token},body:JSON.stringify({opportunity_id:id})});const d=await r.json().catch(()=>({}));
 os('#grant-status',r.ok?'Draft prepared. Nothing was submitted.':(d.error||'Draft failed.'),!r.ok);if(r.ok)await loadGrantCenter();
}
async function approveGrant(id){
 if(!confirm('Approve this draft as ready for owner submission? This does not submit it.'))return;
 const {error}=await db.from('sculptify_grant_applications').update({owner_approved:true,owner_approved_at:new Date().toISOString(),stage:'ready_to_submit',updated_at:new Date().toISOString()}).eq('id',id);
 os('#grant-status',error?'Could not approve.':'Owner approval recorded.',!!error);await loadGrantCenter();
}

async function downloadBackup(){
 os('#backup-status','Preparing private backup…');const s=await ownerSession();if(!s){os('#backup-status','Sign in again.',true);return;}
 const r=await fetch(OWNER_EXPORT_URL,{headers:{'Authorization':'Bearer '+s.access_token}});if(!r.ok){os('#backup-status','Backup failed.',true);return;}const b=await r.blob();const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='sculptify-backup-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);os('#backup-status','Private backup downloaded. Keep it out of public GitHub.');
}

async function runOwnerCoach(){
  os('#owner-coach-status','HoloGPT is reviewing the business…');
  const session=await ownerSession();if(!session){os('#owner-coach-status','Sign in again.',true);return;}
  const r=await fetch(OWNER_COACH_URL,{method:'POST',headers:{'Authorization':'Bearer '+session.access_token,'Content-Type':'application/json'},body:'{}'});
  const d=await r.json().catch(()=>({}));
  if(!r.ok){os('#owner-coach-status',d.error||'Owner coach unavailable.',true);return;}
  os('#owner-coach-status',d.coaching||'Here is today’s plan.');
  const e=document.querySelector('#owner-coach-plan');
  if(e)e.innerHTML=(d.actions||[]).map((a,i)=>'<div class="owner-mini-card"><b>'+(i+1)+'. '+safe(a.title||'Next action')+'</b><p>'+safe(a.reason||'')+'</p><small>'+safe(a.category||'Business')+' • Priority '+safe(a.priority??'')+'</small></div>').join('');
}
async function loadGrowthRoadmap(){
  const e=document.querySelector('#growth-roadmap'); if(!e)return;
  const {data,error}=await db.from('sculptify_growth_stages').select('*').eq('active',true).order('sort_order');
  if(error){e.textContent='Growth roadmap unavailable.';return;}
  e.innerHTML=(data||[]).map(g=>'<details class="academy-item growth-stage"><summary>'+safe(g.stage_name)+'</summary><p><b>Objective:</b> '+safe(g.objective)+'</p><p><b>Move here when:</b> '+safe(g.enter_when)+'</p><p><b>Owner actions</b></p><ul>'+(Array.isArray(g.owner_actions)?g.owner_actions:[]).map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul><p><b>HoloGPT / Stubbs AI</b></p><ul>'+(Array.isArray(g.hologpt_actions)?g.hologpt_actions:[]).map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul><p><b>Measure</b></p><ul>'+(Array.isArray(g.metrics_to_watch)?g.metrics_to_watch:[]).map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul><p class="warning-text"><b>Do not scale if:</b> '+(Array.isArray(g.do_not_scale_if)?g.do_not_scale_if.map(safe).join(' • '):'')+'</p></details>').join('');
}

function streetVerseTier(points){
  const n=Math.max(0,Number(points)||0);
  if(n>=4000)return{key:'global-wellness-partner',label:'Global Wellness Partner'};
  if(n>=1800)return{key:'san-diego-powerhouse',label:'San Diego Wellness Powerhouse'};
  if(n>=750)return{key:'district-leader',label:'Wellness District Leader'};
  if(n>=250)return{key:'neighborhood-anchor',label:'Neighborhood Anchor'};
  return{key:'startup',label:'Sculptify Startup'};
}
async function loadStreetVersePartnerCenter(){
  const e=document.querySelector('#streetverse-partner-center');if(!e)return;
  const [settingsRes,missionsRes,referralsRes,reputationRes]=await Promise.all([
    db.from('sculptify_streetverse_partner_settings').select('*').eq('id','primary').maybeSingle(),
    db.from('sculptify_streetverse_missions').select('*').eq('active',true).order('sort_order'),
    db.from('sculptify_streetverse_referrals').select('attribution_status,server_verified,eligible_platform_revenue_cents,partner_share_cents,currency'),
    db.from('sculptify_streetverse_reputation_events').select('points,server_verified,event_type')
  ]);
  if(settingsRes.error){e.innerHTML='<div class="owner-mini-card">StreetVerse Partner Center is not available in this Supabase project yet.</div>';return;}
  const settings=settingsRes.data||{};
  const referrals=referralsRes.data||[];
  const repEvents=reputationRes.data||[];
  const verifiedActivations=referrals.filter(r=>r.server_verified&&['verified-activation','eligible-revenue'].includes(r.attribution_status)).length;
  const eligibleRevenue=referrals.filter(r=>r.server_verified).reduce((n,r)=>n+Number(r.eligible_platform_revenue_cents||0),0);
  const eligibleShare=referrals.filter(r=>r.server_verified).reduce((n,r)=>n+Number(r.partner_share_cents||0),0);
  const reputation=repEvents.filter(r=>r.server_verified).reduce((n,r)=>n+Number(r.points||0),0);
  const tier=streetVerseTier(reputation);
  const pct=(Number(settings.partner_share_bps||0)/100).toFixed(Number(settings.partner_share_bps||0)%100===0?0:2);
  const moneyCents=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format((Number(n)||0)/100);
  e.innerHTML='<div class="sv-partner-grid">'+
    '<div class="sv-stat"><small>PARTNER CODE</small><b>'+safe(settings.partner_code||'SV-SCULPTIFY-SD')+'</b></div>'+
    '<div class="sv-stat"><small>DOMINANCE TIER</small><b>'+safe(tier.label)+'</b><span>'+safe(reputation)+' verified reputation</span></div>'+
    '<div class="sv-stat"><small>VERIFIED ACTIVATIONS</small><b>'+verifiedActivations+'</b><span>Raw scans/signups do not count</span></div>'+
    '<div class="sv-stat"><small>ELIGIBLE PARTNER SHARE</small><b>'+moneyCents(eligibleShare)+'</b><span>'+pct+'% starter share • '+moneyCents(eligibleRevenue)+' eligible platform revenue</span></div>'+
  '</div>'+
  '<div class="sv-policy"><b>Status: '+safe(settings.activation_status||'prepared')+'</b><p>The StreetVerse partner model is prepared. Cash settlement stays off until server-side attribution, partner terms and payout infrastructure are activated. It is one-level only and does not pay for raw scans or raw registrations.</p></div>'+
  '<div class="grant-toolbar"><b>Sculptify San Diego RP Missions</b><span>'+safe((missionsRes.data||[]).length)+' missions</span></div>'+
  '<div class="sv-mission-list">'+(missionsRes.data||[]).map(m=>'<div class="sv-mission"><div><span class="mini-tag">'+safe(m.mission_stage)+'</span><b>'+safe(m.title)+'</b><p>'+safe(m.summary)+'</p></div><strong>'+safe(m.reward_xp)+' XP</strong></div>').join('')+'</div>';
}

async function loadPlatformPackages(){
  const e=document.querySelector('#platform-packages'); if(!e)return;
  const {data,error}=await db.from('sculptify_platform_packages').select('*').eq('active',true).order('sort_order');
  if(error){e.textContent='Pricing packages unavailable.';return;}
  e.innerHTML=(data||[]).map(p=>'<div class="pricing-row"><div><b>'+safe(p.name)+'</b><small>'+safe(p.description)+'</small><p>'+safe(p.client_visible_note||'')+'</p></div><div class="price-chip">'+(p.billing_type==='percentage_optional'?safe(p.suggested_price)+'%':fm(p.suggested_price))+'<small>'+safe(p.billing_type)+'</small></div></div>').join('');
}
window.loadSculptifyOwnerTools=async()=>{await Promise.all([loadOwnerTasks(),loadBusinessAcademy(),loadProductPipeline(),loadGrantCenter(),loadGrowthRoadmap(),loadPlatformPackages(),loadStreetVersePartnerCenter()]);};
document.addEventListener('DOMContentLoaded',()=>{const b=document.querySelector('#download-backup');if(b)b.onclick=downloadBackup;const r=document.querySelector('#grant-refresh');if(r)r.onclick=loadGrantCenter;const c=document.querySelector('#owner-coach-btn');if(c)c.onclick=runOwnerCoach;});