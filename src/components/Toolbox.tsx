import React from 'react';
import { ToolType } from '../types/game';
import { PaintBucket, Brush, Sparkles, Wand2, Stamp, Eraser, Play, Undo2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ToolboxProps {
  currentTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  brushSize: number;
  onSelectBrushSize: (size: number) => void;
  onUndo: () => void;
  canUndo: boolean;
  onAnimateDrawing: () => void;
  isDancing: boolean;
}

export const Toolbox: React.FC<ToolboxProps> = ({
  currentTool,
  onSelectTool,
  brushSize,
  onSelectBrushSize,
  onUndo,
  canUndo,
  onAnimateDrawing,
  isDancing
}) => {
  const tools: { id: ToolType; label: string; icon: React.ReactNode; color: string; badge?: string }[] = [
    {
      id: 'bucket',
      label: 'Balde Mágico',
      icon: <PaintBucket className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />,
      color: 'bg-sky-50 border-sky-300 text-sky-900',
      badge: 'Fácil'
    },
    {
      id: 'brush',
      label: 'Pincel',
      icon: <Brush className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />,
      color: 'bg-amber-50 border-amber-300 text-amber-900'
    },
    {
      id: 'rainbow',
      label: 'Arco-Íris',
      icon: <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      color: 'bg-purple-50 border-purple-300 text-purple-900',
      badge: 'Mágico'
    },
    {
      id: 'glitter',
      label: 'Glitter',
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />,
      color: 'bg-pink-50 border-pink-300 text-pink-900'
    },
    {
      id: 'stamp',
      label: 'Carimbos',
      icon: <Stamp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-300 text-emerald-900'
    },
    {
      id: 'eraser',
      label: 'Borracha',
      icon: <Eraser className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />,
      color: 'bg-rose-50 border-rose-300 text-rose-900'
    }
  ];

  return (
    <div className="no-print bg-white/90 border-2 border-amber-200 rounded-3xl p-3 shadow-sm flex flex-col gap-3">
      {/* Tool Selection Buttons */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          Ferramentas de Arte
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {tools.map((tool) => {
            const isActive = currentTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  soundManager.playPop();
                  onSelectTool(tool.id);
                }}
                className={`relative flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-center select-none active:scale-95 ${
                  isActive
                    ? 'border-amber-500 bg-amber-100/90 shadow-md ring-2 ring-amber-400 scale-102 font-extrabold'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-amber-200 font-semibold'
                }`}
                title={tool.label}
                aria-label={`Selecionar ferramenta ${tool.label}`}
              >
                {tool.badge && (
                  <span className="absolute -top-1.5 right-1 text-[9px] bg-pink-500 text-white font-black px-1.5 py-0.2 rounded-full uppercase">
                    {tool.badge}
                  </span>
                )}
                <div className="p-1">{tool.icon}</div>
                <span className="text-xs text-slate-800 tracking-tight mt-0.5">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brush Size Selector & Special Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-100">
        {/* Brush Size Controls (Shown when using brush, rainbow, glitter, or eraser) */}
        {currentTool !== 'bucket' && currentTool !== 'stamp' ? (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600 mr-1">Espessura:</span>
            {[
              { size: 8, label: 'Fino' },
              { size: 16, label: 'Médio' },
              { size: 28, label: 'Grosso' }
            ].map(({ size, label }) => (
              <button
                key={size}
                onClick={() => {
                  soundManager.playPop();
                  onSelectBrushSize(size);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border-2 transition-all cursor-pointer ${
                  brushSize === size
                    ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
                title={`Pincel ${label}`}
                aria-label={`Selecionar espessura ${label}`}
              >
                <span
                  className="rounded-full bg-slate-800"
                  style={{ width: `${Math.max(6, size / 2.5)}px`, height: `${Math.max(6, size / 2.5)}px` }}
                />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-xs font-medium text-slate-500 italic">
            {currentTool === 'bucket' ? 'Toque em qualquer parte do desenho para pintar!' : 'Toque no desenho para carimbar!'}
          </div>
        )}

        {/* Action Controls: Undo & Animate */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => {
              if (canUndo) {
                soundManager.playSwoosh();
                onUndo();
              }
            }}
            disabled={!canUndo}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer active:scale-95 ${
              canUndo
                ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
            }`}
            title="Desfazer última pincelada ou cor"
            aria-label="Desfazer ação"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Desfazer</span>
          </button>

          {/* Animate Drawing / Dance Button */}
          <button
            onClick={() => {
              soundManager.playFanfare();
              onAnimateDrawing();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
              isDancing
                ? 'bg-emerald-500 border-emerald-600 text-white animate-bounce'
                : 'bg-linear-to-r from-amber-400 to-pink-400 border-amber-500 text-white hover:brightness-105'
            }`}
            title="Fazer o desenho dançar e comemorar!"
            aria-label="Dar vida e animar o desenho"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Dar Vida! ✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
