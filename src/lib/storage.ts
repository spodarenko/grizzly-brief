import { STORAGE_KEY } from "../config/site";
import type { BriefState } from "../types/brief";
import { itemGroup } from "./carriers";

export const emptyState: BriefState = {
  lang: "uk",
  pkg: null,
  car: [],
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
