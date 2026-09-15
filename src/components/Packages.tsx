import { useState } from "react";
import type { BriefApi } from "../app/useBrief";
import { packages } from "../content/packages";

export function Packages({ brief }: { brief: BriefApi }) {
  const { state, update, t } = brief;
  const [pending, setPending] = useState<string | null>(null);
  const lang = state.lang;

  const choose = (id: string) => {
    if (id === state.pkg) return;
    if (state.car.length) setPending(id);
    else update({ pkg: id });
  };

  const confirm = () => {
    if (pending) update({ pkg: pending, car: [], spec: {} });
    setPending(null);
  };

  const pendingName = packages.find((p) => p.id === pending)?.name ?? "";

  return (
    <>
      <div className="title">
        <h3>{t("pkg_h")}</h3>
        <p>{t("pkg_p")}</p>
      </div>
      <div className="pkgs">
        {packages.map((p) => {
          const on = state.pkg === p.id;
          const cls = `pkg${on ? " on" : ""}${p.id === "pro" && !state.pkg ? " rec" : ""}`;
          return (
            <div className={cls} key={p.id} onClick={() => choose(p.id)}>
              {p.badge && <span className="badge soft corner">{p.badge[lang]}</span>}
              <h4>{p.name}</h4>
              <p className="lim">{t("lim", { n: p.categoryLimit })}</p>
              <p className="lim">{t("rounds")}</p>
              <ul className="marks">
                {p.includes[lang].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="io">
                <b>{t("for")}</b> {p.audience[lang]}
              </p>
              <button
                type="button"
                className={`btn ${on ? "brand" : "secondary"}`}
                aria-pressed={on}
              >
                {t(on ? "picked" : "pick")}
              </button>
            </div>
          );
        })}
      </div>
      {pending && (
        <div className="callout">
          <span className="badge mark">{t("attn")}</span>
          <div className="body">
            <p>{t("pkg_confirm", { n: state.car.length, name: pendingName })}</p>
            <div className="btn-row gap-t">
              <button type="button" className="btn brand sm" onClick={confirm} autoFocus>
                {t("pkg_yes")}
              </button>
              <button type="button" className="btn secondary sm" onClick={() => setPending(null)}>
                {t("pkg_no")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
