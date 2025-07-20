import { FlowchartNode, NodeType, BulletColor, ChoiceStyle } from '../types';

export const flowchartData: Record<string, FlowchartNode> = {
  START: {
    id: 'START',
    type: NodeType.DECISION,
    title: '追加手技適応',
    description: '冠動脈穿孔の対応を開始します',
    choices: [
      {
        text: 'ステインが短時間消失・拡大　or初期大サイズ（>5mm）',
        nextId: 'EVALUATION_REQUIRED',
        style: ChoiceStyle.DANGER,
      },
      {
        text: '安定ステイン・静脈心腔交通',
        nextId: 'OBSERVATION',
        style: ChoiceStyle.PRIMARY,
      },
    ],
  },

  STENT_PERFORATION: {
    id: 'STENT_PERFORATION',
    type: NodeType.OUTCOME,
    title: '経過観察',
    description: 'ステント・短時間消失・拡大 or 初期拡大サイズ (>5mm) の場合は経過観察を行います',
    actions: [
      { text: '継続的なモニタリング', color: BulletColor.ORANGE },
      { text: 'バイタルサインの確認', color: BulletColor.GREEN },
      { text: '必要に応じて追加処置', color: BulletColor.ORANGE },
    ],
  },

  SAFE_STENT: {
    id: 'SAFE_STENT',
    type: NodeType.OUTCOME,
    title: '経過観察',
    description: '安全ステント・静脈心室交通の場合は経過観察を行います',
    actions: [
      { text: '継続的なモニタリング', color: BulletColor.ORANGE },
      { text: 'バイタルサインの確認', color: BulletColor.GREEN },
      { text: '必要に応じて追加処置', color: BulletColor.ORANGE },
    ],
  },

  EVALUATION_REQUIRED: {
    id: 'EVALUATION_REQUIRED',
    type: NodeType.OUTCOME,
    title: '穿孔位置同定',
    description: '穿孔の位置と程度を評価します',
    actions: [
      { text: '多方向GC造影・MC先端造影（少量造影）', color: BulletColor.GREEN },
      { text: 'MC造入後のGC造影（MC位置確定で造影されない可能性）', color: BulletColor.ORANGE },
      { text: '一方向GC造影（分岐の重なりによる誤同定の可能性）', color: BulletColor.RED },
    ],
    nextNodeId: 'PERFORATION_IDENTIFIED',
    nextButtonText: '穿孔位置同定・MC進入可能',
  },

  MULTI_DIRECTION_IMAGING: {
    id: 'MULTI_DIRECTION_IMAGING',
    type: NodeType.DECISION,
    title: '穿孔位置同定完了',
    description: '多方向GC撮影・MC先端造影による評価結果',
    choices: [
      {
        text: '穿孔位置同定可・MC造入可能',
        nextId: 'PERFORATION_IDENTIFIED',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: '穿孔位置同定不可・MC造入困難',
        nextId: 'BLOOD_VESSEL_PERFORATION',
        style: ChoiceStyle.DANGER,
      },
    ],
  },

  MC_CONTRAST_IMAGING: {
    id: 'MC_CONTRAST_IMAGING',
    type: NodeType.DECISION,
    title: '穿孔位置同定完了',
    description: 'MC造入後のGC造影による評価結果',
    choices: [
      {
        text: '穿孔位置同定可・MC造入可能',
        nextId: 'PERFORATION_IDENTIFIED',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: '穿孔位置同定不可・MC造入困難',
        nextId: 'BLOOD_VESSEL_PERFORATION',
        style: ChoiceStyle.DANGER,
      },
    ],
  },

  SINGLE_DIRECTION_IMAGING: {
    id: 'SINGLE_DIRECTION_IMAGING',
    type: NodeType.DECISION,
    title: '穿孔位置同定完了',
    description: '一方向GC造影による評価結果（誤同定リスクあり）',
    choices: [
      {
        text: '穿孔位置同定可・MC造入可能',
        nextId: 'PERFORATION_IDENTIFIED',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: '穿孔位置同定不可・MC造入困難',
        nextId: 'BLOOD_VESSEL_PERFORATION',
        style: ChoiceStyle.DANGER,
      },
    ],
  },

  PERFORATION_IDENTIFIED: {
    id: 'PERFORATION_IDENTIFIED',
    type: NodeType.DECISION,
    title: '塞栓子',
    description: '穿孔部位の処置方法を選択します',
    choices: [
      {
        text: '重要部位から十分な距離・MC進入可能',
        nextId: 'COIL_TREATMENT',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: '重要部位と近接・MC進入不可',
        nextId: 'BLOOD_VESSEL_PERFORATION',
        style: ChoiceStyle.DANGER,
      },
    ],
  },

  BLOOD_VESSEL_PERFORATION: {
    id: 'BLOOD_VESSEL_PERFORATION',
    type: NodeType.DECISION,
    title: '血管灌断',
    description: '血管灌断による処置を検討します',
    choices: [
      {
        text: '重要部位と近接・MC造入不可',
        nextId: 'BALLOON_TREATMENT_OPTIONS',
        style: ChoiceStyle.DANGER,
      },
      {
        text: '穿孔子技を回避したい状況',
        nextId: 'BALLOON_TREATMENT_OPTIONS',
        style: ChoiceStyle.SECONDARY,
      },
      {
        text: '大きな血管灌断',
        nextId: 'SURGICAL_INTERVENTION',
        style: ChoiceStyle.DANGER,
      },
      {
        text: '再出血リスク（カバードステント以外）',
        nextId: 'COVERED_STENT_CONSIDERATION',
        style: ChoiceStyle.ORANGE,
      },
    ],
  },

  COIL_TREATMENT: {
    id: 'COIL_TREATMENT',
    type: NodeType.OUTCOME,
    title: 'ベイルアウト手法',
    description: '手技の種類と特徴を表示します',
    actions: [
      { text: 'コイル: 製品準備 | 手技: 手技中に塞栓子が逆行できないため手技の再開通が高い | ヘパリンリバース: 不要', color: BulletColor.GREEN },
      { text: '血管: 製品準備 | 手技: 手技中に塞栓子が逆行できないため手技の再開通が高い | ヘパリンリバース: 適宜', color: BulletColor.ORANGE },
      { text: '脂肪: 製品準備 | 手技: 手技中に塞栓子が逆行できないため手技の再開通が高い | ヘパリンリバース: 適宜', color: BulletColor.ORANGE },
      { text: 'スポンゼル: 製品準備 | 手技: 手技中に塞栓子が逆行できないため手技の再開通が高い | ヘパリンリバース: 適宜', color: BulletColor.ORANGE },
    ],
  },

  BALLOON_TREATMENT_OPTIONS: {
    id: 'BALLOON_TREATMENT_OPTIONS',
    type: NodeType.DECISION,
    title: 'バルーン治療選択',
    description: 'バルーンによる治療方法を選択します',
    choices: [
      {
        text: '血管',
        nextId: 'BALLOON_OCCLUSION',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: '脂肪',
        nextId: 'BALLOON_OCCLUSION',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: 'スポンゼル',
        nextId: 'SPONZEL_TREATMENT',
        style: ChoiceStyle.SECONDARY,
      },
      {
        text: 'マイクロカテーテル',
        nextId: 'MICROCATHETER_TREATMENT',
        style: ChoiceStyle.SECONDARY,
      },
      {
        text: '近位バルーン閉塞',
        nextId: 'PROXIMAL_BALLOON_OCCLUSION',
        style: ChoiceStyle.SECONDARY,
      },
      {
        text: 'Covered Stent',
        nextId: 'COVERED_STENT_TREATMENT',
        style: ChoiceStyle.SECONDARY,
      },
      {
        text: 'Standard Stent',
        nextId: 'STANDARD_STENT_TREATMENT',
        style: ChoiceStyle.DANGER,
      },
    ],
  },

  BALLOON_OCCLUSION: {
    id: 'BALLOON_OCCLUSION',
    type: NodeType.OUTCOME,
    title: 'バルーン閉塞',
    description: 'バルーンによる血管閉塞を実施します',
    actions: [
      { text: '製品準備', color: BulletColor.GREEN },
      { text: '手技中に穿孔が見えないため手技の再現性が低い', color: BulletColor.ORANGE },
      { text: '適宜', color: BulletColor.GREEN },
    ],
  },

  SPONZEL_TREATMENT: {
    id: 'SPONZEL_TREATMENT',
    type: NodeType.OUTCOME,
    title: 'スポンゼル治療',
    description: 'スポンゼルによる止血処置を実施します',
    actions: [
      { text: '製品準備', color: BulletColor.GREEN },
      { text: '手技中に穿孔が見えないため手技の再現性が低い', color: BulletColor.ORANGE },
      { text: '適宜', color: BulletColor.GREEN },
    ],
  },

  MICROCATHETER_TREATMENT: {
    id: 'MICROCATHETER_TREATMENT',
    type: NodeType.OUTCOME,
    title: 'マイクロカテーテル治療',
    description: 'マイクロカテーテルを使用した処置を実施します',
    actions: [
      { text: '自家使用薬品', color: BulletColor.GREEN },
      { text: '持続塞栓することが多い、MC造影されることによる再出血のリスクがある', color: BulletColor.ORANGE },
      { text: '適宜', color: BulletColor.GREEN },
    ],
  },

  PROXIMAL_BALLOON_OCCLUSION: {
    id: 'PROXIMAL_BALLOON_OCCLUSION',
    type: NodeType.OUTCOME,
    title: '近位バルーン閉塞',
    description: '近位部でのバルーン閉塞を実施します',
    actions: [
      { text: '自家使用薬品', color: BulletColor.GREEN },
      { text: '適応バルーンの長時間閉塞では末梢領域の虚血のリスクがあり一定時間した後による再出血のリスクがある', color: BulletColor.ORANGE },
      { text: '適宜', color: BulletColor.GREEN },
    ],
  },

  COVERED_STENT_TREATMENT: {
    id: 'COVERED_STENT_TREATMENT',
    type: NodeType.OUTCOME,
    title: 'Covered Stent',
    description: 'カバードステントによる治療を実施します',
    actions: [
      { text: '製品準備', color: BulletColor.GREEN },
      { text: 'その他のオプションが不可能しくは不成功時にカバードステントで出血管腔の血流遮断をする', color: BulletColor.ORANGE },
      { text: '不要', color: BulletColor.GREEN },
    ],
  },

  STANDARD_STENT_TREATMENT: {
    id: 'STANDARD_STENT_TREATMENT',
    type: NodeType.OUTCOME,
    title: 'Standard Stent',
    description: 'スタンダードステントによる治療を実施します',
    actions: [
      { text: '自家使用薬品', color: BulletColor.GREEN },
      { text: '効果が不確実、急出血手技の管理が増加する可能性あり', color: BulletColor.RED },
      { text: '適宜', color: BulletColor.GREEN },
    ],
  },

  SURGICAL_INTERVENTION: {
    id: 'SURGICAL_INTERVENTION',
    type: NodeType.OUTCOME,
    title: '外科的介入',
    description: '緊急外科手術が必要です',
    actions: [
      { text: '緊急手術室準備', color: BulletColor.RED },
      { text: '心臓外科医との連携', color: BulletColor.RED },
      { text: '生命維持管理', color: BulletColor.RED },
    ],
  },

  COVERED_STENT_CONSIDERATION: {
    id: 'COVERED_STENT_CONSIDERATION',
    type: NodeType.DECISION,
    title: 'カバードステント検討',
    description: 'カバードステントの適応を検討します',
    choices: [
      {
        text: 'カバードステント適応',
        nextId: 'COVERED_STENT_TREATMENT',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: '他の治療法検討',
        nextId: 'BALLOON_TREATMENT_OPTIONS',
        style: ChoiceStyle.SECONDARY,
      },
    ],
  },

  OBSERVATION: {
    id: 'OBSERVATION',
    type: NodeType.OUTCOME,
    title: '経過観察',
  },
};
