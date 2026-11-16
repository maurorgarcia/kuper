"use client";

import { useEffect } from "react";

/**
 * Aparición al hacer scroll (Handoff §5). Los bloques `[data-reveal]` que están
 * fuera de pantalla al cargar se ocultan y se muestran una sola vez al entrar al
 * viewport. Lo visible al cargar no se anima. Respeta prefers-reduced-motion.
 */
export function RevealInit() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    const pending = els.filter((el) => el.getBoundingClientRect().top >= vh);
    pending.forEach((el) => el.setAttribute("data-reveal", "hidden"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-reveal", "shown");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
