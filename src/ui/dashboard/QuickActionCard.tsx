import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type QuickActionCardProps = {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
};

export function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
  actionLabel,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="interactive surface-card group relative flex flex-col gap-3 p-4 hover:border-primary/30 hover:shadow-[0_0_0_1px_var(--ring),0_16px_32px_rgba(0,0,0,0.32)]"
    >
      <div
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary transition-colors duration-150 group-hover:bg-primary/15"
      >
        <Icon size={17} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <h3 className="text-card-title">{title}</h3>
        <p className="text-secondary mt-1 leading-snug">{description}</p>
      </div>

      <div className="mt-auto flex items-center gap-1 pt-1 text-[13px] font-medium text-primary">
        {actionLabel}
        <ArrowRight
          size={14}
          strokeWidth={2}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
