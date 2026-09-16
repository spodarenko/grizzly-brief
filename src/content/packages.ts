import type { Package } from "../types/brief";

export const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    categoryLimit: 2,
    ownLimit: 2,
    revisionRounds: 2,
    badge: null,
    includes: {
      uk: ["Логотип і його версії", "Палітра, шрифти, тон комунікації", "Маскот у системі бренду"],
      ru: ["Логотип и его версии", "Палитра, шрифты, тон коммуникации", "Маскот в системе бренда"],
    },
  },
  {
    id: "pro",
    name: "Pro",
    categoryLimit: 5,
    ownLimit: 4,
    revisionRounds: 3,
    badge: {
      uk: "+ усе з Basic",
      ru: "+ всё из Basic",
    },
    includes: {
      uk: ["Більше носіїв", "Детальніші правила використання", "Розширені мокапи"],
      ru: ["Больше носителей", "Более детальные правила", "Расширенные мокапы"],
    },
  },
  {
    id: "premium",
    name: "Premium",
    categoryLimit: 8,
    ownLimit: 6,
    revisionRounds: 4,
    badge: {
      uk: "+ усе з Pro",
      ru: "+ всё из Pro",
    },
    includes: {
      uk: ["Розширена бренд-система", "Макети, готові до друку", "Основа для сайту"],
      ru: ["Расширенная бренд-система", "Макеты, готовые к печати", "Основа для сайта"],
    },
  },
];
