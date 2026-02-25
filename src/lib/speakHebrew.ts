/**
 * Reusable Hebrew Text-to-Speech utility.
 * Uses the Web Speech API with "he-IL" locale.
 * Handles async voice loading and prevents overlapping audio.
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

function pickHebrewVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang === "he-IL") ||
         voices.find((v) => v.lang.startsWith("he")) ||
         null;
}

function doSpeak(text: string, rate: number) {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "he-IL";
  utterance.rate = Math.max(0.5, Math.min(rate, 1.5));

  const voice = pickHebrewVoice();
  if (voice) utterance.voice = voice;

  utterance.onerror = (e) => console.error("Speech error:", e.error);
  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function speakHebrew(text: string, rate: number = 0.85) {
  if (!("speechSynthesis" in window)) return;

  // Voices may not be loaded yet in some browsers
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    const onVoicesReady = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoicesReady);
      doSpeak(text, rate);
    };
    window.speechSynthesis.addEventListener("voiceschanged", onVoicesReady);
    // Fallback: try speaking anyway after a short delay
    setTimeout(() => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoicesReady);
      doSpeak(text, rate);
    }, 300);
  } else {
    doSpeak(text, rate);
  }
}

export function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}
