import Link from "next/link";
import { CircleCheck, Circle, ArrowRight } from "lucide-react";
import type { StudyFocusItem } from "@/types";

type StudyFocusProps = {
  message: string;
  items: StudyFocusItem[];
};

function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function StudyFocus({ message, items }: StudyFocusProps) {
  return (
    <section aria-labelledby="study-focus-title" className="surface-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="study-focus-title" className="text-section-title">
            Today&apos;s Study Focus
          </h2>
          <p className="text-meta mt-1">{todayLabel()}</p>
        </div>
      </div>

      <p className="text-secondary mt-3">{message}</p>

      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2.5">
            {item.done ? (
              <CircleCheck size={16} strokeWidth={1.8} className="shrink-0 text-success" />
            ) : (
              <Circle size={16} strokeWidth={1.8} className="shrink-0 text-muted-foreground" />
            )}
            <span className={item.done ? "text-secondary line-through" : "text-body"}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/courses"
        className="interactive mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-primary"
      >
        Keep going
        <ArrowRight size={14} strokeWidth={2} />
      </Link>
    </section>
  );
}
