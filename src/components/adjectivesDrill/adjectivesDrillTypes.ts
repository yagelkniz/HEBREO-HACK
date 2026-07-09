export type AdjCategoryId = 1 | 2 | 3 | 4 | 5;

export const ADJ_CATEGORIES: { id: AdjCategoryId; title: string }[] = [
  { id: 1, title: "אופי ורגש" },
  { id: 2, title: "מראה וגודל" },
  { id: 3, title: "תנועה וקושי" },
  { id: 4, title: "חושים וטבע" },
  { id: 5, title: "עניין ואיכות" },
];

export interface Adjective {
  id: string;
  category: AdjCategoryId;
  ms: string;
  fs: string;
  mp: string;
  fp: string;
  english: string;
  emoji: string;
  oppositeId: string;
}

export type Gender = "m" | "f";
export type GNumber = "s" | "p";

export const FORM_LABEL: Record<`${Gender}${GNumber}`, string> = {
  ms: "זכר יחיד",
  fs: "נקבה יחיד",
  mp: "זכר רבים",
  fp: "נקבה רבים",
};

export interface AdjSentence {
  id: string;
  category: AdjCategoryId;
  noun: string;
  gender: Gender;
  number: GNumber;
  template: string; // contains ___
  adjectiveId: string;
  english: string;
}
