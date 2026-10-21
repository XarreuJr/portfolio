// Runs before the stylesheet to avoid an incorrect-theme flash.
(() => {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('dv_theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch {}
  document.documentElement.dataset.theme = theme;
})();
