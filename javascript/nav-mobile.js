
(function(){
  const header = document.querySelector('.site-header');
  const btn = header?.querySelector('.nav-toggle');
  const links = header?.querySelectorAll('.nav-links a[data-nav]');
  if(!header || !btn) return;

  function open(v){
    header.classList.toggle('nav-open', v);
    document.body.classList.toggle('menu-lock', v);
    btn.setAttribute('aria-expanded', v ? 'true' : 'false');
  }

  btn.addEventListener('click', () => open(!header.classList.contains('nav-open')));
  links?.forEach(a => a.addEventListener('click', () => open(false)));

  // fecha com ESC
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') open(false);
  });
})();
