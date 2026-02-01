"use client";

import Link from "next/link";
import FadeInSection from "./FadeInSection";

interface CTAButtonConfig {
  label: string;
  href: string;
}

interface CTASectionProps {
  heading: string;
  subText?: string;
  primaryButton: CTAButtonConfig;
  secondaryButton?: CTAButtonConfig;
  phone?: {
    number: string;
    hours: string;
  };
  variant?: "dark" | "light";
}

export default function CTASection({
  heading,
  subText,
  primaryButton,
  secondaryButton,
  phone,
  variant = "dark",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`section-padding ${isDark ? "bg-main" : "bg-offwhite"}`}
    >
      <div className="max-w-container mx-auto px-4 lg:px-8 text-center">
        {/* 見出し */}
        <FadeInSection>
          <h2
            className={`text-2xl lg:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-main"
            }`}
          >
            {heading}
          </h2>
        </FadeInSection>

        {/* サブテキスト */}
        {subText && (
          <FadeInSection delay={100}>
            <p
              className={`text-base lg:text-lg mb-8 ${
                isDark ? "text-white/80" : "text-secondary"
              }`}
            >
              {subText}
            </p>
          </FadeInSection>
        )}

        {/* ボタン */}
        <FadeInSection delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href={primaryButton.href}
              className={`w-full sm:w-auto px-8 py-4 rounded-btn font-semibold text-lg transition-all ${
                isDark
                  ? "bg-accent text-white hover:bg-accent-dark"
                  : "bg-accent text-white hover:bg-accent-dark"
              }`}
            >
              {primaryButton.label}
            </Link>

            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className={`w-full sm:w-auto px-8 py-4 rounded-btn font-semibold text-lg transition-all border ${
                  isDark
                    ? "border-white text-white hover:bg-white/10"
                    : "border-main text-main hover:bg-main hover:text-white"
                }`}
              >
                {secondaryButton.label}
              </Link>
            )}
          </div>
        </FadeInSection>

        {/* 電話番号 */}
        {phone && (
          <FadeInSection delay={300}>
            <div
              className={`pt-6 border-t ${
                isDark ? "border-white/20" : "border-gray-200"
              }`}
            >
              <p
                className={`text-sm mb-2 ${
                  isDark ? "text-white/60" : "text-muted"
                }`}
              >
                お電話でのお問い合わせ
              </p>
              <a
                href={`tel:${phone.number.replace(/-/g, "")}`}
                className={`text-2xl lg:text-3xl font-bold ${
                  isDark ? "text-white" : "text-main"
                }`}
              >
                {phone.number}
              </a>
              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-white/60" : "text-muted"
                }`}
              >
                {phone.hours}
              </p>
            </div>
          </FadeInSection>
        )}
      </div>
    </section>
  );
}
