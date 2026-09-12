"use client";

import { RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/ui/cn";

export type BuddyFilterState = {
  courses: string[];
  years: number[];
  availability: string[];
  studyStyles: string[];
  minimumMatch: number;
};

export const DEFAULT_BUDDY_FILTERS: BuddyFilterState = {
  courses: [],
  years: [],
  availability: [],
  studyStyles: [],
  minimumMatch: 0,
};

export type BuddyFiltersProps = {
  filters: BuddyFilterState;
  courseOptions: { id: string; label: string }[];
  resultCount: number;
  onChange: (filters: BuddyFilterState) => void;
  onReset?: () => void;
  className?: string;
};

const availabilityOptions = ["Morning", "Afternoon", "Evening", "Weekends"];
const studyStyleOptions = ["Quiet", "Discussion", "Pomodoro", "Project-based"];
const yearOptions = [1, 2, 3, 4];

function toggleValue<T>(values: T[], value: T) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "interactive rounded-[var(--radius-sm)] border px-2.5 py-1.5 text-[11px] font-medium",
        active
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-background/35 text-muted-foreground hover:bg-white/[0.035] hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

export function BuddyFilters({
  filters,
  courseOptions,
  resultCount,
  onChange,
  onReset,
  className,
}: BuddyFiltersProps) {
  const isDefault =
    filters.courses.length === 0 &&
    filters.years.length === 0 &&
    filters.availability.length === 0 &&
    filters.studyStyles.length === 0 &&
    filters.minimumMatch === 0;

  const activeCount =
    filters.courses.length +
    filters.years.length +
    filters.availability.length +
    filters.studyStyles.length +
    (filters.minimumMatch > 0 ? 1 : 0);

  const update = (patch: Partial<BuddyFilterState>) => onChange({ ...filters, ...patch });

  return (
    <section
      aria-labelledby="buddy-filters-title"
      className={cn("surface-card p-4", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
              <SlidersHorizontal size={14} aria-hidden />
            </span>
            <h2 id="buddy-filters-title" className="text-section-title">
              Find your study buddy
            </h2>
          </div>
          <p className="mt-1.5 max-w-[42rem] text-secondary">
            Match with HITSZ students who share your courses, schedule, and study style.
          </p>
        </div>

        {!isDefault ? (
          <button
            type="button"
            onClick={() => onReset?.()}
            className="interactive flex shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1.5 text-[11px] font-medium text-muted-foreground hover:bg-white/[0.035] hover:text-foreground"
          >
            <RotateCcw size={12} aria-hidden />
            Reset
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-4">
        <fieldset>
          <legend className="text-label">Course</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {courseOptions.map((course) => (
              <FilterChip
                key={course.id}
                label={course.label}
                active={filters.courses.includes(course.id)}
                onClick={() => update({ courses: toggleValue(filters.courses, course.id) })}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-label">Year</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {yearOptions.map((year) => (
              <FilterChip
                key={year}
                label={`Year ${year}`}
                active={filters.years.includes(year)}
                onClick={() => update({ years: toggleValue(filters.years, year) })}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-label">Availability</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {availabilityOptions.map((option) => (
              <FilterChip
                key={option}
                label={option}
                active={filters.availability.includes(option)}
                onClick={() =>
                  update({ availability: toggleValue(filters.availability, option) })
                }
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-label">Study style</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {studyStyleOptions.map((style) => (
              <FilterChip
                key={style}
                label={style}
                active={filters.studyStyles.includes(style)}
                onClick={() => update({ studyStyles: toggleValue(filters.studyStyles, style) })}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-label">Minimum match</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[0, 70, 80, 90].map((score) => (
              <FilterChip
                key={score}
                label={score === 0 ? "Any match" : `${score}%+`}
                active={filters.minimumMatch === score}
                onClick={() => update({ minimumMatch: score })}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {activeCount > 0 ? (
        <div className="mt-4 border-t border-border pt-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-label">Active filters</p>
            <p className="text-meta">{resultCount} buddies found</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {filters.courses.map((id) => {
              const label = courseOptions.find((course) => course.id === id)?.label ?? id;
              return (
                <button
                  key={`course-${id}`}
                  type="button"
                  onClick={() => update({ courses: filters.courses.filter((item) => item !== id) })}
                  className="interactive inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-primary/10 px-2 py-1 text-[11px] text-primary hover:bg-primary/15"
                  aria-label={`Remove course filter ${label}`}
                >
                  {label}
                  <X size={11} aria-hidden />
                </button>
              );
            })}
            {filters.years.map((year) => (
              <button
                key={`year-${year}`}
                type="button"
                onClick={() => update({ years: filters.years.filter((item) => item !== year) })}
                className="interactive inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-primary/10 px-2 py-1 text-[11px] text-primary hover:bg-primary/15"
                aria-label={`Remove Year ${year} filter`}
              >
                Year {year}
                <X size={11} aria-hidden />
              </button>
            ))}
            {filters.availability.map((value) => (
              <button
                key={`availability-${value}`}
                type="button"
                onClick={() =>
                  update({ availability: filters.availability.filter((item) => item !== value) })
                }
                className="interactive inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-primary/10 px-2 py-1 text-[11px] text-primary hover:bg-primary/15"
                aria-label={`Remove availability filter ${value}`}
              >
                {value}
                <X size={11} aria-hidden />
              </button>
            ))}
            {filters.studyStyles.map((value) => (
              <button
                key={`style-${value}`}
                type="button"
                onClick={() =>
                  update({ studyStyles: filters.studyStyles.filter((item) => item !== value) })
                }
                className="interactive inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-primary/10 px-2 py-1 text-[11px] text-primary hover:bg-primary/15"
                aria-label={`Remove study style filter ${value}`}
              >
                {value}
                <X size={11} aria-hidden />
              </button>
            ))}
            {filters.minimumMatch > 0 ? (
              <button
                type="button"
                onClick={() => update({ minimumMatch: 0 })}
                className="interactive inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-primary/10 px-2 py-1 text-[11px] text-primary hover:bg-primary/15"
                aria-label="Remove minimum match filter"
              >
                {filters.minimumMatch}%+
                <X size={11} aria-hidden />
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <p className="text-meta">Tune the filters to narrow your matches.</p>
          <p className="text-meta">{resultCount} buddies found</p>
        </div>
      )}
    </section>
  );
}

