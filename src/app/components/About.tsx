import { motion } from "motion/react";
import { Link } from "react-router";
import {
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Phone,
  Download,
  FileText,
  ArrowRight,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import profilePhoto from "../../imports/WhatsApp_Image_2026-02-21_at_12.04.09__1_.jpeg";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  PROFILE_DATA,
  SKILL_CATEGORIES,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
} from "../../lib/portfolioData";

export function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <div className="space-y-16">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3 text-center"
        >
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
            {PROFILE_DATA.brand}
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            About Me
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            {PROFILE_DATA.shortBio}
          </p>
        </motion.div>

        {/* Who I Am Card (modeled on achyutkatiyar.com/about) */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-xl border border-border bg-card p-6 shadow-2xs sm:p-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:items-start">
            {/* Portrait & Quick Facts */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative mb-4 aspect-square w-44 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm sm:w-52 lg:w-full">
                <ImageWithFallback
                  src={profilePhoto}
                  alt={PROFILE_DATA.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <h2 className="font-display text-lg font-bold text-foreground">
                {PROFILE_DATA.name}
              </h2>
              <p className="text-xs font-semibold text-primary">
                {PROFILE_DATA.headline}
              </p>

              <div className="mt-4 w-full space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <MapPin className="size-3.5 text-primary shrink-0" />
                  <span>{PROFILE_DATA.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Phone className="size-3.5 text-primary shrink-0" />
                  <a
                    href={`tel:${PROFILE_DATA.contact.phoneRaw}`}
                    className="hover:text-primary transition-colors"
                  >
                    {PROFILE_DATA.contact.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Mail className="size-3.5 text-primary shrink-0" />
                  <a
                    href={`mailto:${PROFILE_DATA.contact.primaryEmail}`}
                    className="truncate hover:text-primary transition-colors"
                  >
                    {PROFILE_DATA.contact.primaryEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Biography Copy */}
            <div className="space-y-4">
              <div className="border-b border-border pb-3">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Who I Am
                </h2>
                <p className="text-sm text-muted-foreground">
                  Full-Stack Engineer, Systems Specialist &amp; Founder of Richie Digital Solutions
                </p>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {PROFILE_DATA.aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link
                  to="/resume"
                  className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
                >
                  <FileText className="size-4" />
                  <span>View Interactive Resume</span>
                </Link>
                <a
                  href={PROFILE_DATA.resumeUrl}
                  download="Malish_Richard_Resume.pdf"
                  className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-xs transition-all hover:border-primary hover:text-primary"
                >
                  <Download className="size-4 text-primary" />
                  <span>Download Resume PDF</span>
                </a>
                <Link
                  to="/portfolio"
                  className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technical Skills Grid (modeled on achyutkatiyar.com/about) */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Technical Skills
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Categorized tools and technologies used across my full-stack, systems, and branding work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-2xs transition-colors hover:border-primary/50"
              >
                <h3 className="text-xs font-semibold tracking-wider text-primary uppercase">
                  {category.label}
                </h3>
                <p className="mt-1 mb-4 text-xs text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Education
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Academic background in Artificial Intelligence Engineering and secondary sciences.
            </p>
          </div>

          <div className="space-y-4">
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="rounded-xl border border-border bg-card p-6 shadow-2xs transition-colors hover:border-primary/50"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <GraduationCap className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-primary">
                        {edu.institution} · {edu.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:self-start">
                    <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
                      {edu.period}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {edu.description}
                </p>

                {edu.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    {edu.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Certifications & Credentials */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Professional Certifications
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Industry credentials across cloud architecture, full-stack software engineering, and modern frontend development.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-2xs transition-colors hover:border-primary/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                        <Award className="size-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-semibold text-foreground">
                          {cert.title}
                        </h3>
                        <p className="text-xs font-medium text-primary">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {cert.year}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {cert.focus}
                  </p>
                </div>
                <div className="mt-3 border-t border-border pt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Domain: {cert.category}</span>
                  <span className="font-medium text-primary">Completed {cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements & Milestones */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Impact &amp; Achievements
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Key milestones delivered through Richie Digital Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1.5">
                <Briefcase className="size-4" />
                <span>35+ Production Projects Delivered</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Successfully designed, built, and launched over 35 websites, SaaS tools, e-commerce platforms, and institutional portals across Uganda and internationally.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1.5">
                <CheckCircle2 className="size-4" />
                <span>Commercial SaaS Products in Active Use</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Creator of POS by Richie (posbyrichie.online) for retail sales and inventory management and QR By Richie (qrbyrichie.online) for instant QR code generation.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1.5">
                <GraduationCap className="size-4" />
                <span>4,000+ Students &amp; Families Served via School Portals</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Built official digital portals and campus IT systems for St. Peter&apos;s High School Hoima, Mandela Secondary School Hoima, and Light Junior School.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1.5">
                <Award className="size-4" />
                <span>NGO &amp; Social Enterprise Digital Partner</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Amplified the global reach of grassroots organizations including IGRAO Africa and BSF Mixed Ventures Ltd in Kyangwali Refugee Settlement.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
