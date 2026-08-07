"use client";

import { motion } from "framer-motion";

/**
 * Floating WhatsApp contact button.
 *
 * The number comes from NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, including
 * country code, no + or spaces — e.g. 919847000000). The fallback is the
 * placeholder used elsewhere in the site and must be replaced before launch.
 */
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "919847000000";

const PREFILLED_MESSAGE =
  "Hello Astoria Convention Centre, I'd like to enquire about hosting an event.";

/** Brand glyph — lucide-react doesn't ship third-party logos. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a12.06 12.06 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Astoria Convention Centre on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      // z-40 keeps it above the page but below the modals (z-50).
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 sm:bottom-8 sm:right-8"
    >
      {/* Label, desktop only — slides out on hover */}
      <span className="pointer-events-none hidden translate-x-2 rounded-full border border-accent/30 bg-surface-glass px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        Chat with us
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient shadow-[0_8px_30px_rgba(9,9,9,0.45)] ring-1 ring-accent/40 transition-shadow duration-300 group-hover:shadow-[0_0_35px_rgba(183,169,154,0.5)]">
        {/* Slow halo so the button reads as live without shouting */}
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/30 [animation-duration:3s]" />
        <WhatsAppIcon className="relative h-7 w-7 text-primary" />
      </span>
    </motion.a>
  );
}
