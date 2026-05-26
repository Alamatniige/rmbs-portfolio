"use client";

import { Toaster } from "sonner";

import { useIsMobile } from "@/hooks/use-mobile";

export default function AppToaster() {
  const isMobile = useIsMobile();

  return (
    <Toaster
      theme="dark"
      position={isMobile ? "top-center" : "bottom-center"}
      richColors
    />
  );
}
