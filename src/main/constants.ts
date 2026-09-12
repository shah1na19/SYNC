import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Compass,
  LayoutDashboard,
  MessageCircleQuestionMark,
  Users,
} from "lucide-react";

export const APP_NAME = "SYNC";
export const APP_TAGLINE = "Academic collaboration for HITSZ CS";

export const CURRENT_USER = {
  name: "Alex Chen",
  role: "Year 3 · Computer Science",
  initials: "AC",
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const PRIMARY_NAV: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/rooms", label: "Study Rooms", icon: Users },
  { href: "/seniors", label: "Ask a Senior", icon: MessageCircleQuestionMark },
];

export const SECONDARY_NAV: NavItem[] = [
  { href: "/courses", label: "Courses", icon: BookOpen },
];

export const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Dashboard",
    description: "Your focused academic workspace.",
  },
  "/discover": {
    title: "Discover",
    description: "Find compatible study partners.",
  },
  "/match": {
    title: "Match",
    description: "Review compatibility and connect.",
  },
  "/rooms": {
    title: "Study Rooms",
    description: "Join a focused session and work together.",
  },
  "/seniors": {
    title: "Ask a Senior",
    description: "Get guidance from experienced students.",
  },
  "/courses": {
    title: "Courses",
    description: "Your academic context at HITSZ.",
  },
  "/settings": {
    title: "Settings",
    description: "Workspace preferences.",
  },
};

export function getPageMeta(pathname: string) {
  if (PAGE_META[pathname]) {
    return PAGE_META[pathname];
  }

  if (pathname.startsWith("/rooms/")) {
    return {
      title: "Study Room",
      description: "A focused session workspace.",
    };
  }

  return {
    title: APP_NAME,
    description: APP_TAGLINE,
  };
}

