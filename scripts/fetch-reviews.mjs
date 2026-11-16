/**
 * Descarga las reseñas reales de Google Maps con Apify y las guarda en
 * src/data/reviews.json (snapshot que se commitea; el token NUNCA llega al sitio).
 *
 * Uso:  npm run reviews
 * Requiere en .env.local:
 *   APIFY_TOKEN=apify_api_xxx
 *   GOOGLE_MAPS_PLACE_URL=https://www.google.com/maps/place/...   (URL del perfil de la clínica)
 * Opcionales: REVIEWS_MIN_STARS (def. 4), REVIEWS_MAX (def. 60), REVIEWS_KEEP (def. 9)
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const { APIFY_TOKEN, GOOGLE_MAPS_PLACE_URL } = process.env;
const MIN_STARS = Number(process.env.REVIEWS_MIN_STARS ?? 4);
const MAX = Number(process.env.REVIEWS_MAX ?? 60);
const KEEP = Number(process.env.REVIEWS_KEEP ?? 9);
const ACTOR = process.env.APIFY_ACTOR ?? "compass~google-maps-reviews-scraper";

if (!APIFY_TOKEN || !GOOGLE_MAPS_PLACE_URL) {
  console.error("Faltan APIFY_TOKEN y/o GOOGLE_MAPS_PLACE_URL en .env.local");
  process.exit(1);
}

const endpoint = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?format=json&clean=true`;
console.log(`Ejecutando ${ACTOR} (puede tardar 1-3 min)…`);

const res = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${APIFY_TOKEN}` },
  body: JSON.stringify({
    startUrls: [{ url: GOOGLE_MAPS_PLACE_URL }],
    maxReviews: MAX,
    reviewsSort: "newest",
    language: "es",
    reviewsOrigin: "google",
    personalData: true,
  }),
});

if (!res.ok) {
  console.error(`Apify respondió ${res.status}: ${(await res.text()).slice(0, 500)}`);
  process.exit(1);
}

const items = await res.json();
if (!Array.isArray(items) || items.length === 0) {
  console.error("Apify no devolvió reseñas. Revisá la URL del perfil.");
  process.exit(1);
}

const clean = (s) => (typeof s === "string" ? s.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim() : "");

const reviews = items
  .map((r) => ({
    id: r.reviewId ?? r.reviewUrl ?? `${r.name}-${r.publishedAtDate}`,
    author: clean(r.name) || "Usuario de Google",
    stars: Number(r.stars) || 0,
    // Texto original del autor; nunca la traducción automática.
    text: clean(r.originalLanguage && r.originalLanguage !== "es" ? r.text ?? r.textTranslated : r.text ?? r.textTranslated),
    date: r.publishedAtDate ?? null,
    url: r.reviewUrl ?? null,
    localGuide: Boolean(r.isLocalGuide),
  }))
  .filter((r) => r.stars >= MIN_STARS && r.text.length >= 25)
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
  .slice(0, KEEP);

const first = items[0];
const out = {
  fetchedAt: new Date().toISOString(),
  placeUrl: GOOGLE_MAPS_PLACE_URL,
  rating: typeof first.totalScore === "number" ? first.totalScore : null,
  total: typeof first.reviewsCount === "number" ? first.reviewsCount : null,
  reviews,
};

const file = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/reviews.json");
await mkdir(dirname(file), { recursive: true });
await writeFile(file, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`OK: ${reviews.length} reseñas guardadas de ${items.length} descargadas → src/data/reviews.json`);
