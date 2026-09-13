"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/ui/layout/PageHeader";
import { CURRENT_USER } from "@/main/constants";
import { CURRENT_STUDENT } from "@/data/students";
import type { StudyStyle } from "@/types";

const STUDY_STYLES: StudyStyle[] = ["Quiet", "Discussion", "Pomodoro", "Project-based"];
const AVAILABILITY_OPTIONS = ["Fri Night", "Sat Afternoon", "Sat Night", "Sun Afternoon"];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`interactive relative h-6 w-11 shrink-0 rounded-full border ${
        checked ? "border-primary/40 bg-primary/30" : "border-border bg-background/60"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-foreground transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState(CURRENT_USER.name);
  const [year, setYear] = useState(CURRENT_STUDENT.year);
  const [studyStyle, setStudyStyle] = useState<StudyStyle>(CURRENT_STUDENT.studyStyle);
  const [availability, setAvailability] = useState<string[]>(CURRENT_STUDENT.availability);
  const [emailDigest, setEmailDigest] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [showSaved, setShowSaved] = useState(false);

  const toggleAvailability = (slot: string) => {
    setAvailability((prev) => (prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]));
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    // Local-only — there is no backend to persist this to.
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Settings" description="Workspace preferences." />

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <section className="surface-card p-5">
          <h2 className="text-section-title mb-4">Profile</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="settings-name" className="text-label mb-1.5 block">
                Name
              </label>
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="interactive w-full rounded-[var(--radius-md)] border border-border bg-background/50 px-3 py-2 text-[13px] text-foreground focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="settings-year" className="text-label mb-1.5 block">
                Year
              </label>
              <select
                id="settings-year"
                value={year}
                onChange={(event) => setYear(Number(event.target.value))}
                className="interactive w-full rounded-[var(--radius-md)] border border-border bg-background/50 px-3 py-2 text-[13px] text-foreground focus:outline-none"
              >
                {[1, 2, 3, 4].map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="surface-card p-5">
          <h2 className="text-section-title mb-4">Study preferences</h2>

          <div>
            <p className="text-label mb-1.5">Preferred study style</p>
            <div className="flex flex-wrap gap-1.5">
              {STUDY_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  aria-pressed={studyStyle === style}
                  onClick={() => setStudyStyle(style)}
                  className={`interactive rounded-[var(--radius-sm)] border px-2.5 py-1.5 text-[12px] font-medium ${
                    studyStyle === style
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-background/35 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-label mb-1.5">Usual availability</p>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABILITY_OPTIONS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  aria-pressed={availability.includes(slot)}
                  onClick={() => toggleAvailability(slot)}
                  className={`interactive rounded-[var(--radius-sm)] border px-2.5 py-1.5 text-[12px] font-medium ${
                    availability.includes(slot)
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-background/35 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card p-5">
          <h2 className="text-section-title mb-4">Notifications</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-foreground">Weekly email digest</p>
                <p className="text-meta">A summary of matches and sessions each week.</p>
              </div>
              <Toggle checked={emailDigest} onChange={setEmailDigest} label="Weekly email digest" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-foreground">Session reminders</p>
                <p className="text-meta">A nudge shortly before a room or senior session starts.</p>
              </div>
              <Toggle checked={sessionReminders} onChange={setSessionReminders} label="Session reminders" />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          {showSaved ? (
            <p className="flex items-center gap-1.5 text-[13px] text-success">
              <CheckCircle2 size={14} aria-hidden />
              Saved
            </p>
          ) : null}
          <button
            type="submit"
            className="interactive rounded-[var(--radius-md)] bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground hover:brightness-110"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
