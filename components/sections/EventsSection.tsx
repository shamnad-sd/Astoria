"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowUpRight } from "lucide-react";

interface EventsSectionProps {
  onBookClick?: () => void;
}

export default function EventsSection({ onBookClick }: EventsSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const events = [
    {
      title: "Luxury Weddings",
      subtitle: "Royal Celebrations & Extravagances",
      description: "From lavish sangeet galas to grand wedding receptions, Astoria provides a regal canvas with pillar-less architecture, opulent chandeliers, and dedicated bridal suites.",
      tag: "Weddings",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      highlights: ["3,000+ Banquet Capacity", "Private Royal Bridal Suite", "Master Culinary Banqueting", "Custom Floral & Stage Decor"],
    },
    {
      title: "Corporate Events",
      subtitle: "Conventions, Summits & Launches",
      description: "Host high-profile corporate summits, product launches, and annual shareholder meetings with state-of-the-art AV projection, high-speed fiber internet, and executive dining.",
      tag: "Corporate",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
      highlights: ["Integrated 4K Projection", "Breakout Seminar Rooms", "Executive Catering Services", "Seamless Press & Media Setup"],
    },
    {
      title: "Private Celebrations",
      subtitle: "Milestones, Anniversaries & Galas",
      description: "Celebrate milestone birthdays, silver jubilees, and family reunions in opulent comfort with tailored mood lighting, custom seating layouts, and bespoke entertainment decks.",
      tag: "Private",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200",
      highlights: ["Alfresco Sky Terrace Option", "Personalized Banquet Menus", "Curated Sound & Light Shows", "Intimate Seating Configs"],
    },
    {
      title: "Cultural Programmes",
      subtitle: "Concerts, Expos & Award Ceremonies",
      description: "A natural home for Kerala's rich artistic traditions, musical concerts, theatrical plays, and grand award galas with acoustic amphitheatre & stage infrastructure.",
      tag: "Cultural",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
      highlights: ["Acoustic Amphitheatre", "Green Room Passages", "High-Load Stage Rigging", "Broadcasting Support"],
    },
  ];

  return (
    <section id="events" className="py-28 sm:py-36 bg-transparent z-10 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface-glass text-accent text-xs font-mono tracking-[0.3em] uppercase mb-4">
            {/* <Sparkles className="w-3.5 h-3.5" /> */}
            <span>Unforgettable Gatherings</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-tight mb-4">
            Every Celebration <br />
            <span className="italic font-normal text-gold-gradient">Begins Here</span>
          </h2>
          <p className="text-muted text-sm sm:text-base font-light">
            Tailored spaces, master hospitality, and meticulous coordination for life's most cherished milestones.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {events.map((event, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${activeTab === idx
                ? "bg-gold-gradient text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                : "glass-panel text-muted hover:text-white border border-white/10"
                }`}
            >
              {event.title}
            </button>
          ))}
        </div>

        {/* Active Event Featured Banner */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-panel-gold rounded-3xl overflow-hidden border border-accent/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Image */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[350px]">
            <img
              src={events[activeTab].image}
              alt={events[activeTab].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              {events[activeTab].tag}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="text-accent text-xs font-mono uppercase tracking-widest mb-2">
                {events[activeTab].subtitle}
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white mb-4">
                {events[activeTab].title}
              </h3>
              <p className="text-muted text-sm font-light leading-relaxed mb-8">
                {events[activeTab].description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 mb-8">
                {events[activeTab].highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onBookClick}
              className="w-full py-4 rounded-full bg-surface hover:bg-accent text-white hover:text-black border border-accent/40 font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Event Venue</span>
              <ArrowUpRight className="w-4 h-4 text-accent group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
