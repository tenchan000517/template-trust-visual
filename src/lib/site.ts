import siteData from '@data/site.json';

// 型定義
export interface NavItem {
  label: string;
  href: string;
}

export interface SiteData {
  navigation: {
    main: NavItem[];
    footer: NavItem[];
    cta: NavItem;
  };
  company: {
    name: string;
    nameShort: string;
    nameEn: string;
    id: string;
    ceo: string;
    established: string;
    capital: string;
    revenue: string;
    employees: string;
    business: string;
    license: string;
    catchphrase: string;
    mission: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    phoneTel: string;
    fax: string;
    email: string;
    hours: string;
    recruitContact: string;
  };
  locations: {
    headquarters: {
      name: string;
      zipCode: string;
      address: string;
      access: string;
      mapUrl: string;
    };
    branches: Array<{
      name: string;
      zipCode: string;
      address: string;
      access: string;
    }>;
  };
  social: {
    instagram: string;
  };
  images: {
    logo: string;
    logoSquare: string;
    logoOnly: string;
  };
  seo: {
    titleSuffix: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  stats: {
    yearsInBusiness: string;
    projectsCompleted: string;
    employees: string;
    retentionRate: string;
  };
  history: Array<{
    year: string;
    event: string;
  }>;
  services: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
  works: Array<{
    category: string;
    name: string;
    location: string;
    year: string;
    image: string;
  }>;
  news: Array<{
    date: string;
    category: string;
    title: string;
    slug: string;
  }>;
  recruit: {
    catchphrase: string;
    subCatchphrase: string;
    data: Array<{
      number: string;
      unit: string;
      label: string;
      sub: string;
    }>;
    benefits: {
      vacation: string[];
      allowances: string[];
      facilities: string[];
    };
    positions: {
      highSchool: {
        title: string;
        items: Array<{ label: string; value: string }>;
      };
      midCareer: {
        title: string;
        items: Array<{ label: string; value: string }>;
      };
    };
    faq: Array<{ q: string; a: string }>;
    interviews: Array<{
      label: string;
      name: string;
      role: string;
      entry: string;
      image: string;
      qa: Array<{ q: string; a: string }>;
    }>;
  };
  ceo: {
    name: string;
    title: string;
    image: string;
    message: string[];
  };
}

// サイトデータをエクスポート
export const site: SiteData = siteData as SiteData;

// よく使うデータへのショートカット
export const navigation = site.navigation;
export const company = site.company;
export const contact = site.contact;
export const locations = site.locations;
export const seo = site.seo;
export const images = site.images;
