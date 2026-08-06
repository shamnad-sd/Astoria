"use client";

import { useEffect, useState } from "react";

/**
 * TEMPORARY — client review aid, not a product feature.
 *
 * Flips the whole site between the dark design and the light test theme
 * (app/theme-light.css) by toggling `theme-light` on <html>.
 *
 *   • Press  Shift + L  anywhere on the page
 *   • Or click the pill in the bottom-left (visible in dev only)
 *   • Or load any URL with  ?theme=light
 *
 * The choice is remembered across reloads. Delete this file and its two
 * lines in page.tsx when the decision is made.
 */

const STORAGE_KEY = "astoria-theme-test";

export default function ThemeTestToggle() {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Decide the initial state once, on the client: URL wins, then last choice.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("theme");
    const initial =
      fromUrl === "light" ||
      (fromUrl !== "dark" && localStorage.getItem(STORAGE_KEY) === "light");
    setLight(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("theme-light", light);
    localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
  }, [light, mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore while the visitor is typing in the booking form.
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        el instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.shiftKey && (e.key === "L" || e.key === "l")) {
        e.preventDefault();
        setLight((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The button is a dev convenience; the keyboard shortcut still works on a
  // deployed preview so you can demo without a control visible to the client.
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <button
      type="button"
      onClick={() => setLight((v) => !v)}
      aria-label="Toggle light theme test"
      className="fixed bottom-5 left-5 z-[200] rounded-full border border-white/30 bg-black/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:border-white/60"
      style={
        light
          ? { background: "rgba(255,255,255,0.85)", color: "#14110F" }
          : undefined
      }
    >
      {light ? "Light" : "Dark"} · ⇧L
    </button>
  );
}
