export type DecisionTier = "ai-supported" | "human-supervised" | "human-only";

export type LimitCategory = "may-support" | "must-not-decide";

export interface DecisionTierInfo {
  id: DecisionTier;
  name: string;
  pattern: string;
  meaning: string;
}

export interface Stage {
  id: string;
  number: string;
  title: string;
  summary: string;
  activities: string[];
  limitations: string[];
  oversight: string;
}

export interface Professional {
  id: string;
  name: string;
  summary: string;
  responsibilities: string[];
  aiCanAssist: string[];
  aiMustNotReplace: string[];
  stageIds: string[];
}

export interface AIApplication {
  id: string;
  name: string;
  stageIds: string[];
  whatItDoes: string;
  informationUsed: string[];
  benefits: string[];
  limitations: string[];
  supervision: string;
  decisionTier: DecisionTier;
}

export interface LimitRow {
  id: string;
  name: string;
  category: LimitCategory;
  stageIds: string[];
  why: string;
  oversight: string;
  detail: string;
  decisionTier: DecisionTier;
  relatedApplicationIds: string[];
}

export interface LoopNode {
  id: string;
  title: string;
  summary: string;
  detail: string;
  decisionTier: DecisionTier;
}

export interface Slide {
  number: number;
  title: string;
  lede: string;
  notes: string;
  showDisclaimer: boolean;
}
