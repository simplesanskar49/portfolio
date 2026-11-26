import { useEffect, useRef } from "react";

const SCROLL_TIMELINE_SUPPORT = "animation-timeline: scroll()";

/**
 * Thin bar along the bottom of the navbar that fills as the page scrolls.
 *
 * Browsers with CSS scroll-driven animations run it entirely in CSS (off the
 * main thread, see `.scroll-progress` in app.css). Others fall back to a
 * passive, rAF-throttled scroll listener that writes a CSS variable directly,
 * so scrolling never triggers a React re-render.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("CSS" in window && "supports" in CSS && CSS.supports(SCROLL_TIMELINE_SUPPORT)) return;
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.setProperty("--scroll-progress", String(progress));
    };
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      data-testid="scroll-progress"
      className="scroll-progress pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-linear-to-r from-accent to-accent-2"
    />
  );
}
