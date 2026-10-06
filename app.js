// self-heal: if a file is not at its expected path, try other common locations (handles flat or misplaced uploads)
document.addEventListener('error',e=>{const t=e.target;if(!t||!['IMG','VIDEO','SOURCE'].includes(t.tagName))return;
 const cur=t.getAttribute('src')||'',base=cur.split('/').pop().split('?')[0];if(!base)return;
 const tried=(t.dataset.tried||'').split('|').filter(Boolean);tried.push(cur);
 const next=[base,'assets/'+base,'assets/img/'+base,'assets/video/'+base,'assets/logo/'+base,'img/'+base,'images/'+base].find(c=>!tried.includes(c));
 if(next){t.dataset.tried=tried.join('|');t.setAttribute('src',next);t.tagName=='VIDEO'&&t.load()}},true);
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const C=SITE_CONFIG,esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cats=C.categories;
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),3800)};
// brand + discord (single source: SITE_CONFIG.discordInvite)
$$('[data-logo]').forEach(i=>i.src=C.logo);$$('[data-name]').forEach(e=>e.textContent=C.brandName);$('[data-hero]').src=C.heroImage;
const dOK=/^https?:\/\//.test(C.discordInvite);
$$('[data-discord]').forEach(a=>{a.href=dOK?C.discordInvite:'#/contact';a.target=dOK?'_blank':'';a.rel='noopener noreferrer';
 if(!dOK)a.addEventListener('click',()=>toast('Discord invite not set yet. Edit discordInvite in config.js.'))});
$('#copy').textContent=`© ${new Date().getFullYear()} ${C.brandName}. All rights reserved.`;
$('#soc').innerHTML=C.socials.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`).join('');
$('#burger').onclick=e=>{const o=$('#links').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));
const pad=(arr,m,mk)=>arr.concat(Array.from({length:(m-arr.length%m)%m},mk));
const phCard=()=>`<div class="ph" aria-hidden="true"><b>+</b><span>More coming soon</span></div>`,phSq=()=>`<div class="ph sq" aria-hidden="true"><b>+</b></div>`;
// categories / pages
const META={Liveries:['liveries','Liveries','Emergency, themed and wrap liveries.'],Weapons:['weapons','Weapons','Weapon props, skin packs and an in-game clip.'],Props:['props','Props','Item props such as a bag, cash and phones.'],Logos:['logos','Logos & intros','Server banners and animated intro videos.'],Vehicles:['vehicles','Vehicles','Custom vehicles with exterior, engine-bay and interior views.'],Chains:['chains','Custom chains','Chain and pendant designs shown in-game, grouped by chain style.'],Peds:['peds','Peds','Custom character models for FiveM.'],Maps:['maps','Maps & scenes','Custom map views and location scenes.'],Clothing:['clothing','Clothing & EUP','Custom clothing and uniforms.'],MLOs:['mlos','MLOs','Custom interiors such as apartments and villas.']};
const CAT_AC={Vehicles:'239,83,80',Liveries:'66,165,245',Chains:'190,205,235',Peds:'186,134,255',Clothing:'255,128,171',Weapons:'255,152,67',Props:'190,225,80',Maps:'38,198,184',Logos:'233,99,200',MLOs:'77,208,225'};
const ACC={home:'216,169,75',portfolio:'216,169,75',about:'216,169,75',contact:'216,169,75',buy:'120,220,150',reviews:'255,193,86',services:'140,150,255'};
Object.entries(META).forEach(([c,m])=>ACC[m[0]]=CAT_AC[c]||ACC.home);
const SV=Object.fromEntries(SERVICES.map(s=>[s.id,s]));
const dl=dOK?`href="${C.discordInvite}" target="_blank" rel="noopener noreferrer"`:`href="#/contact"`;
const has=c=>PORTFOLIO.some(p=>p.category==c),live=cats.filter(has);
const DEV=[{t:'Custom Scripts',d:'Custom FiveM scripts built around what your server needs. No examples on this site yet, so ask us in a ticket.',req:'Custom script'},{t:'HUD & UI',d:'Custom HUD and interface work for your server. No examples on this site yet, so ask us in a ticket.',req:'HUD / UI'}];
const svc=[...SERVICES.map(s=>[s.title,s.tagline]),['FiveM development','Creating and customizing FiveM resources for immersive server experiences.'],...live.map(c=>[META[c][1],META[c][2]])];
const svcCards=()=>[...SERVICES.map(s=>`<a class="glass svc hot" href="#/${s.id}" style="--ac:${s.accent}"><h3>${s.title}</h3><p>${s.tagline}</p><span class="go">Learn more</span></a>`),
 `<a class="glass svc lnk" href="#/contact" data-svcreq="Other"><h3>FiveM development</h3><p>Creating and customizing FiveM resources for immersive server experiences.</p><span class="go">Request it</span></a>`,
 ...cats.map(c=>`<a class="glass svc lnk" style="--ac:${CAT_AC[c]}" href="#/${META[c][0]}"><h3>${META[c][1]}</h3><p>${has(c)?META[c][2]:'Page ready. No projects added yet.'}</p><span class="go">${has(c)?'View work':'Open page'}</span></a>`),
 ...DEV.map(x=>`<a class="glass svc lnk" href="#/contact" data-svcreq="${x.req}"><h3>${x.t}</h3><p>${x.d}</p><span class="go">Ask us</span></a>`),
 `<a class="glass svc lnk last" href="#/contact" data-svcreq="Other"><h3>Something else?</h3><p>Have a different idea? Describe it in our project request form.</p><span class="go">Open the form</span></a>`];
$('#svc').innerHTML=svcCards().join('');
const card=p=>`<button class="glass card" data-open="${p.id}"><div class="im"><img src="${p.thumbnail}" alt="${esc(p.title)}" loading="lazy"></div><div class="bd"><span class="tag">${p.category}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><span class="go">View Project</span></div></button>`;
const byId=id=>PORTFOLIO.find(p=>p.id==id);
const imgCount=c=>PORTFOLIO.filter(p=>p.category==c).reduce((n,p)=>n+p.gallery.length+(p.videos||[]).length,0);
const tile=c=>{const m=META[c],p=PORTFOLIO.find(x=>x.category==c);return p?`<a class="tile" style="--ac:${CAT_AC[c]}" href="#/${m[0]}"><img src="${p.thumbnail}" alt="" loading="lazy"><div><h3>${m[1]}</h3><p>${imgCount(c)} item${imgCount(c)==1?"":"s"}</p></div></a>`:`<a class="tile empty" href="#/${m[0]}"><div><h3>${m[1]}</h3><p>No images added yet</p></div></a>`};
const svcTile=s=>`<a class="tile svct" style="--ac:${s.accent}" href="#/${s.id}"><div class="art">${ART[s.id]()}</div><div><h3>${s.title}</h3><p>Service</p></div></a>`;
const allTiles=()=>pad([...cats.map(tile),...SERVICES.map(svcTile)],4,phCard).join('');$('#tiles').innerHTML=allTiles();$('#tiles2').innerHTML=allTiles();
$('#featGrid').innerHTML=card(byId('veh-red-coupe'))+`<div class="stack">${card(byId('chain-3part'))+card(byId('veh-dark-suv'))}</div>`;
// all-projects filter (portfolio page)
let cur='All';const fl=$('#filters');
fl.innerHTML=['All',...live].map(c=>`<button class="chip" aria-pressed="${c=='All'}">${c}</button>`).join('');
const draw=()=>{$('#pgrid').innerHTML=pad(PORTFOLIO.filter(p=>cur=='All'||p.category==cur).map(card),4,phCard).join('');typeof fillRows=='function'&&fillRows();typeof reveal=='function'&&reveal()};
fl.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cur=b.textContent;$$('.chip',fl).forEach(x=>x.setAttribute('aria-pressed',x==b));draw()};draw();
$('#ddm').innerHTML=cats.map(c=>`<a href="#/${META[c][0]}">${META[c][1]}</a>`).join('')+'<span class="ddh">Services</span>'+SERVICES.map(s=>`<a href="#/${s.id}">${s.title}</a>`).join('');$('#ddb').onclick=e=>{e.stopPropagation();const o=$('.dd').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};document.addEventListener('click',()=>{$('.dd').classList.remove('open');$('#ddb').setAttribute('aria-expanded','false')});$('#ddm').onclick=()=>$('#links').classList.remove('open');
$('#fcats').innerHTML=cats.map(c=>`<a href="#/${META[c][0]}">${META[c][1]}</a>`).join('');
// category page
let CL=[];const catPage=key=>{const c=Object.keys(META).find(k=>META[k][0]==key),m=META[c],ps=PORTFOLIO.filter(p=>p.category==c);let h=`<h2>${m[1]}</h2><p class="lead">${m[2]}</p>`;
 if(!ps.length)return h+`<div class="empty-state glass"><h3>No ${m[1].toLowerCase()} images added yet</h3><p>Add entries to PORTFOLIO in data.js and they appear here automatically.</p><p style="margin-top:16px"><a class="btn pri" href="#/contact">Request a project</a></p></div>`;
 h+=`<div class="grid g4">${pad(ps.map(card),4,phCard).join('')}</div>`;
 if(c=='Chains'){const st=['All',...new Set(CHAINS.map(x=>x.style))];h+=`<h3 class="subh">All chain designs</h3><div class="filters" id="cfilters">${st.map(s=>`<button class="chip" aria-pressed="${s=='All'}" data-s="${s}">${s=='Other'?'More styles':s=='All'?'All':s+' chain'} (${s=='All'?CHAINS.length:CHAINS.filter(x=>x.style==s).length})</button>`).join('')}</div><div class="chains" id="cgrid"></div>`}
 else{CL=ps.flatMap(p=>[...p.gallery.map(g=>({img:g,title:p.title})),...(p.videos||[]).map(v=>({img:v.poster,v:v.src,p:v.poster,title:v.title||p.title}))]);h+=`<h3 class="subh">Gallery</h3><div class="gal">${pad(CL.map((g,i)=>`<button data-lb="gal" data-i="${i}" aria-label="${esc(g.title)}"><img src="${g.img}" alt="${esc(g.title)}" loading="lazy">${g.v?'<i>▶</i>':''}</button>`),4,phSq).join('')}</div>`}
 return h};
const dc=s=>{const l=CHAINS.filter(c=>s=='All'||c.style==s);$('#cgrid').innerHTML=pad(l.map((c,i)=>`<button data-lb="chain" data-i="${i}" aria-label="Chain design ${i+1}"><img src="${c.img}" alt="Custom chain design" loading="lazy"></button>`),6,phSq).join('');$('#cgrid').list=l;fillRows()};
$('#catbody').addEventListener('click',e=>{const b=e.target.closest('#cfilters .chip');if(!b)return;$$('#cfilters .chip').forEach(x=>x.setAttribute('aria-pressed',x==b));dc(b.dataset.s)});
// keep every grid row complete: pad the last row with placeholder slots
var PH_SEL=['#svcAll','#svcbody .g4','#svc','#tiles','#tiles2','#pgrid','#catbody .g4','#cgrid','#catbody .gal'];
function fillRows(){(PH_SEL||[]).forEach(s=>$$(s).forEach(g=>{$$('.ph',g).forEach(x=>x.remove());if(!g.offsetParent)return;
 const cols=getComputedStyle(g).gridTemplateColumns.split(' ').length,n=g.children.length,miss=(cols-n%cols)%cols;
 for(let i=0;i<miss;i++){const d=document.createElement('a');d.className='ph';d.href='#/contact';d.setAttribute('aria-label','Request a project');d.innerHTML='<span>More coming soon</span>';g.append(d)}}))}
let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(fillRows,120)});

// ---------- services pages ----------
const svcCardBig=s=>`<a class="glass svcx" style="--ac:${s.accent}" href="#/${s.id}"><div class="art">${ART[s.id]()}</div><div class="bd"><span class="tag">Service</span><h3>${s.title}</h3><p>${s.tagline}</p><span class="go">Learn more</span></a>`;
$('#svcFeat').innerHTML=SERVICES.map(svcCardBig).join('');
$('#svcAll').innerHTML=svcCards().join('');
const svcPage=s=>{const rel=(s.related||[]).map(byId).filter(Boolean);return `<div class="svchero"><div><span class="tag">Service</span><h2>${s.title}</h2><p class="lead" style="margin-bottom:22px">${s.description}</p><div class="row"><a class="btn pri" href="#/contact" data-svcreq="${esc(s.title)}">Request this service</a><a class="btn" ${dl}>Open a ticket on Discord</a></div></div><div class="artbox">${ART[s.id]()}</div></div>
<h3 class="subh">What this covers</h3><div class="g3x">${s.covers.map(x=>`<div class="glass svc"><h3>${x.t}</h3><p>${x.d}</p></div>`).join('')}</div>
<h3 class="subh">How it works</h3><div class="g3x">${s.steps.map((x,i)=>`<div class="glass svc"><span class="num">${i+1}</span><h3>${x.t}</h3><p>${x.d}</p></div>`).join('')}</div>
${rel.length?`<h3 class="subh">Related work in our portfolio</h3><div class="grid g4">${pad(rel.map(card),4,phCard).join('')}</div>`:''}<p class="note">The illustration above is generic artwork, not a project screenshot.</p>`};
// ---------- reviews ----------
const stars=n=>'★'.repeat(n)+'☆'.repeat(5-n);
const revCard=r=>`<article class="glass rev"><div class="stars" role="img" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</div><p>“${esc(r.text)}”</p><div class="who"><span class="av">${esc((r.name||'?')[0].toUpperCase())}</span><div><b>${esc(r.name)}</b>${r.service?`<small>${esc(r.service)}</small>`:''}</div></div></article>`;
$('#rs').innerHTML=['Choose one',...SERVICES.map(s=>s.title),...live.map(c=>META[c][1]),'Other'].map((o,i)=>`<option ${i?'':'value="" disabled selected'}>${o}</option>`).join('');
$('#stars').innerHTML=[1,2,3,4,5].map(n=>`<button type="button" data-v="${n}" aria-pressed="false" aria-label="${n} star${n>1?'s':''}">★</button>`).join('');
$('#stars').onclick=e=>{const b=e.target.closest('button');if(!b)return;$('#rv').value=b.dataset.v;$$('#stars button').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.v<=+b.dataset.v))};
const revPh=()=>`<a class="ph link" href="#/reviews" data-write><b>+</b><span>Your review could be here</span></a>`;
const sampleRev=()=>`<article class="glass rev sample"><span class="samp">Sample</span><div class="stars" aria-hidden="true">☆☆☆☆☆</div><p>This is how a buyer review will look. Real reviews appear here after they are approved.</p><div class="who"><span class="av">?</span><div><b>Your name here</b><small>Sample layout</small></div></div></article>`;
const renderRev=(el,limit)=>{const l=limit?REVIEWS.slice(0,limit):REVIEWS;el.innerHTML=l.length?pad(l.map(revCard),4,revPh).join(''):[0,1,2,3].map(sampleRev).join('')};
const okRev=r=>r&&typeof r.name=='string'&&r.name.trim()&&typeof r.text=='string'&&r.text.trim()&&Number.isInteger(+r.rating)&&+r.rating>=1&&+r.rating<=5;
async function loadReviews(){if(!C.reviewsFeed)return;try{const r=await fetch(C.reviewsFeed+(C.reviewsFeed.includes('?')?'&':'?')+'t='+Date.now(),{cache:'no-store'});if(!r.ok)return;const j=await r.json();(Array.isArray(j)?j:[]).filter(okRev).forEach(x=>REVIEWS.push({name:x.name.trim().slice(0,60),rating:+x.rating,text:x.text.trim().slice(0,600),service:String(x.service||'').slice(0,60)}))}catch(e){}}
function renderAllReviews(){renderRev($('#revhome'),4);renderRev($('#revgrid'));
 if(REVIEWS.length){const avg=REVIEWS.reduce((n,r)=>n+r.rating,0)/REVIEWS.length;$('#revsum').innerHTML=`<div class="revsum"><b>${avg.toFixed(1)}</b><div><div class="stars">${stars(Math.round(avg))}</div><small style="color:var(--mut)">from ${REVIEWS.length} review${REVIEWS.length==1?'':'s'}</small></div></div>`;$('#revlead').textContent='Reviews from people who bought from Morakins FiveM Hub.'}
 else{$('#revsum').innerHTML='<p class="note" style="margin:0 0 20px">No real buyer reviews have been published yet. The dashed cards show the layout.</p>';$('#revlead').textContent='Real buyer reviews will appear here. The dashed cards show the layout.'}
 typeof reveal=='function'&&reveal()}
Promise.race([loadReviews(),new Promise(r=>setTimeout(r,2500))]).then(renderAllReviews);
$('#revform').onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target)),s=$('#rstat');if(!d.rating){s.textContent='Please choose a star rating.';return}
 if(C.reviewEndpoint){try{const r=await fetch(C.reviewEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;s.textContent='Thank you! Your review was sent for approval.';e.target.reset();$$('#stars button').forEach(x=>x.setAttribute('aria-pressed','false'));return}catch(err){s.textContent='Could not send. Please use the email option below.'}}
 const entry=JSON.stringify({name:d.name,rating:+d.rating,text:d.review,service:d.service||''});
 sendMail('Buyer review from '+d.name,`BUYER REVIEW\nName: ${d.name}\nDiscord: ${d.discord}\nBought: ${d.service||''}\nRating: ${d.rating}/5\nReview: ${d.review}\n\n--- TO APPROVE ---\nAdd this line to reviews.json on GitHub:\n${entry}`,s)};
// ---------- hero, marquee, stats ----------
const h1=$('.hero h1');h1.setAttribute('aria-label',h1.textContent);h1.innerHTML=h1.textContent.split(' ').map((w,i)=>`<span class="w" style="--i:${i}" aria-hidden="true">${w}</span>`).join(' ');
const mq=live.map(c=>`<a href="#/${META[c][0]}" style="--ac:${CAT_AC[c]}">${META[c][1]}</a>`).join('');$('#marq').innerHTML=mq+mq;
const nVid=PORTFOLIO.reduce((n,p)=>n+(p.videos||[]).length,0);
$('#stats').innerHTML=[[PORTFOLIO.length,'Projects'],[live.length,'Categories'],[CHAINS.length,'Chain designs'],[nVid,'Videos']].map(([n,l])=>`<div class="glass stat"><b data-n="${n}">0</b><span>${l}</span></div>`).join('');
// ---------- scroll reveal, counters, spotlight ----------
var io=('IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){const t=en.target;t.classList.add('in');io.unobserve(t);t.addEventListener('animationend',()=>{if(!t.matches('b[data-n]'))t.classList.remove('rv','in')},{once:true})}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'}):null);
function reveal(){if(!io)return;$$('.card,.tile,.svc,.svcx,.stat,.pay,.rev,.revempty,.bmc,.chains button,.gal button,.ph,.artbox,.page.on .lead,.subh,.pagehead h2,.cta,.glass.form,.marq').forEach((el,i)=>{if(el.dataset.rv)return;el.dataset.rv=1;el.style.setProperty('--d',(i%8)*.06+'s');el.classList.add('rv');io.observe(el)})}
var cio=('IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;cio.unobserve(en.target);const b=en.target,n=+b.dataset.n,t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/1400);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.5}):null);
$$('b[data-n]').forEach(b=>cio?cio.observe(b):b.textContent=b.dataset.n);
document.addEventListener('pointermove',e=>{const t=e.target.closest&&e.target.closest('.card,.svc,.svcx,.rev,.pay');if(t){const r=t.getBoundingClientRect();t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px')}},{passive:true});
// router
const titles={services:'Services',reviews:'Buyer reviews',portfolio:'Portfolio',about:'About',contact:'Contact',buy:'How to Buy'};
function route(){const k=(location.hash.replace(/^#\/?/,'')||'home').split('/')[0];const isCat=Object.values(META).some(m=>m[0]==k);const isSv=!!SV[k];const pg=isCat?'cat':isSv?'svc':(['home','portfolio','about','contact','buy','services','reviews'].includes(k)?k:'home');document.body.style.setProperty('--ac',isSv?SV[k].accent:(ACC[k]||ACC.home));if(isSv)$('#svcbody').innerHTML=svcPage(SV[k]);
 $$('.page').forEach(p=>p.classList.toggle('on',p.dataset.page==pg));if(isCat){$('#catbody').innerHTML=catPage(k);if($('#cgrid'))dc('All')}
 $$('#links a').forEach(a=>a.toggleAttribute('aria-current',a.getAttribute('href')=='#/'+(k=='home'?'':k)));
 const nm=isCat?Object.values(META).find(m=>m[0]==k)[1]:isSv?SV[k].title:titles[k];document.title=(nm?nm+' | ':'')+C.brandName;window.scrollTo(0,0);fillRows();reveal()}
addEventListener('hashchange',route);
// modal
const M=$('#modal'),MB=$('#mbox');let last;
const openM=h=>{last=document.activeElement;MB.innerHTML=`<button class="x" aria-label="Close" data-close>✕</button>`+h;M.classList.add('open');document.body.style.overflow='hidden';$('.x',MB).focus()};
const closeM=()=>{MB.innerHTML='';M.classList.remove('open');document.body.style.overflow='';last&&last.focus()};
const isV=x=>typeof x=='object',tsrc=x=>isV(x)?x.p:x;let curAlt='';
const mainH=x=>isV(x)?`<video src="${x.v}" poster="${x.p}" controls playsinline preload="metadata"></video>`:`<img src="${x}" alt="${esc(curAlt)}">`;
const setImg=(i,list)=>{$('#mm').innerHTML=mainH(list[i]);$$('.thumbs button').forEach((b,k)=>b.toggleAttribute('aria-current',k==i))};
const gal=(list,alt)=>(curAlt=alt,`<div class="mainimg" id="mm">${mainH(list[0])}</div>`)+(list.length>1?`<div class="thumbs">${list.map((g,i)=>`<button data-th="${i}" ${i?'':'aria-current="true"'} aria-label="Image ${i+1}"><img src="${tsrc(g)}" alt="">${isV(g)?'<i>▶</i>':''}</button>`).join('')}</div>`:'');
let curList=[];
function openProject(id){const p=byId(id);const items=[...p.gallery,...(p.videos||[]).map(v=>({v:v.src,p:v.poster}))];curList=items;const rel=PORTFOLIO.filter(x=>x.id!=id&&x.category==p.category).slice(0,4).concat(PORTFOLIO.filter(x=>x.category!=p.category)).slice(0,4);
 openM(gal(items,p.title)+`<div class="mbody"><div><span class="tag">${p.category}${p.subcategory?' · '+p.subcategory:''}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></div><div><h4>Features</h4><ul>${p.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>${p.technologies.length?`<h4>Technologies</h4><ul>${p.technologies.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`:''}<h4>Source</h4><p style="font-size:14px">${esc(p.source)}</p>${p.externalLink?`<p><a class="tag" href="${esc(p.externalLink)}" target="_blank" rel="noopener noreferrer">External link</a></p>`:''}<p style="margin-top:14px"><a class="btn pri" href="#/contact" data-close data-req="${esc(p.title)}">Request something similar</a></p></div></div><div class="rel"><h4 style="margin-bottom:10px">Related projects</h4><div class="grid">${rel.map(card).join('')}</div></div>`)}
function openLB(list,i,alt){curList=list;openM(gal(list,alt));setImg(i,list)}
document.addEventListener('click',e=>{const t=e.target;
 const o=t.closest('[data-open]');if(o){if(M.classList.contains('open'))MB.parentNode.scrollTop=0;return openProject(o.dataset.open)}
 const l=t.closest('[data-lb]');if(l){const i=+l.dataset.i;if(l.dataset.lb=='chain')return openLB($('#cgrid').list.map(c=>c.img),i,'Custom chain design');return openLB(CL.map(g=>g.v?{v:g.v,p:g.p}:g.img),i,CL[i].title)}
 const th=t.closest('[data-th]');if(th)return setImg(+th.dataset.th,curList);
 const c=t.closest('[data-close]');if(c||t==M){closeM();if(c&&c.dataset.req){location.hash='#/contact';$('#m').value=`I'd like something similar to: ${c.dataset.req}\n`}}
 const q=t.closest('[data-q]');if(q)ask(q.dataset.q);const sr=t.closest('[data-svcreq]');if(sr){$('#t').value=sr.dataset.svcreq;$('#m').value=`I'd like to request: ${sr.dataset.svcreq}\n`}});
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&M.classList.contains('open'))closeM()});
// assistant: answers only from PORTFOLIO / CHAINS / config
const log=$('#log');
const say=(h,u)=>{const d=document.createElement('div');d.className='m '+(u?'u':'b');d.innerHTML=h;log.append(d);log.scrollTop=log.scrollHeight;return d};
const mini=ps=>`<div class="mini">${ps.map(p=>`<button data-open="${p.id}"><img src="${p.thumbnail}" alt=""><small>${esc(p.title)}</small></button>`).join('')}</div>`;
const MAIL=C.contactEmail,mail=(q,s)=>`mailto:${MAIL}?subject=${encodeURIComponent(s||'Question from the website')}&body=${encodeURIComponent(q||'')}`;
const mlink=q=>`<a href="${mail(q)}" style="color:var(--gold)">${MAIL}</a>`;
$$('[data-email]').forEach(x=>{x.href=mail('');x.textContent=MAIL});
$('#pays').innerHTML=C.payments.map(p=>`<div class="glass pay">${esc(p)}</div>`).join('');
if(C.buyMeCoffee)$('#bmc').innerHTML=`<div class="glass bmc"><div><h3 style="font-size:22px">Buy Me a Coffee</h3><p>You can also pay through Buy Me a Coffee.</p></div><a class="btn" href="${esc(C.buyMeCoffee)}" target="_blank" rel="noopener noreferrer">Open Buy Me a Coffee</a></div>`;
const gmail=(s,b)=>`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MAIL)}&su=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`;
function sendMail(subject,body,el){el.innerHTML=`Opening your email app with your message to ${esc(MAIL)}. Press <b>Send</b> there to finish.<br>Nothing opened? <a class="fb" href="${gmail(subject,body)}" target="_blank" rel="noopener noreferrer">Open in Gmail</a><button type="button" class="fb" data-copy>Copy message</button><a class="fb" href="${mail(body,subject)}">Try the email app again</a>`;
 el.querySelector('[data-copy]').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(`To: ${MAIL}\nSubject: ${subject}\n\n${body}`).then(()=>toast('Message copied'),()=>toast('Could not copy. Please select the text.'))};
 window.location.href=mail(body,subject)}
const NONE=(w,q)=>`This website has no verified ${w} to show. Please email ${mlink(q)} and we'll answer you directly. You can also ask in our Discord.`;
const of=c=>PORTFOLIO.filter(p=>p.category==c);
const link=(h,t)=>`<a href="${h}" style="color:var(--gold)">${t}</a>`;
const R=[
 [/review|testimonial|feedback|what do (buyers|customers)|buyers say|customers say/,()=>REVIEWS.length?`We have ${REVIEWS.length} published buyer review${REVIEWS.length==1?'':'s'}. ${link('#/reviews','Read the reviews')}.`:`No buyer reviews have been published yet. Bought from us? ${link('#/reviews','Write the first review')}.`],
 [/\bbuy(?!ers)|purchase|payment|\bpay\b|paying|ticket|apple pay|skrill|btc|bitcoin|crypto|revolut|gift card|coffee|order/,()=>`To buy, join our Discord and create a ticket in the Ticket channel. Payment methods: ${C.payments.join(', ')}${C.buyMeCoffee?', or Buy Me a Coffee':''}. Prices are discussed in your ticket. ${link('#/buy','Open the How to Buy page')}.`],
 [/lspdr|police department|\bpd\b|\blspd\b/,()=>`${SV.lspdr.tagline} ${link('#/lspdr','Open the LSPDR FiveM PD page')}. Related police liveries from the portfolio:`+mini((SV.lspdr.related||[]).map(byId).filter(Boolean))],
 [/optimi|\bfix|\blag|performance|\bbug|error|crash|\bfps\b|slow|broken|not working|troubleshoot/,()=>`${SV.optimization.tagline} ${link('#/optimization','Open the Server Optimization & Fixes page')}. Open a ticket in our Discord and describe the problem.`],
 [/price|cost|how much|budget|quote|timeline|how long|turnaround|refund|deliver/,t=>`This website has no verified pricing or timelines. Please email ${mlink(t)} with your idea and we'll reply directly, or use the ${link('#/contact','request form')}.`],
 [/chain|jewel|pendant/,()=>`We have ${CHAINS.length} chain preview images across ${of('Chains').length} projects: 3-part, single and double chains with pendants, plus more styles. ${link('#/chains','Open the chains page')}.`+mini(of('Chains'))],
 [/liveri|police|sheriff|paramedic|ambulance|emergency/,()=>`Here are the ${of('Liveries').length} livery projects, including police, sheriff and paramedic designs. ${link('#/liveries','Open the liveries page')}.`+mini(of('Liveries'))],
 [/bike|motorcycle|truck|pickup|6x6|atv|vehicle|car\b|cars|suv|coupe|sedan|jeep/,()=>`Here are the ${of('Vehicles').length} vehicle projects: cars, SUVs, off-road, motorcycles, trucks and an ATV. ${link('#/vehicles','Open the vehicles page')}.`+mini(of('Vehicles'))],
 [/weapon|gun|rifle|skin|firearm/,()=>`Here are the weapon projects: props, skin packs and an in-game clip. ${link('#/weapons','Open the weapons page')}.`+mini(of('Weapons'))],
 [/prop|item|phone|bag|money|cash/,()=>`Here are the item props. ${link('#/props','Open the props page')}.`+mini(of('Props'))],
 [/logo|banner|intro|animation|video/,()=>`Here are the logos, banners and intro videos. ${link('#/logos','Open the logos & intros page')}.`+mini(of('Logos'))],
 [/eup|cloth|outfit|uniform|mask|shorts|brazil/,()=>`Here are the clothing and uniform projects. ${link('#/clothing','Open the clothing page')}. Only these have been added so far, and I can't confirm other EUP.`+mini(of('Clothing'))],
 [/\bped\b|peds|character|toddler|baby/,()=>`Here are the ped projects. ${link('#/peds','Open the peds page')}.`+mini(of('Peds'))],
 [/mlo|apartment|villa|interior|office|loft|mansion|house/,t=>of('MLOs').length?`Here are the ${of('MLOs').length} MLO and interior projects${/map/i.test(t)?' and the map projects':''}. ${link('#/mlos','Open the MLOs page')}.`+mini(of('MLOs').concat(/map/i.test(t)?of('Maps'):[])):NONE('MLO projects',t)],
 [/map|scene|location/,()=>`Here are the ${of('Maps').length} map projects: aerial views, an overview map and scenes. ${link('#/maps','Open the maps page')}.`+mini(of('Maps'))],
 [/script|\bhud\b|\bui\b|framework/,t=>NONE('scripts or HUDs',t)],
 [/service|offer|do you (do|make)|what can/,()=>`Based on the portfolio: ${svc.map(s=>s[0]).join(', ')}. Anything else isn't verified on this site.`],
 [/request|custom project|commission|order|hire|quote/,()=>`Use the ${link('#/contact','Request a Project form')} and describe what you need. You can also reach us on Discord.`],
 [/discord|join|community|server/,()=>dOK?`Join the community here: <a href="${esc(C.discordInvite)}" target="_blank" rel="noopener noreferrer" style="color:var(--gold)">Morakins FiveM Hub Discord</a>.`:`The Discord invite hasn't been added to this site yet. Check back soon.`],
 [/\bprojects?\b|\bportfolio\b|\bwork\b|everything|show me (all|everything)/,()=>`Here is a sample from the portfolio: ${PORTFOLIO.length} projects across ${live.join(', ')}. ${link('#/portfolio','Open the full portfolio')}.`+mini(PORTFOLIO.slice(0,8))]
];
function ask(t){say(esc(t),1);const l=t.toLowerCase();const r=R.find(x=>x[0].test(l));const tp=say('<span class="dots" aria-label="Typing"><i></i><i></i><i></i></span>');
 setTimeout(()=>{tp.innerHTML=r?r[1](t):`I can't answer that from the information on this website. Please email your question to ${mlink(t)} and we'll get back to you. Meanwhile I can show projects, services, chains, vehicles, liveries, or how to request work or join the server.`;log.scrollTop=log.scrollHeight},650)}
$('#quick').innerHTML=['Show me your FiveM projects','What services do you offer?','Show me your custom chains','Show me your vehicles','Show me your liveries','Show me your weapons & props','Show me your MLOs & maps','Show me your EUP & clothing','Show me your scripts & HUDs','How can I request a custom project?','Tell me about server optimization & fixes','Tell me about LSPDR FiveM PD','What do your buyers say?','How do I buy something?','I want to join the server'].map(q=>`<button data-q="${q}">${q}</button>`).join('');
say('Hi! Pick a question on the left or type your own. Answers come only from the projects on this site.');
$('#cf').onsubmit=e=>{e.preventDefault();const v=$('#ci').value.trim();if(v){ask(v);$('#ci').value=''}};
// request form (frontend-ready; posts only if C.formEndpoint is set)
const ts=$('#t');ts.innerHTML=[...SERVICES.map(s=>s.title),...live.map(c=>META[c][1]),'Custom script','MLO / map','HUD / UI','EUP / clothing','Other'].map(o=>`<option>${o}</option>`).join('');
$('#rf').onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target)),s=$('#fs');
 if(C.formEndpoint){try{const r=await fetch(C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;s.textContent='Request sent. We will get back to you.';e.target.reset();return}catch(err){s.textContent='Could not send the request. Use the email option below.'}}
 sendMail('Project request: '+d.type,`PROJECT REQUEST\nName: ${d.name}\nEmail: ${d.email}\nDiscord: ${d.discord}\nProject type: ${d.type}\n\nProject description:\n${d.description}`,s)};
route();
