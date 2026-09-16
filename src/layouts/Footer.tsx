import type { Translate } from "../lib/i18n";

export function Footer({ t }: { t: Translate }) {
  return (
    <footer>
      <nav className="fnav">
        <a href="#questions">{t("nav_q")}</a>
        <a href="#package">{t("nav_pkg")}</a>
        <a href="#top">{t("nav_top")}</a>
      </nav>
      <p className="legal">{t("legal")}</p>
    </footer>
  );
}
