import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Layers,
  Search,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getPublishedProjects } from "../../lib/projectService";
import {
  VERIFIED_PROJECTS,
  enrichProject,
  type PortfolioProject,
} from "../../lib/portfolioData";

const FILTER_TABS = [
  { id: "All", label: "All Projects" },
  { id: "Tools / SaaS", label: "SaaS & POS Tools" },
  { id: "E-Commerce", label: "E-Commerce" },
  { id: "Education", label: "Education Portals" },
  { id: "Business & NGO", label: "Corporate & NGO" },
  { id: "Real Estate", label: "Real Estate" },
];

function matchesCategoryFilter(project: PortfolioProject, filterId: string): boolean {
  if (filterId === "All") return true;
  const cat = project.category.toLowerCase();
  if (filterId === "Tools / SaaS") {
    return cat.includes("tool") || cat.includes("saas") || cat.includes("full stack");
  }
  if (filterId === "E-Commerce") {
    return cat.includes("e-commerce") || cat.includes("ecommerce");
  }
  if (filterId === "Education") {
    return cat.includes("education") || cat.includes("school");
  }
  if (filterId === "Business & NGO") {
    return (
      cat.includes("business") ||
      cat.includes("ngo") ||
      cat.includes("consulting") ||
      cat.includes("web development") ||
      cat.includes("other")
    );
  }
  if (filterId === "Real Estate") {
    return cat.includes("real estate");
  }
  return true;
}

export function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>(VERIFIED_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getPublishedProjects()
      .then((liveData) => {
        if (liveData && liveData.length > 0) {
          const enrichedLive = liveData.map(enrichProject);
          const liveSlugs = new Set(enrichedLive.map((p) => p.slug));
          const additionalVerified = VERIFIED_PROJECTS.filter(
            (vp) => !liveSlugs.has(vp.slug)
          );
          setProjects([...enrichedLive, ...additionalVerified]);
        }
      })
      .catch(() => {
        // Keep VERIFIED_PROJECTS fallback
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = matchesCategoryFilter(p, activeFilter);
      if (!matchesCat) return false;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.short_description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, activeFilter, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex flex-col items-center text-center"
      >
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" />
          Richie Digital Solutions Portfolio
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Projects &amp; Case Studies
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          A curated showcase of commercial SaaS tools, Point-of-Sale systems, NGO &amp; corporate platforms, e-commerce stores, and school portals built by Malish Richard.
        </p>
      </motion.div>

      {/* Filter & Search Bar */}
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-muted/60 p-1.5"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                  active
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or tech stack..."
            aria-label="Search projects"
            className="h-10 w-full rounded-lg border border-border bg-card pr-3.5 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Loading Indicator (non-blocking) */}
      {loading && projects.length === 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-96 animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center">
          <Layers className="mx-auto mb-3 size-10 text-muted-foreground/50" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            No matching projects found
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try clearing your search filter or selecting &ldquo;All Projects&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter("All");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => {
            const visibleTech = project.technologies.slice(0, 4);
            const extraTechCount = Math.max(
              0,
              project.technologies.length - visibleTech.length
            );

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.04, 0.25), duration: 0.35 }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xs transition-all duration-200 hover:border-primary hover:shadow-md"
              >
                {/* Aspect-Video Thumbnail */}
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
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-md border border-border/80 bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-xs">
                      {project.category}
                    </span>
                  </div>
                  {project.impact_stat && (
                    <div className="absolute right-3 bottom-3">
                      <span className="rounded-md bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-xs">
                        {project.impact_stat}
                      </span>
                    </div>
                  )}
                </Link>

                {/* Card Header */}
                <div className="px-5 pt-5 pb-3">
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary"
                  >
                    {project.title}
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {project.short_description}
                  </p>
                </div>

                {/* Card Content: Tech Stack & Key Highlights */}
                <div className="flex-1 space-y-4 px-5 py-2">
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
                    {project.highlights.slice(0, 3).map((item, i) => (
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
                        aria-label={`${project.title} GitHub repository`}
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
                        <span>Live Demo</span>
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
