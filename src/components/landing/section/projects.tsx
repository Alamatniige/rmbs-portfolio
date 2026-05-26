"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { format } from "date-fns";

import ProjectGalleryDialog from "@/components/landing/project-gallery-dialog";
import { projectsByDate, type Project } from "@/data/projects";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap";
import { scrollReveal } from "@/lib/scroll-reveal";
import { cn } from "@/lib/utils";

registerGsapPlugins();

function ProjectCard({
  project,
  onSelect,
  className,
}: {
  project: Project;
  onSelect: (project: Project) => void;
  className?: string;
}) {
  const cover = project.images[0];
  const formattedDate = format(new Date(project.createdAt), "MMMM yyyy");

  return (
    <button
      type="button"
      data-projects-reveal
      onClick={() => onSelect(project)}
      className={cn(
        "group relative block w-full max-h-[70vh] overflow-hidden rounded-lg text-left active:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none sm:max-h-none",
        className
      )}
    >
      <div className="relative aspect-5/6 w-full sm:aspect-3/4">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {formattedDate}
          </p>
          <h3 className="font-heading mt-2 line-clamp-2 text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl lg:text-2xl">
            {project.title}
          </h3>
        </div>
      </div>
    </button>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!isMounted || prefersReducedMotion || !sectionRef.current) return;

      scrollReveal(sectionRef.current, "[data-projects-reveal]", {
        y: 40,
        duration: 1.25,
        stagger: 0.15,
      });
    },
    { scope: sectionRef, dependencies: [isMounted, prefersReducedMotion] }
  );

  const openGallery = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setSelectedProject(null);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative border-t border-border/40 bg-background section-padding"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
              Click a project to browse screenshots. Live links appear when a
              build is deployed.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectsByDate.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={openGallery}
              />
            ))}
          </div>
        </div>
      </section>

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
