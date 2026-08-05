"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, X } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  // category: "Architecture" | "Grand Auditorium" | "Night View" | "Events";
  category: "Architecture" | "Grand Auditorium";
  image: string;
  span: string;
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Grand Auditorium Stage",
      category: "Grand Auditorium",
      image: "/images/signature spaces7.jpg",
      span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
      id: 2,
      title: "Contemporary Design",
      category: "Architecture",
      image: "/images/signature spaces2.jpg",
      span: "col-span-1 row-span-1",
    },
    {
      id: 3,
      title: "Grand Arrival",
      category: "Grand Auditorium",
      image: "/images/signature spaces8.jpg",
      span: "col-span-1 row-span-1",
    },
    {
      id: 4,
      title: "Children's Play Zone",
      category: "Architecture",
      image: "/images/signature spaces3.jpg",
      span: "col-span-1 row-span-1",
    },
    {
      id: 5,
      title: "Grand Dining Hall",
      category: "Grand Auditorium",
      image: "/images/signature spaces4.jpg",
      span: "col-span-1 md:col-span-2 row-span-1",
    },
    // {
    //   id: 6,
    //   title: "Banquet Dining Setup",
    //   category: "Architecture",
    //   image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    //   span: "col-span-1 row-span-1",
    // },
  ];

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-28 sm:py-36 bg-transparent z-10 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface-glass text-accent text-xs font-mono tracking-[0.3em] uppercase mb-4">
              {/* <Sparkles className="w-3.5 h-3.5" /> */}
              <span>Visual Journey</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-tight">
              A Glimpse of <span className="italic font-normal text-gold-gradient">Astoria</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["All", "Architecture", "Grand Auditorium"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${activeCategory === cat
                  ? "bg-gold-gradient text-black font-semibold"
                  : "glass-panel text-muted hover:text-white border border-white/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedImage(item)}
              className={`group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-accent/50 cursor-pointer ${item.span}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-accent text-[10px] font-mono tracking-widest uppercase mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <Maximize2 className="w-4 h-4 text-accent" />
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-3xl overflow-hidden glass-panel-gold border border-accent/40"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/60 text-white hover:text-accent border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-[65vh] w-full">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              <div className="p-6 bg-surface flex items-center justify-between border-t border-white/10">
                <div>
                  <span className="text-accent text-xs font-mono uppercase tracking-widest">
                    {selectedImage.category}
                  </span>
                  <h4 className="font-serif text-2xl text-white">{selectedImage.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase"
                >
                  Close Viewer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
