import siteData from '@data/site.json';

// ============================================
// 型定義
// ============================================

export interface NavItem {
  label: string;
  href: string;
}

// Trust Visual 固有の型定義
export interface StatItem {
  id: string;
  number: number;
  unit: string;
  label: string;
  decimals?: number;
  displayOrder: number;
}

export interface ClientLogo {
  id: string;
  src: string;
  alt: string;
  displayOrder: number;
}

export interface ClientLogosConfig {
  heading: string;
  note: string;
  logos: ClientLogo[];
  infiniteScroll: boolean;
}

export interface EvidenceItem {
  number: number | string;
  unit: string;
  label: string;
}

export interface CertificationItem {
  id?: string;
  src?: string;
  image?: string;
  alt?: string;
  name?: string;
  note?: string;
  displayOrder?: number;
}

export interface ReasonItem {
  id: string;
  number: string;
  title: string;
  image: string;
  description: string;
  evidence: EvidenceItem[];
  certifications: CertificationItem[];
  displayOrder: number;
}

export interface WorkItem {
  id: string;
  image: string;
  title: string;
  category: string;
  year?: number;
  featured?: boolean;
}

export interface WorkCategory {
  id: string;
  label: string;
}

export interface WorksConfig {
  heading: string;
  subHeading: string;
  stats: EvidenceItem[];
  categories: WorkCategory[];
  items: WorkItem[];
}

export interface InterviewContent {
  challenge: string;
  reason: string;
  effect: string;
  quote: string;
}

export interface TestimonialItem {
  id: string;
  photo: string;
  company: string;
  position: string;
  name: string;
  since?: string;
  interview: InterviewContent;
  featured?: boolean;
  displayOrder: number;
}

export interface SatisfactionItem {
  label: string;
  percentage: number;
}

export interface SatisfactionConfig {
  number: number;
  unit: string;
  label: string;
  source: string;
}

export interface TestimonialsConfig {
  heading: string;
  satisfaction: SatisfactionConfig;
  satisfactionBreakdown: SatisfactionItem[];
  items: TestimonialItem[];
}

export interface ServiceStatItem {
  number: number;
  unit: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  stats: ServiceStatItem[];
  displayOrder: number;
}

export interface CoverageItem {
  title: string;
  content: string;
}

export interface PricingItem {
  service: string;
  price: string;
  leadTime: string;
}

export interface ServicesConfig {
  heading: string;
  description: string;
  items: ServiceItem[];
  coverage: {
    heading: string;
    items: CoverageItem[];
  };
  pricing: {
    heading: string;
    items: PricingItem[];
    note: string;
  };
}

export interface TrustVisualConfig {
  stats: StatItem[];
  clientLogos: ClientLogosConfig;
  reasons: ReasonItem[];
  works: WorksConfig;
  testimonials: TestimonialsConfig;
  certifications: CertificationItem[];
  services: ServicesConfig;
}

export interface CompanyInfo {
  label: string;
  value: string;
}

export interface AccessDirection {
  method: string;
  detail: string;
}

export interface CeoMessage {
  heading: string;
  photo: string;
  message: string;
  title: string;
  name: string;
}

export interface CompanyConfig {
  heroImage: string;
  info: CompanyInfo[];
  ceoMessage: CeoMessage;
  access: {
    heading: string;
    directions: AccessDirection[];
  };
}

export interface CTAConfig {
  heading: string;
  subText: string;
  primaryButton: NavItem;
  secondaryButton?: NavItem;
  phone?: {
    number: string;
    hours: string;
  };
}

export interface AddressConfig {
  postalCode: string;
  prefecture: string;
  city: string;
  street: string;
  building: string;
}

export interface ContactConfig {
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  fax: string;
  email: string;
  hours: string;
  address: AddressConfig;
  googleMapsEmbedUrl: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  locale: string;
  template: string;
}

export interface BrandingConfig {
  logo: string;
  logoAlt: string;
  favicon: string;
  ogImage: string;
}

export interface SeoPageConfig {
  title: string;
  description: string;
}

export interface SeoConfig {
  titleSuffix: string;
  defaultTitle: string;
  defaultDescription: string;
  pages: {
    top: SeoPageConfig;
    why: SeoPageConfig;
    works: SeoPageConfig;
    voice: SeoPageConfig;
    service: SeoPageConfig;
    about: SeoPageConfig;
    contact: SeoPageConfig;
  };
}

export interface SiteData {
  site: SiteConfig;
  branding: BrandingConfig;
  colors: {
    main: string;
    accent: string;
    background: string;
    backgroundAlt: string;
    text: string;
    textSub: string;
  };
  contact: ContactConfig;
  social: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  navigation: {
    header: NavItem[];
    footer: NavItem[];
    ctaButton: NavItem;
  };
  trustVisual: TrustVisualConfig;
  company: CompanyConfig;
  seo: SeoConfig;
  cta: CTAConfig;
}

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
