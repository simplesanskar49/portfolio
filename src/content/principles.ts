import type { Principle } from "~/types/content";

// Each principle is backed by real work described in Experience and Projects.
export const principles: Principle[] = [
  {
    title: "Start from the person, not the ticket",
    detail:
      "I work directly with the people who use what I build. Features like per-deployment stage ordering came from a user telling me what slowed them down.",
  },
  {
    title: "Fail closed",
    detail:
      "Access control denies by default: deny beats allow, and anything unknown gets no access.",
  },
  {
    title: "Settle the hard parts before the first draft",
    detail:
      "Permissions, write paths and failure modes get decided up front, so reviews are about the code, not surprises.",
  },
  {
    title: "Accessibility and speed are features",
    detail:
      "Keyboard and screen-reader support are built in, and the DataGrid stays smooth at 10,000+ rows because only the visible rows render.",
  },
  {
    title: "One source of truth",
    detail: "The backend owns derived data and the UI displays it, so the two never disagree.",
  },
  {
    title: "Ship it measurable",
    detail:
      "Dashboards and analytics go out with the feature, so we know whether it actually worked.",
  },
];
