"use client";
import { useState, useEffect, useRef } from "react";
import "./cursor.css";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [deform, setDeform] = useState({
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const lastPosition = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);
  const clickingRef = useRef(false);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches
      );
    };
    // Use setTimeout to avoid synchronous state update warning
    setTimeout(() => {
      setIsTouchDevice(checkTouchDevice());
    }, 0);
  }, []);

  useEffect(() => {
    // Don't set up mouse tracking on touch devices
    if (isTouchDevice) return;
    const updatePosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      // Show cursor on first mouse move (handles page refresh case)
      setIsVisible(true);

      // Calculate velocity
      velocityRef.current = {
        x: newX - lastPosition.current.x,
        y: newY - lastPosition.current.y,
      };

      lastPosition.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.closest(
        'a, button, [role="button"], input, textarea, select, [onclick], label, [tabindex]:not([tabindex="-1"])'
      );
      const hovering = !!isClickable;
      hoveringRef.current = hovering;
      setIsHovering(hovering);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => {
      clickingRef.current = true;
      setIsClicking(true);
    };
    const handleMouseUp = () => {
      clickingRef.current = false;
      setIsClicking(false);
    };

    // Animation loop for smooth deformation
    const animate = () => {
      const vx = velocityRef.current.x;
      const vy = velocityRef.current.y;

      // Calculate speed and angle
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      // Calculate squish amount based on speed (clamped)
      const squishAmount = Math.min(speed * 0.03, 0.4);

      // Stretch in movement direction, squish perpendicular
      const scaleX = 1 + squishAmount;
      const scaleY = 1 - squishAmount * 0.5;

      setDeform((prev) => {
        let rotation = prev.rotation;
        if (speed > 0.5) {
          let delta = (angle - prev.rotation) % 360;
          if (delta > 180) delta -= 360;
          if (delta < -180) delta += 360;
          rotation = prev.rotation + delta * 0.2;
        }

        return {
          // Smooth interpolation for natural feel
          scaleX: prev.scaleX + (scaleX - prev.scaleX) * 0.2,
          scaleY: prev.scaleY + (scaleY - prev.scaleY) * 0.2,
          rotation,
        };
      });

      // Gradually reduce velocity for smooth return to circle
      velocityRef.current.x *= 0.8;
      velocityRef.current.y *= 0.8;

      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isTouchDevice]);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      className={`custom-cursor ${isVisible ? "visible" : ""} ${
        isHovering ? "hovering" : ""
      } ${isClicking ? "clicking" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${deform.rotation}deg) scale(${deform.scaleX}, ${deform.scaleY})`,
      }}
    >
      <div className="custom-cursor__inner" />
    </div>
  );
}
