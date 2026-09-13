import Link from "next/link";
import { Target, Users } from "lucide-react";
import type { StudyRoom } from "@/types";

type RoomCardProps = {
  room: StudyRoom;
  courseLabel?: string;
};

export function RoomCard({ room, courseLabel }: RoomCardProps) {
  return (
    <div className="surface-card interactive flex flex-col justify-between gap-4 p-4 hover:-translate-y-0.5 hover:border-primary/25">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-card-title">{room.title}</h3>
          <span className="shrink-0 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
            {room.status}
          </span>
        </div>

        {courseLabel ? <p className="text-meta mt-1">{courseLabel}</p> : null}

        <p className="text-secondary mt-3 flex items-start gap-1.5">
          <Target size={13} className="mt-0.5 shrink-0" aria-hidden />
          {room.studyGoal}
        </p>

        <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Users size={13} aria-hidden />
          {room.participants.length}
          {room.capacity ? ` / ${room.capacity}` : ""} participants
          {room.schedule ? <span className="text-meta ml-1">• {room.schedule}</span> : null}
        </p>
      </div>

      <Link
        href={`/rooms/${room.id}`}
        className="interactive block rounded-[var(--radius-md)] bg-primary py-2 text-center text-[12px] font-semibold text-primary-foreground hover:brightness-110"
      >
        Join room
      </Link>
    </div>
  );
}
