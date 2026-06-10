"use client";

import { useEffect, useRef } from "react";

export function RiceFall() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const frag = document.createDocumentFragment();
    for (let i = 0; i < 35; i++) {
      const g = document.createElement("span");
      const w = (Math.random() * 3 + 2.5).toFixed(1);
      const h = (Math.random() * 8 + 6).toFixed(1);
      g.style.cssText = [
        "position:absolute",
        "top:-20px",
        `left:${(Math.random() * 100).toFixed(1)}%`,
        `width:${w}px`,
        `height:${h}px`,
        "background:color-mix(in srgb,var(--color-ivory) 82%,var(--color-gold))",
        "border-radius:50% 50% 50% 50%/60% 60% 40% 40%",
        `opacity:${(Math.random() * 0.4 + 0.25).toFixed(2)}`,
        `animation:rice-fall ${(Math.random() * 5 + 5).toFixed(1)}s ${(Math.random() * 10).toFixed(1)}s linear infinite`,
        "will-change:transform",
        "pointer-events:none",
      ].join(";");
      frag.appendChild(g);
    }
    el.appendChild(frag);
    return () => { el.innerHTML = ""; };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
