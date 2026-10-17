export const getAvailableVoices = () => {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.startsWith("en") || v.lang === "");
};

export const speakText = (
  text,
  { voice = null, pitch = 1.1, rate = 1 } = {},
  onStart,
  onEnd
) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  if (voice) utterance.voice = voice;
  utterance.pitch = pitch;
  utterance.rate = rate;
  utterance.volume = 1;

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const pauseSpeech = () => {
  if (window.speechSynthesis) window.speechSynthesis.pause();
};

export const resumeSpeech = () => {
  if (window.speechSynthesis) window.speechSynthesis.resume();
};

export const stopSpeech = () => {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
};

// Backward compatibility with original function signature
export const textToSpeech = (text) => speakText(text);