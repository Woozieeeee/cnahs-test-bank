/**
 * Get a time-based greeting
 * Returns greeting text and emoji based on the current time
 * @param isFirstLogin - Whether this is the user's first login
 */
export const getTimeBasedGreeting = (isFirstLogin: boolean = false): { greeting: string; emoji: string } => {
  const hour = new Date().getHours();

  // Determine time of day
  let timeGreeting = "";
  let emoji = "";

  if (hour >= 5 && hour < 12) {
    timeGreeting = "Morning";
    emoji = "🌅";
  } else if (hour >= 12 && hour < 17) {
    timeGreeting = "Afternoon";
    emoji = "☀️";
  } else if (hour >= 17 && hour < 21) {
    timeGreeting = "Evening";
    emoji = "🌆";
  } else {
    timeGreeting = "Night";
    emoji = "🌙";
  }

  // Add first login vs returning user distinction
  const greeting = isFirstLogin ? `Welcome to a wonderful ${timeGreeting.toLowerCase()}` : `Good ${timeGreeting}`;

  return {
    greeting,
    emoji,
  };
};
