"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/90 backdrop-blur-md"
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex h-[min(94vh,960px)] max-h-[94vh] w-[min(96vw,1300px)] max-w-[min(96vw,1300px)] sm:max-w-[min(96vw,1300px)] flex-col items-center justify-between border-0 bg-transparent p-3 sm:p-5 text-white shadow-none ring-0 outline-none rounded-none",
        )}
      >
        <DialogTitle className="sr-only">
          {project.title} screenshot gallery
        </DialogTitle>

        {/* Top Header Bar */}
        <div className="z-20 flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-mono text-xs tracking-wider text-white/90 uppercase backdrop-blur-md">
              {project.title}
              {imageCount > 1 && (
                <span className="ml-2 text-white/60">
                  {safeIndex + 1} / {imageCount}
                </span>
              )}
            </span>
          </div>

          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 hover:text-white"
            >
              <XIcon className="size-5" />
              <span className="sr-only">Close gallery</span>
            </Button>
          </DialogClose>
        </div>

        {/* Central Main Image Area */}
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center p-2 sm:p-4">
          <div className="relative h-full w-full max-w-6xl">
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
          </div>

          {/* Previous / Next Arrow Controls */}
          {imageCount > 1 && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-2 sm:left-4 z-20 size-11 sm:size-12 rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-transform hover:bg-white/25 hover:text-white active:scale-90"
                onClick={goPrev}
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="size-6" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 sm:right-4 z-20 size-11 sm:size-12 rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-transform hover:bg-white/25 hover:text-white active:scale-90"
                onClick={goNext}
                aria-label="Next image"
              >
                <ChevronRightIcon className="size-6" />
              </Button>
            </>
          )}
        </div>

        {/* Bottom Thumbnails Strip */}
        {imageCount > 1 && (
          <div className="z-20 flex shrink-0 max-w-full items-center justify-center gap-2 overflow-x-auto px-4 pt-2 pb-1">
            {images.map((image, index) => {
              const isSelected = safeIndex === index;
              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105 opacity-100"
                      : "opacity-40 hover:opacity-85",
                  )}
                  aria-label={`View screenshot ${index + 1}`}
                  aria-current={isSelected}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
