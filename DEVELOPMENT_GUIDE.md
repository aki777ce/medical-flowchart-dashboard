# 医療フローチャート統合アプリ開発ガイド

## 概要

このドキュメントは、PCI合併症対応フローチャート統合アプリケーションに新しい合併症フローチャートを追加する際の標準手順を定義しています。

## プロジェクト構成

```
medical-flowchart-dashboard/
├── README.md                           # プロジェクト概要
├── DEVELOPMENT_GUIDE.md               # 本開発ガイド（このファイル）
├── netlify.toml                       # Netlify配布設定
├── .gitignore                         # Git除外設定
├── static-build/                      # 本番用統合サイト
│   ├── index.html                     # 統合ダッシュボード
│   ├── [app-name]/                    # 各アプリの静的ファイル
│   │   ├── index.html
│   │   ├── assets/
│   │   └── images/
│   └── ...
├── [existing-app-1]/                  # 既存アプリのソースコード
├── [existing-app-2]/                  # 既存アプリのソースコード
└── [new-app]/                         # 新規追加アプリのソースコード
```

## 新規合併症フローチャート追加手順

### Phase 1: 原本フローチャート分析

1. **原本フローチャートの詳細分析**
   - 医療判断フローの全体構造を把握
   - 分岐条件と選択肢を明確化
   - 実施事項（アクション）と注意事項を分類
   - 色分け・注釈・警告レベルを確認

2. **データ構造設計**
   - ノードタイプ（決定ノード/結果ノード）の分類
   - 選択肢のスタイル（PRIMARY/SECONDARY/DANGER）
   - アクションの色分け（GREEN/ORANGE/RED）
   - 参考画像の配置と表示方法

### Phase 2: アプリケーション作成

#### 2.1 ディレクトリ作成

```bash
# 新規アプリディレクトリを作成
mkdir [new-complication-name]-flowchart
cd [new-complication-name]-flowchart
```

#### 2.2 基本ファイル構成

必須ファイル：
```
[new-app]/
├── package.json                       # 依存関係定義
├── vite.config.ts                     # Vite設定（重要）
├── tsconfig.json                      # TypeScript設定
├── index.html                         # エントリーポイント
├── index.tsx                          # Reactアプリルート
├── index.css                          # スタイル定義
├── App.tsx                            # メインアプリコンポーネント
├── types.ts                           # 型定義
├── constants/
│   └── flowchartData.ts               # フローチャートデータ
├── components/
│   ├── DecisionNode.tsx               # 決定ノードコンポーネント
│   ├── ResultNode.tsx                 # 結果ノードコンポーネント
│   ├── ActionListItem.tsx             # アクション項目コンポーネント
│   └── ImageModal.tsx                 # 画像モーダルコンポーネント
└── public/
    └── images/                        # 参考画像ファイル
```

#### 2.3 重要な設定ファイル

**vite.config.ts（必須設定）**
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
      // 重要: base pathを正しく設定（Netlify配布で必須）
      base: '/[new-app-name]/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
```

**package.json（依存関係）**
```json
{
  "name": "[new-app-name]",
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

### Phase 3: フローチャートデータ実装

#### 3.1 画像パス設定（重要）

```typescript
// ❌ 絶対パス（Netlifyで404エラー）
const imageExample = '/images/example.png';

// ✅ 相対パス（Netlify対応）
const imageExample = './images/example.png';
```

#### 3.2 データ構造例

```typescript
export const flowchartData: Record<string, FlowchartNode> = {
  START: {
    id: 'START',
    type: NodeType.DECISION,
    title: '合併症の種類',
    question: '発生した合併症はどちらですか？',
    choices: [
      { text: 'タイプA', nextId: 'TYPE_A', style: ChoiceStyle.PRIMARY },
      { text: 'タイプB', nextId: 'TYPE_B', style: ChoiceStyle.SECONDARY },
    ],
  },
  TYPE_A: {
    id: 'TYPE_A',
    type: NodeType.DECISION,
    title: 'タイプA対応',
    actions: [
      { text: '推奨処置', color: BulletColor.GREEN },
      { text: '注意事項', color: BulletColor.ORANGE },
      { text: '危険処置', color: BulletColor.RED },
    ],
    question: '処置は成功しましたか？',
    choices: [
      { text: '成功', nextId: 'SUCCESS', style: ChoiceStyle.PRIMARY },
      { text: '失敗', nextId: 'FAILURE', style: ChoiceStyle.DANGER },
    ],
  },
  // ... 他のノード定義
};
```

### Phase 4: 静的ビルドと統合

#### 4.1 アプリケーションビルド

```bash
# 新規アプリディレクトリで実行
npm install
npm run build
```

#### 4.2 静的サイトへの統合

```bash
# ビルド結果を静的サイトにコピー
cp -r dist/* ../static-build/[new-app-name]/
```

#### 4.3 ダッシュボード戻るボタン追加

各アプリの `index.html` に以下を追加：

```html
<!-- Dashboard Return Button -->
<div style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
  <a href="../index.html" style="display: inline-flex; align-items: center; padding: 10px 16px; background-color: rgba(59, 130, 246, 0.9); color: white; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.2s; backdrop-filter: blur(8px);">
    <svg style="width: 16px; height: 16px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
    ダッシュボード
  </a>
</div>
```

#### 4.4 統合ダッシュボード更新

`static-build/index.html` にアプリカードを追加：

```html
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 class="text-xl font-semibold text-gray-800 mb-3">[新規合併症名] Flowchart</h2>
  <p class="text-gray-600 mb-4">[合併症の説明]</p>
  <a href="./[new-app-name]/index.html" class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
    フローチャートを開く
  </a>
</div>
```

### Phase 5: 配布とテスト

#### 5.1 Git管理

```bash
git add .
git commit -m "Add [new-complication-name] flowchart

- Implement [合併症名] decision flow
- Add medical reference images
- Integrate with dashboard navigation
- Follow established coding patterns"

git push
```

#### 5.2 Netlify自動デプロイ

- GitHubプッシュ後、Netlifyが自動的に再デプロイ
- `netlify.toml` の設定により `static-build` フォルダが公開される

#### 5.3 テスト項目

- [ ] ダッシュボードから新規アプリへの遷移
- [ ] 新規アプリからダッシュボードへの戻り
- [ ] フローチャートの全分岐パターン
- [ ] 参考画像の表示（特に重要）
- [ ] レスポンシブデザインの確認
- [ ] 色分け・注釈の正確性

## よくある問題と解決方法

### 画像が表示されない

**原因**: 絶対パス（`/images/`）を使用している

**解決方法**: 
```typescript
// ❌ 絶対パス
const image = '/images/example.png';

// ✅ 相対パス
const image = './images/example.png';
```

### JavaScriptが読み込まれない

**原因**: `vite.config.ts` の `base` 設定が間違っている

**解決方法**:
```typescript
export default defineConfig({
  base: '/[correct-app-name]/', // 正しいアプリ名を設定
});
```

### ダッシュボードに戻れない

**原因**: 戻るボタンのパスが間違っている

**解決方法**:
```html
<!-- ✅ 正しいパス -->
<a href="../index.html">ダッシュボード</a>
```

## 品質確保のチェックリスト

### コード品質
- [ ] TypeScript型定義が適切
- [ ] ESLintエラーなし
- [ ] 既存コンポーネントパターンに準拠
- [ ] 適切なエラーハンドリング

### 医療内容の忠実性
- [ ] 原本フローチャートとの完全一致
- [ ] 医療用語の正確性
- [ ] 分岐ロジックの正確性
- [ ] 色分け・注釈の原本準拠

### ユーザビリティ
- [ ] 直感的な操作性
- [ ] レスポンシブデザイン
- [ ] アクセシビリティ対応
- [ ] 高速な読み込み時間

### 技術的品質
- [ ] Netlify配布での正常動作
- [ ] 画像・アセットの正常表示
- [ ] ナビゲーションの完全性
- [ ] Git履歴の適切性

## 今後の拡張方針

### 短期目標
- 新規合併症フローチャートの段階的追加
- 既存アプリの継続的改善
- ユーザーフィードバックの反映

### 長期目標
- 単一アプリ統合方式への移行検討
- 高度な検索・フィルタ機能
- オフライン対応
- 多言語対応

## 連絡先・サポート

このガイドに関する質問や改善提案は、GitHubのIssueまたはプルリクエストでお知らせください。

---

**最終更新**: 2025年7月19日  
**バージョン**: 1.0.0
