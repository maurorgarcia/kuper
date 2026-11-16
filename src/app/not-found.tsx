import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button, WhatsAppButton } from "@/components/Button";
import { Eyebrow, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Página no encontrada · KUPER Medicina Estética",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Section bg="cream" padding="hero">
          <div className="flex min-h-[40vh] max-w-[760px] flex-col items-start justify-center gap-6 max-sm:items-center max-sm:text-center">
            <Eyebrow>Error 404</Eyebrow>
            <Heading variant="h1" title="No encontramos" highlight="esta página." />
            <p className="max-w-[32em] text-[clamp(17px,1.5vw,19px)] leading-[1.6] text-ink-700">
              Puede que el enlace haya cambiado. Volvé al inicio o escribinos por WhatsApp y te ayudamos.
            </p>
            <div className="flex w-full flex-col gap-3 min-[560px]:w-auto min-[560px]:flex-row">
              <Button href="/" variant="primary" className="justify-center">Volver al inicio</Button>
              <WhatsAppButton variant="secondary" className="justify-center">Escribir por WhatsApp</WhatsAppButton>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
