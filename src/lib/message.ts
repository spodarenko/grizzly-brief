import { carrierGroups } from "../content/carriers";
import { packages } from "../content/packages";
import { questionBlocks } from "../content/questions";
import type { BriefState } from "../types/brief";
import { answerText } from "./answers";
import { usedGroups } from "./carriers";
import type { Translate } from "./i18n";

/** Текст повідомлення з усіма відповідями, пакетом і носіями */
export function buildMessage(state: BriefState, t: Translate): string {
  const out = [t("out_title"), ""];

  for (const block of questionBlocks) {
    for (const field of block.fields) {
      out.push(t(field.labelKey), answerText(field, state, t) || t("empty"), "");
    }
  }

  const pkg = packages.find((p) => p.id === state.pkg);
  out.push(`${t("out_pkg")}: ${pkg ? pkg.name : t("none")}`);
  out.push(`${t("out_car")} (${usedGroups(state.car).size} ${t("of")} ${carrierGroups.length}):`);

  let any = false;
  for (const group of carrierGroups) {
    const selected = group.items.filter((i) => state.car.includes(i.id));
    if (!selected.length) continue;
    any = true;
    out.push(`— ${group.name[state.lang]}:`);
    for (const item of selected) {
      const spec = (state.spec[item.id] ?? "").trim();
      out.push(`   · ${item.name[state.lang]} — ${spec || t("spec_missing")}`);
    }
  }
  if (!any) out.push(`— ${t("none")}`);

  return out.join("\n");
}
