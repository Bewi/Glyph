import { a as createComponent, r as renderTemplate, m as maybeRenderHead, c as createAstro, b as addAttribute, d as renderComponent, i as renderHead, h as renderSlot } from './astro/server_U_okOXJo.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                            */

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="container footer"> <div class="container__wrapper"> <div class="footer__content"> <div class="footer__item footer__item--a">
GLYPH
<p>hello@glyph.be</p> </div> <a class="footer__item footer__item--b">Services</a> <a class="footer__item footer__item--c">Blog</a> <a class="footer__item footer__item--d">Formation</a> <a class="footer__item footer__item--e">Ressources</a> </div> </div> </footer>`;
}, "C:/GitHub/Glyph/astro/src/components/Footer.astro", void 0);

const languages = {
  en: "EN",
  fr: "FR"
};
const defaultLang = "fr";
const ui = {
  en: {
    "index.title": "Glyph",
    "hero.text-1": "EN Translation to come",
    "hero.text-2": "EN Translation to come",
    "content.title": "List of bands",
    "band.card.title": "Band card title",
    "band.page.title": "Band:",
    "band.page.genraLabel": "Genra",
    "band.page.fanLabel": "Discovered by"
  },
  fr: {
    "index.title": "Glyph!",
    "hero.text-1": "Nous créons des services, des produits digitaux et des outils de travail en prenant en compte vos exigences et vos utilisateurs",
    "hero.text-2": "Du besoin le plus simple au plus complexe, nous pouvons vous aider !",
    "content.title": "Liste de groupes",
    "band.card.title": "Groupe",
    "band.page.title": "Groupe:",
    "band.page.genraLabel": "Genre",
    "band.page.fanLabel": "Decouvert part"
  }
};

function getLangFromUrl(url) {
  const pathname = url.pathname.replace("/", "");
  const lang = Object.keys(languages).find((l) => pathname === l || pathname.indexOf(`${l}/`) === 0);
  return lang || defaultLang;
}
function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

const $$Astro$2 = createAstro("https://maisallerquoi.netlify.app");
const $$LanguageSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LanguageSelector;
  const currentPath = Astro2.url.pathname;
  const currentLang = getLangFromUrl(Astro2.url);
  const [lang, label] = Object.entries(languages).find(
    ([lang2]) => lang2 !== currentLang
  ) || ["", ""];
  let langReplacement = "/" + lang;
  let rootLangPath = `/${currentLang}`;
  if (!currentPath.endsWith(rootLangPath)) {
    rootLangPath += "/";
    langReplacement += "/";
  }
  const langPath = {
    path: currentPath.replace(rootLangPath, langReplacement),
    label
  };
  return renderTemplate`${maybeRenderHead()}<a class="button"${addAttribute(langPath.path, "href")}>${langPath.label}</a>`;
}, "C:/GitHub/Glyph/astro/src/components/LanguageSelector.astro", void 0);

const $$Astro$1 = createAstro("https://maisallerquoi.netlify.app");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const lang = getLangFromUrl(Astro2.url);
  return renderTemplate`${maybeRenderHead()}<header class="header"> <nav class="navbar" aria-labelledby="mainmenu"> <ul class="navbar__list"> <li> <a class="navbar__link"${addAttribute(`${lang}`, "href")}>Home</a> </li> <li> <a class="navbar__link"${addAttribute(`${lang}/content`, "href")}>Contents</a> </li> </ul> </nav> ${renderComponent($$result, "LanguageSelector", $$LanguageSelector, {})} </header>`;
}, "C:/GitHub/Glyph/astro/src/components/Header.astro", void 0);

const $$Astro = createAstro("https://maisallerquoi.netlify.app");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const lang = getLangFromUrl(Astro2.url);
  const baseUrl = Astro2.url.origin + "/";
  return renderTemplate`<html${addAttribute(lang, "lang")}> <head><base${addAttribute(baseUrl, "href")}><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})}  </body></html>`;
}, "C:/GitHub/Glyph/astro/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getLangFromUrl as g, languages as l, useTranslations as u };
