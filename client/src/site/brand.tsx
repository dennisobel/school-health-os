import { cn } from "../pages/shared";

/**
 * Brand assets for the Mlezi Health public website.
 * The logo mark is inline SVG so it never depends on remote storage;
 * photography lives in ./photos.tsx and is sourced from Pexels.
 */

export function MleziMark({ size = 34, tone = "forest" }: { size?: number; tone?: "forest" | "light" | "mint" }) {
  const shell = tone === "light" ? "#ffffff" : tone === "mint" ? "#7fd1a6" : "#0f3c2e";
  const inner = tone === "light" ? "#0f3c2e" : tone === "mint" ? "#082a20" : "#7fd1a6";
  return (
    <svg className="s-logo-mark" width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill={shell} />
      {/* two cradling arms forming a guardian embrace */}
      <path d="M11 25.5c0-5.8 4-10.2 9-10.2s9 4.4 9 10.2" stroke={inner} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M14.6 29.4c0-3.4 2.4-6 5.4-6s5.4 2.6 5.4 6" stroke={inner} strokeWidth="2.6" strokeLinecap="round" opacity=".55" />
      {/* the child being held */}
      <circle cx="20" cy="12.4" r="3.8" fill={inner} />
    </svg>
  );
}

export function MleziLogo({ dark = false, size = 34 }: { dark?: boolean; size?: number }) {
  return (
    <span className={cn("s-logo", dark && "on-dark")} aria-label="Mlezi Health">
      <MleziMark size={size} tone={dark ? "light" : "forest"} />
      <span className="s-logo-type">
        Mlezi
        <small>Health</small>
      </span>
    </span>
  );
}
