import type { AcademicJourneyMetric } from "@/types";

type StudyPulseProps = {
  metrics: AcademicJourneyMetric[];
  weeklyPercent: number;
};

const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressRing({ percent }: { percent: number }) {
  const offset = CIRCUMFERENCE - (Math.min(100, Math.max(0, percent)) / 100) * CIRCUMFERENCE;

  return (
    <div className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle
          cx="36"
          cy="36"
          r={RADIUS}
          fill="none"
          stroke="var(--border)"
          strokeWidth="6"
        />
        <circle
          cx="36"
          cy="36"
          r={RADIUS}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
          style={{ filter: "drop-shadow(0 0 6px var(--glow))" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-stat">{percent}%</span>
        <span className="text-meta -mt-0.5">This week</span>
      </div>
    </div>
  );
}

export function StudyPulse({ metrics, weeklyPercent }: StudyPulseProps) {
  return (
    <section aria-labelledby="academic-journey-title" className="surface-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="academic-journey-title" className="text-section-title">
            Your Academic Journey
          </h2>
          <p className="text-secondary mt-1">Keep going — you&apos;re building momentum.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <dl className="grid flex-1 grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id}>
              <dt className="text-label">{metric.label}</dt>
              <dd className="text-stat mt-1.5">
                {metric.current}
                <span className="text-muted-foreground"> / {metric.target}</span>
                {metric.unit ? (
                  <span className="text-meta ml-1 font-sans">{metric.unit}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <ProgressRing percent={weeklyPercent} />
      </div>
    </section>
  );
}
