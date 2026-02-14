"use client";

import { trustVisual, cta } from "@/lib/site";
import { WorksGrid, CTASection, StatCounter } from "@/components/trust-visual";
import { FadeInUp, HeroBackground, StaggerContainer } from "@/components/animations";

// 画像パス（site.jsonから取得される場合もあるが、フォールバック用）
const IMAGES = {
  work: "/images/works/work-01.jpg",
};

export default function WorksPage() {
  const works = trustVisual.works;

  return (
    <>
      {/* ============================================
          セクション1: ページヒーロー（Page Hero）
          ============================================ */}
      <section className="relative min-h-[50vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* 背景画像コラージュ */}
        <HeroBackground className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4">
          {works.items.slice(0, 4).map((work) => (
            <div key={work.id} className="relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${work.image || IMAGES.work})`,
                }}
              />
            </div>
          ))}
        </HeroBackground>

        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/60" />

        {/* コンテンツ */}
        <div className="relative z-10 max-w-container mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          {/* ページタイトル */}
          <FadeInUp delay={200}>
            <h1 className="text-4xl lg:text-[56px] font-bold text-white mb-8 lg:mb-12">
              実績紹介
            </h1>
          </FadeInUp>

          {/* 実績サマリー数字 */}
          <StaggerContainer className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {works.stats.map((stat, index) => (
              <FadeInUp key={index}>
                <div className="text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl lg:text-5xl font-bold text-white">
                      {stat.number.toLocaleString()}
                    </span>
                    <span className="text-lg lg:text-xl font-semibold text-white ml-1">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 mt-2">{stat.label}</p>
                </div>
              </FadeInUp>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================
          セクション2-3: カテゴリフィルター + 実績ギャラリー
          ============================================ */}
      <section className="py-10 lg:py-16 bg-offwhite">
        <div className="max-w-[90%] mx-auto">
          <FadeInUp>
            <WorksGrid
              works={works.items}
              categories={works.categories}
              columns={3}
              showOverlay={true}
              showFilter={true}
            />
          </FadeInUp>
        </div>
      </section>

      {/* ============================================
          セクション4: CTA（Call to Action）
          ============================================ */}
      <CTASection
        heading="お見積もり・ご相談はお気軽に"
        subText="ご紹介した実績はほんの一部です。お客様のご要望に合わせた最適なご提案をいたします。"
        primaryButton={cta.primaryButton}
        variant="dark"
      />
    </>
  );
}
