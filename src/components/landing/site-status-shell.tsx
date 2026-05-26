import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type SiteStatusShellProps = {
  label: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export default function SiteStatusShell({
  label,
  title,
  description,
  children,
  className,
}: SiteStatusShellProps) {
  return (
    <main
      className={cn(
        "relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-16",
        className
      )}
    >
      <div className="site-status-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_72%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {siteConfig.shortName}
        </Link>

        <p className="mt-12 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase sm:tracking-[0.25em]">
          {label}
        </p>

        <h1 className="font-heading mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        <div className="mx-auto mt-6 h-px w-12 bg-primary" aria-hidden />

        {description ? (
          <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}

        {children ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {children}
          </div>
        ) : null}
      </div>
    </main>
  );
}
