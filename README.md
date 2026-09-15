# GRIZZLY Brief

Сторінка-бриф для клієнта GRIZZLY (сервіс збірки меблів): питання перед стартом брендингу,
вибір пакета й носіїв, відправка відповідей у WhatsApp.

Живе посилання: https://spodarenko.github.io/grizzly-brief/

## Запуск

```bash
npm install
npm run dev      # локально на http://localhost:5173/grizzly-brief/
npm run check    # lint + format + types
npm run build    # збірка в dist/
```

## Де що лежить

| Шлях                       | Що там                                                   |
| -------------------------- | -------------------------------------------------------- |
| `src/app/`                 | точка входу, `App`, стан брифу (`useBrief`)              |
| `src/pages/`               | сторінки (`BriefPage`)                                   |
| `src/layouts/`             | каркас: `PageLayout`, `Header`, `Footer`                 |
| `src/components/sections/` | секції: Hero, Questions, Packages, Carriers, SendSection |
| `src/components/ui/`       | дрібні елементи: Stepper, QuestionField, WithBrand       |
| `src/content/`             | тексти UA/RU, питання, пакети, носії                     |
| `src/config/`              | кольори, типографіка, параметри UI, номер WhatsApp       |
| `src/lib/`                 | логіка без React: повідомлення, WhatsApp, сховище, i18n  |
| `src/styles/`              | глобальні стилі                                          |
| `docs/`                    | специфікація, стайл-гайд, архітектура — джерело істини   |
| `.github/workflows/`       | CI (`check` + `build`) і деплой на GitHub Pages          |

## Типові правки

- Текст — `src/content/copy.ts` (обидві мови).
- Номер WhatsApp — `src/config/site.ts`.
- Пакети чи носії — `src/content/packages.ts`, `src/content/carriers.ts`.
- Питання — `src/content/questions.ts` (+ тексти в `copy.ts`).

Push у `main` → CI → автоматичний деплой на GitHub Pages.

## Поза репо

Дизайн-проєкт і робочі матеріали: `Freelance/GRIZZLY/` (brief, пакети, внутрішні ціни).
Секретів немає: сайт статичний, відповіді йдуть через посилання `wa.me`.
