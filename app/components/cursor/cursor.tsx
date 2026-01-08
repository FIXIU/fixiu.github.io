"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./cursor.css";

export default function Cursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics config - Snappy but smooth
  const springConfig = { damping: 20, stiffness: 450, mass: 0.15 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Scale logic
  const scale = useSpring(1, springConfig);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches);
      setIsTouchDevice(isTouch);
      if (isTouch) document.body.classList.add("touch-device");
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, [data-cursor-hover], .magnetic-wrap"
        )
      ) {
        scale.set(3.5); // Scales to ~70px
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement;
      if (
        !related?.closest(
          "a, button, input, textarea, [data-cursor-hover], .magnetic-wrap"
        )
      ) {
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouchDevice, scale, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{
        scale,
        x: cursorX,
        y: cursorY,
      }}
    />
  );
}
