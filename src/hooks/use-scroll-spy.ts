"use client";

import { useCallback, useEffect, useState } from "react";

const TOP_THRESHOLD = 120;
const NAV_OFFSET = 100;

export function scrollToSectionById(id: string | null) {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `/#${id}`);
}

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const syncHash = useCallback((id: string | null) => {
    const nextUrl = id ? `/#${id}` : "/";
    const current = `${window.location.pathname}${window.location.hash}`;

    if (current !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, []);

  const scrollToSection = useCallback(
    (id: string | null) => {
      scrollToSectionById(id);
      setActiveId(id);
    },
    []
  );

  useEffect(() => {
    const resolveActive = () => {
      if (window.scrollY < TOP_THRESHOLD) {
        return null;
      }

      const position = window.scrollY + NAV_OFFSET;
      let current: string | null = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= position) {
          current = id;
        }
      }

      return current;
    };

    const onScroll = () => {
      const next = resolveActive();
      setActiveId(next);
      syncHash(next);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds, syncHash]);

  return { activeId, scrollToSection };
}
