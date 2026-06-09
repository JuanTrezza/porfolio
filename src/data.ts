import { Project, SkillItem, Certification, ExperienceItem, EducationItem } from './types';

export const projectsData: Project[] = [
  {
    id: 'void-wear',
    title: 'VOID//WEAR',
    description: 'E-commerce de moda futurista con filtrado avanzado y pasarela de pago simulada.',
    longDescription: 'Una plataforma de comercio electrónico de estética cyberpunk y futurista. Cuenta con catálogo interactivo, filtros complejos en tiempo real (por talle, categoría técnica y nivel de reflectancia), animaciones con motion-framer y una simulación realista de pasarela de checkout con pago seguro ficticio.',
    tags: ['REACT', 'FIGMA'],
    category: 'React',
    icon: 'ShoppingBag',
    metrics: 'Aumento de conversión simulada del 25% gracias a una UX depurada.',
    challenges: 'El reto principal fue sincronizar las transiciones de estado de la tarjeta de crédito virtual con el scroll interactivo del formulario de checkout.',
    techs: ['React', 'Framer Motion', 'Tailwind CSS', 'Figma', 'LocalState'],
    demoUrl: 'https://juantrezza.github.io/voidwear',
    repoUrl: 'https://github.com/JuanTrezza/voidwear'
  },
  {
    id: 'novacorp-clinic',
    title: 'NovaCorp Clinic',
    description: 'Sistema de gestión para clínicas privadas con turnos en tiempo real con sincronización.',
    longDescription: 'Una aplicación web integral para la administración de centros médicos. Permite el agendamiento instantáneo de citas y actualización de expedientes médicos. Cuenta con una vista de calendario interactiva, autenticación segura y una arquitectura reactiva que notifica cambios al instante.',
    tags: ['ANGULAR', 'FIREBASE'],
    category: 'Angular',
    icon: 'HeartPulse',
    metrics: 'Reducción del tiempo de asignación de turnos a solo unos clics.',
    challenges: 'Optimizar las consultas a Firebase Firestore para mantener una baja latencia en dispositivos móviles de gama media.',
    techs: ['Angular', 'RxJS', 'Firebase Firestore', 'Firebase Auth', 'Tailwind'],
    demoUrl: 'https://juantrezza.github.io/novacorp',
    repoUrl: 'https://github.com/JuanTrezza/novacorp'
  },
  {
    id: 'nexus-platform',
    title: 'NEXUS Platform',
    description: 'Dashboard analítico para gestión de equipos y recursos remotos SaaS.',
    longDescription: 'Un panel de control administrativo para empresas tecnológicas modernas con alta carga interactiva de datos. Incluye gráficos interactivos de rendimiento detallados, widgets personalizables, sección de monitoreo de servidores virtuales y un gestor dinámico de asignación de tareas.',
    tags: ['SAAS', 'NEXTJS'],
    category: 'React',
    icon: 'LayoutDashboard',
    metrics: 'Carga de datos optimizada con React Concurrent Mode y Lazy list.',
    challenges: 'Lograr un renderizado fluido de múltiples gráficos de Recharts de manera simultánea sin impactar los fotogramas del navegador.',
    techs: ['Next.js', 'React', 'Recharts', 'Tailwind CSS', 'TypeScript'],
    demoUrl: 'https://juantrezza.github.io/NEXUS-Project-Intelligence-Platform',
    repoUrl: 'https://github.com/JuanTrezza/NEXUS-Project-Intelligence-Platform'
  },
  {
    id: 'weatherworld-3d',
    title: 'WeatherWorld 3D',
    description: 'Visualizador de clima global utilizando un globo terráqueo interactivo en 3D.',
    longDescription: 'Un experimento visual inmersivo que proyecta el estado del clima global sobre un globo terrestre tridimensional. Utiliza datos climáticos en tiempo real de OpenWeather y renderiza un globo texturizado en el navegador con capacidad de zoom, arrastre y rotación interactiva.',
    tags: ['THREE.JS', 'API'],
    category: 'JS Native',
    icon: 'Globe',
    metrics: 'Renderizado interactivo a 60 FPS estables utilizando WebGL.',
    challenges: 'Mapear correctamente las coordenadas geoespaciales (latitud y longitud) del API climática a los puntos vectoriales 3D de la esfera.',
    techs: ['JavaScript ES6', 'Three.js', 'OpenWeather API', 'CSS Grid', 'Vite'],
    demoUrl: 'https://juantrezza.github.io/weather-app',
    repoUrl: 'https://github.com/JuanTrezza/weather-app'
  },
  {
    id: 'afterlife-bar',
    title: 'Afterlife Bar',
    description: 'Landing page inmersiva para un bar temático con animaciones complejas.',
    longDescription: 'Página web interactiva para un bar temático futurista en Buenos Aires. Explota micro-interacciones mediante animaciones de scroll y efectos ópticos que sumergen al visitante en una atmósfera inmersiva. Cuenta con menú dinámico, reservas online integradas y efectos visuales de glitch responsivos.',
    tags: ['CYBERPUNK', 'GSAP'],
    category: 'JS Native',
    icon: 'GlassWater',
    metrics: 'Experiencia interactiva premium que triplicó las reservas mensuales del bar.',
    challenges: 'Alineación precisa del scroll scrubbing para asegurar que las animaciones espaciales no causen saltos entre distintas secciones móviles.',
    techs: ['HTML5', 'CSS Modules', 'GSAP', 'Lenis Scroll', 'SVG Filters'],
    demoUrl: 'https://juantrezza.github.io/afterlife-bar',
    repoUrl: 'https://github.com/JuanTrezza/afterlife-bar'
  },
  {
    id: 'booking-system',
    title: 'Sistema de Turnos',
    description: 'Aplicación interna para la gestión eficiente de citas y pacientes empresariales.',
    longDescription: 'Un sistema privado robusto diseñado para consultorios de alta concurrencia. Automatiza desde la reserva inicial hasta el seguimiento de pacientes, integrando recordatorios automáticos, asignación de salas físicas según disponibilidad técnica de equipamiento y reportes analíticos mensuales de ausentismo.',
    tags: ['ANGULAR', 'RXJS'],
    category: 'Angular',
    icon: 'CalendarDays',
    metrics: 'Reducción del ausentismo en un 18% gracias a flujos ágiles de re-programación.',
    challenges: 'Elaborar un motor interno de detección de colisiones horarias de médicos que reacciona de manera proactiva en milisegundos.',
    techs: ['Angular', 'RxJS', 'TypeScript', 'Tailwind', 'Sass'],
    repoUrl: 'https://github.com/JuanTrezza/gestion-turnos'
  }
];

export const skillsData: SkillItem[] = [
  // Frontend
  { name: 'React / Next.js', category: 'frontend', description: 'Creación de SPAs con hooks personalizados, Context API y optimización de render.' },
  { name: 'Angular', category: 'frontend', description: 'Desarrollo modular bajo inyección de dependencias, señales de estado y enrutamiento avanzado.' },
  { name: 'Typescript / JS ES6', category: 'frontend', description: 'Código robusto fuertemente tipado, estructuración ágil de objetos y programación asíncrona.' },
  { name: 'Tailwind / SASS', category: 'frontend', description: 'Diseño altamente responsivo, variables utilitarias compuestas, preprocesamiento de estilos.' },

  // Backend & DB
  { name: 'Node.js / Express', category: 'backend', description: 'APIs RESTful rápidas mediante middleware seguro, manejo de flujos de control.' },
  { name: 'Firebase', category: 'backend', description: 'Bases de datos no relacionales de sincronización viva, almacenamiento y control de accesos.' },
  { name: 'MongoDB / SQL', category: 'backend', description: 'Modelado y diseño de esquemas eficientes para el almacenamiento robusto de datos.' },
  { name: 'REST APIs', category: 'backend', description: 'Diseño e integración estricta de endpoints consistentes con respuestas estructuradas.' },

  // Diseño & UX
  { name: 'Figma / Adobe Suite', category: 'design', description: 'Diseño visual y wireframing con componentes interactivos y creación de prototipos fieles.' },
  { name: 'User Research', category: 'design', description: 'Entrevistas de usuario, mapeo de empatía y pruebas de usabilidad guiadas por métricas.' },
  { name: 'Prototipado Hi-Fi', category: 'design', description: 'Simulación de flujos complejos de navegación ricos en micro-interacciones realistas.' },
  { name: 'Wireframing', category: 'design', description: 'Estructuración inicial de baja fidelidad centrada en la jerarquía visual de la interfaz.' },

  // Datos & IA
  { name: 'Python (Pandas)', category: 'data', description: 'Manipulación ágil y limpieza profunda de set de datos con técnicas de transformación.' },
  { name: 'Visualización Datos', category: 'data', description: 'Creación de gráficos explicativos e intuitivos para extraer información del negocio.' },
  { name: 'Análisis Estadístico', category: 'data', description: 'Cálculo de tendencias, correlaciones y comportamiento estructurado en informes.' },
  { name: 'Prompt Engineering', category: 'data', description: 'Diseño exacto de instrucciones para optimizar respuestas de modelos de lenguaje grandes.' }
];

export const certificationsData: Certification[] = [
  { id: 'cert-google', title: 'UX Design Professional', issuer: 'Google', iconName: 'google' },
  { id: 'cert-ibm', title: 'Data Science Foundation', issuer: 'IBM', iconName: 'ibm' },
  { id: 'cert-redhat', title: 'Python Dev Specialist', issuer: 'Red Hat', iconName: 'redhat' },
  { id: 'cert-santander', title: 'Tecnología y Análisis', issuer: 'Santander', iconName: 'santander' },
  { id: 'cert-openjs', title: 'Node.js Developer', issuer: 'OpenJS', iconName: 'openjs' }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-dulcinea',
    role: 'Community Manager & Diseñador Web',
    company: 'Dulcinea Librería',
    period: '2021 - Actualidad',
    description: 'Rediseño integral de la identidad digital, gestión de plataformas sociales y optimización del flujo de ventas online a través de interfaces personalizadas.',
    highlights: [
      'Rediseñó el catálogo digital de libros aumentando el tiempo de sesión promedio en un 35%.',
      'Minimizó la fricción de reservas online estableciendo un canal conversacional automatizado.',
      'Planificó y produjo material multimedia que expandió la audiencia orgánica en redes por 2.5x.'
    ]
  }
];

export const educationData: EducationItem[] = [
  {
    id: 'edu-istea',
    institution: 'ISTEA',
    period: '2023 - Actualidad',
    degree: 'Tecnicatura Superior en Ciencia de Datos e IA'
  },
  {
    id: 'edu-leopoldo',
    institution: 'Leopoldo Marechal',
    period: '2021',
    degree: 'Desarrollo Web Fullstack'
  }
];
