"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import type { Student, StudyRoom } from "@/types";
import { leaveRoom } from "@/core/room";
import { RoomHeader, type FocusStatus } from "@/ui/rooms/RoomHeader";
import { ParticipantList } from "@/ui/rooms/ParticipantList";
import { RoomChat } from "@/ui/rooms/RoomChat";
import { StudyTimer } from "@/ui/rooms/StudyTimer";

type RoomWorkspaceProps = {
  room: StudyRoom;
  participants: Student[];
  courseName: string;
  currentUser: Student;
};

export function RoomWorkspace({ room, participants, courseName, currentUser }: RoomWorkspaceProps) {
  const router = useRouter();
  const [focusStatus, setFocusStatus] = useState<FocusStatus>("Deep Work");
  const [goal, setGoal] = useState(room.studyGoal);
  const [activeParticipants, setActiveParticipants] = useState(participants);

  const handleLeaveRoom = () => {
    const updatedRoom = leaveRoom({ ...room, participants: activeParticipants.map((p) => p.id) }, currentUser.id);
    setActiveParticipants((prev) => prev.filter((p) => updatedRoom.participants.includes(p.id)));
    router.push("/rooms");
  };

  return (
    <div className="flex flex-col gap-4">
      <RoomHeader room={{ ...room, studyGoal: goal }} focusStatus={focusStatus} onStatusChange={setFocusStatus} />

      <p className="text-meta -mt-2">{courseName}</p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-4">
          <StudyTimer initialMinutes={room.timerMinutes} goal={goal} onGoalChange={setGoal} />
          <ParticipantList participants={activeParticipants} />
        </div>

        <RoomChat currentUser={currentUser} />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleLeaveRoom}
          className="interactive flex items-center gap-1.5 rounded-[var(--radius-md)] border border-destructive/30 bg-destructive/10 px-4 py-2 text-[12px] font-semibold text-destructive hover:bg-destructive/15"
        >
          <LogOut size={13} aria-hidden />
          Leave room
        </button>
      </div>
    </div>
  );
}
