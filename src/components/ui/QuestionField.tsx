import type { BriefApi } from "../../app/useBrief";
import type { QuestionField as Field } from "../../types/brief";

export function QuestionField({ field, brief }: { field: Field; brief: BriefApi }) {
  const { state, setState, t } = brief;
  const value = state.ans[field.id] ?? "";
  const set = (id: string, v: string) => setState((s) => ({ ...s, ans: { ...s.ans, [id]: v } }));
  const placeholder = field.placeholderKey ? t(field.placeholderKey) : undefined;
  const hint = field.hintKey && <span className="hint">{t(field.hintKey)}</span>;

  if (field.kind === "choice") {
    const customId = `${field.id}-custom`;
    return (
      <div className="field">
        <span className="qt">{t(field.labelKey)}</span>
        <div className="opts" role="radiogroup">
          {field.options?.map((o) => (
            <label className="opt" key={o.value}>
              <input
                type="radio"
                name={field.id}
                value={o.value}
                checked={value === o.value}
                onChange={() => set(field.id, o.value)}
              />
              <span>{t(o.labelKey)}</span>
            </label>
          ))}
        </div>
        {field.customValue && value === field.customValue && (
          <input
            className="input"
            type="text"
            autoFocus
            placeholder={placeholder}
            value={state.ans[customId] ?? ""}
            onChange={(e) => set(customId, e.target.value)}
          />
        )}
        {hint}
      </div>
    );
  }

  const Control = field.kind === "textarea" ? "textarea" : "input";
  return (
    <label className="field">
      <span className="qt">{t(field.labelKey)}</span>
      <Control
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => set(field.id, e.target.value)}
      />
      {hint}
    </label>
  );
}
