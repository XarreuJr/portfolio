(function(){
  const grid   = document.getElementById('cert-grid');
  if (!grid) return;

  const typeSel = document.getElementById('cert-filter-type');
  const search  = document.getElementById('cert-search');
  const cards   = Array.from(grid.querySelectorAll('.cert-card'));

  function applyFilters(){
    const type   = typeSel?.value || 'all';
    const query  = (search?.value || '').trim().toLowerCase();

    cards.forEach(card => {
      const okType  = (type === 'all') || (card.dataset.type === type);
      const hay     = (card.dataset.title + ' ' + card.dataset.issuer).toLowerCase();
      const okQuery = query === '' || hay.includes(query);

      card.style.display = (okType && okQuery) ? '' : 'none';
    });
  }

  typeSel?.addEventListener('change', applyFilters);
  search?.addEventListener('input', applyFilters);

  applyFilters();
})();
