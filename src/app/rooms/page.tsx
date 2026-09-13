"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/ui/layout/PageHeader";
import { RoomCard } from "@/ui/rooms/RoomCard";
import { STUDY_ROOMS } from "@/data/rooms";
import { COURSES } from "@/data/courses";
import { filterRoomsByCourse } from "@/core/room";

export default function RoomsPage() {
  const [courseId, setCourseId] = useState<string>("All");

  const courseOptions = useMemo(() => {
    const usedCourseIds = new Set(STUDY_ROOMS.map((room) => room.courseId));
    return COURSES.filter((course) => usedCourseIds.has(course.id));
  }, []);

  const visibleRooms = useMemo(() => filterRoomsByCourse(STUDY_ROOMS, courseId), [courseId]);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Study Rooms"
        description="Join a focused session and make progress together."
      />

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter rooms by course">
        <button
          type="button"
          aria-pressed={courseId === "All"}
          onClick={() => setCourseId("All")}
          className={`interactive rounded-[var(--radius-sm)] border px-2.5 py-1.5 text-[12px] font-medium ${
            courseId === "All"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border bg-background/35 text-muted-foreground hover:text-foreground"
          }`}
        >
          All rooms
        </button>
        {courseOptions.map((course) => (
          <button
            key={course.id}
            type="button"
            aria-pressed={courseId === course.id}
            onClick={() => setCourseId(course.id)}
            className={`interactive rounded-[var(--radius-sm)] border px-2.5 py-1.5 text-[12px] font-medium ${
              courseId === course.id
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-background/35 text-muted-foreground hover:text-foreground"
            }`}
          >
            {course.name}
          </button>
        ))}
      </div>

      {visibleRooms.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              courseLabel={COURSES.find((course) => course.id === room.courseId)?.name}
            />
          ))}
        </div>
      ) : (
        <div className="surface-card p-8 text-center">
          <p className="text-card-title">No rooms for this course yet</p>
          <p className="text-secondary mt-1">Try a different course filter.</p>
        </div>
      )}
    </div>
  );
}
