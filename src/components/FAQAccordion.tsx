"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** Acordeón accesible: cerrado por defecto, un panel abierto por vez. */
export function FAQAccordion({ items, defaultOpen = null }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-line-300">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="border-b border-line-300">
            <h3 className="m-0 font-normal">
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-6 text-left max-sm:pl-[52px] text-[clamp(18px,1.7vw,21px)] font-normal leading-[1.35] text-ink-900 transition-colors duration-200 hover:text-teal-700"
              >
                <span className="max-sm:flex-1 max-sm:text-center">{it.q}</span>
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line-300 text-teal-700">
                  <Icon name={isOpen ? "minus" : "plus"} size={16} />
                </span>
              </button>
            </h3>
            <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!isOpen} className="pb-[26px] pr-14 text-base text-ink-700 max-sm:px-2 max-sm:text-center">
              {it.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
