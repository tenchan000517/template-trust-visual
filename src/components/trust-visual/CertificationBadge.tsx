import Image from "next/image";

interface CertificationBadgeProps {
  image: string;
  name: string;
  note?: string;
}

export default function CertificationBadge({
  image,
  name,
  note,
}: CertificationBadgeProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* バッジ画像 */}
      <div className="relative h-16 lg:h-20 mb-4">
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* 認証名 */}
      <h4 className="text-sm font-semibold text-main">{name}</h4>

      {/* 補足 */}
      {note && <p className="text-xs text-muted mt-1">{note}</p>}
    </div>
  );
}
