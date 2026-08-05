"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, Calendar, Sparkles } from "lucide-react";
import Image from "next/image";

// interface NavbarProps {
//   onBookClick?: () => void;
// }

interface NavbarProps {
  onBookClick?: () => void;
  isModalOpen?: boolean;
}

export default function Navbar({ onBookClick, isModalOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#experience" },
    { label: "Signature Spaces", href: "#spaces" },
    { label: "Events", href: "#events" },
    { label: "Why Astoria", href: "#why-astoria" },
    // { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
    // { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300 ${isModalOpen
        ? "opacity-0 pointer-events-none"
        : "opacity-100"
        }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-6 py-3.5 ${isScrolled
          ? "glass-panel-gold bg-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-accent/30"
          : "bg-black/30 backdrop-blur-md border border-white/10"
          }`}
      >
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center group">
          <Image
            src="/logo/logo-og.png"
            alt="Astoria"
            width={140}
            height={48}
            className="h-7 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.18em] text-muted hover:text-accent transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Audio & Book CTA) */}
        <div className="hidden sm:flex items-center gap-4">
          {/* <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Enable Ambient Audio" : "Mute Ambient Audio"}
            className="p-2 rounded-full border border-white/10 hover:border-accent/40 bg-white/5 text-muted hover:text-accent transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent animate-pulse" />}
          </button> */}

          <button
            onClick={onBookClick}
            className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-[0.18em] uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-accent"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-3 max-w-7xl mx-auto glass-panel-gold rounded-3xl p-6 border border-accent/30 shadow-2xl flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-muted hover:text-accent py-1.5 transition-colors border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center justify-between pt-2">
              {/* <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2 text-xs text-muted hover:text-accent"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent" />}
                <span>Ambient Sound</span>
              </button> */}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBookClick) onBookClick();
                }}
                className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-xs uppercase tracking-wider"
              >
                Book Visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
