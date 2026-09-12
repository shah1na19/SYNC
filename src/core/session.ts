// Format raw seconds into standard MM:SS display
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Calculate session completion percentage for progress bars
export function calculateProgress(timeLeft: number, totalMinutes: number): number {
  const totalSeconds = totalMinutes * 60;
  if (totalSeconds === 0) return 0;
  return Math.min(100, Math.max(0, ((totalSeconds - timeLeft) / totalSeconds) * 100));
}
