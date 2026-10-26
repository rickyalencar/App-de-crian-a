/**
 * Web Audio API synthesized sound effects & Natural Female Text-to-Speech narration
 * Zero external audio assets needed - perfectly reliable and instant!
 */
import { selectBestFemaleVoice, formatNaturalSpeechText } from './voiceUtils';

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Pre-cache voices when available
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, startTime);
      osc.frequency.exponentialRampToValueAtTime(740, startTime + 0.08);
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.1);
    } catch {}
  }

  public playMagic() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const startTime = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = startTime + idx * 0.05;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0.18, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.25);
      });
    } catch {}
  }

  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const freqs = [880, 1174, 1318, 1760];
      const startTime = ctx.currentTime;
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = startTime + i * 0.04;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } catch {}
  }

  public playFanfare() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const fanfare = [
        { f: 392.0, d: 0.12 },
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.18 },
        { f: 1046.5, d: 0.45 }
      ];
      let t = ctx.currentTime;
      fanfare.forEach(({ f, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + d + 0.05);
        t += d * 0.9;
      });
    } catch {}
  }

  public playSwoosh() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, startTime);
      osc.frequency.exponentialRampToValueAtTime(150, startTime + 0.12);
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.14);
    } catch {}
  }

  public playLivingMagic() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      // Arpeggiated cheerful magic chords (C5, G5, C6, E6, G6)
      const freqs = [523.25, 783.99, 1046.5, 1318.5, 1567.98];
      const startTime = ctx.currentTime;
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = startTime + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.38);
      });
    } catch {}
  }

  /**
   * High-quality, natural female Portuguese voice narration
   * Specially tuned for warm, fluid, encouraging children's storytelling
   */
  public speak(text: string) {
    if (this.isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();

      const naturalText = formatNaturalSpeechText(text);
      const utterance = new SpeechSynthesisUtterance(naturalText);
      utterance.lang = 'pt-BR';
      // Fluid, natural storytelling cadence (not slow/sluggish)
      utterance.rate = 0.98;
      // Gentle, friendly feminine pitch
      utterance.pitch = 1.18;

      const availableVoices = this.cachedVoices.length > 0
        ? this.cachedVoices
        : window.speechSynthesis.getVoices();

      const femaleVoice = selectBestFemaleVoice(availableVoices);
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {}
  }
}

export const soundManager = new SoundManager();
