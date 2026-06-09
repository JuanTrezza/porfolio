/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Dynamic navbar highlighters based on scroll intersection observers
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -75; // compensate navbar height
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#13131b] text-[#e4e1ed] selection:bg-[#8083ff]/30 selection:text-white antialiased">
      {/* Fixed top Header Navigation */}
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      
      {/* Main Container Content */}
      <main>
        {/* Hero Section */}
        <Hero onNavClick={handleNavClick} />
        
        {/* Detailed About Me block */}
        <AboutMe />
        
        {/* Bento-grid of Tech Stack */}
        <TechStack />
        
        {/* Portfolio gallery projects with details modals */}
        <Projects />
        
        {/* Verified credentials block */}
        <Certifications />
        
        {/* Historical professional timelines */}
        <Experience />
        
        {/* Feedback validated interactive messaging forms */}
        <Contact />
      </main>

      {/* Footer Branding credits & Social anchors */}
      <Footer />
    </div>
  );
}
