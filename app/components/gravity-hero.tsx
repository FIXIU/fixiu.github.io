"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";

const SKILLS = [
    "C#",
    "C++",
    "Java",
    "MAUI",
    "Godot",
    "MySQL",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Figma",
    "Git",
    "Python",
    "Linux",
    "Rust",
];

type PhysicsBody = {
    id: number;
    x: number;
    y: number;
    angle: number;
    label: string;
    width: number;
    height: number;
};

export default function GravityHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const [bodies, setBodies] = useState<PhysicsBody[]>([]);
    const [isReady, setIsReady] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

    useEffect(() => {
        const handlePointerUp = () => setIsDragging(false);
        window.addEventListener("pointerup", handlePointerUp);
        return () => window.removeEventListener("pointerup", handlePointerUp);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const { width, height } = container.getBoundingClientRect();

        // Create engine
        const engine = Matter.Engine.create({
            gravity: { x: 0, y: 1 },
        });
        engineRef.current = engine;

        // Create walls
        const wallThickness = 50;
        const walls = [
            // Floor
            Matter.Bodies.rectangle(
                width / 2,
                height + wallThickness / 2,
                width,
                wallThickness,
                {
                    isStatic: true,
                    label: "floor",
                    friction: 0.8,
                    restitution: 0.2,
                }
            ),
            // Left wall
            Matter.Bodies.rectangle(
                -wallThickness / 2,
                height / 2,
                wallThickness,
                height,
                { isStatic: true, label: "wall" }
            ),
            // Right wall
            Matter.Bodies.rectangle(
                width + wallThickness / 2,
                height / 2,
                wallThickness,
                height,
                { isStatic: true, label: "wall" }
            ),
        ];

        Matter.Composite.add(engine.world, walls);

        // Create skill bodies
        const skillBodies = SKILLS.map((skill, index) => {
            const boxWidth = skill.length * 9 + 28;
            const boxHeight = 44;

            // Spawn from top with random x position
            const x =
                Math.random() * (width - boxWidth - 100) + 50 + boxWidth / 2;
            const y = -50 - index * 80;

            const body = Matter.Bodies.rectangle(x, y, boxWidth, boxHeight, {
                label: skill,
                chamfer: { radius: 8 },
                friction: 0.3,
                frictionAir: 0.01,
                restitution: 0.4,
                density: 0.001,
            });

            return body;
        });

        Matter.Composite.add(engine.world, skillBodies);

        // Add mouse control
        const mouse = Matter.Mouse.create(container);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });

        // Adjust mouse offset for scrolling - prevent Matter.js from hijacking scroll
        const mouseWithEvents = mouse as Matter.Mouse & {
            mousewheel: EventListener;
        };
        mouse.element.removeEventListener(
            "mousewheel",
            mouseWithEvents.mousewheel
        );
        mouse.element.removeEventListener(
            "DOMMouseScroll",
            mouseWithEvents.mousewheel
        );

        Matter.Composite.add(engine.world, mouseConstraint);
        mouseConstraintRef.current = mouseConstraint;

        // Run the engine
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // Update state for React rendering
        const updateBodies = () => {
            const updatedBodies = skillBodies.map((body) => ({
                id: body.id,
                x: body.position.x,
                y: body.position.y,
                angle: body.angle,
                label: body.label,
                width: body.bounds.max.x - body.bounds.min.x,
                height: body.bounds.max.y - body.bounds.min.y,
            }));
            setBodies(updatedBodies);
        };

        // Update at 60fps
        const interval = setInterval(updateBodies, 1000 / 60);

        // Mark as ready after a small delay
        setTimeout(() => setIsReady(true), 100);

        return () => {
            clearInterval(interval);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            Matter.Composite.clear(engine.world, false);
        };
    }, []);

    // Handle window resize
    useEffect(() => {
        let lastWidth = window.innerWidth;

        const handleResize = () => {
            // Only reload if width changes significantly (to avoid mobile scroll address bar resize triggering reload)
            if (Math.abs(window.innerWidth - lastWidth) > 10) {
                window.location.reload();
            }
        };

        let resizeTimeout: NodeJS.Timeout;
        const debouncedResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 500);
        };

        window.addEventListener("resize", debouncedResize);
        return () => {
            window.removeEventListener("resize", debouncedResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden ${
                isDragging
                    ? "pointer-events-auto cursor-grabbing"
                    : "pointer-events-none"
            }`}
        >
            {bodies.map((body) => (
                <motion.div
                    key={body.id}
                    className="absolute select-none cursor-grab active:cursor-grabbing pointer-events-auto touch-none"
                    onPointerDown={() => setIsDragging(true)}
                    style={{
                        left: body.x,
                        top: body.y,
                        x: "-50%",
                        y: "-50%",
                        rotate: `${body.angle}rad`,
                        opacity: isReady ? 1 : 0,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isReady ? 1 : 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-mono text-sm sm:text-base font-medium rounded-lg border-2 border-zinc-700 dark:border-zinc-300 whitespace-nowrap">
                        {body.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
