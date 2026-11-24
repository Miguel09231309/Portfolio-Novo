import { ArrowDown, ExternalLink } from 'lucide-react';
import { PROFILE_INFO, PROJECTS, SCHOOL_INFO } from '../data/portfolioData';

interface AuthorProfileSectionProps {
  onExploreProjects: () => void;
}

export function AuthorProfileSection({
  onExploreProjects,
}: AuthorProfileSectionProps) {
  const htmlCount = PROJECTS.filter((p) => p.category === 'HTML').length;
  const jsCount = PROJECTS.filter((p) => p.category === 'JavaScript').length;
  const aiCount = PROJECTS.filter((p) => p.category === 'Google AI').length;

  return (
    <section id="sobre" className="py-12 sm:py-16 border-t border-slate-800/70">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="bg-[#0D1526] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-cyan-400 mb-1.5">
              {PROFILE_INFO.role} · {SCHOOL_INFO.name}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Sou {PROFILE_INFO.name}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              {PROFILE_INFO.bio}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              HTML5 <span className="text-slate-600 mx-1.5">·</span> CSS3{' '}
              <span className="text-slate-600 mx-1.5">·</span> JavaScript{' '}
              <span className="text-slate-600 mx-1.5">·</span> React{' '}
              <span className="text-slate-600 mx-1.5">·</span> Google AI
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={PROFILE_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A66C2] hover:bg-[#0958A8] text-white text-sm font-semibold transition-colors whitespace-nowrap min-h-[44px]"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={PROFILE_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-colors whitespace-nowrap min-h-[44px]"
            >
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onExploreProjects}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              <span>Ver Links abaixo</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Resumo numérico real dos projetos */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0D1526] border border-slate-800/90 rounded-xl px-5 py-4">
            <p className="font-[family-name:var(--font-mono)] text-2xl font-semibold text-white tabular-nums">
              {PROJECTS.length}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Total de links reais
            </p>
          </div>
          <div className="bg-[#0D1526] border border-slate-800/90 rounded-xl px-5 py-4">
            <p className="font-[family-name:var(--font-mono)] text-2xl font-semibold text-white tabular-nums">
              {htmlCount}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Projetos HTML e Web
            </p>
          </div>
          <div className="bg-[#0D1526] border border-slate-800/90 rounded-xl px-5 py-4">
            <p className="font-[family-name:var(--font-mono)] text-2xl font-semibold text-white tabular-nums">
              {jsCount}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Scripts JS executáveis no site
            </p>
          </div>
          <div className="bg-[#0D1526] border border-slate-800/90 rounded-xl px-5 py-4">
            <p className="font-[family-name:var(--font-mono)] text-2xl font-semibold text-cyan-400 tabular-nums">
              {aiCount}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Projetos com Google AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
