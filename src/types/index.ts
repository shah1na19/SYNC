export type StudyStyle = 'Quiet' | 'Discussion' | 'Pomodoro' | 'Project-based';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  year: number; // 1, 2, 3, or 4
  courses: string[]; // Course IDs
  availability: string[]; // e.g., ['Mon Evening', 'Fri Night']
  studyStyle: StudyStyle;
  bio: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
}

export interface Senior {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  major: string;
  coursesHandled: string[];
  bio: string;
  rating: number;
}

export interface Resource {
  id: string;
  title: string;
  courseId: string;
  type: 'Past Paper' | 'Lecture Notes' | 'Lab Code' | 'Exam Guide';
  author: string;
  fileUrl: string;
  upvotes: number;
  uploadedAt: string;
}

export interface StudyRoom {
  id: string;
  title: string;
  courseId: string;
  hostId: string;
  participants: string[]; // Student IDs
  studyGoal: string;
  status: 'Active' | 'Paused' | 'Ended';
  timerMinutes: number;
}

export interface MatchResult {
  student: Student;
  compatibilityScore: number; // Out of 100
  matchingReasons: string[];
}
