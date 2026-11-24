import { ArrowDown } from 'lucide-react';
import { SCHOOL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
}

export function Navbar({ onNavigateSection }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md bg-[#060B16]/90 border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        <a
          href="#topo"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('topo');
          }}
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 rounded-sm"
        >
          {SCHOOL_INFO.name}
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          <a
            href="#topo"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('topo');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Colégio
          </a>
          <a
            href="#cursos"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('cursos');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Cursos
          </a>
          <a
            href="#campus"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('campus');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Campus e Mapa
          </a>
          <a
            href="#sobre"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('sobre');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Sobre Mim
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <a
            href="#projetos"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('projetos');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <span>Projetos</span>
            <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
