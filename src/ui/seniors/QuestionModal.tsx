"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Senior } from "@/types";

type QuestionModalProps = {
  senior: Senior;
  courseOptions: { id: string; label: string }[];
  defaultCourseId?: string;
  onClose: () => void;
  onSubmitSuccess: () => void;
};

export function QuestionModal({
  senior,
  courseOptions,
  defaultCourseId,
  onClose,
  onSubmitSuccess,
}: QuestionModalProps) {
  const [courseId, setCourseId] = useState(defaultCourseId ?? courseOptions[0]?.id ?? "");
  const [questionText, setQuestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    // No backend — simulate a short round trip before confirming locally.
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
      onClose();
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="question-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <div className="surface-card w-full max-w-lg p-6">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
          <h2 id="question-modal-title" className="text-card-title">
            Ask {senior.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="interactive text-muted-foreground hover:text-foreground"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label htmlFor="question-course" className="text-label mb-1.5 block">
              Related course
            </label>
            <select
              id="question-course"
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              className="interactive w-full rounded-[var(--radius-md)] border border-border bg-background/50 px-3 py-2 text-[13px] text-foreground focus:outline-none"
            >
              {courseOptions.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="question-text" className="text-label mb-1.5 block">
              Your question
            </label>
            <textarea
              id="question-text"
              rows={4}
              required
              placeholder="E.g. How did you prepare for the midterm? Any topics to prioritize?"
              value={questionText}
              onChange={(event) => setQuestionText(event.target.value)}
              className="interactive w-full rounded-[var(--radius-md)] border border-border bg-background/50 p-3 text-[13px] text-foreground focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="interactive rounded-[var(--radius-md)] border border-border bg-background/40 px-4 py-2 text-[12px] font-medium text-foreground hover:bg-white/[0.035]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="interactive rounded-[var(--radius-md)] bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground hover:brightness-110"
            >
              {isSubmitting ? "Sending…" : "Submit question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
