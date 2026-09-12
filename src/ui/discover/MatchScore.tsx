import { CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/ui/cn";

export type MatchScoreProps = {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  reasons?: string[];
  className?: string;
};

function getLevel(score: number) {
  if (score >= 90) return { label: "Excellent match", className: "text-secondary" };
  if (score >= 80) return { label: "Strong match", className: "text-primary" };
  if (score >= 70) return { label: "Good match", className: "text-primary" };
  return { label: "Potential match", className: "text-muted-foreground" };
}

const sizeStyles = {
  sm: {
    wrapper: "gap-1.5",
    score: "text-sm",
    label: "text-[9px]",
    icon: 12,
  },
  md: {
    wrapper: "gap-2",
    score: "text-xl",
    label: "text-[10px]",
    icon: 14,
  },
  lg: {
    wrapper: "gap-2.5",
    score: "text-3xl",
    label: "text-[11px]",
    icon: 16,
  },
} as const;

export function MatchScore({
  score,
  size = "md",
  showLabel = true,
  reasons,
  className,
}: MatchScoreProps) {
  const safeScore = Math.min(100, Math.max(0, Math.round(score)));
  const level = getLevel(safeScore);
  const styles = sizeStyles[size];
  const diameter = size === "sm" ? 44 : size === "md" ? 60 : 78;
  const stroke = size === "sm" ? 3 : 4;
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - safeScore / 100);

  return (
    <div className={cn("flex items-center", styles.wrapper, className)}>
      <div className="relative shrink-0" aria-label={`${safeScore}% match`}>
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          className="-rotate-90"
          role="img"
          aria-hidden={showLabel ? undefined : true}
        >
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-white/[0.07]"
          />
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={cn("text-primary", safeScore >= 90 && "text-secondary")}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-semibold tracking-tight", styles.score)}>{safeScore}%</span>
        </div>
      </div>

      {showLabel ? (
        <div className="min-w-0">
          <p className={cn("font-semibold leading-tight", styles.label, level.className)}>Match</p>
          {size !== "sm" ? (
            <p className="mt-0.5 max-w-[8rem] text-meta">{level.label}</p>
          ) : null}
        </div>
      ) : null}

      {reasons && reasons.length > 0 && size !== "sm" ? (
        <details className="ml-1 min-w-0 text-meta">
          <summary className="flex cursor-pointer list-none items-center gap-1 hover:text-foreground">
            <Sparkles size={styles.icon} aria-hidden />
            Why?
          </summary>
          <ul className="mt-2 space-y-1">
            {reasons.slice(0, 3).map((reason) => (
              <li key={reason} className="flex gap-1.5">
                <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}

