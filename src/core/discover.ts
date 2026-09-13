import type { MatchResult } from '@/types';
import type { BuddyFilterState } from '@/ui/discover/BuddyFilters';

/**
 * Filters already-scored matches by the criteria selected in BuddyFilters.
 * This does NOT recompute compatibility — it only narrows down results
 * produced by src/core/matching.ts.
 */
export function filterMatches(matches: MatchResult[], filters: BuddyFilterState): MatchResult[] {
  return matches.filter(({ student, compatibilityScore }) => {
    if (filters.courses.length > 0) {
      const hasCourse = filters.courses.some((courseId) => student.courses.includes(courseId));
      if (!hasCourse) return false;
    }

    if (filters.years.length > 0 && !filters.years.includes(student.year)) {
      return false;
    }

    if (filters.availability.length > 0) {
      const hasSlot = filters.availability.some((slot) => {
        // Mock availability is stored as "Day + TimeOfDay" (e.g. "Fri Night").
        // "Evening" is treated as equivalent to "Night" for this dataset.
        const needle = slot === 'Evening' ? 'night' : slot.toLowerCase();
        if (slot === 'Weekends') return true; // all mock slots are already weekend-based
        return student.availability.some((a) => a.toLowerCase().includes(needle));
      });
      if (!hasSlot) return false;
    }

    if (filters.studyStyles.length > 0 && !filters.studyStyles.includes(student.studyStyle)) {
      return false;
    }

    if (compatibilityScore < filters.minimumMatch) {
      return false;
    }

    return true;
  });
}
