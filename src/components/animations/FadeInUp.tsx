'use client';

import { useEffect, useRef, useState, ReactNode, ElementType } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
}

// スクロール位置が0になるまで待ち、さらに少し待機
function waitForScrollTop(): Promise<void> {
  return new Promise(resolve => {
    const check = () => {
      if (window.scrollY === 0) {
        // スクロール完了後、100ms待ってからアニメーション開始
        setTimeout(resolve, 100);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}

export default function FadeInUp({
  children,
  delay = 0,
  duration = 600,
  distance = 30,
  className = '',
  style: externalStyle,
  as: Component = 'div',
}: FadeInUpProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    // スクロール位置が0になってからIntersectionObserverを開始
    waitForScrollTop().then(() => {
      if (cancelled || !element) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer?.unobserve(element);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(element);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  // delayが1未満の場合は秒単位と見なしてミリ秒に変換
  const delayMs = delay < 1 ? delay * 1000 : delay;

  const animationStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
    transition: `opacity ${duration}ms ease-out ${delayMs}ms, transform ${duration}ms ease-out ${delayMs}ms`,
    willChange: 'opacity, transform',
  };

  const mergedStyle = externalStyle ? { ...externalStyle, ...animationStyle } : animationStyle;

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={mergedStyle}
    >
      {children}
    </Component>
  );
}
