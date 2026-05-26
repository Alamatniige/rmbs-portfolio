"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap";
import { scrollReveal } from "@/lib/scroll-reveal";

registerGsapPlugins();

const highlights = [
  "Full Stack Development",
  "Clean & Scalable Code",
  "User-Centered Design",
] as const;

const aboutCopy = {
  intro:
    "I'm Ruiz Miguel B. Sapio — a full stack developer who enjoys turning ideas into products that feel intentional, fast, and easy to use. I care as much about how something works behind the scenes as I do about the experience someone has when they open it for the first time.",
  work:
    "Most of my work lives at the intersection of frontend polish and backend reliability: building interfaces with modern tools, structuring APIs and data flows that scale, and shipping features end to end without losing sight of the bigger picture.",
  quote:
    "\u201CGood software should feel simple on the surface \u2014 even when the work underneath isn\u2019t.\u201D",
  closing:
    "Outside of code, I'm always learning — whether that's a new framework, a better way to structure a project, or how to communicate technical decisions more clearly. I'm open to collaborations, freelance work, and roles where I can grow with a team that values craft.",
} as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!isMounted || prefersReducedMotion || !sectionRef.current) return;

      scrollReveal(sectionRef.current, "[data-about-reveal]", {
        y: 40,
        duration: 1.25,
        stagger: 0.2,
      });
    },
    { scope: sectionRef, dependencies: [isMounted, prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative border-t border-border/40 bg-card/20 section-padding"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p
          data-about-reveal
          className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase sm:tracking-[0.25em]"
        >
          About
        </p>

        <h2
          data-about-reveal
          className="font-heading mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Who I am
        </h2>

        <div
          data-about-reveal
          className="mx-auto mt-6 h-px w-12 bg-primary"
          aria-hidden
        />

        <div className="mt-12 space-y-6 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
          <p data-about-reveal>{aboutCopy.intro}</p>
          <p data-about-reveal>{aboutCopy.work}</p>

          <blockquote
            data-about-reveal
            className="mx-auto max-w-xl border-y border-border/50 px-4 py-8 sm:px-0"
          >
            <p className="font-sans text-base leading-relaxed text-foreground sm:text-lg">
              {aboutCopy.quote}
            </p>
          </blockquote>

          <p data-about-reveal>{aboutCopy.closing}</p>
        </div>

        <Separator
          data-about-reveal
          className="mx-auto my-12 max-w-xs bg-border/60"
        />

        <div
          data-about-reveal
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {highlights.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="border-border/60 bg-background/40 font-sans normal-case tracking-normal text-muted-foreground"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
