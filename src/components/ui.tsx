import type { ReactNode } from "react";
import Image from "next/image";
import { SHOW_PENDING } from "@/lib/site";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-medium uppercase tracking-[.2em] text-teal-700 ${className}`}>{children}</p>
  );
}

const HEADING = {
  h1: { tag: "h1", cls: "text-[clamp(42px,6.4vw,82px)] leading-[1.02] tracking-[-0.03em] text-ink-900", em: "text-teal-700" },
  h2: { tag: "h2", cls: "text-[clamp(32px,4.4vw,54px)] leading-[1.08] tracking-[-0.025em] text-ink-900", em: "text-teal-700" },
  cta: { tag: "h2", cls: "text-[clamp(34px,5vw,64px)] leading-[1.04] tracking-[-0.03em] text-white", em: "text-mint-200" },
} as const;

/** Título con frase destacada en Outfit 500 turquesa (no itálica). */
export function Heading({ variant = "h2", title, highlight }: { variant?: keyof typeof HEADING; title: string; highlight: string }) {
  const h = HEADING[variant];
  const Tag = h.tag;
  return (
    <Tag className={`font-light ${h.cls}`}>
      {title} <em className={`font-medium not-italic ${h.em}`}>{highlight}</em>
    </Tag>
  );
}

const BG = { white: "bg-white", cream: "bg-cream-50", mint: "bg-mint-50" } as const;
const PAD = {
  standard: "py-[clamp(64px,10vw,128px)]",
  hero: "pt-16 min-[560px]:pt-[clamp(40px,7vw,96px)] pb-[clamp(56px,8vw,112px)]",
  closing: "py-[clamp(48px,8vw,96px)]",
} as const;

/** Sección con contenedor de 1240px y gutter fluido. */
export function Section({
  id, bg = "white", padding = "standard", children, label,
}: { id?: string; bg?: keyof typeof BG; padding?: keyof typeof PAD; children: ReactNode; label?: string }) {
  return (
    <section id={id} aria-label={label} className={`${BG[bg]} ${id ? "scroll-mt-[92px] min-[1000px]:scroll-mt-[76px]" : ""}`}>
      <div className={`mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)] ${PAD[padding]}`}>{children}</div>
    </section>
  );
}

/**
 * Contenedor de imagen con radio/proporción del diseño.
 * Sin `src` muestra el placeholder (fotos reales pendientes, ver README).
 */
export function Photo({
  src, alt, label, className = "", sizes, priority,
}: { src?: string; alt: string; label: string; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-mint-100 ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes ?? "(min-width:1000px) 50vw, 100vw"} priority={priority} unoptimized={src.endsWith(".svg")} className="object-cover" />
      ) : (
        // TODO(fotos): reemplazar por <Image> real cuando la clínica entregue fotos con permisos.
        <div role="img" aria-label={alt} className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm font-medium text-ink-500">
          <span className="pointer-events-none absolute inset-0 border-[1.5px] border-dashed border-teal-300/70" aria-hidden="true" />
          <span className="max-w-[90%]">{label}</span>
        </div>
      )}
    </div>
  );
}

/** Marcas internas "A validar" — solo se renderizan con NEXT_PUBLIC_SHOW_PENDING=true. */
export function PendingChip({ children }: { children: ReactNode }) {
  if (!SHOW_PENDING) return null;
  return (
    <span className="rounded-full bg-amber-100 px-2 py-1 text-[10.5px] font-medium uppercase leading-none tracking-[.08em] text-amber-800">
      {children}
    </span>
  );
}

export function PendingNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  if (!SHOW_PENDING) return null;
  return <p className={`rounded-xl bg-amber-100 px-3.5 py-2.5 text-[13px] leading-snug text-amber-800 ${className}`}>{children}</p>;
}
