import { motion } from "motion/react";
import { Link } from "react-router";
import { Quote, Star, ArrowRight, MessageSquare } from "lucide-react";
import { TESTIMONIALS_DATA, PROFILE_DATA } from "../../lib/portfolioData";

export function Testimonials() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12 flex flex-col items-center text-center"
      >
        <span className="mb-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          Client Recommendations
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          What Clients Say
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Feedback from school administrators, company directors, real estate managers, and business owners who partnered with Richie Digital Solutions.
        </p>
      </motion.div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.4 }}
            className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xs transition-colors hover:border-primary/60"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Quote className="size-7 text-primary/25" />
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-sm italic leading-relaxed text-muted-foreground">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-secondary text-xs font-bold text-primary">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-foreground">
                    {item.name}
                  </h2>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.role} · {item.organization}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <span className="inline-block rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-primary">
                  {item.projectType}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-xl border border-border bg-card p-8 text-center shadow-2xs">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Ready to Start Your Project?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Join 30+ organizations and business leaders who trust Malish Richard for reliable web, software, and IT delivery.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="size-4" />
          </Link>
          <a
            href={PROFILE_DATA.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary hover:text-primary"
          >
            <MessageSquare className="size-4 text-primary" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
