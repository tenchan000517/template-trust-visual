'use client';

import { useEffect, useRef, useState, ReactNode, Children, cloneElement, isValidElement, ElementType } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  distance?: number;
  className?: string;
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

export default function StaggerContainer({
  children,
  staggerDelay = 100,
  baseDelay = 0,
  duration = 600,
  distance = 30,
  className = '',
  as: Component = 'div',
}: StaggerContainerProps) {
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

  const staggeredChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;

    const delay = baseDelay + index * staggerDelay;

    const style = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
      transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      willChange: 'opacity, transform',
    };

    return cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
      style: {
        ...((child as React.ReactElement<{ style?: React.CSSProperties }>).props.style || {}),
        ...style,
      },
    });
  });

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
    >
      {staggeredChildren}
    </Component>
  );
}
