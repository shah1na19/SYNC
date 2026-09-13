"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/ui/layout/PageHeader";
import { COURSES } from "@/data/courses";

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(COURSES.map((course) => course.department)))],
    [],
  );

  const visibleCourses = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return COURSES.filter((course) => {
      const matchesDepartment = department === "All" || course.department === department;
      const matchesQuery =
        needle.length === 0 ||
        course.name.toLowerCase().includes(needle) ||
        course.code.toLowerCase().includes(needle);
      return matchesDepartment && matchesQuery;
    });
  }, [query, department]);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Courses" description="Your academic context at HITSZ." />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="interactive flex w-full max-w-sm items-center gap-2 rounded-[var(--radius-md)] border border-border bg-background/50 px-3 py-2 focus-within:border-primary/40">
          <Search size={14} className="text-muted-foreground" aria-hidden />
          <span className="sr-only">Search courses</span>
          <input
            type="text"
            placeholder="Search by name or code…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by department">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              aria-pressed={department === dept}
              onClick={() => setDepartment(dept)}
              className={`interactive rounded-[var(--radius-sm)] border px-2.5 py-1.5 text-[12px] font-medium ${
                department === dept
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-background/35 text-muted-foreground hover:text-foreground"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {visibleCourses.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <div key={course.id} className="surface-card p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-meta">{course.code}</p>
                <span className="text-meta rounded-[var(--radius-sm)] border border-border bg-background/50 px-2 py-0.5">
                  {course.department}
                </span>
              </div>
              <h3 className="text-card-title mt-1">{course.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="surface-card p-8 text-center">
          <p className="text-card-title">No courses match your search</p>
          <p className="text-secondary mt-1">Try a different keyword or department.</p>
        </div>
      )}
    </div>
  );
}
