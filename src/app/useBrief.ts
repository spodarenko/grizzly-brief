import { useEffect, useMemo, useState } from "react";
import { makeT } from "../lib/i18n";
import { loadState, saveState } from "../lib/storage";
import type { BriefState } from "../types/brief";

export function useBrief() {
  const [state, setState] = useState<BriefState>(loadState);

  useEffect(() => {
    saveState(state);
    document.documentElement.lang = state.lang;
  }, [state]);

  const t = useMemo(() => makeT(state.lang), [state.lang]);
  const update = (patch: Partial<BriefState>) => setState((s) => ({ ...s, ...patch }));

  return { state, setState, update, t };
}

export type BriefApi = ReturnType<typeof useBrief>;
