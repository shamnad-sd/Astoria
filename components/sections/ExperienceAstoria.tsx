"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, Award } from "lucide-react";

export default function ExperienceAstoria() {
  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-transparent text-white overflow-hidden">
      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column - Heading & Ethos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface-glass text-accent text-xs font-mono tracking-[0.3em] uppercase">
              {/* <Sparkles className="w-3.5 h-3.5" /> */}
              <span>Architectural Ethos</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1]">
              Where Architecture <br />
              <span className="italic font-normal text-gold-gradient">Meets Celebration</span>
            </h2>

            <p className="text-base sm:text-xl text-muted font-light leading-relaxed text-balance">
              Designed to impress from the first arrival, Astoria brings together striking architecture, elegant spaces and thoughtful hospitality to create unforgettable experiences.
            </p>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10">
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-accent font-light">3,000+</div>
                <div className="text-xs text-muted font-mono tracking-wider uppercase mt-1">Guest Capacity</div>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl text-accent font-light">6</div>
                <div className="text-xs text-muted font-mono tracking-wider uppercase mt-1">Distinct Venues</div>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl text-accent font-light">Kannur</div>
                <div className="text-xs text-muted font-mono tracking-wider uppercase mt-1">Prime Location</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Architectural Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {[
              {
                icon: Compass,
                title: "Curated Spatial Geometry",
                desc: "Soaring ceiling heights, pillar-less visual expanse, and acoustic engineering tailored for royal weddings and international conventions.",
              },
              {
                icon: ShieldCheck,
                title: "Flawless Guest Convenience",
                desc: "Expansive multi-tier valet parking, climate-controlled interiors, and dedicated bridal suite sanctuaries.",
              },
              {
                icon: Award,
                title: "World-Class Hospitality",
                desc: "Personalized event concierges, master banqueting teams, and seamless stage technology infrastructure.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-500 flex gap-4 items-start group"
              >
                <div className="p-3 rounded-xl bg-surface border border-accent/20 text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-white group-hover:text-accent transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
