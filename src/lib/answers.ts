import type { BriefState, QuestionField } from "../types/brief";
import type { Translate } from "./i18n";

/** Поле заповнене: текст не порожній; для вибору — обрана опція, а для власного варіанта ще й опис */
export function isAnswered(field: QuestionField, state: BriefState): boolean {
  const value = (state.ans[field.id] ?? "").trim();
  if (!value) return false;
  if (field.kind !== "choice") return true;
  if (!field.options?.some((o) => o.value === value)) return false;
  return value !== field.customValue || Boolean((state.ans[`${field.id}-custom`] ?? "").trim());
}

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
