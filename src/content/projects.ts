import type { Project } from "~/types/content";

// Work projects are described generically: no internal names, customers, URLs or data.
export const projects: Project[] = [
  {
    title: "Dashboard registry & access control",
    context: "Armada",
    problem:
      "Every team needed to see exactly the dashboards meant for them, and adding or re-gating one meant a code change and a deploy.",
    built:
      "A database-backed registry with an admin console, plus server-side role-based access control (RBAC): deny beats allow, group or per-person grants, and anything unknown fails closed.",
    outcome: "Admins add and gate dashboards themselves, and access is enforced on the server.",
    stack: ["React", "TypeScript", "Go", "PostgreSQL", "Microsoft Entra ID"],
    links: [],
  },
  {
    title: "Deployment tracker",
    context: "Armada",
    problem: "Teams running customer deployments needed one place to follow each rollout.",
    built:
      "Stage-by-stage tracking with unit quantities, location history on a map, serial numbers with per-unit loans, and a full audit trail of every change.",
    outcome: "Each deployment's status, hardware and history are visible in one screen.",
    stack: ["React", "TypeScript", "Go", "PostgreSQL", "Google Maps"],
    links: [],
  },
  {
    title: "Design-system DataGrid",
    context: "Armada",
    problem: "Every product screen rebuilt tables slightly differently.",
    built:
      "A shared DataGrid with sorting (incl. date-time), resizable and pinned columns that remember your layout, row virtualization that keeps 10,000+ rows scrolling smoothly, and accessible keyboard behaviour.",
    outcome: "Rolled out across 90+ screens of the flagship console, replacing one-off tables.",
    stack: ["React", "TypeScript", "Storybook", "Jest"],
    links: [],
  },
  {
    title: "Trip Advisor",
    context: "Personal",
    problem: "Planning a trip means juggling dozens of tabs.",
    built:
      "An AI travel planner app: describe a trip and get a day-by-day itinerary you can refine, see saved trips on a map, and share a trip as a poster image.",
    outcome: "Android app plus a live API, with CI and tests.",
    stack: ["React Native", "Expo", "Cloudflare Workers", "Gemini", "TypeScript"],
    links: [{ label: "GitHub", href: "https://github.com/simplesanskar49/Trip-Advisor" }],
  },
];
