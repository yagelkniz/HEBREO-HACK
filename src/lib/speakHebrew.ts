/**
 * Reusable Hebrew Text-to-Speech utility.
 * Uses the Web Speech API with "he-IL" locale.
 * Prevents overlapping audio and supports configurable speech rate.
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakHebrew(text: string, rate: number = 0.85) {
  if (!("speechSynthesis" in window)) return;

  // Stop any in-progress speech to prevent overlap
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "he-IL";
  utterance.rate = Math.max(0.5, Math.min(rate, 1.5));

  // Try to find a Hebrew voice; fallback to default
  const voices = window.speechSynthesis.getVoices();
  const hebrewVoice = voices.find((v) => v.lang.startsWith("he"));
  if (hebrewVoice) {
    utterance.voice = hebrewVoice;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}
