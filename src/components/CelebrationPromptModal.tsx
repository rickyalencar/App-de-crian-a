import React, { useEffect } from 'react';
import { soundManager } from '../utils/audio';
import { Sparkles, Wand2, Paintbrush, X } from 'lucide-react';

interface CelebrationPromptModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  drawingTitle: string;
  badgeEmoji: string;
}

export const CelebrationPromptModal: React.FC<CelebrationPromptModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  drawingTitle,
  badgeEmoji
}) => {
  useEffect(() => {
    if (isOpen) {
      soundManager.playSparkle();
      soundManager.speak(`Parabéns! Você coloriu o ${drawingTitle}! Posso dar vida ao seu desenho agora?`);
    }
  }, [isOpen, drawingTitle]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-amber-50 border-4 border-amber-400 w-full max-w-md rounded-3xl sm:rounded-4xl p-6 sm:p-7 shadow-2xl text-center relative flex flex-col items-center gap-4">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onCancel();
          }}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors cursor-pointer"
          aria-label="Continuar pintando"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Magic Wand & Mascot Icon */}
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-linear-to-br from-amber-300 via-orange-400 to-pink-500 border-4 border-amber-400 shadow-lg flex items-center justify-center text-5xl sm:text-6xl animate-bounce">
            {badgeEmoji}
          </div>
          <div className="absolute -top-2 -right-2 bg-purple-600 text-white p-2 rounded-full shadow-md animate-spin" style={{ animationDuration: '4s' }}>
            <Wand2 className="w-5 h-5" />
          </div>
        </div>

        {/* Question & Praise */}
        <div>
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
            🎉 Pintura Concluída!
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            Posso dar vida ao seu desenho?
          </h3>
          <p className="mt-2 text-sm sm:text-base font-bold text-slate-600 leading-snug">
            O seu <span className="text-amber-700 font-extrabold">{drawingTitle}</span> vai se mexer e fazer uma animação mágica!
          </p>
        </div>

        {/* Confirmation Buttons */}
        <div className="flex flex-col gap-2.5 w-full pt-2">
          {/* Primary Confirmation: Sim, Dar Vida! */}
          <button
            onClick={() => {
              soundManager.playLivingMagic();
              onConfirm();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-black text-lg sm:text-xl shadow-xl transition-all transform hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 border-2 border-emerald-400"
            aria-label="Confirmar dar vida ao desenho"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span>Sim, Dar Vida! ✨</span>
          </button>

          {/* Secondary: Continuar pintando */}
          <button
            onClick={() => {
              soundManager.playPop();
              onCancel();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border-2 border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Paintbrush className="w-4 h-4 text-slate-500" />
            <span>Ainda não, quero pintar mais</span>
          </button>
        </div>
      </div>
    </div>
  );
};
