# SEO・LLMO 実装ガイド

> **本書はテンプレートに同梱するSEO・LLMO対策の実装指示書です。**
> **次世代セッションはこのドキュメントに従って実装を行ってください。**

---

## 概要

このガイドは、コーポレートサイトに必要なSEO（検索エンジン最適化）およびLLMO（大規模言語モデル最適化）を実装するための手順書です。

---

## 1. 必須ファイルの作成

### 1-1. robots.txt

`public/robots.txt` を作成する。

```txt
User-agent: *
Allow: /

Sitemap: https://[本番ドメイン]/sitemap.xml
```

**注意:** 本番ドメインはデプロイ時に確定次第、置換すること。

### 1-2. sitemap.ts

`src/app/sitemap.ts` を作成する。Next.js App Router の機能で `/sitemap.xml` が自動生成される。

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://[本番ドメイン]";

  // 全ページを列挙
  // priority: トップ=1, 主要ページ=0.8-0.9, 補助ページ=0.7以下
  // changeFrequency: 更新頻度に応じて weekly / monthly / yearly
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // 以下、サイト構成に応じて追加
  ];
}
```

---

## 2. 各ページの Metadata 設定

### 2-1. 基本ルール

| ページ種別 | title | description |
|-----------|-------|-------------|
| トップ | 企業名 + キャッチコピー | 企業概要を100〜120文字で |
| 下層ページ | ページ名（英語） | そのページの内容を80〜120文字で |

### 2-2. Server Component の場合

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAGE_NAME",
  description: "ページの説明文をここに記載",
};
```

### 2-3. Client Component の場合

`"use client"` を使用するページでは `export const metadata` が使えない。
その場合は `layout.tsx` を同階層に作成して metadata を設定する。

```typescript
// src/app/[page]/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAGE_NAME",
  description: "ページの説明文をここに記載",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### 2-4. 全ページ標準 layout.tsx テンプレート（静的ページ）

各ページの `layout.tsx` には以下の項目を必ず設定する。

```typescript
import type { Metadata } from "next";
import { seo, company } from "@/lib/site";

export const metadata: Metadata = {
  // === 基本SEO ===
  title: "ページタイトル | Page Title",
  description: "ページの説明文。検索結果に表示される重要なテキスト。120-160文字推奨。",

  // === OpenGraph (SNS共有時) ===
  openGraph: {
    title: `ページタイトル${seo.titleSuffix}`,
    description: "ページの説明文",
    url: `${seo.siteUrl}/page-path`,
    siteName: company.name,
    locale: "ja_JP",
    type: "website", // article, product等も可
  },

  // === Twitter Card ===
  twitter: {
    card: "summary_large_image",
    title: `ページタイトル${seo.titleSuffix}`,
    description: "ページの説明文",
  },

  // === Canonical URL (重複コンテンツ対策) ===
  alternates: {
    canonical: "/page-path",
  },

  // === LLMO対応 (AI検索エンジン最適化) ===
  other: {
    "ai:summary": "このページの内容を1-2文で要約。AIが参照する簡潔な説明。",
    "ai:topics": "トピック1, トピック2, トピック3",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

**各項目の説明:**

| 項目 | 必須 | 説明 |
|------|------|------|
| title | ◎ | ページタイトル（30-60文字推奨） |
| description | ◎ | ページ説明文（120-160文字推奨） |
| openGraph | ◎ | SNS共有時の表示設定 |
| twitter | ○ | Twitter Card設定 |
| alternates.canonical | ◎ | 正規URL（重複コンテンツ対策） |
| other["ai:summary"] | ○ | LLMO用：AI要約テキスト |
| other["ai:topics"] | ○ | LLMO用：関連トピック |

### 2-5. 動的ページ用 layout.tsx（generateMetadata）

`[slug]` などの動的ルートでは `generateMetadata` を使用する。

```typescript
import type { Metadata } from "next";
import { seo, company } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // データ取得ロジック
  const item = getItemBySlug(slug);

  if (!item) {
    return {
      title: "ページが見つかりません",
      robots: { index: false },
    };
  }

  const title = `${item.title} | カテゴリ名`;
  const description = item.description || `${item.title}の詳細ページ`;

  return {
    // === 基本SEO ===
    title: title,
    description: description,

    // === OpenGraph ===
    openGraph: {
      title: `${title}${seo.titleSuffix}`,
      description: description,
      url: `${seo.siteUrl}/items/${slug}`,
      siteName: company.name,
      locale: "ja_JP",
      type: "article",
      images: item.image ? [{ url: item.image, alt: item.title }] : undefined,
    },

    // === Twitter Card ===
    twitter: {
      card: "summary_large_image",
      title: `${title}${seo.titleSuffix}`,
      description: description,
    },

    // === Canonical URL ===
    alternates: {
      canonical: `/items/${slug}`,
    },

    // === LLMO対応 ===
    other: {
      "ai:summary": description,
      "ai:topics": `${item.category}, 詳細, 関連キーワード`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

---

## 3. JSON-LD 構造化データ

### 3-1. 設置場所

`src/app/layout.tsx` に設置する。

### 3-2. 業種別スキーマタイプ

| 業種 | @type |
|------|-------|
| 製造業 | ManufacturingBusiness |
| 飲食店 | Restaurant |
| 小売業 | Store |
| 不動産 | RealEstateAgent |
| 医療 | MedicalBusiness |
| 士業 | ProfessionalService |
| その他 | LocalBusiness |

### 3-3. 必須プロパティ

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "[業種に応じたタイプ]",
  "@id": "[本番URL]/#organization",
  name: "[企業名]",
  alternateName: "[英語名]",
  description: "[企業説明]",
  url: "[本番URL]",
  telephone: "[電話番号]",
  email: "[メールアドレス]",
  foundingDate: "[創業年月 YYYY-MM形式]",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: [従業員数],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "[住所]",
    postalCode: "[郵便番号]",
    addressLocality: "[市区町村]",
    addressRegion: "[都道府県]",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: [緯度],
    longitude: [経度],
  },
  image: "[ロゴ画像パス]",
  logo: "[ロゴ画像パス]",
  sameAs: [
    // SNSアカウントがあれば配列で列挙
  ],
  areaServed: "JP",
  knowsAbout: [
    // 専門分野・得意分野を配列で列挙
    // 例: "金型設計", "精密加工", "品質管理"
  ],
};
```

### 3-4. HTMLへの埋め込み

```tsx
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
</head>
```

---

## 4. 見出し構造の最適化

### 4-1. 基本ルール

- 各ページに `h1` は1つだけ
- 見出しは順序を守る（h1 → h2 → h3、h2 → h4 のようなスキップ禁止）
- 見出しには意味のあるテキストを含める

### 4-2. 推奨構造

```
h1: ページタイトル
├── h2: セクション1
│   ├── h3: サブセクション1-1
│   └── h3: サブセクション1-2
├── h2: セクション2
│   └── h3: サブセクション2-1
└── h2: セクション3
```

---

## 5. 画像の alt 属性

### 5-1. 基本ルール

- すべての `<Image>` / `<img>` に alt 属性を設定
- 装飾目的の画像は `alt=""` （空文字）
- 情報を持つ画像は具体的な説明を記載

### 5-2. 良い例・悪い例

| 悪い例 | 良い例 |
|--------|--------|
| `alt="画像1"` | `alt="高速マシニングセンタによる精密加工"` |
| `alt="photo"` | `alt="代表取締役社長 山田太郎"` |
| `alt="img"` | `alt="本社ビル外観"` |
| alt属性なし | `alt=""` （装飾画像の場合） |

### 5-3. 連番画像の対応

```typescript
// 悪い例
{[1, 2, 3].map((n) => (
  <Image alt={`画像${n}`} />
))}

// 良い例
{[
  { n: 1, alt: "具体的な説明1" },
  { n: 2, alt: "具体的な説明2" },
  { n: 3, alt: "具体的な説明3" },
].map(({ n, alt }) => (
  <Image alt={alt} />
))}
```

---

## 6. OGP・SNS対応

### 6-1. layout.tsx の metadata

```typescript
export const metadata: Metadata = {
  openGraph: {
    title: "[サイトタイトル]",
    description: "[説明文]",
    locale: "ja_JP",
    type: "website",
    url: "[本番URL]",
    siteName: "[企業名]",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[サイトタイトル]",
    description: "[説明文]",
    images: ["/opengraph-image"],
  },
};
```

### 6-2. OGP画像の動的生成

`src/app/opengraph-image.tsx` で動的生成する場合：

```typescript
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "[企業名]";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ /* スタイル */ }}>
        {/* ロゴ・企業名・キャッチコピー等 */}
      </div>
    ),
    { ...size }
  );
}
```

---

## 7. LLMO（LLM最適化）のポイント

### 7-1. 情報の構造化

AIが情報を正確に読み取れるよう、以下を心がける：

- 箇条書き・表を積極的に使用
- 定義リスト形式での情報整理
- 一文一意（長文を避ける）

### 7-2. 専門分野の明記

JSON-LD の `knowsAbout` に加え、本文中にも専門分野を明記する。

```
当社は〇〇の専門企業です。
主な取扱製品：△△、□□、◇◇
```

### 7-3. 基本情報の網羅

以下の情報をサイト内で明確に記載する：

- 企業名（正式名称・英語名）
- 所在地（都道府県から番地まで）
- 連絡先（電話・メール）
- 事業内容
- 創業年・設立年
- 従業員数
- 代表者名

### 7-4. LLMO用メタデータ（ai:summary, ai:topics）

各ページの `layout.tsx` に LLMO 用メタデータを設定する。

```typescript
export const metadata: Metadata = {
  // ... 他のメタデータ ...

  // === LLMO対応 (AI検索エンジン最適化) ===
  other: {
    // AI要約用の簡潔な説明（1-2文、50-100文字程度）
    "ai:summary": "このページの内容を簡潔に要約したテキスト。",

    // ページの主要トピック（カンマ区切り、3-5個程度）
    "ai:topics": "トピック1, トピック2, トピック3",
  },
};
```

**設定のポイント:**

| フィールド | 目的 | 例 |
|-----------|------|-----|
| ai:summary | AIがページ内容を理解するための要約 | "○○株式会社の採用情報ページ。募集職種、待遇、選考フローを掲載。" |
| ai:topics | ページの主要キーワード・トピック | "採用情報, 求人, 募集職種, 福利厚生" |

**各ページタイプ別の例:**

| ページ | ai:summary例 | ai:topics例 |
|--------|-------------|-------------|
| 会社概要 | "○○株式会社の企業情報。沿革、理念、代表メッセージを掲載。" | "会社概要, 企業理念, 沿革, 代表挨拶" |
| サービス | "○○株式会社の事業内容。主要サービスと特長を紹介。" | "事業内容, サービス, ソリューション" |
| お問い合わせ | "○○株式会社へのお問い合わせページ。" | "お問い合わせ, 相談, 見積り" |
| 採用情報 | "○○株式会社の採用情報。募集職種と応募方法。" | "採用情報, 求人, 募集, 応募" |

---

## 8. チェックリスト

### 8-1. 実装前チェック

- [ ] site.json に企業情報が投入されているか
- [ ] 本番ドメインが確定しているか（未定の場合はプレースホルダー）

### 8-2. 実装チェック

- [ ] `public/robots.txt` が存在するか
- [ ] `src/app/sitemap.ts` が存在するか
- [ ] 全ページに `layout.tsx` が存在するか
- [ ] 全ページに metadata（title, description）が設定されているか
- [ ] 全ページに `alternates.canonical` が設定されているか
- [ ] 全ページに OpenGraph メタデータが設定されているか
- [ ] 全ページに Twitter Card メタデータが設定されているか
- [ ] 全ページに LLMO用メタデータ（ai:summary, ai:topics）が設定されているか
- [ ] JSON-LD が layout.tsx に設置されているか
- [ ] JSON-LD の @type が業種に適しているか
- [ ] 見出し構造が h1 → h2 → h3 の順序を守っているか
- [ ] 全画像に適切な alt 属性があるか

### 8-3. 検証

```bash
# TypeScript 型チェック
npx tsc --noEmit

# ビルド検証（Windows環境以外）
npm run build
```

---

## 9. 本番公開後の確認

### 9-1. Google Search Console

1. サイトを登録
2. sitemap.xml を送信
3. インデックス状況を確認

### 9-2. 構造化データテスト

Google の Rich Results Test で JSON-LD を検証：
https://search.google.com/test/rich-results

### 9-3. OGP 確認

- Facebook シェアデバッガー
- Twitter Card Validator
- LINE URL Inspector

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 初版 | 本ガイド作成 |
| 2025-02 | canonical URL、LLMO用メタデータ（ai:summary, ai:topics）、generateMetadataパターン追加 |
