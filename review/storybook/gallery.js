import {motionIsReduced} from './motion.js?v=storybook-3';
import {safeImage} from './catalog.js?v=storybook-3';
const element=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
export function createGallery(product){
  const items=[{image:product.image,alt:product.alt,label:'Portrait'},...product.gallery];
  let index=0,zoomed=false;
  const figure=element('figure','gallery');
  const open=element('button','gallery-open paper-frame');open.type='button';open.setAttribute('aria-label','Enlarge artwork');
  const main=element('img','product-main-image');main.width=640;main.height=640;main.decoding='async';
  const cue=element('span','gallery-cue','Take a closer look');cue.setAttribute('aria-hidden','true');open.append(main,cue);
  const thumbs=element('div','gallery-thumbs');thumbs.setAttribute('role','group');thumbs.setAttribute('aria-label','Artwork views');
  const count=element('p','gallery-count');count.setAttribute('role','status');count.setAttribute('aria-live','polite');
  const thumbButtons=items.map((item,i)=>{const button=element('button','gallery-thumb');button.type='button';button.setAttribute('aria-label',`Show ${item.label.toLowerCase()}`);const image=element('img');image.src=safeImage(item.image);image.alt='';image.width=72;image.height=72;image.loading='lazy';button.append(image,element('span','',item.label));button.addEventListener('click',()=>select(i));thumbs.append(button);return button;});
  figure.append(open,thumbs,count,element('figcaption','image-note',product.imageCredit||'Artwork'));
  const dialog=element('dialog','art-dialog');dialog.setAttribute('aria-labelledby','gallery-title');
  const heading=element('h2','visually-hidden',`${product.name} — artwork viewer`);heading.id='gallery-title';
  const close=element('button','icon-button dialog-close','×');close.type='button';close.setAttribute('aria-label','Close artwork viewer');close.autofocus=true;
  const canvas=element('div','zoom-canvas');canvas.tabIndex=0;canvas.setAttribute('aria-label','Artwork; scroll to explore when zoomed');
  const enlarged=element('img');enlarged.width=960;enlarged.height=960;enlarged.decoding='async';canvas.append(enlarged);
  const controls=element('div','gallery-controls');
  const previous=element('button','icon-button','←');previous.type='button';previous.setAttribute('aria-label','Previous artwork');
  const next=element('button','icon-button','→');next.type='button';next.setAttribute('aria-label','Next artwork');
  const modalCount=element('p','');modalCount.setAttribute('role','status');
  const zoom=element('button','zoom-button','Zoom in');zoom.type='button';zoom.setAttribute('aria-pressed','false');
  controls.append(previous,modalCount,next,zoom);dialog.append(heading,close,canvas,controls);figure.append(dialog);
  function setZoom(value){zoomed=value;dialog.classList.toggle('is-zoomed',value);zoom.textContent=value?'Zoom out':'Zoom in';zoom.setAttribute('aria-pressed',String(value));canvas.scrollTo(0,0);}
  function setImage(img,item){img.onload=()=>{if(!motionIsReduced()&&img.animate)img.animate([{opacity:.35},{opacity:1}],{duration:220,easing:'ease-out'});};img.alt=item.alt;img.src=safeImage(item.image);img.onerror=()=>{img.onerror=null;img.src='assets/brand/flower.svg';img.alt='Artwork is unavailable';};}
  function select(value){index=(value+items.length)%items.length;const item=items[index];setImage(main,item);if(dialog.open)setImage(enlarged,item);for(const [i,b] of thumbButtons.entries())b.setAttribute('aria-pressed',String(i===index));count.textContent=`${index+1} / ${items.length} · ${item.label}`;modalCount.textContent=count.textContent;setZoom(false);}
  open.addEventListener('click',()=>{setImage(enlarged,items[index]);dialog.showModal();document.body.classList.add('dialog-open');});
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');setZoom(false);open.focus({preventScroll:true});});
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  previous.addEventListener('click',()=>select(index-1));next.addEventListener('click',()=>select(index+1));zoom.addEventListener('click',()=>setZoom(!zoomed));
  function keyboard(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();select(index+(e.key==='ArrowRight'?1:-1));}}
  dialog.addEventListener('keydown',keyboard);open.addEventListener('keydown',keyboard);
  thumbs.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){keyboard(e);thumbButtons[index].focus();}});
  let touch=null;
  open.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')touch={x:e.clientX,y:e.clientY};});
  open.addEventListener('pointercancel',()=>{touch=null;});
  let swiped=false;
  open.addEventListener('pointerup',e=>{if(!touch)return;const dx=e.clientX-touch.x,dy=e.clientY-touch.y;touch=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){swiped=true;select(index+(dx<0?1:-1));}});
  open.addEventListener('click',e=>{if(swiped){e.stopImmediatePropagation();e.preventDefault();swiped=false;}},true);
  previous.disabled=next.disabled=items.length<2;select(0);return figure;
}
