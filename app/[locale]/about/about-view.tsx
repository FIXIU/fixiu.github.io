"use client";

import { useState, useEffect } from "react";

interface RotatingWordProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * RotatingWord Component
 * Cycles through an array of words with a blur/fade transition.
 */
function RotatingWord({
  words,
  interval = 2000,
  className = "",
}: RotatingWordProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className={`inline-block transition-all duration-400 ease-out ${className}`}
      style={{
        opacity: isTransitioning ? 0 : 1,
        filter: isTransitioning ? "blur(4px)" : "blur(0px)",
      }}
    >
      {words[currentIndex]}
    </span>
  );
}

type Props = {
  dictionary: {
    about: {
      header: string;
      intro: string;
      rotatingWords: string[];
    };
  };
};

export default function AboutView({ dictionary }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-63px)] w-full flex-col items-center justify-center bg-zinc-50 dark:bg-black overflow-hidden relative px-6">
      <div className="flex flex-col items-center gap-8 z-10 max-w-4xl text-center">
        {/* Small Header Label */}
        <span className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em]">
          {dictionary.about.header}
        </span>

        {/* Main Intro with Rotating Word */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          {dictionary.about.intro}{" "}
          <RotatingWord
            words={dictionary.about.rotatingWords}
            interval={2000}
            className="text-lime-400 font-black"
          />
        </h1>
        <p>{dictionary.about.rotatingWordComment}</p>
      </div>
    </div>
  );
}
