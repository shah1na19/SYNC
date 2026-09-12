import { PageHeader } from "@/ui/layout/PageHeader";

const samples = [
  {
    label: "Surface",
    title: "Workspace",
    body: "Primary application surface for reading and navigation.",
    tone: "bg-surface",
  },
  {
    label: "Elevated",
    title: "Panels",
    body: "Cards and panels sit one level above the workspace.",
    tone: "bg-elevated",
  },
  {
    label: "Accent",
    title: "Focus",
    body: "A single luminous accent marks the current place and intent.",
    tone: "bg-elevated",
  },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A calm academic workspace. Product features will land here; this view exists to prove the visual system and application shell."
      />

      <section aria-label="Visual system samples" className="grid gap-4 md:grid-cols-3">
        {samples.map((sample) => (
          <article key={sample.label} className={`surface-card ${sample.tone} p-4`}>
            <p className="text-label">{sample.label}</p>
            <h2 className="text-card-title mt-2">{sample.title}</h2>
            <p className="text-secondary mt-1.5">{sample.body}</p>
          </article>
        ))}
      </section>

      <section className="surface-card mt-4 p-4">
        <p className="text-label">Typography</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-page-title">Page title</p>
            <p className="text-section-title mt-2">Section title</p>
            <p className="text-body mt-2">Body copy for dense academic work.</p>
            <p className="text-secondary mt-1">Secondary text stays muted and readable.</p>
          </div>
          <div>
            <p className="text-label">Metadata</p>
            <p className="text-meta mt-2">HITSZ · Computer Science · Desktop</p>
            <p className="text-stat mt-3">1366 × 768</p>
            <p className="text-meta">Target resolution alongside 1920 × 1080</p>
          </div>
        </div>
      </section>
    </>
  );
}
