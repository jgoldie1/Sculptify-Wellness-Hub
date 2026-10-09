const SUPABASE_URL='https://fxluchtdfpediivhoksl.supabase.co';
const SUPABASE_KEY='sb_publishable_y2OadDy1zy8QlWy-YAcdlg_uzAYMLzj';
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const money=v=>v==null||v===''?'':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(v));
async function load(){
 const slug=new URLSearchParams(location.search).get('site');const app=document.querySelector('#app');
 if(!slug){app.innerHTML='<div class="empty">No business site selected.</div>';return;}
 const {data,error}=await db.from('sculptify_client_sites').select('*').eq('slug',slug).maybeSingle();
 if(error||!data){app.innerHTML='<div class="empty">This site is not published yet, or you do not have preview access.</div>';return;}
 document.documentElement.style.setProperty('--primary',data.primary_color||'#d896ff');document.documentElement.style.setProperty('--secondary',data.secondary_color||'#e9c77f');document.documentElement.style.setProperty('--accent',data.accent_color||'#ff91b8');document.documentElement.style.setProperty('--bg',data.background_color||'#09070a');
 document.title=(data.business_name||'Business')+' — '+(data.vertical||'');
 const services=Array.isArray(data.services)?data.services:[];const faq=Array.isArray(data.faq)?data.faq:[];const products=Array.isArray(data.products)?data.products:[];
 const contact=[data.contact_phone?'<div><small>Phone</small><b>'+safe(data.contact_phone)+'</b></div>':'',data.contact_email?'<div><small>Email</small><b>'+safe(data.contact_email)+'</b></div>':'',data.location?'<div><small>Location</small><b>'+safe(data.location)+'</b></div>':''].join('');
 const servicesHtml=services.length?services.map(s=>'<article class="card"><span class="kicker">'+safe(s.category||'Service')+'</span><h3>'+safe(s.name||'Service')+'</h3><p>'+safe(s.description||'')+'</p>'+(s.price?'<div class="price">'+safe(s.price)+'</div>':'')+'</article>').join(''):'<div class="card"><p>Services will appear here.</p></div>';
 const productsHtml=products.length?products.map(p=>'<article class="card"><span class="kicker">'+safe(p.category||'Product')+'</span><h3>'+safe(p.name||'Product')+'</h3><p>'+safe(p.description||'')+'</p>'+(p.price?'<div class="price">'+safe(p.price)+'</div>':'')+'</article>').join(''):'';
 const faqHtml=faq.length?'<section class="section alt"><div class="wrap faq"><h2>Frequently Asked Questions</h2>'+faq.map(f=>'<details><summary>'+safe(f.question||'Question')+'</summary><p>'+safe(f.answer||'')+'</p></details>').join('')+'</div></section>':'';
 app.innerHTML='<nav class="nav"><div class="wrap"><a class="brand" href="#">'+safe(data.business_name)+'</a><a class="btn" href="'+safe(data.booking_url||'#contact')+'">'+safe(data.cta_label||'Book Now')+'</a></div></nav>'+
 '<section class="hero"><div class="wrap hero-grid"><div><span class="kicker">'+safe(data.vertical||'Business')+'</span><h1>'+safe(data.hero_title||data.business_name)+'</h1><p>'+safe(data.hero_subtitle||'')+'</p><p><a class="btn" href="'+safe(data.booking_url||'#contact')+'">'+safe(data.cta_label||'Book Now')+'</a></p></div><div class="hero-card">'+(data.logo_url?'<img src="'+safe(data.logo_url)+'" alt="">':'')+'<h2>'+safe(data.business_name)+'</h2><p>'+safe(data.location||'')+'</p><div class="powered">'+safe(data.ai_assistant_name||'HoloGPT')+' — '+safe(data.ai_brand_line||'Powered by Stubbs AI')+'</div></div></div></section>'+
 '<section class="section"><div class="wrap"><h2>Services</h2><div class="grid">'+servicesHtml+'</div></div></section>'+
 (productsHtml?'<section class="section alt"><div class="wrap"><h2>Shop</h2><div class="grid">'+productsHtml+'</div></div></section>':'')+
 faqHtml+
 '<section class="section" id="contact"><div class="wrap"><h2>Contact</h2><div class="contact">'+contact+'</div>'+(data.store_url?'<p><a class="btn" href="'+safe(data.store_url)+'">Visit Store</a></p>':'')+'</div></section>'+
 '<footer><div class="wrap"><b>'+safe(data.business_name)+'</b><div class="powered">'+safe(data.ai_assistant_name||'HoloGPT')+' — '+safe(data.ai_brand_line||'Powered by Stubbs AI')+'</div></div></footer>';
}
load();