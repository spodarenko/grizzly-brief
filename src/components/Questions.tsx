import { useRef } from "react";
import type { BriefApi } from "../app/useBrief";
import { questionBlocks } from "../content/questions";
import { answerText } from "../lib/answers";
import { QuestionField } from "./QuestionField";
import { Stepper } from "./Stepper";

export function Questions({ brief }: { brief: BriefApi }) {
  const { state, setState, t } = brief;
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const jump = (id: string) => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    blockRefs.current[id]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const toggleSaved = (id: string) =>
    setState((s) => {
      const saved = { ...s.saved };
      if (saved[id]) delete saved[id];
      else saved[id] = Date.now();
      return { ...s, saved };
    });

  return (
    <section id="questions">
      <div className="title">
        <h3>{t("q_h")}</h3>
        <p>{t("q_p")}</p>
      </div>
      <Stepper saved={state.saved} t={t} onJump={jump} />
      <div className="qwrap">
        {questionBlocks.map((block) => {
          const savedAt = state.saved[block.id];
          return (
            <div
              key={block.id}
              ref={(el) => {
                blockRefs.current[block.id] = el;
              }}
              className={`step qb${savedAt ? " saved" : ""}`}
            >
              <h4>
                <span>{t(block.titleKey)}</span>
                {savedAt && (
                  <span className="badge mark qstamp">
                    {new Date(savedAt).toLocaleTimeString(state.lang, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </h4>
              {savedAt ? (
                <div className="qview">
                  {block.fields.map((f) => {
                    const v = answerText(f, state, t);
                    return (
                      <div className="qa" key={f.id}>
                        <p className="qt">{t(f.labelKey)}</p>
                        <p className={`ans${v ? "" : " empty"}`}>{v || t("empty")}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="qform">
                  {block.fields.map((f) => (
                    <QuestionField key={f.id} field={f} brief={brief} />
                  ))}
                </div>
              )}
              <div className="qbar">
                <button
                  type="button"
                  className={`btn sm${savedAt ? " secondary" : ""}`}
                  onClick={() => toggleSaved(block.id)}
                >
                  {t(savedAt ? "edit" : "save")}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
