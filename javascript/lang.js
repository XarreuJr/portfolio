const switchers = document.querySelectorAll(".lang-btn");

switchers.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;

    switchers.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    loadLanguage(lang);
    localStorage.setItem("portfolio_lang", lang);
  });
});

// Carregar o idioma ao iniciar
const savedLang = localStorage.getItem("portfolio_lang") || "pt";
loadLanguage(savedLang);
document.querySelector(`[data-lang="${savedLang}"]`).classList.add("active");

function loadLanguage(lang) {
  fetch(`./lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.dataset.translate;
        el.innerHTML = data[key];
      });
    });
}
