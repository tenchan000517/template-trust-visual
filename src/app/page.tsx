"use client";

import Image from "next/image";
import Link from "next/link";
import { trustVisual, cta } from "@/lib/site";
import {
  StatCounter,
  ClientLogos,
  TestimonialCard,
  WorksGrid,
  CTASection,
} from "@/components/trust-visual";
// 新しいスクロールアニメーションコンポーネント（waitForScrollTop対応）
import { FadeInUp, StaggerContainer, HeroBackground, AnimatedLink } from "@/components/animations";

// 画像パス
const IMAGES = {
  hero: "/images/hero.jpg",
  work: "/images/works/work-01.jpg",
  person: "/images/customers/customer-01.jpg",
};

export default function Home() {
  const stats = trustVisual.stats;
  const clientLogos = trustVisual.clientLogos;
  const reasons = trustVisual.reasons;
  const works = trustVisual.works;
  const testimonials = trustVisual.testimonials;

  return (
    <>
      {/* ============================================
          セクション1: ヒーロー（Hero）
          ============================================ */}
      <section className="relative min-h-screen">
        {/* PC: 左右分割 */}
        <div className="hidden lg:flex min-h-screen">
          {/* 左側: メインビジュアル */}
          <HeroBackground className="relative w-[55%]">
            <Image
              src={IMAGES.hero}
              alt="メインビジュアル"
              fill
              className="object-cover"
              priority
            />
            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
          </HeroBackground>

          {/* 右側: テキストエリア */}
          <div className="w-[45%] bg-offwhite flex flex-col justify-center px-10 xl:px-16 py-20">
            {/* キャッチコピー */}
            <div className="mb-12">
              <h1 className="text-4xl xl:text-5xl font-bold text-main leading-tight mb-6">
                確かな技術と実績で、
                <br />
                お客様の期待に応える。
              </h1>
              <p className="text-base xl:text-lg text-secondary">
                創業35年。お客様満足度98%の品質をお届けします。
              </p>
            </div>

            {/* 実績数字グリッド */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              {stats.map((stat) => (
                <StatCounter
                  key={stat.id}
                  value={stat.number}
                  unit={stat.unit}
                  label={stat.label}
                  decimals={stat.decimals}
                  size="large"
                />
              ))}
            </div>
          </div>
        </div>

        {/* SP: 縦積み */}
        <div className="lg:hidden">
          {/* 上部: メインビジュアル */}
          <HeroBackground className="relative h-[40vh]">
            <Image
              src={IMAGES.hero}
              alt="メインビジュアル"
              fill
              className="object-cover"
              priority
            />
          </HeroBackground>

          {/* 下部: テキストエリア */}
          <div className="bg-offwhite px-5 py-10">
            {/* キャッチコピー */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-main leading-tight mb-4">
                確かな技術と実績で、
                <br />
                お客様の期待に応える。
              </h1>
              <p className="text-sm text-secondary">
                創業35年。お客様満足度98%の品質をお届けします。
              </p>
            </div>

            {/* 実績数字グリッド */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((stat) => (
                <StatCounter
                  key={stat.id}
                  value={stat.number}
                  unit={stat.unit}
                  label={stat.label}
                  decimals={stat.decimals}
                  size="medium"
                />
              ))}
            </div>

            {/* スクロール誘導 */}
            <div className="mt-10 text-center">
              <span className="text-xs text-muted">Scroll</span>
              <div className="mt-2 animate-bounce">
                <svg
                  className="w-5 h-5 mx-auto text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          セクション2: 取引先ロゴ（Client Logos）
          ============================================ */}
      <section className="bg-offwhite py-12 lg:py-16">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          {/* 見出し */}
          <h2 className="text-xl lg:text-2xl text-muted text-center mb-8 lg:mb-10">
            {clientLogos.heading}
          </h2>

          {/* ロゴ一覧 */}
          <ClientLogos
            logos={clientLogos.logos}
            infiniteScroll={clientLogos.infiniteScroll}
          />

          {/* 補足テキスト */}
          {clientLogos.note && (
            <p className="text-xs lg:text-sm text-muted text-center mt-8">
              {clientLogos.note}
            </p>
          )}
        </div>
      </section>

      {/* ============================================
          セクション3: 選ばれる理由サマリー（Why Us Summary）
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          {/* 見出し */}
          <FadeInUp>
            <h2 className="text-2xl lg:text-4xl font-bold text-main text-center mb-12 lg:mb-16">
              選ばれる3つの理由
            </h2>
          </FadeInUp>

          {/* 理由カード */}
          <StaggerContainer
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10"
            staggerDelay={0.15}
          >
            {reasons.slice(0, 3).map((reason) => (
              <div key={reason.id} className="text-center lg:text-left">
                {/* 番号 */}
                <span className="text-5xl lg:text-6xl font-light text-accent leading-none">
                  {reason.number}
                </span>

                {/* タイトル */}
                <h3 className="text-xl lg:text-2xl font-bold text-main mt-4 mb-3">
                  {reason.title}
                </h3>

                {/* 説明 */}
                <p className="text-sm lg:text-base text-secondary leading-relaxed mb-4">
                  {reason.description}
                </p>

                {/* 根拠数字 */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {reason.evidence.slice(0, 1).map((ev, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1.5 text-sm font-medium text-accent bg-[var(--evidence-badge-bg)] rounded"
                    >
                      {ev.label}: {ev.number}
                      {ev.unit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </StaggerContainer>

          {/* 詳しく見るリンク */}
          <FadeInUp delay={0.4}>
            <div className="text-center mt-12 lg:mt-16">
              <AnimatedLink href="/why">
                選ばれる理由を詳しく見る
              </AnimatedLink>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ============================================
          セクション4: 実績ギャラリー（Works Gallery）
          ============================================ */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-[90%] mx-auto">
          {/* 見出し */}
          <FadeInUp className="mb-8 lg:mb-12 px-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-main mb-4">
              {works.heading}
            </h2>
            <p className="text-sm lg:text-base text-secondary">
              {works.subHeading}
            </p>
          </FadeInUp>

          {/* 実績グリッド */}
          <FadeInUp delay={0.2}>
            <WorksGrid
              works={works.items.filter((w) => w.featured).slice(0, 6)}
              columns={3}
              showOverlay={true}
            />
          </FadeInUp>

          {/* もっと見るリンク */}
          <FadeInUp delay={0.4}>
            <div className="text-right mt-8 lg:mt-10 px-4">
              <AnimatedLink href="/works">
                実績をもっと見る
              </AnimatedLink>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ============================================
          セクション5: お客様の声サマリー（Testimonials Summary）
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          {/* 見出し */}
          <FadeInUp>
            <h2 className="text-2xl lg:text-4xl font-bold text-main text-center mb-12 lg:mb-16">
              {testimonials.heading}
            </h2>
          </FadeInUp>

          {/* お客様の声カード */}
          <StaggerContainer
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            staggerDelay={0.15}
          >
            {testimonials.items
              .filter((t) => t.featured)
              .slice(0, 3)
              .map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  photo={testimonial.photo || IMAGES.person}
                  company={testimonial.company}
                  position={testimonial.position}
                  name={testimonial.name}
                  quote={testimonial.interview.quote}
                  variant="summary"
                />
              ))}
          </StaggerContainer>

          {/* もっと見るリンク */}
          <FadeInUp delay={0.4}>
            <div className="text-center mt-12 lg:mt-16">
              <AnimatedLink href="/voice">
                お客様の声をもっと見る
              </AnimatedLink>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ============================================
          セクション6: CTA（Call to Action）
          ============================================ */}
      <CTASection
        heading={cta.heading}
        subText={cta.subText}
        primaryButton={cta.primaryButton}
        secondaryButton={cta.secondaryButton}
        phone={cta.phone}
        variant="dark"
      />
    </>
  );
}
