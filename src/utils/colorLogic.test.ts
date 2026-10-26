import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateColoringProgress,
  checkColorByNumbersMatch,
  isColorClose,
  hexToRgb,
  getNextRainbowColor
} from './colorLogic';
import { DrawingPath } from '../types/game';

test('hexToRgb parses 3-digit and 6-digit hex values', () => {
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('#EF4444'), { r: 239, g: 68, b: 68 });
  assert.equal(hexToRgb('invalid'), null);
});

test('isColorClose matches identical and near colors', () => {
  assert.equal(isColorClose('#EF4444', '#EF4444'), true);
  // Near red
  assert.equal(isColorClose('#EF4444', '#EE4040', 20), true);
  // Completely different
  assert.equal(isColorClose('#EF4444', '#3B82F6', 30), false);
});

test('calculateColoringProgress counts only non-outline and colored regions', () => {
  const paths: DrawingPath[] = [
    { id: 'p1', d: 'M0,0', name: 'Face' },
    { id: 'p2', d: 'M1,1', name: 'Juba' },
    { id: 'outline1', d: 'M2,2', name: 'Contorno', isOutline: true }
  ];

  const emptyFill: Record<string, string> = {};
  const progress0 = calculateColoringProgress(paths, emptyFill);
  assert.equal(progress0.totalFillable, 2);
  assert.equal(progress0.filledCount, 0);
  assert.equal(progress0.percent, 0);

  const halfFill: Record<string, string> = { p1: '#EF4444' };
  const progress50 = calculateColoringProgress(paths, halfFill);
  assert.equal(progress50.filledCount, 1);
  assert.equal(progress50.percent, 50);

  const fullFill: Record<string, string> = { p1: '#EF4444', p2: '#FBBF24' };
  const progress100 = calculateColoringProgress(paths, fullFill);
  assert.equal(progress100.filledCount, 2);
  assert.equal(progress100.percent, 100);
});

test('checkColorByNumbersMatch validates target colors accuracy', () => {
  const paths: DrawingPath[] = [
    { id: 'p1', d: 'M0,0', name: 'Sol', numberHint: 1, targetColor: '#FBBF24' },
    { id: 'p2', d: 'M1,1', name: 'Céu', numberHint: 2, targetColor: '#3B82F6' }
  ];

  const wrongFill = { p1: '#EF4444', p2: '#22C55E' };
  const resWrong = checkColorByNumbersMatch(paths, wrongFill);
  assert.equal(resWrong.matchedCount, 0);
  assert.equal(resWrong.isComplete, false);

  const partialFill = { p1: '#FBBF24', p2: '#EF4444' };
  const resPartial = checkColorByNumbersMatch(paths, partialFill);
  assert.equal(resPartial.matchedCount, 1);
  assert.equal(resPartial.percentCorrect, 50);
  assert.equal(resPartial.isComplete, false);

  const correctFill = { p1: '#FBBF24', p2: '#3B82F6' };
  const resCorrect = checkColorByNumbersMatch(paths, correctFill);
  assert.equal(resCorrect.matchedCount, 2);
  assert.equal(resCorrect.percentCorrect, 100);
  assert.equal(resCorrect.isComplete, true);
});

test('getNextRainbowColor cycles continuously through spectrum', () => {
  const c0 = getNextRainbowColor(0);
  const c1 = getNextRainbowColor(1);
  const c8 = getNextRainbowColor(8); // cycle length is 8, so step 8 equals step 0
  assert.notEqual(c0, c1);
  assert.equal(c0, c8);
});
