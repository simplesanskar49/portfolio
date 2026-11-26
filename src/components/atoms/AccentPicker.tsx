import { Check, Palette } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { ACCENTS } from "~/constants/accent";
import { useAccent } from "~/hooks/useAccent";
import { cn } from "~/utils/cn";

/**
 * Navbar button that opens a small panel of accent colours. The swatches are native
 * radio buttons (visually replaced), so arrow keys, Tab and screen readers work as a
 * normal radio group. Closes on Esc, outside click, or focus leaving the panel.
 */
export function AccentPicker() {
  const { accent, setAccent } = useAccent();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const name = useId();

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const onPointerDown = (event: PointerEvent) => {
      if (root && !root.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (root && !root.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Accent colour"
        onClick={() => {
          setOpen((value) => !value);
        }}
        className="inline-flex size-11 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-raised hover:text-text-primary"
      >
        <Palette className="size-5" aria-hidden="true" />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full right-0 z-50 mt-2 rounded-(--radius-card) border border-border-strong bg-bg-surface p-3 shadow-[0_1rem_2.5rem_rgb(0_0_0/0.3)]"
      >
        <fieldset>
          <legend className="mb-2 font-mono text-xs tracking-widest text-text-muted uppercase">
            Accent colour
          </legend>
          <div className="flex gap-2">
            {ACCENTS.map((option) => {
              const checked = option.id === accent;
              return (
                <label
                  key={option.id}
                  title={option.label}
                  className={cn(
                    "relative flex size-9 cursor-pointer items-center justify-center rounded-full ring-offset-2 ring-offset-bg-surface transition-shadow has-focus-visible:ring-2 has-focus-visible:ring-text-primary",
                    checked && "ring-2 ring-text-primary",
                  )}
                  style={{ backgroundColor: option.swatch }}
                >
                  <input
                    type="radio"
                    name={name}
                    value={option.id}
                    checked={checked}
                    onChange={() => {
                      setAccent(option.id);
                    }}
                    className="sr-only"
                  />
                  <span className="sr-only">{option.label}</span>
                  {checked && <Check className="size-4 text-neutral-950" aria-hidden="true" />}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
