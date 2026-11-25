export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

/** Browser UI colour per theme (matches --color-bg-page). */
export const THEME_COLOR: Record<Theme, string> = {
  dark: "#0b0f12",
  light: "#f4f7f8",
};

/**
 * Runs inline in <head> before first paint so the saved / OS theme is applied
 * without a flash. Kept dependency-free and tiny on purpose.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"${THEME_COLOR.light}":"${THEME_COLOR.dark}")}catch(e){}})();`;
