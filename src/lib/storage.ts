import { STORAGE_KEY } from "../config/site";
import type { BriefState } from "../types/brief";
import { packages } from "../content/packages";
import { questionBlocks } from "../content/questions";
import { isAnswered } from "./answers";
import { itemGroup } from "./carriers";

export const emptyState: BriefState = {
  lang: "uk",
  pkg: null,
  car: [],
  own: [],
  spec: {},
  ans: {},
  saved: {},
};

export function loadState(): BriefState {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!raw || typeof raw !== "object") return emptyState;
    const state: BriefState = { ...emptyState, ...raw };
    if (state.lang !== "uk" && state.lang !== "ru") state.lang = "uk";
    state.car = (state.car ?? []).filter((id) => itemGroup[id]);
    const pkg = packages.find((p) => p.id === state.pkg);
    state.own = Array.isArray(state.own)
      ? state.own.filter((x) => typeof x === "string" && x.trim()).slice(0, pkg?.ownLimit ?? 0)
      : [];
    const incomplete = questionBlocks
      .filter((b) => !b.fields.every((f) => isAnswered(f, state)))
      .map((b) => b.id);
    state.saved = Object.fromEntries(
      Object.entries(state.saved ?? {}).filter(([id]) => !incomplete.includes(id)),
    );
    if (!state.pkg) {
      state.car = [];
      state.spec = {};
    }
    return state;
  } catch {
    return emptyState;
  }
}

export function saveState(state: BriefState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // приватний режим або заблоковане сховище: чернетка просто не зберігається
  }
}
