"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
}

// スクロール位置が0になるまで待ち、さらに少し待機
function waitForScrollTop(): Promise<void> {
  return new Promise(resolve => {
    const check = () => {
      if (window.scrollY === 0) {
        setTimeout(resolve, 100);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}

export default function FadeInSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
  distance = 30,
  threshold = 0.2,
  once = true,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let cancelled = false;

    waitForScrollTop().then(() => {
      if (cancelled || !element) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && (!once || !hasAnimated)) {
              setTimeout(() => {
                setIsVisible(true);
                setHasAnimated(true);
              }, delay);
            } else if (!once && !entry.isIntersecting) {
              setIsVisible(false);
            }
          });
        },
        { threshold, rootMargin: "-80px 0px" }
      );

      observer.observe(element);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [delay, threshold, once, hasAnimated]);

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)";

    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "none":
        return "translate3d(0, 0, 0)";
      default:
        return `translate3d(0, ${distance}px, 0)`;
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
