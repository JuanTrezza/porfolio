export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'React' | 'Angular' | 'JS Native';
  icon: string;
  metrics?: string;
  challenges?: string;
  techs: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'data';
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  iconName: 'google' | 'ibm' | 'redhat' | 'santander' | 'openjs';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  period: string;
  degree: string;
}
