"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { CURRENT_USER, getPageMeta } from "@/main/constants";

export function Topbar() {
  const pathname = usePathname();
  const meta = getPageMeta(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-surface/55 px-5 lg:px-7">
      <div className="min-w-0 flex-1">
        <p className="text-label">{meta.title}</p>
        <p className="truncate text-[13px] text-muted-foreground">{meta.description}</p>
      </div>

      <label className="relative hidden min-w-[240px] max-w-[320px] flex-1 md:block">
        <span className="sr-only">Search workspace</span>
        <Search
          size={14}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          placeholder="Search workspace"
          autoComplete="off"
          className="interactive h-9 w-full rounded-[var(--radius-md)] border border-border bg-background/70 pr-3 pl-9 text-[13px] text-foreground placeholder:text-muted-foreground/80"
        />
      </label>

      <button
        type="button"
        aria-label="Notifications"
        className="interactive flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-border bg-background/50 text-muted-foreground hover:text-foreground"
      >
        <Bell size={16} strokeWidth={1.7} />
      </button>

      <div className="flex items-center gap-2">
        <div
          aria-hidden
          className="flex h-8 w-8 items-center justify-center rounded-full bg-elevated text-[11px] font-medium ring-1 ring-border"
        >
          {CURRENT_USER.initials}
        </div>
      </div>
    </header>
  );
}

