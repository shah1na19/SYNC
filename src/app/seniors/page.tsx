"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/ui/layout/PageHeader";
import { SeniorCard } from "@/ui/seniors/SeniorCard";
import { QuestionModal } from "@/ui/seniors/QuestionModal";
import { SENIORS } from "@/data/seniors";
import { COURSES } from "@/data/courses";
import type { Senior } from "@/types";

const COURSE_OPTIONS = COURSES.map((course) => ({ id: course.id, label: `${course.code} — ${course.name}` }));

function courseLabelsFor(senior: Senior) {
  return senior.coursesHandled
    .map((id) => COURSES.find((course) => course.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}

export default function SeniorsPage() {
  const [activeSenior, setActiveSenior] = useState<Senior | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Ask a Senior"
        description="Get practical, course-specific guidance from experienced HITSZ CS students."
      />

      {showSuccess ? (
        <div
          role="status"
          className="surface-card flex items-center gap-2 border-success/30 bg-success/10 p-4 text-success"
        >
          <CheckCircle2 size={16} aria-hidden />
          <p className="text-[13px] font-medium">
            Your question was sent. Seniors usually reply within a day.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SENIORS.map((senior) => (
          <SeniorCard
            key={senior.id}
            senior={senior}
            courseLabels={courseLabelsFor(senior)}
            onSelect={(selected) => {
              setShowSuccess(false);
              setActiveSenior(selected);
            }}
          />
        ))}
      </div>

      {activeSenior ? (
        <QuestionModal
          senior={activeSenior}
          courseOptions={COURSE_OPTIONS}
          defaultCourseId={activeSenior.coursesHandled[0]}
          onClose={() => setActiveSenior(null)}
          onSubmitSuccess={() => setShowSuccess(true)}
        />
      ) : null}
    </div>
  );
}
