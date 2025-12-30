"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  dictionary: any;
};

/**
 * Magnetic Component
 * Wraps any element and makes it "stick" to the mouse cursor slightly.
 * Uses framer-motion for smooth spring physics.
 */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // The 0.2 multiplier determines the "strength" of the magnet.
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SocialLink Component
 * Implements the "Slot Machine" effect where letters slide up/down on hover.
 * Matches the Header style but larger.
 */
function SocialLink({ label, href }: { label: string; href: string }) {
  const letters = label.split("");

  return (
    <Link
      href={href}
      className="group relative overflow-hidden block text-zinc-900 dark:text-zinc-50 font-black text-xl sm:text-2xl uppercase tracking-widest"
    >
      <span className="sr-only">{label}</span>
      <span
        className="relative block overflow-hidden h-[1.2em]"
        aria-hidden="true"
      >
        {/* Top letters: Slide up and out on hover */}
        <span className="flex flex-row">
          {letters.map((letter, index) => (
            <span
              key={`top-${index}`}
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>

        {/* Bottom letters: Slide up and in on hover (Lime color) */}
        <span className="absolute left-0 top-0 flex flex-row">
          {letters.map((letter, index) => (
            <span
              key={`bottom-${index}`}
              className="inline-block text-lime-400 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

export default function ContactView({ dictionary }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-63px)] w-full flex-col items-center justify-center bg-zinc-50 dark:bg-black overflow-hidden relative">
      <div className="flex flex-col items-center gap-8 z-10">
        {/* Magnetic Email Hero Section */}
        <Magnetic>
          <a
            href="mailto:filipkowalczyk@tuta.io"
            className="group relative flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <span className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-6 uppercase tracking-[0.2em]">
              {dictionary.contact.header}
            </span>
            <div className="flex flex-col items-center leading-[0.85]">
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-lime-400">
                {dictionary.contact.hello}
              </h1>
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-lime-400">
                {dictionary.contact.handle}
              </h1>
            </div>
          </a>
        </Magnetic>

        {/* Social Links Grid */}
        <div className="flex gap-8 sm:gap-12 mt-16">
          <Magnetic>
            <SocialLink
              label={dictionary.contact.socials.github}
              href="https://github.com/FIXIU"
            />
          </Magnetic>
          {/* <Magnetic>
            <SocialLink
              label={dictionary.contact.socials.linkedin}
              href="https://linkedin.com"
            />
          </Magnetic>
          <Magnetic>
            <SocialLink
              label={dictionary.contact.socials.instagram}
              href="https://instagram.com"
            />
          </Magnetic> */}
        </div>
      </div>
    </div>
  );
}
