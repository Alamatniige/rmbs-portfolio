"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { format } from "date-fns";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  Maximize2Icon,
} from "lucide-react";

import ProjectGalleryDialog from "@/components/landing/project-gallery-dialog";
import { Button } from "@/components/ui/button";
import { projectsByDate, type Project } from "@/data/projects";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap";
import { scrollReveal } from "@/lib/scroll-reveal";
import { cn } from "@/lib/utils";

registerGsapPlugins();

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isMounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  const total = projectsByDate.length;
  const activeProject = projectsByDate[currentIndex];
  const behind1Project = projectsByDate[(currentIndex + 1) % total];
  const behind2Project = projectsByDate[(currentIndex + 2) % total];

  useGSAP(
    () => {
      if (!isMounted || prefersReducedMotion || !sectionRef.current) return;

      scrollReveal(sectionRef.current, "[data-projects-reveal]", {
        y: 40,
        duration: 1.25,
        stagger: 0.15,
      });
    },
    { scope: sectionRef, dependencies: [isMounted, prefersReducedMotion] },
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentIndex) return;
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setCurrentIndex(targetIndex);
    },
    [currentIndex],
  );

  const openGallery = useCallback((project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  }, []);

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setSelectedProject(null);
  };

  // Keyboard navigation when user is focused inside carousel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (dialogOpen) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Stacked animation variants
  const frontVariants: Variants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? 0 : -140,
      y: prefersReducedMotion ? 0 : dir > 0 ? -18 : 0,
      scale: prefersReducedMotion ? 1 : dir > 0 ? 0.94 : 0.96,
      opacity: prefersReducedMotion ? 0 : dir > 0 ? 0.75 : 0,
      filter: prefersReducedMotion
        ? "blur(0px)"
        : dir > 0
          ? "blur(4px)"
          : "blur(2px)",
    }),
    center: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 30,
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : {
            x: { type: "spring" as const, stiffness: 280, damping: 28 },
            y: { type: "spring" as const, stiffness: 280, damping: 28 },
            scale: { type: "spring" as const, stiffness: 280, damping: 28 },
            opacity: { duration: 0.3 },
            filter: { duration: 0.3 },
          },
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? -140 : 140,
      y: 0,
      scale: prefersReducedMotion ? 1 : 0.96,
      opacity: 0,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(6px)",
      zIndex: 35,
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : {
            x: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
            opacity: { duration: 0.25 },
            scale: { duration: 0.32 },
            filter: { duration: 0.25 },
          },
    }),
  };

  const behind1Variants: Variants = {
    initial: (dir: number) => ({
      scale: prefersReducedMotion ? 0.94 : dir > 0 ? 0.88 : 1,
      y: prefersReducedMotion ? -18 : dir > 0 ? -34 : 0,
      opacity: prefersReducedMotion ? 0.7 : dir > 0 ? 0.4 : 0.9,
      filter: prefersReducedMotion
        ? "blur(4px)"
        : dir > 0
          ? "blur(8px)"
          : "blur(0px)",
    }),
    animate: {
      scale: 0.94,
      y: -18,
      opacity: 0.7,
      filter: "blur(4px)",
      zIndex: 20,
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : {
            type: "spring" as const,
            stiffness: 280,
            damping: 28,
          },
    },
  };

  const behind2Variants: Variants = {
    initial: (dir: number) => ({
      scale: prefersReducedMotion ? 0.88 : dir > 0 ? 0.82 : 0.94,
      y: prefersReducedMotion ? -34 : dir > 0 ? -48 : -18,
      opacity: prefersReducedMotion ? 0.4 : dir > 0 ? 0 : 0.7,
      filter: prefersReducedMotion
        ? "blur(8px)"
        : dir > 0
          ? "blur(12px)"
          : "blur(4px)",
    }),
    animate: {
      scale: 0.88,
      y: -34,
      opacity: 0.4,
      filter: "blur(8px)",
      zIndex: 10,
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : {
            type: "spring" as const,
            stiffness: 280,
            damping: 28,
          },
    },
  };

  const formattedDate = format(new Date(activeProject.createdAt), "MMMM yyyy");

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative border-t border-border/40 bg-background section-padding"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <p
              data-projects-reveal
              className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase sm:tracking-[0.25em]"
            >
              Projects
            </p>
            <h2
              data-projects-reveal
              className="font-heading mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Selected work
            </h2>
            <div
              data-projects-reveal
              className="mx-auto mt-6 h-px w-12 bg-primary"
              aria-hidden
            />
            <p
              data-projects-reveal
              className="mt-6 font-sans text-base leading-relaxed text-muted-foreground"
            >
              Explore selected projects in the slideshow. Click a card to browse
              screenshots or launch live deployed builds.
            </p>
          </div>

          {/* Carousel Stage Container */}
          <div
            data-projects-reveal
            ref={carouselRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected projects slideshow"
            className="group/carousel relative mt-10 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-8 focus-visible:rounded-2xl"
          >
            {/* Top Deck: Stacked Cards Stage */}
            <div className="relative mx-auto w-full max-w-4xl pt-10 sm:pt-14 pb-2">
              <div className="relative aspect-16/10 sm:aspect-16/9 w-full">
                {/* Behind Card 2 (Deepest) */}
                <motion.div
                  key={`behind2-${behind2Project.id}`}
                  custom={direction}
                  variants={behind2Variants}
                  initial="initial"
                  animate="animate"
                  onClick={() => goToIndex((currentIndex + 2) % total)}
                  title={`View next: ${behind2Project.title}`}
                  className="absolute inset-0 origin-bottom cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg select-none dark:border-white/10"
                >
                  <Image
                    src={behind2Project.images[0].src}
                    alt={behind2Project.images[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] transition-colors hover:bg-background/40" />
                </motion.div>

                {/* Behind Card 1 (Middle) */}
                <motion.div
                  key={`behind1-${behind1Project.id}`}
                  custom={direction}
                  variants={behind1Variants}
                  initial="initial"
                  animate="animate"
                  onClick={handleNext}
                  title={`View next: ${behind1Project.title}`}
                  className="absolute inset-0 origin-bottom cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl select-none dark:border-white/15"
                >
                  <Image
                    src={behind1Project.images[0].src}
                    alt={behind1Project.images[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                  <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] transition-colors hover:bg-background/20" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 opacity-60">
                    <p className="font-heading text-sm sm:text-base font-bold text-foreground">
                      {behind1Project.title}
                    </p>
                  </div>
                </motion.div>

                {/* Front Active Card */}
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={`front-${activeProject.id}`}
                    custom={direction}
                    variants={frontVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag={prefersReducedMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => {
                      isDraggingRef.current = true;
                    }}
                    onDragEnd={(_, info) => {
                      setTimeout(() => {
                        isDraggingRef.current = false;
                      }, 100);
                      const threshold = 40;
                      if (info.offset.x < -threshold) {
                        handleNext();
                      } else if (info.offset.x > threshold) {
                        handlePrev();
                      }
                    }}
                    onClick={() => {
                      if (isDraggingRef.current) return;
                      openGallery(activeProject);
                    }}
                    className="group/card absolute inset-0 origin-bottom cursor-pointer overflow-hidden rounded-2xl border border-border/90 bg-card shadow-2xl transition-shadow duration-300 hover:shadow-primary/10 select-none dark:border-white/20 dark:shadow-black/70"
                  >
                    <Image
                      src={activeProject.images[0].src}
                      alt={activeProject.images[0].alt}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/25 to-transparent opacity-90 transition-opacity group-hover/card:opacity-95" />

                    {/* Top overlay badge & action indicator */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1 font-mono text-[0.7rem] font-semibold tracking-widest text-foreground uppercase backdrop-blur-md">
                          0{currentIndex + 1} / 0{total}
                        </span>
                        {activeProject.tags?.[0] && (
                          <span className="hidden sm:inline-block rounded-full border border-border/50 bg-background/70 px-2.5 py-1 font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase backdrop-blur-md">
                            {activeProject.tags[0]}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-all group-hover/card:border-primary/40 group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                        <Maximize2Icon className="size-3.5" />
                        <span className="hidden sm:inline">
                          Browse screenshots
                        </span>
                      </div>
                    </div>

                    {/* Bottom Title on Card */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                        {formattedDate}
                      </p>
                      <h3 className="font-heading mt-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl drop-shadow-sm">
                        {activeProject.title}
                      </h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Centered Small Pagination Dots */}
            <div
              role="tablist"
              aria-label="Projects slide indicators"
              className="mx-auto mt-4 flex items-center justify-center gap-1.5"
            >
              {projectsByDate.map((proj, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Jump to ${proj.title} (slide ${idx + 1} of ${total})`}
                    onClick={() => goToIndex(idx)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      isActive
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                    )}
                  />
                );
              })}
            </div>

            {/* Bottom: Active Project Details Panel */}
            <div className="mx-auto mt-4 sm:mt-5 max-w-4xl" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.1 : 0.25,
                    ease: "easeOut",
                  }}
                  className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8"
                >
                  {/* Left Column: Info & Tags */}
                  <div className="space-y-3 lg:col-span-8">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                          {formattedDate}
                        </p>
                        <span className="font-mono text-xs tracking-wider text-muted-foreground">
                          <span className="font-bold text-foreground">
                            0{currentIndex + 1}
                          </span>
                          <span className="opacity-60"> / 0{total}</span>
                        </span>
                      </div>
                      <h3 className="font-heading mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {activeProject.title}
                      </h3>
                    </div>

                    {activeProject.description && (
                      <p className="font-sans text-base leading-relaxed text-muted-foreground">
                        {activeProject.description}
                      </p>
                    )}

                    {activeProject.tags && activeProject.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-2 pt-1">
                        {activeProject.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md border border-border/60 bg-muted/30 px-3 py-1 font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-col gap-2.5 lg:col-span-4 lg:pt-1">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handlePrev}
                        aria-label="Previous project"
                        className="shrink-0 rounded-md transition-transform active:scale-95"
                      >
                        <ChevronLeftIcon className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 justify-center gap-2 font-medium transition-transform active:scale-98"
                      >
                        <span>Next project</span>
                        <ChevronRightIcon className="size-4" />
                      </Button>
                    </div>

                    {activeProject.liveUrl && (
                      <Button
                        variant="outline"
                        asChild
                        className="w-full justify-center gap-2 font-medium"
                      >
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Visit live site</span>
                          <ExternalLinkIcon className="size-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Dialog Modal */}
      {selectedProject && (
        <ProjectGalleryDialog
          key={selectedProject.id}
          project={selectedProject}
          open={dialogOpen}
          onOpenChange={handleDialogOpenChange}
        />
      )}
    </>
  );
}
