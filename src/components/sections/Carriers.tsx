import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { BriefApi } from "../../app/useBrief";
import { OWN_NAME_MAX, OWN_NAME_MIN } from "../../config/site";
import { carrierGroups } from "../../content/carriers";
import type { CopyKey } from "../../content/copy";
import { packages } from "../../content/packages";
import { totalItems, usedGroups } from "../../lib/carriers";

/** id згортання блоку «Свої варіанти» поруч з id категорій */
const OWN_ID = "own";

export function Carriers({ brief }: { brief: BriefApi }) {
  const { state, setState, t } = brief;
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<CopyKey | null>(null);
  const lang = state.lang;
  const pkg = packages.find((p) => p.id === state.pkg);
  const used = usedGroups(state.car);
  const ownLimit = pkg?.ownLimit ?? 0;
  const ownFull = state.own.length >= ownLimit;

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

  const addOwn = () => {
    const name = draft.trim().replace(/\s+/g, " ");
    if (!name) return;
    if (/[,;]/.test(name)) return setError("own_list");
    if (name.length < OWN_NAME_MIN) return setError("own_short");
    if (state.own.some((x) => x.toLowerCase() === name.toLowerCase())) return setError("own_dup");
    if (ownFull) return;
    setState((s) => ({ ...s, own: [...s.own, name] }));
    setDraft("");
    setError(null);
  };

  const removeOwn = (name: string) =>
    setState((s) => ({ ...s, own: s.own.filter((x) => x !== name) }));

  const onDraftKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    addOwn();
  };

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
                      <span>
                        {item.name[lang]}
                        {state.car.includes(item.id) && (
                          <i className="x" aria-hidden="true">
                            ×
                          </i>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="cg own-block">
        <button
          type="button"
          className="tgl"
          aria-expanded={open.has(OWN_ID)}
          aria-controls={`cg-${OWN_ID}`}
          onClick={() => toggleOpen(OWN_ID)}
        >
          <span>{t("own_h")}</span>
          <span className={`cnt${state.own.length ? " has" : ""}`}>
            {state.own.length
              ? `${t("cnt")} ${state.own.length} ${t("of")} ${ownLimit}`
              : String(ownLimit)}
          </span>
          <span className="pm" />
        </button>
        {open.has(OWN_ID) && (
          <div className="items own-body" id={`cg-${OWN_ID}`}>
            <p className="note">{t(!pkg ? "own_none" : ownFull ? "own_full" : "own_p")}</p>
            {state.own.length > 0 && (
              <div className="own-chips">
                {state.own.map((name) => (
                  <span className="own" key={name}>
                    {name}
                    <button
                      type="button"
                      className="x"
                      aria-label={`${t("own_del")}: ${name}`}
                      onClick={() => removeOwn(name)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <input
              className="input own-input"
              value={draft}
              maxLength={OWN_NAME_MAX}
              disabled={!pkg || ownFull}
              placeholder={t("own_ph")}
              aria-label={t("own_ph")}
              aria-invalid={Boolean(error)}
              onChange={(e) => {
                setDraft(e.target.value);
                setError(null);
              }}
              onKeyDown={onDraftKey}
            />
            {error && (
              <p className="own-err" role="alert">
                {t(error, { n: OWN_NAME_MIN })}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
