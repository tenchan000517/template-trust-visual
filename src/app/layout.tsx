import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { seo, company } from "@/lib/site";

export const metadata: Metadata = {
  title: seo.defaultTitle || company.name,
  description: seo.defaultDescription,
  openGraph: {
    title: seo.defaultTitle || company.name,
    description: seo.defaultDescription,
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
