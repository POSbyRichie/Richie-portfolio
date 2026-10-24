import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  User,
  Tag,
  Globe,
  Layers,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { getProjectBySlug } from "../../lib/projectService";
import {
  VERIFIED_PROJECTS,
  enrichProject,
  type PortfolioProject,
} from "../../lib/portfolioData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fallbackMatch =
      VERIFIED_PROJECTS.find((p) => p.slug === slug) || null;

    getProjectBySlug(slug)
      .then((p) => {
        if (p) {
          const enriched = enrichProject(p);
          setProject(enriched);
          setActiveImage(enriched.featured_image);
        } else if (fallbackMatch) {
          setProject(fallbackMatch);
          setActiveImage(fallbackMatch.featured_image);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (fallbackMatch) {
          setProject(fallbackMatch);
          setActiveImage(fallbackMatch.featured_image);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-9 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <Layers className="mb-4 size-12 text-muted-foreground/40" />
        <h1 className="font-display text-2xl font-bold text-foreground">
          Project Not Found
        </h1>
        <p className="mt-2 mb-6 text-sm text-muted-foreground">
          This project case study could not be found or is not yet published.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

  const allImages = [
    ...(project.featured_image ? [project.featured_image] : []),
    ...project.gallery_images.filter((u) => u !== project.featured_image),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      {/* Top Back Navigation */}
      <div className="mb-6">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-2xs transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Header Block */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-2xs sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
            <Tag className="size-3" />
            {project.category}
          </span>
          {project.impact_stat && (
            <span className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {project.impact_stat}
            </span>
          )}
        </div>

        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {project.short_description}
        </p>

        {/* Meta Row */}
        <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-border pt-5 text-xs text-muted-foreground">
          {project.role && (
            <div className="flex items-center gap-1.5">
              <Briefcase className="size-3.5 text-primary" />
              <span>
                <strong className="font-medium text-foreground">Role:</strong>{" "}
                {project.role}
              </span>
            </div>
          )}
          {project.client && (
            <div className="flex items-center gap-1.5">
              <User className="size-3.5 text-primary" />
              <span>
                <strong className="font-medium text-foreground">Client:</strong>{" "}
                {project.client}
              </span>
            </div>
          )}
          {project.completion_date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-primary" />
              <span>
                <strong className="font-medium text-foreground">Delivered:</strong>{" "}
                {new Date(project.completion_date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
            >
              <ExternalLink className="size-4" />
              <span>Visit Live Website</span>
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="size-4" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Featured Image Showcase */}
      <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card shadow-2xs">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          {activeImage ? (
            <ImageWithFallback
              src={activeImage}
              alt={project.title}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Globe className="size-12 opacity-30" />
            </div>
          )}
        </div>

        {allImages.length > 1 && (
          <div className="border-t border-border p-4">
            <p className="mb-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Project Screenshots ({allImages.length})
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {allImages.map((url, idx) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setActiveImage(url)}
                  className={`aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                    activeImage === url
                      ? "border-primary ring-2 ring-primary/25"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <ImageWithFallback
                    src={url}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Two-Column Case Study Body */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left 2 Columns: Problem, Solution, Overview & Highlights */}
        <div className="space-y-6 lg:col-span-2">
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.problem && (
                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <h2 className="font-display text-sm font-semibold tracking-wider text-primary uppercase">
                    The Challenge
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <h2 className="font-display text-sm font-semibold tracking-wider text-primary uppercase">
                    The Solution
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {project.full_description && (
            <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Project Overview
              </h2>
              <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.full_description}
              </div>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Key Contributions &amp; Deliverables
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {project.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Sidebar: Tech Stack & Project Summary */}
        <div className="space-y-6">
          {project.technologies.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <h3 className="text-xs font-semibold tracking-wider text-primary uppercase">
                Technologies Used
              </h3>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-border bg-card p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-primary uppercase">
              Project Summary
            </h3>
            <div className="space-y-2.5 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium text-foreground">{project.category}</p>
              </div>
              {project.client && (
                <div>
                  <p className="text-xs text-muted-foreground">Organization / Client</p>
                  <p className="font-medium text-foreground">{project.client}</p>
                </div>
              )}
              {project.live_url && (
                <div>
                  <p className="text-xs text-muted-foreground">Production URL</p>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline break-all"
                  >
                    <span>{project.live_url.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink className="size-3 shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-secondary/40 p-5">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Need a similar solution?
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Let&apos;s discuss how Richie Digital Solutions can design and build your website or custom software.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground shadow-2xs transition-colors hover:bg-primary/90"
            >
              <span>Request a Quote</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
