import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  FileText,
  Download,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTheme } from "./ThemeProvider";
import { PROFILE_DATA } from "../../lib/portfolioData";

interface NavbarProps {
  onOpenCommandMenu?: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ onOpenCommandMenu }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY && currentY > 120 && !menuOpen) {
        setHiddenOnScroll(true);
      } else {
        setHiddenOnScroll(false);
      }
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href === "/portfolio") {
      return (
        location.pathname.startsWith("/portfolio") ||
        location.pathname.startsWith("/projects")
      );
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`no-print fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2 rounded-xl px-4 py-2.5 transition-all duration-300 ${
          hiddenOnScroll ? "-translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        } ${
          scrolled
            ? "border border-border bg-background/85 shadow-sm backdrop-blur-md dark:bg-card/80"
            : "border border-border/60 bg-background/70 backdrop-blur-xs dark:bg-background/60"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left: Brand Identity */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold tracking-tight text-primary-foreground shadow-xs transition-transform group-hover:scale-105">
              MR
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg leading-tight">
                {PROFILE_DATA.name}
              </span>
              <span className="hidden sm:inline text-[10px] font-medium tracking-wider text-muted-foreground uppercase leading-none">
                {PROFILE_DATA.brand}
              </span>
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "bg-secondary text-primary font-semibold"
                      : "text-muted-foreground font-medium hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search Cmd+K, Theme Toggle, Resume CTA, Mobile Menu) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {onOpenCommandMenu && (
              <button
                type="button"
                onClick={onOpenCommandMenu}
                aria-label="Open command palette"
                title="Search & Quick Actions (Ctrl+K / ⌘K)"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground shadow-2xs transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Search className="size-3.5" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode (Shortcut: T)`}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-2xs transition-colors hover:bg-secondary hover:text-primary"
            >
              {theme === "dark" ? (
                <Sun className="size-4 transition-transform duration-200" />
              ) : (
                <Moon className="size-4 transition-transform duration-200" />
              )}
            </button>

            {/* Desktop Resume Button */}
            <a
              href={PROFILE_DATA.resumeUrl}
              download="Malish_Richard_Resume.pdf"
              className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3.5 text-xs font-medium text-primary-foreground shadow-2xs transition-all hover:bg-primary/90"
            >
              <Download className="size-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="no-print fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="no-print fixed top-[4.75rem] right-4 left-4 z-50 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-xl lg:hidden"
            >
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => {
                        navigate(link.href);
                        setMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors ${
                        active
                          ? "bg-secondary text-primary font-semibold"
                          : "text-foreground font-medium hover:bg-secondary/60"
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && (
                        <span className="size-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/resume");
                    setMenuOpen(false);
                  }}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <FileText className="size-3.5 text-primary" />
                  View Resume
                </button>
                <a
                  href={PROFILE_DATA.resumeUrl}
                  download="Malish_Richard_Resume.pdf"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Download className="size-3.5" />
                  Download PDF
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
