"use client";

import React from "react";
import { Sparkles, Mail, Phone, MapPin, ArrowUp, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#090909] text-white pt-20 pb-12 relative overflow-hidden border-t border-accent/20">
      
      {/* Top Gold Ambient Accent Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-accent/40 bg-surface flex items-center justify-center text-accent">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-wider text-white font-medium">
                  ASTORIA
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-mono -mt-1">
                  Convention Centre
                </span>
              </div>
            </a>

            <p className="text-muted text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Kannur's premier luxury destination for grand weddings, international conventions, corporate summits, and cultural celebrations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((soc, i) => (
                <a
                  key={i}
                  href={soc.href}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-accent text-muted hover:text-black flex items-center justify-center transition-all duration-300"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-accent text-xs font-mono uppercase tracking-widest mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs text-muted font-light uppercase tracking-wider">
              {["Overview", "Signature Spaces", "Events", "Why Astoria", "Gallery", "Location", "FAQ"].map((item, i) => (
                <li key={i}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-accent text-xs font-mono uppercase tracking-widest mb-4">
              Direct Contact
            </div>
            <ul className="space-y-4 text-xs text-muted font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>NH Dharmashala, Kannur, Kerala 670567, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span>+91 98470 00000 / +91 98470 11111</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span>info@astoriaconventioncentre.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted/60">
          <div>
            &copy; 2026 Astoria Convention Centre. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-accent hover:text-white transition-colors"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
