export enum NodeType {
  DECISION = 'decision',
  OUTCOME = 'outcome',
}

export enum ChoiceStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

export enum BulletColor {
  GREEN = 'green',
  ORANGE = 'orange',
  RED = 'red',
}

export interface Choice {
  text: string;
  nextId: string;
  style: ChoiceStyle;
}

export interface Action {
  text: string;
  color: BulletColor;
}

export interface FlowchartNode {
  id: string;
  type: NodeType;
  title: string;
  description?: string;
  choices?: Choice[];
  actions?: Action[];
  image?: string;
  nextNodeId?: string;
  nextButtonText?: string;
}
