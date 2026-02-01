import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { seo, siteInfo, branding, contact, company } from "@/lib/site";

// next/font で最適化されたフォント読み込み
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: seo.defaultTitle,
    template: `%s${seo.titleSuffix}`,
  },
  description: seo.defaultDescription,
  openGraph: {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    locale: siteInfo.locale,
    type: "website",
    siteName: siteInfo.name,
    images: [
      {
        url: branding.ogImage,
        width: 1200,
        height: 630,
        alt: siteInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    images: [branding.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteInfo.url,
  },
};

// 構造化データ（JSON-LD）
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteInfo.name,
  description: seo.defaultDescription,
  url: siteInfo.url,
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    postalCode: contact.address.postalCode,
    addressRegion: contact.address.prefecture,
    addressLocality: contact.address.city,
    streetAddress: contact.address.street + " " + contact.address.building,
    addressCountry: "JP",
  },
  openingHours: contact.hours,
  image: `${siteInfo.url}${branding.ogImage}`,
  logo: `${siteInfo.url}${branding.logo}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
