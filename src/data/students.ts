import { Student } from '../types';

export const STUDENTS: Student[] = Array.from({ length: 25 }, (_, i) => ({
  id: `s${i + 1}`,
  name: `Student ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i + 1}`,
  year: (i % 4) + 1,
  courses: [`c${(i % 5) + 1}`, `c${((i + 1) % 5) + 1}`],
  availability: i % 2 === 0 ? ['Fri Night', 'Sat Afternoon'] : ['Sat Night', 'Sun Afternoon'],
  studyStyle: (['Quiet', 'Discussion', 'Pomodoro', 'Project-based'] as const)[i % 4],
  bio: `CS Student at HITSZ focusing on collaborative learning and group revision.`,
}));
