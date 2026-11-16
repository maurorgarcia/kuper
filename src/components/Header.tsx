"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import { WhatsAppButton } from "./Button";
import { NAV_ITEMS, waLink } from "@/lib/site";

/** Header sticky. Desktop ≥1000px: nav + CTA. Mobile: WhatsApp circular + menú desplegable. */
export function Header() {
  const [open, setOpen] = useState(false);

  // Menú abierto: bloquea el scroll de la página, cierra con Esc o al pasar a desktop.
  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1000px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prevBody;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[70] border-b border-line-200 ${
        open ? "bg-white" : "bg-white/[.86] backdrop-blur-[14px] backdrop-saturate-[1.4]"
      }`}
    >
      <div className="mx-auto flex h-[92px] min-[1000px]:h-[76px] max-w-[1240px] items-center justify-between gap-6 px-[clamp(20px,5vw,64px)]">
        <a href="/#inicio" aria-label="KUPER Medicina Estética, inicio" className="flex items-center gap-3 no-underline">
          <Image src="/assets/kuper-k-teal.png" alt="" width={54} height={34} priority className="block h-[34px] w-auto" />
          <Image src="/assets/kuper-wordmark-teal.png" alt="KUPER medicina estética" width={103} height={30} priority className="block h-[30px] w-auto" />
        </a>

        {/* Desktop */}
        <nav aria-label="Principal" className="hidden flex-none items-center gap-7 whitespace-nowrap text-[15px] tracking-[.01em] min-[1000px]:flex">
          {NAV_ITEMS.map((n) => (
            <a key={n.href} href={n.href} className="text-ink-700 no-underline hover:text-teal-700">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden flex-none min-[1000px]:block">
          <WhatsAppButton variant="primary-sm">Pedir turno</WhatsAppButton>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 min-[1000px]:hidden">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            aria-label="Pedir turno por WhatsApp"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-teal-700 text-white hover:bg-teal-700 hover:text-white"
          >
            <Icon name="whatsapp" size={20} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full border border-line-300 bg-white text-ink-900"
          >
            <Icon name={open ? "x" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal" className="absolute inset-x-0 top-full flex h-[calc(100dvh-92px)] flex-col overflow-y-auto overscroll-contain border-t border-line-200 bg-white px-[clamp(20px,5vw,64px)] pb-10 pt-6 min-[1000px]:hidden">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line-200 py-6 text-[28px] font-light leading-[1.2] tracking-[-0.01em] text-ink-900 no-underline hover:text-ink-900"
            >
              {n.label}
              <Icon name="arrow-down-right" size={22} className="text-teal-700" />
            </a>
          ))}
          <div className="mt-auto flex flex-col items-center gap-5 pt-10 text-center">
            <WhatsAppButton className="w-full justify-center">Pedir turno por WhatsApp</WhatsAppButton>
            <p className="text-[15px] leading-[1.5] text-ink-500">
              Montevideo 45, Nueva Córdoba
              <br />
              Córdoba Capital
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
