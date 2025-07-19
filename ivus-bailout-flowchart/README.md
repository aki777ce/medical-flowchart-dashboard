# IVUSカテーテルスタック ベイルアウト・フロー

これは、心血管インターベンション中に発生するIVUSカテーテルのスタック（固着）問題に対応するための、インタラクティブなフローチャート形式のWebアプリケーションです。実際の臨床現場で使用される判断アルゴリズムに基づき、医療従事者が複雑な状況下で最適な手技を選択できるよう支援することを目的としています。

## ✨ 主な機能

- **インタラクティブなフローチャート**: 状況に応じて表示される選択肢をクリックすることで、次のステップに進むことができます。
- **視覚的な処置ガイド**: 特定の処置項目では、「表示」ボタンをクリックすると手技のイラストがモーダルウィンドウで表示され、理解を助けます。
- **レスポンシブデザイン**: デスクトップPCからタブレット、スマートフォンまで、様々なデバイスで快適に利用できます。
- **明確な結果表示**: フローの最後には、「抜去成功」または「外科処置」といった最終的な結果が分かりやすく表示されます。

## 🚀 デプロイ

このアプリケーションはNetlifyにデプロイされており、以下のURLからアクセスできます。

[https://ivus-bailout-flowchart.windsurf.build](https://ivus-bailout-flowchart.windsurf.build)

## 🛠️ 使用技術

- **フロントエンド**: [React](https://react.dev/) with TypeScript
- **ビルドツール**: [Vite](https://vitejs.dev/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **デプロイ**: [Netlify](https://www.netlify.com/)

## 💻 ローカルでの実行方法

1.  **リポジトリをクローンし、ディレクトリに移動します。**
    ```bash
    git clone https://github.com/your-username/ivus-bailout-flowchart.git
    cd ivus-bailout-flowchart
    ```

2.  **必要なパッケージをインストールします。**
    ```bash
    npm install
    ```

3.  **開発サーバーを起動します。**
    ```bash
    npm run dev
    ```

4.  **ブラウザで `http://localhost:5173` にアクセスします。**

## 📂 プロジェクト構造

```
.
├── public/
│   └── images/              # 画像などの静的ファイル
├── src/
│   ├── components/          # Reactコンポーネント
│   ├── constants/           # フローチャートのデータ
│   ├── App.tsx              # アプリケーションのメインコンポーネント
│   └── index.tsx            # Reactのルートをマウントするスクリプト
├── .gitignore
├── index.html                 # エントリーポイントのHTML
├── netlify.toml               # Netlifyデプロイ設定
├── package.json               # プロジェクト設定と依存関係
├── README.md                  # このファイル
├── tsconfig.json              # TypeScript設定
├── types.ts                   # 型定義
└── vite.config.ts             # Vite設定
```
