import { gsap } from "@/lib/gsap";

export type ScrollRevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  /** ScrollTrigger start, e.g. "top 82%" */
  start?: string;
};

/**
 * Hide targets immediately, reveal once when the section enters the viewport.
 * Avoids content sitting visible off-screen until ScrollTrigger fires.
 */
export function scrollReveal(
  scope: HTMLElement,
  selector: string,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 32,
    duration = 1,
    stagger = 0.12,
    start = "top 82%",
  } = options;

  const targets = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll(selector)
  );

  if (!targets.length) return;

  gsap.set(targets, { opacity: 0, y });

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease: "power2.out",
    clearProps: "transform",
    scrollTrigger: {
      trigger: scope,
      start,
      once: true,
    },
  });
}
