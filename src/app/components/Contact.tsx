import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  Github,
  Linkedin,
  FileText,
} from "lucide-react";
import { PROFILE_DATA } from "../../lib/portfolioData";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);

    const subject = encodeURIComponent(
      form.subject || `Portfolio Inquiry from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${PROFILE_DATA.contact.primaryEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Malish, my name is ${form.name || "a prospective client"} (${
        form.email || "no email provided"
      }). Subject: ${form.subject || "Project Inquiry"}. ${form.message}`
    );
    window.open(
      `https://wa.me/${PROFILE_DATA.contact.phoneRaw.replace("+", "")}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      {/* Header (modeled on achyutkatiyar.com/contact) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12 space-y-3 text-center"
      >
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          Get In Touch
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Contact Me
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
          Have a project in mind or looking to collaborate? Send a message below or connect directly via WhatsApp, email, or phone.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column: Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xs sm:p-8"
        >
          <div className="mb-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Send a Message
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill out the form below and your message will open directly in your mail client addressed to{" "}
              <span className="font-medium text-foreground">
                {PROFILE_DATA.contact.primaryEmail}
              </span>
              .
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Message Prepared!
              </h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                Thank you for reaching out. Your email client has been opened with your message details. Malish responds within the hour.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-xs font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  Send Another Message
                </button>
                <a
                  href={PROFILE_DATA.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground"
                >
                  <MessageSquare className="size-3.5" />
                  Also Send on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="h-10 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="h-10 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Website development / POS software inquiry"
                  className="h-10 w-full rounded-md border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project goals, timeline, and requirements..."
                  className="w-full resize-none rounded-md border border-border bg-background p-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90 disabled:opacity-60"
                >
                  <Send className="size-4" />
                  <span>{loading ? "Preparing..." : "Send Message"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary hover:text-primary"
                >
                  <MessageSquare className="size-4 text-primary" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Right Column: Connect Directly Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xs sm:p-8 space-y-6"
        >
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Connect With Me
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Reach out directly through any of the verified channels below.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3.5 rounded-lg border border-border bg-background p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Mail className="size-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Email Addresses
                  </h3>
                  <a
                    href={`mailto:${PROFILE_DATA.contact.primaryEmail}`}
                    className="mt-0.5 block truncate text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {PROFILE_DATA.contact.primaryEmail}
                  </a>
                  <a
                    href={`mailto:${PROFILE_DATA.contact.businessEmail}`}
                    className="block truncate text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {PROFILE_DATA.contact.businessEmail}
                  </a>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5 rounded-lg border border-border bg-background p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Phone &amp; WhatsApp
                  </h3>
                  <a
                    href={`tel:${PROFILE_DATA.contact.phoneRaw}`}
                    className="mt-0.5 block text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {PROFILE_DATA.contact.phone}
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Available 24/7 for calls and WhatsApp consultations
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5 rounded-lg border border-border bg-background p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Location
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {PROFILE_DATA.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Serving clients across Uganda, East Africa &amp; remotely worldwide
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-3.5 rounded-lg border border-border bg-background p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Response Time
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    Within 1 Hour · 24/7 Support
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Open for freelance projects, retainers &amp; technical consulting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Socials & Resume Row */}
          <div className="border-t border-border pt-5">
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Profiles &amp; Resume
            </h3>
            <div className="flex flex-wrap gap-2">
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="size-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Linkedin className="size-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PROFILE_DATA.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <MessageSquare className="size-3.5 text-primary" />
                <span>WhatsApp</span>
              </a>
              <a
                href={PROFILE_DATA.resumeUrl}
                download="Malish_Richard_Resume.pdf"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FileText className="size-3.5 text-primary" />
                <span>Resume PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
