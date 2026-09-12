import Link from "next/link";
import { Users, Clock } from "lucide-react";
import type { StudyRoom } from "@/types";

type RecommendedRoomProps = {
  room: StudyRoom;
  department: string;
};

export function RecommendedRoom({ room, department }: RecommendedRoomProps) {
  return (
    <div className="interactive surface-card group flex flex-col gap-3 p-4 hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-card-title">{room.title}</h3>
        <span className="text-meta shrink-0 rounded-[var(--radius-sm)] border border-border bg-background/60 px-2 py-0.5">
          {department}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Users size={14} strokeWidth={1.8} />
          {room.participants.length}
          {room.capacity ? ` / ${room.capacity}` : ""}
        </span>
        {room.schedule ? (
          <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Clock size={14} strokeWidth={1.8} />
            {room.schedule}
          </span>
        ) : null}
      </div>

      <Link
        href={`/rooms/${room.id}`}
        className="interactive mt-auto rounded-[var(--radius-md)] border border-border bg-background/40 px-3 py-1.5 text-center text-[13px] font-medium text-foreground group-hover:border-primary/40 group-hover:text-primary"
      >
        Join room
      </Link>
    </div>
  );
}
