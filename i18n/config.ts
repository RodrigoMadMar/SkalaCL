import en from "./locales/en.json";
import esCL from "./locales/es-CL.json";

export const locales = ["es-CL", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es-CL";
export const localeStorageKey = "skala.locale";
export const localeLabels: Record<Locale, string> = { "es-CL": "ES", en: "EN" };
export type TranslationKey = keyof typeof en;

const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  en,
  "es-CL": esCL,
};

export function isLocale(value: string | null): value is Locale {
  return locales.includes(value as Locale);
}

export function translate(locale: Locale, key: TranslationKey, values?: Record<string, string | number>) {
  let value = dictionaries[locale][key];
  for (const [name, replacement] of Object.entries(values ?? {})) {
    value = value.replaceAll(`{${name}}`, String(replacement));
  }
  return value;
}
