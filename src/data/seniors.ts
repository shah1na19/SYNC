import { Senior } from '../types';

export const SENIORS: Senior[] = Array.from({ length: 6 }, (_, i) => ({
  id: `snr${i + 1}`,
  name: `Senior Mentor ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=senior${i + 1}`,
  grade: 'Senior Class of 2025',
  major: 'Computer Science',
  coursesHandled: [`c${(i % 5) + 1}`],
  bio: 'Passed with A+ grade. Happy to answer exam and lab questions.',
  rating: 4.8 + (i % 3) * 0.1,
}));

