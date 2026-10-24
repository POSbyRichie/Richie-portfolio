import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Quote,
  Award,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Download,
  FileText,
  Mail,
  MessageSquare,
  Layers,
  Code2,
  Server,
  Palette,
} from "lucide-react";
import { Hero } from "./Hero";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getPublishedProjects } from "../../lib/projectService";
import {
  PROFILE_DATA,
  VERIFIED_PROJECTS,
  SKILL_CATEGORIES,
  EXPERIENCE_TIMELINE,
  CERTIFICATIONS_DATA,
  SERVICES_CATALOG,
  TESTIMONIALS_DATA,
  enrichProject,
  type PortfolioProject,
} from "../../lib/portfolioData";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  web: Code2,
  systems: Server,
  graphics: Palette,
};

export function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProject[]>(
    VERIFIED_PROJECTS.slice(0, 6)
  );
  const [activeSkillTab, setActiveSkillTab] = useState<string>(
    SKILL_CATEGORIES[0].id
  );

  useEffect(() => {
    getPublishedProjects()
      .then((data) => {
        if (data && data.length > 0) {
          const enriched = data.map(enrichProject);
          const featured = enriched.filter((p) => p.featured);
          setFeaturedProjects(
            (featured.length >= 3 ? featured : enriched).slice(0, 6)
          );
        }
      })
      .catch(() => {
        // Fallback to VERIFIED_PROJECTS already set
      });
  }, []);

  const currentSkillCategory =
    SKILL_CATEGORIES.find((c) => c.id === activeSkillTab) ||
    SKILL_CATEGORIES[0];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Key Milestones & Credibility Bar */}
      <section className="border-y border-border bg-card/60 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {PROFILE_DATA.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="flex flex-col items-start rounded-lg border border-border bg-background p-4 shadow-2xs"
              >
                <span className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm font-semibold text-foreground">
                  {stat.label}
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  {stat.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Section (modeled on achyutkatiyar.com) */}
      <section id="featured-projects" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="mb-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
              Selected Case Studies
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[46px] md:leading-[55px]">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Production web applications, Point-of-Sale systems, institutional portals, and e-commerce platforms engineered for real organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, idx) => {
              const visibleTech = project.technologies.slice(0, 4);
              const extraTechCount = Math.max(
                0,
                project.technologies.length - visibleTech.length
              );

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07, duration: 0.4 }}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xs transition-all duration-200 hover:border-primary hover:shadow-md"
                >
                  {/* Aspect-Video Preview Image */}
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted"
                  >
                    {project.featured_image ? (
                      <ImageWithFallback
                        src={project.featured_image}
                        alt={project.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Layers className="size-8 opacity-40" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-md border border-border/80 bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-xs">
                        {project.category}
                      </span>
                    </div>
                  </Link>

                  {/* Card Header */}
                  <div className="px-5 pt-5 pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/portfolio/${project.slug}`}
                        className="font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary"
                      >
                        {project.title}
                      </Link>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Card Body: Tech Badges & Key Highlights */}
                  <div className="flex-1 px-5 py-2 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {visibleTech.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {extraTechCount > 0 && (
                        <span className="inline-flex items-center rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          +{extraTechCount}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {project.highlights.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          <span className="line-clamp-2 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-border px-5 py-3.5">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3.5 text-xs font-medium text-primary-foreground shadow-2xs transition-colors hover:bg-primary/90"
                    >
                      View Details
                    </Link>

                    <div className="flex items-center gap-1.5">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} source code on GitHub`}
                          title="View Source on GitHub"
                          className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Github className="size-4" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit live site for ${project.title}`}
                          title="Open Live Website"
                          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/portfolio"
              className="group inline-flex min-h-[40px] min-w-[180px] items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-xs transition-all hover:border-primary hover:text-primary"
            >
              <span>View All {VERIFIED_PROJECTS.length} Projects</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Interactive Technical Skills Section (modeled on achyutkatiyar.com) */}
      <section id="skills" className="border-t border-border bg-card/40 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="mb-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
              Core Competencies
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[46px] md:leading-[55px]">
              Technical Skills
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Technologies, frameworks, and infrastructure tools I use to design, build, and maintain production digital solutions.
            </p>
          </div>

          {/* Category Selector Tabs */}
          <div
            role="tablist"
            aria-label="Skill categories"
            className="mx-auto mb-8 flex max-w-4xl flex-wrap justify-center gap-1.5 rounded-xl border border-border bg-muted/60 p-1.5"
          >
            {SKILL_CATEGORIES.map((category) => {
              const active = category.id === activeSkillTab;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveSkillTab(category.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all sm:text-sm ${
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  {category.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Active Skill Panel */}
          <motion.div
            key={currentSkillCategory.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-6 shadow-2xs sm:p-8"
          >
            <div className="mb-5 flex flex-col justify-between gap-2 border-b border-border pb-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {currentSkillCategory.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentSkillCategory.description}
                </p>
              </div>
              <span className="self-start rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary sm:self-center">
                {currentSkillCategory.skills.length} Skills
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {currentSkillCategory.skills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Full Overview Grid Below */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <h4 className="mb-3 text-xs font-semibold tracking-wider text-primary uppercase">
                  {cat.label}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Experience, Education & Certifications Preview */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left 7 Cols: Experience Timeline Preview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    Career &amp; Delivery
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Professional Experience
                  </h2>
                </div>
                <Link
                  to="/experience"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Full Timeline <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {EXPERIENCE_TIMELINE.slice(0, 3).map((exp) => (
                  <div
                    key={exp.id}
                    className="rounded-xl border border-border bg-card p-5 shadow-2xs transition-colors hover:border-primary/60"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-base font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {exp.organization}
                        </p>
                      </div>
                      <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      {exp.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Education & Documented Certifications */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    Credentials
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Education &amp; Certifications
                  </h2>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  About Me <ArrowRight className="size-3.5" />
                </Link>
              </div>

              {/* AI Engineering Card */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-foreground">
                        Bachelor&apos;s Degree in AI Engineering
                      </h3>
                    </div>
                    <p className="text-xs font-medium text-primary mt-0.5">
                      Currently Pursuing · Uganda
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Focused on Artificial Intelligence Engineering, software architecture, algorithms, and full-stack systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Documented Certifications List */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-primary" />
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      Professional Certifications ({CERTIFICATIONS_DATA.length})
                    </h3>
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    2024 – 2025
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-foreground">
                          {cert.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {cert.issuer} · {cert.category}
                        </p>
                      </div>
                      <span className="shrink-0 rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Services Overview Section */}
      <section className="border-t border-border bg-card/40 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="mb-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
              Richie Digital Solutions
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Services &amp; Solutions
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              End-to-end engineering, IT infrastructure, and branding services tailored for businesses, NGOs, and academic institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SERVICES_CATALOG.map((cat) => {
              const Icon = SERVICE_ICONS[cat.id] || Briefcase;
              return (
                <div
                  key={cat.id}
                  className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-2xs transition-all hover:border-primary"
                >
                  <div>
                    <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {cat.description}
                    </p>
                    <ul className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-foreground">
                      {cat.items.slice(0, 4).map((item) => (
                        <li key={item.name} className="flex items-center gap-2">
                          <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-2">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      Explore {cat.title.split("&")[0]} <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Client Recommendations / Testimonials Section (modeled on achyutkatiyar.com) */}
      <section id="recommendations" className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="mb-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
              Client Feedback
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[46px] md:leading-[55px]">
              Recommendations
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              What school leaders, company directors, and entrepreneurs say about working with Malish Richard.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-2xs transition-colors hover:border-primary/50"
              >
                <div>
                  <Quote className="mb-3 size-7 text-primary/25" />
                  <p className="text-sm italic leading-relaxed text-muted-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-secondary text-xs font-bold text-primary">
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.role} · {item.organization}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom Resume & Contact CTA Section */}
      <section className="border-t border-border bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Build Your Next Digital Solution?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Whether you need a custom full-stack web application, a Point-of-Sale system, an institutional school or NGO portal, or a complete brand identity, I&apos;m ready to help.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
            >
              <Mail className="size-4" />
              <span>Get in Touch</span>
            </Link>

            <a
              href={PROFILE_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-xs transition-all hover:border-primary hover:text-primary"
            >
              <MessageSquare className="size-4 text-primary" />
              <span>Chat on WhatsApp</span>
            </a>

            <Link
              to="/resume"
              className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-xs transition-all hover:border-primary hover:text-primary"
            >
              <FileText className="size-4 text-primary" />
              <span>View Resume</span>
            </Link>

            <a
              href={PROFILE_DATA.resumeUrl}
              download="Malish_Richard_Resume.pdf"
              className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-xs transition-all hover:border-primary hover:text-primary"
            >
              <Download className="size-4 text-primary" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
