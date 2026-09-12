import Link from "next/link";
import { CircleCheck, ArrowUpRight } from "lucide-react";
import type { MatchResult } from "@/types";

type RecommendedBuddyProps = {
  match: MatchResult;
  courseTags: string[];
  href: string;
};

export function RecommendedBuddy({ match, courseTags, href }: RecommendedBuddyProps) {
  const { student, compatibilityScore, matchingReasons } = match;

  return (
    <Link
      href={href}
      className="interactive surface-card group flex flex-col gap-3 p-4 hover:border-primary/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={student.avatar}
            alt=""
            aria-hidden
            className="h-10 w-10 shrink-0 rounded-full bg-background ring-1 ring-border"
          />
          <div className="min-w-0">
            <p className="text-card-title truncate">{student.name}</p>
            <p className="text-meta">CS • Year {student.year}</p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
          {compatibilityScore}% Match
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {courseTags.map((tag) => (
          <span
            key={tag}
            className="text-meta rounded-[var(--radius-sm)] border border-border bg-background/60 px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      {matchingReasons.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {matchingReasons.slice(0, 3).map((reason) => (
            <li key={reason} className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
              <CircleCheck size={13} strokeWidth={2} className="shrink-0 text-secondary" />
              <span className="truncate">{reason}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="text-[13px] font-medium text-primary">View profile</span>
        <span
          aria-hidden
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-150 group-hover:border-primary/40 group-hover:text-primary"
        >
          <ArrowUpRight size={14} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}
