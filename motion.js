const preference=matchMedia('(prefers-reduced-motion: reduce)');
const explicitOff=new URLSearchParams(location.search).get('motion')==='off';
export const motionIsReduced=()=>preference.matches||explicitOff;
function syncPreference(){document.documentElement.classList.toggle('motion-off',motionIsReduced());if(motionIsReduced())for(const animation of document.getAnimations())animation.finish();}
preference.addEventListener('change',syncPreference);syncPreference();
export function settle(element,delay=0,distance=10){if(motionIsReduced()||!element.animate)return;return element.animate([{opacity:0,transform:`translateY(${distance}px)`},{opacity:1,transform:'translateY(0)'}],{duration:420,delay,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});}
export function revealCards(container){[...container.children].forEach((card,i)=>settle(card,Math.min(i,6)*65));}
export function observeSections(){if(motionIsReduced()||!('IntersectionObserver'in window))return;const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){settle(entry.target);observer.unobserve(entry.target);}},{threshold:.12});for(const section of document.querySelectorAll('.section-heading,.studio-art,.studio-copy'))observer.observe(section);}
