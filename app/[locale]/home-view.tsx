"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Marquee from "../components/marquee";
import WorksList from "../components/works-list";

// Dynamic import to avoid SSR issues with Matter.js
const GravityHero = dynamic(() => import("../components/gravity-hero"), {
  ssr: false,
});

type Props = {
  introText: string;
  dictionary: {
    intro: string;
    creative_developer: string;
    design_code_motion: string;
    scroll: string;
    available_for_work: string;
    selected_works: string;
    view_all: string;
    projects: Array<{
      name: string;
      year: string;
      tech: string;
      description: string;
    }>;
  };
};

export default function HomeView({ introText, dictionary }: Props) {
  const titleWords = dictionary.creative_developer.split(" ");
  const firstLine = titleWords.slice(0, titleWords.length - 1).join(" ");
  const secondLine = titleWords[titleWords.length - 1];

  return (
    <div className="flex flex-col w-full bg-zinc-50 dark:bg-black overflow-hidden relative">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-63px)] w-full flex flex-col">
        {/* Physics Layer */}
        <div className="absolute inset-0 z-10">
          <GravityHero />
        </div>

        {/* Typography Layer */}
        <div className="relative z-0 flex flex-1 flex-col items-center justify-center px-4 pointer-events-none">
          <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
            {/* Main Title */}
            <motion.h1
              className="font-stardom text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-zinc-900 dark:text-zinc-100 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {firstLine || "Filip"}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-500">
                {secondLine || "Kowalczyk"}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em] max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {dictionary.design_code_motion}
            </motion.p>

            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl mt-4"
            >
              <p className="text-base sm:text-lg md:text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed pointer-events-auto">
                {introText}
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                {dictionary.scroll}
              </span>
              <motion.div
                className="w-px h-8 bg-zinc-300 dark:bg-zinc-700"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Marquee
          text={dictionary.available_for_work}
          className="text-zinc-900 dark:text-zinc-50"
          repeatCount={4}
        />
      </motion.div>

      {/* Works Section */}
      <WorksList
        title={dictionary.selected_works}
        viewAllText={dictionary.view_all}
        projects={dictionary.projects}
      />

      {/* Bottom Spacer */}
      <div className="h-24" />
    </div>
  );
}
