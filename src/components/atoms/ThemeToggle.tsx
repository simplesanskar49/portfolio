import { Moon, Sun } from "lucide-react";

import { useTheme } from "~/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      className="inline-flex size-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-raised hover:text-text-primary"
    >
      {theme === "dark" ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
