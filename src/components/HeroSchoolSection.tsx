import { ArrowDown, MapPin } from 'lucide-react';
import { SCHOOL_INFO } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface HeroSchoolSectionProps {
  onNavigateSection: (sectionId: string) => void;
}

export function HeroSchoolSection({ onNavigateSection }: HeroSchoolSectionProps) {
  return (
    <section id="topo" className="relative pt-10 pb-12 sm:pt-14 sm:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-[#0D1526] border border-slate-800 rounded-2xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#081020] border border-slate-700/80 shrink-0">
              <ResilientImage
                src={SCHOOL_INFO.logoUrl}
                alt={`Brasão do ${SCHOOL_INFO.name}`}
                fallbackLabel="Unidade Polo"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-cyan-400 mb-2">
                {SCHOOL_INFO.name} · {SCHOOL_INFO.city}
              </p>

              <h1
                className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.12] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Bem-vindo aos Cursos do Colégio Unidade Polo
              </h1>

              <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                Conheça os cursos técnicos, projetos interdisciplinares, estrutura do campus e a
                localização oficial em Arapongas. Logo abaixo estão reunidos o meu perfil e todos os
                projetos desenvolvidos nos três trimestres.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => onNavigateSection('cursos')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  <span>Conhecer os Cursos</span>
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateSection('projetos')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  <span>Ir para os Links e Projetos</span>
                </button>
                <a
                  href={SCHOOL_INFO.mapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-sm border border-slate-800 transition-colors whitespace-nowrap min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span>{SCHOOL_INFO.city}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
