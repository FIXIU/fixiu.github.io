"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

type Props = {
  children: ReactNode;
};

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export default function SmoothScroll({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
