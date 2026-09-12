import React, { useState, useEffect } from 'react';

interface StudyTimerProps {
  initialMinutes?: number;
  goal: string;
  onGoalChange: (newGoal: string) => void;
}

export const StudyTimer: React.FC<StudyTimerProps> = ({ initialMinutes = 25, goal, onGoalChange }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Timer Controls */}
      <div className="flex flex-col items-center justify-center bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 text-center">
        <div className="text-6xl font-mono font-bold tracking-wider text-emerald-400 mb-6">
          {formatTime(timeLeft)}
        </div>
        <div className="flex items-center space-x-4">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition text-xs"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition text-xs"
            >
              Pause
            </button>
          )}
          <button
            onClick={() => { setIsRunning(false); setTimeLeft(initialMinutes * 60); }}
            className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition text-xs"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Goal Box */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Current Session Goal
          </span>
          <button
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            className="text-xs text-indigo-400 hover:underline"
          >
            {isEditingGoal ? 'Save' : 'Edit Goal'}
          </button>
        </div>
        {isEditingGoal ? (
          <input
            type="text"
            value={goal}
            onChange={(e) => onGoalChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-100 focus:outline-none"
          />
        ) : (
          <p className="text-sm font-medium text-slate-200">🎯 {goal}</p>
        )}
      </div>
    </div>
  );
};
