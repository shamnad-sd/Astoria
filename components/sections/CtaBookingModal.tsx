"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Phone, Mail, User, CheckCircle, X, Send } from "lucide-react";

interface CtaBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function CtaBookingModal({ isOpen, onClose, onOpen }: CtaBookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Luxury Wedding",
    eventDate: "",
    guestCount: "1000",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <>
      {/* SECTION CTA BANNER */}
      <section className="py-28 sm:py-36 bg-[#090909] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10 text-center">
          <div className="glass-panel-gold rounded-3xl p-10 sm:p-16 border border-accent/40 shadow-2xl relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface text-accent text-xs font-mono tracking-[0.3em] uppercase mb-6">
              {/* <Sparkles className="w-3.5 h-3.5" /> */}
              <span>Personalized Concierge</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-tight mb-6">
              Let's Plan Something <br />
              <span className="italic font-normal text-gold-gradient">Memorable</span>
            </h2>

            <p className="text-muted text-base sm:text-xl font-light max-w-xl mx-auto mb-10 text-balance">
              Tell us about your event. We'll help you find the perfect space and curate every detail.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={onOpen}
                className="px-8 py-4 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Tour</span>
              </button>

              <button
                onClick={onOpen}
                className="px-8 py-4 rounded-full glass-panel text-white font-semibold text-xs tracking-[0.2em] uppercase border border-white/20 hover:border-accent hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-accent" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel-gold rounded-3xl max-w-2xl w-full p-6 sm:p-10 border border-accent/40 relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/20 hover:border-accent text-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <div>
                  <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest mb-2">
                    {/* <Sparkles className="w-4 h-4" /> */}
                    <span>Venue Visit & Reservation Inquiry</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-white mb-2">
                    Book a <span className="italic text-gold-gradient">Venue Visit</span>
                  </h3>
                  <p className="text-xs text-muted font-light mb-8">
                    Select your preferred event date and details. Our team will contact you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-mono text-muted uppercase mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-accent absolute left-3 top-3.5" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Lord / Lady / Mr. / Ms."
                            className="w-full bg-surface border border-white/10 focus:border-accent rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder:text-muted/50 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] font-mono text-muted uppercase mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-accent absolute left-3 top-3.5" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98470 00000"
                            className="w-full bg-surface border border-white/10 focus:border-accent rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder:text-muted/50 outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-[11px] font-mono text-muted uppercase mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-accent absolute left-3 top-3.5" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@domain.com"
                            className="w-full bg-surface border border-white/10 focus:border-accent rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder:text-muted/50 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Event Type */}
                      <div>
                        <label className="block text-[11px] font-mono text-muted uppercase mb-1">
                          Event Category *
                        </label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className="w-full bg-surface border border-white/10 focus:border-accent rounded-xl py-3 px-4 text-xs text-white outline-none transition-colors"
                        >
                          <option value="Luxury Wedding">Luxury Wedding</option>
                          <option value="Corporate Event">Corporate Event / Summit</option>
                          <option value="Private Celebration">Private Celebration / Gala</option>
                          <option value="Cultural Programme">Cultural Programme / Concert</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date */}
                      <div>
                        <label className="block text-[11px] font-mono text-muted uppercase mb-1">
                          Target Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          className="w-full bg-surface border border-white/10 focus:border-accent rounded-xl py-3 px-4 text-xs text-white outline-none transition-colors"
                        />
                      </div>

                      {/* Guest Count */}
                      <div>
                        <label className="block text-[11px] font-mono text-muted uppercase mb-1">
                          Estimated Guests
                        </label>
                        <select
                          value={formData.guestCount}
                          onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                          className="w-full bg-surface border border-white/10 focus:border-accent rounded-xl py-3 px-4 text-xs text-white outline-none transition-colors"
                        >
                          <option value="250">Up to 250 Guests</option>
                          <option value="500">250 - 500 Guests</option>
                          <option value="1000">500 - 1,500 Guests</option>
                          <option value="3000">1,500 - 3,000+ Guests</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] font-mono text-muted uppercase mb-1">
                        Specific Requirements / Notes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about catering preferences, stage decor, or preferred time..."
                        className="w-full bg-surface border border-white/10 focus:border-accent rounded-xl py-3 px-4 text-xs text-white placeholder:text-muted/50 outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Booking Request</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle className="w-16 h-16 text-accent mx-auto animate-bounce" />
                  <h3 className="font-serif text-3xl text-white">Request Received</h3>
                  <p className="text-sm text-muted max-w-sm mx-auto">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. Our senior event concierge will contact you shortly to confirm your visit.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
