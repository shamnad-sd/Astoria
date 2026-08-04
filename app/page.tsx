"use client";

import React, { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";

// Components
import LuxuryPreloader from "@/components/preloader/LuxuryPreloader";
import Navbar from "@/components/layout/Navbar";
import ScrollyCanvas from "@/components/canvas/ScrollyCanvas";
import HeroOverlays from "@/components/hero/HeroOverlays";
import ExperienceAstoria from "@/components/sections/ExperienceAstoria";
import SignatureSpaces from "@/components/sections/SignatureSpaces";
import EventsSection from "@/components/sections/EventsSection";
import WhyAstoria from "@/components/sections/WhyAstoria";
import GallerySection from "@/components/sections/GallerySection";
import LocationSection from "@/components/sections/LocationSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaBookingModal from "@/components/sections/CtaBookingModal";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isPreloadComplete, setIsPreloadComplete] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handlePreloadProgress = useCallback((progress: number) => {
    setPreloadProgress(progress);
  }, []);

  const handlePreloadComplete = useCallback(() => {
    setIsPreloadComplete(true);
  }, []);

  const handleBookVisit = () => {
    setIsBookingOpen(true);
  };

  const handleExploreClick = () => {
    const spacesEl = document.getElementById("spaces");
    if (spacesEl) {
      spacesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative bg-[#090909] text-white min-h-screen">
      {/* Luxury Preloader Screen */}
      <LuxuryPreloader
        progress={preloadProgress}
        isLoaded={isPreloadComplete}
      />

      {/* Glassmorphic Navbar */}
      {/* <Navbar onBookClick={handleBookVisit} /> */}

      <Navbar
        onBookClick={handleBookVisit}
        isModalOpen={isBookingOpen}
      />

      {/* HERO SCROLLY CANVAS EXPERIENCE (500vh container, pinned sticky canvas 100vh) */}
      <ScrollyCanvas
        onLoadProgress={handlePreloadProgress}
        onLoadComplete={handlePreloadComplete}
      >
        <HeroOverlays
          onBookClick={handleBookVisit}
          onExploreClick={handleExploreClick}
        />
      </ScrollyCanvas>

      {/* EDITORIAL WEBSITE SECTIONS */}
      <div className="relative z-20 bg-[#090909] shadow-[0_-50px_100px_rgba(9,9,9,1)]">
        <ExperienceAstoria />
        <SignatureSpaces />
        <EventsSection onBookClick={handleBookVisit} />
        <WhyAstoria />
        <GallerySection />
        <LocationSection />
        <FaqSection />
        <CtaBookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          onOpen={() => setIsBookingOpen(true)}
        />
        <Footer />
      </div>
    </main>
  );
}
