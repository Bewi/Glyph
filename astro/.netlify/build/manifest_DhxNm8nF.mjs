import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { j as decodeKey } from './chunks/astro/server_U_okOXJo.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = (_, next) => next();

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/GitHub/Glyph/astro/","adapterName":"@astrojs/netlify","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".footer{background-color:#3c83dd;color:#fffde4}.footer__content{display:grid;grid-template-columns:repeate(6,1fr);grid-template-areas:\"a . . b c\" \"a . . d e\"}.footer__item--a{grid-area:a}.footer__item--b{grid-area:b}.footer__item--c{grid-area:c}.footer__item--d{grid-area:d}.footer__item--e{grid-area:e}.header{background-color:var(--primary-color);padding:var(--content-spacing-1);color:var(--primary-alt-color);display:flex}.navbar{flex-grow:1}.navbar__list{list-style:none;display:flex;justify-content:flex-end;margin:0}.navbar__link{display:block;padding:var(--content-spacing-1);text-decoration:none;color:var(--primary-alt-color)}:root{--bg-color: #FFFEF1;--primary-color: #11372A;--secondary-color: #ACDBF7;--bg-alt-color: #11372A;--primary-alt-color: #E7E9D3;--secondary-alt-color: #11372A;--content-spacing-1: 1rem;--container-size: 992px}html{font-size:16px}body{background-color:var(--bg-color);color:var(--bg-alt-color);margin:0;padding:0}.button{display:block;border-radius:2rem;padding:1rem;background-color:var(--bg-color);color:var(--bg-alt-color);text-decoration:none}\n"}],"routeData":{"route":"/[lang]/bands/[bandid]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/bands\\/([^/]+?)\\/?$","segments":[[{"content":"lang","dynamic":true,"spread":false}],[{"content":"bands","dynamic":false,"spread":false}],[{"content":"bandId","dynamic":true,"spread":false}]],"params":["lang","bandId"],"component":"src/pages/[lang]/bands/[bandId].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://maisallerquoi.netlify.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/GitHub/Glyph/astro/src/pages/[lang]/bands/[bandId].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[lang]/bands/[bandId]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/GitHub/Glyph/astro/src/pages/[lang]/content.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[lang]/content@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/GitHub/Glyph/astro/src/pages/[lang]/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/[lang]/bands/[bandId]@_@astro":"pages/_lang_/bands/_bandid_.astro.mjs","\u0000@astro-page:src/pages/[lang]/content@_@astro":"pages/_lang_/content.astro.mjs","\u0000@astro-page:src/pages/[lang]/index@_@astro":"pages/_lang_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DhxNm8nF.mjs","C:/GitHub/Glyph/astro/src/content/bands/en/klone.json?astroDataCollectionEntry=true":"chunks/klone_lbyg-j8y.mjs","C:/GitHub/Glyph/astro/src/content/bands/en/knocked-loose.json?astroDataCollectionEntry=true":"chunks/knocked-loose_BmClh8l5.mjs","C:/GitHub/Glyph/astro/src/content/bands/en/les-amis-nos-morts.json?astroDataCollectionEntry=true":"chunks/les-amis-nos-morts_B4Eh3l4t.mjs","C:/GitHub/Glyph/astro/src/content/bands/fr/klone.json?astroDataCollectionEntry=true":"chunks/klone_BvBTidvK.mjs","C:/GitHub/Glyph/astro/src/content/bands/fr/knocked-loose.json?astroDataCollectionEntry=true":"chunks/knocked-loose_D2v7cjCB.mjs","C:/GitHub/Glyph/astro/src/content/bands/fr/les-amis-nos-morts.json?astroDataCollectionEntry=true":"chunks/les-amis-nos-morts_Bs4TqJe7.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"L9AEm64IizcYP1Y+PSbSyVEFE88uSyA1fEejOqOrR6s=","experimentalEnvGetSecretEnabled":false});

export { manifest };
