# Архітектура

Статичний React-сайт (Vite), хостинг GitHub Pages. Сервера й бази немає: чернетка живе в
localStorage, відповіді відправляються посиланням `wa.me`.

## Шари

```
src/
├── app/         точка входу (main.tsx), App, стан брифу useBrief
├── pages/       сторінки: BriefPage — єдина сторінка
├── layouts/     каркас: PageLayout, Header, Footer
├── components/
│   ├── sections/  секції сторінки: Hero, Questions, Packages, Carriers, SendSection
│   └── ui/        дрібні повторні елементи: Stepper, QuestionField, WithBrand
├── content/     дані й тексти: copy (UA/RU), questions, packages, carriers
├── config/      tokens.css, typography.css, site.ts (номер WhatsApp, ключ сховища)
├── lib/         чиста логіка без React: i18n, storage, message, whatsapp, answers, carriers
├── styles/      global.css
└── types/       brief.ts — спільні типи
```

Залежності йдуть в один бік: `pages → components → lib → content/config/types`.
`lib/` не імпортує React; `content/` не містить логіки.

## Потік даних

1. `useBrief` читає стан із localStorage і зберігає кожну зміну.
2. Секції отримують `brief` (стан, `setState`, `t`) і змінюють лише свою частину стану.
3. `lib/message.buildMessage` збирає текст з питань, пакета й носіїв.
4. `lib/whatsapp.openWhatsApp` копіює текст і відкриває `wa.me/<номер>?text=…`.

## Як додати

- **Питання:** поле в `content/questions.ts` + тексти в `content/copy.ts`. Повідомлення й
  степер підхоплять автоматично.
- **Носій:** позиція в `content/carriers.ts`.
- **Пакет:** запис у `content/packages.ts`.

## Деплой

Push у `main` → `.github/workflows/ci.yml` (check + build) і `deploy.yml` (GitHub Pages).
Робота йде в гілках → PR → `main`.
