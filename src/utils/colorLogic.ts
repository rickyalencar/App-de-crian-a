import { DrawingPath } from '../types/game';

/**
 * Standard palette colors with Portuguese child-friendly naming
 */
export const KID_PALETTE = [
  { hex: '#EF4444', name: 'Vermelho Morango', number: 1 },
  { hex: '#F97316', name: 'Laranja Cenourinha', number: 2 },
  { hex: '#FBBF24', name: 'Amarelo Sol', number: 3 },
  { hex: '#22C55E', name: 'Verde Floresta', number: 4 },
  { hex: '#06B6D4', name: 'Azul Piscina', number: 5 },
  { hex: '#3B82F6', name: 'Azul Céu', number: 6 },
  { hex: '#8B5CF6', name: 'Roxo Uva', number: 7 },
  { hex: '#EC4899', name: 'Rosa Algodão Doce', number: 8 },
  { hex: '#A16207', name: 'Marrom Castanha', number: 9 },
  { hex: '#1E293B', name: 'Preto Meia-Noite', number: 10 },
  { hex: '#FFFFFF', name: 'Branco Neve', number: 11 },
  { hex: '#94A3B8', name: 'Cinza Elefantinho', number: 12 },
  { hex: '#84CC16', name: 'Verde Limão', number: 13 },
  { hex: '#F472B6', name: 'Rosa Chiclete', number: 14 },
  { hex: '#FDE047', name: 'Amarelo Pintinho', number: 15 },
  { hex: '#0284C7', name: 'Azul Mar Profundo', number: 16 }
];

export const RAINBOW_CYCLE = [
  '#EF4444',
  '#F97316',
  '#FBBF24',
  '#22C55E',
  '#06B6D4',
  '#3B82F6',
  '#8B5CF6',
  '#EC4899'
];

/**
 * Calculates how much of the drawing has been colored
 */
export function calculateColoringProgress(
  paths: DrawingPath[],
  filledRegions: Record<string, string>
): { filledCount: number; totalFillable: number; percent: number } {
  const fillablePaths = paths.filter((p) => !p.isOutline);
  const totalFillable = fillablePaths.length;
  if (totalFillable === 0) return { filledCount: 0, totalFillable: 0, percent: 100 };

  let filledCount = 0;
  for (const path of fillablePaths) {
    if (filledRegions[path.id] && filledRegions[path.id] !== 'transparent' && filledRegions[path.id] !== '#ffffff') {
      filledCount++;
    }
  }

  const percent = Math.min(100, Math.round((filledCount / totalFillable) * 100));
  return { filledCount, totalFillable, percent };
}

/**
 * Checks matching accuracy for Color by Numbers mode
 */
export function checkColorByNumbersMatch(
  paths: DrawingPath[],
  filledRegions: Record<string, string>
): { matchedCount: number; totalNumbered: number; percentCorrect: number; isComplete: boolean } {
  const numberedPaths = paths.filter((p) => p.numberHint !== undefined && p.targetColor);
  const totalNumbered = numberedPaths.length;

  if (totalNumbered === 0) {
    return { matchedCount: 0, totalNumbered: 0, percentCorrect: 100, isComplete: true };
  }

  let matchedCount = 0;
  for (const path of numberedPaths) {
    const currentFill = filledRegions[path.id]?.toLowerCase();
    const target = path.targetColor?.toLowerCase();
    if (currentFill && target && isColorClose(currentFill, target)) {
      matchedCount++;
    }
  }

  const percentCorrect = Math.round((matchedCount / totalNumbered) * 100);
  const isComplete = matchedCount === totalNumbered;

  return { matchedCount, totalNumbered, percentCorrect, isComplete };
}

/**
 * Tolerance check between two hex colors (allows slight tone variants)
 */
export function isColorClose(hex1: string, hex2: string, tolerance: number = 35): boolean {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return hex1.toLowerCase() === hex2.toLowerCase();

  const distance = Math.sqrt(
    Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2)
  );
  return distance <= tolerance;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    return {
      r: parseInt(cleanHex[0] + cleanHex[0], 16),
      g: parseInt(cleanHex[1] + cleanHex[1], 16),
      b: parseInt(cleanHex[2] + cleanHex[2], 16)
    };
  }
  if (cleanHex.length === 6) {
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16)
    };
  }
  return null;
}

/**
 * Gets cycling rainbow color based on stroke step counter
 */
export function getNextRainbowColor(step: number): string {
  const index = Math.abs(step) % RAINBOW_CYCLE.length;
  return RAINBOW_CYCLE[index];
}

/**
 * Generates sparkling stars coordinates for glitter brush effect
 */
export function generateGlitterParticles(
  x: number,
  y: number,
  count: number = 4,
  spread: number = 16
): { x: number; y: number; size: number; rotation: number }[] {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (i * (2 * Math.PI)) / count + Math.random() * 0.5;
    const dist = Math.random() * spread;
    particles.push({
      x: x + Math.cos(angle) * dist,
      y: y + Math.sin(angle) * dist,
      size: 3 + Math.floor(Math.random() * 6),
      rotation: Math.floor(Math.random() * 360)
    });
  }
  return particles;
}
