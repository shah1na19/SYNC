import Link from "next/link";
import type { ReactNode } from "react";

type DashboardSectionProps = {
  title: string;
  description?: string;
  viewAllHref?: string;
  children: ReactNode;
};

export function DashboardSection({
  title,
  description,
  viewAllHref,
  children,
}: DashboardSectionProps) {
  return (
    <section aria-labelledby={`${title}-heading`}>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 id={`${title}-heading`} className="text-section-title">
            {title}
          </h2>
          {description ? <p className="text-secondary mt-0.5">{description}</p> : null}
        </div>
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="interactive shrink-0 text-[13px] font-medium text-muted-foreground hover:text-primary"
          >
            View all
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
