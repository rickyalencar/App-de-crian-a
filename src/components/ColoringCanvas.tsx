import React, { useRef, useEffect, useState, useCallback } from 'react';
import { DrawingItem, ToolType, FreehandStroke, PlacedStamp } from '../types/game';
import { soundManager } from '../utils/audio';
import { getNextRainbowColor, generateGlitterParticles } from '../utils/colorLogic';
import { fireConfetti } from '../utils/confetti';

interface ColoringCanvasProps {
  drawing: DrawingItem;
  currentTool: ToolType;
  selectedColor: string;
  brushSize: number;
  selectedStamp: string;
  filledRegions: Record<string, string>;
  onRegionClick: (pathId: string) => void;
  freehandStrokes: FreehandStroke[];
  onAddStroke: (stroke: FreehandStroke) => void;
  stamps: PlacedStamp[];
  onAddStamp: (stamp: PlacedStamp) => void;
  isColorByNumbers: boolean;
  isDancing: boolean;
}

export const ColoringCanvas: React.FC<ColoringCanvasProps> = ({
  drawing,
  currentTool,
  selectedColor,
  brushSize,
  selectedStamp,
  filledRegions,
  onRegionClick,
  freehandStrokes,
  onAddStroke,
  stamps,
  onAddStamp,
  isColorByNumbers,
  isDancing
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef<boolean>(false);
  const currentPointsRef = useRef<{ x: number; y: number }[]>([]);
  const strokeStepRef = useRef<number>(0);
  const [hoveredPathId, setHoveredPathId] = useState<string | null>(null);

  // Redraw all freehand strokes and stamps onto the canvas overlay
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw saved freehand strokes
    freehandStrokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.width * 1.5;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      } else if (stroke.isRainbow) {
        ctx.globalCompositeOperation = 'source-over';
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.beginPath();
          ctx.strokeStyle = getNextRainbowColor(i);
          ctx.lineWidth = stroke.width;
          ctx.moveTo(stroke.points[i - 1].x, stroke.points[i - 1].y);
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
          ctx.stroke();
        }
      } else if (stroke.isGlitter) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();

        // Draw glitter sparkles along stroke
        for (let i = 0; i < stroke.points.length; i += 3) {
          const pt = stroke.points[i];
          const sparkles = generateGlitterParticles(pt.x, pt.y, 2, stroke.width);
          sparkles.forEach((s) => {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    });

    // Draw stamps
    stamps.forEach((stamp) => {
      ctx.save();
      ctx.font = `${stamp.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stamp.emoji, stamp.x, stamp.y);
      ctx.restore();
    });
  }, [freehandStrokes, stamps]);

  // Keep canvas resolution synced to container
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      redrawCanvas();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Handle Confetti on Dancing
  useEffect(() => {
    if (isDancing) {
      fireConfetti({
        particleCount: 50,
        spread: 60
      });
    }
  }, [isDancing]);

  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (currentTool === 'bucket') return; // Handled by SVG region click

    const coords = getCanvasCoordinates(e);

    if (currentTool === 'stamp') {
      soundManager.playSparkle();
      onAddStamp({
        id: `stamp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        emoji: selectedStamp,
        x: coords.x,
        y: coords.y,
        size: brushSize * 2.2
      });
      return;
    }

    // Brush, Rainbow, Glitter, Eraser
    isDrawingRef.current = true;
    currentPointsRef.current = [coords];
    strokeStepRef.current = 0;

    if (currentTool === 'glitter') {
      soundManager.playSparkle();
    } else {
      soundManager.playPop();
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || currentTool === 'bucket' || currentTool === 'stamp') return;

    const coords = getCanvasCoordinates(e);
    currentPointsRef.current.push(coords);
    strokeStepRef.current++;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pts = currentPointsRef.current;
    if (pts.length < 2) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const p1 = pts[pts.length - 2];
    const p2 = pts[pts.length - 1];

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 1.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    } else if (currentTool === 'rainbow') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = getNextRainbowColor(strokeStepRef.current);
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    } else if (currentTool === 'glitter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      if (strokeStepRef.current % 3 === 0) {
        const sparkles = generateGlitterParticles(p2.x, p2.y, 2, brushSize);
        sparkles.forEach((s) => {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    ctx.restore();
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (currentPointsRef.current.length > 1) {
      onAddStroke({
        color: selectedColor,
        width: brushSize,
        points: [...currentPointsRef.current],
        isRainbow: currentTool === 'rainbow',
        isGlitter: currentTool === 'glitter',
        isEraser: currentTool === 'eraser'
      });
    }
    currentPointsRef.current = [];
  };

  return (
    <div
      ref={containerRef}
      className={`printable-area relative w-full aspect-square max-w-[540px] mx-auto bg-white rounded-3xl sm:rounded-4xl border-4 border-amber-300 shadow-xl overflow-hidden select-none transition-transform duration-300 ${
        isDancing ? 'animate-wiggle scale-102' : ''
      }`}
    >
      {/* Decorative Canvas Background Texture */}
      <div className="absolute inset-0 bg-radial from-amber-50/60 to-white pointer-events-none opacity-80" />

      {/* LAYER 1: SVG Fill Regions (Underlay - Click target for Bucket tool) */}
      <svg
        id="drawing-fills-layer"
        viewBox={drawing.viewBox}
        className="w-full h-full absolute inset-0 z-10"
        style={{
          cursor: currentTool === 'bucket' ? 'crosshair' : 'default'
        }}
      >
        <g id="fills-group">
          {drawing.paths.map((path) => {
            const isOutline = path.isOutline;
            const currentFill = filledRegions[path.id] || path.defaultFill || '#FFFFFF';

            return (
              <path
                key={`fill_${path.id}`}
                id={path.id}
                d={path.d}
                fill={currentFill}
                stroke={currentFill}
                strokeWidth={isOutline ? 0 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-colors duration-150 ${
                  !isOutline && currentTool === 'bucket' ? 'cursor-pointer' : ''
                }`}
                onClick={(e) => {
                  if (currentTool === 'bucket' && !isOutline) {
                    e.stopPropagation();
                    soundManager.playMagic();
                    onRegionClick(path.id);
                  }
                }}
                onMouseEnter={() => {
                  if (!isOutline && currentTool === 'bucket') {
                    setHoveredPathId(path.id);
                  }
                }}
                onMouseLeave={() => {
                  if (hoveredPathId === path.id) {
                    setHoveredPathId(null);
                  }
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* LAYER 2: Freehand Brush & Stamp Interactive Overlay Canvas */}
      {/* Sitting BETWEEN fills and outlines: User can paint freely, but outlines stay crisp on top! */}
      <canvas
        ref={canvasRef}
        id="drawing-freehand-canvas"
        className="absolute inset-0 z-20 w-full h-full touch-none"
        style={{
          cursor:
            currentTool === 'bucket'
              ? 'pointer'
              : currentTool === 'stamp'
              ? 'copy'
              : 'crosshair',
          pointerEvents: currentTool === 'bucket' ? 'none' : 'auto'
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      />

      {/* LAYER 3: Cartoon Outlines & Feature Details (ALWAYS ON TOP!) */}
      {/* This guarantees that using the brush or eraser never covers or erases the drawing's lines! */}
      <svg
        id="drawing-outlines-layer"
        viewBox={drawing.viewBox}
        className="w-full h-full absolute inset-0 z-30 pointer-events-none"
      >
        <g id="outlines-group">
          {drawing.paths.map((path) => {
            const isOutline = path.isOutline;
            const isHovered = hoveredPathId === path.id && currentTool === 'bucket';

            return (
              <path
                key={`outline_${path.id}`}
                id={`outline_${path.id}`}
                d={path.d}
                fill={isOutline ? (path.defaultFill || '#1E293B') : 'none'}
                stroke={isHovered ? '#F59E0B' : '#1E293B'}
                strokeWidth={isHovered ? (path.strokeWidth || 6) + 3 : (path.strokeWidth || 6)}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-150"
              />
            );
          })}
        </g>

        {/* Color by Numbers Mode: Region Number Markers */}
        {isColorByNumbers && (
          <g id="number-hints" className="pointer-events-none">
            {drawing.paths
              .filter((p) => p.numberHint !== undefined && !filledRegions[p.id])
              .map((p) => {
                let posX = 0;
                let posY = 0;

                if (p.numberPos) {
                  posX = p.numberPos.x;
                  posY = p.numberPos.y;
                } else {
                  const match = p.d.match(/M\s*([0-9.]+)[,\s]+([0-9.]+)/i);
                  if (!match) return null;
                  posX = parseFloat(match[1]);
                  posY = parseFloat(match[2]);
                }

                return (
                  <g key={`hint_${p.id}`} transform={`translate(${posX}, ${posY})`}>
                    <circle r="13" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2.5" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))" />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="13"
                      fontWeight="bold"
                      fill="#1E293B"
                    >
                      {p.numberHint}
                    </text>
                  </g>
                );
              })}
          </g>
        )}
      </svg>
    </div>
  );
};
