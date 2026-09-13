import { calculateMatch } from '../src/core/matching';
import { Student } from '../src/types';

describe('Matching Logic', () => {
  const baseStudent: Student = {
    id: 's1',
    name: 'Alice',
    avatar: 'avatar1.png',
    year: 2,
    courses: ['c1', 'c2'],
    availability: ['Fri Night'],
    studyStyle: 'Pomodoro',
    bio: 'Test bio',
  };

  it('should score 100 for a perfect match (all criteria met)', () => {
    const perfectMatch: Student = {
      ...baseStudent,
      id: 's2',
      name: 'Bob',
    };

    const result = calculateMatch(baseStudent, perfectMatch);
    expect(result.compatibilityScore).toBe(100);
    expect(result.matchingReasons.length).toBe(4);
  });

  it('should score 0 when no criteria match', () => {
    const noMatch: Student = {
      id: 's3',
      name: 'Charlie',
      avatar: 'avatar2.png',
      year: 4,
      courses: ['c99'],
      availability: ['Mon Morning'],
      studyStyle: 'Quiet',
      bio: 'Test bio',
    };

    const result = calculateMatch(baseStudent, noMatch);
    expect(result.compatibilityScore).toBe(0);
    expect(result.matchingReasons.length).toBe(0);
  });

  it('should remain bounded between 0 and 100', () => {
    const randomStudent: Student = {
      ...baseStudent,
      id: 's4',
      courses: ['c1', 'c2', 'c3', 'c4'],
    };

    const result = calculateMatch(baseStudent, randomStudent);
    expect(result.compatibilityScore).toBeGreaterThanOrEqual(0);
    expect(result.compatibilityScore).toBeLessThanOrEqual(100);
  });
});
