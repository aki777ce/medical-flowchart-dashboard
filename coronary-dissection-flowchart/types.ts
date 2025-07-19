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
  actionText: string;      // 左側の手技テキスト
  cautionText?: string;     // 右側の注意点テキスト
  color?: BulletColor;      // 注意点テキストの先頭に付く色
  subItems?: ActionItem[];
  isHeader?: boolean;
  image?: string;
}

export interface Choice {
  text: string;
  nextId: string;
  style: ChoiceStyle;
}

export enum OutcomeStyle {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface FlowchartNode {
  id: string;
  type: NodeType;
  title: string;
  description?: string;
  actions?: ActionItem[];
  question?: string;
  choices?: Choice[];
  questionImage?: string;
  outcomeStyle?: OutcomeStyle;
}
