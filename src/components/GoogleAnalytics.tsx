"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  function gtag(...args: unknown[]): void;
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof gtag !== "undefined") {
      gtag("config", gaId, { page_path: pathname });
    }
  }, [pathname, gaId]);

  return null;
}
