"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import {
  APP_NAME,
  APP_TAGLINE,
  CURRENT_USER,
  PRIMARY_NAV,
  SECONDARY_NAV,
  type NavItem,
} from "@/main/constants";
import { cn } from "@/ui/cn";

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const Icon = item.icon;
  const active =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "interactive group relative flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-1.5 text-[13px]",
        active
          ? "bg-primary/10 text-foreground"
          : "text-muted-foreground hover:bg-white/[0.035] hover:text-foreground",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-full transition-opacity duration-150",
          active ? "bg-primary opacity-100 shadow-[0_0_10px_var(--glow)]" : "opacity-0",
        )}
      />
      <Icon
        size={16}
        strokeWidth={active ? 2.1 : 1.7}
        className={cn(active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}
      />
      <span>{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col border-r border-border bg-surface/80">
      <div className="flex items-center gap-3 px-4 py-4">
        <div
          aria-hidden
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-primary/12 text-[11px] font-semibold tracking-[0.14em] text-primary shadow-[0_0_24px_var(--glow)]"
        >
          SY
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold tracking-[0.18em] text-foreground">{APP_NAME}</p>
          <p className="truncate text-[11px] text-muted-foreground">{APP_TAGLINE}</p>
        </div>
      </div>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-6 px-3 pb-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-label px-2.5 pb-2">Workspace</p>
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-label px-2.5 pb-2">Academic</p>
          {SECONDARY_NAV.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </nav>

      <div className="mt-auto border-t border-border px-3 py-3">
        <Link
          href="/settings"
          className="interactive mb-1 flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-1.5 text-[13px] text-muted-foreground hover:bg-white/[0.035] hover:text-foreground"
        >
          <Settings size={16} strokeWidth={1.7} />
          Settings
        </Link>
        <div className="flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2">
          <div
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-full bg-elevated text-[11px] font-medium text-foreground ring-1 ring-border"
          >
            {CURRENT_USER.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] text-foreground">{CURRENT_USER.name}</p>
            <p className="truncate text-[11px] text-muted-foreground">{CURRENT_USER.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

