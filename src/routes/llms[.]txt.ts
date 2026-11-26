import { buildLlmsTxt } from "~/utils/seo";

export function loader() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
