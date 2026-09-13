import { STUDENTS, CURRENT_STUDENT } from "@/data/students";
import { COURSES } from "@/data/courses";
import { calculateMatch } from "@/core/matching";
import { MatchResult } from "@/ui/match/MatchResult";

type MatchPageProps = {
  searchParams: Promise<{ buddy?: string }>;
};

export default async function MatchPage({ searchParams }: MatchPageProps) {
  const { buddy } = await searchParams;

  const selectedStudent =
    STUDENTS.find((student) => student.id === buddy) ??
    // No (valid) buddy selected — fall back to the best available match
    // instead of leaving the page blank.
    STUDENTS.map((student) => calculateMatch(CURRENT_STUDENT, student))
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)[0].student;

  const match = calculateMatch(CURRENT_STUDENT, selectedStudent);
  const courseTags = match.student.courses
    .filter((id) => CURRENT_STUDENT.courses.includes(id))
    .map((id) => COURSES.find((course) => course.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return <MatchResult match={match} courseTags={courseTags} />;
}
