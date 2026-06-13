/**
 * Sound Generator
 * Generates audio tones using Web Audio API
 * Fallback solution for missing audio files
 */

interface ToneConfig {
  frequency: number;
  duration: number;
  volume: number;
  waveType: OscillatorType;
}

/**
 * Generate a simple tone using Web Audio API
 */
export const generateTone = async (config: ToneConfig): Promise<void> => {
  try {
    const AudioContextClass =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("Web Audio API not supported");
      return;
    }

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Set up oscillator
    oscillator.type = config.waveType;
    oscillator.frequency.value = config.frequency;

    // Set up gain (volume)
    gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + config.duration / 1000
    );

    // Connect and play
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + config.duration / 1000);
  } catch (error) {
    console.error("Error generating tone:", error);
  }
};

/**
 * Sound presets using Web Audio API
 */
export const soundPresets = {
  // Positive feedback sounds
  success: async () => {
    // Three ascending notes
    await generateTone({
      frequency: 523.25, // C5
      duration: 200,
      volume: 0.3,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 150));
    await generateTone({
      frequency: 659.25, // E5
      duration: 200,
      volume: 0.3,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 150));
    await generateTone({
      frequency: 783.99, // G5
      duration: 300,
      volume: 0.3,
      waveType: "sine",
    });
  },

  // Error sound
  error: async () => {
    // Two descending notes
    await generateTone({
      frequency: 523.25, // C5
      duration: 200,
      volume: 0.4,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await generateTone({
      frequency: 349.23, // F4
      duration: 300,
      volume: 0.4,
      waveType: "sine",
    });
  },

  // Warning sound
  warning: async () => {
    // Repeating note
    await generateTone({
      frequency: 440, // A4
      duration: 200,
      volume: 0.35,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 150));
    await generateTone({
      frequency: 440, // A4
      duration: 200,
      volume: 0.35,
      waveType: "sine",
    });
  },

  // Notification
  notification: async () => {
    // Single pleasant note
    await generateTone({
      frequency: 659.25, // E5
      duration: 300,
      volume: 0.25,
      waveType: "sine",
    });
  },

  // Click
  click: async () => {
    // Short burst
    await generateTone({
      frequency: 1000,
      duration: 100,
      volume: 0.15,
      waveType: "square",
    });
  },

  // Exam start
  examStart: async () => {
    // Ascending arpeggio
    await generateTone({
      frequency: 261.63, // C4
      duration: 150,
      volume: 0.35,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await generateTone({
      frequency: 329.63, // E4
      duration: 150,
      volume: 0.35,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await generateTone({
      frequency: 392, // G4
      duration: 150,
      volume: 0.35,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await generateTone({
      frequency: 523.25, // C5
      duration: 300,
      volume: 0.35,
      waveType: "sine",
    });
  },

  // Exam submit
  examSubmit: async () => {
    // Ascending slide
    await generateTone({
      frequency: 349.23, // F4
      duration: 400,
      volume: 0.4,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
    await generateTone({
      frequency: 523.25, // C5
      duration: 400,
      volume: 0.4,
      waveType: "sine",
    });
  },

  // Violation alert
  violation: async () => {
    // Urgent double beep
    await generateTone({
      frequency: 800,
      duration: 200,
      volume: 0.5,
      waveType: "square",
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await generateTone({
      frequency: 800,
      duration: 200,
      volume: 0.5,
      waveType: "square",
    });
  },

  // Time warning
  timeWarning: async () => {
    // Three quick beeps
    for (let i = 0; i < 3; i++) {
      await generateTone({
        frequency: 1000,
        duration: 150,
        volume: 0.4,
        waveType: "sine",
      });
      if (i < 2) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  },

  // Exam end
  examEnd: async () => {
    // Descending arpeggio
    await generateTone({
      frequency: 523.25, // C5
      duration: 150,
      volume: 0.35,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await generateTone({
      frequency: 392, // G4
      duration: 150,
      volume: 0.35,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await generateTone({
      frequency: 329.63, // E4
      duration: 150,
      volume: 0.35,
      waveType: "sine",
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    await generateTone({
      frequency: 261.63, // C4
      duration: 300,
      volume: 0.35,
      waveType: "sine",
    });
  },
};
