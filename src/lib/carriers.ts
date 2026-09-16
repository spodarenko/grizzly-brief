import { carrierGroups } from "../content/carriers";

export const itemGroup: Record<string, string> = Object.fromEntries(
  carrierGroups.flatMap((g) => g.items.map((i) => [i.id, g.id])),
);

export const totalItems = Object.keys(itemGroup).length;

export const usedGroups = (car: string[]) => new Set(car.map((id) => itemGroup[id]));
