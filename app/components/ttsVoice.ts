// Text-To-Speech Controller with Play, Pause, Resume, and Mute support
// Uses the browser's built-in SpeechSynthesis API

class TTSController {
  private isMuted: boolean = false;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onStateChangeListeners: ((state: { isSpeaking: boolean; isPaused: boolean }) => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_voice_muted");
      this.isMuted = saved === "true";
    }
  }

  public subscribe(listener: (state: { isSpeaking: boolean; isPaused: boolean }) => void) {
    this.onStateChangeListeners.push(listener);
    listener({ isSpeaking: this.isSpeaking, isPaused: this.isPaused });
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.onStateChangeListeners.forEach((l) =>
      l({ isSpeaking: this.isSpeaking, isPaused: this.isPaused })
    );
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_voice_muted", String(this.isMuted));
    }
    if (this.isMuted) {
      this.stop();
    }
    this.notify();
    return this.isMuted;
  }

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    this.isPaused = false;

    if (this.isMuted) {
      this.isSpeaking = false;
      this.notify();
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Pick the most pleasant, natural English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(
        (v) =>
          (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Zira")) &&
          v.lang.startsWith("en")
      ) || voices.find((v) => v.lang.startsWith("en")) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.15; // friendly, bright pitch for the cute companion

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.notify();
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.notify();
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.notify();
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public pause() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        this.isPaused = true;
        this.notify();
      }
    }
  }

  public resume() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.isPaused = false;
        this.notify();
      }
    }
  }

  public togglePlayPause() {
    if (this.isPaused) {
      this.resume();
    } else if (this.isSpeaking) {
      this.pause();
    }
  }

  public stop() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.notify();
    }
  }
}

export const ttsVoice = new TTSController();
