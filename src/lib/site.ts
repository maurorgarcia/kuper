/** Fuente única de verdad de datos de contacto y flags (Handoff §1). */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Marcas "A validar" y bloque de pendientes: solo para revisión interna. */
export const SHOW_PENDING = process.env.NEXT_PUBLIC_SHOW_PENDING === "true";

export const WA_NUMBER = "5493512692711";
export const WA_DISPLAY = "+54 9 351 269-2711";
export const DEFAULT_WA_MESSAGE =
  "Hola, vi la página de KUPER y quisiera consultar por un turno.";

export const INSTAGRAM_URL = "https://www.instagram.com/kuper_medicina_estetica/";
export const INSTAGRAM_HANDLE = "@kuper_medicina_estetica";

const MAPS_Q = encodeURIComponent("Montevideo 45, Nueva Córdoba, Córdoba, Argentina").replace(/%20/g, "+");
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_Q}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_Q}&output=embed`;

export function waLink(message: string = DEFAULT_WA_MESSAGE, number: string = WA_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS = [
  { label: "Servicios", href: "/#tratamientos" },
  { label: "Nosotros", href: "/#doctora" },
  { label: "Turnos", href: "/#consulta" },
  { label: "Reseñas", href: "/#resenas" },
  { label: "Ubicación", href: "/#ubicacion" },
] as const;
