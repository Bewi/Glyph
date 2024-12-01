import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../../../chunks/astro/server_U_okOXJo.mjs';
import 'kleur/colors';
import { g as getEntry, a as getCollection } from '../../../chunks/_astro_content_D6VUcdX4.mjs';
import { $ as $$Layout, u as useTranslations } from '../../../chunks/Layout_BQFkCurM.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://maisallerquoi.netlify.app");
const prerender = false;
const getStaticPaths = async () => {
  const bands = await getCollection("bands");
  return bands.map((b) => {
    const [lang, id] = b.id.split("/");
    return { params: { lang, bandId: id }, props: b };
  });
};
const $$bandId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$bandId;
  const { lang, bandId } = Astro2.params;
  const band = await getEntry("bands", lang + "/" + bandId);
  const t = useTranslations(lang);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("band.page.title") + band?.data.bandName }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="headline">${t("band.page.title")} ${band?.data.bandName}!</h1> <p>${t("band.page.genraLabel")}: ${band?.data.genre}</p> <p>${t("band.page.fanLabel")}: ${band?.data.fan}</p> ` })}`;
}, "C:/GitHub/Glyph/astro/src/pages/[lang]/bands/[bandId].astro", void 0);

const $$file = "C:/GitHub/Glyph/astro/src/pages/[lang]/bands/[bandId].astro";
const $$url = "/[lang]/bands/[bandId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$bandId,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
