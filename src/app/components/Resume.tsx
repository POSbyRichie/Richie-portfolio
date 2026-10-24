import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import {
  PROFILE_DATA,
  EDUCATION_DATA,
  SKILL_CATEGORIES,
  EXPERIENCE_TIMELINE,
  VERIFIED_PROJECTS,
  CERTIFICATIONS_DATA,
} from "../../lib/portfolioData";

export function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      {/* Top Action Bar (Hidden when printing) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="no-print mb-8 flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-2xs sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Back to Home"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="font-display text-base font-bold text-foreground sm:text-lg">
              Curriculum Vitae &amp; Technical Resume
            </h1>
            <p className="text-xs text-muted-foreground">
              {PROFILE_DATA.name} · {PROFILE_DATA.brand}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3.5 text-xs font-medium text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
          >
            <Printer className="size-3.5 text-primary" />
            <span>Print / Save as PDF</span>
          </button>

          <a
            href={PROFILE_DATA.resumeUrl}
            download="Malish_Richard_Resume.pdf"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <Download className="size-3.5" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </motion.div>

      {/* Clean Single-Column Engineering Resume Document */}
      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="print-only-sheet rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-10 md:p-12"
      >
        {/* 1. Resume Header */}
        <header className="border-b-2 border-foreground/85 pb-5 text-center sm:text-left">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {PROFILE_DATA.name.toUpperCase()}
              </h2>
              <p className="mt-1 text-sm font-semibold text-primary">
                {PROFILE_DATA.headline} · Founder, {PROFILE_DATA.brand}
              </p>
            </div>
            <div className="text-xs text-muted-foreground sm:text-right space-y-0.5">
              <div className="flex items-center justify-center gap-1.5 sm:justify-end">
                <MapPin className="size-3 text-primary" />
                <span>{PROFILE_DATA.location}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:justify-end">
                <Phone className="size-3 text-primary" />
                <a
                  href={`tel:${PROFILE_DATA.contact.phoneRaw}`}
                  className="hover:text-primary"
                >
                  {PROFILE_DATA.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Links Row */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground sm:justify-start">
            <a
              href={`mailto:${PROFILE_DATA.contact.primaryEmail}`}
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              <Mail className="size-3 text-primary" />
              <span>{PROFILE_DATA.contact.primaryEmail}</span>
            </a>
            <span className="text-border">|</span>
            <a
              href={`mailto:${PROFILE_DATA.contact.businessEmail}`}
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              <Mail className="size-3 text-primary" />
              <span>{PROFILE_DATA.contact.businessEmail}</span>
            </a>
            <span className="text-border">|</span>
            <a
              href={PROFILE_DATA.domain}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              <Globe className="size-3 text-primary" />
              <span>codewithrichie.online</span>
            </a>
            <span className="text-border">|</span>
            <a
              href={PROFILE_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              <Github className="size-3 text-primary" />
              <span>github.com/POSbyRichie</span>
            </a>
          </div>
        </header>

        {/* 2. Professional Summary */}
        <section className="mt-6">
          <h3 className="border-b border-border pb-1 font-display text-xs font-bold tracking-wider text-primary uppercase">
            Professional Summary
          </h3>
          <p className="mt-2.5 text-xs leading-relaxed text-foreground/90 sm:text-sm">
            Multi-skilled Full-Stack Developer, Systems Specialist, and AI Engineering student based in Kampala, Uganda, with 3+ years of hands-on experience designing, building, and deploying 35+ production websites, commercial SaaS tools, Point-of-Sale (POS) systems, multi-vendor e-commerce platforms, and institutional school portals through{" "}
            <strong>Richie Digital Solutions (CodeWithRichie)</strong>. Proven ability to bridge modern web engineering (React, Next.js, TypeScript, Node.js, Supabase, PostgreSQL, MongoDB, WordPress) with on-site IT infrastructure, database administration, and visual brand identity.
          </p>
        </section>

        {/* 3. Education */}
        <section className="mt-6">
          <h3 className="border-b border-border pb-1 font-display text-xs font-bold tracking-wider text-primary uppercase">
            Education
          </h3>
          <div className="mt-3 space-y-3">
            {EDUCATION_DATA.map((edu) => (
              <div key={edu.id} className="text-xs sm:text-sm">
                <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                  <span className="font-semibold text-foreground">
                    {edu.degree} —{" "}
                    <span className="font-normal text-muted-foreground">
                      {edu.institution}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-primary shrink-0">
                    {edu.period} · {edu.location}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Technical Skills */}
        <section className="mt-6">
          <h3 className="border-b border-border pb-1 font-display text-xs font-bold tracking-wider text-primary uppercase">
            Technical Skills
          </h3>
          <div className="mt-3 space-y-1.5 text-xs sm:text-sm">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.id} className="leading-relaxed">
                <strong className="font-semibold text-foreground">
                  {cat.label}:
                </strong>{" "}
                <span className="text-muted-foreground">
                  {cat.skills.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Professional Experience */}
        <section className="mt-6">
          <h3 className="border-b border-border pb-1 font-display text-xs font-bold tracking-wider text-primary uppercase">
            Professional Experience
          </h3>
          <div className="mt-3 space-y-5">
            {EXPERIENCE_TIMELINE.filter((e) => e.category !== "education").map(
              (exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {exp.title}
                      </h4>
                      <p className="text-xs font-medium text-primary">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
                    {exp.highlights.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </section>

        {/* 6. Selected Production Projects */}
        <section className="mt-6">
          <h3 className="border-b border-border pb-1 font-display text-xs font-bold tracking-wider text-primary uppercase">
            Selected Production Projects (35+ Delivered)
          </h3>
          <div className="mt-3 space-y-4">
            {VERIFIED_PROJECTS.slice(0, 8).map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xs font-bold text-foreground sm:text-sm">
                      {proj.title}
                    </h4>
                    <span className="text-[11px] text-muted-foreground">
                      [{proj.technologies.slice(0, 5).join(", ")}]
                    </span>
                  </div>
                  {proj.live_url && (
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                    >
                      <span>{proj.live_url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                      <ExternalLink className="size-2.5" />
                    </a>
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {proj.short_description}
                </p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-muted-foreground">
                  {proj.highlights.slice(0, 2).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Professional Certifications */}
        <section className="mt-6">
          <h3 className="border-b border-border pb-1 font-display text-xs font-bold tracking-wider text-primary uppercase">
            Professional Certifications
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div
                key={cert.id}
                className="flex items-baseline justify-between gap-2 rounded border border-border/60 bg-background/50 px-3 py-1.5"
              >
                <div>
                  <span className="font-semibold text-foreground">
                    {cert.title}
                  </span>{" "}
                  <span className="text-muted-foreground">({cert.issuer})</span>
                </div>
                <span className="shrink-0 font-mono text-[11px] font-semibold text-primary">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </section>
      </motion.article>
    </div>
  );
}
