# PCI Complication 対応フローチャート

PCI（経皮的冠動脈インターベンション）の合併症対応を支援する統合医療アプリケーションです。

## 概要

このアプリケーションは、医療現場でのPCI合併症対応を迅速かつ正確に支援するためのインタラクティブなフローチャートツールです。原本の医療フローチャートに完全準拠し、実用性を重視した設計となっています。

## 機能

### 統合されたフローチャート

1. **IVUS-Bailout Flowchart**
   - イメージングカテーテルスタック時の対応フロー
   - IVUS関連の合併症対応手順

2. **Coronary Dissection Flowchart**
   - カテーテルによる冠動脈解離発生時の対応フロー
   - 機械サポート、真腔ワイヤリング、ステント留置の判断支援

### 特徴

- ✅ **原本準拠**: 医療現場で使用される原本フローチャートに完全忠実
- ✅ **カラーコード**: 重要度に応じた色分け表示（緑：推奨、オレンジ：注意、赤：危険）
- ✅ **レスポンシブデザイン**: PC・タブレット・スマートフォン対応
- ✅ **直感的操作**: 医療現場での迅速な判断を支援
- ✅ **統合ダッシュボード**: 複数のフローチャートを一元管理

## 技術仕様

- **フロントエンド**: React 19, TypeScript, Tailwind CSS
- **ビルドツール**: Vite
- **配布形式**: 静的サイト（Static Site）
- **ホスティング**: GitHub Pages, Netlify, Vercel 対応

## フォルダ構造

```
medical-flowchart-dashboard/
├── ivus-bailout-flowchart/          # IVUSベイルアウトアプリのソースコード
├── coronary-dissection-flowchart/   # 冠動脈解離アプリのソースコード
└── static-build/                    # 本番用統合アプリ
    ├── index.html                   # 統合ダッシュボード
    ├── ivus-bailout/               # IVUSアプリの静的ファイル
    └── coronary-dissection/        # 冠動脈解離アプリの静的ファイル
```

## 使用方法

### 本番環境での利用

1. `static-build` フォルダの内容を任意のWebサーバーにアップロード
2. ブラウザで `index.html` にアクセス
3. ダッシュボードから使用したいフローチャートを選択

### 開発環境での利用

各アプリケーションを個別に開発する場合：

```bash
# IVUSベイルアウトアプリの開発
cd ivus-bailout-flowchart
npm install
npm run dev

# 冠動脈解離アプリの開発
cd coronary-dissection-flowchart
npm install
npm run dev
```

### 本番ビルド

```bash
# 各アプリケーションをビルド
cd ivus-bailout-flowchart
npm run build

cd ../coronary-dissection-flowchart
npm run build

# 静的ファイルを static-build にコピー
# （手動またはビルドスクリプトで実行）
```

## 配布方法

このアプリケーションは以下の方法で配布できます：

- **GitHub Pages**: 無料ホスティング
- **Netlify**: 自動デプロイ対応
- **Vercel**: 高速配信
- **任意のWebサーバー**: 静的ファイル配信
- **CDN**: 高速配信とキャッシュ最適化

## 医療現場での利用について

このアプリケーションは医療判断の支援ツールとして設計されていますが、最終的な医療判断は必ず医療従事者の専門知識と臨床経験に基づいて行ってください。

## ライセンス

医療教育・研究目的での利用を想定しています。商用利用については別途ご相談ください。

## 開発者

- 原本フローチャート: 医療専門機関提供
- アプリケーション開発: Windsurf AI Assistant

## 更新履歴

- **v1.0.0**: 初回リリース
  - IVUS-Bailout Flowchartの実装
  - Coronary Dissection Flowchartの実装
  - 統合ダッシュボードの実装
  - 原本フローチャートへの完全準拠
  - 静的サイト統合による本番配布対応
