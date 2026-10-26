import { KID_PALETTE } from '../utils/colorLogic';
import { soundManager } from '../utils/audio';
import { Volume2, Check } from 'lucide-react';

interface PaletteProps {
  selectedColor: string;
  onSelectColor: (hex: string) => void;
  isColorByNumbers: boolean;
  activeNumber?: number;
}

export const Palette: React.FC<PaletteProps> = ({
  selectedColor,
  onSelectColor,
  isColorByNumbers
}) => {
  const currentColorObj = KID_PALETTE.find(
    (c) => c.hex.toLowerCase() === selectedColor.toLowerCase()
  ) || { name: 'Cor Especial', hex: selectedColor };

  const handleColorClick = (hex: string, name: string) => {
    soundManager.playPop();
    onSelectColor(hex);
    soundManager.speak(name);
  };

  return (
    <div className="no-print bg-white/90 border-2 border-amber-200 rounded-3xl p-3 shadow-sm flex flex-col gap-2">
      {/* Current Color Label with sound pronunciation */}
      <div className="flex items-center justify-between px-2 text-xs sm:text-sm font-bold text-slate-700">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full border border-slate-400 shadow-xs"
            style={{ backgroundColor: selectedColor }}
          />
          <span>Cor: <span className="text-amber-700 font-extrabold">{currentColorObj.name}</span></span>
        </div>
        <button
          onClick={() => soundManager.speak(currentColorObj.name)}
          className="p-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center gap-1 text-xs font-semibold cursor-pointer transition-transform active:scale-95"
          title="Ouvir nome da cor"
          aria-label="Ouvir pronúncia da cor"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ouvir</span>
        </button>
      </div>

      {/* Chunky Color Grid */}
      <div className="grid grid-cols-8 sm:grid-cols-8 md:grid-cols-8 gap-1.5 sm:gap-2">
        {KID_PALETTE.map((color) => {
          const isSelected = selectedColor.toLowerCase() === color.hex.toLowerCase();
          return (
            <button
              key={color.hex}
              onClick={() => handleColorClick(color.hex, color.name)}
              className={`relative group aspect-square rounded-2xl flex items-center justify-center transition-all cursor-pointer transform active:scale-90 ${
                isSelected
                  ? 'ring-4 ring-amber-400 ring-offset-2 scale-105 z-10 shadow-md'
                  : 'hover:scale-105 shadow-xs border border-black/10'
              }`}
              style={{ backgroundColor: color.hex }}
              title={`${color.name} ${isColorByNumbers && color.number ? `(Número ${color.number})` : ''}`}
              aria-label={`Selecionar cor ${color.name}`}
            >
              {/* If Color by Numbers is enabled, show the number inside the color swatch! */}
              {isColorByNumbers && color.number && (
                <span
                  className={`text-xs sm:text-sm font-black px-1.5 py-0.5 rounded-full ${
                    color.hex === '#FFFFFF' || color.hex === '#FBBF24' || color.hex === '#FDE047'
                      ? 'text-slate-900 bg-black/10'
                      : 'text-white bg-black/30'
                  }`}
                >
                  {color.number}
                </span>
              )}

              {/* Selection Checkmark */}
              {isSelected && !isColorByNumbers && (
                <Check
                  className={`w-4 h-4 stroke-[3.5] ${
                    color.hex === '#FFFFFF' || color.hex === '#FBBF24' || color.hex === '#FDE047'
                      ? 'text-slate-900'
                      : 'text-white'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
