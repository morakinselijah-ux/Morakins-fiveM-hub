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
const META={Vehicles:['vehicles','Vehicles','Custom vehicles with exterior, engine-bay and interior views.'],Chains:['chains','Custom chains','Chain and pendant designs shown in-game, grouped by chain style.'],Peds:['peds','Peds','Custom character models for FiveM.'],Maps:['maps','Maps & scenes','Custom location scenes and props.'],Clothing:['clothing','Clothing & EUP','Custom clothing and uniforms.'],MLOs:['mlos','MLOs','Custom interiors such as apartments and villas.']};
const has=c=>PORTFOLIO.some(p=>p.category==c),live=cats.filter(has);
const svc=[['FiveM development','Creating and customizing FiveM resources for immersive server experiences.'],...live.map(c=>[META[c][1],META[c][2]])];
const soon=cats.filter(c=>!has(c)).map(c=>`<a class="glass svc soon" href="#/${META[c][0]}"><h3>${META[c][1]}</h3><p>Page ready. No projects added yet.</p></a>`);
$('#svc').innerHTML=pad([...svc.map(s=>`<div class="glass svc"><h3>${s[0]}</h3><p>${s[1]}</p></div>`),...soon,`<a class="glass svc soon" href="#/contact"><h3>Something else?</h3><p>Describe your idea in a project request.</p></a>`],4,phCard).join('');
const card=p=>`<button class="glass card" data-open="${p.id}"><div class="im"><img src="${p.thumbnail}" alt="${esc(p.title)}" loading="lazy"></div><div class="bd"><span class="tag">${p.category}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><span class="go">View Project</span></div></button>`;
const byId=id=>PORTFOLIO.find(p=>p.id==id);
const imgCount=c=>PORTFOLIO.filter(p=>p.category==c).reduce((n,p)=>n+p.gallery.length,0);
const tile=c=>{const m=META[c],p=PORTFOLIO.find(x=>x.category==c);return p?`<a class="tile" href="#/${m[0]}"><img src="${p.thumbnail}" alt="" loading="lazy"><div><h3>${m[1]}</h3><p>${imgCount(c)} image${imgCount(c)==1?"":"s"}</p></div></a>`:`<a class="tile empty" href="#/${m[0]}"><div><h3>${m[1]}</h3><p>No images added yet</p></div></a>`};
$('#tiles').innerHTML=pad(cats.map(tile),4,phCard).join('');$('#tiles2').innerHTML=pad(cats.map(tile),4,phCard).join('');
$('#featGrid').innerHTML=card(byId('veh-red-coupe'))+`<div class="stack">${card(byId('chain-3part'))+card(byId('veh-dark-suv'))}</div>`;
// all-projects filter (portfolio page)
let cur='All';const fl=$('#filters');
fl.innerHTML=['All',...live].map(c=>`<button class="chip" aria-pressed="${c=='All'}">${c}</button>`).join('');
const draw=()=>{$('#pgrid').innerHTML=pad(PORTFOLIO.filter(p=>cur=='All'||p.category==cur).map(card),4,phCard).join('');typeof fillRows=='function'&&fillRows()};
fl.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cur=b.textContent;$$('.chip',fl).forEach(x=>x.setAttribute('aria-pressed',x==b));draw()};draw();
$('#fcats').innerHTML=cats.map(c=>`<a href="#/${META[c][0]}">${META[c][1]}</a>`).join('');
// category page
let CL=[];const catPage=key=>{const c=Object.keys(META).find(k=>META[k][0]==key),m=META[c],ps=PORTFOLIO.filter(p=>p.category==c);let h=`<h2>${m[1]}</h2><p class="lead">${m[2]}</p>`;
 if(!ps.length)return h+`<div class="empty-state glass"><h3>No ${m[1].toLowerCase()} images added yet</h3><p>Add entries to PORTFOLIO in data.js and they appear here automatically.</p><p style="margin-top:16px"><a class="btn pri" href="#/contact">Request a project</a></p></div>`;
 h+=`<div class="grid g4">${pad(ps.map(card),4,phCard).join('')}</div>`;
 if(c=='Chains'){const st=['All',...new Set(CHAINS.map(x=>x.style))];h+=`<h3 class="subh">All chain designs</h3><div class="filters" id="cfilters">${st.map(s=>`<button class="chip" aria-pressed="${s=='All'}" data-s="${s}">${s=='Other'?'More styles':s=='All'?'All':s+' chain'} (${s=='All'?CHAINS.length:CHAINS.filter(x=>x.style==s).length})</button>`).join('')}</div><div class="chains" id="cgrid"></div>`}
 else{CL=ps.flatMap(p=>p.gallery.map(g=>({img:g,title:p.title})));h+=`<h3 class="subh">Gallery</h3><div class="gal">${pad(CL.map((g,i)=>`<button data-lb="gal" data-i="${i}" aria-label="${esc(g.title)}"><img src="${g.img}" alt="${esc(g.title)}" loading="lazy"></button>`),4,phSq).join('')}</div>`}
 return h};
const dc=s=>{const l=CHAINS.filter(c=>s=='All'||c.style==s);$('#cgrid').innerHTML=pad(l.map((c,i)=>`<button data-lb="chain" data-i="${i}" aria-label="Chain design ${i+1}"><img src="${c.img}" alt="Custom chain design" loading="lazy"></button>`),6,phSq).join('');$('#cgrid').list=l;fillRows()};
$('#catbody').addEventListener('click',e=>{const b=e.target.closest('#cfilters .chip');if(!b)return;$$('#cfilters .chip').forEach(x=>x.setAttribute('aria-pressed',x==b));dc(b.dataset.s)});
// keep every grid row complete: pad the last row with placeholder slots
var PH_SEL=['#svc','#tiles','#tiles2','#pgrid','#catbody .g4','#cgrid','#catbody .gal'];
function fillRows(){(PH_SEL||[]).forEach(s=>$$(s).forEach(g=>{$$('.ph',g).forEach(x=>x.remove());if(!g.offsetParent)return;
 const cols=getComputedStyle(g).gridTemplateColumns.split(' ').length,n=g.children.length,miss=(cols-n%cols)%cols;
 for(let i=0;i<miss;i++){const d=document.createElement('a');d.className='ph';d.href='#/contact';d.setAttribute('aria-label','Request a project');d.innerHTML='<span>More coming soon</span>';g.append(d)}}))}
let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(fillRows,120)});
// router
const titles={portfolio:'Portfolio',about:'About',contact:'Contact'};
function route(){const k=(location.hash.replace(/^#\/?/,'')||'home').split('/')[0];const isCat=Object.values(META).some(m=>m[0]==k);const pg=isCat?'cat':(['home','portfolio','about','contact'].includes(k)?k:'home');
 $$('.page').forEach(p=>p.classList.toggle('on',p.dataset.page==pg));if(isCat){$('#catbody').innerHTML=catPage(k);if($('#cgrid'))dc('All')}
 $$('#links a').forEach(a=>a.toggleAttribute('aria-current',a.getAttribute('href')=='#/'+(k=='home'?'':k)));
 const nm=isCat?Object.values(META).find(m=>m[0]==k)[1]:titles[k];document.title=(nm?nm+' | ':'')+C.brandName;window.scrollTo(0,0);fillRows()}
addEventListener('hashchange',route);
// modal
const M=$('#modal'),MB=$('#mbox');let last;
const openM=h=>{last=document.activeElement;MB.innerHTML=`<button class="x" aria-label="Close" data-close>✕</button>`+h;M.classList.add('open');document.body.style.overflow='hidden';$('.x',MB).focus()};
const closeM=()=>{M.classList.remove('open');document.body.style.overflow='';last&&last.focus()};
const setImg=(i,list)=>{$('#mi').src=list[i];$$('.thumbs button').forEach((b,k)=>b.toggleAttribute('aria-current',k==i))};
const gal=(list,alt)=>`<div class="mainimg"><img id="mi" src="${list[0]}" alt="${esc(alt)}"></div>`+(list.length>1?`<div class="thumbs">${list.map((g,i)=>`<button data-th="${i}" ${i?'':'aria-current="true"'} aria-label="Image ${i+1}"><img src="${g}" alt=""></button>`).join('')}</div>`:'');
let curList=[];
function openProject(id){const p=byId(id);curList=p.gallery;const rel=PORTFOLIO.filter(x=>x.id!=id&&x.category==p.category).slice(0,4).concat(PORTFOLIO.filter(x=>x.category!=p.category)).slice(0,4);
 openM(gal(p.gallery,p.title)+`<div class="mbody"><div><span class="tag">${p.category}${p.subcategory?' · '+p.subcategory:''}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></div><div><h4>Features</h4><ul>${p.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>${p.technologies.length?`<h4>Technologies</h4><ul>${p.technologies.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`:''}<h4>Source</h4><p style="font-size:14px">${esc(p.source)}</p>${p.externalLink?`<p><a class="tag" href="${esc(p.externalLink)}" target="_blank" rel="noopener noreferrer">External link</a></p>`:''}<p style="margin-top:14px"><a class="btn pri" href="#/contact" data-close data-req="${esc(p.title)}">Request something similar</a></p></div></div><div class="rel"><h4 style="margin-bottom:10px">Related projects</h4><div class="grid">${rel.map(card).join('')}</div></div>`)}
function openLB(list,i,alt){curList=list;openM(gal(list,alt));setImg(i,list)}
document.addEventListener('click',e=>{const t=e.target;
 const o=t.closest('[data-open]');if(o){if(M.classList.contains('open'))MB.parentNode.scrollTop=0;return openProject(o.dataset.open)}
 const l=t.closest('[data-lb]');if(l){const i=+l.dataset.i;if(l.dataset.lb=='chain')return openLB($('#cgrid').list.map(c=>c.img),i,'Custom chain design');return openLB(CL.map(g=>g.img),i,CL[i].title)}
 const th=t.closest('[data-th]');if(th)return setImg(+th.dataset.th,curList);
 const c=t.closest('[data-close]');if(c||t==M){closeM();if(c&&c.dataset.req){location.hash='#/contact';$('#m').value=`I'd like something similar to: ${c.dataset.req}\n`}}
 const q=t.closest('[data-q]');if(q)ask(q.dataset.q)});
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&M.classList.contains('open'))closeM()});
// assistant: answers only from PORTFOLIO / CHAINS / config
const log=$('#log');
const say=(h,u)=>{const d=document.createElement('div');d.className='m '+(u?'u':'b');d.innerHTML=h;log.append(d);log.scrollTop=log.scrollHeight};
const mini=ps=>`<div class="mini">${ps.map(p=>`<button data-open="${p.id}"><img src="${p.thumbnail}" alt=""><small>${esc(p.title)}</small></button>`).join('')}</div>`;
const NONE=w=>`This website has no verified ${w} to show. For anything not in the portfolio, ask in our Discord or use the <a href="#/contact" style="color:var(--gold)">request form</a>.`;
const of=c=>PORTFOLIO.filter(p=>p.category==c);
const R=[
 [/chain|jewel|pendant/,()=>`We have ${CHAINS.length} chain preview images across ${of('Chains').length} projects: 3-part, single and double chains with pendants, plus more styles. <a href="#/chains" style="color:var(--gold)">Open the chains section</a>.`+mini(of('Chains'))],
 [/vehicle|car|suv|truck|coupe|sedan|jeep|livery|liveries/,()=>`Here are the ${of('Vehicles').length} vehicle projects in the portfolio.`+mini(of('Vehicles'))],
 [/\bped\b|peds|character/,()=>`Here is the ped in the portfolio.`+mini(of('Peds'))],
 [/mlo|map|interior|scene|location|apartment|villa/,()=>of('Maps').length?`We don't have any verified MLO projects on this site. The closest work is a scene (see the <a href="#/maps" style="color:var(--gold)">Maps page</a>):`+mini(of('Maps')):NONE('maps or MLOs')],
 [/eup|cloth|outfit|uniform/,()=>NONE('EUP or clothing projects')],
 [/script|hud|ui\b|framework/,()=>NONE('scripts or HUDs')],
 [/service|offer|do you (do|make)|what can/,()=>`Based on the portfolio: ${svc.map(s=>s[0]).join(', ')}. Anything else isn't verified on this site.`],
 [/request|custom project|commission|order|hire|quote/,()=>`Use the <a href="#/contact" style="color:var(--gold)">Request a Project form</a> and describe what you need. You can also reach us on Discord.`],
 [/discord|join|community|server/,()=>dOK?`Join the community here: <a href="${esc(C.discordInvite)}" target="_blank" rel="noopener noreferrer" style="color:var(--gold)">Morakins FiveM Hub Discord</a>.`:`The Discord invite hasn't been added to this site yet. Check back soon.`],
 [/project|work|portfolio|show|everything|all/,()=>`Here is the full portfolio: ${PORTFOLIO.length} projects across ${cats.join(', ')}.`+mini(PORTFOLIO)]
];
function ask(t){say(esc(t),1);const l=t.toLowerCase();const r=R.find(x=>x[0].test(l));setTimeout(()=>say(r?r[1]():`This website has no verified information about that. I can show projects, services, chains, vehicles, or how to request work or join the server.`),250)}
$('#quick').innerHTML=['Show me your FiveM projects','What services do you offer?','Show me your custom chains','Show me your vehicles','Show me your MLOs & maps','Show me your EUP & clothing','Show me your scripts & HUDs','How can I request a custom project?','I want to join the server'].map(q=>`<button data-q="${q}">${q}</button>`).join('');
say('Hi! Pick a question on the left or type your own. Answers come only from the projects on this site.');
$('#cf').onsubmit=e=>{e.preventDefault();const v=$('#ci').value.trim();if(v){ask(v);$('#ci').value=''}};
// request form (frontend-ready; posts only if C.formEndpoint is set)
const ts=$('#t');ts.innerHTML=[...live.map(c=>META[c][1]),'Custom script','MLO / map','HUD / UI','EUP / clothing','Other'].map(o=>`<option>${o}</option>`).join('');
$('#rf').onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target)),s=$('#fs');
 if(!C.formEndpoint){s.textContent='Form is not connected to a backend yet. Please send this request on Discord.';navigator.clipboard&&navigator.clipboard.writeText(Object.entries(d).map(([k,v])=>k+': '+v).join('\n')).then(()=>toast('Request copied to your clipboard'),()=>{});return}
 try{const r=await fetch(C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;s.textContent='Request sent.';e.target.reset()}catch{s.textContent='Could not send the request. Try again or use Discord.'}};
route();
