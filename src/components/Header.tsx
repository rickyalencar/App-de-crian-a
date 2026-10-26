import React from 'react';
import { Volume2, VolumeX, Sparkles, Printer, Download, BookOpen, RotateCcw, HelpCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  currentTitle: string;
  badgeEmoji: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSelector: () => void;
  onOpenFunFact: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onReset: () => void;
  isColorByNumbers: boolean;
  onToggleColorByNumbers: () => void;
  progressPercent: number;
  onPromptGiveLife?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTitle,
  badgeEmoji,
  isMuted,
  onToggleMute,
  onOpenSelector,
  onOpenFunFact,
  onDownload,
  onPrint,
  onReset,
  isColorByNumbers,
  onToggleColorByNumbers,
  progressPercent,
  onPromptGiveLife
}) => {
  return (
    <header className="no-print bg-white/95 backdrop-blur-xs border-b-4 border-amber-200/80 px-3 py-2 sm:px-6 sm:py-2.5 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
        {/* Brand / Logo + Current Drawing Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenSelector();
            }}
            className="flex items-center gap-2 group text-left cursor-pointer transition-transform active:scale-95"
            title="Escolher outro desenho"
            aria-label="Abrir galeria de desenhos"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 shadow-sm flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform">
              🎨
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-amber-600 drop-shadow-xs">
                  Pinturinha
                </span>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-pink-500">
                  Mágica
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600">
                <span>{badgeEmoji}</span>
                <span className="underline decoration-dotted decoration-amber-400 underline-offset-2">
                  {currentTitle}
                </span>
                <span className="text-amber-500 font-bold ml-1">⇄ Trocar</span>
              </div>
            </div>
          </button>
        </div>

        {/* Progress Bar & Educational Mode Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Color by Numbers Mode Toggle */}
          <button
            onClick={() => {
              soundManager.playPop();
              onToggleColorByNumbers();
            }}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 shadow-xs active:scale-95 ${
              isColorByNumbers
                ? 'bg-purple-500 border-purple-600 text-white animate-pulse-subtle'
                : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
            }`}
            title="Modo Colorir por Números para aprender a contar"
            aria-label="Alternar modo colorir por números"
          >
            <span className="text-base">🔢</span>
            <span className="hidden sm:inline">Colorir por Números</span>
            <span className="sm:hidden">Números</span>
            {isColorByNumbers && <span className="bg-white text-purple-700 text-[10px] px-1.5 py-0.2 rounded-full font-black">ON</span>}
          </button>

          {/* Educational Fun Fact Button */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenFunFact();
            }}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm bg-emerald-50 border-2 border-emerald-300 text-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Curiosidade educativa deste desenho"
            aria-label="Abrir curiosidade educativa"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Curiosidade</span>
            <span className="text-xs bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-full font-bold">💡</span>
          </button>

          {/* Progress Indicator / Dar Vida shortcut */}
          <button
            onClick={() => {
              if (onPromptGiveLife) {
                soundManager.playSparkle();
                onPromptGiveLife();
              }
            }}
            className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 transition-all cursor-pointer active:scale-95 shadow-xs"
            title="Clique para dar vida ao desenho!"
            aria-label="Dar vida ao desenho"
          >
            <span>Colorido:</span>
            <div className="w-16 sm:w-20 bg-amber-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="tabular-nums">{progressPercent}%</span>
            {progressPercent >= 50 && (
              <span className="text-[11px] bg-pink-500 text-white px-1.5 py-0.5 rounded-full font-black animate-pulse">
                Dar Vida ✨
              </span>
            )}
          </button>

          {/* Action Utilities (Print, Download, Sound, Reset) */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => {
                soundManager.playPop();
                onPrint();
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-transform active:scale-90 cursor-pointer"
              title="Imprimir desenho para colorir no papel"
              aria-label="Imprimir desenho para colorir no papel"
            >
              <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                onDownload();
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 border border-sky-300 transition-transform active:scale-90 cursor-pointer"
              title="Salvar meu desenho lindo como imagem"
              aria-label="Salvar desenho como imagem"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                onReset();
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-transform active:scale-90 cursor-pointer"
              title="Limpar pintura e recomeçar"
              aria-label="Limpar pintura"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => {
                onToggleMute();
                soundManager.playPop();
              }}
              className={`p-2 sm:p-2.5 rounded-xl border transition-transform active:scale-90 cursor-pointer ${
                isMuted
                  ? 'bg-slate-100 text-slate-400 border-slate-300'
                  : 'bg-amber-100 text-amber-700 border-amber-300'
              }`}
              title={isMuted ? 'Ligar som' : 'Desligar som'}
              aria-label={isMuted ? 'Ligar som' : 'Desligar som'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
