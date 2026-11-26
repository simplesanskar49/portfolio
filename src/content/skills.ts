import type { SkillGroup } from "~/types/content";

export const skills: SkillGroup[] = [
  { title: "Languages", skills: ["TypeScript", "JavaScript", "Go", "SQL", "C++"] },
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Sass",
      "Material UI",
      "Redux Toolkit",
      "Redux Saga",
      "Zustand",
      "TanStack Query",
      "TanStack Router",
    ],
  },
  {
    title: "Design systems & accessibility",
    skills: [
      "Component libraries",
      "Atomic Design",
      "Storybook",
      "WCAG 2.1",
      "ARIA",
      "Figma to code",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Go REST services",
      "PostgreSQL",
      "Database migrations",
      "JWT auth",
      "Access control design",
      "RBAC",
    ],
  },
  {
    title: "Data & analytics",
    skills: ["Embedded analytics", "Omni", "Power BI", "StarRocks", "Coralogix"],
  },
  {
    title: "Testing & quality",
    skills: [
      "Jest",
      "Vitest",
      "React Testing Library",
      "Playwright",
      "ESLint",
      "Lighthouse",
      "Core Web Vitals",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "Helm",
      "Argo CD",
      "Azure",
      "Cloudflare Workers",
    ],
  },
  { title: "Mobile & AI", skills: ["React Native", "Expo", "Gemini API"] },
];
