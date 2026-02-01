import { Metadata } from "next";
import { seo, siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: seo.pages.about.title,
  description: seo.pages.about.description,
  openGraph: {
    title: seo.pages.about.title + seo.titleSuffix,
    description: seo.pages.about.description,
    locale: siteInfo.locale,
    type: "website",
  },
  alternates: {
    canonical: `${siteInfo.url}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
