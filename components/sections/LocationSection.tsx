"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Navigation, Train, Plane, Car, ArrowUpRight, X } from "lucide-react";

export default function LocationSection() {
  const [showMapModal, setShowMapModal] = useState(false);

  const locations = [
    {
      icon: Car,
      distance: "3 km",
      title: "NH Dharmashala",
      desc: "Direct access via National Highway arterial corridors.",
    },
    {
      icon: Train,
      distance: "20 km",
      title: "Kannur Railway Station",
      desc: "Seamless taxi & express transit connections for rail guests.",
    },
    {
      icon: Plane,
      distance: "40 km",
      title: "Kannur International Airport (CNN)",
      desc: "Convenient direct highway route for flying delegates & destination wedding hosts.",
    },
  ];

  return (
    <section id="location" className="py-28 sm:py-36 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Connectivity Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface-glass text-accent text-xs font-mono tracking-[0.3em] uppercase mb-4">
                {/* <Sparkles className="w-3.5 h-3.5" /> */}
                <span>Kannur Location</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-tight">
                Easy to <span className="italic font-normal text-gold-gradient">Reach</span>
              </h2>
              <p className="text-muted text-sm sm:text-base font-light mt-3">
                Situated in Kannur, Astoria offers effortless transit for local, national, and international guests.
              </p>
            </div>

            <div className="space-y-4">
              {locations.map((loc, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                      <loc.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white group-hover:text-accent transition-colors">
                        {loc.title}
                      </h3>
                      <p className="text-xs text-muted font-light">{loc.desc}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-2xl text-accent font-light">{loc.distance}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowMapModal(true)}
              className="px-8 py-4 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center gap-2 group"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Right Column: Visual Map Card */}
          <div className="lg:col-span-6">
            <div className="glass-panel-gold rounded-3xl p-4 border border-accent/30 shadow-2xl relative overflow-hidden group">
              <div className="relative h-[420px] rounded-2xl overflow-hidden bg-surface">
                {/* Stylized Dark Map Preview */}
                <iframe
                  title="Astoria Convention Centre Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.910334812328!2d75.3670!3d11.9700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba43d0000000000%3A0x0!2sDharmashala%2C%20Kannur!5e0!3m2!1sen!2sin!4v1700000000000"
                  className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-75 group-hover:opacity-95 transition-opacity"
                  loading="lazy"
                />

                <div className="absolute top-4 left-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-accent/30 max-w-xs">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Astoria Convention Centre</span>
                  </div>
                  <div className="text-xs text-white">Dharmashala, Kannur, Kerala, India</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Map Directions Modal */}
      <AnimatePresence>
        {showMapModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setShowMapModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel-gold rounded-3xl max-w-xl w-full p-8 border border-accent/40 relative shadow-2xl"
            >
              <button
                onClick={() => setShowMapModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/20 hover:border-accent text-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-accent text-xs font-mono uppercase tracking-widest mb-3">
                <Navigation className="w-4 h-4" />
                <span>GPS Route Guidance</span>
              </div>

              <h3 className="font-serif text-3xl text-white mb-4">Navigate to Astoria</h3>
              <p className="text-sm text-muted font-light mb-8">
                Astoria Convention Centre is prominently situated near NH Dharmashala, Kannur. Tap below to launch turn-by-turn navigation in Google Maps or Apple Maps.
              </p>

              <div className="space-y-3">
                <a
                  href="https://maps.google.com/?q=Dharmashala+Kannur+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setShowMapModal(false)}
                  className="w-full py-3.5 rounded-full glass-panel text-white font-mono text-xs uppercase tracking-widest border border-white/20 hover:border-accent"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
