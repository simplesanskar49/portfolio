import type { About } from "~/types/content";

export const about: About = {
  paragraphs: [
    "I'm a product engineer: I start from what the user is trying to get done, then build whatever it takes to get them there — the interface, the API, the data model.",
    "I began on fintech platforms at Zaggle, was the first frontend hire on a greenfield product at IMA Schelling Group, and at Armada I've gone from building the company's shared component library to owning features end-to-end — React on the front, Go and Postgres behind it — working directly with the people who use them.",
    "User experience is the thread through all of it: interfaces that feel fast and obvious, components anyone can use with a keyboard or screen reader, and the parts users never see but always feel — tests, dependency hygiene and access control that fails closed.",
  ],
  facts: [
    { label: "Based in", value: "Trivandrum, India" },
    {
      label: "Education",
      value:
        "B.Tech, Information Technology — RCC Institute of Information Technology, Kolkata (2018–2022)",
    },
    { label: "Mentoring", value: "Mock interviews and career guidance on Topmate" },
    { label: "Problem solving", value: "1000+ LeetCode problems · Codeforces max rating 1310" },
  ],
};
