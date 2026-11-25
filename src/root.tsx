import { Analytics } from "@vercel/analytics/react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.ico" }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0f12" />
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
