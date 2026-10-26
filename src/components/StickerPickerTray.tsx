import React from 'react';
import { FUN_STAMPS } from '../data/drawings';
import { soundManager } from '../utils/audio';

interface StickerPickerTrayProps {
  selectedStamp: string;
  onSelectStamp: (emoji: string) => void;
}

export const StickerPickerTray: React.FC<StickerPickerTrayProps> = ({
  selectedStamp,
  onSelectStamp
}) => {
  return (
    <div className="no-print bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-xs">
      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 whitespace-nowrap pl-1">
        <span>⭐</span>
        <span className="hidden sm:inline">Escolha o carimbo:</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
        {FUN_STAMPS.map((stamp) => {
          const isSelected = selectedStamp === stamp.emoji;
          return (
            <button
              key={stamp.id}
              onClick={() => {
                soundManager.playSparkle();
                onSelectStamp(stamp.emoji);
              }}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 border-2 border-amber-600 scale-110 shadow-sm'
                  : 'bg-white border border-amber-200 hover:scale-105'
              }`}
              title={stamp.name}
              aria-label={`Carimbo ${stamp.name}`}
            >
              {stamp.emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
};
