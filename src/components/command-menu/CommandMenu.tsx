import { CornerDownLeft, Search } from "lucide-react";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { cn } from "~/utils/cn";

import { filterCommands } from "./filterCommands";
import { type Command, GROUP_ORDER, useCommands } from "./useCommands";

const noopSubscribe = () => () => undefined;
const isApple = () => /mac|iphone|ipad/i.test(navigator.userAgent);

/** "⌘K" on Apple devices, "Ctrl K" elsewhere. Server render assumes Apple. */
function useShortcutLabel(): string {
  const apple = useSyncExternalStore(noopSubscribe, isApple, () => true);
  return apple ? "⌘K" : "Ctrl K";
}

/**
 * ⌘K / Ctrl+K command menu: jump to a section, copy the email, switch theme or open a
 * profile. A native modal <dialog> (focus containment, Esc, inert page) with an ARIA
 * combobox + listbox inside; the highlighted option is tracked with aria-activedescendant
 * so focus never leaves the search box.
 */
interface CommandMenuProps {
  /** Section currently in view (scroll-spy); its "Go to" command is highlighted on open. */
  currentSectionId?: string | null;
}

export function CommandMenu({ currentSectionId = null }: CommandMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Whether the menu was opened with a mouse/touch click on the trigger (vs the keyboard).
  const openedByPointerRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  // null = not chosen yet: highlight the current section (or the first command).
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const shortcut = useShortcutLabel();
  const commands = useCommands();
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const listId = `${baseId}-list`;
  const optionId = (command: Command) => `${baseId}-${command.id}`;

  // Results grouped in a fixed group order; `flat` is the keyboard order.
  const groups = useMemo(() => {
    const results = filterCommands(commands, query);
    return GROUP_ORDER.map((group) => ({
      group,
      items: results.filter((command) => command.group === group),
    })).filter(({ items }) => items.length > 0);
  }, [commands, query]);
  const flat = useMemo(() => groups.flatMap(({ items }) => items), [groups]);
  const currentCommandId = currentSectionId ? `nav-${currentSectionId}` : null;
  const highlighted = Math.min(
    activeIndex ??
      Math.max(
        flat.findIndex((command) => command.id === currentCommandId),
        0,
      ),
    flat.length - 1,
  );
  const active = flat[highlighted];

  // ⌘K / Ctrl+K toggles the menu from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openedByPointerRef.current = false;
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Keep the native dialog in sync with `open`.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // A click on the backdrop lands on the <dialog> itself (not the panel): close it.
  // Keyboard users have Esc, which the native dialog handles.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("click", onClick);
    };
  }, []);

  // Keep the highlighted option visible while arrowing through a long list.
  useEffect(() => {
    if (!open || !active) return;
    document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- optionId only depends on baseId
  }, [open, active]);

  const reset = useCallback(() => {
    setOpen(false);
    // The dialog hands focus back to the trigger. Keyboard users get the focus ring
    // (they need it); for a menu opened by mouse/touch it would just be noise.
    const trigger = triggerRef.current;
    if (openedByPointerRef.current && trigger && document.activeElement === trigger) {
      trigger.blur();
      const options = { preventScroll: true, focusVisible: false }; // focusVisible: Chrome/Firefox
      trigger.focus(options);
    }
    setQuery("");
    setActiveIndex(null);
  }, []);

  const runCommand = useCallback(
    async (command: Command) => {
      // Close first so focus returns to the page before the command moves it.
      dialogRef.current?.close();
      reset();
      setAnnouncement("");
      const message = await command.run();
      if (message) setAnnouncement(message);
    },
    [reset],
  );

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (flat.length === 0) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((highlighted + step + flat.length) % flat.length);
    } else if (event.key === "Enter" && active) {
      event.preventDefault();
      void runCommand(active);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={(event) => {
          // detail is the click count: 0 for keyboard activation (Enter/Space).
          openedByPointerRef.current = event.detail > 0;
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        className="inline-flex size-11 items-center justify-center gap-2 rounded-lg text-text-secondary transition-colors hover:bg-bg-raised hover:text-text-primary lg:h-9 lg:w-auto lg:border lg:border-border-default lg:pr-1.5 lg:pl-3"
      >
        <Search className="size-5 lg:size-4" aria-hidden="true" />
        <span className="sr-only text-sm lg:not-sr-only">Search</span>
        <kbd
          aria-hidden="true"
          className="hidden rounded border border-border-default bg-bg-raised px-1.5 py-0.5 font-mono text-xs text-text-muted lg:inline"
        >
          {shortcut}
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={reset}
        className="command-menu mx-auto mt-[12vh] w-[min(40rem,calc(100%-2rem))] max-w-none bg-transparent p-0 text-text-primary backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[min(32rem,76vh)] flex-col overflow-hidden rounded-(--radius-card) border border-border-strong bg-bg-surface shadow-[0_1.5rem_4rem_rgb(0_0_0/0.35)]">
          <h2 id={titleId} className="sr-only">
            Command menu
          </h2>

          <div className="flex items-center gap-3 border-b border-border-default px-4">
            <Search className="size-5 shrink-0 text-text-muted" aria-hidden="true" />
            <input
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={active ? optionId(active) : undefined}
              aria-label="Search commands"
              placeholder="Type a command or search…"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                // Searching highlights the best match; clearing goes back to the current section.
                setActiveIndex(event.target.value ? 0 : null);
              }}
              onKeyDown={onInputKeyDown}
              className="h-14 w-full bg-transparent text-base text-text-primary placeholder:text-text-muted focus:outline-none"
            />
          </div>

          <div
            id={listId}
            role="listbox"
            aria-label="Commands"
            className="overflow-y-auto overscroll-contain p-2"
          >
            {groups.map(({ group, items }) => (
              <div key={group} role="group" aria-labelledby={`${baseId}-${group}`}>
                <div
                  id={`${baseId}-${group}`}
                  role="presentation"
                  className="px-3 pt-3 pb-1 font-mono text-xs tracking-widest text-text-muted uppercase"
                >
                  {group}
                </div>
                {items.map((command) => {
                  const selected = command === active;
                  const Icon = command.icon;
                  return (
                    // Keyboard selection happens in the combobox (aria-activedescendant), so
                    // options stay out of the tab order and only need a click handler.
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      key={command.id}
                      id={optionId(command)}
                      role="option"
                      tabIndex={-1}
                      aria-selected={selected}
                      onMouseMove={() => {
                        setActiveIndex(flat.indexOf(command));
                      }}
                      onClick={() => void runCommand(command)}
                      className={cn(
                        "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm",
                        selected ? "bg-accent-muted text-text-primary" : "text-text-secondary",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4 shrink-0",
                          selected ? "text-accent" : "text-text-muted",
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex-1">{command.label}</span>
                      {command.id === currentCommandId && (
                        <span className="text-xs text-accent">You&apos;re here</span>
                      )}
                      {command.hint && (
                        <span className="text-xs text-text-muted">{command.hint}</span>
                      )}
                      {selected && (
                        <CornerDownLeft
                          className="size-4 shrink-0 text-text-muted"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
            {flat.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-text-muted">
                No results for “{query}”
              </p>
            )}
          </div>

          <div
            aria-hidden="true"
            className="hidden items-center gap-4 border-t border-border-default px-4 py-2.5 font-mono text-xs text-text-muted sm:flex"
          >
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </div>
      </dialog>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}
