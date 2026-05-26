"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from "lucide-react";

import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ProjectGalleryDialogProps = {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProjectGalleryDialog({
  project,
  open,
  onOpenChange,
}: ProjectGalleryDialogProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = project.images;
  const imageCount = images.length;
  const safeIndex =
    imageCount === 0 ? 0 : Math.min(activeIndex, imageCount - 1);
  const activeImage = images[safeIndex];

  useEffect(() => {
    setTimeout(() => {
      setActiveIndex(0);
    }, 100);
  }, [project.id]);

  useEffect(() => {
    if (activeIndex !== safeIndex) {
      setTimeout(() => {
        setActiveIndex(safeIndex);
      }, 100);
    }
  }, [activeIndex, safeIndex]);

  const goPrev = useCallback(() => {
    if (imageCount <= 1) return;
    setActiveIndex((i) => (i === 0 ? imageCount - 1 : i - 1));
  }, [imageCount]);

  const goNext = useCallback(() => {
    if (imageCount <= 1) return;
    setActiveIndex((i) => (i === imageCount - 1 ? 0 : i + 1));
  }, [imageCount]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  if (!activeImage) return null;

  const formattedDate = format(new Date(project.createdAt), "MMMM yyyy");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "flex max-h-dvh flex-col gap-0 overflow-hidden p-0",
          "max-lg:fixed max-lg:inset-0 max-lg:h-dvh max-lg:max-h-dvh max-lg:w-screen max-lg:max-w-none max-lg:translate-none max-lg:rounded-none",
          "lg:top-1/2 lg:left-1/2 lg:h-[min(92vh,900px)] lg:max-h-[92vh] lg:w-full lg:max-w-[min(96vw,1100px)] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-row lg:rounded-lg"
        )}
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>

        <div className="relative flex min-h-[40vh] flex-1 flex-col bg-background max-lg:min-h-0 lg:min-h-0 lg:min-w-0 lg:basis-[62%]">
          <div className="relative min-h-[35vh] flex-1 lg:min-h-0">
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain p-3 sm:p-6"
              sizes="(max-width: 1024px) 100vw, 65vw"
              priority
            />

            {imageCount > 1 && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 left-2 z-10 size-11 -translate-y-1/2 bg-background/80 backdrop-blur-sm sm:left-3"
                  onClick={goPrev}
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 right-2 z-10 size-11 -translate-y-1/2 bg-background/80 backdrop-blur-sm sm:right-3"
                  onClick={goNext}
                  aria-label="Next image"
                >
                  <ChevronRightIcon />
                </Button>
              </>
            )}
          </div>

          {imageCount > 1 && (
            <div className="flex shrink-0 snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-4 lg:px-6">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative h-14 w-20 shrink-0 snap-start overflow-hidden rounded-md transition-all",
                    safeIndex === index
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "opacity-50 hover:opacity-100"
                  )}
                  aria-label={`View image ${index + 1}`}
                  aria-current={safeIndex === index}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="flex max-h-[45vh] shrink-0 flex-col overflow-hidden border-t border-border/50 bg-card/30 lg:max-h-none lg:w-[38%] lg:border-t-0 lg:border-l">
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5 pt-12 sm:p-8 sm:pt-8">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {formattedDate}
              </p>
              <h2 className="font-heading mt-3 text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                {project.title}
              </h2>
            </div>

            {project.description && (
              <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.description}
              </p>
            )}

            {project.tags && project.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border/50 px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {project.liveUrl && (
              <div className="mt-auto pt-2">
                <Button asChild className="w-full">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit live site
                    <ExternalLinkIcon />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </aside>
      </DialogContent>
    </Dialog>
  );
}
