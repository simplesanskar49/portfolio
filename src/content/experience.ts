import type { ExperienceRole } from "~/types/content";

// Every claim here is traceable to the resume or GitHub PR history.
export const experience: ExperienceRole[] = [
  {
    company: "Armada",
    companyUrl: "https://www.armada.ai/",
    role: "UI Engineer (L2)",
    location: "Trivandrum",
    start: "Sep 2025",
    end: "Present",
    summary:
      "Started on the company's design system; now own full-stack features for internal products used across the business.",
    groups: [
      {
        title: "Design system",
        bullets: [
          "Built core pieces of the company's React + TypeScript component library: Tabs, Dropdown, Table and a DataGrid with sorting, resizable and pinned columns that remember your layout, and row virtualization that keeps 10,000+ rows scrolling smoothly.",
          "Led the move of the flagship management console onto it: 120+ PRs across 90+ screens, then removed the legacy components they replaced.",
          "Made components keyboard- and screen-reader-accessible (WCAG 2.1) and raised the console's test coverage to 80%+.",
        ],
      },
      {
        title: "Engagement Intelligence Platform · full-stack",
        bullets: [
          "Embedded analytics dashboards with server-side role-based access control (RBAC): deny beats allow, group and per-person grants, fails closed. Every team sees exactly what it should.",
          "Built a dashboard registry and admin console (React, Go, Postgres) so teams can add and gate dashboards without a code change.",
          "Built a deployment tracker for customer rollouts: stages, unit quantities, location history, serial numbers and loans, and a full audit trail.",
        ],
      },
      {
        title: "Admin tools & platform services",
        bullets: [
          "Shipped operator workflows in the internal admin console: satellite terminal onboarding and disconnect, SD-WAN device onboarding, activity filters.",
          "Led an audit-logging rollout across 7+ backend services: required notes on sensitive actions and before/after values on every edit.",
          "Hardened delivery and security: JWT signature checks, passwordless database access via managed identity, CVE fixes and CI hardening.",
        ],
      },
    ],
    tech: [
      "React",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Tailwind CSS",
      "Jest",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    company: "IMA Schelling Group",
    companyUrl: "https://www.imaschelling.com/en/",
    role: "Senior Software Developer",
    location: "Hyderabad",
    start: "Aug 2024",
    end: "Jul 2025",
    summary: "First frontend developer on a greenfield product.",
    groups: [
      {
        title: "Highlights",
        bullets: [
          "Turned a legacy codebase into a production-ready, cross-platform web app with React, Zustand, TanStack Query and TanStack Router.",
          "Delivered 20+ features with cross-functional teams, improving UI responsiveness by 30% and cutting design rework through early stakeholder alignment.",
          "Promoted for initiative and ownership; mentored 2 junior developers and introduced code review and Vitest testing practices.",
        ],
      },
    ],
    tech: ["React", "TypeScript", "Zustand", "TanStack Query", "TanStack Router", "Vitest"],
  },
  {
    company: "Zaggle",
    companyUrl: "https://www.zaggle.in/",
    role: "Software Engineer",
    location: "Hyderabad",
    start: "Feb 2022",
    end: "Jul 2024",
    summary:
      "Fintech products for enterprise clients, plus a public rewards platform for a government transport department.",
    groups: [
      {
        title: "Highlights",
        bullets: [
          "Designed and built features for a corporate credit card platform, making expense management and financial tracking simpler for corporate clients.",
          "Led a cross-functional team building a Next.js invoice and contract automation tool: fully responsive, and a 40% efficiency gain for 100+ enterprise clients.",
          "Spearheaded a mobile-first rewards website for a state government transport department, bringing transparency to the programme, with strong stakeholder feedback and higher user adoption.",
        ],
      },
    ],
    tech: ["React", "TypeScript", "Next.js", "Redux Toolkit", "Redux Saga", "Material UI"],
  },
];
