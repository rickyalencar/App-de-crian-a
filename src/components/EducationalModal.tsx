import React from 'react';
import { DrawingItem } from '../types/game';
import { soundManager } from '../utils/audio';
import { X, Volume2, Sparkles, Lightbulb } from 'lucide-react';

interface EducationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  drawing: DrawingItem;
}

export const EducationalModal: React.FC<EducationalModalProps> = ({
  isOpen,
  onClose,
  drawing
}) => {
  if (!isOpen) return null;

  const handleSpeak = () => {
    soundManager.speak(`${drawing.title}. ${drawing.funFact}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-amber-50 border-4 border-amber-400 w-full max-w-md rounded-3xl sm:rounded-4xl p-5 sm:p-6 shadow-2xl relative text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors cursor-pointer"
          aria-label="Fechar curiosidade"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Animated Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-300 border-3 border-amber-400 shadow-md flex items-center justify-center text-4xl mb-3 animate-bounce">
          {drawing.badgeEmoji}
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-200/60 py-1 px-3 rounded-full w-fit mx-auto mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>Você Sabia?</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
          {drawing.title}
        </h3>

        {/* Educational Fun Fact Card */}
        <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 text-slate-700 font-medium text-sm sm:text-base leading-relaxed mb-4 shadow-xs">
          {drawing.funFact}
        </div>

        {/* Audio Speech Button */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleSpeak}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>Ouvir Curiosidade</span>
          </button>
        </div>
      </div>
    </div>
  );
};
