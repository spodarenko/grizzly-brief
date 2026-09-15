import { copy, type CopyKey } from "../content/copy";
import type { Lang } from "../types/brief";

export type Translate = (key: CopyKey, vars?: Record<string, string | number>) => string;

export function makeT(lang: Lang): Translate {
  return (key, vars) => {
    let text: string = copy[lang][key] ?? copy.uk[key] ?? key;
    if (vars)
      for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v));
    return text;
  };
}
