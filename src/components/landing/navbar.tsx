"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/data/site";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

const sectionIds = [...navLinks.map((link) => link.id), "contact"];

function NavLink({
  id,
  label,
  isActive,
  className,
  onNavigate,
}: {
  id: string;
  label: string;
  isActive: boolean;
  className?: string;
  onNavigate: (sectionId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(id)}
      className={cn(
        "font-sans text-sm font-medium transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-primary",
        className
      )}
    >
      {label}
    </button>
  );
}

export default function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { activeId, scrollToSection } = useScrollSpy(sectionIds);

  const navigate = (sectionId: string) => {
    scrollToSection(sectionId);
    setSheetOpen(false);
  };

  const goHome = () => {
    scrollToSection(null);
    setSheetOpen(false);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 pt-safe sm:px-6 sm:pt-5">
      <div className="pointer-events-auto flex h-14 w-full max-w-[calc(100vw-2rem)] items-center justify-between gap-3 rounded-full border border-border/50 bg-background/75 px-4 shadow-lg shadow-black/20 backdrop-blur-md sm:max-w-4xl sm:gap-4 sm:px-6">
        <button
          type="button"
          onClick={goHome}
          className="font-heading shrink-0 text-lg font-bold tracking-tight text-foreground"
        >
          rmbs.
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              id={link.id}
              label={link.label}
              isActive={activeId === link.id}
              onNavigate={navigate}
            />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            type="button"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => navigate("contact")}
          >
            Get in touch
          </Button>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-border/60 bg-background pb-safe"
            >
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 px-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    id={link.id}
                    label={link.label}
                    isActive={activeId === link.id}
                    className="py-1 text-left text-base"
                    onNavigate={navigate}
                  />
                ))}
                <Button
                  type="button"
                  className="mt-2 w-full"
                  onClick={() => navigate("contact")}
                >
                  Get in touch
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
