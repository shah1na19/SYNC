import type { ReactNode } from "react";
import { Sidebar } from "@/ui/layout/Sidebar";
import { Topbar } from "@/ui/layout/Topbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <div className="galaxy-atmosphere" aria-hidden />
      <div className="galaxy-stars" aria-hidden />
      <div className="app-shell flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col bg-background/40">
          <Topbar />
          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1120px] px-5 py-6 lg:px-8 lg:py-7">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
