import { joinRoom, leaveRoom, filterRoomsByCourse } from '../src/core/room';
import { StudyRoom } from '../src/types';

describe('Room Logic', () => {
  const mockRoom: StudyRoom = {
    id: 'room1',
    title: 'COMP 2006E Prep',
    courseId: 'c1',
    hostId: 's1',
    participants: ['s1', 's2'],
    studyGoal: 'Finish Lab 2',
    status: 'Active',
    timerMinutes: 25,
  };

  it('should add a new participant to the room', () => {
    const updated = joinRoom(mockRoom, 's3');
    expect(updated.participants).toContain('s3');
    expect(updated.participants.length).toBe(3);
  });

  it('should not add duplicate participants', () => {
    const updated = joinRoom(mockRoom, 's1');
    expect(updated.participants.length).toBe(2);
  });

  it('should remove a participant when leaving', () => {
    const updated = leaveRoom(mockRoom, 's2');
    expect(updated.participants).not.toContain('s2');
    expect(updated.participants.length).toBe(1);
  });

  it('should filter rooms correctly by course ID', () => {
    const rooms: StudyRoom[] = [
      mockRoom,
      { ...mockRoom, id: 'room2', courseId: 'c2' },
    ];

    const filtered = filterRoomsByCourse(rooms, 'c1');
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('room1');
  });
});
