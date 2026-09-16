import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { BriefApi } from "../../app/useBrief";
import { carrierGroups } from "../../content/carriers";
import { packages } from "../../content/packages";
import { ownCount, totalItems, usedGroups } from "../../lib/carriers";

export function Carriers({ brief }: { brief: BriefApi }) {
  const { state, setState, t } = brief;
  const [open, setOpen] = useState<Set<string>>(new Set());
  /** категорія, в якій зараз відкрите поле «Свій варіант» */
  const [adding, setAdding] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const lang = state.lang;
  const pkg = packages.find((p) => p.id === state.pkg);
  const used = usedGroups(state.car, state.own);

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

  const closeAdd = () => {
    setAdding(null);
    setDraft("");
  };

  const addOwn = (groupId: string) => {
    const name = draft.trim();
    if (name) {
      setState((s) => {
        const list = s.own[groupId] ?? [];
        if (list.some((x) => x.toLowerCase() === name.toLowerCase())) return s;
        return { ...s, own: { ...s.own, [groupId]: [...list, name] } };
      });
    }
    setDraft("");
  };

  const removeOwn = (groupId: string, name: string) =>
    setState((s) => {
      const list = (s.own[groupId] ?? []).filter((x) => x !== name);
      const own = { ...s.own };
      if (list.length) own[groupId] = list;
      else delete own[groupId];
      return { ...s, own };
    });

  const onDraftKey = (e: KeyboardEvent<HTMLInputElement>, groupId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOwn(groupId);
    } else if (e.key === "Escape") {
      closeAdd();
    }
  };

  return (
    <>
      <div className="carbar">
        <h4>
          {t("car_h", {
            ug: used.size,
            g: carrierGroups.length,
            un: state.car.length + ownCount(state.own),
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
          const own = state.own[g.id] ?? [];
          const count = g.items.filter((i) => state.car.includes(i.id)).length + own.length;
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
                  {own.map((name) => (
                    <span className="own" key={name}>
                      <span className="nm">{name}</span>
                      <button
                        type="button"
                        className="del"
                        aria-label={`${t("own_del")}: ${name}`}
                        onClick={() => removeOwn(g.id, name)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {adding === g.id && !locked ? (
                    <input
                      className="input own-input"
                      autoFocus
                      value={draft}
                      placeholder={t("own_ph")}
                      aria-label={t("own_ph")}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => onDraftKey(e, g.id)}
                      onBlur={() => {
                        addOwn(g.id);
                        closeAdd();
                      }}
                    />
                  ) : (
                    <button
                      type="button"
                      className="own-add"
                      disabled={locked}
                      onClick={() => {
                        setDraft("");
                        setAdding(g.id);
                      }}
                    >
                      {t("own_add")}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
