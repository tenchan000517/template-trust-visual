import { Metadata } from "next";
import { seo, siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: seo.pages.works.title,
  description: seo.pages.works.description,
  openGraph: {
    title: seo.pages.works.title + seo.titleSuffix,
    description: seo.pages.works.description,
    locale: siteInfo.locale,
    type: "website",
  },
  alternates: {
    canonical: `${siteInfo.url}/works`,
  },
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
