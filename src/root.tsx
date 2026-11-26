import { Analytics } from "@vercel/analytics/react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { ACCENT_INIT_SCRIPT, DEFAULT_ACCENT, faviconHref, ICON_VERSION } from "~/constants/accent";
import { REVEAL_INIT_SCRIPT } from "~/constants/reveal";
import { THEME_COLOR, THEME_INIT_SCRIPT } from "~/constants/theme";
import { useAccentFavicon } from "~/hooks/useAccent";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  // Rendered by scripts/icons.ts; ?v= busts the browser's favicon cache on change.
  // The PNG follows the visitor's accent (useAccentFavicon); /favicon.ico and the
  // Apple icon stay teal for crawlers and home screens.
  { rel: "icon", href: faviconHref(DEFAULT_ACCENT), type: "image/png", sizes: "96x96" },
  { rel: "apple-touch-icon", href: `/apple-touch-icon.png?v=${ICON_VERSION}` },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set before paint by THEME_INIT_SCRIPT, so it may differ from the prerendered value.
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content={THEME_COLOR.dark} />
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_INIT_SCRIPT + ACCENT_INIT_SCRIPT + REVEAL_INIT_SCRIPT,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  useAccentFavicon();
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const title = isNotFound ? "Page not found" : "Something went wrong";
  const details = isNotFound
    ? "The page you are looking for does not exist."
    : import.meta.env.DEV && error instanceof Error
      ? error.message
      : "An unexpected error occurred.";

  return (
    <main id="main" className="mx-auto max-w-(--container-content) px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-text-secondary">{details}</p>
      <a href="/" className="mt-8 inline-block text-accent hover:text-accent-hover">
        ← Back home
      </a>
    </main>
  );
}
