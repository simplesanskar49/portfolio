/** Decorative backdrop: grid + two soft glows, fading out towards the edges. Parent needs `relative isolate`. */
export function GridBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-grid)_0.0625rem,transparent_0.0625rem),linear-gradient(to_bottom,var(--color-grid)_0.0625rem,transparent_0.0625rem)] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)] bg-size-[3rem_3rem]"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 h-80 w-[min(56rem,100%)] -translate-x-1/2 rounded-full bg-glow blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-24 right-0 -z-10 hidden h-64 w-md rounded-full bg-glow-secondary blur-3xl sm:block"
      />
    </>
  );
}
