import { Link } from "react-router";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  FileText,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { PROFILE_DATA } from "../../lib/portfolioData";

interface FooterProps {
  onOpenCommandMenu?: () => void;
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ onOpenCommandMenu }: FooterProps) {
  return (
    <footer className="no-print border-t border-border bg-background/80 backdrop-blur-xs">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                MR
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                {PROFILE_DATA.name}
              </span>
            </Link>
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">
              {PROFILE_DATA.brand}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Full-Stack Developer, AI Engineering student, and Digital Solutions Specialist building reliable web applications, POS software, and institutional platforms.
            </p>
            <div className="pt-1 text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-primary shrink-0" />
                <span>{PROFILE_DATA.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-primary shrink-0" />
                <a
                  href={`tel:${PROFILE_DATA.contact.phoneRaw}`}
                  className="hover:text-primary transition-colors"
                >
                  {PROFILE_DATA.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-primary shrink-0" />
                <a
                  href={`mailto:${PROFILE_DATA.contact.primaryEmail}`}
                  className="hover:text-primary transition-colors"
                >
                  {PROFILE_DATA.contact.primaryEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Direct Channels */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub (POSbyRichie)"
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="size-4" />
              </a>
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={`mailto:${PROFILE_DATA.contact.primaryEmail}`}
                aria-label="Email Malish Richard"
                title={PROFILE_DATA.contact.primaryEmail}
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="size-4" />
              </a>
              <a
                href={PROFILE_DATA.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
              >
                <MessageSquare className="size-4" />
              </a>
              <a
                href={PROFILE_DATA.resumeUrl}
                download="Malish_Richard_Resume.pdf"
                aria-label="Download Resume PDF"
                title="Download Resume PDF"
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
              >
                <FileText className="size-4" />
              </a>
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">
                Business Inquiries:
              </p>
              <a
                href={`mailto:${PROFILE_DATA.contact.businessEmail}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {PROFILE_DATA.contact.businessEmail}
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          {/* Column 4: Keyboard Shortcuts & Resume */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              Keyboard Shortcuts
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <button
                type="button"
                onClick={onOpenCommandMenu}
                className="flex items-center gap-2 hover:text-primary transition-colors text-left"
              >
                <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
                <span>Search &amp; Command Menu</span>
              </button>
              <div className="flex items-center gap-2">
                <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  T
                </kbd>
                <span>Toggle Light / Dark Theme</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/resume"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-xs font-medium text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
              >
                <FileText className="size-3.5 text-primary" />
                View Interactive Resume
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {PROFILE_DATA.name} ({PROFILE_DATA.brand}). All rights reserved.
          </p>
          <p>
            Built with React, TypeScript, Tailwind CSS &amp; Supabase ·{" "}
            <a
              href="https://www.codewithrichie.online"
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              codewithrichie.online
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
