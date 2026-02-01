import { Metadata } from "next";
import Image from "next/image";
import { company, trustVisual, contact, seo } from "@/lib/site";
import { CertificationBadge } from "@/components/trust-visual";

// 画像パス（site.jsonから取得される場合もあるが、フォールバック用）
const IMAGES = {
  exterior: "/images/exterior.jpg",
  ceo: "/images/ceo.jpg",
};

export const metadata: Metadata = {
  title: seo.pages.about.title + seo.titleSuffix,
  description: seo.pages.about.description,
};

export default function AboutPage() {
  const certifications = trustVisual.certifications;

  return (
    <>
      {/* ============================================
          セクション1: ページヒーロー（Page Hero）
          ============================================ */}
      <section className="relative min-h-[50vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0">
          <Image
            src={company.heroImage || IMAGES.exterior}
            alt="会社外観"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* コンテンツ */}
        <div className="relative z-10 text-center px-4">
          {/* サブタイトル */}
          <p className="text-sm lg:text-base text-white/80 tracking-widest mb-4">
            COMPANY
          </p>

          {/* ページタイトル */}
          <h1 className="text-4xl lg:text-[56px] font-bold text-white">
            会社概要
          </h1>
        </div>
      </section>

      {/* ============================================
          セクション2: 会社情報テーブル（Company Info）
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          {/* 見出し */}
          <h2 className="text-2xl lg:text-[32px] font-bold text-main mb-8 lg:mb-12">
            基本情報
          </h2>

          {/* テーブル */}
          <div className="max-w-3xl">
            <table className="w-full">
              <tbody>
                {company.info.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <th className="py-4 lg:py-5 pr-4 text-left text-sm font-semibold text-muted w-1/4 lg:w-1/5 align-top">
                      {item.label}
                    </th>
                    <td className="py-4 lg:py-5 text-base text-main leading-relaxed">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================
          セクション3: 資格・認証（Certifications）
          ============================================ */}
      {certifications.length > 0 && (
        <section className="section-padding bg-offwhite">
          <div className="max-w-container mx-auto px-4 lg:px-8">
            {/* 見出し */}
            <h2 className="text-2xl lg:text-[32px] font-bold text-main text-center mb-8 lg:mb-12">
              資格・認証
            </h2>

            {/* バッジグリッド */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
              {certifications.map((cert) => (
                <CertificationBadge
                  key={cert.id}
                  image={cert.image || ""}
                  name={cert.name || ""}
                  note={cert.note}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          セクション4: 代表メッセージ（CEO Message）
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* 代表者写真 */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-start">
              <div className="relative w-[80%] max-w-[400px] aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src={company.ceoMessage.photo || IMAGES.ceo}
                  alt={`${company.ceoMessage.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* メッセージ */}
            <div className="w-full lg:w-[60%]">
              {/* 見出し */}
              <h2 className="text-xl lg:text-[28px] font-bold text-main mb-6 lg:mb-8">
                {company.ceoMessage.heading}
              </h2>

              {/* メッセージ本文 */}
              <div className="space-y-6">
                {company.ceoMessage.message.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-base lg:text-lg text-main leading-loose">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* 署名 */}
              <div className="text-right mt-10">
                <p className="text-sm text-muted">{company.ceoMessage.title}</p>
                <p className="text-xl lg:text-2xl font-medium text-main mt-1">
                  {company.ceoMessage.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          セクション5: アクセス（Access）
          ============================================ */}
      <section className="section-padding bg-offwhite">
        <div className="max-w-container mx-auto px-4 lg:px-8">
          {/* 見出し */}
          <h2 className="text-2xl lg:text-[32px] font-bold text-main mb-8 lg:mb-12">
            {company.access.heading}
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Google Maps */}
            <div className="w-full lg:w-[60%]">
              <div className="relative w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src={contact.googleMapsEmbedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="会社所在地"
                />
              </div>
            </div>

            {/* アクセス情報 */}
            <div className="w-full lg:w-[40%]">
              {/* 住所 */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted mb-2">住所</h3>
                <p className="text-base text-main">
                  〒{contact.address.postalCode}
                  <br />
                  {contact.address.prefecture}
                  {contact.address.city}
                  {contact.address.street}
                  <br />
                  {contact.address.building}
                </p>
              </div>

              {/* 交通案内 */}
              <div className="space-y-4">
                {company.access.directions.map((direction, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-muted mb-1">
                      {direction.method}
                    </h3>
                    <p className="text-base text-main">{direction.detail}</p>
                  </div>
                ))}
              </div>

              {/* 電話番号 */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-muted mb-2">お電話でのお問い合わせ</h3>
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="text-2xl font-bold text-main hover:text-accent transition-colors"
                >
                  {contact.phoneFormatted}
                </a>
                <p className="text-sm text-muted mt-1">{contact.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
