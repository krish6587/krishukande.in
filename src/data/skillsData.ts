import type { SkillItem, SkillCategory } from "../types/portfolio";

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "DevOps",
  "Databases",
  "Cloud",
  "Other",
];

export const ALL_SKILLS: SkillItem[] = [
  // Frontend
  { id: "ts", name: "TypeScript", category: "Frontend", isWorkStack: true },
  { id: "js", name: "JavaScript", category: "Frontend", isWorkStack: true },
  { id: "next", name: "Next.js", category: "Frontend", isWorkStack: true },
  { id: "react", name: "React", category: "Frontend", isWorkStack: true },
  { id: "html", name: "HTML", category: "Frontend", isWorkStack: false },
  { id: "css", name: "CSS", category: "Frontend", isWorkStack: false },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", isWorkStack: true },

  // Backend
  { id: "python", name: "Python", category: "Backend", isWorkStack: true },
  { id: "java", name: "Java", category: "Backend", isWorkStack: true },
  { id: "node", name: "Node.js", category: "Backend", isWorkStack: true },
  { id: "express", name: "Express.js", category: "Backend", isWorkStack: true },
  { id: "rest", name: "REST APIs", category: "Backend", isWorkStack: true },
  { id: "fastapi", name: "FastAPI", category: "Backend", isWorkStack: true },

  // DevOps
  { id: "docker", name: "Docker", category: "DevOps", isWorkStack: true },
  { id: "git", name: "Git & GitHub", category: "DevOps", isWorkStack: true },

  // Databases
  { id: "mongo", name: "MongoDB", category: "Databases", isWorkStack: true },
  { id: "mysql", name: "MySQL", category: "Databases", isWorkStack: false },
  { id: "postgres", name: "PostgreSQL", category: "Databases", isWorkStack: true },
  { id: "sqlite", name: "SQLite", category: "Databases", isWorkStack: false },
  { id: "firebase", name: "Firebase", category: "Databases", isWorkStack: true },

  // Cloud
  { id: "vercel", name: "Vercel", category: "Cloud", isWorkStack: true },

  // Other
  { id: "cpp", name: "C/C++", category: "Other", isWorkStack: false },
  { id: "rn", name: "React Native", category: "Other", isWorkStack: true },
  { id: "microservices", name: "Microservices", category: "Other", isWorkStack: false },
  { id: "serverless", name: "Serverless", category: "Other", isWorkStack: false },
];
