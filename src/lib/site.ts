import siteData from '@data/site.json';

// 型定義をインポート・再エクスポート
export type {
  NavItem,
  StatItem,
  ClientLogo,
  ClientLogosConfig,
  EvidenceItem,
  CertificationItem,
  ReasonItem,
  WorkItem,
  WorkCategory,
  WorksConfig,
  InterviewContent,
  TestimonialItem,
  SatisfactionItem,
  SatisfactionConfig,
  TestimonialsConfig,
  ServiceStatItem,
  ServiceItem,
  CoverageItem,
  PricingItem,
  ServicesConfig,
  TrustVisualConfig,
  CompanyInfo,
  AccessDirection,
  CeoMessage,
  CompanyConfig,
  CTAConfig,
  AddressConfig,
  ContactConfig,
  SiteConfig,
  BrandingConfig,
  SeoPageConfig,
  SeoConfig,
  SiteData,
} from '@/types/site';

import type { SiteData } from '@/types/site';

// ============================================
// サイトデータをエクスポート
// ============================================

export const site: SiteData = siteData as SiteData;

// よく使うデータへのショートカット
export const siteInfo = site.site;
export const branding = site.branding;
export const colors = site.colors;
export const contact = site.contact;
export const social = site.social;
export const navigation = {
  main: site.navigation.header,
  footer: site.navigation.footer,
  cta: site.navigation.ctaButton
};
export const trustVisual = site.trustVisual;
export const company = site.company;
export const seo = site.seo;
export const cta = site.cta;

// 互換性のためのエイリアス
export const images = {
  logo: site.branding.logo,
  logoSquare: site.branding.logo,
  logoOnly: site.branding.logo
};
