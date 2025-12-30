import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pl: () => import("./dictionaries/pl.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
