(function(){
  const header = document.querySelector('.site-header');
  const btn = header?.querySelector('.nav-toggle');
  const links = header?.querySelectorAll('.nav-links a[data-nav]');
  const backdrop = document.getElementById('nav-backdrop');
  if(!header || !btn) return;

  const open = (v)=>{
    header.classList.toggle('nav-open', v);
    document.body.classList.toggle('menu-lock', v);
    btn.setAttribute('aria-expanded', v ? 'true' : 'false');
    // mostrar/ocultar backdrop via atributo hidden (para iOS/pointer events)
    if(backdrop){
      if(v) backdrop.removeAttribute('hidden');
      else {
        // espera o fade-out para esconder
        backdrop.addEventListener('transitionend', function h(){
          backdrop.setAttribute('hidden','');
          backdrop.removeEventListener('transitionend', h);
        }, { once:true });
      }
    }
  };

  btn.addEventListener('click', ()=> open(!header.classList.contains('nav-open')));
  backdrop?.addEventListener('click', ()=> open(false));
  links?.forEach(a => a.addEventListener('click', ()=> open(false)));

  // fecha se fizer scroll manual (para evitar estados a meio)
  let lastY = window.scrollY;
  window.addEventListener('scroll', ()=>{
    if(!header.classList.contains('nav-open')) return;
    const dy = Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    if(dy > 10) open(false);
  }, { passive:true });

  // fecha em resize/orientation change e quando muda o hash
  window.addEventListener('resize', ()=> open(false));
  window.addEventListener('hashchange', ()=> open(false));
})();
