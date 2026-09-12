import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { UpcomingSessionItem } from "@/types";

type UpcomingSessionProps = {
  session: UpcomingSessionItem;
};

export function UpcomingSession({ session }: UpcomingSessionProps) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-border bg-background/30 p-3">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-foreground">{session.title}</p>
        <p className="text-meta mt-1 flex items-center gap-1.5">
          <Clock size={12} strokeWidth={1.8} className="shrink-0" />
          {session.timeLabel}
        </p>
        <p className="text-meta mt-0.5 flex items-center gap-1.5">
          <MapPin size={12} strokeWidth={1.8} className="shrink-0" />
          {session.location}
        </p>
      </div>

      <Link
        href={session.href}
        className="interactive shrink-0 rounded-[var(--radius-sm)] border border-primary/30 bg-primary/10 px-2.5 py-1 text-[12px] font-medium text-primary hover:bg-primary/15"
      >
        {session.actionLabel}
      </Link>
    </div>
  );
}
