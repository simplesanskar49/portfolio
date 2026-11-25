import type { Achievement } from "~/types/content";

// Coding numbers and ranks come from the resume; Topmate figures from the public profile.
export const achievements: Achievement[] = [
  {
    value: "1000+",
    label: "problems solved on LeetCode",
    detail: "Max contest rating 1474 · global rank 2941 of 9k+ in Biweekly Contest 49",
    link: { label: "LeetCode profile", href: "https://leetcode.com/u/Sanskar49/" },
  },
  {
    value: "1310",
    label: "max rating on Codeforces",
    detail: "Global rank 1739 of 12k+ in Round 725 · 3066 of 13k+ in Round 719",
    link: { label: "Codeforces profile", href: "https://codeforces.com/profile/Sanskar49" },
  },
  {
    value: "9",
    label: "testimonials as a Topmate mentor",
    detail: "Rated 4.9 · mock interviews and career guidance for engineers",
    link: { label: "Topmate profile", href: "https://topmate.io/simplesanskar49" },
  },
];
