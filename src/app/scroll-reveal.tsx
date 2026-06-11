"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { SCROLL_REVEAL_EVENT } from "@/lib/scroll-reveal-events";

function bindRevealObservers() {
  const observers: IntersectionObserver[] = [];

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.hasAttribute("data-reveal-bound")) {
      return;
    }

    el.setAttribute("data-reveal-bound", "");
    el.removeAttribute("data-visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    observers.push(observer);
  });

  return () => observers.forEach((observer) => observer.disconnect());
}

function resetRevealObservers() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    el.removeAttribute("data-visible");
    el.removeAttribute("data-reveal-bound");
  });
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup = bindRevealObservers();

    const handleReset = () => {
      cleanup();
      resetRevealObservers();
      cleanup = bindRevealObservers();
    };

    window.addEventListener(SCROLL_REVEAL_EVENT, handleReset);

    return () => {
      cleanup();
      window.removeEventListener(SCROLL_REVEAL_EVENT, handleReset);
    };
  }, [pathname]);

  return null;
}
