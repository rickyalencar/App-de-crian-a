import React from 'react';
import { soundManager } from '../utils/audio';
import { Sparkles, Palette, Play, BookOpen } from 'lucide-react';

interface TitleScreenProps {
  onStart: () => void;
  onOpenGallery: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, onOpenGallery }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-linear-to-b from-amber-100 via-orange-50 to-pink-100 overflow-hidden select-none">
      {/* Playful Floating Background Blobs & Emojis */}
      <div className="absolute top-12 left-10 text-5xl animate-float opacity-70">🦁</div>
      <div className="absolute top-20 right-14 text-5xl animate-float opacity-70" style={{ animationDelay: '1s' }}>🚀</div>
      <div className="absolute bottom-20 left-16 text-5xl animate-float opacity-70" style={{ animationDelay: '1.5s' }}>🍎</div>
      <div className="absolute bottom-16 right-20 text-5xl animate-float opacity-70" style={{ animationDelay: '2s' }}>🦋</div>

      {/* Main Center Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/95 border-4 border-amber-300 rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center gap-5">
        {/* Animated Mascot Emblem */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-linear-to-br from-amber-300 to-amber-500 border-4 border-amber-500 shadow-lg flex items-center justify-center text-5xl sm:text-6xl animate-bounce">
            🎨
          </div>
          <div className="absolute -top-2 -right-2 bg-pink-500 text-white p-1.5 rounded-full shadow-md animate-spin" style={{ animationDuration: '6s' }}>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Big Cheerful Game Title */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-amber-600 drop-shadow-xs">
            Pinturinha <span className="text-pink-500">Mágica</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base font-bold text-slate-600 max-w-sm mx-auto">
            O joguinho de colorir mais fofo e educativo! Escolha suas cores favoritas e dê vida aos desenhos.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-2 w-full pt-1">
          <div className="bg-amber-50 rounded-2xl p-2.5 border border-amber-200 flex flex-col items-center">
            <span className="text-2xl">✨</span>
            <span className="text-xs font-bold text-amber-900 mt-1">Balde & Pincel</span>
          </div>
          <div className="bg-purple-50 rounded-2xl p-2.5 border border-purple-200 flex flex-col items-center">
            <span className="text-2xl">🔢</span>
            <span className="text-xs font-bold text-purple-900 mt-1">Por Números</span>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-2.5 border border-emerald-200 flex flex-col items-center">
            <span className="text-2xl">🔊</span>
            <span className="text-xs font-bold text-emerald-900 mt-1">Voz Educativa</span>
          </div>
        </div>

        {/* Primary Start CTA Button */}
        <div className="flex flex-col gap-2.5 w-full pt-2">
          <button
            data-start="true"
            onClick={() => {
              soundManager.playFanfare();
              onStart();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center gap-3"
            aria-label="Começar a brincar"
          >
            <Play className="w-7 h-7 fill-current" />
            <span>Começar a Colorir!</span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              onOpenGallery();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Ver Todos os Desenhos</span>
          </button>
        </div>

        {/* Clean Control / Accessibility Hint */}
        <p className="text-xs font-semibold text-slate-600 tracking-wide">
          Pressione Enter ou Espaço para iniciar · Indicado para todas as idades
        </p>
      </div>
    </div>
  );
};
