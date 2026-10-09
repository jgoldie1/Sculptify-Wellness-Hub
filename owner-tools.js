const GRANT_DRAFT_URL='https://fxluchtdfpediivhoksl.supabase.co/functions/v1/sculptify-grant-draft';
const OWNER_EXPORT_URL='https://fxluchtdfpediivhoksl.supabase.co/functions/v1/sculptify-owner-export';
const OWNER_COACH_URL='https://fxluchtdfpediivhoksl.supabase.co/functions/v1/sculptify-owner-coach';
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
window.loadSculptifyOwnerTools=async()=>{await Promise.all([loadOwnerTasks(),loadBusinessAcademy(),loadProductPipeline(),loadGrantCenter()]);};
document.addEventListener('DOMContentLoaded',()=>{const b=document.querySelector('#download-backup');if(b)b.onclick=downloadBackup;const r=document.querySelector('#grant-refresh');if(r)r.onclick=loadGrantCenter;const c=document.querySelector('#owner-coach-btn');if(c)c.onclick=runOwnerCoach;});