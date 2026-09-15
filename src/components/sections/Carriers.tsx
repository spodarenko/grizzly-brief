import { useState } from "react";
import type { BriefApi } from "../../app/useBrief";
import { carrierGroups } from "../../content/carriers";
import { packages } from "../../content/packages";
import { totalItems, usedGroups } from "../../lib/carriers";

export function Carriers({ brief }: { brief: BriefApi }) {
  const { state, setState, t } = brief;
  const [open, setOpen] = useState<Set<string>>(new Set());
  const lang = state.lang;
  const pkg = packages.find((p) => p.id === state.pkg);
  const used = usedGroups(state.car);

  const toggleOpen = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleItem = (id: string, checked: boolean) =>
    setState((s) => ({
      ...s,
      car: checked ? [...s.car.filter((x) => x !== id), id] : s.car.filter((x) => x !== id),
    }));

  return (
    <>
      <div className="carbar">
        <h4>
          {t("car_h", {
            ug: used.size,
            g: carrierGroups.length,
            un: state.car.length,
            n: totalItems,
          })}
        </h4>
      </div>
      <div className="callout spec-call">
        <span className="badge mark">{t("attn")}</span>
        <div className="body">
          <p>{t("spec_warn")}</p>
        </div>
      </div>
      {!pkg && <p className="note">{t("car_none")}</p>}
      <div className="cgroups">
        {carrierGroups.map((g) => {
          const isOpen = open.has(g.id);
          const count = g.items.filter((i) => state.car.includes(i.id)).length;
          const locked = !pkg || (!used.has(g.id) && used.size >= pkg.categoryLimit);
          return (
            <div className="cg" key={g.id}>
              <button
                type="button"
                className="tgl"
                aria-expanded={isOpen}
                aria-controls={`cg-${g.id}`}
                onClick={() => toggleOpen(g.id)}
              >
                <span>{g.name[lang]}</span>
                <span className={`cnt${count ? " has" : ""}`}>
                  {count
                    ? `${t("cnt")} ${count} ${t("of")} ${g.items.length}`
                    : String(g.items.length)}
                </span>
                <span className="pm" />
              </button>
              {isOpen && (
                <div className="items chips" id={`cg-${g.id}`}>
                  {g.items.map((item) => (
                    <label className={`opt${locked ? " off" : ""}`} key={item.id}>
                      <input
                        type="checkbox"
                        checked={state.car.includes(item.id)}
                        disabled={locked}
                        onChange={(e) => toggleItem(item.id, e.target.checked)}
                      />
                      <span>{item.name[lang]}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
