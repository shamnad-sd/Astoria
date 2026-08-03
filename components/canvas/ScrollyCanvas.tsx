"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  onLoadProgress?: (progress: number) => void;
  onLoadComplete?: () => void;
  children?: React.ReactNode;
}

export default function ScrollyCanvas({ onLoadProgress, onLoadComplete, children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const isLoadedRef = useRef<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Scroll tracking across the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade canvas out softly towards the very end of 500vh container (from 0.88 to 0.98)
  const canvasOpacity = useTransform(scrollYProgress, [0.85, 0.98], [1, 0.25]);

  // Helper to format frame filename with 3 digits padding (frame_000_delay-0.05s.webp ... frame_199_delay-0.05s.webp)
  const getFrameUrl = (index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/sequence/frame_${padded}_delay-0.05s.webp`;
  };

  // Canvas draw logic with responsive object-fit: cover math
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    if (images.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(images.length - 1, frameIndex));
    const img = images[clampedIndex];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Handle high DPI Retina displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetWidth = Math.floor(rect.width * dpr);
    const targetHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const canvasRatio = canvasWidth / canvasHeight;
    const imageRatio = imgWidth / imgHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imageRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imageRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imageRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();

    lastDrawnFrameRef.current = clampedIndex;
  }, []);

  // Preload all 200 frames before enabling animation
  useEffect(() => {
    let isCancelled = false;
    const totalFrames = 200;
    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const handleImageLoad = () => {
      if (isCancelled) return;
      loadedCount++;
      const currentProgress = (loadedCount / totalFrames) * 100;

      if (onLoadProgress) {
        onLoadProgress(currentProgress);
      }

      if (loadedCount === totalFrames) {
        imagesRef.current = loadedImages;
        isLoadedRef.current = true;
        setIsLoaded(true);
        if (onLoadComplete) onLoadComplete();
        // Render initial frame 0
        requestAnimationFrame(() => renderFrame(0));
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = handleImageLoad;
      img.onerror = () => {
        // Fallback in case of individual load issue to prevent stuck preloader
        handleImageLoad();
      };
      loadedImages[i] = img;
    }

    return () => {
      isCancelled = true;
    };
  }, [onLoadProgress, onLoadComplete, renderFrame]);

  // Redraw when scroll progress changes
  useMotionValueEvent(scrollYProgress, "change", (latestProgress) => {
    if (!isLoadedRef.current) return;
    const totalFrames = imagesRef.current.length;
    if (totalFrames === 0) return;

    const frameIndex = Math.floor(latestProgress * (totalFrames - 1));

    // Redraw ONLY when frame index changes
    if (frameIndex !== lastDrawnFrameRef.current) {
      requestAnimationFrame(() => renderFrame(frameIndex));
    }
  });

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (lastDrawnFrameRef.current !== -1) {
        requestAnimationFrame(() => renderFrame(lastDrawnFrameRef.current));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#090909]">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <motion.canvas
          ref={canvasRef}
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Dynamic Dark Gradient Overlay for Typography Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 pointer-events-none" />

        {/* Subtle Gold Ambient Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(9,9,9,0.7)_100%)] pointer-events-none" />

        {/* Overlay Content Synced with Scroll */}
        {children}
      </div>
    </div>
  );
}
