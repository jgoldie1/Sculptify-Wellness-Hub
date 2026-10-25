#!/usr/bin/env node
'use strict';
// Sculptify pre-launch static SEO check. No network access or credentials.
// Usage: node scripts/seo-readiness.cjs
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const htmlFiles=fs.readdirSync(root).filter(f=>/\.html$/i.test(f));
const checks=[];
function add(page,check,passed,detail){checks.push({page,check,passed,detail});}
for(const file of htmlFiles){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 const title=html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g,' ').trim()||'';
 const desc=html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)/i)?.[1]||'';
 add(file,'title',title.length>=15&&title.length<=75,title||'Missing or unsuitable length');
 add(file,'meta-description',desc.length>=60&&desc.length<=170,desc||'Missing or unsuitable length');
 add(file,'viewport',/<meta\s+name=["']viewport["']/i.test(html),'Mobile viewport');
 add(file,'heading',/<h1\b/i.test(html),'At least one primary heading');
 add(file,'canonical',/<link\s+rel=["']canonical["']/i.test(html),'Canonical URL (only after final domain confirmed)');
 add(file,'structured-data',/<script\s+type=["']application\/ld\+json["']/i.test(html),'Structured data should contain verified business facts only');
 const links=[...html.matchAll(/\bhref=["']([^"'#?]+)(?:[?#][^"']*)?["']/gi)].map(x=>x[1]);
 const broken=[...new Set(links.filter(h=>!(/^(https?:|mailto:|tel:|\/\/|data:)/i.test(h))).filter(h=>!fs.existsSync(path.join(root,h.replace(/^\.\//,'')))) )];
 add(file,'local-link-targets',broken.length===0,broken.length?broken.join(', '):'Local link files present');
}
const robots=fs.existsSync(path.join(root,'robots.txt'))?fs.readFileSync(path.join(root,'robots.txt'),'utf8'):'';
add('robots.txt','exists',!!robots,'robots.txt present');
add('sitemap.xml','exists',fs.existsSync(path.join(root,'sitemap.xml')),'Create after canonical domain and public accessibility are confirmed');
const summary={date:new Date().toISOString().slice(0,10),mode:'static-source-only',files:htmlFiles.length,checks:checks.length,passed:checks.filter(c=>c.passed).length,warnings:checks.filter(c=>!c.passed),limitations:['No live HTTP/indexability test','No Search Console or analytics','No booking/payment tests','No verified final domain']};
console.log(JSON.stringify(summary,null,2));
// Deliberately do not fail CI for known pre-launch SEO warnings.
