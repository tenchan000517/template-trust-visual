import { Metadata } from "next";
import { seo, siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: seo.pages.voice.title,
  description: seo.pages.voice.description,
  openGraph: {
    title: seo.pages.voice.title + seo.titleSuffix,
    description: seo.pages.voice.description,
    locale: siteInfo.locale,
    type: "website",
  },
  alternates: {
    canonical: `${siteInfo.url}/voice`,
  },
};

export default function VoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
