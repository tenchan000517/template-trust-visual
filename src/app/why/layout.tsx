import { Metadata } from "next";
import { seo, siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: seo.pages.why.title,
  description: seo.pages.why.description,
  openGraph: {
    title: seo.pages.why.title + seo.titleSuffix,
    description: seo.pages.why.description,
    locale: siteInfo.locale,
    type: "website",
  },
  alternates: {
    canonical: `${siteInfo.url}/why`,
  },
};

export default function WhyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
