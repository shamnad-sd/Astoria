"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Calendar, ArrowUpRight, Sparkles } from "lucide-react";

interface HeroOverlaysProps {
  containerRef?: React.RefObject<HTMLDivElement>;
  onBookClick?: () => void;
  onExploreClick?: () => void;
}

export default function HeroOverlays({ onBookClick, onExploreClick }: HeroOverlaysProps) {
  // Target hero parent container scroll progress
  const { scrollYProgress } = useScroll();

  // Section 1 Transforms (0% to 22%)
  const s1Opacity = useTransform(scrollYProgress, [0, 0.04, 0.16, 0.22], [1, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.22], [0, -60]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);
  const s1Filter = useTransform(scrollYProgress, [0.15, 0.22], ["blur(0px)", "blur(10px)"]);

  // Section 2 Transforms (24% to 48%)
  const s2Opacity = useTransform(scrollYProgress, [0.24, 0.30, 0.42, 0.48], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.24, 0.30, 0.42, 0.48], [60, 0, 0, -60]);
  const s2Filter = useTransform(scrollYProgress, [0.24, 0.30, 0.42, 0.48], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // Section 3 Transforms (50% to 73%)
  const s3Opacity = useTransform(scrollYProgress, [0.50, 0.56, 0.67, 0.73], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.50, 0.56, 0.67, 0.73], [60, 0, 0, -60]);
  const s3Scale = useTransform(scrollYProgress, [0.50, 0.73], [0.95, 1]);

  // Section 4 Transforms (75% to 96%)
  const s4Opacity = useTransform(scrollYProgress, [0.75, 0.81, 0.92, 0.98], [0, 1, 1, 0]);
  const s4Y = useTransform(scrollYProgress, [0.75, 0.81, 0.92, 0.98], [60, 0, 0, -40]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 md:p-16">

      {/* Dynamic Background Audio / Scroll Indicator Top Bar */}
      {/* <div className="flex justify-between items-center w-full max-w-7xl mx-auto pt-16 sm:pt-20">
        <motion.div
          style={{ opacity: s1Opacity }}
          className="flex items-center gap-3 text-xs tracking-[0.25em] text-accent uppercase font-mono bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-accent/20"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>Cinematic Sunrise &bull; Kannur</span>
        </motion.div>
      </div> */}

      {/* SECTION 1: Grand Celebrations */}
      <motion.div
        style={{ opacity: s1Opacity, y: s1Y, scale: s1Scale, filter: s1Filter }}
        className="my-auto max-w-4xl mx-auto text-center pointer-events-auto flex flex-col items-center"
      >
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface-glass text-accent text-xs font-mono tracking-[0.3em] uppercase mb-6 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Kannur's Premier Landmark Destination</span>
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[1.05] mb-6"
        >
          Designed for <br />
          <span className="italic font-normal text-gold-gradient">Grand Celebrations</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base sm:text-xl md:text-2xl text-muted font-sans font-light max-w-2xl leading-relaxed mb-10 text-balance"
        >
          A premium convention destination in Kannur for weddings, corporate events, and unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full max-w-md"
        >
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Tour</span>
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface-glass text-white border border-white/20 hover:border-accent text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Explore Astoria</span>
            <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* SECTION 2: Where Architecture Meets Celebration */}
      {/* <motion.div
        style={{ opacity: s2Opacity, y: s2Y, filter: s2Filter }}
        className="my-auto max-w-4xl mx-auto text-center pointer-events-auto px-4"
      >
        <div className="inline-block px-4 py-1 rounded-full border border-accent/20 bg-black/60 backdrop-blur-md text-accent text-xs font-mono tracking-[0.3em] uppercase mb-4">
          Golden Hour Perspective
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-tight leading-tight mb-6">
          Where Architecture <br />
          <span className="italic text-gold-gradient font-normal">Meets Celebration</span>
        </h2>
        <p className="text-sm sm:text-lg md:text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed text-balance">
          Designed to impress from the first arrival, Astoria brings together striking architecture, elegant spaces and thoughtful hospitality to create unforgettable experiences.
        </p>
      </motion.div> */}

      {/* SECTION 3: Every Celebration Begins Here */}
      {/* <motion.div
        style={{ opacity: s3Opacity, y: s3Y, scale: s3Scale }}
        className="my-auto max-w-5xl mx-auto text-center pointer-events-auto px-4"
      >
        <div className="inline-block px-4 py-1 rounded-full border border-accent/20 bg-black/60 backdrop-blur-md text-accent text-xs font-mono tracking-[0.3em] uppercase mb-6">
          Unrivaled Versatility
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-tight leading-tight mb-10">
          Every Celebration <br />
          <span className="italic text-gold-gradient font-normal">Begins Here</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {[
            { title: "Luxury Weddings", desc: "Grand Banquets & Ceremonies" },
            { title: "Corporate Events", desc: "Conferences & Summits" },
            { title: "Private Celebrations", desc: "Anniversaries & Galas" },
            { title: "Cultural Programmes", desc: "Performances & Expos" },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-300 text-left group"
            >
              <div className="text-accent text-xs font-mono mb-2">0{idx + 1}</div>
              <div className="font-serif text-lg sm:text-xl text-white group-hover:text-accent transition-colors">
                {cat.title}
              </div>
              <div className="text-[11px] text-muted font-light mt-1">{cat.desc}</div>
            </div>
          ))}
        </div>
      </motion.div> */}

      {/* SECTION 4: Experience Astoria */}
      {/* <motion.div
        style={{ opacity: s4Opacity, y: s4Y }}
        className="my-auto max-w-4xl mx-auto text-center pointer-events-auto px-4"
      >
        <div className="inline-block px-4 py-1 rounded-full border border-accent/30 bg-black/70 backdrop-blur-md text-accent text-xs font-mono tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          Illuminated Evening Distinction
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl font-light text-white tracking-tight leading-none mb-6">
          Experience <span className="italic text-gold-gradient font-normal">Astoria</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-base text-muted font-light">
          <span className="text-white">Elegant Architecture</span>
          <span className="text-accent">&bull;</span>
          <span className="text-white">Exceptional Hospitality</span>
          <span className="text-accent">&bull;</span>
          <span className="text-white">Designed for Unforgettable Celebrations</span>
        </div>
      </motion.div> */}

      {/* Bottom Scroll Indicator Pill */}
      <motion.div
        style={{ opacity: s1Opacity }}
        className="flex flex-col items-center gap-2 max-w-xs mx-auto pb-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted/70 font-mono">
          Scroll To Discover
        </span>
        <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
      </motion.div>
    </div>
  );
}
