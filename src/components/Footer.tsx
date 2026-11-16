import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WA_DISPLAY, waLink } from "@/lib/site";

const COL_TITLE = "text-xs font-normal uppercase tracking-[.18em] text-teal-300";
const CONTACT_LINK = "inline-flex items-center gap-2.5 text-white no-underline hover:text-mint-200 hover:underline";

export function Footer() {
  return (
    <footer className="bg-teal-900 text-on-inverse-muted">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-[clamp(20px,5vw,64px)] pb-8 pt-[clamp(56px,8vw,88px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-9 max-sm:text-center">
          <div className="flex flex-col gap-4 max-sm:items-center">
            <Image src="/assets/kuper-logo-white.png" alt="KUPER medicina estética" width={120} height={115} className="block h-auto w-[120px]" />
          </div>

          <div className="flex flex-col gap-2.5 text-[15px] max-sm:items-center">
            <p className={COL_TITLE}>Visitanos</p>
            <p>
              Montevideo 45
              <br />
              Nueva Córdoba, Córdoba
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-[15px] max-sm:items-center">
            <p className={COL_TITLE}>Contacto</p>
            <a href={waLink()} target="_blank" rel="noopener" className={CONTACT_LINK}>
              <Icon name="whatsapp" size={18} />
              <span>
                <span className="sr-only">WhatsApp: </span>
                {WA_DISPLAY}
              </span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={CONTACT_LINK}>
              <Icon name="instagram" size={18} />
              <span>
                <span className="sr-only">Instagram: </span>
                {INSTAGRAM_HANDLE}
              </span>
            </a>
          </div>

          <nav aria-label="Secciones" className="flex flex-col gap-2.5 text-[15px] max-sm:items-center">
            <p className={COL_TITLE}>Secciones</p>
            {[
              ["Servicios", "/#tratamientos"],
              ["Nosotros", "/#doctora"],
              ["Turnos", "/#consulta"],
              ["Preguntas frecuentes", "/#preguntas"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="w-fit text-white no-underline hover:text-mint-200 hover:underline">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-footer-divider pt-6 text-[13px] max-sm:justify-center max-sm:text-center">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 max-sm:justify-center">
              <span>© KUPER Medicina Estética</span>
              <Link href="/privacidad" className="text-[13px] text-white no-underline hover:text-mint-200">
                Política de privacidad
              </Link>
            </div>
            <div className="flex items-center gap-2.5 max-sm:justify-center">
              <span>Creado por</span>
              <a href="https://webs.godreamai.com/" target="_blank" rel="noopener" className="block opacity-90 transition-opacity duration-200 hover:opacity-100">
                <Image src="/assets/gdai-logo-white.png" alt="GDAI" width={39} height={20} className="block h-5 w-auto" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
