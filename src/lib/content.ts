/** Contenido textual de la landing (Handoff §3). Pendiente de validación por la clínica. */

export type Treatment = { name: string; description: string };
export type Category = {
  label: string;
  photoLabel: string; // texto del placeholder / encuadre requerido
  photoAlt: string;
  photoSrc?: string; // TODO(fotos): reemplazar mock por foto real
  caption: string;
  items: Treatment[];
};

export const CATEGORIES: Category[] = [
  {
    label: "Facial y piel",
    photoLabel: "Foto real: tratamiento facial en cabina",
    photoAlt: "Cabina de tratamientos faciales de KUPER",
    photoSrc: "/mock/tratamiento-0.svg",
    caption: "Cuidado de la piel con aparatología y protocolos por etapas.",
    items: [
      { name: "Limpieza facial profunda", description: "Higiene de la piel por etapas, adaptada a cada tipo de piel." },
      { name: "Dermaplaning", description: "Exfoliación superficial con técnica manual." },
      {
        name: "Manchas: IPL y Pico Second",
        description: "Tecnologías de luz y láser para abordar manchas. La opción se define en la evaluación.",
      },
    ],
  },
  {
    label: "Inyectables",
    photoLabel: "Foto real: consulta de armonización (sin paciente identificable)",
    photoAlt: "Consultorio preparado para tratamientos inyectables",
    photoSrc: "/mock/tratamiento-1.svg",
    caption: "Procedimientos médicos con indicación individual.",
    items: [
      {
        name: "Toxina botulínica",
        description: "Aplicación médica de toxina botulínica, con indicación según cada caso.",
      },
      {
        name: "Ácido hialurónico",
        description: "Rellenos para labios, rinomodelación y otras zonas del rostro.",
      },
      {
        name: "Bioestimuladores",
        description: "Productos inyectables que se indican luego de una evaluación del rostro.",
      },
    ],
  },
  {
    label: "Plasma / PRP",
    photoLabel: "Foto real: equipamiento para plasma",
    photoAlt: "Equipamiento para tratamientos con plasma",
    photoSrc: "/mock/tratamiento-2.svg",
    caption: "Plasma rico en plaquetas obtenido de una muestra de sangre propia.",
    items: [
      { name: "PRP facial", description: "Aplicación de plasma rico en plaquetas en el rostro." },
      { name: "PRP capilar", description: "Aplicación de plasma rico en plaquetas en el cuero cabelludo." },
    ],
  },
  {
    label: "Corporal",
    photoLabel: "Foto real: aparatología corporal",
    photoAlt: "Aparatología para tratamientos corporales",
    photoSrc: "/mock/tratamiento-3.svg",
    caption: "Aparatología corporal con evaluación previa.",
    items: [
      { name: "HIFU", description: "Ultrasonido focalizado para rostro, papada y zonas corporales." },
      { name: "Criolipólisis", description: "Tratamiento corporal con frío localizado." },
      { name: "Presoterapia", description: "Presión neumática secuencial con equipo específico." },
    ],
  },
  {
    label: "Láser",
    photoLabel: "Foto real: equipo de láser del consultorio",
    photoAlt: "Equipo de láser del consultorio",
    photoSrc: "/mock/tratamiento-4.svg",
    caption: "Tecnología láser para depilación y tatuajes.",
    items: [
      { name: "Depilación definitiva médica", description: "Depilación láser para mujeres y hombres." },
      {
        name: "Eliminación de tatuajes",
        description: "Tecnología Pico Second para tratar la tinta del tatuaje.",
      },
    ],
  },
];

export const STEPS = [
  { num: "01", title: "Escribinos", text: "Contanos por WhatsApp qué te gustaría consultar y coordinamos un turno." },
  { num: "02", title: "Evaluación", text: "En la consulta, la profesional conoce tu caso, tus antecedentes y lo que buscás." },
  { num: "03", title: "Indicación", text: "Si corresponde, te explica las opciones, sus cuidados y alcances antes de decidir." },
  { num: "04", title: "Seguimiento", text: "Según el tratamiento, se acuerdan controles o indicaciones posteriores." },
];

export const FAQ = [
  {
    q: "¿Cómo pido un turno?",
    a: "Escribinos por WhatsApp al +54 9 351 269-2711. Te respondemos y coordinamos día y horario.",
  },
  { q: "¿Dónde está el consultorio?", a: "En Montevideo 45, Nueva Córdoba, Córdoba Capital." },
  {
    q: "¿Necesito una consulta antes del tratamiento?",
    a: "Sí. Cada tratamiento se indica luego de una evaluación profesional de tu caso.",
  },
  {
    q: "¿Puedo consultar valores?",
    a: "Los valores dependen del tratamiento indicado. Consultanos por WhatsApp y te orientamos.",
  },
  {
    q: "¿Qué conviene contar en la consulta?",
    a: "Tus antecedentes de salud, la medicación que tomás, alergias y tratamientos estéticos previos. La profesional te indicará si hay recomendaciones particulares.",
  },
];

export const GALLERY = [
  { label: "Foto real: sala de tratamiento", alt: "Sala de tratamiento de KUPER", src: "/mock/consultorio-1.svg" },
  { label: "Foto real: recepción / ingreso", alt: "Recepción del consultorio KUPER", src: "/mock/consultorio-2.svg" },
  { label: "Foto real: detalle de la aparatología", alt: "Detalle de la aparatología del consultorio", src: "/mock/consultorio-3.svg" },
  { label: "Foto real: detalle del espacio (productos, luz natural)", alt: "Detalle del espacio con luz natural", src: "/mock/consultorio-4.svg" },
];

/** Bloque interno "Antes de publicar" (solo con SHOW_PENDING). */
export const PENDING_ITEMS = [
  { t: "Logo SVG y colores oficiales", d: "Los HEX actuales son aproximados." },
  { t: "Nombre completo, especialidad y matrícula", d: "Verificar MP 37758 y la especialidad acreditada." },
  { t: "Bio aprobada", d: "Confirmar ortografía de «tu/tú salud»." },
  { t: "WhatsApp, dirección y horarios", d: "Confirmar que el número esté operativo." },
  { t: "Tratamientos vigentes", d: "Descripciones aprobadas por la profesional." },
  { t: "Marcas comerciales", d: "Permiso para nombrar Pico Second, Sculptra, Radiesse, Soprano, etc." },
  { t: "Fotos reales", d: "11 encuadres con permisos; sin pacientes ni antes/después." },
  { t: "Perfil de Google Maps", d: "URL oficial, sin cifras hasta verificar." },
  { t: "Preguntas frecuentes", d: "Aprobación de las respuestas." },
  { t: "Política de privacidad", d: "Textos regulatorios definitivos." },
  { t: "Dominio y SEO", d: "URL canónica, imagen para redes y coordenadas." },
  { t: "URL de GDAI", d: "Para el crédito del footer (opcional)." },
];
