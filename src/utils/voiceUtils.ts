/**
 * Voice selection and natural speech phrasing utilities for children's storytelling TTS
 */

export interface VoiceOption {
  name: string;
  lang: string;
  voiceURI?: string;
  default?: boolean;
}

const FEMALE_NAMES_REGEX = /(female|feminina|mulher|francisca|luciana|maria|vit[oó]ria|helena|fernanda|camila|let[ií]cia|brenda|joana|catarina|raquel|yara|ines|am[aá]lia)/i;
const MALE_NAMES_REGEX = /(male|masculino|daniel|felipe|ricardo|antonio|antônio|joão|pedro|lucas|carlos|guilherme)/i;

/**
 * Selects the most natural, high-quality female Portuguese voice available
 */
export function selectBestFemaleVoice<T extends VoiceOption>(voices: T[]): T | null {
  if (!voices || voices.length === 0) return null;

  // 1. Filter Portuguese voices (favoring pt-BR)
  const ptBRVoices = voices.filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith('pt-br'));
  const allPtVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('pt'));

  const pool = ptBRVoices.length > 0 ? ptBRVoices : allPtVoices;
  if (pool.length === 0) return null;

  // Priority 1: High-fidelity natural/online female voices (Microsoft Francisca/Maria, Google, etc.)
  const naturalFemale = pool.find((v) => {
    const n = `${v.name} ${v.voiceURI || ''}`.toLowerCase();
    return FEMALE_NAMES_REGEX.test(n) && (n.includes('natural') || n.includes('online') || n.includes('neural'));
  });
  if (naturalFemale) return naturalFemale;

  // Priority 2: Named female voices without male identifiers
  const namedFemale = pool.find((v) => {
    const n = `${v.name} ${v.voiceURI || ''}`.toLowerCase();
    return FEMALE_NAMES_REGEX.test(n) && !MALE_NAMES_REGEX.test(n);
  });
  if (namedFemale) return namedFemale;

  // Priority 3: Google standard Portuguese voice (often default female on Chrome/Android)
  const googleVoice = pool.find((v) => {
    const n = v.name.toLowerCase();
    return (n.includes('google') || n.includes('android')) && !MALE_NAMES_REGEX.test(n);
  });
  if (googleVoice) return googleVoice;

  // Priority 4: Any Portuguese voice that doesn't explicitly have a male tag
  const nonMale = pool.find((v) => !MALE_NAMES_REGEX.test(`${v.name} ${v.voiceURI || ''}`.toLowerCase()));
  if (nonMale) return nonMale;

  // Fallback to first available Portuguese voice
  return pool[0];
}

/**
 * Formats Portuguese phrases with natural pauses, soft cadence, and friendly warmth
 */
export function formatNaturalSpeechText(text: string): string {
  if (!text) return '';

  return text
    // Ensure clean breathing space after exclamations and questions
    .replace(/!+/g, '! ')
    .replace(/\?+/g, '? ')
    .replace(/\.+/g, '. ')
    .replace(/,\s*/g, ', ')
    // Remove extra whitespaces
    .replace(/\s+/g, ' ')
    .trim();
}
