"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { DownloadIcon, SendIcon } from "lucide-react";
import { toast } from "sonner";

import SocialLinks from "@/components/landing/social-links";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap";
import { scrollReveal } from "@/lib/scroll-reveal";

registerGsapPlugins();

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!isMounted || prefersReducedMotion || !sectionRef.current) return;

      scrollReveal(sectionRef.current, "[data-contact-reveal]", {
        y: 40,
        duration: 1.25,
        stagger: 0.15,
      });
    },
    { scope: sectionRef, dependencies: [isMounted, prefersReducedMotion] }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send message.");
      }

      toast.success("Message sent!", {
        description: "Thanks for reaching out — I'll reply as soon as I can.",
      });
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error("Could not send message", {
        description:
          err instanceof Error
            ? err.message
            : "Please try again or email me directly below.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative border-t border-border/40 bg-background section-padding"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-contact-reveal
            className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase sm:tracking-[0.25em]"
          >
            Contact
          </p>
          <h2
            data-contact-reveal
            className="font-heading mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Get in touch
          </h2>
          <div
            data-contact-reveal
            className="mx-auto mt-6 h-px w-12 bg-primary"
            aria-hidden
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div data-contact-reveal className="flex flex-col gap-8">
            <p className="font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              Have a project in mind, a role to discuss, or just want to say
              hello? Send a message and I&apos;ll get back to you as soon as I
              can.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                <a href={siteConfig.resumePath} download>
                  <DownloadIcon />
                  Download resume
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                PDF · Updated regularly
              </p>
            </div>

            <div className="hidden lg:block">
              <p className="mb-4 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Or find me on
              </p>
              <SocialLinks className="justify-start" />
            </div>

            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground/80">Email · </span>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>

          <form
            data-contact-reveal
            onSubmit={handleSubmit}
            className="rounded-lg border border-border/50 bg-card/20 p-6 sm:p-8"
          >
            <FieldGroup className="gap-8">
              <Field>
                <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
                <Input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project or opportunity…"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Field>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                <SendIcon />
                Send message
              </Button>
            </FieldGroup>
          </form>

          <div data-contact-reveal className="lg:hidden">
            <p className="mb-4 text-center font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Or find me on
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
