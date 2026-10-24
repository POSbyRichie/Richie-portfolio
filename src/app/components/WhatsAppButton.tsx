import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageSquare } from "lucide-react";
import { PROFILE_DATA } from "../../lib/portfolioData";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="no-print fixed bottom-5 left-5 z-40 flex flex-col items-start gap-2.5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-72 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold text-xs">
                  MR
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {PROFILE_DATA.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-muted-foreground">
                      Richie Digital Solutions · Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close WhatsApp chat widget"
                className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div className="mb-3 rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-foreground">
              Hi! Looking to build a website, web application, POS system, or brand identity? Send me a message on WhatsApp.
            </div>

            <a
              href={PROFILE_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground shadow-2xs transition-colors hover:bg-primary/90"
            >
              <MessageSquare className="size-3.5" />
              Start Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close WhatsApp quick chat" : "Chat with Malish Richard on WhatsApp"}
        title="Chat on WhatsApp"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-3.5 text-xs font-medium text-foreground shadow-md transition-all hover:border-primary hover:text-primary hover:shadow-lg"
      >
        <span className="size-2 rounded-full bg-emerald-500" />
        <MessageSquare className="size-3.5 text-primary" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
    </div>
  );
}
