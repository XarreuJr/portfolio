// Keep modules and translations on the same release, including returning visitors.
const rendererURL = new URL('./render.js', import.meta.url);
rendererURL.search = new URL(import.meta.url).search;
const {render} = await import(rendererURL.href);

const root = document.getElementById('portfolio');
const cache = new Map();
let language = 'en';
let content;
let requestId = 0;
let filter = 'all';
let observer;
const save = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
function syncThemeButton() {
  const button = root.querySelector('.theme-toggle');
  const light = document.documentElement.dataset.theme === 'light';
  button?.setAttribute('aria-pressed', String(light));
  if (content && button) {
    button.title = `${content.ui.theme}: ${light ? content.ui.dark : content.ui.light}`;
    button.setAttribute('aria-label',button.title);
  }
}
function setMenu(open,restoreFocus=false) {
  const button = root.querySelector('.nav-toggle');
  const panel = root.querySelector('.nav-panel');
  const mobile = matchMedia('(max-width: 1120px)').matches;
  root.querySelector('.site-header')?.classList.toggle('menu-open',open && mobile);
  button?.setAttribute('aria-expanded',String(open && mobile));
  if (content && button) button.setAttribute('aria-label', open && mobile ? content.ui.closeMenu : content.ui.menu);
  if (panel) panel.inert = mobile && !open;
  if (restoreFocus) button?.focus();
}
function applyFilter(value,announce=true) {
  filter = value;
  let count=0;
  root.querySelectorAll('[data-categories]').forEach(card=>{
    const show=value==='all'||card.dataset.categories.split(' ').includes(value);
    card.hidden=!show;
    if (show) count++;
  });
  root.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===value)));
  if (announce && content) root.querySelector('.filter-status').textContent=`${count} ${content.ui.results}`;
}
function setupSections() {
  observer?.disconnect();
  const navs=[...root.querySelectorAll('[data-nav]')];
  if (!('IntersectionObserver' in window)) return;
  observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
    if (!visible.length) return;
    const id=visible[0].target.id;
    navs.forEach(link=>{
      if(link.hash===`#${id}`)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  },{rootMargin:'-80px 0px -45% 0px',threshold:0});
  root.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
}
function enhance() {
  root.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  syncThemeButton();
  setMenu(false);
  setupSections();
  const reveal = document.querySelector('.hero-copy');
  if (reveal && !matchMedia('(prefers-reduced-motion: reduce)').matches) reveal.classList.add('enter');
}
async function setLanguage(lang,fromControl=false) {
  if(!['en','pt'].includes(lang))lang='en';
  const request=++requestId;
  try {
    if(!cache.has(lang)) {
      const translationURL=new URL(`../lang/${lang}.json`,import.meta.url);
      translationURL.search=new URL(import.meta.url).search;
      const response=await fetch(translationURL);
      if(!response.ok)throw new Error(`Language ${response.status}`);
      cache.set(lang,await response.json());
    }
    if(request!==requestId)return;
    const nextContent=cache.get(lang);
    if(!nextContent.ui||!nextContent.projects?.categories)throw new Error('Incompatible language content');
    content=nextContent;
    language=lang;
    const oldScroll=window.scrollY;
    const menuOpen=root.querySelector('.nav-toggle')?.getAttribute('aria-expanded')==='true';
    root.innerHTML=render(content,lang);
    document.documentElement.lang=lang;
    document.title=content.metaTitle;
    document.querySelector('meta[name="description"]').content=content.metaDescription;
    save('dv_language',lang);
    enhance();
    applyFilter(filter,false);
    if(fromControl){
      if(menuOpen)setMenu(true);
      root.querySelector(`[data-language="${lang}"]`)?.focus({preventScroll:true});
      const html=document.documentElement;const prior=html.style.scrollBehavior;html.style.scrollBehavior='auto';window.scrollTo(0,oldScroll);html.style.scrollBehavior=prior;
    }
  } catch(error) {
    // Crawlable English content remains available if language loading fails.
    console.warn('Unable to load the selected language.',error);
  }
}
root.addEventListener('click',event=>{
  const control=event.target.closest('button,a');
  if(!control)return;
  if(control.matches('[data-language]'))setLanguage(control.dataset.language,true);
  if(control.matches('.theme-toggle')){
    const theme=document.documentElement.dataset.theme==='light'?'dark':'light';
    document.documentElement.dataset.theme=theme;save('dv_theme',theme);syncThemeButton();
  }
  if(control.matches('.nav-toggle'))setMenu(control.getAttribute('aria-expanded')!=='true');
  if(control.matches('[data-filter]'))applyFilter(control.dataset.filter);
  if(control.matches('a[href^="#"]'))setMenu(false);
});
document.addEventListener('keydown',event=>{
  const open=root.querySelector('.nav-toggle')?.getAttribute('aria-expanded')==='true';
  if(event.key==='Escape'&&open)setMenu(false,true);
  if(event.key==='Tab'&&open){
    const focusable=[...root.querySelectorAll('.site-header a[href],.site-header button')].filter(el=>el.getClientRects().length&&!el.closest('[inert]'));
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))setMenu(false);});
matchMedia('(max-width: 1120px)').addEventListener('change',()=>setMenu(false));
window.addEventListener('hashchange',()=>setMenu(false));
enhance();
setLanguage(read('dv_language')||'en');
