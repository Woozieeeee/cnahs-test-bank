/**
 * Formats seconds into a human-readable time format
 * @param seconds - Total seconds to format
 * @returns Formatted string (e.g., "1h 30m", "45m", "30s")
 */
export function formatTime(seconds: number): string {
  if (seconds < 0) return "0s";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 && parts.length < 2) parts.push(`${secs}s`);

  return parts.join(" ") || "0s";
}

/**
 * Formats milliseconds into a human-readable time format
 * @param milliseconds - Total milliseconds to format
 * @returns Formatted string
 */
export function formatTimeMs(milliseconds: number): string {
  return formatTime(Math.floor(milliseconds / 1000));
}

/**
 * Gets remaining time in a human-readable format
 * @param endTime - End time as Date or ISO string
 * @returns Formatted string
 */
export function getTimeRemaining(endTime: Date | string): string {
  const end = new Date(endTime);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) return "Time's up";

  return formatTimeMs(diffMs);
}
