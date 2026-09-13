import type { Student } from "@/types";

type ParticipantListProps = {
  participants: Student[];
};

export function ParticipantList({ participants }: ParticipantListProps) {
  return (
    <div className="surface-card p-4">
      <h2 className="text-label mb-3">Participants ({participants.length})</h2>
      <div className="flex flex-wrap gap-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-2 rounded-full border border-border bg-background/40 py-1 pl-1 pr-3"
          >
            <img
              src={participant.avatar}
              alt={`${participant.name} avatar`}
              className="h-6 w-6 rounded-full bg-elevated"
            />
            <span className="text-[12px] font-medium text-foreground">{participant.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
