import {revealCards,observeSections} from './motion.js?v=storybook-4';
import {createGallery} from './gallery.js?v=storybook-4';
import {STATES,safeImage,safeCheckout,canBuy,priceLabel,validateCatalog} from './catalog.js?v=storybook-4';
const catalog=document.querySelector('#catalog');
const detail=document.querySelector('#product');
let data,filter='all';
const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
function productImage(p,eager=false){const img=el('img','soft-image');img.alt=p.alt;img.width=640;img.height=640;img.loading=eager?'eager':'lazy';img.decoding='async';img.addEventListener('load',()=>img.classList.add('is-loaded'),{once:true});img.addEventListener('error',()=>{img.classList.add('is-loaded');img.src='assets/brand/flower.svg';img.alt='Artwork is not available yet';},{once:true});if(p.imageScale)img.style.setProperty('--image-scale',String(p.imageScale));img.src=safeImage(p.image);if(img.complete&&img.naturalWidth)img.classList.add('is-loaded');return img;}
function renderCatalog(){
 const products=data.products.filter(p=>filter==='all'||p.category===filter);
 catalog.replaceChildren();
 for(const p of products){const article=el('article','product-card');const a=el('a');a.href=`product.html?slug=${encodeURIComponent(p.slug)}`;const visual=el('div','card-image');const viewport=el('div','image-viewport');viewport.append(productImage(p));const cue=el('span','card-cue','Take a closer look ↗');cue.setAttribute('aria-hidden','true');visual.append(viewport,el('span','badge',STATES[p.status]),cue);const info=el('div','card-details');info.append(el('p','card-category',p.categoryLabel||'LITTLE THINGS'));const heading=el('div','card-heading');heading.append(el('h3','',p.name));const arrow=el('span','','↗');arrow.setAttribute('aria-hidden','true');heading.append(arrow);info.append(heading,el('p','',p.approved?priceLabel(p):'A little idea · coming soon'));a.append(visual,info);article.append(a);catalog.append(article);}
 if(!products.length){const empty=el('div','state-message');empty.append(el('h3','','A little room for something new'),el('p','','No concepts in this collection just yet.'));if(filter!=='all'){const reset=el('button','button','See all little things');reset.type='button';reset.addEventListener('click',()=>selectFilter('all'));empty.append(reset);}catalog.append(empty);}
 catalog.setAttribute('aria-busy','false');document.querySelector('#result-count').textContent=`${products.length} ${products.length===1?'concept':'concepts'}`;
}
function selectFilter(value){
 if(value===filter)return;
 const restoreFocus=catalog.contains(document.activeElement);
 filter=value;for(const b of document.querySelectorAll('[data-filter]'))b.setAttribute('aria-pressed',String(b.dataset.filter===filter));
 renderCatalog();revealCards(catalog);
 if(restoreFocus)document.querySelector(`[data-filter="${filter}"]`).focus({preventScroll:true});
}

function renderDetail(){
 const slug=new URLSearchParams(location.search).get('slug');const p=data.products.find(p=>p.slug===slug);detail.replaceChildren();
 if(!p){document.title='Little thing not found · SoftStrange Studio';const missing=el('div','state-message');missing.append(el('h1','','A little lost?'),el('p','','This little thing isn’t here. Explore the collection using the link above.'));detail.append(missing);return;}
 document.title=`${p.name} · SoftStrange Studio`;document.querySelector('meta[name=description]').content=p.description;
 const layout=el('div','product-layout');const figure=createGallery(p);
 const copy=el('section','product-copy');copy.append(el('span','badge',STATES[p.status]),el('h1','',p.name),el('p','',p.description),el('p','product-price',p.approved?priceLabel(p):'A little idea, still taking shape.'));
 const information=el('div','product-information');
 for(const [title,body] of [['About this piece',p.approved?[p.materials,p.dimensions].filter(Boolean).join(' · '):'An imagined little companion. This is a concept study, not an item for sale.'],['Shipping & care',p.shipping||'Shipping and care details will be shared when the shop opens.']]){const accordion=el('details');accordion.append(el('summary','',title),el('p','',body));information.append(accordion);}copy.append(information);
 if(canBuy(p,data.mode)){const buy=el('a','button checkout',`Buy with Stripe · ${priceLabel(p)}`);buy.href=safeCheckout(p.checkoutUrl);copy.append(buy);}else{const button=el('button','button checkout',p.status==='sold_out'?'This little thing has found a home':'Shop opening soon');button.type='button';button.disabled=true;copy.append(button);}

 const links=el('div','policy-links');for(const [text,href]of [['Shipping & care','shipping.html'],['Shop policies','policies.html']]){const a=el('a','',text);a.href=href;links.append(a);}copy.append(links);layout.append(figure,copy);detail.append(layout);
}
async function load(){
 const target=catalog||detail;if(!target)return;target.setAttribute('aria-busy','true');
 try{const response=await fetch(new URL('data/products.json',import.meta.url),{signal:AbortSignal.timeout(10000),cache:'no-cache'});if(!response.ok)throw new Error('Catalog unavailable');data=validateCatalog(await response.json());catalog?renderCatalog():renderDetail();if(catalog)revealCards(catalog);}
 catch{target.replaceChildren();const message=el('div','state-message');message.append(el('h2','','A little pause'),el('p','','We couldn’t load the collection. Please try again.'));const retry=el('button','button','Try again');retry.type='button';retry.addEventListener('click',load);message.append(retry);target.append(message);}
 finally{target.setAttribute('aria-busy','false');}
}
for(const button of document.querySelectorAll('[data-filter]'))button.addEventListener('click',()=>{if(data)selectFilter(button.dataset.filter);});
observeSections();
load();
