"use client";

import React from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useMotionValue,
    useAnimationFrame,
    useReducedMotion,
} from "framer-motion";

/**
 * Wraps a value into the [min, max) range so the track can loop forever
 * without ever resetting to a visible seam.
 */
const wrap = (min: number, max: number, value: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
};

interface MarqueeRibbonProps {
    /** Words shown in the ribbon. */
    items?: string[];
    /** Percent of the track travelled per second. Negative scrolls right. */
    baseVelocity?: number;
    /** Divider glyph between words. */
    separator?: string;
    className?: string;
}

const DEFAULT_ITEMS = [
    "Royal Weddings",
    "Grand Expos",
    "Corporate Conferences",
    "Gala Dinners",
    "Product Launches",
    "Cultural Nights",
    "Award Ceremonies",
    "Open-Air Receptions",
];

export default function MarqueeRibbon({
    items = DEFAULT_ITEMS,
    baseVelocity = 3,
    separator = "✦",
    className = "",
}: MarqueeRibbonProps) {
    const prefersReducedMotion = useReducedMotion();

    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth the raw scroll velocity, then map it to a multiplier so a fast
    // flick speeds the ribbon up and scrolling upward flips its direction.
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4], {
        clamp: false,
    });

    // The track renders four copies of the word list, so one copy is 25% wide.
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

    const directionFactor = React.useRef<number>(1);

    useAnimationFrame((_, delta) => {
        if (prefersReducedMotion) return;

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        const factor = velocityFactor.get();
        if (factor < 0) {
            directionFactor.current = -1;
        } else if (factor > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * factor;

        baseX.set(baseX.get() + moveBy);
    });

    // Only the first copy is announced; the rest exist purely to fill the loop.
    const row = (ariaHidden: boolean) => (
        <span className="flex shrink-0 items-center whitespace-nowrap" aria-hidden={ariaHidden}>
            {items.map((item) => (
                <span key={item} className="flex items-center">
                    <span className="px-6 sm:px-10 font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-primary-muted/80">
                        {item}
                    </span>
                    <span className="text-accent/60 text-lg sm:text-2xl" aria-hidden="true">
                        {separator}
                    </span>
                </span>
            ))}
        </span>
    );

    return (
        <section
            className={`relative w-full overflow-hidden border-y border-white/[0.07] bg-[#0B0B0B] py-8 sm:py-12 ${className}`}
            aria-label="Events hosted at Astoria"
        >
            {/* Warm glow behind the ribbon */}
            <div className="pointer-events-none absolute inset-0 bg-radial-dark opacity-70" />

            {/* Edge fades so words dissolve instead of clipping */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-48 bg-gradient-to-r from-[#090909] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-48 bg-gradient-to-l from-[#090909] to-transparent" />

            <motion.div className="flex" style={{ x }}>
                {row(false)}
                {row(true)}
                {row(true)}
                {row(true)}
            </motion.div>
        </section>
    );
}
