"use client";

import Image from "next/image";
import EvidenceBadge from "./EvidenceBadge";
import FadeInSection from "./FadeInSection";

interface EvidenceItem {
  number: number | string;
  unit: string;
  label: string;
}

interface CertificationItem {
  src: string;
  alt: string;
}

interface ReasonBlockProps {
  number: string;
  title: string;
  image: string;
  description: string;
  evidence: EvidenceItem[];
  certifications?: CertificationItem[];
  direction?: "left" | "right";
}

export default function ReasonBlock({
  number,
  title,
  image,
  description,
  evidence,
  certifications = [],
  direction = "left",
}: ReasonBlockProps) {
  const isLeft = direction === "left";

  return (
    <div
      className={`flex flex-col ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-16 items-center`}
    >
      {/* 画像 */}
      <FadeInSection
        className="w-full lg:w-1/2"
        direction={isLeft ? "left" : "right"}
        distance={40}
      >
        <div className="relative aspect-[4/3] rounded-card overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </FadeInSection>

      {/* コンテンツ */}
      <FadeInSection
        className="w-full lg:w-1/2"
        direction={isLeft ? "right" : "left"}
        delay={150}
        distance={40}
      >
        {/* 番号 */}
        <div className="mb-4">
          <span className="text-6xl lg:text-[96px] font-light text-accent leading-none">
            {number}
          </span>
        </div>

        {/* タイトル */}
        <h3 className="text-2xl lg:text-[32px] font-bold text-main mb-4 lg:mb-6">
          {title}
        </h3>

        {/* 説明文 */}
        <p className="text-base leading-relaxed text-secondary mb-6 lg:mb-8">
          {description}
        </p>

        {/* 根拠数字 */}
        <div className="flex flex-wrap gap-3 mb-6">
          {evidence.map((item, index) => (
            <EvidenceBadge
              key={index}
              number={item.number}
              unit={item.unit}
              label={item.label}
            />
          ))}
        </div>

        {/* 認証バッジ */}
        {certifications.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {certifications.map((cert, index) => (
              <Image
                key={index}
                src={cert.src}
                alt={cert.alt}
                width={80}
                height={80}
                className="h-16 lg:h-20 w-auto object-contain"
              />
            ))}
          </div>
        )}
      </FadeInSection>
    </div>
  );
}
