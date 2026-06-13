import { useEffect, useCallback, useRef } from "react";

interface UseFullscreenModeProps {
  enabled: boolean;
}

export function useFullscreenMode({ enabled }: UseFullscreenModeProps) {
  const retryCountRef = useRef(0);
  const maxRetries = 5;

  const requestFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen({
          navigationUI: "hide",
        } as any);
        console.log("[useFullscreenMode] Fullscreen activated successfully");
        retryCountRef.current = 0;
      }
    } catch (err) {
      console.warn("[useFullscreenMode] Fullscreen request failed:", err);
      retryCountRef.current++;

      // Retry after a short delay if it failed
      if (retryCountRef.current < maxRetries) {
        setTimeout(() => {
          requestFullscreen();
        }, 500);
      }
    }
  }, []);

  // Initial fullscreen request when exam loads
  useEffect(() => {
    if (!enabled) {
      retryCountRef.current = 0;
      return;
    }

    // Add small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      requestFullscreen();
    }, 100);

    return () => clearTimeout(timer);
  }, [enabled, requestFullscreen]);

  // Prevent fullscreen exit - re-enter if user tries to exit
  useEffect(() => {
    if (!enabled) return;

    const handleFullscreenChange = async () => {
      if (!document.fullscreenElement) {
        console.log("[useFullscreenMode] Fullscreen exited, re-entering...");
        try {
          await document.documentElement.requestFullscreen({
            navigationUI: "hide",
          } as any);
        } catch (err) {
          console.warn("[useFullscreenMode] Failed to re-enter fullscreen:", err);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [enabled]);

  // Listen for ESC key and prevent fullscreen exit
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        console.log("[useFullscreenMode] ESC pressed, enforcing fullscreen");
        try {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen({
              navigationUI: "hide",
            } as any);
          }
        } catch (err) {
          console.warn("[useFullscreenMode] Failed to enforce fullscreen on ESC:", err);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);
}

