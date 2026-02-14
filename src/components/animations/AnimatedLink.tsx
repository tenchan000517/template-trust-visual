'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'default' | 'large';
}

export default function AnimatedLink({
  href,
  children,
  variant = 'light',
  className = '',
  size = 'default',
}: AnimatedLinkProps) {
  const baseColor = variant === 'light' ? 'text-[#004888]' : 'text-white';
  const hoverOpacity = variant === 'light' ? 'hover:opacity-70' : 'hover:opacity-80';
  const fontSize = size === 'large' ? 'text-[32px] lg:text-[48px]' : 'text-base';

  return (
    <Link
      href={href}
      className={`
        group
        relative
        inline-block
        font-bold
        font-en
        ${baseColor}
        ${fontSize}
        transition-opacity
        duration-200
        ${hoverOpacity}
        ${className}
      `}
    >
      <span className="relative">
        {children}
        <span
          className={`
            absolute
            left-0
            bottom-0
            w-full
            h-[2px]
            ${variant === 'light' ? 'bg-[#004888]' : 'bg-white'}
            origin-left
            transition-transform
            duration-300
            ease-out
            scale-x-100
            group-hover:scale-x-0
            group-hover:origin-right
          `}
        />
        <span
          className={`
            absolute
            left-0
            bottom-0
            w-full
            h-[2px]
            ${variant === 'light' ? 'bg-[#004888]' : 'bg-white'}
            origin-right
            transition-transform
            duration-300
            ease-out
            scale-x-0
            group-hover:scale-x-100
            group-hover:origin-left
            delay-150
          `}
        />
      </span>
    </Link>
  );
}
