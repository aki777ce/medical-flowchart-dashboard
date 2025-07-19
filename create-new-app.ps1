# 新規合併症フローチャートアプリ作成スクリプト
# 使用方法: .\create-new-app.ps1 -AppName "perforation" -DisplayName "冠動脈穿孔" -Description "冠動脈穿孔時の対応フロー"

param(
    [Parameter(Mandatory=$true)]
    [string]$AppName,
    
    [Parameter(Mandatory=$true)]
    [string]$DisplayName,
    
    [Parameter(Mandatory=$true)]
    [string]$Description
)

$AppDirName = "$AppName-flowchart"
$BasePath = "/$(AppName)/"

Write-Host "新規合併症フローチャートアプリを作成中..." -ForegroundColor Green
Write-Host "アプリ名: $AppDirName" -ForegroundColor Yellow
Write-Host "表示名: $DisplayName" -ForegroundColor Yellow
Write-Host "説明: $Description" -ForegroundColor Yellow

# 1. ディレクトリ作成
if (Test-Path $AppDirName) {
    Write-Host "エラー: ディレクトリ '$AppDirName' は既に存在します。" -ForegroundColor Red
    exit 1
}

New-Item -ItemType Directory -Path $AppDirName
New-Item -ItemType Directory -Path "$AppDirName\components"
New-Item -ItemType Directory -Path "$AppDirName\constants"
New-Item -ItemType Directory -Path "$AppDirName\public"
New-Item -ItemType Directory -Path "$AppDirName\public\images"

Write-Host "✓ ディレクトリ構造を作成しました" -ForegroundColor Green

# 2. package.json作成
$packageJson = @"
{
  "name": "$AppDirName",
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
"@

$packageJson | Out-File -FilePath "$AppDirName\package.json" -Encoding UTF8

# 3. vite.config.ts作成
$viteConfig = @"
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      base: '$BasePath',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
"@

$viteConfig | Out-File -FilePath "$AppDirName\vite.config.ts" -Encoding UTF8

# 4. tsconfig.json作成
$tsConfig = @"
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
  "include": ["*.ts", "*.tsx", "components/**/*", "constants/**/*"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
"@

$tsConfig | Out-File -FilePath "$AppDirName\tsconfig.json" -Encoding UTF8

Write-Host "✓ 設定ファイルを作成しました" -ForegroundColor Green

# 5. 基本ファイルをコピー（既存アプリから）
$sourceApp = "coronary-dissection-flowchart"

if (Test-Path $sourceApp) {
    Copy-Item "$sourceApp\types.ts" "$AppDirName\types.ts"
    Copy-Item "$sourceApp\index.css" "$AppDirName\index.css"
    Copy-Item "$sourceApp\index.tsx" "$AppDirName\index.tsx"
    Copy-Item "$sourceApp\components\*.tsx" "$AppDirName\components\"
    
    Write-Host "✓ 基本ファイルをコピーしました" -ForegroundColor Green
} else {
    Write-Host "警告: ソースアプリ '$sourceApp' が見つかりません。手動でファイルを作成してください。" -ForegroundColor Yellow
}

# 6. index.html作成
$indexHtml = @"
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="$Description - PCI合併症対応フローチャート" />
    <title>$DisplayName - PCI合併症対応フロー</title>
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
"@

$indexHtml | Out-File -FilePath "$AppDirName\index.html" -Encoding UTF8

# 7. App.tsx作成（カスタマイズ版）
$appTsx = @"
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
              $DisplayName 対応フロー
            </h1>
            <p className="text-gray-600">
              $Description
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
"@

$appTsx | Out-File -FilePath "$AppDirName\App.tsx" -Encoding UTF8

# 8. flowchartData.tsテンプレート作成
$flowchartData = @"
import { FlowchartNode, NodeType, BulletColor, ChoiceStyle } from '../types';

// 画像パスは必ず相対パス（./images/）を使用
// const exampleImage = './images/example.png';

export const flowchartData: Record<string, FlowchartNode> = {
  START: {
    id: 'START',
    type: NodeType.DECISION,
    title: '初期判断',
    question: '[$DisplayName の初期判断質問を記入してください]',
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
"@

$flowchartData | Out-File -FilePath "$AppDirName\constants\flowchartData.ts" -Encoding UTF8

Write-Host "✓ アプリケーションファイルを作成しました" -ForegroundColor Green

# 9. README作成
$readme = @"
# $DisplayName Flowchart

## 概要

$Description

## 開発手順

1. **依存関係インストール**
   ```bash
   npm install
   ```

2. **フローチャートデータの実装**
   - \`constants/flowchartData.ts\` を編集
   - 原本フローチャートに基づいてノードを定義
   - 画像パスは相対パス（\`./images/\`）を使用

3. **参考画像の配置**
   - \`public/images/\` フォルダに画像ファイルを配置
   - PNG、JPG形式を推奨

4. **開発サーバー起動**
   ```bash
   npm run dev
   ```

5. **本番ビルド**
   ```bash
   npm run build
   ```

6. **静的サイトへの統合**
   ```bash
   # ビルド結果を静的サイトにコピー
   Copy-Item -Path "dist\*" -Destination "..\static-build\$AppName\" -Recurse -Force
   ```

## 注意事項

- 画像パスは必ず相対パス（\`./images/\`）を使用
- \`vite.config.ts\` の \`base\` パスは \`/$AppName/\` に設定済み
- 原本フローチャートとの忠実性を最優先に実装
- 色分け・注釈・分岐ロジックを正確に再現

## チェックリスト

### 実装段階
- [ ] \`flowchartData.ts\` の実装完了
- [ ] 参考画像の配置完了
- [ ] ローカルでの動作確認完了
- [ ] 全分岐パターンのテスト完了

### 統合段階
- [ ] 本番ビルド成功
- [ ] 静的サイトへのコピー完了
- [ ] ダッシュボード戻るボタン追加
- [ ] 統合ダッシュボードにアプリカード追加

### 配布段階
- [ ] Git commit/push完了
- [ ] Netlify配布確認完了
- [ ] 本番環境での動作確認完了
"@

$readme | Out-File -FilePath "$AppDirName\README.md" -Encoding UTF8

Write-Host "✓ READMEを作成しました" -ForegroundColor Green

# 10. 完了メッセージ
Write-Host ""
Write-Host "🎉 新規アプリ '$AppDirName' の作成が完了しました！" -ForegroundColor Green
Write-Host ""
Write-Host "次のステップ:" -ForegroundColor Yellow
Write-Host "1. cd $AppDirName" -ForegroundColor White
Write-Host "2. npm install" -ForegroundColor White
Write-Host "3. constants/flowchartData.ts を編集" -ForegroundColor White
Write-Host "4. public/images/ に参考画像を配置" -ForegroundColor White
Write-Host "5. npm run dev でテスト" -ForegroundColor White
Write-Host "6. npm run build でビルド" -ForegroundColor White
Write-Host ""
Write-Host "詳細は $AppDirName\README.md を参照してください。" -ForegroundColor Cyan
