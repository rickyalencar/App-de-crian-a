export type ToolType = 'bucket' | 'brush' | 'rainbow' | 'glitter' | 'stamp' | 'eraser';

export type CategoryType = 'animais' | 'natureza' | 'alfabeto' | 'numeros' | 'veiculos' | 'frutas';

export interface DrawingPath {
  id: string;
  d: string;
  name: string;
  defaultFill?: string;
  isOutline?: boolean;
  numberHint?: number; // 1-8 for Color by Numbers
  numberPos?: { x: number; y: number }; // Precise label coordinates for number hint
  targetColor?: string; // target hex code for Color by Numbers verification
  strokeWidth?: number;
}

export interface DrawingItem {
  id: string;
  title: string;
  category: CategoryType;
  difficulty: 'fácil' | 'médio';
  viewBox: string;
  funFact: string;
  audioNarration: string;
  badgeEmoji: string;
  paths: DrawingPath[];
}

export interface PaletteColor {
  hex: string;
  name: string;
  number?: number;
  bgTailwind?: string;
}

export interface StampItem {
  id: string;
  emoji: string;
  name: string;
}

export interface PlacedStamp {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

export interface FreehandStroke {
  color: string;
  width: number;
  points: { x: number; y: number }[];
  isRainbow?: boolean;
  isGlitter?: boolean;
  isEraser?: boolean;
}

export interface DrawingProgress {
  filledRegions: Record<string, string>; // pathId -> hex
  freehandStrokes: FreehandStroke[];
  stamps: PlacedStamp[];
  completed: boolean;
  accuracyScore?: number;
}
