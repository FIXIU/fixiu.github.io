"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  repeatCount?: number;
};

/**
 * Marquee Component
 * An infinite horizontal scrolling text ticker.
 */
export default function Marquee({
  text,
  className = "",
  repeatCount = 4,
}: Props) {
  // Create array of repeated text for seamless loop
  const items = Array(repeatCount).fill(text);

  return (
    <div className="w-full overflow-hidden border-y border-zinc-200 dark:border-zinc-800 py-4 sm:py-6">
      <motion.div
        className="flex whitespace-nowrap w-fit"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className={`flex items-center text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight ${className}`}
          >
            {item}
            <span className="text-lime-400 mx-8">•</span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, index) => (
          <span
            key={`dup-${index}`}
            className={`flex items-center text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight ${className}`}
          >
            {item}
            <span className="text-lime-400 mx-8">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
