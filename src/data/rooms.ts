import { StudyRoom } from '../types';

export const STUDY_ROOMS: StudyRoom[] = [
  {
    id: 'room1',
    title: 'DSA Practice Room',
    courseId: 'c1', // Data Structures
    hostId: 's3',
    participants: ['s3', 's1', 's7', 's9'],
    studyGoal: 'Review Chapter 3-5 problem sets',
    status: 'Active',
    timerMinutes: 45,
    capacity: 6,
    schedule: 'Flexible',
  },
  {
    id: 'room2',
    title: 'Math Study Group',
    courseId: 'c5', // Probability and Statistics
    hostId: 's6',
    participants: ['s6', 's1'],
    studyGoal: 'Work through probability problem sets',
    status: 'Active',
    timerMinutes: 45,
    capacity: 5,
    schedule: 'Evening',
  },
  {
    id: 'room3',
    title: 'System Design Room',
    courseId: 'c9', // Object-oriented Software
    hostId: 's2',
    participants: ['s2', 's5', 's9'],
    studyGoal: 'Discuss design patterns for the term project',
    status: 'Active',
    timerMinutes: 45,
    capacity: 5,
    schedule: 'Afternoon',
  },
  {
    id: 'room4',
    title: 'ML Concepts Circle',
    courseId: 'c10', // Machine Learning
    hostId: 's11',
    participants: ['s11', 's2', 's8', 's5'],
    studyGoal: 'Walk through gradient descent and loss functions',
    status: 'Active',
    timerMinutes: 45,
    capacity: 6,
    schedule: 'Evening',
  },
  {
    id: 'room5',
    title: 'Networks Deep Dive',
    courseId: 'c2', // Computer Networks
    hostId: 's4',
    participants: ['s4', 's10'],
    studyGoal: 'Cover TCP/IP layering and routing basics',
    status: 'Active',
    timerMinutes: 45,
    capacity: 5,
    schedule: 'Morning',
  },
  {
    id: 'room6',
    title: 'Database Systems Lab',
    courseId: 'c8', // Database Systems
    hostId: 's8',
    participants: ['s8', 's2', 's12'],
    studyGoal: 'Practice normalization and query optimization',
    status: 'Active',
    timerMinutes: 45,
    capacity: 6,
    schedule: 'Flexible',
  },
];
