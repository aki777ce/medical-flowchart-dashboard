# 新規合併症フローチャートアプリ テンプレート

## 1. 基本情報

**アプリ名**: `[new-complication-name]-flowchart`  
**表示名**: `[日本語合併症名] Flowchart`  
**説明**: `[合併症の簡潔な説明]`

## 2. 必要ファイル一覧

### 2.1 設定ファイル

#### package.json
```json
{
  "name": "[new-complication-name]-flowchart",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.6.2",
    "vite": "^6.3.5"
  }
}
```

#### vite.config.ts
```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      // 重要: アプリ名に合わせてbase pathを変更
      base: '/[new-complication-name]/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "*.ts", "*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2.2 エントリーポイント

#### index.html
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="[合併症の説明] - PCI合併症対応フローチャート" />
    <title>[日本語合併症名] - PCI合併症対応フロー</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    </style>
  </head>
  <body class="bg-slate-100">
    <div id="root"></div>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
```

#### index.tsx
```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(<App />);
```

#### index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

### 2.3 型定義

#### types.ts
```typescript
export enum NodeType {
  DECISION = 'decision',
  OUTCOME = 'outcome',
}

export enum BulletColor {
  GREEN = 'green',
  ORANGE = 'orange', 
  RED = 'red',
}

export enum ChoiceStyle {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

export interface ActionItem {
  text: string;
  color?: BulletColor;
  image?: string;
  isHeader?: boolean;
  subItems?: ActionItem[];
  cautionText?: string;
  actionText?: string;
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
  question?: string;
  questionImage?: string;
  actions?: ActionItem[];
  choices?: Choice[];
}
```

### 2.4 メインアプリケーション

#### App.tsx
```typescript
import React, { useState } from 'react';
import { flowchartData } from './constants/flowchartData';
import { FlowchartNode, NodeType } from './types';
import DecisionNode from './components/DecisionNode';
import ResultNode from './components/ResultNode';

const App: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('START');

  const currentNode: FlowchartNode = flowchartData[currentNodeId];

  const handleChoice = (nextId: string) => {
    setCurrentNodeId(nextId);
  };

  const handleRestart = () => {
    setCurrentNodeId('START');
  };

  if (!currentNode) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">エラー</h1>
          <p className="text-gray-600 mb-4">ノードが見つかりません: {currentNodeId}</p>
          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            最初から開始
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              [日本語合併症名]対応フロー
            </h1>
            <p className="text-gray-600">
              [合併症の説明文]
            </p>
          </div>

          {currentNode.type === NodeType.DECISION ? (
            <DecisionNode node={currentNode} onChoice={handleChoice} />
          ) : (
            <ResultNode node={currentNode} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
```

### 2.5 フローチャートデータテンプレート

#### constants/flowchartData.ts
```typescript
import { FlowchartNode, NodeType, BulletColor, ChoiceStyle } from '../types';

// 画像パスは必ず相対パス（./images/）を使用
const exampleImage = './images/example.png';

export const flowchartData: Record<string, FlowchartNode> = {
  START: {
    id: 'START',
    type: NodeType.DECISION,
    title: '初期判断',
    question: '[初期判断の質問]',
    choices: [
      { text: '選択肢A', nextId: 'OPTION_A', style: ChoiceStyle.PRIMARY },
      { text: '選択肢B', nextId: 'OPTION_B', style: ChoiceStyle.SECONDARY },
    ],
  },
  
  OPTION_A: {
    id: 'OPTION_A',
    type: NodeType.DECISION,
    title: '選択肢A対応',
    actions: [
      { text: '推奨処置', color: BulletColor.GREEN },
      { text: '注意事項', color: BulletColor.ORANGE },
      { text: '危険処置', color: BulletColor.RED },
    ],
    question: '処置は成功しましたか？',
    choices: [
      { text: '成功', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '失敗', nextId: 'OPTION_B', style: ChoiceStyle.DANGER },
    ],
  },

  OPTION_B: {
    id: 'OPTION_B',
    type: NodeType.DECISION,
    title: '選択肢B対応',
    actions: [
      { text: '代替処置', color: BulletColor.ORANGE },
      { text: '最終手段', color: BulletColor.RED },
    ],
    question: '代替処置は成功しましたか？',
    choices: [
      { text: '成功', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '失敗', nextId: 'SURGERY', style: ChoiceStyle.DANGER },
    ],
  },

  SUCCESS: {
    id: 'SUCCESS',
    type: NodeType.OUTCOME,
    title: '処置成功',
    description: '手技は正常に完了しました。',
  },

  SURGERY: {
    id: 'SURGERY',
    type: NodeType.OUTCOME,
    title: '外科処置',
    description: '外科的な介入が必要です。',
  },
};
```

## 3. 作成手順チェックリスト

### 準備段階
- [ ] 原本フローチャートの詳細分析完了
- [ ] 合併症名・アプリ名決定
- [ ] 必要な参考画像の準備完了

### 開発段階
- [ ] ディレクトリ作成: `[name]-flowchart`
- [ ] 基本ファイル作成（上記テンプレート使用）
- [ ] `vite.config.ts` のbase path設定
- [ ] `flowchartData.ts` の実装
- [ ] 画像パスを相対パス（`./images/`）で設定
- [ ] コンポーネントの動作確認

### ビルド・統合段階
- [ ] `npm install` 実行
- [ ] `npm run build` でビルド成功
- [ ] `static-build/[app-name]/` にファイルコピー
- [ ] ダッシュボード戻るボタン追加
- [ ] 統合ダッシュボードにアプリカード追加

### テスト段階
- [ ] ローカルでの動作確認
- [ ] 画像表示の確認
- [ ] 全分岐パターンのテスト
- [ ] レスポンシブデザイン確認

### 配布段階
- [ ] Git add/commit/push
- [ ] Netlify自動デプロイ確認
- [ ] 本番環境での動作確認
- [ ] ドキュメント更新

## 4. よく使う色分けパターン

```typescript
// 推奨処置（安全）
{ text: '標準的な処置', color: BulletColor.GREEN }

// 注意が必要な処置
{ text: '慎重に実施', color: BulletColor.ORANGE }

// 危険な処置（最終手段）
{ text: '外科的介入', color: BulletColor.RED }

// ヘッダー付きグループ
{
  isHeader: true,
  text: '7Fr以上のGC使用',
  subItems: [
    { text: 'スタック部拡張', color: BulletColor.GREEN },
  ]
}
```

## 5. 参考画像の扱い

```typescript
// 画像定数定義（相対パス必須）
const procedureImage = './images/procedure-example.png';

// アクション項目での使用
{ 
  text: '手技の詳細', 
  color: BulletColor.ORANGE, 
  image: procedureImage 
}

// 質問画像での使用
{
  question: '現在の状況は？',
  questionImage: procedureImage,
}
```

---

このテンプレートを使用することで、新規合併症フローチャートの追加が標準化され、品質の一貫性が保たれます。
