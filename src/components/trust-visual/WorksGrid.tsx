"use client";

import Image from "next/image";
import { useState } from "react";

interface WorkItem {
  id: string;
  image: string;
  title: string;
  category?: string;
  year?: number;
}

interface WorkCategory {
  id: string;
  label: string;
}

interface WorksGridProps {
  works: WorkItem[];
  categories?: WorkCategory[];
  columns?: 2 | 3 | 4;
  showOverlay?: boolean;
  showFilter?: boolean;
}

export default function WorksGrid({
  works,
  categories = [],
  columns = 3,
  showOverlay = true,
  showFilter = false,
}: WorksGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredWorks =
    activeCategory === "all"
      ? works
      : works.filter((work) => work.category === activeCategory);

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div>
      {/* カテゴリフィルター */}
      {showFilter && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-sm rounded-btn transition-all ${
                activeCategory === category.id
                  ? "bg-main text-white"
                  : "bg-offwhite text-main hover:bg-light-gray"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      {/* グリッド */}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {filteredWorks.map((work) => (
          <div
            key={work.id}
            className="works-item group relative aspect-[4/3] overflow-hidden rounded-card"
          >
            {/* 画像 */}
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="works-image object-cover"
            />

            {/* オーバーレイ */}
            {showOverlay && (
              <div className="works-overlay absolute inset-0 flex flex-col justify-end p-4">
                {work.category && (
                  <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-accent text-white rounded">
                    {work.category}
                  </span>
                )}
                <h3 className="text-white font-medium text-sm lg:text-base">
                  {work.title}
                </h3>
                {work.year && (
                  <p className="text-white/80 text-xs mt-1">{work.year}年</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
