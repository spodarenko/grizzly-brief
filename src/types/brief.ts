export type Lang = "uk" | "ru";
export type Localized = Record<Lang, string>;

export interface Package {
  id: string;
  name: string;
  /** скільки категорій носіїв можна обрати */
  categoryLimit: number;
  badge: Localized | null;
  includes: Record<Lang, string[]>;
  audience: Localized;
}

export interface CarrierItem {
  id: string;
  name: Localized;
}

export interface CarrierGroup {
  id: string;
  name: Localized;
  /** підказка для поля з розмірами */
  hint: Localized;
  items: CarrierItem[];
}

export type FieldKind = "text" | "textarea" | "choice";

export interface ChoiceOption {
  value: string;
  labelKey: import("../content/copy").CopyKey;
}

export interface QuestionField {
  id: string;
  kind: FieldKind;
  labelKey: import("../content/copy").CopyKey;
  placeholderKey?: import("../content/copy").CopyKey;
  hintKey?: import("../content/copy").CopyKey;
  options?: ChoiceOption[];
  /** значення опції, яке відкриває додаткове текстове поле */
  customValue?: string;
}

export interface QuestionBlock {
  id: string;
  titleKey: import("../content/copy").CopyKey;
  fields: QuestionField[];
}

export interface BriefState {
  lang: Lang;
  pkg: string | null;
  /** id обраних позицій носіїв */
  car: string[];
  /** розміри / опис для кожної позиції */
  spec: Record<string, string>;
  /** відповіді на питання: id поля → значення */
  ans: Record<string, string>;
  /** id блоку → час збереження */
  saved: Record<string, number>;
}
