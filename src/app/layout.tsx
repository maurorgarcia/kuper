import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

// Outfit (única familia). El peso 200 se usa solo en los numerales del proceso.
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
  variable: "--font-outfit",
});

const TITLE = "KUPER Medicina Estética · Nueva Córdoba, Córdoba";
const DESCRIPTION =
  "KUPER Medicina Estética, consultorio de la Dra. Eve Kuperstein en Montevideo 45, Nueva Córdoba. Tratamientos faciales, inyectables, plasma, corporales y láser. Consultas por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" }, // TODO(dominio): confirmar URL canónica final
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "KUPER Medicina Estética",
    title: "KUPER Medicina Estética · Nueva Córdoba",
    description: "Medicina estética en Nueva Córdoba. Consultanos por WhatsApp para recibir orientación según tu caso.",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  other: { "geo.region": "AR-X", "geo.placename": "Córdoba" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={outfit.variable}>
      {/* suppressHydrationWarning: extensiones del navegador (ej. ColorZilla) inyectan atributos en <body> */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
