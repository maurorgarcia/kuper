import data from "@/data/reviews.json";
import { Icon } from "@/components/Icon";
import { PendingChip, Eyebrow, Heading, Section } from "@/components/ui";

type Review = {
  id: string; author: string; stars: number; text: string;
  date: string | null; url: string | null; localGuide: boolean;
};

const reviews = data.reviews as Review[];
const rating = data.rating as number | null;
const total = data.total as number | null;
const hasData = reviews.length > 0 && rating !== null && total !== null;

/** Cantidad de reseñas que se muestran en la sección (el JSON guarda más). */
const SHOWN = 3;

const ratingFmt = new Intl.NumberFormat("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const dateFmt = new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric" });

const STAR_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  const full = Math.round(n);
  return (
    <span className="flex gap-0.5 text-amber-check" role="img" aria-label={`${ratingFmt.format(n)} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
          fill={i <= full ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

/** "María Laura Rodrigez" → "María R." (solo nombre + inicial del apellido). */
function shortName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`;
}
function initials(full: string) {
  const parts = full.trim().split(/\s+/);
  return (parts[0].charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "")).toUpperCase();
}

/** Franja bajo el hero: identidad de la doctora + calificación real en Google. */
export function RatingStrip({ reviewsUrl }: { reviewsUrl: string }) {
  return (
    <div className="border-b border-line-200 bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-10 gap-y-6 px-[clamp(20px,5vw,64px)] py-8 max-sm:flex-col max-sm:text-center">
        <div className="flex flex-col gap-1">
          <p className="text-[clamp(24px,2.6vw,30px)] font-normal leading-[1.15] text-ink-900">Dra. Eve Kuperstein</p>
          <p className="text-[15px] text-teal-700">Medicina Estética · Nueva Córdoba</p>
        </div>
        <dl className="m-0 flex flex-wrap items-stretch gap-y-5 max-sm:grid max-sm:w-full max-sm:grid-cols-2 max-sm:gap-x-4">
          <div className="flex items-start gap-3 pr-8 max-sm:flex-col max-sm:items-center max-sm:gap-0 max-sm:pr-0 max-sm:text-center">
            <Icon name="map-pin" size={18} className="mt-1 text-teal-700 max-sm:hidden" />
            <div>
              <dt className="sr-only">Consultorio</dt>
              <dd className="m-0 text-[17px] leading-tight text-ink-900">Montevideo 45</dd>
              <dd className="m-0 text-sm text-ink-500">Nueva Córdoba, Córdoba</dd>
            </div>
          </div>
          <div className="flex items-start gap-3 border-l border-line-200 px-8 max-sm:justify-center max-sm:px-0 max-sm:text-center">
            <div>
              <dt className="sr-only">Matrícula</dt>
              <dd className="m-0 flex items-center gap-2 text-[17px] leading-tight text-ink-900 max-sm:justify-center">
                MP 37758 <PendingChip>A validar</PendingChip>
              </dd>
              <dd className="m-0 text-sm text-ink-500">Matrícula profesional</dd>
            </div>
          </div>
          {hasData && (
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener"
              className="flex items-start gap-3 border-l border-line-200 pl-8 no-underline max-sm:order-first max-sm:col-span-2 max-sm:items-center max-sm:justify-center max-sm:rounded-full max-sm:border max-sm:border-line-200 max-sm:bg-cream-50 max-sm:px-5 max-sm:py-2.5"
            >
              <Icon name="star" size={18} className="mt-1 fill-amber-check text-amber-check max-sm:mt-0" />
              <div className="max-sm:flex max-sm:items-baseline max-sm:gap-2">
                <dt className="sr-only">Calificación en Google</dt>
                <dd className="m-0 text-[17px] leading-tight text-ink-900">{ratingFmt.format(rating!)}★</dd>
                <dd className="m-0 text-sm text-ink-500">en Google · {total} reseñas</dd>
              </div>
            </a>
          )}
        </dl>
      </div>
    </div>
  );
}

/** Sección "Reseñas": reseñas reales de Google (snapshot de `npm run reviews`). Sin datos, no renderiza. */
export function Reviews({ reviewsUrl }: { reviewsUrl: string }) {
  if (!hasData) return null;
  return (
    <Section id="resenas" bg="mint">
      <div data-reveal="" className="mb-[clamp(36px,5vw,56px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-6 max-sm:flex-col max-sm:items-center max-sm:text-center">
        <div className="flex flex-col gap-[18px] max-sm:items-center">
          <Eyebrow>Reseñas de Google</Eyebrow>
          <Heading title="Lo que cuentan quienes" highlight="nos eligieron." />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[clamp(56px,7vw,84px)] font-light leading-none tracking-[-0.04em] text-ink-900">
            {ratingFmt.format(rating!)}
          </span>
          <div className="flex flex-col gap-1.5">
            <Stars n={rating!} size={18} />
            <span className="text-sm text-ink-500">{total} reseñas en Google</span>
          </div>
        </div>
      </div>

      <ul data-reveal="" className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-6 gap-y-12 p-0 pt-7">
        {reviews.slice(0, SHOWN).map((r) => (
          <li key={r.id} className="relative flex flex-col items-center gap-4 rounded-[24px] border border-mint-200 bg-white px-7 pb-7 pt-12 text-center">
            <span
              aria-hidden="true"
              className="absolute -top-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-mint-50 bg-mint-100 text-lg font-medium text-teal-700"
            >
              {initials(r.author)}
            </span>
            <Stars n={r.stars} />
            <blockquote className="m-0 text-[15.5px] leading-[1.65] text-ink-700">«{r.text}»</blockquote>
            <footer className="mt-auto pt-2">
              <p className="text-[15px] font-medium text-ink-900">{shortName(r.author)}</p>
              <p className="text-[13px] text-ink-500">Google{r.date ? ` · ${dateFmt.format(new Date(r.date))}` : ""}</p>
            </footer>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-teal-700 no-underline hover:underline"
        >
          Leer las {total} reseñas en Google <Icon name="arrow-up-right" size={16} />
        </a>
      </div>
    </Section>
  );
}
