"use client";

import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, Target } from "lucide-react";
import { formatTime, calculateProgress } from "@/core/session";

type StudyTimerProps = {
  initialMinutes?: number;
  goal: string;
  onGoalChange: (goal: string) => void;
};

export function StudyTimer({ initialMinutes = 25, goal, onGoalChange }: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0) setIsRunning(false);
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const progress = calculateProgress(timeLeft, initialMinutes);

  return (
    <div className="flex flex-col gap-4">
      <div className="surface-card flex flex-col items-center gap-5 p-8 text-center">
        <div className="text-stat text-5xl text-primary" style={{ filter: "drop-shadow(0 0 10px var(--glow))" }}>
          {formatTime(timeLeft)}
        </div>

        <div className="h-1.5 w-full max-w-[16rem] overflow-hidden rounded-full bg-background/60">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          {!isRunning ? (
            <button
              type="button"
              onClick={() => setIsRunning(true)}
              disabled={timeLeft <= 0}
              className="interactive flex items-center gap-1.5 rounded-[var(--radius-md)] bg-primary px-5 py-2 text-[12px] font-semibold text-primary-foreground hover:brightness-110"
            >
              <Play size={13} aria-hidden />
              Start
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRunning(false)}
              className="interactive flex items-center gap-1.5 rounded-[var(--radius-md)] bg-warning px-5 py-2 text-[12px] font-semibold text-background hover:brightness-110"
            >
              <Pause size={13} aria-hidden />
              Pause
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(initialMinutes * 60);
            }}
            className="interactive flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border bg-background/40 px-5 py-2 text-[12px] font-medium text-foreground hover:bg-white/[0.035]"
          >
            <RotateCcw size={13} aria-hidden />
            Reset
          </button>
        </div>
      </div>

      <div className="surface-card p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-label flex items-center gap-1.5">
            <Target size={12} aria-hidden />
            Session goal
          </span>
          <button
            type="button"
            onClick={() => setIsEditingGoal((prev) => !prev)}
            className="interactive text-[12px] font-medium text-primary hover:underline"
          >
            {isEditingGoal ? "Save" : "Edit goal"}
          </button>
        </div>
        {isEditingGoal ? (
          <input
            type="text"
            value={goal}
            onChange={(event) => onGoalChange(event.target.value)}
            className="interactive mt-2 w-full rounded-[var(--radius-md)] border border-border bg-background/50 px-3 py-1.5 text-[13px] text-foreground focus:outline-none"
          />
        ) : (
          <p className="text-card-title mt-2">{goal}</p>
        )}
      </div>
    </div>
  );
}
