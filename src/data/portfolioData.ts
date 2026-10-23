import orbitaPreview from '../assets/images/orbita-studio.png';
import senalPreview from '../assets/images/senal-agency.png';
import kortexPreview from '../assets/images/kortex-records.png';
import nexusGamesPreview from '../assets/images/nexus-games.png';
import pulsePreview from '../assets/images/pulse-analytics.png';
import cinemaxPreview from '../assets/images/cinemax-pro.png';
import tonoPreview from '../assets/images/tono.png';
import photo from '../assets/images/foto.png';

export interface Project {
  id: string;
  year: number; // Editable: año del proyecto
  title: string;
  type: string;
  link?: string;
  codeLink?: string;
  description: string;
  featured: boolean;
  category: 'web' | 'saas' | 'motion' | 'data';
  tags: string[];
  spec: string;
  image?: string;
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  status: string;
  grade?: string;
  description?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: number;
}

export interface StackCategory {
  title: string;
  index: string;
  subtitle: string;
  skills: string[];
}

export const PORTFOLIO_INFO = {
  name: "JUAN MORENO TREZZA",
  initials: "JMT",
  shortRole: "DEV // AR",
  role: "FRONTEND DEVELOPER",
  email: "jgmorenotrezza@gmail.com",
  status: "DISPONIBLE PARA TRABAJAR", // Sin trimestres
  location: "BUENOS AIRES [34.6037° S, 58.3816° W]",
  locationShort: "34.6037° S, 58.3816° W · ARGENTINA",
  heroSubtitle:
    "Desarrollador Frontend de Buenos Aires. Diseño y construyo sitios con React y TypeScript, con foco en interfaces cuidadas y motion guiado por el scroll.",
  heroStrip: "FRONTEND DEVELOPER · REACT · TYPESCRIPT · MOTION",
  manifesto:
    "Me gusta construir interfaces donde el diseño y el código se cuidan por igual: tipografía, ritmo y movimiento al servicio de una buena experiencia.",
  folioIndex: "INDEX FOLIO 04.26",
  // CV en public/: se abre directo en el navegador
  cvUrl: `${import.meta.env.BASE_URL}CV_Juan_Moreno_Trezza.pdf`,
  photoUrl: photo,
  links: {
    github: "https://github.com/JuanTrezza",
    linkedin: "https://www.linkedin.com/in/juanmorenotrezza",
    behance: "https://www.behance.net/juanmorenotrezza",
  },
};

export const EDUCATION_LIST: Education[] = [
  {
    title: "Tecnicatura en Ciencia de Datos e IA",
    institution: "ISTEA",
    period: "2026",
    status: "En curso",
    description:
      "Análisis de datos con Python, Power BI y bases de datos; minería de datos y modelos analíticos.",
  },
  {
    title: "Tecnicatura Superior en Diseño y Programación Web",
    institution: "Instituto Tecnológico Leopoldo Marechal",
    period: "2024 — 2025",
    status: "Finalizada",
    grade: "Promedio 8.74",
    description:
      "Desarrollo web frontend y backend, diseño UI/UX, PHP y MySQL, Angular e Ionic. Práctica profesionalizante: sistema de turnos para una clínica.",
  },
];

export const EXPERIENCE_DATA: Experience = {
  company: "DulcineaLibrería",
  role: "Community Manager y Diseñador Web",
  period: "Desde marzo 2022",
  location: "Remoto",
  description: "Gestión de redes sociales, contenido y diseño web.",
};

export const CERTIFICATIONS_LIST: Certification[] = [
  { title: "Foundations of UX Design", issuer: "Google / Coursera", year: 2026 },
  { title: "Start the UX Design Process", issuer: "Google / Coursera", year: 2026 },
  { title: "Data Analytics Essentials", issuer: "IBM / Coursera", year: 2026 },
  { title: "Python Programming (AD141)", issuer: "Red Hat / Coursera", year: 2026 },
  { title: "Python Fundamentos", issuer: "Santander Open Academy", year: 2026 },
  { title: "Data Analytics & Visualization", issuer: "EducaciónIT", year: 2026 },
];

// Stack: solo las tecnologías de la lista oficial
export const STACK_CATEGORIES: StackCategory[] = [
  {
    title: "FRONTEND",
    index: "01",
    subtitle: "CORE EXPERTISE",
    skills: ["React", "TypeScript", "JavaScript", "Angular", "Ionic", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "MOTION & 3D",
    index: "02",
    subtitle: "CREATIVE INTERACTION",
    skills: ["GSAP", "Lenis", "Framer Motion", "Three.js"],
  },
  {
    title: "DATOS & BACKEND",
    index: "03",
    subtitle: "DATA & SERVICES",
    skills: ["Python", "Power BI", "Excel", "MySQL", "Firebase", "Cloudflare Workers", "Gemini API", "REST APIs"],
  },
  {
    title: "HERRAMIENTAS",
    index: "04",
    subtitle: "DEVOPS & DESIGN",
    skills: ["Git", "GitHub Actions", "Vite", "Figma"],
  },
];

// Archivo completo de proyectos reales. Los 6 con featured: true se muestran
// como destacados, en este mismo orden.
export const PROJECTS_ARCHIVE: Project[] = [
  // ── Destacados ──
  {
    id: "tono",
    year: 2026,
    title: "TONO",
    type: "Aplicación web con IA",
    link: "https://juantrezza.github.io/tono-ai/",
    codeLink: "https://github.com/JuanTrezza/tono-ai",
    description:
      "Generador de posts para redes sociales con IA. Elegís la red, el tono y el tema, y Gemini escribe tres versiones en tiempo real.",
    featured: true,
    category: "saas",
    tags: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Cloudflare Workers", "Gemini API"],
    spec: "GEMINI API · STREAMING · WORKERS",
    image: tonoPreview,
  },
  {
    id: "orbita-studio",
    year: 2026,
    title: "ÓRBITA Studio",
    type: "Sitio multipágina",
    link: "https://juantrezza.github.io/orbita-studio/",
    codeLink: "https://github.com/JuanTrezza/orbita-studio",
    description:
      "Sitio web multipágina de un estudio de motion design y tecnología creativa con base en Buenos Aires, con estética técnica de terminal y transiciones entre páginas guiadas por GSAP.",
    featured: true,
    category: "motion",
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "React Router"],
    spec: "PAGE TRANSITIONS · SCROLL MOTION",
    image: orbitaPreview,
  },
  {
    id: "senal-agency",
    year: 2026,
    title: "SEÑAL®",
    type: "Agencia creativa",
    link: "https://juantrezza.github.io/senal-agency/",
    codeLink: "https://github.com/JuanTrezza/senal-agency",
    description:
      "Sitio web de una agencia creativa latinoamericana con base en Buenos Aires, con estética editorial brutalista y motion guiado por el scroll. Bilingüe ES/EN y con tema claro/oscuro.",
    featured: true,
    category: "motion",
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"],
    spec: "EDITORIAL · ES/EN · LIGHT/DARK",
    image: senalPreview,
  },
  {
    id: "kortex-records",
    year: 2026,
    title: "KØRTEX Records",
    type: "Sello discográfico",
    link: "https://juantrezza.github.io/kortex-records/",
    codeLink: "https://github.com/JuanTrezza/kortex-records",
    description:
      "Sitio web de un sello de techno melódico latinoamericano, con estética editorial de agencia creativa y motion guiado por el scroll. Roster de artistas, releases, eventos, tienda de merch y reproductor fijo.",
    featured: true,
    category: "motion",
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"],
    spec: "BENTO GRID · PLAYER · MERCH STORE",
    image: kortexPreview,
  },
  {
    id: "nexus-games",
    year: 2026,
    title: "NEXUS GAMES",
    type: "App con API",
    link: "https://juantrezza.github.io/nexus-games/",
    codeLink: "https://github.com/JuanTrezza/nexus-games",
    description:
      "Plataforma premium de descubrimiento de videojuegos con 500.000+ títulos. Búsqueda avanzada, filtros por plataforma y género, detalles completos con screenshots y wishlist personal. Consume API pública de RAWG.io.",
    featured: true,
    category: "web",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "RAWG.io API"],
    spec: "RAWG API · SEARCH & WISHLIST",
    image: nexusGamesPreview,
  },
  {
    id: "cinemaxpro",
    year: 2026,
    title: "CINEMAX PRO",
    type: "App con API",
    link: "https://juantrezza.github.io/cinemaxpro/",
    codeLink: "https://github.com/JuanTrezza/cinemaxpro",
    description:
      "Plataforma estilo Netflix de descubrimiento de películas. Consume la API de TMDb en tiempo real con búsqueda, filtros por género, modal con trailer y sistema de favoritos persistente.",
    featured: true,
    category: "web",
    tags: ["React", "TypeScript", "TMDb API", "Framer Motion"],
    spec: "TMDB API · SEARCH & FAVORITES",
    image: cinemaxPreview,
  },

  // ── Archivo ──
  {
    id: "pulse-analytics",
    year: 2026,
    title: "PULSE Analytics",
    type: "Dashboard",
    link: "https://juantrezza.github.io/pulse-analytics/",
    codeLink: "https://github.com/JuanTrezza/pulse-analytics",
    description:
      "Dashboard de analytics para e-commerce con métricas en tiempo real, visualización de ventas, embudo de conversión y segmentación de clientes. Diseño inspirado en Linear y Vercel.",
    featured: false,
    category: "saas",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    spec: "E-COMMERCE ANALYTICS · DASHBOARD",
    image: pulsePreview,
  },
  {
    id: "mesa",
    year: 2026,
    title: "MESA",
    type: "Reservas",
    link: "https://juantrezza.github.io/mesa-reservations/",
    codeLink: "https://github.com/JuanTrezza/mesa-reservations",
    description:
      "Sistema de reservas para restaurantes con calendario interactivo, selector de horarios en tiempo real, gestión de zonas y confirmación instantánea. Diseño elegante con tipografía serif y acentos dorados.",
    featured: false,
    category: "web",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    spec: "BOOKING SYSTEM · CLIENT UI",
  },
  {
    id: "petcare-plus",
    year: 2026,
    title: "PetCare Plus",
    type: "Veterinaria",
    link: "https://juantrezza.github.io/veterinaria/",
    codeLink: "https://github.com/JuanTrezza/veterinaria",
    description:
      "Plataforma de clínica veterinaria con sistema de reservas de turnos online, gestión de mascotas y catálogo de servicios. Persistencia local con LocalStorage. Diseño cálido y profesional.",
    featured: false,
    category: "web",
    tags: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    spec: "ONLINE BOOKING · LOCALSTORAGE",
  },
  {
    id: "wave-chat",
    year: 2026,
    title: "WAVE Chat",
    type: "App de mensajería",
    link: "https://juantrezza.github.io/wave-chat/",
    codeLink: "https://github.com/JuanTrezza/wave-chat",
    description:
      "App de mensajería con diseño mobile-first inspirado en iMessage y Telegram. Incluye chats, llamadas, estados, grupos y autenticación.",
    featured: false,
    category: "saas",
    tags: ["React", "TypeScript", "Tailwind CSS", "PWA-ready"],
    spec: "MOBILE-FIRST MESSAGING",
  },
  {
    id: "nexus-platform",
    year: 2026,
    title: "NEXUS Platform",
    type: "Landing SaaS",
    link: "https://juantrezza.github.io/NEXUS-Project-Intelligence-Platform/",
    codeLink: "https://github.com/JuanTrezza/NEXUS-Project-Intelligence-Platform",
    description:
      "Landing de una plataforma SaaS de gestión de proyectos con IA, con pricing, testimonios, FAQ y mockup de dashboard animado. Diseño glassmorphism oscuro con gradientes violeta e índigo.",
    featured: false,
    category: "saas",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    spec: "SAAS LANDING · GLASSMORPHISM",
  },
  {
    id: "afterlife-bar",
    year: 2026,
    title: "Afterlife Bar",
    type: "Sitio de bar",
    link: "https://juantrezza.github.io/afterlife-bar/",
    codeLink: "https://github.com/JuanTrezza/afterlife-bar",
    description:
      "Sitio web de un bar temático del universo Cyberpunk 2077, con carta de tragos, reservas, eventos y música. UI oscura con neón, glitch y estética HUD.",
    featured: false,
    category: "web",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    spec: "CYBERPUNK UI · NEON & GLITCH",
  },
  {
    id: "novacorp",
    year: 2026,
    title: "NovaCorp",
    type: "Landing",
    link: "https://juantrezza.github.io/novacorp/",
    codeLink: "https://github.com/JuanTrezza/novacorp",
    description:
      "Landing de una clínica de cyberware con temática cyberpunk. UI oscura con acentos de neón, efectos de scanlines, animaciones de glitch y componentes estilo HUD.",
    featured: false,
    category: "web",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    spec: "CYBERPUNK LANDING · HUD UI",
  },
  {
    id: "voidwear",
    year: 2025,
    title: "VOID//WEAR",
    type: "E-commerce",
    link: "https://juantrezza.github.io/voidwear/",
    codeLink: "https://github.com/JuanTrezza/voidwear",
    description:
      "E-commerce de moda cyberpunk ambientado en 2077, con catálogo, carrito funcional, selector de talles, filtros, búsqueda en tiempo real y lookbook.",
    featured: false,
    category: "web",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    spec: "E-COMMERCE · CART & FILTERS",
  },
  {
    id: "weatherworld",
    year: 2025,
    title: "WeatherWorld",
    type: "App del clima 3D",
    link: "https://juantrezza.github.io/weather-app/",
    codeLink: "https://github.com/JuanTrezza/weather-app",
    description:
      "App del clima con globo terráqueo 3D interactivo en WebGL. Clima en tiempo real con geolocalización, cambio °C/°F y pronóstico de 5 días.",
    featured: false,
    category: "motion",
    tags: ["JavaScript", "Three.js", "WebGL", "OpenWeatherMap API"],
    spec: "3D GLOBE · WEATHER API",
  },
  {
    id: "dashboard-finanzas",
    year: 2026,
    title: "Dashboard Finanzas",
    type: "Python",
    link: "https://juantrezza.github.io/dashboard-finanzas-personal/",
    codeLink: "https://github.com/JuanTrezza/dashboard-finanzas-personal",
    description:
      "Aplicación de consola en Python para registrar y analizar movimientos financieros. Incluye tablas coloreadas con Rich, resúmenes automáticos, filtros por categoría, exportación a Excel y sistema de logs. Proyecto de la Tecnicatura en Ciencia de Datos e IA.",
    featured: false,
    category: "data",
    tags: ["Python", "Rich", "Pandas", "Openpyxl", "JSON"],
    spec: "PYTHON CLI · EXCEL EXPORT",
  },
  {
    id: "gestor-tareas",
    year: 2026,
    title: "Gestor de Tareas",
    type: "Python CLI",
    link: "https://juantrezza.github.io/gestor-tareas-parcial2/",
    codeLink: "https://github.com/JuanTrezza/gestor-tareas-parcial2",
    description:
      "Aplicación de línea de comandos en Python para organizar tareas por nivel de prioridad (Alta, Media, Baja). Incluye tablas coloreadas con Rich, persistencia en JSON, filtros y sistema de logs. Proyecto académico de ISTEA.",
    featured: false,
    category: "data",
    tags: ["Python", "Rich", "JSON", "Logging"],
    spec: "PYTHON CLI · JSON PERSISTENCE",
  },
];
