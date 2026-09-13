"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/ui/layout/PageHeader";
import { BuddyCard } from "@/ui/discover/BuddyCard";
import { BuddyFilters, DEFAULT_BUDDY_FILTERS, type BuddyFilterState } from "@/ui/discover/BuddyFilters";
import { CURRENT_STUDENT, STUDENTS } from "@/data/students";
import { COURSES } from "@/data/courses";
import { calculateMatch } from "@/core/matching";
import { filterMatches } from "@/core/discover";
import type { Student } from "@/types";

const COURSE_OPTIONS = COURSES.map((course) => ({ id: course.id, label: course.name }));

function courseNamesFor(student: Student) {
  return student.courses
    .map((id) => COURSES.find((course) => course.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}

export default function DiscoverPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<BuddyFilterState>(DEFAULT_BUDDY_FILTERS);

  const allMatches = useMemo(
    () =>
      STUDENTS.map((student) => calculateMatch(CURRENT_STUDENT, student)).sort(
        (a, b) => b.compatibilityScore - a.compatibilityScore,
      ),
    [],
  );

  const visibleMatches = useMemo(() => filterMatches(allMatches, filters), [allMatches, filters]);

  const handleConnect = (buddy: Student) => {
    router.push(`/match?buddy=${buddy.id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Discover"
        description="Find compatible study partners based on your courses, schedule, and study style."
      />

      <BuddyFilters
        filters={filters}
        courseOptions={COURSE_OPTIONS}
        resultCount={visibleMatches.length}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_BUDDY_FILTERS)}
      />

      {visibleMatches.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleMatches.map((match) => (
            <BuddyCard
              key={match.student.id}
              buddy={match.student}
              score={match.compatibilityScore}
              matchingReasons={match.matchingReasons}
              courseLabels={courseNamesFor(match.student)}
              onConnect={handleConnect}
            />
          ))}
        </div>
      ) : (
        <div className="surface-card p-8 text-center">
          <p className="text-card-title">No study buddies match these filters</p>
          <p className="text-secondary mt-1">Try widening your filters to see more students.</p>
        </div>
      )}
    </div>
  );
}
