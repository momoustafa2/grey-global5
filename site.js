const RAD=(()=>{let r='';for(let i=0;i<5;i++)r+=`<path d="M200 ${34+i*20}Q300 ${16+i*20} 400 ${34+i*20}" opacity=".35"/>`;return `<g fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.4)" stroke-width="2"><ellipse cx="248" cy="74" rx="58" ry="52"/><ellipse cx="352" cy="74" rx="58" ry="52"/><path d="M300 12v118" fill="none"/><g fill="none" stroke-width="1.5">${r}</g></g><rect x="224" y="52" width="46" height="34" fill="none" stroke="#14B8A6" stroke-width="2"/><rect class="scan" x="40" y="0" width="3" height="140" fill="#2563EB"/>`})();
const SURG=`<defs><radialGradient id="sv"><stop offset="0" stop-color="#7f1d1d" stop-opacity=".55"/><stop offset="1" stop-color="#0A1628"/></radialGradient></defs><circle cx="300" cy="70" r="64" fill="url(#sv)" stroke="rgba(255,255,255,.45)" stroke-width="2"/><path d="M238 120L292 84M364 120L316 86" stroke="#14B8A6" stroke-width="5" stroke-linecap="round"/><circle class="blink" cx="436" cy="26" r="5" fill="#EF4444"/><text x="448" y="30" fill="#fff" font-size="12" font-family="monospace">REC</text><rect x="150" y="130" width="300" height="3" fill="rgba(255,255,255,.2)"/><rect x="150" y="130" width="120" height="3" fill="#2563EB"/><rect x="270" y="130" width="70" height="3" fill="#14B8A6"/>`;
const LD=`Arabic|eg|Egyptian:eg,Gulf:sa,Levantine:lb,Maghrebi:ma,Sudanese:sd
English|us|American:us,British:gb,Indian:in,Australian:au,Nigerian:ng
French|fr|France:fr,Canadian:ca,Belgian:be,West African:sn
Spanish|es|Castilian:es,Mexican:mx,Argentine:ar,Colombian:co
Portuguese|br|Brazilian:br,European:pt,Angolan:ao
German|de|Standard:de,Austrian:at,Swiss:ch
Italian|it|Standard:it,Swiss Italian:ch
Dutch|nl|Netherlands:nl,Flemish:be
Russian|ru|Standard:ru,Kazakhstan:kz
Ukrainian|ua|Central:ua,Western:ua
Polish|pl|Standard:pl
Czech|cz|Bohemian:cz,Moravian:cz
Romanian|ro|Standard:ro,Moldovan:md
Greek|gr|Standard:gr,Cypriot:cy
Turkish|tr|Istanbul:tr,Anatolian:tr
Hebrew|il|Standard:il
Persian|ir|Iranian:ir,Dari:af,Tajik:tj
Urdu|pk|Pakistani:pk,Indian:in
Hindi|in|Standard:in,Fiji Hindi:fj
Bengali|bd|Bangladeshi:bd,West Bengal:in
Punjabi|in|Indian:in,Pakistani:pk
Tamil|in|Indian:in,Sri Lankan:lk,Singaporean:sg
Telugu|in|Telangana:in,Andhra:in
Marathi|in|Standard:in,Varhadi:in
Gujarati|in|Standard:in,Kathiawadi:in
Nepali|np|Nepal:np,Indian Nepali:in
Sinhala|lk|Standard:lk
Mandarin|cn|Mainland:cn,Taiwanese:tw,Singaporean:sg
Cantonese|hk|Hong Kong:hk,Guangzhou:cn
Japanese|jp|Tokyo:jp,Kansai:jp
Korean|kr|Seoul:kr,Gyeongsang:kr
Vietnamese|vn|Northern:vn,Southern:vn
Thai|th|Central:th,Northern:th,Isan:th
Indonesian|id|Standard:id,Jakarta:id
Malay|my|Malaysian:my,Bruneian:bn
Filipino|ph|Tagalog:ph,Cebuano:ph
Khmer|kh|Standard:kh
Burmese|mm|Standard:mm
Swahili|ke|Kenyan:ke,Tanzanian:tz,Congolese:cd
Amharic|et|Standard:et
Hausa|ng|Nigerian:ng,Niger:ne
Yoruba|ng|Standard:ng
Igbo|ng|Standard:ng
Zulu|za|Standard:za
Afrikaans|za|South African:za,Namibian:na
Somali|so|Standard:so,Djibouti:dj
Swedish|se|Standard:se,Finland Swedish:fi
Norwegian|no|Bokmål:no,Nynorsk:no
Danish|dk|Standard:dk
Finnish|fi|Standard:fi
Hungarian|hu|Standard:hu
Bulgarian|bg|Standard:bg
Serbian|rs|Ekavian:rs,Ijekavian:ba
Croatian|hr|Standard:hr
Slovak|sk|Standard:sk
Lithuanian|lt|Standard:lt
Kazakh|kz|Standard:kz
Uzbek|uz|Standard:uz
Azerbaijani|az|Standard:az,Iranian:ir
Georgian|ge|Standard:ge
Armenian|am|Eastern:am,Western:lb
Pashto|af|Afghan:af,Pakistani:pk
Kurdish|iq|Sorani:iq,Kurmanji:tr
Malayalam|in|Standard:in
Kannada|in|Standard:in`;
const FL=(c,s=20)=>`<img class="fl" src="https://flagcdn.com/w40/${c}.png" srcset="https://flagcdn.com/w80/${c}.png 2x" width="${s}" height="${Math.round(s*.75)}" alt="" loading="lazy">`;
const LGS=LD.split('\n').map(r=>{const[a,b,c]=r.split('|');return{n:a,f:b,d:c.split(',').map(x=>x.split(':'))}});
const PAGES=[['index.html','Home'],['catalog.html','Catalog'],['custom-orders.html','Custom orders'],['languages.html','Languages'],['quality.html','Quality'],['contact.html','Contact']];
const cur=location.pathname.split('/').pop()||'index.html';
const li='<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" style="display:inline;vertical-align:-2px"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>';
const L=PAGES.slice(1,5).concat([PAGES[5]]);
document.getElementById('hdr').outerHTML=`<header><nav class="nav wrap"><a href="index.html" class="logo"><i></i>Grey Global</a><div class="links">${PAGES.slice(1).map(p=>`<a href="${p[0]}" class="${p[0]==cur?'on':''}">${p[1]}</a>`).join('')}</div><a href="contact.html" class="btn btn-d links" style="gap:0;padding:10px 16px">Request data</a><button class="burger" id="bg" aria-expanded="false">Menu</button></nav><div class="mm" id="mm">${PAGES.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('')}</div></header>`;
document.getElementById('bg').onclick=e=>{const o=document.getElementById('mm').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
document.getElementById('ftr').outerHTML=`<footer><div class="wrap"><div class="fg"><div><a href="index.html" class="logo"><i></i>Grey Global</a><p>Consented audio, image and video data for AI teams, in 65 languages.</p></div><div><h4>Explore</h4><ul>${PAGES.slice(0,5).map(p=>`<li><a href="${p[0]}">${p[1]}</a></li>`).join('')}</ul></div><div><h4>Contact</h4><ul><li><a href="mailto:ceo@grey-global.com">ceo@grey-global.com</a></li><li><a href="https://www.linkedin.com/company/grey-global-ai/" target="_blank" rel="noopener noreferrer">${li} LinkedIn</a></li><li>Reply within one business day</li></ul></div></div><div class="copy">© 2026 Grey Global. Data collected with consent, everywhere.</div></div></footer>`;
// waveform
const w=document.getElementById('wave');if(w){let s=42;const r=()=>(s=(s*1103515245+12345)%2147483648)/2147483648;for(let i=0;i<130;i++){const b=document.createElement('b');b.style.height=8+r()*92+'%';b.style.setProperty('--d',(-r()*2)+'s');if(i%17==3)b.className='s';else if(i%23==9)b.className='a';w.appendChild(b)}}
// marquee
const t=document.getElementById('track');if(t)t.innerHTML=[...LGS,...LGS].map(l=>`<span>${FL(l.f,22)}<b>${l.n}</b></span>`).join('');
const lg=document.getElementById('langs');if(lg){lg.innerHTML=LGS.map(l=>`<article class="lc" data-s="${(l.n+' '+l.d.map(x=>x[0]).join(' ')).toLowerCase()}"><div class="lh">${FL(l.f,36)}<div><h3>${l.n}</h3><span>5,000+ hrs conversational audio</span></div></div><ul class="dl">${l.d.map(x=>`<li>${FL(x[1],16)}${x[0]}</li>`).join('')}</ul></article>`).join('');const q=document.getElementById('lq'),cn=document.getElementById('lcount');const up=()=>{const v=q.value.trim().toLowerCase();let n=0;lg.querySelectorAll('.lc').forEach(e=>{const m=!v||e.dataset.s.includes(v);e.hidden=!m;if(m)n++});cn.textContent=n+' of '+LGS.length+' languages'};q.oninput=up;up()}
// catalog
const DS=[['DS-0410','Radiology image library','image','1,000,000+ images · DICOM + PNG','De-identified · clinician-reviewed labels','rad'],['DS-0427','Surgical procedure video','video','Laparoscopic and open surgery · 1080p+','Phase and instrument labeled','surg'],['DS-0142','Conversational Arabic (Egyptian) speech','audio','40 hrs · 16 kHz WAV','Transcribed and verified'],['DS-0098','Everyday kitchen objects','image','12,000 images · COCO format','Bounding boxes'],['DS-0231','Retail storefront video','video','300 clips · 1080p','Action-labeled'],['DS-0176','Swahili read and spontaneous speech','audio','65 hrs · WAV','Verified transcripts'],['DS-0304','Hand gesture video set','video','8,500 clips · MP4','Landmark-annotated'],['DS-0059','Multilingual form scans','image','25,000 pages · 14 languages','OCR-ready']];
function thumb(t,c=''){let g='';if(t=='audio'){let s=7;for(let i=0;i<48;i++){s=(s*9301+49297)%233280;const h=10+s/233280*80;g+=`<rect x="${6+i*12.5}" y="${70-h/2}" width="7" height="${h}" fill="${i%11==4?'#2563EB':'rgba(255,255,255,.28)'}"/>`}}
else if(t=='image'){g='<rect x="60" y="30" width="150" height="90" fill="none" stroke="#2563EB" stroke-width="2"/><rect x="250" y="55" width="110" height="70" fill="none" stroke="#14B8A6" stroke-width="2"/><rect x="400" y="25" width="90" height="100" fill="none" stroke="#2563EB" stroke-width="2"/><g fill="rgba(255,255,255,.2)"><rect x="70" y="40" width="130" height="70"/><rect x="260" y="65" width="90" height="50"/><rect x="410" y="35" width="70" height="80"/></g>'}
else if(t=='rad'){g=RAD}else if(t=='surg'){g=SURG}else g='<rect x="150" y="20" width="260" height="100" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.4)"/><path d="M265 52l36 18-36 18z" fill="#fff"/><rect x="150" y="128" width="260" height="3" fill="rgba(255,255,255,.2)"/><rect x="150" y="128" width="90" height="3" fill="#2563EB"/>';
return `<div class="thumb${c}"><svg viewBox="0 0 600 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${g}</svg></div>`}
const cg=document.getElementById('cat');if(cg){const n=+cg.dataset.n||99;const draw=f=>{cg.innerHTML=DS.filter(d=>(f=='all'||d[2]==f||(f=='med'&&d[5]))).slice(0,n).map(d=>`<article class="card">${thumb(d[5]||d[2])}<div class="body"><span class="id">${d[0]}</span><h3 style="font:600 17px var(--fb)">${d[1]}</h3><div class="meta"><span>${d[3]}</span><span>${d[4]}</span></div><div class="foot"><span class="tag">${d[2]}</span><a class="link" href="contact.html?ds=${d[0]}">Request access</a></div></div></article>`).join('')};draw('all');
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');draw(b.dataset.f)})}
// stat counters
document.querySelectorAll('[data-c]').forEach(e=>{const to=+e.dataset.c,sf=e.dataset.s||'',d=e.dataset.d||0;let st=null;const f=ts=>{st??=ts;const p=Math.min((ts-st)/1100,1);e.textContent=(to*p).toLocaleString(undefined,{maximumFractionDigits:d,minimumFractionDigits:d})+sf;if(p<1)requestAnimationFrame(f)};new IntersectionObserver((a,o)=>{if(a[0].isIntersecting){requestAnimationFrame(f);o.disconnect()}}).observe(e)});
// form
const fm=document.getElementById('requestForm');if(fm){const q=new URLSearchParams(location.search).get('ds');if(q)document.getElementById('details').value='I would like access to dataset '+q+'. ';
fm.onsubmit=async e=>{e.preventDefault();const ok=document.getElementById('ok'),er=document.getElementById('err'),b=document.getElementById('sb');ok.classList.remove('show');er.classList.remove('show');b.disabled=true;const l=b.textContent;b.textContent='Sending…';try{const r=await fetch(fm.action,{method:'POST',body:new FormData(fm),headers:{Accept:'application/json'}});if(r.ok){ok.classList.add('show');fm.reset()}else er.classList.add('show')}catch(x){er.classList.add('show')}b.disabled=false;b.textContent=l}}
document.querySelectorAll('.thumb[data-t]').forEach(e=>e.outerHTML=thumb(e.dataset.t,e.classList.contains('big')?' big':''));
document.querySelectorAll('.ah').forEach(g=>{const s=g.closest('svg');let h='',x=7;for(let i=0;i<48;i++){x=(x*9301+49297)%233280;const v=10+x/233280*80;h+=`<rect x="${6+i*12.5}" y="${70-v/2}" width="7" height="${v}" fill="${i%11==4?'#2563EB':'rgba(255,255,255,.28)'}"/>`}g.innerHTML=h});

if(!matchMedia('(prefers-reduced-motion:reduce)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.card,.q,.step,.cert,.lc,.stat,.flow>div').forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=(i%6)*70+'ms';io.observe(e)})}

const RD=`Quechua|pe,Aymara|bo,Guarani|py,Nahuatl|mx,Yucatec Maya|mx,Mapudungun|cl,Navajo|us,Cherokee|us,Inuktitut|ca,Cree|ca,Hawaiian|us,Maori|nz,Samoan|ws,Tongan|to,Fijian|fj,Tok Pisin|pg,Tetum|tl,Chamorro|gu,Welsh|gb-wls,Irish|ie,Scottish Gaelic|gb-sct,Breton|fr,Basque|es,Galician|es,Faroese|fo,Icelandic|is,Maltese|mt,Luxembourgish|lu,Albanian|al,Macedonian|mk,Latvian|lv,Estonian|ee,Belarusian|by,Tatar|ru,Bashkir|ru,Chechen|ru,Yakut|ru,Kyrgyz|kg,Turkmen|tm,Tajik|tj,Mongolian|mn,Tibetan|cn,Uyghur|cn,Dzongkha|bt,Lao|la,Hmong|la,Shan|mm,Sindhi|pk,Balochi|pk,Assamese|in,Odia|in,Maithili|in,Santali|in,Dhivehi|mv,Tigrinya|er,Oromo|et,Wolof|sn,Fula|gn,Bambara|ml,Shona|zw,Kinyarwanda|rw,Malagasy|mg,Lingala|cd,Twi|gh,Tamazight|ma`.split(',').map(x=>x.split('|'));
const SPC=(n,cc,id,k,tag)=>`<article class="lc" data-s="${n.toLowerCase()}"><div class="lh">${FL(cc,36)}<div><h3>${n}</h3><span>5,000+ hrs ${k}</span></div></div><div class="foot"><span class="tag">${tag}</span><a class="link" href="contact.html?ds=${id}">Request access</a></div></article>`;
const sp=document.getElementById('sp');if(sp){let kd='conv';const K={conv:['conversational speech','Conversational'],free:['free speech','Free speech']};const qs=document.getElementById('spq'),cn=document.getElementById('spcount');
const flt=()=>{const v=qs.value.trim().toLowerCase();let n=0;sp.querySelectorAll('.lc').forEach(e=>{const m=!v||e.dataset.s.includes(v);e.hidden=!m;if(m)n++});cn.textContent=n+' of '+LGS.length+' languages'};
const dr=()=>{sp.innerHTML=LGS.map(l=>SPC(l.n,l.f,'SP-'+l.n.replace(/\W/g,'').toUpperCase()+'-'+kd.toUpperCase(),K[kd][0],K[kd][1])).join('');flt()};
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');kd=b.dataset.k;dr()});qs.oninput=flt;dr()}
const rr=document.getElementById('rr');if(rr)rr.innerHTML=RD.map(r=>SPC(r[0],r[1],'RARE-'+r[0].replace(/\W/g,'').toUpperCase(),'conversational and free speech','Rare language')).join('');
