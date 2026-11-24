import { useState } from 'react';
import { AuthorProfileSection } from './components/AuthorProfileSection';
import { CoursesAndCampusSection } from './components/CoursesAndCampusSection';
import { HeroSchoolSection } from './components/HeroSchoolSection';
import { JsSandboxModal } from './components/JsSandboxModal';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import {
  PROFILE_INFO,
  SCHOOL_INFO,
  type PortfolioProject,
} from './data/portfolioData';

export default function App() {
  const [sandboxProject, setSandboxProject] = useState<PortfolioProject | null>(
    null,
  );

  const handleNavigateSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060B16] text-slate-100">
      <Navbar onNavigateSection={handleNavigateSection} />

      <main className="flex-1">
        {/* 1. Tudo do Colégio Unidade Polo primeiro */}
        <HeroSchoolSection onNavigateSection={handleNavigateSection} />
        <CoursesAndCampusSection />

        {/* 2. Depois do colégio: Informação do Miguel + Todos os Links */}
        <AuthorProfileSection
          onExploreProjects={() => handleNavigateSection('projetos')}
        />
        <ProjectsSection
          onOpenJsSandbox={(project) => setSandboxProject(project)}
        />
      </main>

      <footer className="border-t border-slate-800/80 bg-[#050912]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-400">
          <p>
            {SCHOOL_INFO.name} — {SCHOOL_INFO.city} · © {SCHOOL_INFO.year}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={PROFILE_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <a
              href={PROFILE_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <JsSandboxModal
        project={sandboxProject}
        onClose={() => setSandboxProject(null)}
      />
    </div>
  );
}
