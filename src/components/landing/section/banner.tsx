"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDownIcon } from "lucide-react";

import ShapeGrid from "@/components/ShapeGrid";
import TiltedCard from "@/components/TiltedCard";
import Navbar from "@/components/landing/navbar";
import SocialLinks from "@/components/landing/social-links";
import { Badge } from "@/components/ui/badge";
import { scrollToSectionById } from "@/hooks/use-scroll-spy";
import { useViewport } from "@/hooks/use-mobile";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { cn } from "@/lib/utils";

registerGsapPlugins();

/** Survives Strict Mode remount so entrance only runs once per page load. */
let bannerEntrancePlayed = false;

export default function Banner() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();
  const { isMobile, isReady: isMobileReady } = useViewport();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (
        !isMounted ||
        prefersReducedMotion ||
        !sectionRef.current ||
        bannerEntrancePlayed
      ) {
        return;
      }

      bannerEntrancePlayed = true;

      const contentItems = contentRef.current?.children;
      if (contentItems?.length) {
        gsap.fromTo(
          contentItems,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "transform",
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.12,
            clearProps: "transform",
          }
        );
      }

      if (scrollHintRef.current) {
        gsap.fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.35,
          }
        );
      }
    },
    {
      scope: sectionRef,
      dependencies: [isMounted, prefersReducedMotion],
    }
  );

  useGSAP(
    () => {
      if (
        !isMounted ||
        !isMobileReady ||
        prefersReducedMotion ||
        isMobile ||
        !sectionRef.current
      ) {
        return;
      }

      const section = sectionRef.current;
      const parallax = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      if (contentRef.current) {
        parallax.to(contentRef.current, { y: -72, duration: 1 }, 0);
      }

      if (imageRef.current) {
        parallax.to(imageRef.current, { y: -36, duration: 1 }, 0);
      }

      if (bgRef.current) {
        parallax.to(bgRef.current, { y: 48, duration: 1 }, 0);
      }
    },
    {
      scope: sectionRef,
      dependencies: [
        isMounted,
        isMobileReady,
        isMobile,
        prefersReducedMotion,
      ],
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-background"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <ShapeGrid
          direction="diagonal"
          speed={0.15}
          borderColor="rgba(122, 32, 32, 0.14)"
          squareSize={isMobile ? 40 : 48}
          hoverFillColor="rgba(122, 32, 32, 0.22)"
          shape="square"
          hoverTrailAmount={isMobile ? 0 : 6}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_72%)]" />

      <Navbar />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="grid flex-1 items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_minmax(280px,420px)] lg:gap-6 lg:py-20">
          <div
            ref={contentRef}
            className="flex flex-col items-center text-center will-change-transform lg:items-start lg:text-left"
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 bg-primary/5 font-sans text-primary normal-case tracking-normal"
            >
              Available for work
            </Badge>

            <p className="mb-3 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase sm:tracking-[0.25em]">
              Hello, I&apos;m
            </p>

            <h1 className="font-heading text-balance text-3xl leading-[1.05] font-bold tracking-tight text-foreground uppercase sm:text-4xl md:text-5xl lg:text-7xl">
              Ruiz Miguel B. Sapio
            </h1>

            <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground sm:text-base">
              A Full Stack Developer innovative and passionate about software
              development.
            </p>

            <SocialLinks className="mt-8 justify-center sm:mt-10 lg:justify-start" />
          </div>

          <div
            ref={imageRef}
            className="flex w-full justify-center will-change-transform lg:justify-end"
          >
            <TiltedCard
              imageSrc="/rmbsapio.PNG"
              altText="RMB Sapio portrait"
              containerHeight={
                isMobile ? "min(360px, 50vh)" : "min(520px, 72vh)"
              }
              containerWidth="100%"
              imageHeight={isMobile ? "min(320px, 45vh)" : "min(480px, 68vh)"}
              imageWidth={isMobile ? "100%" : "min(380px, 90vw)"}
              scaleOnHover={isMobile ? 1 : 1.04}
              rotateAmplitude={isMobile ? 0 : 10}
              showMobileWarning={false}
              showTooltip={false}
              imageClassName="object-cover object-bottom"
              frameClassName={cn(
                isMobile ? "border-transparent shadow-none" : "border-primary/20"
              )}
            />
          </div>
        </div>

        <div ref={scrollHintRef} className="flex justify-center pb-6 sm:pb-10">
          <button
            type="button"
            onClick={() => scrollToSectionById("about")}
            className="flex flex-col items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
            aria-label="Scroll to about section"
          >
            <span>Scroll</span>
            <ArrowDownIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
