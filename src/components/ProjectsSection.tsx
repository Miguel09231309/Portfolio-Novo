import { useMemo, useState } from 'react';
import { Check, Code2, Copy, ExternalLink, RotateCcw, Search } from 'lucide-react';
import {
  PROJECTS,
  type PortfolioProject,
  type ProjectCategory,
  type Trimester,
} from '../data/portfolioData';

interface ProjectsSectionProps {
  onOpenJsSandbox: (project: PortfolioProject) => void;
}

type TrimesterFilter = 'all' | Trimester;
type CategoryFilter = 'all' | ProjectCategory;

export function ProjectsSection({ onOpenJsSandbox }: ProjectsSectionProps) {
  const [trimesterFilter, setTrimesterFilter] = useState<TrimesterFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((item) => {
      if (trimesterFilter !== 'all' && item.trimester !== trimesterFilter) {
        return false;
      }
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }
      if (q) {
        const hay = `${item.title} ${item.description} ${item.category} ${item.authors} ${item.url}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [trimesterFilter, categoryFilter, searchQuery]);

  const trimesterCounts = useMemo(() => {
    return {
      all: PROJECTS.length,
      1: PROJECTS.filter((p) => p.trimester === 1).length,
      2: PROJECTS.filter((p) => p.trimester === 2).length,
      3: PROJECTS.filter((p) => p.trimester === 3).length,
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const base =
      trimesterFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.trimester === trimesterFilter);
    return {
      all: base.length,
      HTML: base.filter((p) => p.category === 'HTML').length,
      JavaScript: base.filter((p) => p.category === 'JavaScript').length,
      'Google AI': base.filter((p) => p.category === 'Google AI').length,
    };
  }, [trimesterFilter]);

  const handleCopyUrl = async (project: PortfolioProject) => {
    try {
      await navigator.clipboard.writeText(project.url);
      setCopiedId(project.id);
      setTimeout(() => setCopiedId((curr) => (curr === project.id ? null : curr)), 1500);
    } catch {
      // Ignore if clipboard permission is unavailable
    }
  };

  const resetFilters = () => {
    setTrimesterFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  };

  return (
    <section id="projetos" className="py-12 sm:py-16 border-t border-slate-800/70">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-cyan-400 mb-1">
              Catálogo Unificado · Todos os Trimestres
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Projetos Desenvolvidos
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Todos os {PROJECTS.length} links reais de HTML, JavaScript e Google AI em um só lugar,
              com execução interativa de código JS direto no navegador.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-[family-name:var(--font-mono)] tabular-nums shrink-0">
            Exibindo {filteredProjects.length} de {PROJECTS.length}
          </p>
        </div>

        {/* Controls: Search + Segmented Filters */}
        <div className="bg-[#0D1526] border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-5 relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar projeto, tecnologia ou URL..."
                aria-label="Buscar projetos"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070D1B] border border-slate-700/80 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="lg:col-span-7 flex flex-wrap items-center gap-2">
              <div
                role="group"
                aria-label="Filtrar por trimestre"
                className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#070D1B] border border-slate-800"
              >
                {(['all', 1, 2, 3] as TrimesterFilter[]).map((tri) => {
                  const active = trimesterFilter === tri;
                  const label = tri === 'all' ? 'Todos' : `${tri}º Tri`;
                  return (
                    <button
                      key={String(tri)}
                      type="button"
                      onClick={() => setTrimesterFilter(tri)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap tabular-nums min-h-[36px] ${
                        active
                          ? 'bg-cyan-500 text-slate-950'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {label} ({trimesterCounts[tri]})
                    </button>
                  );
                })}
              </div>

              <div
                role="group"
                aria-label="Filtrar por tecnologia"
                className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#070D1B] border border-slate-800"
              >
                {(['all', 'HTML', 'JavaScript', 'Google AI'] as CategoryFilter[]).map(
                  (cat) => {
                    const active = categoryFilter === cat;
                    const label = cat === 'all' ? 'Todas' : cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap tabular-nums min-h-[36px] ${
                          active
                            ? 'bg-slate-200 text-slate-950'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {label} ({categoryCounts[cat]})
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-[#0D1526] border border-slate-800 rounded-2xl p-10 text-center">
            <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-2">
              Nenhum projeto encontrado nesta combinação
            </p>
            <p className="text-sm text-slate-400 mb-5">
              Tente alterar o trimestre, a tecnologia ou limpar o termo de busca.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold transition-colors cursor-pointer min-h-[40px]"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Limpar filtros</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => {
              const isJs = project.kind === 'js-raw' || project.kind === 'github-repo';
              const isCopied = copiedId === project.id;

              return (
                <article
                  key={project.id}
                  className="flex flex-col justify-between bg-[#0D1526] border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    {/* Clean unboxed metadata (Zero-Pill Rule) */}
                    <p className="text-xs text-slate-400 font-medium mb-2">
                      <span className="text-cyan-400">{project.trimester}º Trimestre</span>
                      <span className="mx-1.5 text-slate-600" aria-hidden="true">·</span>
                      <span>{project.category}</span>
                      {project.authors === 'Miguel & Alifer' && (
                        <>
                          <span className="mx-1.5 text-slate-600" aria-hidden="true">·</span>
                          <span className="text-slate-300">Miguel &amp; Alifer</span>
                        </>
                      )}
                    </p>

                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white tracking-tight mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <p
                      title={project.url}
                      className="font-[family-name:var(--font-mono)] text-xs text-slate-500 truncate mb-4 pt-3 border-t border-slate-800/80"
                    >
                      {project.url.replace(/^https?:\/\//, '')}
                    </p>

                    <div className="flex items-center gap-2">
                      {isJs ? (
                        <button
                          type="button"
                          onClick={() => onOpenJsSandbox(project)}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
                        >
                          <Code2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Ver e Executar JS</span>
                        </button>
                      ) : (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap min-h-[40px]"
                        >
                          <span>Abrir Projeto</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        </a>
                      )}

                      {isJs && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir link original de ${project.title}`}
                          title="Abrir link original"
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors min-h-[40px] min-w-[40px]"
                        >
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCopyUrl(project)}
                        aria-label={`Copiar URL de ${project.title}`}
                        title="Copiar link"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
