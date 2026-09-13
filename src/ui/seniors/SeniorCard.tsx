import { GraduationCap, MessageCircleQuestionMark, Star } from "lucide-react";
import type { Senior } from "@/types";

type SeniorCardProps = {
  senior: Senior;
  courseLabels: string[];
  onSelect: (senior: Senior) => void;
};

export function SeniorCard({ senior, courseLabels, onSelect }: SeniorCardProps) {
  return (
    <div className="surface-card interactive flex flex-col justify-between gap-4 p-4 hover:-translate-y-0.5 hover:border-primary/25">
      <div>
        <div className="flex items-center gap-3">
          <img
            src={senior.avatar}
            alt={`${senior.name} avatar`}
            className="h-12 w-12 rounded-full bg-elevated ring-1 ring-border"
          />
          <div className="min-w-0">
            <h3 className="text-card-title truncate">{senior.name}</h3>
            <p className="text-meta flex items-center gap-1">
              <GraduationCap size={12} aria-hidden />
              {senior.grade}
            </p>
            <p className="text-meta flex items-center gap-1">
              <Star size={12} className="text-warning" aria-hidden />
              {senior.rating.toFixed(1)} / 5.0
            </p>
          </div>
        </div>

        <p className="text-secondary mt-3 line-clamp-2">{senior.bio}</p>

        <div className="mt-3">
          <p className="text-label mb-1.5">Courses handled</p>
          <div className="flex flex-wrap gap-1.5">
            {courseLabels.map((label) => (
              <span
                key={label}
                className="rounded-[var(--radius-sm)] border border-border bg-background/50 px-2 py-1 text-[11px] text-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(senior)}
        className="interactive flex items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-primary py-2 text-[12px] font-semibold text-primary-foreground hover:brightness-110"
      >
        <MessageCircleQuestionMark size={14} aria-hidden />
        Ask a question
      </button>
    </div>
  );
}
