"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient background layer for the editorial sections.
 *
 * Three quiet layers, all CSS-driven (no rAF loop, so it never competes with
 * Lenis or the hero canvas):
 *   1. Slow-drifting champagne glow orbs — the same accent language the
 *      sections already use, just in motion.
 *   2. Light motes — faint specks rising like dust caught in hall lighting.
 *   3. A wide, very slow light sweep, as if a spotlight passes the room.
 *
 * Positions are hardcoded rather than randomised so server and client render
 * identical markup.
 */

const MOTES = [
  { left: "6%", size: 2, delay: 0, duration: 26, drift: "14px" },
  { left: "14%", size: 3, delay: 6, duration: 34, drift: "-18px" },
  { left: "23%", size: 2, delay: 12, duration: 29, drift: "22px" },
  { left: "31%", size: 1, delay: 3, duration: 38, drift: "-10px" },
  { left: "39%", size: 3, delay: 18, duration: 24, drift: "16px" },
  { left: "47%", size: 2, delay: 9, duration: 32, drift: "-24px" },
  { left: "55%", size: 1, delay: 21, duration: 27, drift: "12px" },
  { left: "63%", size: 3, delay: 14, duration: 36, drift: "-16px" },
  { left: "71%", size: 2, delay: 2, duration: 30, drift: "20px" },
  { left: "79%", size: 2, delay: 24, duration: 25, drift: "-14px" },
  { left: "87%", size: 1, delay: 8, duration: 40, drift: "18px" },
  { left: "94%", size: 3, delay: 16, duration: 33, drift: "-20px" },
];

/** How far (px) the deepest layer travels from centre to edge of the viewport. */
const PARALLAX_RANGE = 90;
/** Easing per frame — lower is heavier/slower to follow the cursor. */
const EASE = 0.045;

export default function AmbientBackground() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Honour the reduced-motion preference and skip pointer tracking entirely
    // on devices without a fine pointer (phones/tablets).
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    // target = where the cursor says the layers should be
    // current = where they actually are; eased toward target each frame
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    // Raw cursor position, for the highlight that sits under the pointer.
    let targetCx = window.innerWidth / 2;
    let targetCy = window.innerHeight / 2;
    let currentCx = targetCx;
    let currentCy = targetCy;
    let frame = 0;

    const onPointerMove = (e: PointerEvent) => {
      // -1 .. 1 across the viewport, inverted so the light drifts away from
      // the cursor rather than chasing it — reads calmer.
      targetX = -((e.clientX / window.innerWidth) * 2 - 1) * PARALLAX_RANGE;
      targetY = -((e.clientY / window.innerHeight) * 2 - 1) * PARALLAX_RANGE;
      targetCx = e.clientX;
      targetCy = e.clientY;
      // Fade the cursor highlight in on first movement.
      stage.style.setProperty("--ambient-cursor-opacity", "1");
    };

    const tick = () => {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;
      currentCx += (targetCx - currentCx) * EASE;
      currentCy += (targetCy - currentCy) * EASE;

      // Once everything has settled, keep the loop alive but stop writing
      // styles — no style recalc while the cursor is still.
      const settled =
        Math.abs(targetX - currentX) < 0.1 &&
        Math.abs(targetY - currentY) < 0.1 &&
        Math.abs(targetCx - currentCx) < 0.1 &&
        Math.abs(targetCy - currentCy) < 0.1;
      if (settled) {
        frame = requestAnimationFrame(tick);
        return;
      }

      stage.style.setProperty("--ambient-mx", `${currentX.toFixed(2)}px`);
      stage.style.setProperty("--ambient-my", `${currentY.toFixed(2)}px`);
      stage.style.setProperty("--ambient-cx", `${currentCx.toFixed(1)}px`);
      // The stage is sticky to the viewport top, so clientY maps straight in.
      stage.style.setProperty("--ambient-cy", `${currentCy.toFixed(1)}px`);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none"
    >
      {/* Sticky viewport-sized stage: the effect follows the reader down the
          page but stays clipped to the sections wrapper. */}
      <div
        ref={stageRef}
        className="ambient-stage sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* 1 — Drifting glow orbs. Each sits in a parallax shell so the
            cursor offset and the idle drift keyframes don't fight over the
            same transform property. Depth varies per orb for real layering. */}
        {/* <div className="ambient-parallax" style={{ "--depth": 1 } as React.CSSProperties}>
          <div className="ambient-orb ambient-orb--one" />
        </div>
        <div className="ambient-parallax" style={{ "--depth": 0.55 } as React.CSSProperties}>
          <div className="ambient-orb ambient-orb--two" />
        </div>
        <div className="ambient-parallax" style={{ "--depth": 1.45 } as React.CSSProperties}>
          <div className="ambient-orb ambient-orb--three" />
        </div> */}

        {/* 2 — Rising light motes, nudged only slightly */}
        <div className="ambient-parallax" style={{ "--depth": 0.3 } as React.CSSProperties}>
          {MOTES.map((mote, i) => (
            <span
              key={i}
              className="ambient-mote"
              style={
                {
                  left: mote.left,
                  width: `${mote.size}px`,
                  height: `${mote.size}px`,
                  animationDelay: `-${mote.delay}s`,
                  animationDuration: `${mote.duration}s`,
                  "--mote-drift": mote.drift,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* 3 — Slow light sweep */}
        {/* <div className="ambient-parallax" style={{ "--depth": 0.8 } as React.CSSProperties}>
          <div className="ambient-sweep" />
        </div> */}

        {/* 4 — Soft highlight that follows the cursor directly */}
        <div className="ambient-cursor-glow" />
      </div>
    </div>
  );
}
