'use client';

import { useEffect, useState, ReactNode } from 'react';

interface HeroBackgroundProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

// ページ遷移後にフェードインする背景ラッパー
export default function HeroBackground({
  children,
  className = '',
  duration = 1500,
  delay = 50,
}: HeroBackgroundProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // マウント後、少し待ってからフェードイン開始
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        // ゆるやかなイージング: 最初ゆっくり、じわっと現れる
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
      }}
    >
      {children}
    </div>
  );
}
