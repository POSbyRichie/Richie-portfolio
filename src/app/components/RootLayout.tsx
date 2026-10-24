import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { motion, useScroll, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowUp,
  MessageSquare,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { ThemeProvider } from "./ThemeProvider";
import { CommandMenu } from "./CommandMenu";
import { PROFILE_DATA } from "../../lib/portfolioData";

const ROUTE_TITLES: Record<string, string> = {
  "/": "Malish Richard | Full-Stack Developer & Digital Solutions Specialist — Richie Digital Solutions",
  "/about": "About Malish Richard | Full-Stack Developer, Education & Certifications",
  "/experience": "Experience & Project Timeline | Malish Richard — Richie Digital Solutions",
  "/portfolio": "Projects & Case Studies | Malish Richard — CodeWithRichie",
  "/projects": "Projects & Case Studies | Malish Richard — CodeWithRichie",
  "/services": "Services | Web Development, Systems & Branding — Richie Digital Solutions",
  "/resume": "Resume / CV | Malish Richard — Full-Stack Developer",
  "/testimonials": "Client Recommendations & Testimonials | Malish Richard",
  "/contact": "Contact Malish Richard | Richie Digital Solutions — Kampala, Uganda",
};

export function RootLayout() {
  const { scrollYProgress } = useScroll();
  const [commandOpen, setCommandOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const title =
      ROUTE_TITLES[location.pathname] ||
      "Malish Richard | Richie Digital Solutions — CodeWithRichie";
    document.title = title;
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ThemeProvider>
      <div className="relative flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
        {/* Top Scroll Progress Bar */}
        <motion.div
          className="no-print fixed top-0 right-0 left-0 z-[60] h-1 origin-left bg-primary"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Header Navigation */}
        <Navbar onOpenCommandMenu={() => setCommandOpen(true)} />

        {/* Command Palette Modal (Cmd+K / Ctrl+K) */}
        <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

        {/* Floating Right-Edge Social/Contact Shortcuts (per katiyardesign.md.txt & achyutkatiyar.com) */}
        <div
          aria-label="Quick social and contact links"
          className="no-print fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        >
          <a
            href={PROFILE_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub — POSbyRichie"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
          >
            <Github className="size-4" />
          </a>
          <a
            href={PROFILE_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${PROFILE_DATA.contact.primaryEmail}`}
            aria-label="Email Malish Richard"
            title={`Email: ${PROFILE_DATA.contact.primaryEmail}`}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={PROFILE_DATA.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title={`WhatsApp: ${PROFILE_DATA.contact.phone}`}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
          >
            <MessageSquare className="size-4" />
          </a>
          <a
            href={PROFILE_DATA.resumeUrl}
            download="Malish_Richard_Resume.pdf"
            aria-label="Download Resume PDF"
            title="Download Resume (PDF)"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
          >
            <FileText className="size-4" />
          </a>
          <div className="mt-2 h-16 w-px bg-border" />
        </div>

        {/* Main Content */}
        <main className="flex-1 pt-20">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer onOpenCommandMenu={() => setCommandOpen(true)} />

        {/* Bottom-Left WhatsApp Quick Chat */}
        <WhatsAppButton />

        {/* Bottom-Right Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              className="no-print fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              <ArrowUp className="size-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
