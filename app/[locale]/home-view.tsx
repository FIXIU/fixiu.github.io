"use client";

import { motion } from "framer-motion";
import Marquee from "../components/marquee";

type Props = {
  introText: string;
};

export default function HomeView({ introText }: Props) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-63px)] w-full bg-zinc-50 dark:bg-black overflow-hidden relative">
      {/* Main Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center z-10 gap-8 sm:gap-12">
          <div className="flex flex-col items-center leading-none select-none">
          </div>

          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-2xl text-center"
          >
            <p className="text-lg sm:text-2xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {introText}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <Marquee
          text="AVAILABLE FOR WORK"
          className="text-zinc-900 dark:text-zinc-50"
          repeatCount={4}
        />
      </motion.div>
    </div>
  );
}
