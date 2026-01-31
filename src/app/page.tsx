import { company } from "@/lib/site";

/**
 * フルオーダーテンプレート - TOPページ
 *
 * このテンプレートはページ構成が空の状態で提供されます。
 * 構成案に基づいて、Claude Codeがセクションを実装してください。
 *
 * 実装手順:
 * 1. doc/wireframe/01_top.md を確認
 * 2. 各セクションをコンポーネント化して実装
 * 3. site.json からデータを読み込む場合は @/lib/site を使用
 */

export default function Home() {
  return (
    <main>
      {/* ファーストビュー */}
      <section className="relative h-screen flex items-center justify-center bg-navy text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {company.name || "会社名"}
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            {company.catchphrase || "キャッチコピーを入力"}
          </p>
        </div>
      </section>

      {/*
        以下、構成案に基づいてセクションを追加してください。

        例:
        <AboutSection />
        <ServiceSection />
        <NewsSection />
        <CTASection />
      */}
    </main>
  );
}
