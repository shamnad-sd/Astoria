"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Users, Maximize, CheckCircle2, ArrowRight, X } from "lucide-react";

interface SpaceItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  capacity: string;
  area: string;
  features: string[];
  tag: string;
  image: string;
}

export default function SignatureSpaces() {
  const [selectedSpace, setSelectedSpace] = useState<SpaceItem | null>(null);

  const spaces: SpaceItem[] = [
    {
      id: "grand-auditorium",
      name: "Grand Auditorium",
      subtitle: "For weddings, conventions and large gatherings.",
      description: "Our crown jewel hall features soaring column-free architecture, state-of-the-art acoustic design, and royal gold accents, seating up to 3,000 guests in unmatched elegance.",
      capacity: "3,000 Guests",
      area: "25,000 Sq. Ft.",
      features: ["Pillar-less High Ceiling Architecture", "Advanced Acoustic Engineering", "Dedicated Bridal Suite Access", "VIP Lounge & Green Rooms"],
      tag: "Grand Scale",
      image: "/images/signature spaces1.jpg",
    },
    {
      id: "mini-auditorium",
      name: "Mini Auditorium",
      subtitle: "Perfect for seminars, meetings and presentations.",
      description: "Intimate yet sophisticated space tailored for corporate summits, keynote seminars, engagement ceremonies, and executive conferences with full AV support.",
      capacity: "500 Guests",
      area: "6,500 Sq. Ft.",
      features: ["Integrated 4K Projection System", "High-Definition Surround Audio", "Customizable Stage Rigging", "Climate Controlled Comfort"],
      tag: "Executive",
      image: "/images/signature spaces2.jpg",
    },
    {
      id: "dining-hall",
      name: "Dining Hall",
      subtitle: "Elegant dining designed for comfort.",
      description: "Spacious, climate-controlled luxury banqueting hall engineered for smooth culinary service, accommodating concurrent buffet setups and formal seated dinners.",
      capacity: "1,500 Guests",
      area: "18,000 Sq. Ft.",
      features: ["Dual Buffet Service Lanes", "Commercial Master Kitchen Access", "Ambient Chandeliers & Mood Lighting", "Dedicated Beverage Bars"],
      tag: "Culinary",
      image: "/images/signature spaces4.jpg",
    },
    {
      id: "grand-reception-lobby",
      name: "Grand Reception Lobby",
      subtitle: "A refined welcome to every celebration.",
      description: "An elegant double-height lobby featuring natural stone, warm wood finishes, and a luxurious reception experience for every guest.",
      capacity: "500+ Guests",
      area: "Double-Height Lobby",
      features: [
        "Luxury Reception Desk",
        "Natural Stone Interiors",
        "Premium Ambient Lighting",
        "Spacious Guest Lounge"
      ],
      tag: "Arrival Experience",
      image: "/images/signature spaces6.jpg",
    },
    {
      id: "amphitheatre",
      name: "Amphitheatre",
      subtitle: "A natural stage for performances and cultural events.",
      description: "Tiered open-air seating framed by serene landscape design, offering an authentic amphitheatre atmosphere for live musical performances and traditional art forms.",
      capacity: "1,000 Guests",
      area: "12,000 Sq. Ft.",
      features: ["Acoustic Terraced Seating", "Central Raised Performance Deck", "Landscape Mood Lighting", "Integrated Backstage Passages"],
      tag: "Cultural",
      image: "/images/signature spaces5.jpg",
    },
    {
      id: "childrens-park",
      name: "Children's Park",
      subtitle: "A dedicated space for young guests.",
      description: "Safe, beautifully manicured outdoor play domain featuring supervised play zones so families can celebrate with complete peace of mind.",
      capacity: "Family Zone",
      area: "4,000 Sq. Ft.",
      features: ["Soft Safety Turf Ground", "Modern Play Sculptures", "Surrounding Parent Seating", "Continuous Staff Supervision"],
      tag: "Family",
      image: "/images/signature spaces3.jpg",
    },
  ];

  return (
    <section id="spaces" className="py-28 sm:py-36 bg-transparent z-10 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface-glass text-accent text-xs font-mono tracking-[0.3em] uppercase mb-4">
              {/* <Sparkles className="w-3.5 h-3.5" /> */}
              <span>World-Class Venues</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight">
              Signature <span className="italic font-normal text-gold-gradient">Spaces</span>
            </h2>
          </div>
          <p className="text-muted text-sm sm:text-base font-light max-w-md">
            Meticulously planned architectural spaces tailored for every occasion, from royal weddings to intimate gatherings.
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaces.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelectedSpace(space)}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-500 group cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={space.image}
                  alt={space.name}
                  className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-accent/30 text-accent text-[10px] font-mono tracking-widest uppercase">
                  {space.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-white group-hover:text-accent transition-colors mb-2">
                    {space.name}
                  </h3>
                  <p className="text-muted text-xs font-light leading-relaxed mb-6">
                    {space.subtitle}
                  </p>
                </div>

                {/* Card Specs */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted">
                    <span className="flex items-center gap-1.5 text-white">
                      <Users className="w-3.5 h-3.5 text-accent" />
                      {space.capacity}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-accent" />
                      {space.area}
                    </span>
                  </div>

                  <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 flex items-center justify-center text-accent">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Space Details Modal */}
      <AnimatePresence>
        {selectedSpace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedSpace(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel-gold rounded-3xl max-w-2xl w-full p-6 sm:p-10 border border-accent/40 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedSpace(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/20 hover:border-accent text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                <img
                  src={selectedSpace.image}
                  alt={selectedSpace.name}
                  className="w-full h-full object-fill"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 font-serif text-3xl text-white">
                  {selectedSpace.name}
                </div>
              </div>

              <p className="text-sm text-muted font-light leading-relaxed mb-6">
                {selectedSpace.description}
              </p>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 font-mono text-xs">
                <div>
                  <span className="text-muted block">Capacity</span>
                  <span className="text-accent text-sm font-semibold">{selectedSpace.capacity}</span>
                </div>
                <div>
                  <span className="text-muted block">Total Area</span>
                  <span className="text-accent text-sm font-semibold">{selectedSpace.area}</span>
                </div>
              </div>

              <h4 className="font-serif text-lg text-white mb-3">Key Highlights & Amenities</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted mb-8">
                {selectedSpace.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedSpace(null)}
                className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-widest uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
              >
                Close View
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
