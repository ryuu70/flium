# Flium - コーポレートサイト

Fliumのコーポレートサイトです。wei.co.jpのような3Dアニメーションを駆使したモダンなWebサイトを実装しています。

## 🚀 技術スタック

- **フロントエンド**: Next.js 14 (React 18) + TypeScript
- **3Dライブラリ**: React Three Fiber (R3F) + Three.js
- **アニメーション**: GSAP + ScrollTrigger
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel

## ✨ 主な機能

- **3Dアニメーション**: React Three Fiberを使用したインタラクティブな3Dシーン
- **スクロールアニメーション**: GSAP ScrollTriggerによる滑らかなスクロールエフェクト
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **モダンUI**: グラスモーフィズムとグラデーションを活用した美しいデザイン
- **パフォーマンス最適化**: 動的インポートとSuspenseによる最適化

## 🛠️ セットアップ

### 前提条件

- Node.js 18.0.0以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd flium-corporate-site

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてサイトを確認できます。

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーを起動
npm start
```

## 📁 プロジェクト構造

```
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── Scene3D.tsx        # 3Dシーンコンポーネント
│   ├── Navigation.tsx     # ナビゲーション
│   ├── HeroSection.tsx    # ヒーローセクション
│   ├── ServicesSection.tsx # サービスセクション
│   ├── AboutSection.tsx   # 会社概要セクション
│   ├── ContactSection.tsx # お問い合わせセクション
│   └── Footer.tsx         # フッター
├── lib/                   # ユーティリティ
│   └── gsap.ts           # GSAP設定
├── public/               # 静的ファイル
├── next.config.js        # Next.js設定
├── tailwind.config.js    # Tailwind CSS設定
└── package.json          # 依存関係
```

## 🎨 デザインシステム

### カラーパレット

- **Primary**: Blue (#3b82f6 - #0ea5e9)
- **Accent**: Purple (#8b5cf6 - #d946ef)
- **Background**: Dark slate (#0f172a - #1e293b)
- **Text**: White/Gray scale

### タイポグラフィ

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 🚀 デプロイ

### Vercel（推奨）

1. Vercelアカウントを作成
2. GitHubリポジトリを接続
3. 自動デプロイが開始されます

### その他のプラットフォーム

- **Netlify**: `npm run build` の後、`.next` フォルダをデプロイ
- **AWS Amplify**: Next.js プロジェクトとして設定
- **自社サーバー**: `npm run build && npm start`

## 📱 レスポンシブ対応

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px以上

## ⚡ パフォーマンス最適化

- 3Dシーンの動的インポート
- 画像の最適化
- コード分割
- バンドルサイズの最適化

## 🔧 カスタマイズ

### 3Dシーンの変更

`components/Scene3D.tsx` を編集して3Dオブジェクトやアニメーションをカスタマイズできます。

### アニメーションの調整

`components/` 内の各セクションコンポーネントでGSAPアニメーションを調整できます。

### スタイルの変更

`tailwind.config.js` でカラーパレットやフォントを変更できます。

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。

## 📞 お問い合わせ

- **Email**: info@flium.co.jp
- **Website**: https://flium.co.jp
