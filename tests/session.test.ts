import { formatTime, calculateProgress } from '../src/core/session';

describe('Session Logic', () => {
  describe('formatTime', () => {
    it('should format seconds into MM:SS string', () => {
      expect(formatTime(1500)).toBe('25:00');
      expect(formatTime(65)).toBe('01:05');
      expect(formatTime(0)).toBe('00:00');
    });
  });

  describe('calculateProgress', () => {
    it('should calculate correct completion percentage', () => {
      // 25 min total (1500s), 750s left = 50% complete
      expect(calculateProgress(750, 25)).toBe(50);
    });

    it('should return 100 when time left reaches 0', () => {
      expect(calculateProgress(0, 25)).toBe(100);
    });

    it('should clamp values between 0 and 100', () => {
      expect(calculateProgress(2000, 25)).toBe(0);
      expect(calculateProgress(-10, 25)).toBe(100);
    });
  });
});
