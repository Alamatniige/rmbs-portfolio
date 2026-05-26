import Link from "next/link";

import SocialLinks from "@/components/landing/social-links";
import { navLinks, siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-10">
          <div>
            <p className="font-heading text-lg font-bold tracking-tight text-foreground">
              {siteConfig.shortName}
            </p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              {siteConfig.name}
            </p>
          </div>

          <SocialLinks />

          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
            aria-label="Footer"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className="font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          <p className="text-balance font-mono text-xs tracking-wider text-muted-foreground uppercase">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
