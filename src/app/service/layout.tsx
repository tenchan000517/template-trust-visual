import { Metadata } from "next";
import { seo, siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: seo.pages.service.title,
  description: seo.pages.service.description,
  openGraph: {
    title: seo.pages.service.title + seo.titleSuffix,
    description: seo.pages.service.description,
    locale: siteInfo.locale,
    type: "website",
  },
  alternates: {
    canonical: `${siteInfo.url}/service`,
  },
};

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
