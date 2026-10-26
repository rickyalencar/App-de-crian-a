import React, { useState } from 'react';
import { EDUCATIONAL_DRAWINGS } from '../data/drawings';
import { CategoryType, DrawingItem } from '../types/game';
import { soundManager } from '../utils/audio';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface DrawingSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDrawingId: string;
  onSelectDrawing: (drawing: DrawingItem) => void;
  completedDrawingIds: string[];
}

export const DrawingSelectorModal: React.FC<DrawingSelectorModalProps> = ({
  isOpen,
  onClose,
  currentDrawingId,
  onSelectDrawing,
  completedDrawingIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'todos'>('todos');

  if (!isOpen) return null;

  const categories: { id: CategoryType | 'todos'; label: string; emoji: string }[] = [
    { id: 'todos', label: 'Todos', emoji: '🎨' },
    { id: 'animais', label: 'Animais', emoji: '🦁' },
    { id: 'frutas', label: 'Comidinhas', emoji: '🍎' },
    { id: 'natureza', label: 'Espaço & Natureza', emoji: '🚀' },
    { id: 'veiculos', label: 'Veículos', emoji: '🚗' },
    { id: 'numeros', label: 'Números', emoji: '🥇' }
  ];

  const filteredDrawings = selectedCategory === 'todos'
    ? EDUCATIONAL_DRAWINGS
    : EDUCATIONAL_DRAWINGS.filter((d) => d.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-amber-50 border-4 border-amber-300 w-full max-w-3xl rounded-3xl sm:rounded-4xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-amber-200">
          <div className="flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-900">
                Galeria de Desenhos
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-amber-700">
                Escolha um desenho incrível para colorir!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="p-2 rounded-2xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors cursor-pointer"
            aria-label="Fechar galeria"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playPop();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawings Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 overflow-y-auto py-2 pr-1">
          {filteredDrawings.map((drawing) => {
            const isCurrent = drawing.id === currentDrawingId;
            const isCompleted = completedDrawingIds.includes(drawing.id);

            return (
              <button
                key={drawing.id}
                onClick={() => {
                  soundManager.playSwoosh();
                  onSelectDrawing(drawing);
                  onClose();
                }}
                className={`group relative flex flex-col items-center bg-white rounded-3xl p-3 border-3 transition-all cursor-pointer text-left hover:shadow-lg active:scale-95 ${
                  isCurrent
                    ? 'border-amber-500 ring-4 ring-amber-300 shadow-md scale-102'
                    : 'border-amber-200 hover:border-amber-400'
                }`}
              >
                {/* Completion Star Badge */}
                {isCompleted && (
                  <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-black p-1 rounded-full shadow-xs flex items-center gap-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                )}

                {/* SVG Outline Preview */}
                <div className="w-full aspect-square bg-amber-50/50 rounded-2xl p-2 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                  <svg viewBox={drawing.viewBox} className="w-full h-full max-h-32">
                    {drawing.paths.map((p) => (
                      <path
                        key={`thumb_${p.id}`}
                        d={p.d}
                        fill={p.defaultFill || '#FFFFFF'}
                        stroke="#1E293B"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}
                  </svg>
                </div>

                {/* Title & Emoji */}
                <div className="mt-2 text-center w-full">
                  <div className="flex items-center justify-center gap-1 font-black text-sm sm:text-base text-slate-800">
                    <span>{drawing.badgeEmoji}</span>
                    <span className="truncate">{drawing.title}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 capitalize">
                    {drawing.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
