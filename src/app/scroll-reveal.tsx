"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.setAttribute("data-visible", "");
            obs.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return null;
}
