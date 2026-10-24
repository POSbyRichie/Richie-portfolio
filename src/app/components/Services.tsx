import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Code2,
  Server,
  Palette,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Mail,
} from "lucide-react";
import { SERVICES_CATALOG, PROFILE_DATA } from "../../lib/portfolioData";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  web: Code2,
  systems: Server,
  graphics: Palette,
};

export function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-14 flex flex-col items-center text-center"
      >
        <span className="mb-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          {PROFILE_DATA.brand}
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Services &amp; Digital Solutions
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          End-to-end software development, IT systems engineering, and brand design tailored for businesses, educational institutions, NGOs, and startups.
        </p>
      </motion.div>

      {/* Service Categories */}
      <div className="space-y-16">
        {SERVICES_CATALOG.map((category, catIdx) => {
          const CategoryIcon = CATEGORY_ICONS[category.id] || Code2;
          return (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.08, duration: 0.4 }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex flex-col justify-between gap-3 border-b border-border pb-4 sm:flex-row sm:items-end">
                <div className="flex items-start gap-3.5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <CategoryIcon className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                      0{catIdx + 1} · {category.subtitle}
                    </span>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {category.title}
                    </h2>
                  </div>
                </div>
                <p className="max-w-md text-xs text-muted-foreground sm:text-right">
                  {category.description}
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-2xs transition-all duration-200 hover:border-primary hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      <div className="mt-4 border-t border-border pt-3.5">
                        <p className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                          Key Deliverables:
                        </p>
                        <ul className="space-y-1.5 text-xs text-foreground">
                          {item.deliverables.map((del) => (
                            <li key={del} className="flex items-center gap-2">
                              <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        <span>Inquire about {item.name}</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Bottom Consultation CTA */}
      <div className="mt-16 rounded-xl border border-border bg-secondary/40 p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Need a Custom Digital Package?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Every project is scoped to your organization&apos;s goals, timeline, and budget. Reach out today for a free technical consultation and quote.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <Mail className="size-4" />
            <span>Request a Free Quote</span>
          </Link>
          <a
            href={PROFILE_DATA.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary hover:text-primary"
          >
            <MessageSquare className="size-4 text-primary" />
            <span>Discuss on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
