"use client";

import Image from "next/image";
import Link from "next/link";
import { trustVisual, cta } from "@/lib/site";
import { SatisfactionBar, CTASection } from "@/components/trust-visual";

// 画像パス（site.jsonから取得される場合もあるが、フォールバック用）
const IMAGES = {
  person: "/images/customers/customer-01.jpg",
};

export default function VoicePage() {
  const testimonials = trustVisual.testimonials;

  return (
    <>
      {/* ============================================
          セクション1: ページヒーロー（Page Hero）
          ============================================ */}
      <section className="relative min-h-[40vh] lg:min-h-[40vh] flex items-center justify-center bg-offwhite">
        <div className="max-w-container mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          {/* ページタイトル */}
          <h1 className="text-4xl lg:text-[56px] font-bold text-main mb-8">
            お客様の声
          </h1>

          {/* 満足度数字 */}
          <div className="flex flex-col items-center">
            <div className="flex items-baseline justify-center">
              <span className="text-6xl lg:text-[96px] font-black text-accent leading-none">
                {testimonials.satisfaction.number}
              </span>
              <span className="text-3xl lg:text-5xl font-bold text-accent ml-1">
                {testimonials.satisfaction.unit}
              </span>
            </div>
            <p className="text-lg lg:text-xl text-secondary mt-4">
              {testimonials.satisfaction.label}
            </p>
            <p className="text-sm text-muted mt-2">
              {testimonials.satisfaction.source}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          セクション2: お客様の声一覧（Testimonials List）
          ============================================ */}
      {testimonials.items.map((testimonial, index) => (
        <section
          key={testimonial.id}
          className={`section-padding ${index % 2 === 0 ? "bg-white" : "bg-offwhite"}`}
        >
          <div className="max-w-container mx-auto px-4 lg:px-8">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-16`}
            >
              {/* 顔写真エリア */}
              <div className="w-full lg:w-[35%] flex flex-col items-center lg:items-start">
                <div className="relative w-[80%] max-w-[300px] aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={testimonial.photo || IMAGES.person}
                    alt={`${testimonial.name}様`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-muted">{testimonial.company}</p>
                <p className="text-xl lg:text-2xl font-bold text-main mt-1">
                  {testimonial.position} {testimonial.name}
                  <span className="text-base font-normal ml-1">様</span>
                </p>
                {testimonial.since && (
                  <p className="text-xs text-muted mt-2">{testimonial.since}</p>
                )}
              </div>

              {/* インタビューエリア */}
              <div className="w-full lg:w-[65%]">
                {/* 導入前の課題 */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    導入前の課題
                  </h4>
                  <p className="text-base lg:text-lg text-primary leading-relaxed">
                    {testimonial.interview.challenge}
                  </p>
                </div>

                {/* 選んだ理由 */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    選んだ理由
                  </h4>
                  <p className="text-base lg:text-lg text-primary leading-relaxed">
                    {testimonial.interview.reason}
                  </p>
                </div>

                {/* 導入後の変化 */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    導入後の変化
                  </h4>
                  <p className="text-base lg:text-lg text-primary leading-relaxed">
                    {testimonial.interview.effect}
                  </p>
                </div>

                {/* 一言コメント */}
                <div className="relative p-6 lg:p-8 bg-warm rounded-lg">
                  <span className="absolute -top-2 left-4 text-6xl text-accent/30 font-serif leading-none">
                    "
                  </span>
                  <p className="text-lg lg:text-xl font-medium italic text-main leading-relaxed pl-4">
                    {testimonial.interview.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ============================================
          セクション3: 満足度まとめ（Satisfaction Summary）
          ============================================ */}
      <section className="section-padding bg-main">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          {/* 見出し */}
          <h2 className="text-2xl lg:text-4xl font-bold text-white text-center mb-12">
            お客様満足度
          </h2>

          {/* 満足度バー */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto">
            {testimonials.satisfactionBreakdown.map((item, index) => (
              <SatisfactionBar
                key={index}
                label={item.label}
                percentage={item.percentage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          セクション4: CTA（Call to Action）
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="max-w-container mx-auto px-4 lg:px-8 text-center">
          {/* 見出し */}
          <h2 className="text-2xl lg:text-4xl font-bold text-main mb-4">
            次は、あなたの番です。
          </h2>

          {/* サブテキスト */}
          <p className="text-base lg:text-lg text-secondary mb-8 max-w-2xl mx-auto">
            お客様の期待に応えること。それが私たちの使命です。
            <br className="hidden lg:block" />
            まずはお気軽にご相談ください。
          </p>

          {/* CTAボタン */}
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-btn font-semibold text-lg bg-accent text-white hover:bg-accent-dark transition-all"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </>
  );
}
