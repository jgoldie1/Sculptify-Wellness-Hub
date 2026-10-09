const CLIENT_PROVISION_URL=window.SCULPTIFY_FUNCTION_URL('sculptify-client-provision');
async function loadTemplateStudio(){
 const select=document.querySelector('#template-select'),list=document.querySelector('#client-sites');if(!select||!list)return;
 const [tr,sr]=await Promise.all([db.from('sculptify_site_templates').select('*').eq('active',true).order('sort_order'),db.from('sculptify_client_sites').select('*').order('created_at',{ascending:false})]);
 if(!tr.error)select.innerHTML='<option value="">Choose template</option>'+(tr.data||[]).map(t=>'<option value="'+safe(t.template_key)+'">'+safe(t.name)+' — '+safe(t.vertical)+'</option>').join('');
 if(sr.error){list.textContent='Client sites unavailable.';return;}
 list.innerHTML=(sr.data||[]).map(s=>'<div class="client-site-row"><div><b>'+safe(s.business_name)+'</b><small>'+safe(s.vertical)+' • '+safe(s.status)+' • '+safe(s.slug)+'</small></div><div class="client-links"><a class="text-button" target="_blank" href="./client.html?site='+encodeURIComponent(s.slug)+'">View</a><a class="text-button" target="_blank" href="./client-editor.html">Editor</a></div></div>').join('')||'<div class="owner-mini-card">No client sites yet.</div>';
}
async function createClientSite(e){
 e.preventDefault();const status=document.querySelector('#template-studio-status');status.textContent='Creating client business…';
 const session=(await db.auth.getSession()).data.session;if(!session){status.textContent='Owner session expired.';return;}
 const payload={template_key:document.querySelector('#template-select').value,business_name:document.querySelector('#client-business-name').value.trim(),client_email:document.querySelector('#client-email').value.trim(),owner_name:document.querySelector('#client-owner-name').value.trim(),location:document.querySelector('#client-location').value.trim()};
 const r=await fetch(CLIENT_PROVISION_URL,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token},body:JSON.stringify(payload)});const d=await r.json().catch(()=>({}));
 if(!r.ok){status.textContent=d.error||'Could not create client site.';return;}
 status.textContent='Client site created. Send the client the Template Editor link and have them sign in with the assigned email.';
 e.target.reset();await loadTemplateStudio();
 const out=document.querySelector('#template-handoff');out.innerHTML='<div class="owner-mini-card"><b>'+safe(d.site.business_name)+'</b><p>Client editor: <code>'+location.origin+location.pathname.replace(/index\.html.*$/,'')+'client-editor.html</code></p><p>Public page: <code>'+location.origin+location.pathname.replace(/index\.html.*$/,'')+d.public_path+'</code></p></div>';
}
window.loadTemplateStudio=loadTemplateStudio;
document.addEventListener('DOMContentLoaded',()=>{const f=document.querySelector('#template-studio-form');if(f)f.onsubmit=createClientSite;});