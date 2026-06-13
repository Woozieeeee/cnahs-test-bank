/**
 * useSoundEffects Hook
 * Provides easy access to sound effects throughout the app
 */

import { useEffect, useCallback, useRef } from "react";
import { soundManager, SoundType } from "@/lib/sound/soundManager";

interface UseSoundEffectsOptions {
  enabled?: boolean;
  masterVolume?: number;
}

export const useSoundEffects = (options?: UseSoundEffectsOptions) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    // Set master volume if provided
    if (options?.masterVolume !== undefined) {
      soundManager.setMasterVolume(options.masterVolume);
    }

    // Set sound enabled status if provided
    if (options?.enabled !== undefined) {
      soundManager.setSoundEnabled(options.enabled);
    }

    isInitialized.current = true;
  }, [options?.masterVolume, options?.enabled]);

  // Play a sound effect
  const play = useCallback(async (soundType: SoundType) => {
    try {
      await soundManager.play(soundType);
    } catch (error) {
      console.error(`Failed to play sound ${soundType}:`, error);
    }
  }, []);

  // Play a sequence of sounds
  const playSequence = useCallback(
    async (sounds: Array<{ type: SoundType; delay?: number }>) => {
      try {
        await soundManager.playSequence(sounds);
      } catch (error) {
        console.error("Failed to play sound sequence:", error);
      }
    },
    []
  );

  // Stop a specific sound
  const stop = useCallback((soundType: SoundType) => {
    soundManager.stop(soundType);
  }, []);

  // Stop all sounds
  const stopAll = useCallback(() => {
    soundManager.stopAll();
  }, []);

  // Check if sound is currently playing
  const isPlaying = useCallback((soundType: SoundType) => {
    return soundManager.isPlaying(soundType);
  }, []);

  // Enable/disable sounds
  const setSoundEnabled = useCallback((enabled: boolean) => {
    soundManager.setSoundEnabled(enabled);
  }, []);

  // Get sound enabled status
  const isSoundEnabled = useCallback(() => {
    return soundManager.isSoundEnabled();
  }, []);

  // Set master volume
  const setMasterVolume = useCallback((volume: number) => {
    soundManager.setMasterVolume(volume);
  }, []);

  // Play common exam sounds with shortcuts
  const playExamStart = useCallback(() => play("exam_start"), [play]);
  const playExamSubmit = useCallback(() => play("exam_submit"), [play]);
  const playExamEnd = useCallback(() => play("exam_end"), [play]);
  const playViolation = useCallback(() => play("violation"), [play]);
  const playTimeWarning = useCallback(() => play("time_warning"), [play]);
  const playSuccess = useCallback(() => play("success"), [play]);
  const playError = useCallback(() => play("error"), [play]);
  const playNotification = useCallback(() => play("notification"), [play]);

  return {
    // Core methods
    play,
    playSequence,
    stop,
    stopAll,
    isPlaying,

    // Settings
    setSoundEnabled,
    isSoundEnabled,
    setMasterVolume,

    // Shortcuts for common sounds
    playExamStart,
    playExamSubmit,
    playExamEnd,
    playViolation,
    playTimeWarning,
    playSuccess,
    playError,
    playNotification,
  };
};
