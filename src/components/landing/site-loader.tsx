export default function SiteLoader() {
  return (
    <div
      className="flex flex-col items-center gap-5"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="site-loader-ring" aria-hidden />
      <div className="site-loader-bar w-32 max-w-full" aria-hidden />
      <span className="sr-only">Loading page</span>
    </div>
  );
}
