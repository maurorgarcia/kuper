import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Button, WhatsAppButton } from "@/components/Button";
import { Eyebrow, Heading, PendingChip, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Política de privacidad · KUPER Medicina Estética",
  description: "Cómo trata el sitio de KUPER Medicina Estética tus datos: sin formularios, con consultas por WhatsApp.",
  alternates: { canonical: "/privacidad" },
};

// TODO(legal): reemplazar por el texto definitivo aprobado por la clínica.
const SECTIONS = [
  {
    title: "Datos personales",
    text: "Este sitio es informativo y no solicita ni almacena datos personales mediante formularios. Las consultas se realizan por WhatsApp, cuyo uso se rige por las condiciones de ese servicio.",
  },
  {
    title: "Mapa de ubicación",
    text: "El mapa de ubicación es provisto por Google Maps, que puede registrar datos de navegación según sus propias políticas.",
  },
  {
    title: "Información de salud",
    text: "Te pedimos no enviar información médica sensible por mensaje: los detalles de tu salud se conversan en la consulta. Para cualquier duda sobre el uso de tus datos, escribinos por WhatsApp.",
  },
];

export default function Privacidad() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Section bg="cream" padding="hero">
          <div className="flex max-w-[760px] flex-col items-start gap-6 max-sm:items-center max-sm:text-center">
            <Eyebrow>Legal</Eyebrow>
            <Heading variant="h1" title="Política de" highlight="privacidad." />
            <p className="max-w-[32em] text-[clamp(17px,1.5vw,19px)] leading-[1.6] text-ink-700">
              Tu privacidad importa. Esto es lo que necesitás saber sobre cómo funciona este sitio.
            </p>
            <PendingChip>Texto provisorio · a validar</PendingChip>
          </div>
        </Section>

        <Section bg="white">
          <ol className="m-0 list-none border-b border-line-300 p-0">
            {SECTIONS.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-[clamp(32px,6vw,96px)] gap-y-3 border-t border-line-300 py-9"
              >
                <div className="flex items-baseline gap-5 max-sm:flex-col max-sm:items-center max-sm:gap-1 max-sm:text-center">
                  <span aria-hidden="true" className="text-[15px] font-medium tracking-[.08em] text-teal-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[clamp(22px,2.1vw,26px)] font-normal leading-[1.2] tracking-[-0.01em] text-ink-900">{s.title}</h2>
                </div>
                <p className="max-w-[36em] text-base text-ink-700 max-sm:text-center">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col gap-3 min-[560px]:flex-row min-[560px]:flex-wrap">
            <WhatsAppButton className="justify-center">Consultar por WhatsApp</WhatsAppButton>
            <Button href="/" variant="secondary" className="justify-center">Volver al inicio</Button>
          </div>
        </Section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
