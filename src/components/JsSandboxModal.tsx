import { useCallback, useEffect, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Play,
  RotateCcw,
  Terminal,
  X,
} from 'lucide-react';
import type { PortfolioProject, RawSourceFile } from '../data/portfolioData';

interface JsSandboxModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

interface ConsoleEntry {
  level: 'log' | 'warn' | 'error' | 'info';
  text: string;
}

function formatValue(val: unknown): string {
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean' || val === null || val === undefined) {
    return String(val);
  }
  try {
    return JSON.stringify(val, null, 2);
  } catch {
    return String(val);
  }
}

export function JsSandboxModal({ project, onClose }: JsSandboxModalProps) {
  const [files, setFiles] = useState<Record<string, string>>({});
  const [originalFiles, setOriginalFiles] = useState<Record<string, string>>({});
  const [activeFileName, setActiveFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchNote, setFetchNote] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<ConsoleEntry[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  const loadSources = useCallback(async (target: PortfolioProject) => {
    setLoading(true);
    setFetchNote(null);
    setConsoleOutput([]);

    try {
      if (target.rawFiles && target.rawFiles.length > 0) {
        const loaded: Record<string, string> = {};
        let usedFallback = false;

        await Promise.all(
          target.rawFiles.map(async (rf: RawSourceFile) => {
            try {
              const res = await fetch(rf.rawUrl);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              loaded[rf.name] = await res.text();
            } catch {
              if (rf.fallbackContent) {
                loaded[rf.name] = rf.fallbackContent;
                usedFallback = true;
              } else {
                loaded[rf.name] = `// Não foi possível carregar ${rf.name} no momento.\n// URL original: ${rf.rawUrl}`;
                usedFallback = true;
              }
            }
          }),
        );

        setFiles(loaded);
        setOriginalFiles(loaded);
        setActiveFileName(target.rawFiles[0].name);
        if (usedFallback) {
          setFetchNote('Alguns arquivos foram carregados da cópia local de segurança.');
        }
      } else {
        const fileName = target.url.split('/').pop() || `${target.title}.js`;
        try {
          const res = await fetch(target.url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          setFiles({ [fileName]: text });
          setOriginalFiles({ [fileName]: text });
          setActiveFileName(fileName);
        } catch {
          const fallback =
            target.fallbackCode ||
            `// Código indisponível offline.\n// Acesse o arquivo original em: ${target.url}`;
          setFiles({ [fileName]: fallback });
          setOriginalFiles({ [fileName]: fallback });
          setActiveFileName(fileName);
          setFetchNote('Falha de rede ao buscar o arquivo remoto; exibindo modo de segurança.');
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!project) return;
    loadSources(project);
  }, [project, loadSources]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const activeCode = files[activeFileName] ?? '';
  const isJsonFile = activeFileName.endsWith('.json');

  const runCode = () => {
    const logs: ConsoleEntry[] = [];

    if (isJsonFile) {
      try {
        const parsed = JSON.parse(activeCode);
        logs.push({
          level: 'info',
          text: 'JSON válido. Estrutura interpretada com sucesso:',
        });
        logs.push({
          level: 'log',
          text: JSON.stringify(parsed, null, 2),
        });
      } catch (err) {
        logs.push({
          level: 'error',
          text: `Erro ao validar JSON: ${err instanceof Error ? err.message : String(err)}`,
        });
      }
      setConsoleOutput(logs);
      return;
    }

    const pushLog = (level: ConsoleEntry['level'], args: unknown[]) => {
      logs.push({
        level,
        text: args.map(formatValue).join(' '),
      });
    };

    const virtualConsole = {
      log: (...args: unknown[]) => pushLog('log', args),
      info: (...args: unknown[]) => pushLog('info', args),
      warn: (...args: unknown[]) => pushLog('warn', args),
      error: (...args: unknown[]) => pushLog('error', args),
      table: (data: unknown) => pushLog('log', [data]),
      time: () => {},
      timeLog: (...args: unknown[]) => pushLog('info', args),
      timeEnd: (...args: unknown[]) => pushLog('info', args),
    };

    const virtualRequire = (modulePath: string) => {
      const normalized = modulePath.replace(/^\.\//, '').toLowerCase();
      if (normalized.includes('cliente.json') && files['cliente.json']) {
        return JSON.parse(files['cliente.json']);
      }
      const matchedKey = Object.keys(files).find(
        (key) => key.toLowerCase() === normalized,
      );
      if (matchedKey && matchedKey.endsWith('.json')) {
        return JSON.parse(files[matchedKey]);
      }
      throw new Error(`Módulo não disponível no sandbox: ${modulePath}`);
    };

    try {
      const runner = new Function('console', 'require', `"use strict";\n${activeCode}`);
      runner(virtualConsole, virtualRequire);
      if (logs.length === 0) {
        logs.push({
          level: 'info',
          text: 'Script executado sem erros (nenhuma saída em console.log).',
        });
      }
    } catch (err) {
      logs.push({
        level: 'error',
        text: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      });
    }

    setConsoleOutput(logs);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1500);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  };

  const handleReset = () => {
    setFiles(originalFiles);
    setConsoleOutput([]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sandbox-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0B1221] border border-slate-700/90 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-800 bg-[#080E1A]">
          <div className="min-w-0">
            <p className="text-xs font-medium text-cyan-400">
              {project.trimester}º Trimestre · {project.category} · {project.authors}
            </p>
            <h3
              id="sandbox-modal-title"
              className="font-[family-name:var(--font-display)] text-xl font-bold text-white truncate mt-0.5"
            >
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {project.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar visualizador de código"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* File Tabs + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-slate-800 bg-[#0D1526]">
          <div className="flex flex-wrap items-center gap-1.5">
            {Object.keys(files).map((fileName) => (
              <button
                key={fileName}
                type="button"
                onClick={() => {
                  setActiveFileName(fileName);
                  setConsoleOutput([]);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-[family-name:var(--font-mono)] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeFileName === fileName
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {fileName}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={runCode}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap min-h-[36px]"
            >
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isJsonFile ? 'Validar JSON' : 'Executar Script'}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors cursor-pointer whitespace-nowrap min-h-[36px]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Restaurar</span>
            </button>
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors cursor-pointer whitespace-nowrap min-h-[36px]"
            >
              {copiedCode ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs transition-colors whitespace-nowrap min-h-[36px]"
            >
              <span>Link Original</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {fetchNote && (
          <div className="px-5 py-2 bg-amber-950/50 border-b border-amber-800/50 text-amber-200 text-xs">
            {fetchNote}
          </div>
        )}

        {/* Code Editor + Console Output */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-y-auto">
          <div className="flex flex-col min-h-[260px]">
            <div className="px-4 py-2 text-xs font-medium text-slate-400 bg-[#080E1A] border-b border-slate-800 flex items-center justify-between">
              <span>Código-fonte editável</span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums">
                {activeCode.split('\n').length} linhas
              </span>
            </div>
            {loading ? (
              <div className="flex-1 flex items-center justify-center p-8 text-sm text-slate-400">
                Carregando arquivo original...
              </div>
            ) : (
              <textarea
                aria-label="Editor de código JavaScript"
                value={activeCode}
                onChange={(e) =>
                  setFiles((prev) => ({ ...prev, [activeFileName]: e.target.value }))
                }
                spellCheck={false}
                className="flex-1 w-full min-h-[240px] lg:min-h-[340px] p-4 bg-[#060A14] text-slate-100 font-[family-name:var(--font-mono)] text-xs sm:text-sm leading-relaxed resize-none focus:outline-none"
              />
            )}
          </div>

          <div className="flex flex-col min-h-[220px] bg-[#070B14]">
            <div className="px-4 py-2 text-xs font-medium text-slate-400 bg-[#080E1A] border-b border-slate-800 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Saída do Console</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-[family-name:var(--font-mono)] text-xs sm:text-sm space-y-2">
              {consoleOutput.length === 0 ? (
                <p className="text-slate-500">
                  Clique em &ldquo;{isJsonFile ? 'Validar JSON' : 'Executar Script'}&rdquo; acima para rodar o código e ver o resultado aqui.
                </p>
              ) : (
                consoleOutput.map((entry, idx) => (
                  <pre
                    key={idx}
                    className={`whitespace-pre-wrap break-words rounded-lg px-3 py-2 border ${
                      entry.level === 'error'
                        ? 'bg-red-950/40 border-red-800/60 text-red-300'
                        : entry.level === 'warn'
                        ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                        : entry.level === 'info'
                        ? 'bg-cyan-950/30 border-cyan-900/50 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 text-emerald-300'
                    }`}
                  >
                    {entry.text}
                  </pre>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
