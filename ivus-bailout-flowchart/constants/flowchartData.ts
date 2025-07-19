import { FlowchartNode, NodeType, BulletColor, ChoiceStyle } from '../types';

// The browser environment doesn't support importing images directly as modules.
// Instead, we define the paths as simple strings. The web server will serve
// these images from the root directory.
const imageCoreGWExchange = '/images/image-core-gw-exchange.png';
const imageBalloonDilatationDoubleGc = '/images/balloon_dilatation_double_gc.png';
const imageCatheterAndStentDetails = '/images/catheter_and_stent_details.png';
const imageLoop = '/images/loop.png';
const imageCompleteStuck = '/images/complete stuck.png';
const image6FGc = '/images/6F GC.png';
const imageKnuckle = '/images/knuckle.png';
const imageRotation = '/images/rotation.png';
const imageGec = '/images/gec.png';

export const flowchartData: Record<string, FlowchartNode> = {
  START: {
    id: 'START',
    type: NodeType.DECISION,
    title: 'どちらのスタックですか？',
    choices: [
      {
        text: '挿入時スタック',
        nextId: 'STACK_INSERT',
        style: ChoiceStyle.PRIMARY,
      },
      {
        text: '抜去時スタック',
        nextId: 'STACK_REMOVE',
        style: ChoiceStyle.PRIMARY,
      },
    ],
  },
  SUCCESS: {
    id: 'SUCCESS',
    type: NodeType.OUTCOME,
    title: '抜去成功',
    description: '手技は正常に完了しました。',
  },
  SURGERY: {
    id: 'SURGERY',
    type: NodeType.OUTCOME,
    title: '外科処置',
    description: '外科的な介入が必要です。',
  },
  // Insertion Stack Flow
  STACK_INSERT: {
    id: 'STACK_INSERT',
    type: NodeType.DECISION,
    title: '挿入時スタック - 高度狭窄スタック',
    actions: [
      { text: 'GEC・GCでアンカートラップ', color: BulletColor.GREEN },
      { text: 'イメージコアのGW交換', color: BulletColor.ORANGE, image: imageCoreGWExchange },
      {
        isHeader: true,
        text: '7Fr.以上のGC使用',
        subItems: [
          { text: 'スタック部拡張・スネア捕捉', color: BulletColor.GREEN },
        ],
      },
      {
        isHeader: true,
        text: 'ダブルGC使用',
        subItems: [
          { text: 'スタック部拡張', color: BulletColor.GREEN },
        ],
      },
      { text: 'エグジットポート塞ぎ', color: BulletColor.RED },
    ],
    question: '上記対応後、抜去可能？',
    choices: [
      { text: '抜去', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '抜去不可', nextId: 'SURGERY', style: ChoiceStyle.DANGER },
    ],
  },

  // Removal Stack Flow
  STACK_REMOVE: {
    id: 'STACK_REMOVE',
    type: NodeType.DECISION,
    title: '抜去時スタック',
    question: 'IVUSワイヤのたわみ・絡みがある？',
    questionImage: imageLoop,
    choices: [
      { text: 'あり', nextId: 'IVUS_WIRE_FLEX_YES', style: ChoiceStyle.SECONDARY },
      { text: 'なし', nextId: 'IVUS_WIRE_FLEX_NO', style: ChoiceStyle.SECONDARY },
    ],
  },
  IVUS_WIRE_FLEX_YES: {
    id: 'IVUS_WIRE_FLEX_YES',
    type: NodeType.DECISION,
    title: 'IVUSワイヤのたわみ・絡みあり',
    actions: [
        { text: 'IVUSワイヤ位置修正', color: BulletColor.GREEN },
        { text: 'IVUSワイヤ抜去', color: BulletColor.RED },
    ],
    question: '上記対応後、抜去可能？',
    choices: [
      { text: '抜去', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '抜去不可', nextId: 'IVUS_CATHETER_ADVANCE_PROMPT', style: ChoiceStyle.DANGER },
    ],
  },
  IVUS_WIRE_FLEX_NO: {
    id: 'IVUS_WIRE_FLEX_NO',
    type: NodeType.DECISION,
    title: 'IVUSワイヤのたわみ・絡みなし',
    question: 'IVUSカテが遠位に進む？',
    choices: [
      { text: '進む', nextId: 'IVUS_CATHETER_ADVANCE', style: ChoiceStyle.PRIMARY },
      { text: '進まない', nextId: 'IVUS_CATHETER_NO_ADVANCE', style: ChoiceStyle.DANGER },
    ],
  },
  IVUS_CATHETER_ADVANCE_PROMPT: {
    id: 'IVUS_CATHETER_ADVANCE_PROMPT',
    type: NodeType.DECISION,
    title: 'IVUSワイヤのたわみ・絡みあり → 抜去不可',
    description: 'IVUSカテが遠位に進むかどうかを確認してください。',
    question: 'IVUSカテが遠位に進む？',
    choices: [
      { text: '進む', nextId: 'IVUS_CATHETER_ADVANCE', style: ChoiceStyle.PRIMARY },
      { text: '進まない', nextId: 'IVUS_CATHETER_NO_ADVANCE', style: ChoiceStyle.DANGER },
    ]
  },
  IVUS_CATHETER_NO_ADVANCE: {
    id: 'IVUS_CATHETER_NO_ADVANCE',
    type: NodeType.DECISION,
    title: 'IVUSカテが進まない',
    actions: [
      { text: 'イメージコアのGW交換', color: BulletColor.GREEN, image: imageCoreGWExchange },
      { text: 'GEC挿入', color: BulletColor.ORANGE },
      { text: '7Fr以上GC or ダブルGC使用', isHeader: true },
      { text: 'バルーン拡張', color: BulletColor.ORANGE },
      { text: '力づくカテ抜去', color: BulletColor.RED, image: imageCompleteStuck },
    ],
    question: '上記対応後、遠位部に進む？',
    choices: [
      { text: '進む', nextId: 'CATHETER_BLOCK', style: ChoiceStyle.PRIMARY },
      { text: '進まない', nextId: 'SURGERY', style: ChoiceStyle.DANGER },
    ]
  },
  IVUS_CATHETER_ADVANCE: {
    id: 'IVUS_CATHETER_ADVANCE',
    type: NodeType.DECISION,
    title: 'IVUSカテが進む',
    actions: [
        { text: '7Fr以上のGC使用もしくは小径MC使用可能', isHeader: true },
        { text: 'MC・バルーンのエグジットポート塞ぎ', color: BulletColor.GREEN, image: imageCatheterAndStentDetails },
        {
          text: '6Fr.のGC使用',
          isHeader: true,
          subItems: [
            { text: 'MCのエグジットポート塞ぎ', color: BulletColor.GREEN, image: image6FGc },
          ]
        },
    ],
    question: '対応は可能・成功しましたか？',
    choices: [
      { text: '抜去', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '不可能・不成功', nextId: 'CATHETER_BLOCK_FAILURE', style: ChoiceStyle.DANGER },
    ]
  },
  CATHETER_BLOCK: {
    id: 'CATHETER_BLOCK',
    type: NodeType.DECISION,
    title: '遠位部に進んだ',
     actions: [
        { text: '7Fr以上のGC使用もしくは小径MC使用可能', isHeader: true },
        { text: 'MC・バルーンのエグジットポート塞ぎ', color: BulletColor.GREEN, image: imageCatheterAndStentDetails },
        {
          text: '6Fr.のGC使用',
          isHeader: true,
          subItems: [
            { text: 'MCのエグジットポート塞ぎ', color: BulletColor.GREEN, image: image6FGc },
          ]
        },
    ],
    question: '対応は可能・成功しましたか？',
    choices: [
      { text: '抜去', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '不可能・不成功', nextId: 'CATHETER_BLOCK_FAILURE', style: ChoiceStyle.DANGER },
    ]
  },
  CATHETER_BLOCK_FAILURE: {
    id: 'CATHETER_BLOCK_FAILURE',
    type: NodeType.DECISION,
    title: 'ポート塞ぎが不可能・不成功',
    actions: [
        { text: 'ナックルワイヤ', color: BulletColor.ORANGE, image: imageKnuckle },
        { text: 'イメージコアのGW交換＋回転', color: BulletColor.ORANGE, image: imageRotation },
    ],
    question: '対応は可能・成功しましたか？',
    choices: [
      { text: '抜去', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '不可能・不成功', nextId: 'LOW_RISK_DEFORMATION', style: ChoiceStyle.DANGER },
    ]
  },
  LOW_RISK_DEFORMATION: {
    id: 'LOW_RISK_DEFORMATION',
    type: NodeType.DECISION,
    title: '対応・処置',
    actions: [
      { text: 'GEC挿入でのステント変形リスクが小さい', isHeader: true },
      { 
        text: 'GEC挿入', 
        color: BulletColor.GREEN,
        image: imageGec
      },
      {
        isHeader: true,
        text: 'ダブルGCシステム構築可能',
        subItems: [
          { text: 'ダブルGCでスタック部のバルーン拡張+必要ならGEC挿入', color: BulletColor.ORANGE, image: imageBalloonDilatationDoubleGc },
        ]
      },
      {
        isHeader: true,
        text: '6Fr GC使用で小径MCがない場合',
        subItems: [
          { text: 'GC抜去しバルーン・MCでエグジットポート塞ぎ（イメージコア内腔で小径バルーン拡張）', color: BulletColor.ORANGE },
          { text: 'ダブルGCでIVUS・ワイヤをバルーントラップ＋GC抜去しバルーン・MCでエグジットポート塞ぎ', color: BulletColor.ORANGE },
        ]
      },
      { text: '上記手段が不成功もしくは適応不可', isHeader: true, subItems: [
          { text: 'IVUSワイヤ抜去', color: BulletColor.ORANGE },
          { text: '力づくカテ抜去', color: BulletColor.RED, image: imageCompleteStuck },
      ] },
    ],
    question: '上記対応後、抜去可能？',
    choices: [
      { text: '抜去', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '抜去不可', nextId: 'SURGERY', style: ChoiceStyle.DANGER },
    ]
  }
};