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

| Шлях                 | Що там                                                  |
| -------------------- | ------------------------------------------------------- |
| `src/app/`           | точка входу, `App`, стан брифу (`useBrief`)             |
| `src/components/`    | секції сторінки: Hero, Questions, Packages, Carriers, … |
| `src/content/`       | усі тексти UA/RU, пакети, перелік носіїв, питання       |
| `src/config/`        | токени кольорів, номер WhatsApp, константи              |
| `src/lib/`           | збірка повідомлення, WhatsApp, localStorage, i18n       |
| `src/styles/`        | глобальні стилі                                         |
| `docs/`              | специфікація брифу — джерело істини                     |
| `.github/workflows/` | CI (`check` + `build`) і деплой на GitHub Pages         |

## Типові правки

- Текст — `src/content/copy.ts` (обидві мови).
- Номер WhatsApp — `src/config/site.ts`.
- Пакети чи носії — `src/content/packages.ts`, `src/content/carriers.ts`.
- Питання — `src/content/questions.ts` (+ тексти в `copy.ts`).

Push у `main` → CI → автоматичний деплой на GitHub Pages.

## Поза репо

Дизайн-проєкт і робочі матеріали: `Freelance/GRIZZLY/` (brief, пакети, внутрішні ціни).
Секретів немає: сайт статичний, відповіді йдуть через посилання `wa.me`.
