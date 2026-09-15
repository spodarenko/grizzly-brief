import type { QuestionBlock } from "../types/brief";

export const questionBlocks: QuestionBlock[] = [
  {
    id: "company",
    titleKey: "qg_company",
    fields: [
      {
        id: "legal-name",
        kind: "text",
        labelKey: "q_legal",
        placeholderKey: "q_legal_ph",
        hintKey: "q_legal_h",
      },
      {
        id: "q-services",
        kind: "textarea",
        labelKey: "q_services",
        placeholderKey: "q_services_ph",
      },
    ],
  },
  {
    id: "lang",
    titleKey: "qg_lang",
    fields: [{ id: "q-lang", kind: "text", labelKey: "q_lang", placeholderKey: "q_lang_ph" }],
  },
  {
    id: "pos",
    titleKey: "qg_pos",
    fields: [
      { id: "q-adv", kind: "textarea", labelKey: "q_adv", placeholderKey: "q_adv_ph" },
      { id: "q-comp", kind: "textarea", labelKey: "q_comp", placeholderKey: "q_comp_ph" },
    ],
  },
  {
    id: "logo",
    titleKey: "qg_logo",
    fields: [
      { id: "q-like", kind: "textarea", labelKey: "q_like", placeholderKey: "q_like_ph" },
      { id: "q-avoid", kind: "textarea", labelKey: "q_avoid", placeholderKey: "q_avoid_ph" },
    ],
  },
  {
    id: "mascot",
    titleKey: "qg_mascot",
    fields: [
      {
        id: "q-style",
        kind: "choice",
        labelKey: "q_style",
        hintKey: "q_style_h",
        placeholderKey: "q_other_ph",
        customValue: "other",
        options: [
          { value: "2d", labelKey: "opt_2d" },
          { value: "3d", labelKey: "opt_3d" },
          { value: "other", labelKey: "opt_other" },
        ],
      },
      {
        id: "q-poses",
        kind: "choice",
        labelKey: "q_poses",
        hintKey: "q_poses_h",
        options: [
          { value: "yes", labelKey: "opt_yes" },
          { value: "no", labelKey: "opt_no" },
        ],
      },
    ],
  },
];
