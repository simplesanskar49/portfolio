import { useEffect, useState } from "react";

/** True once the page has scrolled past `offset` (in px of scroll position). */
export function useScrolled(offset = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > offset);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
    };
  }, [offset]);

  return scrolled;
}
