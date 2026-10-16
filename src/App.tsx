import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ProjectsArchive } from './components/ProjectsArchive';
import { AboutMe } from './components/AboutMe';
import { TechStack } from './components/TechStack';
import { Certifications } from './components/Certifications';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './data/portfolioData';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1b1c1a] font-inter selection:bg-[#712ae2] selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="w-full pt-16 flex-1">
        {/* Hero Section */}
        <Hero />

        {/* 01 // Selección Curada: Featured Projects */}
        <FeaturedProjects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Archivo de Proyectos */}
        <ProjectsArchive onSelectProject={(project) => setSelectedProject(project)} />

        {/* 02 // Perfil y Trayectoria: Sobre Mí */}
        <AboutMe />

        {/* 03 // Toolkit & Capacidades: Stack Tecnológico */}
        <TechStack />

        {/* 04 // Validación: Certificaciones */}
        <Certifications />

        {/* 05 // Iniciar Conversación: Contact CTA */}
        <ContactCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
