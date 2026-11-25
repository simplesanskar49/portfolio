import { Moon, Sun } from "lucide-react";

import { useTheme } from "~/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={(event) => {
        // The new theme grows out of the centre of this button.
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
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
