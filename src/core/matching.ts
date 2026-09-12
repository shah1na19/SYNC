import { Student, MatchResult } from '../types';

export function calculateMatch(currentUser: Student, targetUser: Student): MatchResult {
  let score = 0;
  const reasons: string[] = [];

  // 1. Shared Courses (40 Points)
  const sharedCourses = currentUser.courses.filter((c) => targetUser.courses.includes(c));
  if (sharedCourses.length > 0) {
    score += 40;
    reasons.push(`Sharing ${sharedCourses.length} course(s)`);
  }

  // 2. Shared Availability (30 Points)
  const sharedSlots = currentUser.availability.filter((a) => targetUser.availability.includes(a));
  if (sharedSlots.length > 0) {
    score += 30;
    reasons.push('Available at the same times');
  }

  // 3. Same Study Style (20 Points)
  if (currentUser.studyStyle === targetUser.studyStyle) {
    score += 20;
    reasons.push(`Both prefer ${currentUser.studyStyle} study style`);
  }

  // 4. Same Year (10 Points)
  if (currentUser.year === targetUser.year) {
    score += 10;
    reasons.push(`Both are Year ${currentUser.year} students`);
  }

  return {
    student: targetUser,
    compatibilityScore: score,
    matchingReasons: reasons,
  };
}
