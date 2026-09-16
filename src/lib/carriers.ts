import { carrierGroups } from "../content/carriers";

export const itemGroup: Record<string, string> = Object.fromEntries(
  carrierGroups.flatMap((g) => g.items.map((i) => [i.id, g.id])),
);

export const totalItems = Object.keys(itemGroup).length;

export const ownCount = (own: Record<string, string[]>) =>
  Object.values(own).reduce((sum, names) => sum + names.length, 0);

/** Категорії, в яких є обрана позиція або свій носій */
export const usedGroups = (car: string[], own: Record<string, string[]>) =>
  new Set([...car.map((id) => itemGroup[id]), ...Object.keys(own).filter((id) => own[id]?.length)]);
