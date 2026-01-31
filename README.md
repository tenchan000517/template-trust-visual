# template-fullorder

フルオーダーHP制作用テンプレート。ページ構成がない状態で提供され、構成案に基づいてClaude Codeが完全にカスタム実装します。

## 特徴

- **ページなし**: TOPページのプレースホルダーのみ
- **ナビゲーション動的**: `site.json` の `navigation` から読み込み
- **Header/Footer**: 基本構造のみ（ナビゲーションは空）
- **完全カスタム**: 構成案に基づいて自由に実装

## 技術スタック

- Next.js 16.x (App Router)
- React 19.x
- TypeScript 5.x
- Tailwind CSS 4.x

## ファイル構成

```
template-fullorder/
├── data/
│   └── site.json          # 企業情報 + ナビゲーション
├── src/
│   ├── app/
│   │   ├── layout.tsx     # 共通レイアウト
│   │   ├── page.tsx       # TOPページ（プレースホルダー）
│   │   └── globals.css    # グローバルスタイル
│   ├── components/
│   │   ├── Header.tsx     # ヘッダー（navigation.main から読み込み）
│   │   └── Footer.tsx     # フッター（navigation.footer から読み込み）
│   └── lib/
│       └── site.ts        # site.json 読み込みユーティリティ
└── public/images/         # 画像素材
```

## セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

## 使い方

### 1. site.json を設定

```json
{
  "navigation": {
    "main": [
      { "label": "会社概要", "href": "/about" },
      { "label": "サービス", "href": "/service" }
    ],
    "footer": [
      { "label": "会社概要", "href": "/about" },
      { "label": "プライバシーポリシー", "href": "/privacy" }
    ],
    "cta": {
      "label": "お問い合わせ",
      "href": "/contact"
    }
  },
  "company": {
    "name": "株式会社サンプル",
    "catchphrase": "キャッチコピー"
  }
}
```

### 2. ページを作成

構成案に基づいて、必要なページを `src/app/` 以下に作成してください。

```
src/app/
├── about/page.tsx      # 会社概要
├── service/page.tsx    # サービス
├── contact/page.tsx    # お問い合わせ
└── privacy/page.tsx    # プライバシーポリシー
```

### 3. コンポーネントを実装

各ページのセクションを `src/components/` にコンポーネント化して実装します。

## コーディングルール

### ブランドカラーの変更

`globals.css` の `@theme` ブロック内のみ変更してください：

```css
@theme {
  --color-navy: #1a365d;        /* メインカラー */
  --color-navy-dark: #0d1b2a;   /* メインカラー（濃） */
  --color-accent: #f97316;      /* アクセントカラー */
  --color-accent-dark: #ea580c; /* アクセントカラー（濃） */
}
```

**注意**: 変数名は変更しないでください（ユーティリティクラスが参照しています）。

### スタイリング

- Tailwind CSS のユーティリティクラスを使用
- カスタムCSSは最小限に
- レスポンシブ対応は `md:` `lg:` プレフィックスを使用

## template-standard との違い

| 項目 | template-standard | template-fullorder |
|------|-------------------|-------------------|
| ページ構成 | 7ページ固定 | なし（自由に作成） |
| ナビゲーション | ハードコード | site.json から動的読み込み |
| 用途 | 標準的な企業HP | 完全カスタムHP |

## ライセンス

Private - Sing, Inc.
