"use client";

import { useEffect, useState, useRef } from "react";

interface StatCounterProps {
  value: number;
  unit: string;
  label: string;
  decimals?: number;
  duration?: number;
  size?: "large" | "medium";
}

export default function StatCounter({
  value,
  unit,
  label,
  decimals = 0,
  duration = 2000,
  size = "large",
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue(0, value, duration);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const animateValue = (start: number, end: number, animDuration: number) => {
    const startTime = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animDuration, 1);
      const easedProgress = easeOut(progress);
      const current = start + (end - start) * easedProgress;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString();

  const sizeClasses = {
    large: {
      number: "stat-number stat-number--lg",
      unit: "stat-unit stat-unit--lg",
    },
    medium: {
      number: "stat-number stat-number--md",
      unit: "stat-unit stat-unit--md",
    },
  };

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center">
        <span className={sizeClasses[size].number}>{formattedValue}</span>
        <span className={sizeClasses[size].unit}>{unit}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
