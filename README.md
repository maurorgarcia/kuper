# KUPER Medicina Estética — landing (Next.js 15 + Tailwind 4)

Reconstrucción 1:1 de `design_export/Handoff Landing KUPER.md`.

```bash
npm install
npm run dev      # desarrollo
npm run build    # producción (Vercel lo ejecuta solo)
```

Variables (ver `.env.example`): `NEXT_PUBLIC_SITE_URL` (dominio final), `NEXT_PUBLIC_SHOW_PENDING` (`true` muestra marcas "A validar" y el bloque de pendientes; en producción `false`).

- Tokens: `src/app/globals.css` (`@theme`). Contacto/flags: `src/lib/site.ts`. Textos: `src/lib/content.ts`.

## Pendiente / mockup
- **Fotos (11 encuadres)**: hoy placeholders (`Photo` sin `src`). Pasar `src` con imágenes autorizadas (WebP/AVIF; hero con `priority`).
- Logo SVG y HEX oficiales (los actuales son aproximados).
- Dominio: `NEXT_PUBLIC_SITE_URL`, canonical, `og:image` 1200×630, coordenadas geo.
- Matrícula, especialidad, bio («tu/tú salud»), tratamientos, FAQ, horarios y política de privacidad: validar con la clínica.
- Enlace a Google Maps / reseñas (sin cifras). URL de GDAI en el footer (TODO en `Footer.tsx`).
- `npm audit`: aviso de postcss embebido en Next 15 (build-time); se resuelve al actualizar Next.
