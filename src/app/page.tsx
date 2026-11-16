import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { RevealInit } from "@/components/RevealInit";
import { CategoryTabs } from "@/components/CategoryTabs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RatingStrip, Reviews } from "@/components/Reviews";
import reviewsData from "@/data/reviews.json";
import { Button, WhatsAppButton } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { Eyebrow, Heading, PendingChip, PendingNote, Photo, Section } from "@/components/ui";
import { CATEGORIES, FAQ, GALLERY, PENDING_ITEMS, STEPS } from "@/lib/content";
import {
  INSTAGRAM_HANDLE, INSTAGRAM_URL, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL,
  SHOW_PENDING, WA_DISPLAY, waLink,
} from "@/lib/site";

// JSON-LD: solo datos confirmados (sin aggregateRating, horarios, geo ni precios).
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "KUPER Medicina Estética",
  telephone: "+5493512692711",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Montevideo 45",
    addressLocality: "Córdoba",
    addressRegion: "Córdoba",
    addressCountry: "AR",
  },
  areaServed: "Nueva Córdoba, Córdoba",
  sameAs: [INSTAGRAM_URL],
};

const REVIEWS_URL = reviewsData.placeUrl ?? MAPS_DIRECTIONS_URL;

type ContactRow = { icon: IconName; primary: string; href?: string; secondary?: string; pending?: string };
const CONTACT_ROWS: ContactRow[] = [
  { icon: "map-pin", primary: "Montevideo 45", secondary: "Nueva Córdoba, Córdoba Capital" },
  { icon: "whatsapp", primary: WA_DISPLAY, href: waLink(), secondary: "Turnos y consultas por WhatsApp" },
  { icon: "instagram", primary: INSTAGRAM_HANDLE, href: INSTAGRAM_URL, secondary: "Novedades en Instagram" },
  { icon: "clock", primary: "Horarios: consultá por WhatsApp", pending: "Horario a confirmar" },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <a
        href="#contenido"
        className="absolute -top-[60px] left-3 z-[100] rounded-full bg-teal-800 px-4 py-2.5 text-sm text-white no-underline focus:top-3 hover:text-white"
      >
        Saltar al contenido
      </a>
      <Header />

      <main id="contenido">
        {/* 1 · INICIO */}
        <Section id="inicio" bg="cream" padding="hero">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(40px,6vw,88px)]">
            <div data-reveal="" className="flex flex-col gap-7 max-sm:items-center max-sm:text-center">
              <Heading variant="h1" title="Cuidarte, con" highlight="criterio profesional." />
              <p className="max-w-[30em] text-[clamp(17px,1.5vw,19px)] leading-[1.6] text-ink-700">
                Conocé nuestros tratamientos y consultanos para recibir orientación según tu caso.
              </p>
              <div className="flex flex-col gap-3 min-[560px]:flex-row min-[560px]:flex-wrap">
                <WhatsAppButton className="justify-center">Consultar por WhatsApp</WhatsAppButton>
                <Button href="#tratamientos" variant="secondary" className="justify-center">Ver tratamientos</Button>
              </div>
            </div>

            <div data-reveal="" className="relative">
              <Photo
                priority
                src="/images/hero.jpg"
                label="Foto real: la doctora en el consultorio (retrato autorizado)"
                alt="Sala de tratamiento luminosa con camilla blanca y ventana"
                className="aspect-[4/5] max-h-[680px] w-full rounded-[28px_28px_28px_200px]"
              />
              <div className="pointer-events-none absolute right-[clamp(12px,3vw,-24px)] top-[clamp(16px,4vw,40px)] flex aspect-square w-[clamp(84px,10vw,120px)] items-center justify-center rounded-full bg-teal-700 shadow-medallion">
                <Image src="/assets/kuper-k-white.png" alt="" width={970} height={610} className="block h-auto w-[62%]" />
              </div>
            </div>
          </div>
        </Section>

        {/* 1b · FRANJA DE CONFIANZA (doctora + calificación real de Google) */}
        <RatingStrip reviewsUrl={REVIEWS_URL} />

        {/* 2 · SERVICIOS */}
        <Section id="tratamientos" bg="white">
          <div data-reveal="" className="mb-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-6">
            <div className="flex flex-col gap-[18px] max-sm:items-center max-sm:text-center">
              <Eyebrow>Servicios</Eyebrow>
              <Heading title="Cada piel y cada objetivo merecen" highlight="atención personalizada." />
            </div>
            <div className="flex flex-col items-start gap-3 max-sm:items-center max-sm:text-center">
              <p className="max-w-[32em] text-ink-500">
                Una selección de los tratamientos que se realizan en KUPER. La indicación se define siempre en la consulta, según tu caso.
              </p>
              {SHOW_PENDING && (
                <span className="rounded-full bg-amber-100 px-2.5 py-[5px] text-[11px] font-medium uppercase leading-[1.2] tracking-[.08em] text-amber-800">
                  Selección y descripciones a aprobar por la profesional
                </span>
              )}
            </div>
          </div>
          <CategoryTabs categories={CATEGORIES} />
        </Section>

        {/* 3 · NOSOTROS · LA DOCTORA */}
        <Section id="doctora" bg="mint">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(40px,7vw,104px)]">
            <div data-reveal="" className="mx-auto w-full max-w-[500px]">
              <Photo
                src="/images/doctora.jpg"
                label="Foto real: retrato profesional de la Dra. Eve Kuperstein"
                alt="Escritorio de consulta con luz natural"
                className="aspect-[4/5] rounded-[999px_999px_28px_28px] border border-mint-200"
                sizes="(min-width:1000px) 40vw, 90vw"
              />
            </div>
            <div data-reveal="" className="flex flex-col gap-6 max-sm:items-center max-sm:text-center">
              <Eyebrow>Nosotros · La doctora</Eyebrow>
              <Heading title="Medicina estética con un" highlight="enfoque cercano." />
              <div className="flex flex-col gap-1.5 border-y border-line-300 py-5">
                <p className="text-[27px] font-normal leading-[1.2] text-ink-900">Dra. Eve Kuperstein</p>
                <p className="flex flex-wrap items-center gap-2 text-[15px] text-ink-500 max-sm:justify-center">
                  Matrícula profesional MP 37758
                  <PendingChip>Verificar matrícula y especialidad</PendingChip>
                </p>
              </div>
              <blockquote className="m-0 text-[clamp(21px,2.1vw,26px)] font-light leading-[1.4] text-teal-800">
                «¡Cuidamos tu estética, pero sobre todo tu salud!»
              </blockquote>
              <p className="max-w-[34em]">
                En KUPER cada tratamiento empieza por una consulta: escuchar qué te gustaría mejorar, evaluar tu caso y explicarte las opciones con claridad antes de decidir.
              </p>
              <PendingNote>
                Frase tomada de la biografía de Instagram (confirmar «tu/tú»). Texto de presentación propuesto: reemplazar por la bio aprobada por la doctora. Formación y congresos solo se publican si la clínica los confirma.
              </PendingNote>
              <div className="max-sm:flex max-sm:justify-center">
                <WhatsAppButton variant="outline" icon="arrow-up-right" iconPosition="end">
                  Pedir una consulta
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </Section>

        {/* 4 · TURNOS · CÓMO ES LA CONSULTA */}
        <Section id="consulta" bg="white">
          <div data-reveal="" className="mb-[clamp(40px,6vw,72px)] flex max-w-[760px] flex-col gap-[18px] max-sm:items-center max-sm:text-center">
            <Eyebrow>Turnos · Cómo es la consulta</Eyebrow>
            <Heading title="Primero te escuchamos." highlight="Después, decidimos juntos." />
          </div>
          <ol data-reveal="" className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-x-8 p-0">
            {STEPS.map((s) => (
              <li key={s.num} className="flex flex-col max-sm:items-center max-sm:text-center gap-3.5 border-t border-line-300 pb-9 pt-7">
                <span aria-hidden="true" className="text-[56px] font-extralight leading-none tracking-[-0.04em] text-teal-600">{s.num}</span>
                <h3 className="text-[23px] font-normal leading-[1.2] tracking-[-0.01em] text-ink-900">{s.title}</h3>
                <p className="text-base text-ink-500">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* 5 · EL CONSULTORIO */}
        <Section id="consultorio" bg="cream">
          <div data-reveal="" className="mb-[clamp(32px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-5">
            <div className="flex flex-col gap-[18px] max-sm:items-center max-sm:text-center">
              <Eyebrow>El consultorio</Eyebrow>
              <Heading title="Un espacio luminoso," highlight="en Nueva Córdoba." />
            </div>
            <p className="max-w-[30em] text-ink-500">
              Te esperamos en Montevideo 45, Nueva Córdoba. Coordiná tu visita por WhatsApp.
            </p>
          </div>
          {/* Mosaico ≥1000px; grilla 2 columnas debajo. Una sola esquina grande (foto 3). */}
          <div data-reveal="" className="grid grid-cols-2 gap-2.5 min-[1000px]:grid-cols-[1.35fr_1fr_1fr] min-[1000px]:grid-rows-[280px_280px] min-[1000px]:gap-4">
            <Photo {...GALLERY[0]} label={GALLERY[0].label} className="col-span-2 aspect-[4/3] rounded-[20px] min-[1000px]:col-span-1 min-[1000px]:row-span-2 min-[1000px]:aspect-auto min-[1000px]:rounded-[24px]" />
            <Photo {...GALLERY[1]} className="aspect-square rounded-[20px] min-[1000px]:aspect-auto min-[1000px]:rounded-[24px]" />
            <Photo {...GALLERY[2]} className="aspect-square rounded-[20px_72px_20px_20px] min-[1000px]:aspect-auto min-[1000px]:rounded-[24px_120px_24px_24px]" />
            <Photo {...GALLERY[3]} className="col-span-2 aspect-video rounded-[20px] min-[1000px]:aspect-auto min-[1000px]:rounded-[24px]" />
          </div>
          <PendingNote className="mt-4 !bg-transparent !p-0">Usar solo fotos propias del consultorio, sin pacientes identificables.</PendingNote>
        </Section>

        {/* 5b · RESEÑAS DE GOOGLE (datos reales vía Apify; se oculta si no hay reseñas) */}
        <Reviews reviewsUrl={REVIEWS_URL} />

        {/* 6 · PREGUNTAS FRECUENTES */}
        <Section id="preguntas" bg="white">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-[clamp(32px,6vw,96px)]">
            <div data-reveal="" className="flex flex-col items-start gap-[18px] max-sm:items-center max-sm:text-center">
              <Eyebrow>Preguntas frecuentes</Eyebrow>
              <Heading title="Antes de" highlight="tu primera visita." />
              <p className="max-w-[26em]">¿Tenés otra duda? Escribinos y te respondemos por WhatsApp.</p>
              {SHOW_PENDING && (
                <span className="rounded-full bg-amber-100 px-2.5 py-[5px] text-[11px] font-medium uppercase leading-[1.2] tracking-[.08em] text-amber-800">
                  Respuestas a revisar por la clínica
                </span>
              )}
            </div>
            <div data-reveal="">
              <FAQAccordion items={FAQ} defaultOpen={null} />
            </div>
          </div>
        </Section>

        {/* 7 · UBICACIÓN */}
        <Section id="ubicacion" bg="mint">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-stretch gap-[clamp(32px,5vw,64px)]">
            <div data-reveal="" className="flex flex-col items-start gap-7 max-sm:items-center max-sm:text-center">
              <div className="flex flex-col gap-[18px] max-sm:items-center max-sm:text-center">
                <Eyebrow>Ubicación</Eyebrow>
                <Heading title="Visitanos en" highlight="Nueva Córdoba." />
              </div>
              <address className="flex w-full flex-col border-t border-line-300 not-italic">
                {CONTACT_ROWS.map((r) => (
                  <div key={r.icon} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3.5 border-b border-line-300 py-[18px] max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-2 max-sm:text-center">
                    <Icon name={r.icon} size={20} className="mt-[3px] text-teal-700" />
                    <div className={r.pending ? "flex flex-wrap items-center gap-2 max-sm:justify-center" : ""}>
                      {r.href ? (
                        <a href={r.href} target="_blank" rel="noopener" className="text-ink-900 no-underline hover:text-teal-700 hover:underline">
                          {r.primary}
                        </a>
                      ) : (
                        <p className="text-ink-900">{r.primary}</p>
                      )}
                      {r.secondary && <p className="text-[15px] text-ink-500">{r.secondary}</p>}
                      {r.pending && <PendingChip>{r.pending}</PendingChip>}
                    </div>
                  </div>
                ))}
              </address>
              {SHOW_PENDING && (
                <div className="grid w-full grid-cols-[28px_minmax(0,1fr)] gap-3.5 rounded-[14px] border border-dashed border-amber-border bg-amber-bg p-4">
                  <Icon name="star" size={20} className="mt-[3px] text-amber-800" />
                  <div>
                    <p className="text-ink-900">Reseñas en Google</p>
                    <p className="text-sm text-amber-800">
                      Espacio reservado para el enlace al perfil oficial de Google Maps, sin cifras. Se activa cuando la clínica confirme el perfil.
                    </p>
                  </div>
                </div>
              )}
              <Button href={MAPS_DIRECTIONS_URL} variant="outline" icon="navigation" external>
                Cómo llegar
              </Button>
            </div>

            <div data-reveal="" className="relative min-h-[380px] overflow-hidden rounded-[24px] border border-mint-200 bg-mint-100">
              <iframe
                title="Mapa: KUPER Medicina Estética, Montevideo 45, Nueva Córdoba"
                src={MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:saturate(.75)]"
              />
            </div>
          </div>
        </Section>

        {/* 8 · CIERRE (CTA) */}
        <Section bg="white" padding="closing" label="Contacto">
          <div
            data-reveal=""
            className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-8 overflow-hidden rounded-[clamp(24px,3vw,32px)] bg-teal-800 px-[clamp(24px,6vw,88px)] py-[clamp(40px,7vw,96px)] max-sm:text-center"
          >
            <Image
              src="/assets/kuper-k-white.png"
              alt=""
              width={970}
              height={610}
              className="pointer-events-none absolute -bottom-[18%] -right-[6%] h-auto w-[min(560px,70%)] opacity-[.07]"
            />
            <div className="relative">
              <Heading variant="cta" title="¿Querés saber por dónde empezar?" highlight="Hablemos." />
            </div>
            <div className="relative flex flex-col items-start gap-6 max-sm:items-center max-sm:text-center">
              <p className="max-w-[26em] text-on-inverse-muted">
                Escribinos por WhatsApp y coordinamos una consulta para evaluar tu caso.
              </p>
              <WhatsAppButton variant="inverse">Consultar por WhatsApp</WhatsAppButton>
            </div>
          </div>
        </Section>

        {/* 9 · PENDIENTES (solo revisión interna) */}
        {SHOW_PENDING && (
          <Section bg="white" padding="closing" label="Pendientes">
            <div className="rounded-[20px] border border-dashed border-amber-border bg-amber-bg p-[clamp(24px,4vw,40px)]">
              <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="text-[30px] font-normal leading-[1.1] text-ink-900">Antes de publicar · para KUPER</p>
                <p className="text-[13px] text-amber-800">Bloque interno. Se oculta desactivando «Mostrar pendientes».</p>
              </div>
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-8 gap-y-2.5 p-0">
                {PENDING_ITEMS.map((p) => (
                  <li key={p.t} className="flex items-start gap-3 border-b border-amber-line pb-2.5 text-[15px]">
                    <span aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 flex-none rounded-[4px] border-[1.5px] border-amber-check" />
                    <span>
                      <b className="font-medium text-ink-900">{p.t}.</b> {p.d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
      <RevealInit />
    </>
  );
}
