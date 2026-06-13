/**
 * Sound Manager
 * Handles all audio playback throughout the app
 * Respects user sound preferences
 */

import { soundPresets } from "./soundGenerator";

interface SoundConfig {
  name: string;
  path: string;
  volume: number; // 0-1
  duration: number; // milliseconds (for duration tracking)
}

export type SoundType =
  | "success"
  | "error"
  | "warning"
  | "notification"
  | "click"
  | "exam_start"
  | "exam_submit"
  | "violation"
  | "time_warning"
  | "exam_end";

// Sound configurations
const SOUNDS: Record<SoundType, SoundConfig> = {
  success: {
    name: "Success",
    path: "/sounds/success.mp3",
    volume: 0.6,
    duration: 800,
  },
  error: {
    name: "Error",
    path: "/sounds/error.mp3",
    volume: 0.7,
    duration: 600,
  },
  warning: {
    name: "Warning",
    path: "/sounds/warning.mp3",
    volume: 0.6,
    duration: 700,
  },
  notification: {
    name: "Notification",
    path: "/sounds/notification.mp3",
    volume: 0.5,
    duration: 500,
  },
  click: {
    name: "Click",
    path: "/sounds/click.mp3",
    volume: 0.3,
    duration: 200,
  },
  exam_start: {
    name: "Exam Start",
    path: "/sounds/exam_start.mp3",
    volume: 0.8,
    duration: 1200,
  },
  exam_submit: {
    name: "Exam Submit",
    path: "/sounds/exam_submit.mp3",
    volume: 0.8,
    duration: 1000,
  },
  violation: {
    name: "Violation Alert",
    path: "/sounds/violation.mp3",
    volume: 0.9,
    duration: 800,
  },
  time_warning: {
    name: "Time Warning",
    path: "/sounds/time_warning.mp3",
    volume: 0.7,
    duration: 600,
  },
  exam_end: {
    name: "Exam End",
    path: "/sounds/exam_end.mp3",
    volume: 0.8,
    duration: 1000,
  },
};

class SoundManager {
  private audioContext: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private masterVolume: number = 1;
  private loadedAudios: Map<SoundType, HTMLAudioElement> = new Map();
  private currentlyPlaying: Set<SoundType> = new Set();

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the Sound Manager
   */
  private initialize() {
    // Load sound preferences from localStorage
    const savedPrefs = localStorage.getItem("userPreferences");
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs);
        this.soundEnabled = prefs.soundEnabled ?? true;
      } catch (e) {
        console.error("Failed to load sound preferences:", e);
      }
    }

    // Initialize Web Audio API context
    try {
      const AudioContextClass =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }

    // Pre-load all sounds
    this.preloadSounds();
  }

  /**
   * Pre-load all sounds into memory
   */
  private preloadSounds() {
    Object.entries(SOUNDS).forEach(([key, config]) => {
      const audio = new Audio();
      audio.src = config.path;
      audio.preload = "auto";
      audio.volume = config.volume;

      // Handle errors gracefully
      audio.addEventListener("error", (e) => {
        console.warn(`Failed to preload sound ${key}:`, e);
      });

      this.loadedAudios.set(key as SoundType, audio);
    });
  }

  /**
   * Set whether sounds are enabled globally
   */
  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    localStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("userPreferences") || "{}"),
        soundEnabled: enabled,
      })
    );
  }

  /**
   * Get sound enabled status
   */
  isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  /**
   * Set master volume (0-1)
   */
  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    // Update all loaded audio volumes
    this.loadedAudios.forEach((audio, key) => {
      audio.volume = (SOUNDS[key]?.volume || 0.5) * this.masterVolume;
    });
  }

  /**
   * Play a sound
   */
  async play(soundType: SoundType): Promise<void> {
    if (!this.soundEnabled) {
      return;
    }

    try {
      const audio = this.loadedAudios.get(soundType);
      
      // Try to play the audio file first
      if (audio && audio.src) {
        try {
          audio.currentTime = 0;
          audio.volume = (SOUNDS[soundType].volume || 0.5) * this.masterVolume;

          this.currentlyPlaying.add(soundType);

          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
          }

          setTimeout(() => {
            this.currentlyPlaying.delete(soundType);
          }, SOUNDS[soundType].duration);

          return;
        } catch (error) {
          console.warn(`Failed to play audio file for ${soundType}, falling back to Web Audio:`, error);
        }
      }

      // Fallback to Web Audio API generated sounds
      const generatorFunction = soundPresets[soundType as keyof typeof soundPresets];
      if (generatorFunction) {
        this.currentlyPlaying.add(soundType);
        await (generatorFunction as () => Promise<void>)();
        
        setTimeout(() => {
          this.currentlyPlaying.delete(soundType);
        }, SOUNDS[soundType].duration);
      }
    } catch (error) {
      console.error(`Error playing sound ${soundType}:`, error);
    }
  }

  /**
   * Stop a specific sound
   */
  stop(soundType: SoundType) {
    const audio = this.loadedAudios.get(soundType);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      this.currentlyPlaying.delete(soundType);
    }
  }

  /**
   * Stop all sounds
   */
  stopAll() {
    this.loadedAudios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.currentlyPlaying.clear();
  }

  /**
   * Check if a sound is currently playing
   */
  isPlaying(soundType: SoundType): boolean {
    return this.currentlyPlaying.has(soundType);
  }

  /**
   * Get the key from an audio element (helper)
   */
  private getKeyFromAudio(audio: HTMLAudioElement): SoundType | undefined {
    for (const [key, element] of this.loadedAudios.entries()) {
      if (element === audio) {
        return key;
      }
    }
    return undefined;
  }

  /**
   * Play a sequence of sounds with delays
   */
  async playSequence(
    sounds: Array<{ type: SoundType; delay?: number }>
  ): Promise<void> {
    for (const sound of sounds) {
      if (sound.delay) {
        await new Promise((resolve) => setTimeout(resolve, sound.delay));
      }
      await this.play(sound.type);
    }
  }

  /**
   * Get all available sounds
   */
  getAvailableSounds(): Array<{ type: SoundType; config: SoundConfig }> {
    return Object.entries(SOUNDS).map(([type, config]) => ({
      type: type as SoundType,
      config,
    }));
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Export type for use in components
export type { SoundConfig };
