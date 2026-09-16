import { STORAGE_KEY } from "../config/site";
import type { BriefState } from "../types/brief";
import { carrierGroups } from "../content/carriers";
import { itemGroup } from "./carriers";

export const emptyState: BriefState = {
  lang: "uk",
  pkg: null,
  car: [],
  own: {},
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
    state.own = Object.fromEntries(
      carrierGroups
        .map((g) => [g.id, (state.own?.[g.id] ?? []).filter((x) => typeof x === "string" && x)])
        .filter(([, names]) => names.length),
    );
    if (!state.pkg) {
      state.car = [];
      state.own = {};
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
