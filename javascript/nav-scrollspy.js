// ===== Scroll suave com correção de offset (fallback) =====
(function () {
  const headerH = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--header-h')) || 64;

  document.querySelectorAll('a[data-nav]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Preferir scroll-margin-top; se falhar, corrigir via JS
      const top = target.getBoundingClientRect().top + window.scrollY - (headerH + 12);
      window.scrollTo({ top, behavior: 'smooth' });

      // Atualiza o hash sem “saltar”
      history.pushState(null, '', href);
    });
  });
})();

// ===== Scrollspy com IntersectionObserver =====
(function () {
  const links = Array.from(document.querySelectorAll('a[data-nav]'));
  const ids = links.map(a => a.getAttribute('href')).filter(h => h && h.startsWith('#'));
  const sections = ids.map(id => document.querySelector(id)).filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) {
    // Fallback simples: ativa por proximidade no scroll
    window.addEventListener('scroll', () => {
      const pos = window.scrollY + (window.innerHeight * 0.33);
      let current = sections[0]?.id;
      sections.forEach(sec => { if (sec.offsetTop <= pos) current = sec.id; });
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
    }, { passive: true });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = `#${entry.target.id}`;
      const link = links.find(a => a.getAttribute('href') === id);
      if (!link) return;

      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {
    // Quando 40% da secção entra no viewport, considera ativa
    root: null,
    rootMargin: `-${(parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--header-h')) || 64) + 8}px 0px -60% 0px`,
    threshold: 0.4
  });

  sections.forEach(sec => observer.observe(sec));
})();
