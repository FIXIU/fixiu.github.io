"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
    name: string;
    year: string;
    tech: string;
    description: string;
};

type Props = {
    title?: string;
    viewAllText?: string;
    projects: Project[];
};

export default function WorksList({
    title = "Selected Works",
    viewAllText = "View All Projects",
    projects,
}: Props) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="w-full py-16 sm:py-24 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="flex items-baseline justify-between mb-12 border-b-2 border-zinc-900 dark:border-zinc-100 pb-4">
                    <h2 className="font-stardom text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-zinc-100">
                        {title}
                    </h2>
                    <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
                        ({projects.length.toString().padStart(2, "0")})
                    </span>
                </div>
                {/* Projects List */}
                <div className="divide-y-2 divide-zinc-200 dark:divide-zinc-800">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
                            className="group relative py-6 sm:py-8 cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            {/* Background Highlight */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        className="absolute inset-0 bg-lime-400/10 dark:bg-lime-400/5 -mx-4 px-4 rounded-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Content Grid */}
                            <div className="relative grid grid-cols-12 gap-4 items-center">
                                {/* Index */}
                                <div className="col-span-1 font-mono text-sm text-zinc-400 dark:text-zinc-500">
                                    {(index + 1).toString().padStart(2, "0")}
                                </div>

                                {/* Project Name */}
                                <div className="col-span-5 sm:col-span-4">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-200">
                                        {project.name}
                                    </h3>
                                </div>

                                {/* Tech */}
                                <div className="col-span-3 sm:col-span-4 hidden sm:block">
                                    <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
                                        {project.tech}
                                    </span>
                                </div>

                                {/* Year */}
                                <div className="col-span-2 text-right">
                                    <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
                                        {project.year}
                                    </span>
                                </div>

                                {/* Arrow */}
                                <div className="col-span-1 flex justify-end pr-2">
                                    <motion.span
                                        className="text-xl text-zinc-400 group-hover:text-lime-500"
                                        animate={{
                                            x: hoveredIndex === index ? 4 : 0,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </div>

                            {/* Description (reveals on hover) */}
                            <motion.div
                                initial={false}
                                animate={{
                                    height: hoveredIndex === index ? "auto" : 0,
                                    opacity: hoveredIndex === index ? 1 : 0,
                                    y: hoveredIndex === index ? 0 : -10,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                                className="overflow-hidden"
                            >
                                <p className="mt-4 ml-[8.333%] text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md pb-2">
                                    {project.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
                {/* View All Link
                <motion.div
                    className="mt-12 flex justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <a
                        href="#"
                        className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-wide text-sm hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-200"
                    >
                        {viewAllText}
                        <span className="group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </a>
                </motion.div> */}
            </div>
        </section>
    );
}
