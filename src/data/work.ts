export type Project = {
  title: string;
  status: "Live" | "Building" | "Archived";
  summary: string;
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Kinly",
    status: "Building",
    summary:
      "A product workspace for travel, activity discovery, and social planning.",
    stack: ["Go", "Postgres", "Flutter", "Docker"],
  },
  {
    title: "Bike Map Experiments",
    status: "Archived",
    summary:
      "Mapping experiments around routes, terrain, and cycling-friendly exploration.",
    stack: ["JavaScript", "Maps", "Data"],
  },
  {
    title: "Teetas Space",
    status: "Building",
    summary:
      "This site: a personal OS-style portfolio with themed rooms and data-driven pages.",
    stack: ["Astro", "TypeScript", "Tailwind", "Netlify"],
  },
];

export const skills = [
  "Backend systems",
  "Product thinking",
  "API design",
  "Databases",
  "Mobile apps",
  "Frontend craft",
  "AI tooling",
  "Technical writing",
];

export const timeline = [
  {
    period: "Now",
    title: "Building personal products and a sharper public portfolio",
    detail:
      "Focusing on projects that combine product judgment, engineering depth, and good interaction design.",
  },
  {
    period: "Earlier",
    title: "Systems, interviews, and backend fundamentals",
    detail:
      "Practiced Go, C++, system design, databases, testing, and production-style architecture.",
  },
];
