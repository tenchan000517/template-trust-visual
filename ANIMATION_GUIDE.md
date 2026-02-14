# アニメーション実装ガイド

## 概要

このテンプレートには、Motion（Framer Motion後継）を使用したスクロールアニメーションコンポーネントが含まれています。

## 使用可能なコンポーネント

| コンポーネント | 用途 |
|--------------|------|
| `FadeInUp` | スクロール連動フェードイン + スライドアップ |
| `FadeInImage` | 方向別スライドイン画像（left/right/up） |
| `StaggerContainer` + `StaggerItem` | 子要素の順次アニメーション |
| `AnimatedLink` | アンダーラインアニメーション付きリンク |
| `HeroBackground` | ヒーロー背景フェードイン |

## 重要: ページ構造の変更が必要

アニメーションコンポーネントを使用する場合、ページ構造を以下のように変更する必要があります。

### 変更前（通常のServer Component）

```tsx
// src/app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: '会社紹介',
};

export default function AboutPage() {
  return <div>...</div>;
}
```

### 変更後（アニメーション対応）

```tsx
// src/app/about/layout.tsx（新規作成）
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: '会社紹介',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

```tsx
// src/app/about/page.tsx
'use client';

import { FadeInUp, FadeInImage } from '@/components/animations';

export default function AboutPage() {
  return (
    <div>
      <FadeInUp>
        <h1>About Us</h1>
      </FadeInUp>
    </div>
  );
}
```

## なぜこの構造が必要か

1. **アニメーションコンポーネントはClient Component**
   - `useInView`等のReactフックを使用するため

2. **metadataはServer Componentでのみ使用可能**
   - `"use client"` を付けたページでは `export const metadata` が使えない
   - そのため、metadataを`layout.tsx`に分離する必要がある

3. **ページ遷移時のスクロール位置問題**
   - Next.js App Routerでページ遷移すると、前のページのスクロール位置が一瞬維持される
   - この間にIntersectionObserverが発火してしまう問題がある
   - `waitForScrollTop()`関数で、スクロール位置が0になるまで待機することで解決

## 使用例

### FadeInUp

```tsx
import { FadeInUp } from '@/components/animations';

// 基本
<FadeInUp>
  <h2>タイトル</h2>
</FadeInUp>

// オプション付き
<FadeInUp delay={0.2} duration={0.8} distance={50}>
  <p>遅延付きコンテンツ</p>
</FadeInUp>

// カスタム要素として
<FadeInUp as="section" className="py-20">
  <div>セクションコンテンツ</div>
</FadeInUp>
```

### FadeInImage

```tsx
import { FadeInImage } from '@/components/animations';

// 上からスライドイン（デフォルト）
<FadeInImage
  src="/images/photo.jpg"
  alt="写真"
  width={800}
  height={600}
/>

// 左からスライドイン
<FadeInImage
  src="/images/photo.jpg"
  alt="写真"
  width={800}
  height={600}
  direction="left"
/>

// 右からスライドイン
<FadeInImage
  src="/images/photo.jpg"
  alt="写真"
  width={800}
  height={600}
  direction="right"
/>
```

### StaggerContainer + StaggerItem

```tsx
import { StaggerContainer, StaggerItem } from '@/components/animations';

<StaggerContainer staggerDelay={0.1} className="grid grid-cols-3 gap-4">
  <StaggerItem>
    <Card>1</Card>
  </StaggerItem>
  <StaggerItem>
    <Card>2</Card>
  </StaggerItem>
  <StaggerItem>
    <Card>3</Card>
  </StaggerItem>
</StaggerContainer>
```

### AnimatedLink

```tsx
import { AnimatedLink } from '@/components/animations';

<AnimatedLink href="/about" className="text-2xl font-bold text-primary">
  Learn More
</AnimatedLink>

// 外部リンク
<AnimatedLink href="https://example.com" external>
  External Link
</AnimatedLink>
```

### HeroBackground

```tsx
import { HeroBackground } from '@/components/animations';

<HeroBackground className="relative h-screen">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10">
    <h1>ヒーローテキスト</h1>
  </div>
</HeroBackground>
```

## アクセシビリティ

すべてのアニメーションコンポーネントは `prefers-reduced-motion` メディアクエリに対応しています。
ユーザーがOSの設定で「視差効果を減らす」を有効にしている場合、アニメーションはスキップされます。

## 依存パッケージ

```json
{
  "dependencies": {
    "motion": "^12"
  }
}
```

インストール:
```bash
npm install motion
```
