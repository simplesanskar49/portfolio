export type Accent = "teal" | "violet" | "blue" | "amber" | "rose";

export const ACCENT_STORAGE_KEY = "accent";
export const DEFAULT_ACCENT: Accent = "teal";

/**
 * Presets shown in the picker. `swatch` is the dark-theme accent (picker swatch, tab icon)
 * and `swatch2` the second hue it fades into (tab icon gradient). Must match tokens.css.
 */
export const ACCENTS: readonly { id: Accent; label: string; swatch: string; swatch2: string }[] = [
  { id: "teal", label: "Teal", swatch: "#2dd4bf", swatch2: "#22d3ee" },
  { id: "violet", label: "Violet", swatch: "#a78bfa", swatch2: "#e879f9" },
  { id: "blue", label: "Blue", swatch: "#60a5fa", swatch2: "#38bdf8" },
  { id: "amber", label: "Amber", swatch: "#fbbf24", swatch2: "#fb923c" },
  { id: "rose", label: "Rose", swatch: "#fb7185", swatch2: "#f472b6" },
];

/** Bump after regenerating icons (npm run icons) so browsers drop their cached favicon. */
export const ICON_VERSION = "2";

/** Tab icon in the given accent (rendered by scripts/icons.ts). */
export const faviconHref = (accent: Accent) => `/icons/favicon-${accent}.png?v=${ICON_VERSION}`;

const NON_DEFAULT = ACCENTS.map((a) => a.id).filter((id) => id !== DEFAULT_ACCENT);

/** Runs inline in <head> before first paint so a saved accent never flashes teal first. */
export const ACCENT_INIT_SCRIPT = `(function(){try{var a=localStorage.getItem("${ACCENT_STORAGE_KEY}");if(${JSON.stringify(NON_DEFAULT)}.indexOf(a)>-1)document.documentElement.dataset.accent=a}catch(e){}})();`;
