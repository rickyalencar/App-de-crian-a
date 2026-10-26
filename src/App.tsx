import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EDUCATIONAL_DRAWINGS, FUN_STAMPS } from './data/drawings';
import { DrawingItem, ToolType, FreehandStroke, PlacedStamp } from './types/game';
import { Header } from './components/Header';
import { Palette } from './components/Palette';
import { Toolbox } from './components/Toolbox';
import { ColoringCanvas } from './components/ColoringCanvas';
import { StickerPickerTray } from './components/StickerPickerTray';
import { DrawingSelectorModal } from './components/DrawingSelectorModal';
import { EducationalModal } from './components/EducationalModal';
import { TitleScreen } from './components/TitleScreen';
import { CelebrationPromptModal } from './components/CelebrationPromptModal';
import { LivingAnimationShowcase } from './components/LivingAnimationShowcase';
import { KID_PALETTE, calculateColoringProgress, checkColorByNumbersMatch } from './utils/colorLogic';
import { soundManager } from './utils/audio';
import { fireConfetti } from './utils/confetti';

interface HistoryAction {
  type: 'fill' | 'stroke' | 'stamp';
  data: {
    pathId?: string;
    prevColor?: string;
    newColor?: string;
    stroke?: FreehandStroke;
    stamp?: PlacedStamp;
  };
}

export default function App() {
  const [gameState, setGameState] = useState<'title' | 'playing'>('title');
  const [currentDrawing, setCurrentDrawing] = useState<DrawingItem>(EDUCATIONAL_DRAWINGS[0]);
  const [currentTool, setCurrentTool] = useState<ToolType>('bucket');
  const [selectedColor, setSelectedColor] = useState<string>(KID_PALETTE[0].hex);
  const [brushSize, setBrushSize] = useState<number>(16);
  const [selectedStamp, setSelectedStamp] = useState<string>(FUN_STAMPS[0].emoji);
  const [isColorByNumbers, setIsColorByNumbers] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDancing, setIsDancing] = useState<boolean>(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [isFunFactOpen, setIsFunFactOpen] = useState<boolean>(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isLivingAnimationOpen, setIsLivingAnimationOpen] = useState<boolean>(false);

  // Per-drawing painting state
  const [filledRegionsMap, setFilledRegionsMap] = useState<Record<string, Record<string, string>>>({});
  const [freehandStrokesMap, setFreehandStrokesMap] = useState<Record<string, FreehandStroke[]>>({});
  const [stampsMap, setStampsMap] = useState<Record<string, PlacedStamp[]>>({});
  const [completedDrawingIds, setCompletedDrawingIds] = useState<string[]>([]);
  const [historyStack, setHistoryStack] = useState<HistoryAction[]>([]);

  // Current drawing active data
  const currentFilledRegions = filledRegionsMap[currentDrawing.id] || {};
  const currentFreehandStrokes = freehandStrokesMap[currentDrawing.id] || [];
  const currentStamps = stampsMap[currentDrawing.id] || [];

  // Calculate completion percentage
  const { percent: progressPercent } = calculateColoringProgress(
    currentDrawing.paths,
    currentFilledRegions
  );

  // Sync state with body dataset for ultra-mode compliance
  useEffect(() => {
    document.body.dataset.state = gameState;
  }, [gameState]);

  // Support ?autostart=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setGameState('playing');
    }
  }, []);

  // Keyboard shortcuts (Enter/Space on title screen, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'title') {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          soundManager.playFanfare();
          setGameState('playing');
        }
      } else {
        if (e.key === 'Escape') {
          setIsSelectorOpen(false);
          setIsFunFactOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // When the child finishes coloring the drawing (100%), ask if they want to give life to the drawing!
  useEffect(() => {
    if (progressPercent >= 100 && !completedDrawingIds.includes(currentDrawing.id)) {
      setIsPromptModalOpen(true);
    }
  }, [progressPercent, currentDrawing.id, completedDrawingIds]);

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
  };

  const handleRegionClick = (pathId: string) => {
    const prevColor = currentFilledRegions[pathId] || '';
    const newFilled = {
      ...currentFilledRegions,
      [pathId]: selectedColor
    };

    setFilledRegionsMap((prev) => ({
      ...prev,
      [currentDrawing.id]: newFilled
    }));

    setHistoryStack((prev) => [
      ...prev,
      {
        type: 'fill',
        data: { pathId, prevColor, newColor: selectedColor }
      }
    ]);

    // Check if this matches in Color by Numbers mode
    if (isColorByNumbers) {
      const matchStatus = checkColorByNumbersMatch(currentDrawing.paths, newFilled);
      if (matchStatus.isComplete) {
        soundManager.playFanfare();
        fireConfetti({ particleCount: 70, spread: 80 });
      }
    }
  };

  const handleAddStroke = (stroke: FreehandStroke) => {
    setFreehandStrokesMap((prev) => ({
      ...prev,
      [currentDrawing.id]: [...(prev[currentDrawing.id] || []), stroke]
    }));

    setHistoryStack((prev) => [
      ...prev,
      {
        type: 'stroke',
        data: { stroke }
      }
    ]);
  };

  const handleAddStamp = (stamp: PlacedStamp) => {
    setStampsMap((prev) => ({
      ...prev,
      [currentDrawing.id]: [...(prev[currentDrawing.id] || []), stamp]
    }));

    setHistoryStack((prev) => [
      ...prev,
      {
        type: 'stamp',
        data: { stamp }
      }
    ]);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const lastAction = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, prev.length - 1));

    if (lastAction.type === 'fill' && lastAction.data.pathId) {
      const { pathId, prevColor } = lastAction.data;
      setFilledRegionsMap((prev) => {
        const current = { ...(prev[currentDrawing.id] || {}) };
        if (prevColor) {
          current[pathId] = prevColor;
        } else {
          delete current[pathId];
        }
        return { ...prev, [currentDrawing.id]: current };
      });
    } else if (lastAction.type === 'stroke') {
      setFreehandStrokesMap((prev) => {
        const strokes = [...(prev[currentDrawing.id] || [])];
        strokes.pop();
        return { ...prev, [currentDrawing.id]: strokes };
      });
    } else if (lastAction.type === 'stamp') {
      setStampsMap((prev) => {
        const stamps = [...(prev[currentDrawing.id] || [])];
        stamps.pop();
        return { ...prev, [currentDrawing.id]: stamps };
      });
    }
  };

  const handleReset = () => {
    setFilledRegionsMap((prev) => ({
      ...prev,
      [currentDrawing.id]: {}
    }));
    setFreehandStrokesMap((prev) => ({
      ...prev,
      [currentDrawing.id]: []
    }));
    setStampsMap((prev) => ({
      ...prev,
      [currentDrawing.id]: []
    }));
    setHistoryStack([]);
    soundManager.playPop();
  };

  const handleSelectDrawing = (drawing: DrawingItem) => {
    setCurrentDrawing(drawing);
    setHistoryStack([]);
    soundManager.speak(drawing.title);
  };

  const handleAnimateDrawing = () => {
    setIsPromptModalOpen(true);
  };

  const handleConfirmGiveLife = () => {
    setIsPromptModalOpen(false);
    if (!completedDrawingIds.includes(currentDrawing.id)) {
      setCompletedDrawingIds((prev) => [...prev, currentDrawing.id]);
    }
    setIsLivingAnimationOpen(true);
    setIsDancing(true);
  };

  const handleCancelGiveLife = () => {
    setIsPromptModalOpen(false);
  };

  // Download artwork as a PNG file with layered fills, user strokes, and outlines
  const handleDownload = () => {
    const fillsSvg = document.querySelector('svg#drawing-fills-layer') as SVGElement | null;
    const outlinesSvg = document.querySelector('svg#drawing-outlines-layer') as SVGElement | null;
    const freehandCanvas = document.querySelector('canvas#drawing-freehand-canvas') as HTMLCanvasElement | null;

    if (!fillsSvg || !outlinesSvg) return;

    const exportCanvas = document.createElement('canvas');
    const width = 800;
    const height = 800;
    exportCanvas.width = width;
    exportCanvas.height = height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // Background & cute frame
    ctx.fillStyle = '#FEF3C7';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#FFFFFF';
    ctx.roundRect(40, 40, width - 80, height - 80, 24);
    ctx.fill();

    const serializer = new XMLSerializer();
    const fillsBlob = new Blob([serializer.serializeToString(fillsSvg)], { type: 'image/svg+xml;charset=utf-8' });
    const outlinesBlob = new Blob([serializer.serializeToString(outlinesSvg)], { type: 'image/svg+xml;charset=utf-8' });

    const URLObj = window.URL || window.webkitURL || window;
    const fillsUrl = URLObj.createObjectURL(fillsBlob);
    const outlinesUrl = URLObj.createObjectURL(outlinesBlob);

    const fillsImg = new Image();
    fillsImg.onload = () => {
      // 1. Draw SVG Fills
      ctx.drawImage(fillsImg, 60, 60, width - 120, height - 120);
      URLObj.revokeObjectURL(fillsUrl);

      // 2. Draw user freehand strokes & stamps (Layer 2)
      if (freehandCanvas) {
        ctx.drawImage(freehandCanvas, 60, 60, width - 120, height - 120);
      }

      // 3. Draw SVG Outlines on TOP (Layer 3 - guarantees lines never disappear!)
      const outlinesImg = new Image();
      outlinesImg.onload = () => {
        ctx.drawImage(outlinesImg, 60, 60, width - 120, height - 120);
        URLObj.revokeObjectURL(outlinesUrl);

        // Watermark label
        ctx.fillStyle = '#D97706';
        ctx.font = 'bold 22px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Pinturinha Mágica · ${currentDrawing.title}`, width / 2, height - 18);

        const downloadLink = document.createElement('a');
        downloadLink.download = `minha_pintura_${currentDrawing.id}.png`;
        downloadLink.href = exportCanvas.toDataURL('image/png');
        downloadLink.click();
        soundManager.playFanfare();
      };
      outlinesImg.src = outlinesUrl;
    };
    fillsImg.src = fillsUrl;
  };

  const handlePrint = () => {
    window.print();
  };

  if (gameState === 'title') {
    return (
      <TitleScreen
        onStart={handleStartGame}
        onOpenGallery={() => {
          setGameState('playing');
          setIsSelectorOpen(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/80 via-orange-50/40 to-amber-50/80 flex flex-col justify-between">
      {/* Top Header */}
      <Header
        currentTitle={currentDrawing.title}
        badgeEmoji={currentDrawing.badgeEmoji}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenSelector={() => setIsSelectorOpen(true)}
        onOpenFunFact={() => setIsFunFactOpen(true)}
        onDownload={handleDownload}
        onPrint={handlePrint}
        onReset={handleReset}
        isColorByNumbers={isColorByNumbers}
        onToggleColorByNumbers={() => setIsColorByNumbers(!isColorByNumbers)}
        progressPercent={progressPercent}
        onPromptGiveLife={handleAnimateDrawing}
      />

      {/* Main Creative Playfield */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6">
        {/* Left / Center Zone: Canvas */}
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          <ColoringCanvas
            drawing={currentDrawing}
            currentTool={currentTool}
            selectedColor={selectedColor}
            brushSize={brushSize}
            selectedStamp={selectedStamp}
            filledRegions={currentFilledRegions}
            onRegionClick={handleRegionClick}
            freehandStrokes={currentFreehandStrokes}
            onAddStroke={handleAddStroke}
            stamps={currentStamps}
            onAddStamp={handleAddStamp}
            isColorByNumbers={isColorByNumbers}
            isDancing={isDancing}
          />

          {/* Quick encouragement tag below canvas */}
          <div className="no-print mt-2 flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-800/80">
            <span>✨</span>
            <span>
              {currentTool === 'bucket'
                ? 'Toque nas partes do desenho para preencher com a cor!'
                : currentTool === 'stamp'
                ? 'Toque na tela para estampar adesivos fofos!'
                : 'Arraste o dedo ou mouse para pintar livremente!'}
            </span>
          </div>
        </div>

        {/* Right Zone: Toolbox, Stamps & Palette Deck */}
        <div className="w-full lg:w-96 flex flex-col gap-3">
          {/* Stamps Bar (Shown when stamps tool is active) */}
          {currentTool === 'stamp' && (
            <StickerPickerTray
              selectedStamp={selectedStamp}
              onSelectStamp={setSelectedStamp}
            />
          )}

          {/* Toolbox Controls */}
          <Toolbox
            currentTool={currentTool}
            onSelectTool={setCurrentTool}
            brushSize={brushSize}
            onSelectBrushSize={setBrushSize}
            onUndo={handleUndo}
            canUndo={historyStack.length > 0}
            onAnimateDrawing={handleAnimateDrawing}
            isDancing={isDancing}
          />

          {/* Color Palette */}
          <Palette
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            isColorByNumbers={isColorByNumbers}
          />
        </div>
      </main>

      {/* Celebration & Give Life Confirmation Prompt Modal */}
      <CelebrationPromptModal
        isOpen={isPromptModalOpen}
        onConfirm={handleConfirmGiveLife}
        onCancel={handleCancelGiveLife}
        drawingTitle={currentDrawing.title}
        badgeEmoji={currentDrawing.badgeEmoji}
      />

      {/* Living Animation Showcase Stage */}
      <LivingAnimationShowcase
        isOpen={isLivingAnimationOpen}
        onClose={() => {
          setIsLivingAnimationOpen(false);
          setIsDancing(false);
        }}
        drawing={currentDrawing}
        filledRegions={currentFilledRegions}
        freehandStrokes={currentFreehandStrokes}
        stamps={currentStamps}
        onDownload={handleDownload}
        onOpenGallery={() => {
          setIsLivingAnimationOpen(false);
          setIsDancing(false);
          setIsSelectorOpen(true);
        }}
      />

      {/* Educational Fact Modal */}
      <EducationalModal
        isOpen={isFunFactOpen}
        onClose={() => setIsFunFactOpen(false)}
        drawing={currentDrawing}
      />

      {/* Drawing Selector Gallery Modal */}
      <DrawingSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        currentDrawingId={currentDrawing.id}
        onSelectDrawing={handleSelectDrawing}
        completedDrawingIds={completedDrawingIds}
      />
    </div>
  );
}
