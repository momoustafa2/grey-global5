// Copies src/ to dist/ and generates the language, video-type and image-type pages.
const fs=require('fs'),path=require('path');
const SRC='src',OUT='dist';
fs.rmSync(OUT,{recursive:true,force:true});
fs.cpSync(SRC,OUT,{recursive:true});
const J=fs.readFileSync(SRC+'/site.js','utf8');
const LD=J.match(/const LD=`([\s\S]*?)`;/)[1].split('\n');
const RD=J.match(/const RD=`([\s\S]*?)`/)[1].split(',').map(x=>x.split('|'));
const core=LD.map(r=>{const[n,f,d]=r.split('|');return{n,f,d:d.split(',').map(x=>x.split(':'))}});
const rare=RD.map(([n,f])=>({n,f}));
const SL=n=>n.toLowerCase().replace(/ /g,'-');
const FL=(c,s=20)=>`<img class="fl" src="https://flagcdn.com/w40/${c}.png" srcset="https://flagcdn.com/w80/${c}.png 2x" width="${s}" height="${Math.round(s*.75)}" alt="" loading="lazy">`;
const urls=['/','/catalog','/custom-orders','/languages','/quality','/contact','/video','/images'];
const w=(f,h)=>{const p=path.join(OUT,f);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,h)};
const page=(p,t,d,b)=>`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${t} — Grey Global</title><meta name="description" content="${d}"><link rel="canonical" href="https://grey-global.com${p}"><link rel="icon" href="/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/favicon.png"><meta property="og:image" content="https://grey-global.com/favicon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"></head><body><div id="hdr"></div><main>${b}</main><div id="ftr"></div><script src="/site.js"></script></body></html>`;
const CTA=h=>`<div class="cta-band"><div class="wrap"><h2>${h}</h2><a class="btn" href="/contact">Request a dataset</a></div></div>`;
const FLOW='<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">What you get</span><h2>Every dataset ships with</h2></div><div class="flow"><div><b>Files</b>In your format, checksummed</div><div><b>Metadata</b>Speaker, device, locale</div><div><b>Transcripts and labels</b>Every audio file, QA-passed</div><div><b>License</b>Clear usage terms</div></div></div></section>';
const chips=a=>'<ul class="dl">'+a.map(i=>`<li>${i}</li>`).join('')+'</ul>';
const neigh=(l,i)=>'<ul class="dl rel">'+[1,2,3,4,5,6].map(k=>{const o=l[(i+k)%l.length];return `<li><a href="/languages/${SL(o.n)}">${FL(o.f,16)} ${o.n}</a></li>`}).join('')+'</ul>';
const card=(id,t,p,tag,ds)=>`<div class="card"><div class="body"><span class="id">${id}</span><h3 style="font:600 18px var(--fb)">${t}</h3><p style="color:var(--grey);font-size:15px">${p}</p><div class="foot"><span class="tag">${tag}</span><a class="link" href="/contact?ds=${ds||id}">Request access</a></div></div></div>`;
function lang(l,i,kind){
  const{n,f,d}=l,slug=SL(n),p='/languages/'+slug,id=n.replace(/ /g,'').toUpperCase();urls.push(p);
  const hero=`<div class="page-hero"><div class="wrap"><nav class="crumb"><a href="/languages">Languages</a> / ${n}</nav><div class="hf">${FL(f,56)}</div><h1>${n} speech data</h1><p>Conversational and free speech from native ${n} speakers, transcribed and labeled.${kind=='rare'?' Rare, low-resource language.':''}</p></div></div>`;
  let kp,dia='',req,rel;
  if(kind=='core'){
    kp=`<div class="grid3"><div class="kpi"><b>5,000+</b><span>hours of conversational speech</span></div><div class="kpi"><b>5,000+</b><span>hours of free speech</span></div><div class="kpi"><b>${d.length}</b><span>${d.length==1?'dialect':'dialects'} covered</span></div></div>`;
    dia=`<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Dialects</span><h2>Regional varieties of ${n}</h2><p>Recorded by native speakers from each region.</p></div>${chips(d.map(([x,c])=>FL(c,16)+x))}</div></section>`;
    req=`<div class="grid2">${card('SP-'+id+'-CONV',n+' conversational speech','Two native speakers talking naturally. 5,000+ hours, transcribed and labeled.','Audio')}${card('SP-'+id+'-FREE',n+' free speech','One speaker talking unscripted on open topics. 5,000+ hours, transcribed and labeled.','Audio')}</div>`;
    rel=neigh(core,i);
  }else{
    kp='<div class="grid3"><div class="kpi"><b>5,000+</b><span>hours of conversational and free speech</span></div><div class="kpi"><b>Rare</b><span>low-resource language</span></div><div class="kpi"><b>100%</b><span>transcribed and labeled</span></div></div>';
    req=`<div class="grid2">${card('RARE-'+id,n+' conversational and free speech','Native speakers, 5,000+ hours, transcribed and labeled.','Rare language')}</div>`;
    rel=neigh(rare,i);
  }
  w(`languages/${slug}.html`,page(p,n+' speech data',`${n} speech data: 5,000+ hours of conversational and free speech, transcribed and labeled. Request a dataset.`,hero+`<section><div class="wrap">${kp}</div></section>`+dia+`<section><div class="wrap"><div class="head"><span class="eyebrow">Datasets</span><h2>Request ${n} data</h2></div>${req}</div></section>`+FLOW+`<section><div class="wrap"><div class="head"><span class="eyebrow">More languages</span><h2>Related languages</h2></div>${rel}</div></section>`+CTA(`Need more ${n} data? We will build it.`)));
}
core.forEach((l,i)=>lang(l,i,'core'));rare.forEach((l,i)=>lang({...l,d:[]},i,'rare'));
const V=[['surgical-procedures','Surgical procedure video','Recorded laparoscopic and open surgery, labeled by phase and instrument.','surg','DS-0427',['Laparoscopic and open surgery','1080p+','Phase and instrument labeled','De-identified'],['Workflow recognition','Skill assessment','Tool tracking']],
['retail-storefront','Retail storefront video','Storefront footage with action labels.','video','DS-0231',['300 clips','1080p','Action-labeled'],['Customer behavior analytics','Footfall counting','Loss prevention']],
['hand-gestures','Hand gesture video','Gesture clips with landmark annotations.','video','DS-0304',['8,500 clips','MP4','Landmark-annotated'],['Gesture control','Hand tracking','AR and VR input']],
['action-clips','Action and scenario clips','Scripted scenarios and action clips shot to your protocol.','video',null,['Scripted to your spec','Action-labeled','Any locale'],['Action recognition','Activity detection','Safety monitoring']],
['ambient-footage','Ambient footage','Real-world environment footage captured to your brief.','video',null,['Real-world locations','Any locale','Labeled to spec'],['Scene understanding','Autonomous systems','Anomaly detection']],
['multi-camera','Multi-camera capture','Synchronized views of the same scene from several angles.','video',null,['Multiple angles','Synchronized','Labeled to spec'],['3D reconstruction','Pose estimation','Tracking across views']]];
const I=[['radiology-images','Radiology image library','1,000,000+ radiology images with clinician-reviewed labels.','rad','DS-0410',['1,000,000+ images','DICOM and PNG','De-identified','Clinician-reviewed labels'],['Detection','Segmentation','Triage']],
['everyday-objects','Everyday objects','Household object photos with bounding boxes.','image','DS-0098',['12,000 images','COCO format','Bounding boxes'],['Object detection','Home and retail robotics','Visual search']],
['document-scans','Multilingual document scans','Form and document scans ready for OCR.','image','DS-0059',['25,000 pages','14 languages','OCR-ready'],['OCR','Document intelligence','Form extraction']],
['scene-captures','Scene captures','Photographs of real scenes captured to your shot list.','image',null,['Shot to your list','Any locale','Labeled to spec'],['Scene classification','Autonomous systems','Visual search']],
['segmentation','Segmentation and bounding boxes','Images labeled to your bounding-box or segmentation spec.','image',null,['Bounding boxes','Segmentation masks','QA-passed'],['Instance segmentation','Semantic segmentation','Detection']]];
function types(T,folder,label,hub){
  T.forEach(([s,t,tg,th,ds,specs,uses],k)=>{
    const p=`/${folder}/${s}`;urls.push(p);
    const hero=`<div class="page-hero"><div class="wrap"><nav class="crumb"><a href="/${hub}">${label} types</a> / ${t}</nav><h1>${t}</h1><p>${tg}</p></div></div>`;
    const ov=`<section><div class="wrap split"><div><span class="eyebrow">Overview</span><h2>${t}</h2><p style="margin:14px 0 18px;color:var(--grey)">${tg} Delivered in your format and schema, with an audit trail for every file.</p>${chips(specs)}<h3 style="font:700 17px var(--fb);margin:26px 0 10px">Used for</h3>${chips(uses)}</div><div class="thumb big" data-t="${th}"></div></div></section>`;
    const av=ds?`<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Available now</span><h2>Request this dataset</h2></div><div class="card" style="max-width:520px"><div class="body"><span class="id">${ds}</span><h3 style="font:600 18px var(--fb)">${t}</h3><div class="meta"><span>${specs.join(' · ')}</span></div><div class="foot"><span class="tag">${label.toLowerCase()}</span><a class="link" href="/contact?ds=${ds}">Request access</a></div></div></div></div></section>`
      :'<section class="alt"><div class="wrap"><div class="head"><span class="eyebrow">Custom order</span><h2>Built to your spec</h2><p>We capture and label this to your protocol, in any language or locale. Scope and timeline come back within one business day.</p></div><a class="btn btn-p" href="/contact">Start a custom order</a></div></section>';
    const rel='<ul class="dl rel">'+T.filter((_,j)=>j!=k).map(o=>`<li><a href="/${folder}/${o[0]}">${o[1]}</a></li>`).join('')+'</ul>';
    w(`${folder}/${s}.html`,page(p,t,`${t}: ${tg}`,hero+ov+av+FLOW+`<section><div class="wrap"><div class="head"><span class="eyebrow">More</span><h2>Other ${label.toLowerCase()} types</h2></div>${rel}</div></section>`+CTA('Tell us what your model needs to learn.')));
  });
  const cards=T.map(([s,t,tg,th,ds])=>`<a class="card mod" href="/${folder}/${s}"><div class="thumb" data-t="${th}"></div><div class="body"><h3>${t}</h3><p>${tg}</p><div><span class="tag">${ds?'Available now':'Custom order'}</span></div><span class="link">View details</span></div></a>`).join('');
  w(hub+'.html',page('/'+hub,`${label} datasets by type`,`${label} datasets by type from Grey Global.`,`<div class="page-hero"><div class="wrap"><span class="eyebrow">${label}</span><h1>${label} datasets by type</h1><p>Pick a type to see specs, uses and how to request it.</p></div></div><section><div class="wrap"><div class="grid3">${cards}</div></div></section>`+CTA('Need a type we do not list?')));
}
types(V,'video','Video','video');types(I,'images','Image','images');
w('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(u=>`<url><loc>https://grey-global.com${u}</loc></url>`).join('')+'</urlset>');
console.log('Built',urls.length,'pages into',OUT);
