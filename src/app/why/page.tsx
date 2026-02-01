import { trustVisual, cta } from "@/lib/site";
import { ReasonBlock, CTASection } from "@/components/trust-visual";

export default function WhyPage() {
  const reasons = trustVisual.reasons;

  return (
    <>
      {/* ============================================
          セクション1: ページヒーロー（Page Hero）
          ============================================ */}
      <section className="relative min-h-[40vh] lg:min-h-[40vh] flex items-center justify-center bg-offwhite">
        <div className="max-w-container mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          {/* ページタイトル */}
          <h1 className="text-4xl lg:text-[56px] font-bold text-main mb-6">
            選ばれる理由
          </h1>

          {/* リード文 */}
          <p className="text-base lg:text-lg text-secondary max-w-[600px] mx-auto leading-relaxed">
            500社以上の企業様に選ばれ続ける理由。
            <br className="hidden lg:block" />
            それは、35年かけて積み上げてきた「信頼」の証です。
          </p>
        </div>
      </section>

      {/* ============================================
          セクション2: 理由①「35年の経験と実績」
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          <ReasonBlock
            number={reasons[0].number}
            title={reasons[0].title}
            image={reasons[0].image}
            description={reasons[0].description}
            evidence={reasons[0].evidence}
            certifications={reasons[0].certifications.map((c) => ({
              src: c.src || c.image || "",
              alt: c.alt || c.name || "",
            }))}
            direction="left"
          />
        </div>
      </section>

      {/* ============================================
          セクション3: 理由②「徹底した品質管理」
          ============================================ */}
      <section className="section-padding bg-offwhite">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          <ReasonBlock
            number={reasons[1].number}
            title={reasons[1].title}
            image={reasons[1].image}
            description={reasons[1].description}
            evidence={reasons[1].evidence}
            certifications={reasons[1].certifications.map((c) => ({
              src: c.src || c.image || "",
              alt: c.alt || c.name || "",
            }))}
            direction="right"
          />
        </div>
      </section>

      {/* ============================================
          セクション4: 理由③「迅速・柔軟な対応」
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          <ReasonBlock
            number={reasons[2].number}
            title={reasons[2].title}
            image={reasons[2].image}
            description={reasons[2].description}
            evidence={reasons[2].evidence}
            certifications={reasons[2].certifications.map((c) => ({
              src: c.src || c.image || "",
              alt: c.alt || c.name || "",
            }))}
            direction="left"
          />
        </div>
      </section>

      {/* ============================================
          セクション5: CTA（Call to Action）
          ============================================ */}
      <CTASection
        heading="お気軽にご相談ください"
        subText="ご質問・お見積もりは無料です。まずはお話をお聞かせください。"
        primaryButton={cta.primaryButton}
        secondaryButton={{ label: "実績を見る", href: "/works" }}
        variant="dark"
      />
    </>
  );
}
