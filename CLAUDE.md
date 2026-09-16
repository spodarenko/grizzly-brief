# GRIZZLY Brief Site

Бриф для клієнта GRIZZLY на React + Vite, хостинг GitHub Pages. Дизайн-проєкт: `../GRIZZLY/`.

- `docs/` читати лише перед змінами коду, що підуть на GitHub. Для дизайну, брендингу, ресерчу — не читати.
- Код і docs розходяться → виграють docs, або спершу змінюються docs.
- Тексти тільки в `src/content/copy.ts`, завжди UA і RU разом.
- Hex, шрифтова шкала, параметри UI — лише в `src/config/`. Нове значення в стилях = новий токен.
- Шари: `pages → components (sections, ui) → lib → content/config/types`. Див. `docs/architecture.md`.
- Готово = `npm run check` і `npm run build` проходять.
- Робота в гілці → PR → `main`. Коміти: Conventional Commits, малі, одне призначення.
- Робочі матеріали AI — `.claude/work/` (у .gitignore).
