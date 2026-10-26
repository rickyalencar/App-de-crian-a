import test from 'node:test';
import assert from 'node:assert/strict';
import { selectBestFemaleVoice, formatNaturalSpeechText, VoiceOption } from './voiceUtils';

test('selectBestFemaleVoice prefers neural/natural female voices when available', () => {
  const voices: VoiceOption[] = [
    { name: 'Microsoft Daniel - Portuguese (Brazil)', lang: 'pt-BR' },
    { name: 'Microsoft Francisca Online (Natural) - Portuguese (Brazil)', lang: 'pt-BR' },
    { name: 'Google português do Brasil', lang: 'pt-BR' }
  ];

  const selected = selectBestFemaleVoice(voices);
  assert.equal(selected?.name, 'Microsoft Francisca Online (Natural) - Portuguese (Brazil)');
});

test('selectBestFemaleVoice selects named female voice over male voice', () => {
  const voices: VoiceOption[] = [
    { name: 'Daniel', lang: 'pt-BR' },
    { name: 'Luciana', lang: 'pt-BR' },
    { name: 'Felipe', lang: 'pt-BR' }
  ];

  const selected = selectBestFemaleVoice(voices);
  assert.equal(selected?.name, 'Luciana');
});

test('selectBestFemaleVoice falls back to non-male voice if specific female name not listed', () => {
  const voices: VoiceOption[] = [
    { name: 'Pedro (Male)', lang: 'pt-BR' },
    { name: 'Voz Padrão', lang: 'pt-BR' }
  ];

  const selected = selectBestFemaleVoice(voices);
  assert.equal(selected?.name, 'Voz Padrão');
});

test('formatNaturalSpeechText adds breathing room after punctuation for fluid speech', () => {
  const input = 'Parabéns!Você terminou o leãozinho.Ficou lindo!';
  const formatted = formatNaturalSpeechText(input);
  assert.equal(formatted, 'Parabéns! Você terminou o leãozinho. Ficou lindo!');
});
