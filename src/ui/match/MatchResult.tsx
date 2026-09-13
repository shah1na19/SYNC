import Link from "next/link";
import { ArrowLeft, BookOpen, CalendarClock, MessageCircle, Rocket } from "lucide-react";
import type { MatchResult as MatchResultType } from "@/types";
import { MatchScore } from "@/ui/discover/MatchScore";

type MatchResultProps = {
  match: MatchResultType;
  courseTags: string[];
};

export function MatchResult({ match, courseTags }: MatchResultProps) {
  const { student, compatibilityScore, matchingReasons } = match;

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/discover"
        className="interactive inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft size={14} aria-hidden />
        Back to Discover
      </Link>

      <section className="surface-card flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <img
            src={student.avatar}
            alt={`${student.name} avatar`}
            className="h-16 w-16 shrink-0 rounded-full bg-background ring-1 ring-border"
          />
          <div>
            <p className="text-label">Your match</p>
            <h1 className="text-page-title mt-1">{student.name}</h1>
            <p className="text-meta mt-1">CS • Year {student.year}</p>
            <p className="text-secondary mt-3 max-w-[36rem]">{student.bio}</p>
          </div>
        </div>

        <div className="shrink-0 self-center">
          <MatchScore score={compatibilityScore} size="lg" reasons={matchingReasons} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5">
          <div className="mb-2 flex items-center gap-1.5 text-label">
            <BookOpen size={12} aria-hidden />
            Shared courses
          </div>
          {courseTags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {courseTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[var(--radius-sm)] border border-border bg-background/50 px-2 py-1 text-[12px] text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-secondary">No overlapping courses yet.</p>
          )}
        </div>

        <div className="surface-card p-5">
          <div className="mb-2 flex items-center gap-1.5 text-label">
            <CalendarClock size={12} aria-hidden />
            Availability
          </div>
          <div className="flex flex-wrap gap-1.5">
            {student.availability.map((slot) => (
              <span
                key={slot}
                className="rounded-[var(--radius-sm)] border border-border bg-background/50 px-2 py-1 text-[12px] text-foreground"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        <div className="surface-card p-5">
          <div className="mb-2 flex items-center gap-1.5 text-label">
            <MessageCircle size={12} aria-hidden />
            Study style
          </div>
          <p className="text-card-title">{student.studyStyle}</p>
        </div>
      </div>

      {matchingReasons.length > 0 ? (
        <section className="surface-card p-5">
          <h2 className="text-section-title mb-3">Why you match</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {matchingReasons.map((reason) => (
              <li key={reason} className="text-secondary flex items-start gap-2">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {reason}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="flex justify-end">
        <Link
          href="/rooms"
          className="interactive flex items-center gap-2 rounded-[var(--radius-md)] bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-[0_0_18px_var(--glow)] hover:brightness-110"
        >
          <Rocket size={15} aria-hidden />
          Start Studying Together
        </Link>
      </div>
    </div>
  );
}
