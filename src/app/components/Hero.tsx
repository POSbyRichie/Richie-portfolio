import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router";
import profilePhoto from "../../imports/WhatsApp_Image_2026-02-21_at_12.04.09__1_.jpeg";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PROFILE_DATA } from "../../lib/portfolioData";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = PROFILE_DATA.rotatingRoles;

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100dvh-5rem)] w-full items-center justify-center overflow-hidden py-12 md:py-20"
    >
      {/* Subtle restrained ambient background grid & radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          style={{
            background: "radial-gradient(circle, rgba(101, 77, 182, 0.12) 0%, transparent 70%)",
          }}
        />
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px] lg:gap-12 xl:grid-cols-[1fr_440px]">
          {/* Left Column: Identity, Role Ticker, Summary, CTAs, Social Shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-2xs">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{PROFILE_DATA.availability}</span>
              <span className="hidden sm:inline text-border">·</span>
              <span className="hidden sm:inline font-semibold text-primary">
                {PROFILE_DATA.brand}
              </span>
            </div>

            {/* Headline & Rotating Role */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-[60px] xl:leading-[60px]">
                Hi, I&apos;m {PROFILE_DATA.name}
              </h1>

              <div className="relative h-10 sm:h-11 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="font-display text-xl font-semibold text-primary sm:text-2xl md:text-3xl"
                  >
                    {roles[roleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="max-w-[600px] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-[20px] md:leading-[28px]">
                {PROFILE_DATA.heroSummary}
              </p>
            </div>

            {/* Primary & Secondary Action Buttons (matching katiyardesign.md.txt specs) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/portfolio"
                className="group inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/resume"
                className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-xs transition-all hover:bg-secondary hover:text-secondary-foreground"
              >
                <FileText className="size-4 text-primary" />
                <span>View My Resume</span>
              </Link>

              <a
                href={PROFILE_DATA.resumeUrl}
                download="Malish_Richard_Resume.pdf"
                className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-xs transition-all hover:border-primary hover:text-primary"
                title="Download Resume PDF"
              >
                <Download className="size-4 text-primary" />
                <span>Download PDF</span>
              </a>
            </div>

            {/* Circular Social / Contact Icon Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub — POSbyRichie"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xs transition-all hover:border-primary hover:bg-secondary hover:text-primary"
              >
                <Github className="size-4" />
              </a>
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xs transition-all hover:border-primary hover:bg-secondary hover:text-primary"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={`mailto:${PROFILE_DATA.contact.primaryEmail}`}
                aria-label="Email Malish Richard"
                title={PROFILE_DATA.contact.primaryEmail}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xs transition-all hover:border-primary hover:bg-secondary hover:text-primary"
              >
                <Mail className="size-4" />
              </a>
              <a
                href={PROFILE_DATA.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xs transition-all hover:border-primary hover:bg-secondary hover:text-primary"
              >
                <MessageSquare className="size-4" />
              </a>
              <a
                href={`tel:${PROFILE_DATA.contact.phoneRaw}`}
                aria-label="Call Malish Richard"
                title={PROFILE_DATA.contact.phone}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-2xs transition-all hover:border-primary hover:bg-secondary hover:text-primary"
              >
                <Phone className="size-4" />
              </a>
              <Link
                to="/contact"
                className="ml-2 text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Contact Me →
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Circular Hero Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[380px] xl:max-w-[420px]">
              {/* Subtle outer ring */}
              <div className="absolute -inset-2 rounded-full border border-primary/15 bg-primary/5" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-primary/25 bg-card shadow-xl">
                <ImageWithFallback
                  src={profilePhoto}
                  alt="Malish Richard — Full-Stack Developer & Founder of Richie Digital Solutions"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
