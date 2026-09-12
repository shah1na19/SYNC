import { StudyRoom, Student } from '@/types';

// Join an existing study room
export function joinRoom(room: StudyRoom, studentId: string): StudyRoom {
  if (room.participants.includes(studentId)) return room;
  return {
    ...room,
    participants: [...room.participants, studentId],
  };
}

// Leave a study room
export function leaveRoom(room: StudyRoom, studentId: string): StudyRoom {
  return {
    ...room,
    participants: room.participants.filter((id) => id !== studentId),
  };
}

// Filter rooms by course ID
export function filterRoomsByCourse(rooms: StudyRoom[], courseId: string): StudyRoom[] {
  if (courseId === 'All') return rooms;
  return rooms.filter((r) => r.courseId === courseId);
}
