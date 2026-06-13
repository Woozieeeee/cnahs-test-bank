"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { ExamViolation, SecurityMetrics } from "@/types/exams/examSession";

interface UseExamSecurityMonitoringProps {
  enabled: boolean;
  config: {
    requireFullscreen: boolean;
    detectTabSwitch: boolean;
    detectWindowBlur: boolean;
    blockCopy: boolean;
    blockPaste: boolean;
    blockRightClick: boolean;
    detectDeviceChange: boolean;
  };
  onViolation: (violation: ExamViolation) => void;
}

export const useExamSecurityMonitoring = ({
  enabled,
  config,
  onViolation,
}: UseExamSecurityMonitoringProps) => {
  const [violations, setViolations] = useState<ExamViolation[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    tabSwitches: 0,
    windowBlurs: 0,
    fullscreenExits: 0,
    copyAttempts: 0,
    pasteAttempts: 0,
    rightClicks: 0,
    deviceChanges: 0,
    totalViolations: 0,
  });

  const violationIdRef = useRef(0);
  const lastDeviceStateRef = useRef<string>("");

  // Tab Switch Detection
  useEffect(() => {
    if (!enabled || !config.detectTabSwitch) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const violation: ExamViolation = {
          id: violationIdRef.current++,
          type: "TAB_SWITCH",
          timestamp: new Date(),
          severity: "WARNING",
          description: "Student switched to another tab",
        };
        setViolations((prev) => [...prev, violation]);
        setMetrics((prev) => ({
          ...prev,
          tabSwitches: prev.tabSwitches + 1,
          totalViolations: prev.totalViolations + 1,
        }));
        onViolation(violation);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [enabled, config.detectTabSwitch, onViolation]);

  // Window Blur Detection
  useEffect(() => {
    if (!enabled || !config.detectWindowBlur) return;

    const handleWindowBlur = () => {
      const violation: ExamViolation = {
        id: violationIdRef.current++,
        type: "WINDOW_BLUR",
        timestamp: new Date(),
        severity: "WARNING",
        description: "Window lost focus",
      };
      setViolations((prev) => [...prev, violation]);
      setMetrics((prev) => ({
        ...prev,
        windowBlurs: prev.windowBlurs + 1,
        totalViolations: prev.totalViolations + 1,
      }));
      onViolation(violation);
    };

    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, [enabled, config.detectWindowBlur, onViolation]);

  // Copy Detection
  useEffect(() => {
    if (!enabled || !config.blockCopy) return;

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      const violation: ExamViolation = {
        id: violationIdRef.current++,
        type: "COPY_ATTEMPT",
        timestamp: new Date(),
        severity: "WARNING",
        description: "Copy attempt detected and blocked",
      };
      setViolations((prev) => [...prev, violation]);
      setMetrics((prev) => ({
        ...prev,
        copyAttempts: prev.copyAttempts + 1,
        totalViolations: prev.totalViolations + 1,
      }));
      onViolation(violation);
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, [enabled, config.blockCopy, onViolation]);

  // Paste Detection
  useEffect(() => {
    if (!enabled || !config.blockPaste) return;

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const violation: ExamViolation = {
        id: violationIdRef.current++,
        type: "PASTE_ATTEMPT",
        timestamp: new Date(),
        severity: "WARNING",
        description: "Paste attempt detected and blocked",
      };
      setViolations((prev) => [...prev, violation]);
      setMetrics((prev) => ({
        ...prev,
        pasteAttempts: prev.pasteAttempts + 1,
        totalViolations: prev.totalViolations + 1,
      }));
      onViolation(violation);
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [enabled, config.blockPaste, onViolation]);

  // Right Click Detection
  useEffect(() => {
    if (!enabled || !config.blockRightClick) return;

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      const violation: ExamViolation = {
        id: violationIdRef.current++,
        type: "RIGHT_CLICK",
        timestamp: new Date(),
        severity: "WARNING",
        description: "Right-click attempt detected and blocked",
      };
      setViolations((prev) => [...prev, violation]);
      setMetrics((prev) => ({
        ...prev,
        rightClicks: prev.rightClicks + 1,
        totalViolations: prev.totalViolations + 1,
      }));
      onViolation(violation);
    };

    document.addEventListener("contextmenu", handleRightClick);
    return () => document.removeEventListener("contextmenu", handleRightClick);
  }, [enabled, config.blockRightClick, onViolation]);

  // Fullscreen Detection
  useEffect(() => {
    if (!enabled || !config.requireFullscreen) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const violation: ExamViolation = {
          id: violationIdRef.current++,
          type: "FULLSCREEN_EXIT",
          timestamp: new Date(),
          severity: "CRITICAL",
          description: "Fullscreen mode was exited",
        };
        setViolations((prev) => [...prev, violation]);
        setMetrics((prev) => ({
          ...prev,
          fullscreenExits: prev.fullscreenExits + 1,
          totalViolations: prev.totalViolations + 1,
        }));
        onViolation(violation);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [enabled, config.requireFullscreen, onViolation]);

  // Device Change Detection
  const detectDeviceChange = useCallback(() => {
    if (!enabled || !config.detectDeviceChange) return;

    const currentState = JSON.stringify({
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      userAgent: navigator.userAgent,
    });

    if (lastDeviceStateRef.current && lastDeviceStateRef.current !== currentState) {
      const violation: ExamViolation = {
        id: violationIdRef.current++,
        type: "DEVICE_CHANGE",
        timestamp: new Date(),
        severity: "CRITICAL",
        description: "Device properties changed during exam",
      };
      setViolations((prev) => [...prev, violation]);
      setMetrics((prev) => ({
        ...prev,
        deviceChanges: prev.deviceChanges + 1,
        totalViolations: prev.totalViolations + 1,
      }));
      onViolation(violation);
    }

    lastDeviceStateRef.current = currentState;
  }, [enabled, config.detectDeviceChange, onViolation]);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(detectDeviceChange, 5000);
    return () => clearInterval(interval);
  }, [enabled, detectDeviceChange]);

  return {
    violations,
    metrics,
    clearViolations: () => setViolations([]),
  };
};
