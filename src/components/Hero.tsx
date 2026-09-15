import type { CopyKey } from "../content/copy";
import type { Translate } from "../lib/i18n";
import { WithBrand } from "./Brand";

const CELLS: [CopyKey, CopyKey][] = [
  ["c1l", "c1v"],
  ["c3l", "c3v"],
  ["c4l", "c4v"],
];

export function Hero({ t }: { t: Translate }) {
  return (
    <section className="hero">
      <p className="kicker">Branding brief · GRIZZLY</p>
      <h1>
        <WithBrand text={t("h1")} />
      </h1>
      <p className="lede">{t("lede")}</p>
      <div className="cells">
        {CELLS.map(([label, value]) => (
          <div key={value}>
            <p className="lab">{t(label)}</p>
            <p className="val">{t(value)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
