"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";

interface LuxuryPreloaderProps {
  progress: number;
  isLoaded: boolean;
  onEnter?: () => void;
}

export default function LuxuryPreloader({ progress, isLoaded, onEnter }: LuxuryPreloaderProps) {
  const [exited, setExited] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setExited(true);
        if (onEnter) onEnter();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, onEnter]);

  return (
    <AnimatePresence>
      {!exited && (
        <motion.div
          key="luxury-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#090909] px-6 py-12 text-white pointer-events-auto"
        >
          {/* Subtle background radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.06)_0%,_transparent_65%)] pointer-events-none" />

          {/* Top Brand Header */}
          {/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-accent/80 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Astoria Convention Centre &bull; Kannur</span>
          </motion.div> */}

          {/* Center Branding & Progress */}
          <div className="flex flex-col items-center text-center max-w-lg w-full z-10 my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wider text-gold-gradient mb-10"
            >
              <a href="#" className="flex items-center group">
                <Image
                  src="/logo/logo-og.png"
                  alt="Astoria"
                  width={140}
                  height={48}
                  className="h-17 w-auto object-contain"
                  priority
                />
              </a>
            </motion.div>


            {/* Progress Counter */}
            <div className="w-full max-w-xs space-y-4">
              <div className="flex justify-between items-baseline text-xs font-mono tracking-widest text-muted">
                <span>PRELOADING EXPERIENCE</span>
                <span className="text-accent text-sm font-semibold">{Math.round(progress)}%</span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent/50 via-accent to-accent-glow"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
            </div>

            {/* Enter Experience Prompt when complete */}
            {/* {isLoaded && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={onEnter}
                className="mt-10 px-8 py-3.5 rounded-full border border-accent/40 bg-surface/80 hover:bg-accent text-accent hover:text-black font-sans text-xs tracking-[0.25em] uppercase transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.15)] group"
              >
                <span className="group-hover:translate-x-0.5 inline-block transition-transform duration-300">
                  Enter The Experience
                </span>
              </motion.button>
            )} */}
          </div>

          {/* Bottom Footer Note */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-[10px] tracking-[0.2em] uppercase text-muted/60 font-mono"
          >
            200 High-Definition Frames &bull; Scrollytelling
          </motion.div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

