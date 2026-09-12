import { StudyRoom } from '../types';
import { COURSES } from './courses';

export const STUDY_ROOMS: StudyRoom[] = Array.from({ length: 6 }, (_, i) => ({
  id: `room${i + 1}`,
  title: `${COURSES[i % 5].code} Group Revision Session`,
  courseId: COURSES[i % 5].id,
  hostId: `s${i + 1}`,
  participants: [`s${i + 1}`, `s${i + 2}`, `s${i + 3}`],
  studyGoal: 'Review Chapter 3-5 problem sets',
  status: 'Active',
  timerMinutes: 45,
}));
