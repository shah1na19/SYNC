type WelcomeCardProps = {
  name: string;
  role: string;
};

export function WelcomeCard({ name, role }: WelcomeCardProps) {
  return (
    <section aria-label="Welcome" className="surface-card relative overflow-hidden p-6 lg:p-7">
      {/* Cosmic accent: a restrained orbital arc and a few distant points of light. */}
      <svg
        aria-hidden
        viewBox="0 0 600 220"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
      >
        <defs>
          <radialGradient id="welcome-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="520" cy="40" r="140" fill="url(#welcome-glow)" />
        <ellipse cx="500" cy="180" rx="220" ry="90" stroke="var(--border)" strokeWidth="1" fill="none" />
        <circle cx="470" cy="58" r="1.6" fill="var(--foreground)" fillOpacity="0.4" />
        <circle cx="512" cy="96" r="1.2" fill="var(--foreground)" fillOpacity="0.3" />
        <circle cx="555" cy="70" r="1.4" fill="var(--secondary)" fillOpacity="0.45" />
        <circle cx="440" cy="110" r="1" fill="var(--foreground)" fillOpacity="0.25" />
      </svg>

      <div className="relative max-w-[34rem]">
        <p className="text-label">Harbin Institute of Technology, Shenzhen</p>
        <h1 className="text-page-title mt-2 text-[1.625rem]">
          Welcome back, {name} <span className="text-primary">✦</span>
        </h1>
        <p className="text-secondary mt-2">
          Your academic journey is built one focused session at a time.
        </p>
        <p className="text-meta mt-4">{role}</p>
      </div>
    </section>
  );
}
