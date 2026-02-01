"use client";

import { useEffect, useRef, useState, ReactNode, ReactElement, Children, cloneElement, isValidElement, CSSProperties } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  threshold?: number;
  once?: boolean;
}

export default function StaggerChildren({
  children,
  className = "",
  staggerDelay = 100,
  duration = 600,
  direction = "up",
  distance = 30,
  threshold = 0.2,
  once = true,
}: StaggerChildrenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated)) {
            setIsVisible(true);
            setHasAnimated(true);
          } else if (!once && !entry.isIntersecting) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin: "-80px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once, hasAnimated]);

  const getInitialTransform = () => {
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

  const childrenArray = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => {
        if (!isValidElement(child)) return child;

        const element = child as ReactElement<{ style?: CSSProperties }>;
        const childStyle: CSSProperties = {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translate3d(0, 0, 0)" : getInitialTransform(),
          transition: `opacity ${duration}ms ease-out ${index * staggerDelay}ms, transform ${duration}ms ease-out ${index * staggerDelay}ms`,
          willChange: "opacity, transform",
        };

        return cloneElement(element, {
          style: { ...element.props.style, ...childStyle },
        });
      })}
    </div>
  );
}
