"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./Icon";
import { Photo } from "./ui";
import { waLink } from "@/lib/site";
import type { Category } from "@/lib/content";

/** Pestañas de tratamientos (patrón ARIA tabs, con flechas ←/→, Home y End). */
export function CategoryTabs({ categories, defaultIndex = 0 }: { categories: Category[]; defaultIndex?: number }) {
  const [active, setActive] = useState(defaultIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cat = categories[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = categories.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Categorías de tratamientos"
        className="-mx-0.5 flex gap-2 overflow-x-auto px-0.5 pb-[18px] pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${i}`}
              aria-selected={on}
              aria-controls="panel-tratamientos"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`h-11 flex-none cursor-pointer rounded-full border px-5 text-[15px] transition-[background-color,border-color,color] duration-200 ease-kuper ${
                on
                  ? "border-teal-700 bg-teal-700 font-medium text-white"
                  : "border-line-200 bg-white text-ink-700 hover:border-teal-300 hover:bg-mint-50"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="panel-tratamientos"
        aria-labelledby={`tab-${active}`}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-[clamp(32px,5vw,72px)] pt-[clamp(16px,3vw,32px)]"
      >
        <ol className="m-0 list-none p-0">
          {cat.items.map((t, i) => (
            <li key={t.name} className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 gap-y-1 border-t border-line-200 py-7">
              <span aria-hidden="true" className="row-span-3 pt-[5px] text-[15px] font-medium leading-[1.3] tracking-[.08em] text-teal-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-start-2 text-[clamp(22px,2.1vw,26px)] font-normal leading-[1.2] tracking-[-0.01em] text-ink-900">{t.name}</h3>
              <p className="col-start-2 text-base text-ink-500">{t.description}</p>
              <a
                href={waLink(`Hola, vi la página de KUPER y quisiera consultar por ${t.name}.`)}
                target="_blank"
                rel="noopener"
                aria-label={`Consultar por ${t.name} en WhatsApp`}
                className="col-start-2 mt-2 inline-flex w-fit items-center gap-1.5 text-[15px] font-medium text-teal-700 no-underline hover:text-teal-800 hover:underline"
              >
                Consultar <Icon name="arrow-up-right" size={15} />
              </a>
            </li>
          ))}
        </ol>

        <figure className="m-0">
          <Photo src={cat.photoSrc} label={cat.photoLabel} alt={cat.photoAlt} className="aspect-[5/4] rounded-[24px]" sizes="(min-width:1000px) 45vw, 100vw" />
          <figcaption className="mt-3.5 text-[13px] text-ink-500">{cat.caption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
