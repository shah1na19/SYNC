import { AcademicJourneyMetric, StudyFocusItem, UpcomingSessionItem } from '@/types';

// Summary stats for the "Your Academic Journey" section on the Dashboard.
export const ACADEMIC_JOURNEY_METRICS: AcademicJourneyMetric[] = [
  { id: 'sessions', label: 'Study Sessions', current: 4, target: 6 },
  { id: 'courses', label: 'Courses Completed', current: 3, target: 5 },
  { id: 'hours', label: 'Study Hours', current: 12.5, target: 20, unit: 'hrs' },
];

// A separate, week-scoped focus percentage shown in the progress ring.
export const WEEKLY_FOCUS_PERCENT = 72;

export const STUDY_FOCUS = {
  message: 'Small consistent steps lead to big results.',
  items: [
    { id: 'f1', label: 'Data Structures', done: true },
    { id: 'f2', label: 'Algorithms', done: false },
    { id: 'f3', label: 'Linear Algebra', done: false },
  ] satisfies StudyFocusItem[],
};

export const UPCOMING_SESSIONS: UpcomingSessionItem[] = [
  {
    id: 'up1',
    title: 'Data Structures Study Group',
    timeLabel: 'Today • 14:00 – 16:00',
    location: 'Room 3A-101',
    kind: 'room',
    href: '/rooms/room1',
    actionLabel: 'Join',
  },
  {
    id: 'up2',
    title: 'Math Study Group',
    timeLabel: 'Today • 16:30 – 18:30',
    location: 'Room 2B-205',
    kind: 'room',
    href: '/rooms/room2',
    actionLabel: 'Join',
  },
  {
    id: 'up3',
    title: 'Ask a Senior — Algorithms',
    timeLabel: 'Tomorrow • 10:00 – 11:00',
    location: 'Online',
    kind: 'senior',
    href: '/seniors',
    actionLabel: 'View',
  },
];
