
export enum NodeType {
  DECISION = 'DECISION',
  OUTCOME = 'OUTCOME',
}

export enum BulletColor {
  GREEN = 'GREEN',
  ORANGE = 'ORANGE',
  RED = 'RED',
}

export enum ChoiceStyle {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  DANGER = 'DANGER',
}

export interface ActionItem {
  text: string;
  color?: BulletColor;
  subItems?: ActionItem[];
  isHeader?: boolean;
  image?: string;
}

export interface Choice {
  text: string;
  nextId: string;
  style: ChoiceStyle;
}

export interface FlowchartNode {
  id: string;
  type: NodeType;
  title: string;
  description?: string;
  actions?: ActionItem[];
  question?: string;
  questionImage?: string;
  choices?: Choice[];
}
