"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { waLink } from "@/lib/site";

/**
 * Botón flotante de WhatsApp (58×58, fijo).
 * Desktop: siempre visible. Mobile (<1000px): aparece al pasar el hero, porque el
 * header ya tiene su botón de WhatsApp y arriba se superponía con el medallón K.
 */
export function FloatingWhatsApp() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Consultar por WhatsApp"
      className={`fixed bottom-[clamp(16px,3vw,28px)] right-[clamp(16px,3vw,28px)] z-[60] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-teal-700 text-white shadow-float transition-[background-color,transform,opacity] duration-200 ease-kuper hover:-translate-y-0.5 hover:bg-teal-800 hover:text-white ${
        past ? "" : "max-[999px]:pointer-events-none max-[999px]:translate-y-2 max-[999px]:opacity-0"
      }`}
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
