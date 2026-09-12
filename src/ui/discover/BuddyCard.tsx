import {
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import type { Student } from "@/types";
import { cn } from "@/ui/cn";
import { MatchScore } from "@/ui/discover/MatchScore";

export type BuddyCardProps = {
  buddy: Student;
  score: number;
  matchingReasons?: string[];
  courseLabels?: string[];
  onConnect?: (buddy: Student) => void;
  onViewProfile?: (buddy: Student) => void;
  className?: string;
  selected?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function isLocalAsset(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

export function BuddyCard({
  buddy,
  score,
  matchingReasons = [],
  courseLabels,
  onConnect,
  onViewProfile,
  className,
  selected = false,
  loading = false,
  disabled = false,
}: BuddyCardProps) {
  const visibleCourses = (courseLabels ?? buddy.courses).slice(0, 3);
  const remainingCourses = Math.max((courseLabels ?? buddy.courses).length - 3, 0);
  const reasons = matchingReasons.slice(0, 3);

  return (
    <article
      className={cn(
        "surface-card interactive flex min-w-0 flex-col overflow-hidden p-4",
        "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]",
        selected && "border-primary/40 bg-primary/[0.045] shadow-[0_0_0_1px_var(--glow)]",
        loading && "animate-pulse",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            {isLocalAsset(buddy.avatar) ? (
              <img
                src={buddy.avatar}
                alt={`${buddy.name} avatar`}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-border"
              />
            ) : (
              <div
                aria-label={`${buddy.name} avatar`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20"
              >
                {getInitials(buddy.name)}
              </div>
            )}
            <span
              aria-hidden
              className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-elevated"
              title="Available"
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-card-title text-foreground">{buddy.name}</h2>
            <p className="mt-0.5 text-meta">
              Computer Science <span aria-hidden>•</span> Year {buddy.year}
            </p>
          </div>
        </div>

        <MatchScore score={score} size="sm" />
      </div>

      <p className="mt-3 line-clamp-2 min-h-[2.5rem] text-secondary">{buddy.bio}</p>

      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-label">
            <BookOpen size={12} aria-hidden />
            Courses
          </div>
          <div className="flex flex-wrap gap-1.5">
            {visibleCourses.map((course) => (
              <span
                key={course}
                className="rounded-[var(--radius-sm)] border border-border bg-background/50 px-2 py-1 text-[11px] text-foreground"
              >
                {course}
              </span>
            ))}
            {remainingCourses > 0 ? (
              <span className="rounded-[var(--radius-sm)] border border-border bg-background/50 px-2 py-1 text-[11px] text-muted-foreground">
                +{remainingCourses} more
              </span>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[var(--radius-md)] border border-border bg-background/35 p-2.5">
            <div className="flex items-center gap-1.5 text-label">
              <MessageCircle size={12} aria-hidden />
              Study style
            </div>
            <p className="mt-1 text-[12px] font-medium text-foreground">{buddy.studyStyle}</p>
          </div>

          <div className="rounded-[var(--radius-md)] border border-border bg-background/35 p-2.5">
            <div className="flex items-center gap-1.5 text-label">
              <Clock3 size={12} aria-hidden />
              Availability
            </div>
            <p className="mt-1 truncate text-[12px] font-medium text-foreground">
              {buddy.availability[0] ?? "Flexible"}
            </p>
          </div>
        </div>

        {reasons.length > 0 ? (
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-label">
              <CalendarDays size={12} aria-hidden />
              Why this match
            </div>
            <ul className="space-y-1">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                  <Check size={13} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex gap-2 border-t border-border pt-3">
        <button
          type="button"
          disabled={disabled || loading}
          onClick={() => onConnect?.(buddy)}
          className="interactive flex h-9 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-primary px-3 text-[12px] font-semibold text-primary-foreground shadow-[0_0_18px_var(--glow)] hover:brightness-110"
        >
          <UserPlus size={14} aria-hidden />
          Connect
        </button>

        {onViewProfile ? (
          <button
            type="button"
            disabled={disabled || loading}
            onClick={() => onViewProfile(buddy)}
            className="interactive h-9 rounded-[var(--radius-md)] border border-border bg-background/40 px-3 text-[12px] font-medium text-muted-foreground hover:bg-white/[0.035] hover:text-foreground"
          >
            View profile
          </button>
        ) : null}
      </div>
    </article>
  );
}

