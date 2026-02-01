"use client";

import { useEffect, useState, useRef } from "react";

interface SatisfactionBarProps {
  label: string;
  percentage: number;
  animate?: boolean;
}

export default function SatisfactionBar({
  label,
  percentage,
  animate = true,
}: SatisfactionBarProps) {
  const [width, setWidth] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) {
      setWidth(percentage);
      setDisplayValue(percentage);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateBar();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [percentage, animate, hasAnimated]);

  const animateBar = () => {
    const duration = 1500;
    const startTime = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);

      setWidth(percentage * easedProgress);
      setDisplayValue(Math.round(percentage * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      }
    };

    requestAnimationFrame(animateFrame);
  };

  return (
    <div ref={ref} className="mb-6 last:mb-0">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-white/80 text-sm lg:text-base">{label}</span>
        <span className="text-white font-bold text-3xl lg:text-5xl font-[var(--font-numbers)]">
          {displayValue}
          <span className="text-xl lg:text-2xl ml-1">%</span>
        </span>
      </div>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-100"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
