import type { BriefState, QuestionField } from "../types/brief";
import type { Translate } from "./i18n";

/** Відповідь на поле як текст: для вибору — підпис опції (+ власний варіант) */
export function answerText(field: QuestionField, state: BriefState, t: Translate): string {
  const value = (state.ans[field.id] ?? "").trim();
  if (field.kind !== "choice") return value;
  const option = field.options?.find((o) => o.value === value);
  if (!option) return "";
  const label = t(option.labelKey);
  const custom = value === field.customValue ? (state.ans[`${field.id}-custom`] ?? "").trim() : "";
  return custom ? `${label}: ${custom}` : label;
}
