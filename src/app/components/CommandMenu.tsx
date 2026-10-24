import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Wrench,
  FileText,
  Mail,
  Sun,
  Moon,
  ExternalLink,
  Download,
  Github,
  Phone,
  MessageSquare,
  X,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { PROFILE_DATA, VERIFIED_PROJECTS } from "../../lib/portfolioData";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommandItem {
  id: string;
  group: "Navigation" | "Featured Projects" | "Quick Actions & Connect";
  label: string;
  subtitle?: string;
  icon: React.ElementType;
  action: () => void;
  external?: boolean;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const items: CommandItem[] = useMemo(() => {
    const runNav = (path: string) => {
      navigate(path);
      onOpenChange(false);
    };

    const navItems: CommandItem[] = [
      {
        id: "nav-home",
        group: "Navigation",
        label: "Home",
        subtitle: "Overview, featured work, skills & testimonials",
        icon: Home,
        action: () => runNav("/"),
      },
      {
        id: "nav-about",
        group: "Navigation",
        label: "About",
        subtitle: "Biography, education, certifications & skills",
        icon: User,
        action: () => runNav("/about"),
      },
      {
        id: "nav-experience",
        group: "Navigation",
        label: "Experience",
        subtitle: "Professional timeline, leadership & IT consultancy",
        icon: Briefcase,
        action: () => runNav("/experience"),
      },
      {
        id: "nav-portfolio",
        group: "Navigation",
        label: "Projects / Portfolio",
        subtitle: "Explore 14+ live client & SaaS case studies",
        icon: FolderGit2,
        action: () => runNav("/portfolio"),
      },
      {
        id: "nav-services",
        group: "Navigation",
        label: "Services",
        subtitle: "Web development, POS & systems, branding",
        icon: Wrench,
        action: () => runNav("/services"),
      },
      {
        id: "nav-resume",
        group: "Navigation",
        label: "Resume / CV",
        subtitle: "Interactive resume & downloadable PDF",
        icon: FileText,
        action: () => runNav("/resume"),
      },
      {
        id: "nav-contact",
        group: "Navigation",
        label: "Contact",
        subtitle: "Send a message or book a consultation",
        icon: Mail,
        action: () => runNav("/contact"),
      },
    ];

    const projectItems: CommandItem[] = VERIFIED_PROJECTS.slice(0, 10).map((p) => ({
      id: `proj-${p.slug}`,
      group: "Featured Projects",
      label: p.title,
      subtitle: `${p.category} · ${p.technologies.slice(0, 3).join(", ")}`,
      icon: FolderGit2,
      action: () => runNav(`/portfolio/${p.slug}`),
    }));

    const quickItems: CommandItem[] = [
      {
        id: "act-theme",
        group: "Quick Actions & Connect",
        label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        subtitle: "Shortcut: Press T anywhere",
        icon: theme === "dark" ? Sun : Moon,
        action: () => {
          toggleTheme();
          onOpenChange(false);
        },
      },
      {
        id: "act-download-resume",
        group: "Quick Actions & Connect",
        label: "Download Resume PDF",
        subtitle: "Malish_Richard_Resume.pdf",
        icon: Download,
        external: true,
        action: () => {
          const link = document.createElement("a");
          link.href = PROFILE_DATA.resumeUrl;
          link.download = "Malish_Richard_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          onOpenChange(false);
        },
      },
      {
        id: "act-whatsapp",
        group: "Quick Actions & Connect",
        label: "Chat on WhatsApp",
        subtitle: PROFILE_DATA.contact.phone,
        icon: MessageSquare,
        external: true,
        action: () => {
          window.open(PROFILE_DATA.contact.whatsappUrl, "_blank", "noopener,noreferrer");
          onOpenChange(false);
        },
      },
      {
        id: "act-email",
        group: "Quick Actions & Connect",
        label: "Send Email",
        subtitle: PROFILE_DATA.contact.primaryEmail,
        icon: Mail,
        external: true,
        action: () => {
          window.location.href = `mailto:${PROFILE_DATA.contact.primaryEmail}`;
          onOpenChange(false);
        },
      },
      {
        id: "act-phone",
        group: "Quick Actions & Connect",
        label: "Call Malish Richard",
        subtitle: PROFILE_DATA.contact.phone,
        icon: Phone,
        external: true,
        action: () => {
          window.location.href = `tel:${PROFILE_DATA.contact.phoneRaw}`;
          onOpenChange(false);
        },
      },
      {
        id: "act-github",
        group: "Quick Actions & Connect",
        label: "GitHub Profile",
        subtitle: "github.com/POSbyRichie",
        icon: Github,
        external: true,
        action: () => {
          window.open(PROFILE_DATA.socials.github, "_blank", "noopener,noreferrer");
          onOpenChange(false);
        },
      },
    ];

    return [...navItems, ...projectItems, ...quickItems];
  }, [navigate, onOpenChange, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selectedIndex]?.action();
    }
  };

  if (!open) return null;

  const groups: CommandItem["group"][] = [
    "Navigation",
    "Featured Projects",
    "Quick Actions & Connect",
  ];

  let runningIdx = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 sm:pt-28"
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal Box */}
      <div
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search pages, projects, actions..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Close command palette"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No matching pages, projects, or actions found.
            </div>
          ) : (
            groups.map((groupName) => {
              const groupItems = filtered.filter((i) => i.group === groupName);
              if (groupItems.length === 0) return null;
              return (
                <div key={groupName} className="mb-2 last:mb-0">
                  <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {groupName}
                  </div>
                  <div className="space-y-0.5">
                    {groupItems.map((item) => {
                      runningIdx += 1;
                      const currentIdx = runningIdx;
                      const active = currentIdx === selectedIndex;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setSelectedIndex(currentIdx)}
                          onClick={item.action}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            active
                              ? "bg-secondary text-primary font-medium"
                              : "text-foreground hover:bg-secondary/60"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`flex size-8 shrink-0 items-center justify-center rounded-md border ${
                                active
                                  ? "border-primary/30 bg-primary/10 text-primary"
                                  : "border-border bg-background text-muted-foreground"
                              }`}
                            >
                              <Icon className="size-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="truncate">{item.label}</div>
                              {item.subtitle && (
                                <div className="truncate text-xs text-muted-foreground font-normal">
                                  {item.subtitle}
                                </div>
                              )}
                            </div>
                          </div>
                          {item.external ? (
                            <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                          ) : (
                            <ArrowRight
                              className={`size-3.5 shrink-0 transition-transform ${
                                active ? "translate-x-0.5 text-primary" : "text-muted-foreground/50"
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                ↵
              </kbd>{" "}
              Select
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                Esc
              </kbd>{" "}
              Close
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1">
            Press{" "}
            <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
              T
            </kbd>{" "}
            for theme
          </span>
        </div>
      </div>
    </div>
  );
}
