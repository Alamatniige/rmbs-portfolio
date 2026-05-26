import Link from "next/link";

import SiteStatusShell from "@/components/landing/site-status-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteStatusShell
      label="404"
      title="Page not found"
      description="This route doesn't exist or may have been moved. Head back to the portfolio to explore projects and get in touch."
    >
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/#contact">Contact me</Link>
      </Button>
    </SiteStatusShell>
  );
}
