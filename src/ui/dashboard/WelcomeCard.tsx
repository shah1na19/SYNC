import Image from "next/image";

type WelcomeCardProps = {
  name: string;
  role: string;
};

export function WelcomeCard({ name, role }: WelcomeCardProps) {
  return (
    <section
      aria-labelledby="welcome-title"
      className="group relative isolate min-h-[174px] overflow-hidden rounded-2xl border border-white/10 bg-[#071329] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      {/* Galaxy background */}
      <Image
        src="/assets/backgrounds/dashboard-space.svg"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-95 transition-transform duration-[12000ms] ease-out group-hover:scale-[1.015]"
      />

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,12,29,0.96)_0%,rgba(4,15,37,0.82)_42%,rgba(4,15,37,0.28)_72%,rgba(4,12,29,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,9,22,0.42),transparent_55%)]" />

      {/* Atmospheric glow */}
      <div
        aria-hidden
        className="absolute -right-16 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div className="relative flex min-h-[174px] items-center px-6 py-6 sm:px-7">
        <div className="max-w-[570px]">
          {/* Institution */}
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium tracking-wide text-cyan-100/80">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
            </span>

            <span>Harbin Institute of Technology, Shenzhen</span>
          </div>

          {/* Main greeting */}
          <h1
            id="welcome-title"
            className="text-2xl font-semibold tracking-[-0.025em] text-white sm:text-[28px]"
          >
            Welcome back, {name}
            <span className="ml-2 text-cyan-300">✦</span>
          </h1>

          {/* Product message */}
          <p className="mt-2 text-sm font-medium text-cyan-100/90">
            Same sky, same dream.
          </p>

          <p className="mt-1 text-[13px] leading-relaxed text-slate-300/90">
            Let&apos;s make your academic journey more connected.
          </p>

          {/* Small contextual metadata */}
          <div className="mt-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400/80">
            <span>{role}</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/50" />
            <span>Study • Connect • Grow</span>
          </div>
        </div>
      </div>

      {/* Fine border highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent"
      />
    </section>
  );
}
