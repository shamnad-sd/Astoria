"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Building2, Layers, HeartHandshake, MapPin, ShieldCheck, Gem } from "lucide-react";

export default function WhyAstoria() {
  const features = [
    {
      icon: Building2,
      title: "Landmark Architecture",
      desc: "Designed to leave a lasting impression with soaring ceilings, regal facade design, and ambient architectural lighting.",
    },
    {
      icon: Layers,
      title: "Versatile Spaces",
      desc: "Perfectly suited for every occasion, from royal weddings and grand expos to intimate seminars and open-air galas.",
    },
    {
      icon: HeartHandshake,
      title: "Exceptional Comfort",
      desc: "Thoughtfully planned for guests and hosts with climate-controlled auditoriums, bridal suites, and seamless valet parking.",
    },
    {
      icon: MapPin,
      title: "Easy Accessibility",
      desc: "Conveniently located in Kannur, just 3 km from NH Dharmashala, with effortless transit links for regional and international guests.",
    },
    {
      icon: ShieldCheck,
      title: "Professional Hospitality",
      desc: "Every detail handled with care by our veteran banqueting team, event managers, and technical stage concierges.",
    },
    {
      icon: Gem,
      title: "Remarkable Value",
      desc: "More than expected, without compromise—offering luxury aesthetics and premium infrastructure at extraordinary value.",
    },
  ];

  return (
    <section id="why-astoria" className="py-28 sm:py-36 bg-transparent z-10 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface-glass text-accent text-xs font-mono tracking-[0.3em] uppercase mb-4">
            {/* <Sparkles className="w-3.5 h-3.5" /> */}
            <span>The Astoria Distinction</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-tight">
            Why <span className="italic font-normal text-gold-gradient">Astoria</span>
          </h2>
          <p className="text-muted text-sm sm:text-base font-light mt-4">
            Crafted for those who demand grandeur, flawless execution, and unforgettable hospitality.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-accent/40 transition-all duration-500 group relative flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-surface border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300 mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-white group-hover:text-accent transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted/60">
                <span>ASTORIA FEATURE 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
