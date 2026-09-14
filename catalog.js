export const STATES = Object.freeze({preparing:'In the making',preview:'Concept preview',available:'Available',sold_out:'Sold out',archived:'From the archive'});
export function safeImage(value){return typeof value==='string' && /^assets\/products\/[a-zA-Z0-9_-]+\.(webp|avif|jpg|jpeg|png|svg)$/.test(value) ? value : 'assets/brand/flower.svg';}
export function safeCheckout(value){try{const u=new URL(value);return u.protocol==='https:' && u.hostname==='buy.stripe.com' && !u.username && !u.password && !u.port && /^\/[a-zA-Z0-9_]+$/.test(u.pathname) && !u.search && !u.hash ? u.href : null;}catch{return null;}}
export function canBuy(product,mode){return mode==='live' && product.approved===true && product.status==='available' && Number.isSafeInteger(product.priceMinor) && product.priceMinor>0 && Boolean(product.shipping?.trim()) && Boolean(safeCheckout(product.checkoutUrl));}
export function priceLabel(p){if(!Number.isSafeInteger(p.priceMinor)||p.priceMinor<0)return 'Price to be confirmed';try{return new Intl.NumberFormat('en-US',{style:'currency',currency:p.currency}).format(p.priceMinor/100);}catch{return 'Price to be confirmed';}}
export function validateCatalog(data){
 if(!data||data.schemaVersion!==1||!['preview','live'].includes(data.mode)||!Array.isArray(data.products))throw new Error('Invalid catalog format');
 const ids=new Set(),slugs=new Set();
 for(const p of data.products){
  if(!p||typeof p.id!=='string'||!p.id||ids.has(p.id)||typeof p.slug!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)||slugs.has(p.slug))throw new Error('Invalid or duplicate product identifier');
  if(typeof p.name!=='string'||!p.name.trim()||typeof p.description!=='string'||!Object.hasOwn(STATES,p.status)||typeof p.approved!=='boolean'||!['companions','paper'].includes(p.category)||typeof p.alt!=='string'||!p.alt.trim())throw new Error('Invalid product content');
  if(p.priceMinor!==null&&(!Number.isSafeInteger(p.priceMinor)||p.priceMinor<0))throw new Error('Invalid price');
  if(typeof p.currency!=='string'||!/^[A-Z]{3}$/.test(p.currency)||!Array.isArray(p.gallery))throw new Error('Invalid product metadata');
  if(p.imageScale!==undefined&&(!Number.isFinite(p.imageScale)||p.imageScale<1||p.imageScale>1.5))throw new Error('Invalid image framing');
  for(const view of p.gallery)if(!view||typeof view.image!=='string'||safeImage(view.image)!==view.image||typeof view.alt!=='string'||!view.alt.trim()||typeof view.label!=='string'||!view.label.trim())throw new Error('Invalid gallery view');
  for(const key of ['materials','dimensions','shipping','checkoutUrl'])if(p[key]!==null&&typeof p[key]!=='string')throw new Error('Invalid product details');
  ids.add(p.id);slugs.add(p.slug);
 }
 return data;
}
