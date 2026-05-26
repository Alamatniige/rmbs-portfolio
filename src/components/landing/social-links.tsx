"use client";

import { SocialIcon } from "react-social-icons";

import { socialLinks } from "@/data/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
};

export default function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 36 : 40;

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      {socialLinks.map((link) => (
        <SocialIcon
          key={link.name}
          url={link.url}
          label={link.name}
          target="_blank"
          rel="noopener noreferrer"
          fgColor="#fafafa"
          bgColor="transparent"
          style={{ height: iconSize, width: iconSize }}
          className={cn(
            "opacity-70 transition-opacity hover:opacity-100",
            iconClassName
          )}
        />
      ))}
    </div>
  );
}
