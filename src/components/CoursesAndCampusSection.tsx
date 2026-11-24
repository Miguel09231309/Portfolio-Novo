import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  X,
} from 'lucide-react';
import {
  COURSES,
  GALLERY_ITEMS,
  SCHOOL_INFO,
} from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

export function CoursesAndCampusSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length,
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const activePhoto =
    lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <>
      {/* Cursos */}
      <section id="cursos" className="py-12 sm:py-16 border-t border-slate-800/70">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-medium text-cyan-400 mb-1">
              Grade Técnica &amp; Formação
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cursos do Colégio Unidade Polo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COURSES.map((course, idx) => (
              <div
                key={course.id}
                className="bg-[#0D1526] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-xs text-cyan-400 tabular-nums mb-2">
                    0{idx + 1}. Formação
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">{course.subtitle}</p>
                  <ul className="pl-5 list-disc space-y-2 text-sm text-slate-300">
                    {course.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria & Localização */}
      <section id="campus" className="py-12 sm:py-16 border-t border-slate-800/70">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          {/* Galeria com Lightbox */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <p className="text-xs font-medium text-cyan-400 mb-1">
                  Estrutura Física
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Galeria do Campus
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Clique em qualquer foto para ampliar
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {GALLERY_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative text-left bg-[#0D1526] border border-slate-800 hover:border-cyan-500/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-cyan-400"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#081020]">
                    <ResilientImage
                      src={item.src}
                      alt={item.alt}
                      fallbackLabel={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                    <Maximize2
                      className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Localização e Contato */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 bg-[#0D1526] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-cyan-400 mb-1">
                  Localização Oficial
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-3">
                  Onde Estamos
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  {SCHOOL_INFO.address}
                </p>

                <div className="pt-5 border-t border-slate-800 space-y-2">
                  <p className="text-xs font-medium text-slate-400">
                    Instituição de Ensino
                  </p>
                  <p className="text-sm text-slate-300">
                    Atendimento presencial no centro de Arapongas para cursos técnicos, atividades interdisciplinares e comunidade escolar.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-slate-800">
                <a
                  href={SCHOOL_INFO.mapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-colors whitespace-nowrap min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span>Abrir no Google Maps</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0D1526] border border-slate-800 rounded-2xl overflow-hidden min-h-[300px]">
              <iframe
                title="Mapa de localização do Colégio Unidade Polo em Arapongas"
                src={SCHOOL_INFO.mapsEmbedUrl}
                className="w-full h-full min-h-[300px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização ampliada: ${activePhoto.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0B1221] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-slate-400">{activePhoto.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fechar foto"
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center max-h-[72vh] overflow-hidden">
              <ResilientImage
                src={activePhoto.src}
                alt={activePhoto.alt}
                fallbackLabel={activePhoto.title}
                className="w-full max-h-[72vh] object-contain"
              />

              <button
                type="button"
                aria-label="Foto anterior"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Próxima foto"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
