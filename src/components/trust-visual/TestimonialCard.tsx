import Image from "next/image";

interface TestimonialCardProps {
  photo: string;
  company: string;
  position: string;
  name: string;
  quote: string;
  variant?: "summary" | "detail";
}

export default function TestimonialCard({
  photo,
  company,
  position,
  name,
  quote,
  variant = "summary",
}: TestimonialCardProps) {
  if (variant === "detail") {
    return (
      <div className="bg-white rounded-card shadow-card p-6 lg:p-8 transition-shadow duration-300 hover:shadow-card-hover">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* 顔写真 */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-32 lg:w-32 lg:h-40 mx-auto lg:mx-0">
              <Image
                src={photo}
                alt={`${name}様`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* コンテンツ */}
          <div className="flex-1">
            {/* プロフィール */}
            <div className="mb-4">
              <p className="text-sm text-muted">{company}</p>
              <p className="text-lg font-semibold text-main">
                {position} {name}
                <span className="text-sm font-normal ml-1">様</span>
              </p>
            </div>

            {/* 引用 */}
            <div className="relative pl-6">
              <div className="testimonial-quote relative">
                <p className="text-base leading-relaxed text-primary">
                  {quote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // summary variant
  return (
    <div className="bg-warm rounded-card p-6 lg:p-8 text-center transition-shadow duration-300 hover:shadow-card-hover">
      {/* 顔写真 */}
      <div className="relative w-20 h-20 mx-auto mb-4">
        <Image
          src={photo}
          alt={`${name}様`}
          fill
          className="object-cover rounded-full"
        />
      </div>

      {/* プロフィール */}
      <p className="text-sm text-muted mb-1">{company}</p>
      <p className="text-base font-medium text-main mb-4">
        {position} {name}
        <span className="text-sm font-normal ml-1">様</span>
      </p>

      {/* 引用 */}
      <div className="relative">
        <div className="testimonial-quote relative text-left">
          <p className="text-base leading-relaxed text-primary line-clamp-4">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}
