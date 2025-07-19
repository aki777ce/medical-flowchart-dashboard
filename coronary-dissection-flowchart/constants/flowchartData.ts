import { FlowchartNode, NodeType, BulletColor, ChoiceStyle, OutcomeStyle } from '../types';

export const flowchartData: Record<string, FlowchartNode> = {
  START: {
    id: 'START',
    type: NodeType.DECISION,
    title: 'カテーテルによる重症冠動脈解離',
    question: '初期状況を選択してください',
    choices: [
      {
        text: '診断カテ',
        nextId: 'DIAG_CATH_START',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: 'ガイドカテ',
        nextId: 'GUIDE_CATH_START',
        style: ChoiceStyle.PRIMARY,
      },
    ],
  },
  DIAG_CATH_START: {
    id: 'DIAG_CATH_START',
    type: NodeType.DECISION,
    title: '診断カテ',
    question: '血行動態は安定していますか？',
    choices: [
      { text: 'はい', nextId: 'TRUE_LUMEN_WIRING', style: ChoiceStyle.PRIMARY },
      { text: 'いいえ', nextId: 'MECHANICAL_SUPPORT', style: ChoiceStyle.DANGER },
    ],
  },
  GUIDE_CATH_START: {
    id: 'GUIDE_CATH_START',
    type: NodeType.DECISION,
    title: 'ガイドカテ',
    question: '解離部真腔にGWはありますか？',
    choices: [
      { text: 'はい', nextId: 'IMMEDIATE_STENT', style: ChoiceStyle.PRIMARY },
      { text: 'いいえ', nextId: 'TRUE_LUMEN_WIRING', style: ChoiceStyle.DANGER },
    ],
  },
  MECHANICAL_SUPPORT: {
    id: 'MECHANICAL_SUPPORT',
    type: NodeType.DECISION,
    title: '機械サポート',
    actions: [
      { actionText: 'PCPS', cautionText: '', color: BulletColor.GREEN },
      { actionText: 'IMPELLA', cautionText: '', color: BulletColor.GREEN },
      { actionText: 'IABP', cautionText: '', color: BulletColor.GREEN },
    ],
    question: '次のステップに進みますか？',
    choices: [
      { text: '次へ', nextId: 'TRUE_LUMEN_WIRING', style: ChoiceStyle.PRIMARY },
    ],
  },
  IMMEDIATE_STENT: {
    id: 'IMMEDIATE_STENT',
    type: NodeType.DECISION,
    title: 'すぐにステント留置',
    actions: [
      { actionText: 'すぐにステント留置', cautionText: '', color: BulletColor.GREEN },
    ],
    question: 'すぐに留置が可能ですか？',
    choices: [
      { text: '可能', nextId: 'STENT_OUTCOME', style: ChoiceStyle.PRIMARY },
      { text: '困難', nextId: 'MECHANICAL_SUPPORT', style: ChoiceStyle.DANGER },
    ],
  },
  TRUE_LUMEN_WIRING: {
    id: 'TRUE_LUMEN_WIRING',
    type: NodeType.DECISION,
    title: '真腔ワイヤリング',
    actions: [
      { actionText: '解離作成GCでのワイヤリング', cautionText: '短時間・固執しない', color: BulletColor.ORANGE },
      { actionText: '異なる形状のGCへの変更後ワイヤリング', cautionText: '', color: BulletColor.GREEN },
      { actionText: 'ワイヤ先端大カーブ', cautionText: '短時間・固執しない', color: BulletColor.ORANGE },
      { actionText: 'IVUSガイド', cautionText: 'IVUSで真腔位置確認', color: BulletColor.GREEN },
      { actionText: '近位分枝へのワイヤリング', cautionText: '主要分枝・固執しない', color: BulletColor.ORANGE },
    ],
    question: 'ワイヤリングに成功しましたか？',
    choices: [
      { text: '成功', nextId: 'STENT_OUTCOME', style: ChoiceStyle.PRIMARY },
      { text: '不成功', nextId: 'WIRING_FAILURE_OPTIONS', style: ChoiceStyle.DANGER },
    ],
  },
  WIRING_FAILURE_OPTIONS: {
    id: 'WIRING_FAILURE_OPTIONS',
    type: NodeType.DECISION,
    title: '通常真腔ワイヤリング不成功時のオプション',
    actions: [
      { actionText: 'ナックルワイヤ', cautionText: 'リエントリが有効な場合あり・側枝での冠破裂リスクあり', color: BulletColor.ORANGE },
      { actionText: 'ADR', cautionText: '手技が複雑・機械サポート下では有効な場合あり', color: BulletColor.ORANGE },
      { actionText: '偽腔バルーン拡張', cautionText: '冠破裂リスクあり', color: BulletColor.RED },
    ],
    question: 'オプション手技に成功しましたか？',
    choices: [
      { text: '成功', nextId: 'STENT_OUTCOME', style: ChoiceStyle.PRIMARY },
      { text: '不成功', nextId: 'SURGERY_OUTCOME', style: ChoiceStyle.DANGER },
    ],
  },
  STENT_OUTCOME: {
    id: 'STENT_OUTCOME',
    type: NodeType.OUTCOME,
    title: 'ステント留置',
    description: '手技は正常に完了しました。',
    outcomeStyle: OutcomeStyle.SUCCESS,
  },
  SURGERY_OUTCOME: {
    id: 'SURGERY_OUTCOME',
    type: NodeType.OUTCOME,
    title: '外科治療',
    description: '外科的な介入が必要です。',
    outcomeStyle: OutcomeStyle.FAILURE,
  },
};
