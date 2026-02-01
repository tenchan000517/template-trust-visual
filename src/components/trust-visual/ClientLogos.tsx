"use client";

import Image from "next/image";

interface ClientLogo {
  id: string;
  src: string;
  alt: string;
}

interface ClientLogosProps {
  logos: ClientLogo[];
  infiniteScroll?: boolean;
  logoHeight?: number;
}

export default function ClientLogos({
  logos,
  infiniteScroll = false,
  logoHeight = 48,
}: ClientLogosProps) {
  if (infiniteScroll) {
    return (
      <div className="overflow-hidden">
        <div className="flex animate-logo-scroll">
          {/* 2回繰り返してシームレスなループを作成 */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 px-6 lg:px-8"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logoHeight * 2}
                height={logoHeight}
                className="client-logo h-10 lg:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
      {logos.map((logo) => (
        <div key={logo.id}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logoHeight * 2}
            height={logoHeight}
            className="client-logo h-10 lg:h-12 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}
