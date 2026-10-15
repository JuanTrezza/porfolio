import React, { useState } from 'react';
import { Project } from '../data/portfolioData';

interface ProjectPreviewProps {
  project: Project;
  alt: string;
  imgClassName: string;
  placeholder: React.ReactNode;
}

// Muestra la captura del proyecto; si no hay imagen o no carga, el placeholder
export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, alt, imgClassName, placeholder }) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!project.image || failedSrc === project.image) return <>{placeholder}</>;

  return (
    <img
      src={project.image}
      alt={alt}
      onError={() => setFailedSrc(project.image ?? null)}
      className={imgClassName}
    />
  );
};
