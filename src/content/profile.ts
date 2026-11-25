import type { Profile } from "~/types/content";

export const profile: Profile = {
  name: "Sanskar Kumar",
  title: "Product Engineer",
  subtitle: "Full-stack · React, TypeScript, Go",
  pitch:
    "I build products people enjoy using — owning features from the user problem to the shipped UI and the Go services behind it, with user experience, accessibility and performance treated as features.",
  email: "sanskar.kumar.49@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/simplesanskar49" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sanskar-kumar-a0b8181b0/" },
    { label: "LeetCode", href: "https://leetcode.com/u/Sanskar49/" },
    { label: "Codeforces", href: "https://codeforces.com/profile/Sanskar49" },
    { label: "Topmate", href: "https://topmate.io/simplesanskar49" },
  ],
  // Every number must be traceable to the resume or GitHub history.
  stats: [
    { value: "4+", label: "years shipping production web apps" },
    { value: "5", label: "codebases I'm a code owner of" },
    { value: "10+", label: "features shipped end-to-end" },
    { value: "100k+", label: "users on the platform I build for" },
  ],
};
