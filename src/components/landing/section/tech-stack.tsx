"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { allTechItems, techCategories } from "@/data/tech-stack";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap";
import { scrollReveal } from "@/lib/scroll-reveal";
import { cn } from "@/lib/utils";

registerGsapPlugins();

function TechPill({
  iconSize,
  name,
  Icon,
  className,
}: {
  name: string;
  Icon: (typeof allTechItems)[number]["Icon"];
  iconSize: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg border border-border/50 bg-background/50 px-3 py-2.5 transition-all hover:border-primary/40 hover:bg-primary/5 sm:w-auto",
        className
      )}
    >
      <Icon
        size={iconSize}
        className="shrink-0 transition-transform duration-300 group-hover:scale-110"
        aria-hidden
      />
      <span className="font-sans text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}

function TechMarquee() {
  const items = [...allTechItems, ...allTechItems];

  return (
    <div
      className="relative mt-16 overflow-hidden border-t border-border/40 pt-10"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee gap-10">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex shrink-0 items-center gap-2 opacity-50"
          >
            <item.Icon size={28} />
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMounted = useIsMounted();
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const iconSize = isMobile ? 28 : 36;

  useGSAP(
    () => {
      if (!isMounted || prefersReducedMotion || !sectionRef.current) return;

      scrollReveal(sectionRef.current, "[data-stack-reveal]", {
        y: 40,
        duration: 1.25,
        stagger: 0.12,
      });
    },
    { scope: sectionRef, dependencies: [isMounted, prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative overflow-hidden border-t border-border/40 bg-card/20 section-padding"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-stack-reveal
            className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase sm:tracking-[0.25em]"
          >
            Tech Stack
          </p>
          <h2
            data-stack-reveal
            className="font-heading mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Tools I build with
          </h2>
          <div
            data-stack-reveal
            className="mx-auto mt-6 h-px w-12 bg-primary"
            aria-hidden
          />
          <p
            data-stack-reveal
            className="mt-6 font-sans text-base leading-relaxed text-muted-foreground"
          >
            Grouped by what I reach for most — from polished UIs to APIs,
            mobile apps, and systems-level work.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {techCategories.map((category) => (
            <article
              key={category.id}
              data-stack-reveal
              className="rounded-lg border border-border/50 bg-background/40 p-5 shadow-sm transition-colors hover:border-primary/30 sm:p-8"
            >
              <header className="mb-6">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </header>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <TechPill
                    key={item.id}
                    name={item.name}
                    Icon={item.Icon}
                    iconSize={iconSize}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>

        {!prefersReducedMotion && <TechMarquee />}
      </div>
    </section>
  );
}
