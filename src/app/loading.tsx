import SiteLoader from "@/components/landing/site-loader";
import SiteStatusShell from "@/components/landing/site-status-shell";

export default function Loading() {
  return (
    <SiteStatusShell
      label="Loading"
      title="One moment"
      description="Preparing the page…"
    >
      <SiteLoader />
    </SiteStatusShell>
  );
}
