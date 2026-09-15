import type { BriefApi } from "../app/useBrief";
import { BRAND } from "../config/site";
import type { Lang } from "../types/brief";

const LANGS: { id: Lang; label: string }[] = [
  { id: "uk", label: "UA" },
  { id: "ru", label: "RU" },
];

export function Header({ brief }: { brief: BriefApi }) {
  const { state, update, t } = brief;
  return (
    <div className="top">
      <a className="mark" href="#top">
        {BRAND}
        <span className="dot">.</span>
      </a>
      <div className="top-r">
        <nav>
          <a href="#questions">{t("nav_q")}</a>
          <a href="#package">{t("nav_pkg")}</a>
          <a href="#send">{t("nav_send")}</a>
        </nav>
        <div className="langs" role="group" aria-label="Мова / Язык">
          {LANGS.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={state.lang === l.id}
              onClick={() => update({ lang: l.id })}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
