import { UserPlus, Users, MessageCircleQuestionMark, BookOpen } from "lucide-react";
import { CURRENT_USER } from "@/main/constants";
import { STUDENTS, CURRENT_STUDENT } from "@/data/students";
import { COURSES } from "@/data/courses";
import { STUDY_ROOMS } from "@/data/rooms";
import {
  ACADEMIC_JOURNEY_METRICS,
  WEEKLY_FOCUS_PERCENT,
  STUDY_FOCUS,
  UPCOMING_SESSIONS,
} from "@/data/dashboard";
import { calculateMatch } from "@/core/matching";
import { WelcomeCard } from "@/ui/dashboard/WelcomeCard";
import { QuickActionCard } from "@/ui/dashboard/QuickActionCard";
import { StudyPulse } from "@/ui/dashboard/StudyPulse";
import { StudyFocus } from "@/ui/dashboard/StudyFocus";
import { RecommendedBuddy } from "@/ui/dashboard/RecommendedBuddy";
import { RecommendedRoom } from "@/ui/dashboard/RecommendedRoom";
import { UpcomingSession } from "@/ui/dashboard/UpcomingSession";
import { DashboardSection } from "@/ui/dashboard/DashboardSection";

const QUICK_ACTIONS = [
  {
    href: "/discover",
    icon: UserPlus,
    title: "Find a Study Buddy",
    description: "Match with students who share your courses, schedule, and study style.",
    actionLabel: "Discover",
  },
  {
    href: "/rooms",
    icon: Users,
    title: "Join a Study Room",
    description: "Focus together and make meaningful progress.",
    actionLabel: "Explore rooms",
  },
  {
    href: "/seniors",
    icon: MessageCircleQuestionMark,
    title: "Ask a Senior",
    description: "Get practical guidance from experienced students.",
    actionLabel: "Ask",
  },
  {
    href: "/courses",
    icon: BookOpen,
    title: "Explore Courses",
    description: "See your courses and academic activity.",
    actionLabel: "View courses",
  },
];

function courseTagsFor(courseIds: string[]) {
  return courseIds
    .map((id) => COURSES.find((course) => course.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}

function departmentFor(courseId: string) {
  return COURSES.find((course) => course.id === courseId)?.department ?? "CS";
}

export default function DashboardPage() {
  const recommendedBuddies = STUDENTS.map((student) => calculateMatch(CURRENT_STUDENT, student))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
    .slice(0, 3);

  const recommendedRooms = STUDY_ROOMS.slice(0, 3);

  return (
    <div className="flex flex-col gap-5">
      <WelcomeCard name={CURRENT_USER.name} role={CURRENT_USER.role} />

      <section aria-label="Quick actions" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard key={action.href} {...action} />
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-5">
          <StudyPulse metrics={ACADEMIC_JOURNEY_METRICS} weeklyPercent={WEEKLY_FOCUS_PERCENT} />

          <StudyFocus message={STUDY_FOCUS.message} items={STUDY_FOCUS.items} />

          <DashboardSection title="Recommended Study Buddies" viewAllHref="/discover">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedBuddies.map((match) => (
                <RecommendedBuddy
                  key={match.student.id}
                  match={match}
                  courseTags={courseTagsFor(match.student.courses)}
                  href="/discover"
                />
              ))}
            </div>
          </DashboardSection>

          <DashboardSection title="Recommended Study Rooms" viewAllHref="/rooms">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedRooms.map((room) => (
                <RecommendedRoom key={room.id} room={room} department={departmentFor(room.courseId)} />
              ))}
            </div>
          </DashboardSection>
        </div>

        <aside aria-labelledby="upcoming-sessions-heading" className="surface-card h-fit p-4 lg:sticky lg:top-6">
          <h2 id="upcoming-sessions-heading" className="text-section-title mb-3">
            Upcoming Sessions
          </h2>
          <div className="flex flex-col gap-2.5">
            {UPCOMING_SESSIONS.map((session) => (
              <UpcomingSession key={session.id} session={session} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
