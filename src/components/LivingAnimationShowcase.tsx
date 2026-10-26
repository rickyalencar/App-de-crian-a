import React, { useEffect, useState } from 'react';
import { DrawingItem, FreehandStroke, PlacedStamp } from '../types/game';
import { soundManager } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';
import { RotateCcw, Download, Sparkles, BookOpen, X, Play } from 'lucide-react';

interface LivingAnimationShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  drawing: DrawingItem;
  filledRegions: Record<string, string>;
  freehandStrokes: FreehandStroke[];
  stamps: PlacedStamp[];
  onDownload: () => void;
  onOpenGallery: () => void;
}

export const LivingAnimationShowcase: React.FC<LivingAnimationShowcaseProps> = ({
  isOpen,
  onClose,
  drawing,
  filledRegions,
  freehandStrokes,
  stamps,
  onDownload,
  onOpenGallery
}) => {
  const [animationStep, setAnimationStep] = useState<number>(0);

  const startCelebration = () => {
    setAnimationStep((prev) => prev + 1);
    soundManager.playLivingMagic();
    soundManager.playFanfare();
    fireConfetti({ particleCount: 90, spread: 100 });
    soundManager.speak(`Olha só! O seu ${drawing.title} ganhou vida! Ficou lindo demais! Parabéns!`);
  };

  useEffect(() => {
    if (isOpen) {
      startCelebration();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Drawing-specific animation classes
  let animationClass = 'animate-character-dance';
  let themeBg = 'from-amber-200 via-yellow-100 to-pink-200';
  let environmentElements = (
    <>
      <div className="absolute top-10 left-12 text-4xl animate-float opacity-80">✨</div>
      <div className="absolute top-16 right-16 text-4xl animate-float opacity-80" style={{ animationDelay: '0.8s' }}>💖</div>
      <div className="absolute bottom-24 left-14 text-4xl animate-float opacity-80" style={{ animationDelay: '1.2s' }}>⭐</div>
      <div className="absolute bottom-20 right-14 text-4xl animate-float opacity-80" style={{ animationDelay: '1.6s' }}>🌈</div>
    </>
  );

  if (drawing.id === 'foguete') {
    animationClass = 'animate-pulse';
    themeBg = 'from-indigo-950 via-purple-900 to-slate-950';
    environmentElements = (
      <>
        <div className="absolute top-8 left-10 text-4xl animate-pulse">⭐</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌟</div>
        <div className="absolute bottom-28 left-24 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🪐</div>
        <div className="absolute bottom-20 right-16 text-4xl animate-float">🚀</div>
      </>
    );
  } else if (drawing.id === 'borboleta') {
    animationClass = 'animate-pulse-subtle';
    themeBg = 'from-emerald-100 via-sky-100 to-pink-100';
    environmentElements = (
      <>
        <div className="absolute top-10 left-14 text-4xl animate-float">🌸</div>
        <div className="absolute top-16 right-14 text-4xl animate-float" style={{ animationDelay: '0.7s' }}>🌺</div>
        <div className="absolute bottom-24 left-16 text-4xl animate-float" style={{ animationDelay: '1.4s' }}>✨</div>
        <div className="absolute bottom-16 right-20 text-4xl animate-float" style={{ animationDelay: '1.1s' }}>🌼</div>
      </>
    );
  } else if (drawing.id === 'carrinho') {
    animationClass = 'animate-wiggle';
    themeBg = 'from-sky-100 via-amber-50 to-emerald-100';
    environmentElements = (
      <>
        <div className="absolute top-12 left-10 text-4xl animate-float">⛅</div>
        <div className="absolute top-8 right-16 text-4xl animate-bounce">🌞</div>
        <div className="absolute bottom-20 left-16 text-3xl animate-pulse">💨</div>
        <div className="absolute bottom-20 right-16 text-4xl animate-float">🏁</div>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={`relative w-full max-w-2xl bg-linear-to-b ${themeBg} rounded-3xl sm:rounded-4xl border-4 border-amber-300 shadow-2xl overflow-hidden flex flex-col items-center justify-between p-4 sm:p-6 min-h-[560px] sm:min-h-[620px]`}>
        {/* Floating environment decorations */}
        {environmentElements}

        {/* Top Header Card */}
        <div className="relative z-10 w-full flex items-center justify-between pb-2">
          <div className="flex items-center gap-2 bg-white/90 px-4 py-1.5 rounded-2xl border-2 border-amber-300 shadow-sm">
            <span className="text-2xl animate-spin" style={{ animationDuration: '5s' }}>🪄</span>
            <div>
              <span className="text-xs font-black uppercase text-pink-600 block leading-tight">
                Animação Mágica
              </span>
              <span className="text-sm sm:text-base font-black text-slate-800">
                {drawing.title} em Ação!
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="p-2 sm:p-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 border-2 border-amber-300 shadow-sm cursor-pointer transition-transform active:scale-90"
            aria-label="Voltar para a pintura"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Stage: The Child's Animated Colored Drawing */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-2">
          <div
            key={animationStep}
            className={`relative w-64 h-64 sm:w-80 sm:h-80 bg-white/90 rounded-3xl p-3 border-4 border-amber-400 shadow-2xl transition-transform ${animationClass}`}
            style={{
              animationDuration: drawing.id === 'foguete' ? '1.5s' : '1.8s',
              animationIterationCount: 'infinite'
            }}
          >
            {/* SVG Drawing Layer with the child's exact colored regions */}
            <svg viewBox={drawing.viewBox} className="w-full h-full relative z-10">
              {/* Region Fills */}
              {drawing.paths.map((path) => {
                const fill = filledRegions[path.id] || path.defaultFill || '#FFFFFF';
                return (
                  <path
                    key={`living_fill_${path.id}`}
                    d={path.d}
                    fill={fill}
                    stroke={fill}
                    strokeWidth={path.isOutline ? 0 : 2}
                  />
                );
              })}

              {/* Freehand Strokes representation in living view */}
              {freehandStrokes.map((s, idx) => {
                if (s.points.length < 2) return null;
                const pathD = `M ${s.points.map((p) => `${(p.x / 540) * 500},${(p.y / 540) * 500}`).join(' L ')}`;
                return (
                  <path
                    key={`living_stroke_${idx}`}
                    d={pathD}
                    fill="none"
                    stroke={s.isRainbow ? '#EC4899' : s.color}
                    strokeWidth={s.width}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              })}

              {/* Stamps */}
              {stamps.map((st) => (
                <text
                  key={`living_stamp_${st.id}`}
                  x={(st.x / 540) * 500}
                  y={(st.y / 540) * 500}
                  fontSize={st.size * 1.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {st.emoji}
                </text>
              ))}

              {/* Outlines on top */}
              {drawing.paths.map((path) => (
                <path
                  key={`living_outline_${path.id}`}
                  d={path.d}
                  fill={path.isOutline ? (path.defaultFill || '#1E293B') : 'none'}
                  stroke="#1E293B"
                  strokeWidth={path.strokeWidth || 6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </svg>
          </div>

          {/* Cheerful praise message */}
          <div className="mt-3 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300 text-slate-800 text-xs sm:text-sm font-black shadow-xs flex items-center gap-1.5">
            <span>✨</span>
            <span>Uau! O seu desenho ganhou vida e está dançando para você!</span>
            <span>🎉</span>
          </div>
        </div>

        {/* Bottom Action Deck */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
          {/* Replay Animation */}
          <button
            onClick={startCelebration}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Dança</span>
          </button>

          {/* Download Colored Drawing */}
          <button
            onClick={() => {
              soundManager.playPop();
              onDownload();
            }}
            className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Salvar Desenho</span>
          </button>

          {/* Choose Another Drawing */}
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
              onOpenGallery();
            }}
            className="px-4 py-2.5 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Colorir Outro</span>
          </button>

          {/* Return to Canvas */}
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-xs sm:text-sm border-2 border-slate-300 shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <span>Voltar ao Desenho</span>
          </button>
        </div>
      </div>
    </div>
  );
};
