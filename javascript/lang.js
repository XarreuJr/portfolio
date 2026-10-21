const switchers = document.querySelectorAll(".lang-btn");
let languageRequest = 0;

switchers.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;

    switchers.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    loadLanguage(lang);
    try { localStorage.setItem("portfolio_lang", lang); } catch {}
  });
});

// Carregar o idioma ao iniciar
let savedLang = "pt";
try { savedLang = localStorage.getItem("portfolio_lang") || "pt"; } catch {}
if (!["pt", "en"].includes(savedLang)) savedLang = "pt";
loadLanguage(savedLang);
switchers.forEach(button => button.classList.toggle("active", button.dataset.lang === savedLang));

function loadLanguage(lang) {
  const request = ++languageRequest;
  fetch(`./lang/${lang}.json`)
    .then(res => { if (!res.ok) throw new Error("Language unavailable"); return res.json(); })
    .then(data => {
      if (request !== languageRequest) return;
      document.documentElement.lang = lang;
      switchers.forEach(button => {
        const active = button.dataset.lang === lang;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.dataset.translate;
        if (typeof data[key] === "string") el.innerHTML = data[key];
      });
    }).catch(error => console.warn("Could not load portfolio language.", error));
}
