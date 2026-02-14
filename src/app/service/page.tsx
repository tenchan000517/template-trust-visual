import { Metadata } from "next";
import Image from "next/image";
import { trustVisual, cta, seo } from "@/lib/site";
import { EvidenceBadge, CTASection } from "@/components/trust-visual";
import { FadeInUp, FadeInImage, StaggerContainer } from "@/components/animations";

// 画像パス（site.jsonから取得される場合もあるが、フォールバック用）
const IMAGES = {
  service: "/images/services/service-01.jpg",
};

export const metadata: Metadata = {
  title: seo.pages.service.title + seo.titleSuffix,
  description: seo.pages.service.description,
};

export default function ServicePage() {
  const services = trustVisual.services;

  return (
    <>
      {/* ============================================
          セクション1: ページヒーロー（Page Hero）
          ============================================ */}
      <section className="relative min-h-[35vh] lg:min-h-[35vh] flex items-center justify-center bg-offwhite">
        <div className="max-w-container mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          {/* ページタイトル */}
          <FadeInUp>
            <h1 className="text-4xl lg:text-[56px] font-bold text-main mb-6">
              {services.heading}
            </h1>
          </FadeInUp>

          {/* サービス概要 */}
          <FadeInUp delay={100}>
            <p className="text-base lg:text-lg text-secondary max-w-[600px] mx-auto leading-relaxed">
              {services.description}
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ============================================
          セクション2: サービス一覧（Services List）
          ============================================ */}
      {services.items.map((service, index) => (
        <section
          key={service.id}
          className={`section-padding ${index % 2 === 0 ? "bg-white" : "bg-offwhite"}`}
        >
          <div className="max-w-container mx-auto px-4 lg:px-8">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-16 items-center`}
            >
              {/* サービス写真 */}
              <div className="w-full lg:w-1/2">
                <FadeInImage
                  src={service.image || IMAGES.service}
                  alt={service.name}
                  width={600}
                  height={450}
                  direction={index % 2 === 0 ? "left" : "right"}
                  containerClassName="relative aspect-[4/3] rounded-lg overflow-hidden"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* コンテンツ */}
              <FadeInUp delay={200} className="w-full lg:w-1/2">
                {/* サービス名 */}
                <h2 className="text-2xl lg:text-[32px] font-bold text-main mb-4 lg:mb-6">
                  {service.name}
                </h2>

                {/* 説明 */}
                <p className="text-base lg:text-lg text-secondary leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* 特徴リスト */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-base text-main"
                    >
                      <span className="text-accent font-bold mr-3 mt-0.5">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* 実績数字 */}
                {service.stats && service.stats.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {service.stats.map((stat, idx) => (
                      <EvidenceBadge
                        key={idx}
                        number={stat.number}
                        unit={stat.unit}
                        label={stat.label}
                      />
                    ))}
                  </div>
                )}
              </FadeInUp>
            </div>
          </div>
        </section>
      ))}

      {/* ============================================
          セクション3: 対応範囲（Coverage）
          ============================================ */}
      <section className="section-padding bg-main">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          {/* 見出し */}
          <FadeInUp>
            <h2 className="text-2xl lg:text-[32px] font-bold text-white text-center mb-8 lg:mb-12">
              {services.coverage.heading}
            </h2>
          </FadeInUp>

          {/* カード */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.coverage.items.map((item, index) => (
              <FadeInUp key={index}>
                <div className="bg-white p-6 lg:p-8 rounded-lg text-center h-full">
                  <h3 className="text-lg lg:text-xl font-bold text-main mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base text-secondary leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================
          セクション4: 料金・納期の目安（Pricing Guide）
          ============================================ */}
      <section className="section-padding bg-offwhite">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          {/* 見出し */}
          <FadeInUp>
            <h2 className="text-2xl lg:text-[32px] font-bold text-main text-center mb-8 lg:mb-12">
              {services.pricing.heading}
            </h2>
          </FadeInUp>

          {/* テーブル */}
          <FadeInUp delay={100}>
            <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-main text-white">
                    <th className="py-4 px-4 lg:px-6 text-left text-sm lg:text-base font-semibold">
                      サービス
                    </th>
                    <th className="py-4 px-4 lg:px-6 text-left text-sm lg:text-base font-semibold">
                      料金目安
                    </th>
                    <th className="py-4 px-4 lg:px-6 text-left text-sm lg:text-base font-semibold">
                      納期目安
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.pricing.items.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-offwhite"}
                    >
                      <td className="py-4 px-4 lg:px-6 text-sm lg:text-base text-main font-medium">
                        {item.service}
                      </td>
                      <td className="py-4 px-4 lg:px-6 text-sm lg:text-base text-main">
                        {item.price}
                      </td>
                      <td className="py-4 px-4 lg:px-6 text-sm lg:text-base text-main">
                        {item.leadTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInUp>

          {/* 注釈 */}
          <FadeInUp delay={200}>
            <p className="text-sm text-muted text-center mt-6 max-w-2xl mx-auto">
              {services.pricing.note}
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ============================================
          セクション5: CTA（Call to Action）
          ============================================ */}
      <CTASection
        heading="サービスについてのご相談はこちら"
        subText="お見積もり無料。まずはお気軽にお問い合わせください。"
        primaryButton={cta.primaryButton}
        variant="dark"
      />
    </>
  );
}
