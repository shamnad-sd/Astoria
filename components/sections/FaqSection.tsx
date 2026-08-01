"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus, Minus } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the total guest capacity of Astoria Convention Centre?",
      answer: "Astoria accommodates up to 3,000 guests in the Grand Auditorium. Combined with our Dining Hall (1,500 guests), Mini Auditorium (500 guests), and Open Roof Terrace (800 guests), we can seamlessly host multi-thousand guest celebrations.",
    },
    {
      question: "How do I schedule a venue walkthrough or booking visit?",
      answer: "You can easily schedule a visit by tapping 'Book a Venue Visit' anywhere on our website. Our event concierge will arrange a personalized walkthrough of all signature spaces.",
    },
    {
      question: "Are luxury bridal suites and green rooms available?",
      answer: "Yes. Astoria provides climate-controlled, royal bridal suites with private dressing quarters, vanity mirrors, lounge seating, and direct stage access for complete comfort.",
    },
    {
      question: "What vehicle parking capacity does Astoria offer?",
      answer: "We offer multi-tier paved parking accommodating over 500+ vehicles simultaneously, complete with dedicated valet management and security supervision.",
    },
    {
      question: "Can we bring our custom catering and floral decorators?",
      answer: "Yes. While we offer master in-house culinary banqueting, we also welcome client-preferred external catering teams and luxury event decor partners.",
    },
    {
      question: "Are all indoor spaces fully climate-controlled?",
      answer: "Absoluty. Every indoor venue—including the Grand Auditorium, Mini Auditorium, and Dining Hall—is fitted with centralized HVAC systems for year-round optimal comfort.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 sm:py-36 bg-[#090909] text-white relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface-glass text-accent text-xs font-mono tracking-[0.3em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-tight">
            Curated <span className="italic font-normal text-gold-gradient">Answers</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-serif text-lg sm:text-xl text-white group-hover:text-accent transition-colors font-light">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/10 group-hover:border-accent group-hover:bg-accent group-hover:text-black flex items-center justify-center text-accent transition-all duration-300 flex-shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-muted font-light leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
