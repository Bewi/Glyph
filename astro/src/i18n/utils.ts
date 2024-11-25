import { ui, defaultLang, languages } from './ui';

export function getLangFromUrl(url: URL): keyof typeof ui {
  const pathname = url.pathname.replace(import.meta.env.BASE_URL, '');
  const lang = Object.keys(languages).find(l => pathname === l || pathname.indexOf(`${l}/`) === 0);
  return lang as keyof typeof ui || defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}