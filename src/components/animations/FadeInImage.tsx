'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface FadeInImageProps extends Omit<ImageProps, 'onLoad'> {
  delay?: number;
  duration?: number;
  hoverScale?: number;
  containerClassName?: string;
  direction?: 'up' | 'left' | 'right';
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

function getTransform(direction: 'up' | 'left' | 'right', isVisible: boolean): string {
  if (isVisible) return 'translate(0, 0)';
  switch (direction) {
    case 'left':
      return 'translateX(-50px)';
    case 'right':
      return 'translateX(50px)';
    case 'up':
    default:
      return 'translateY(30px)';
  }
}

export default function FadeInImage({
  delay = 0,
  duration = 600,
  hoverScale = 1.05,
  containerClassName = '',
  className = '',
  direction = 'up',
  alt,
  ...props
}: FadeInImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // delayが1未満の場合は秒単位と見なしてミリ秒に変換
  const delayMs = delay < 1 ? delay * 1000 : delay;

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

  const shouldAnimate = isVisible && isLoaded;

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${containerClassName}`}
      style={{
        opacity: shouldAnimate ? 1 : 0,
        transform: getTransform(direction, shouldAnimate),
        transition: `opacity ${duration}ms ease-out ${delayMs}ms, transform ${duration}ms ease-out ${delayMs}ms`,
      }}
    >
      <Image
        {...props}
        alt={alt}
        className={`transition-transform duration-300 ease-out ${className}`}
        style={{
          ['--hover-scale' as string]: hoverScale,
        }}
        onLoad={() => setIsLoaded(true)}
      />
      <style jsx global>{`
        .overflow-hidden:hover img {
          transform: scale(var(--hover-scale, 1.05)) !important;
        }
      `}</style>
    </div>
  );
}
