import { notFound } from "next/navigation";
import { STUDY_ROOMS } from "@/data/rooms";
import { STUDENTS, CURRENT_STUDENT } from "@/data/students";
import { COURSES } from "@/data/courses";
import { joinRoom } from "@/core/room";
import { RoomWorkspace } from "@/ui/rooms/RoomWorkspace";
import type { Student } from "@/types";

type RoomDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { id } = await params;
  const room = STUDY_ROOMS.find((r) => r.id === id);

  if (!room) {
    notFound();
  }

  // Visiting the room "joins" it locally — no backend/session persistence.
  const roomWithCurrentUser = joinRoom(room, CURRENT_STUDENT.id);

  const participants = roomWithCurrentUser.participants
    .map((participantId): Student | undefined =>
      participantId === CURRENT_STUDENT.id
        ? CURRENT_STUDENT
        : STUDENTS.find((student) => student.id === participantId),
    )
    .filter((student): student is Student => Boolean(student));

  const courseName = COURSES.find((course) => course.id === room.courseId)?.name ?? "General";

  return (
    <RoomWorkspace
      room={roomWithCurrentUser}
      participants={participants}
      courseName={courseName}
      currentUser={CURRENT_STUDENT}
    />
  );
}
