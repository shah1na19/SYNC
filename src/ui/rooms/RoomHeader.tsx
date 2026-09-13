import type { StudyRoom } from "@/types";

export type FocusStatus = "Deep Work" | "Taking a Break" | "Asking Questions";

type RoomHeaderProps = {
  room?: StudyRoom;
  focusStatus: FocusStatus;
  onStatusChange: (status: FocusStatus) => void;
};

export function RoomHeader({ room, focusStatus, onStatusChange }: RoomHeaderProps) {
  return (
    <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <h1 className="text-page-title truncate">{room?.title ?? "Study Room"}</h1>
        <p className="text-meta mt-1">{room?.studyGoal ?? "Focused study session"}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <label htmlFor="focus-status" className="text-label">
          Status
        </label>
        <select
          id="focus-status"
          value={focusStatus}
          onChange={(event) => onStatusChange(event.target.value as FocusStatus)}
          className="interactive rounded-[var(--radius-md)] border border-border bg-background/50 px-3 py-1.5 text-[12px] font-medium text-foreground focus:outline-none"
        >
          <option value="Deep Work">Deep Work</option>
          <option value="Taking a Break">Taking a Break</option>
          <option value="Asking Questions">Asking Questions</option>
        </select>
      </div>
    </div>
  );
}
