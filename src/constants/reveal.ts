/** Class on <html> that enables reveal-on-scroll styles. */
export const REVEAL_READY_CLASS = "reveal-ready";

/**
 * Runs inline in <head> before first paint. Sections only start hidden when the
 * browser can reveal them again (IntersectionObserver) and the user hasn't asked
 * for reduced motion — so without JS, or with reduced motion, content is just visible.
 */
export const REVEAL_INIT_SCRIPT = `(function(){try{if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("${REVEAL_READY_CLASS}")}}catch(e){}})();`;
