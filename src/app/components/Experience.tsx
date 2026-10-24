import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Briefcase,
  Calendar,
  MapPin,
  ArrowRight,
  ExternalLink,
  Download,
  FileText,
} from "lucide-react";
import {
  EXPERIENCE_TIMELINE,
  PROFILE_DATA,
  type ExperienceItem,
} from "../../lib/portfolioData";

const TABS: { id: "all" | ExperienceItem["category"]; label: string }[] = [
  { id: "all", label: "All Experience" },
  { id: "development", label: "Full-Stack & Portals" },
  { id: "systems", label: "Systems & IT" },
  { id: "education", label: "Academic & AI" },
];

export function Experience() {
  const [activeTab, setActiveTab] = useState<"all" | ExperienceItem["category"]>(
    "all"
  );

  const filtered =
    activeTab === "all"
      ? EXPERIENCE_TIMELINE
      : EXPERIENCE_TIMELINE.filter((item) => item.category === activeTab);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex flex-col items-center text-center"
      >
        <span className="mb-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          Career &amp; Engineering Journey
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Experience
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          My work delivering full-stack web applications, commercial SaaS tools, institutional school portals, and IT infrastructure through Richie Digital Solutions.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="mb-12 flex justify-center">
        <div
          role="tablist"
          aria-label="Filter experience by category"
          className="inline-flex flex-wrap justify-center gap-1.5 rounded-xl border border-border bg-muted/60 p-1.5"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all sm:text-sm ${
                  active
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Alternating Vertical Timeline (modeled on achyutkatiyar.com/experience) */}
      <div className="relative mx-auto max-w-4xl">
        {/* Vertical Spine */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[15px] w-[2px] bg-border md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-12">
          {filtered.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10"
              >
                {/* Timeline Dot */}
                <div
                  aria-hidden="true"
                  className="absolute top-6 left-[15px] z-10 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-primary bg-background shadow-xs md:left-1/2"
                />

                {/* Card Column */}
                <div
                  className={`pl-10 md:pl-0 ${
                    isEven
                      ? "md:col-start-1 md:pr-6"
                      : "md:col-start-2 md:pl-6"
                  }`}
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xs transition-colors hover:border-primary/60">
                    {/* Header */}
                    <div className="space-y-1.5">
                      <span className="inline-block rounded-md bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                        {item.type}
                      </span>
                      <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Briefcase className="size-3.5 shrink-0" />
                        <span>{item.organization}</span>
                      </div>
                    </div>

                    {/* Date & Location */}
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 font-medium">
                        <Calendar className="size-3 text-primary" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5 text-primary" />
                        {item.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="my-4 h-px w-full bg-border" />

                    {/* Key Contributions */}
                    <div>
                      <h3 className="mb-2.5 text-xs font-semibold tracking-wider text-foreground uppercase">
                        Key Contributions:
                      </h3>
                      <ul className="space-y-2 text-xs text-muted-foreground sm:text-sm">
                        {item.highlights.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <ArrowRight className="mt-1 size-3.5 shrink-0 text-primary" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {item.link && (
                      <div className="mt-4 pt-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          <span>Visit {item.organization}</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Resume CTA */}
      <div className="mt-16 rounded-xl border border-border bg-card p-6 text-center shadow-2xs sm:p-8">
        <h2 className="font-display text-xl font-bold text-foreground">
          Want the complete overview?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          View my interactive resume on-page or download a clean PDF copy for your records.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/resume"
            className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <FileText className="size-4" />
            <span>View Interactive Resume</span>
          </Link>
          <a
            href={PROFILE_DATA.resumeUrl}
            download="Malish_Richard_Resume.pdf"
            className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary hover:text-primary"
          >
            <Download className="size-4 text-primary" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
