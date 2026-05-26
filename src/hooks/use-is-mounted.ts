"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** True on the client after hydration; false during SSR. No extra render cycle. */
export function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
