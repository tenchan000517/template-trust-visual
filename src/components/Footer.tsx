import Image from "next/image";
import Link from "next/link";
import { company, contact, locations, images, site, navigation } from "@/lib/site";

// ナビゲーションはsite.jsonから読み込み（構成案に基づいてClaude Codeが設定）
const navLinks = navigation.footer;

export default function Footer() {
  const hq = locations.headquarters;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-container mx-auto px-6 lg:px-12 pt-12 lg:pt-20 pb-6 lg:pb-10">
        {/* PC: 4 columns */}
        <div className="hidden lg:flex lg:justify-between lg:items-start mb-16">
          {/* 1. Logo */}
          <div>
            <Link href="/">
              <Image
                src={images.logoSquare || "/images/logo-square.png"}
                alt={company.name || "会社ロゴ"}
                width={100}
                height={100}
                className="brightness-0 invert"
              />
            </Link>
          </div>

          {/* 2. Company Info */}
          <div className="text-sm text-white/80 leading-relaxed pt-4">
            {hq.zipCode && hq.address && (
              <p>〒{hq.zipCode} {hq.address}</p>
            )}
            {contact.phone && <p>TEL: {contact.phoneFormatted || contact.phone}</p>}
            {contact.hours && <p>営業時間: {contact.hours}</p>}
          </div>

{/* 3. Navigation */}
          {navLinks.length > 0 && (
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* 4. SNS */}
          {site.social.instagram && (
            <div>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* SP: Stacked layout */}
        <div className="lg:hidden text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image
              src={images.logoSquare || "/images/logo-square.png"}
              alt={company.name || "会社ロゴ"}
              width={120}
              height={120}
              className="brightness-0 invert"
            />
          </Link>
          <div className="text-sm text-white/80 leading-relaxed mb-6">
            {hq.zipCode && hq.address && (
              <p>〒{hq.zipCode} {hq.address}</p>
            )}
            {contact.phone && <p>TEL: {contact.phoneFormatted || contact.phone}</p>}
            {contact.hours && <p>営業時間: {contact.hours}</p>}
          </div>
{navLinks.length > 0 && (
            <ul className="space-y-2 mb-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {site.social.instagram && (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white/80 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          )}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/50">
            © {currentYear} {company.nameEn || company.name || "Company Name"}. All Rights Reserved.
          </p>
          {company.license && (
            <p className="text-[11px] text-white/40 mt-2">
              {company.license}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
