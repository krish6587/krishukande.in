import type { ProjectItem } from "../types/portfolio";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 5,
    title: "TripVault — Travel Itinerary & Group Expense Vault",
    image: "/tripvault.webp",
    thumbnail: "/tripvault.webp",
    stats: ["Smart Travel Vault", "Real-Time Split & Budget"],
    description:
      "An editorial-grade travel planning application designed to organize multi-day itineraries, track and split travel group expenses, manage flights and stays, and securely archive tickets and emergency documents in a unified vault.",
    tags: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
    liveUrl: "https://tripvault-alpha-eight.vercel.app/",
    githubUrl: "https://github.com/krish6587/TripVault",
  },
  {
    id: 1,
    title: "DinkSync — Pickleball Tournament Management",
    image: "/dinksync.webp",
    thumbnail: "/dinksync.webp",
    stats: ["Full-Stack MERN App", "AI-Powered Insights"],
    description:
      "A full-stack web application to simplify and automate pickleball tournament management. Organizers can create tournaments, manage players and teams, configure categories and rules, generate fixtures, track live scores, and view real-time standings — all from one powerful dashboard. Features AI-powered tournament analysis for team performance insights, role-based access control, email OTP verification, and a responsive mobile-friendly interface.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    liveUrl: "https://dinksync-pickleball-management-system-siob.onrender.com/",
    githubUrl: "https://github.com/krish6587/pickleball-management-system",
  },
  {
    id: 3,
    title: "AyuNex — Ayurveda Clinical Trials & Pharmacovigilance",
    image: "/ayunex.webp",
    thumbnail: "/ayunex.webp",
    stats: ["FastAPI + React", "Clinical Trials & RBAC"],
    description:
      "A full-stack platform for managing Ayurveda clinical trials and pharmacovigilance, featuring role-based access control (RBAC), end-to-end study tracking, subject recruitment workflows, regulatory monitoring, safety alerts, and real-time analytical dashboards.",
    tags: ["React.js", "FastAPI", "Python", "PostgreSQL", "REST APIs", "JWT / RBAC", "Render"],
    liveUrl: "https://ayunex-frontend.onrender.com/",
    githubUrl: "https://github.com/krish6587/AyuNex",
  },
  {
    id: 2,
    title: "Data Analyzer — Interactive Dataset & Visualization Tool",
    image: "/data-analyzer.webp",
    thumbnail: "/data-analyzer.webp",
    stats: ["Interactive Analytics", "Chart.js & XLSX"],
    description:
      "A web-based data analysis tool that enables users to upload CSV and Excel files, process datasets, perform basic statistical analysis, and visualize insights through interactive charts.",
    tags: ["HTML", "CSS", "JavaScript", "Chart.js", "PapaParse", "XLSX.js", "Render"],
    liveUrl: "https://data-analyzer-w9t1.onrender.com/",
    githubUrl: "https://github.com/krish6587/Data-Analyzer-",
  },
  {
    id: 4,
    title: "ChessCraft — Modern Real-Time Chess Platform",
    image: "/chesscraft.webp",
    thumbnail: "/chesscraft.webp",
    stats: ["Full-Stack .NET", "Real-Time Chess"],
    description: "Real-time multiplayer chess platform built with .NET 8, React, SignalR, and EF Core, featuring secure authentication, matchmaking, move validation, game replay, and tactical puzzles.",
    tags: [".NET 8", "React", "SignalR", "Entity Framework Core", "ASP.NET Core", "JWT", "WebSockets", "Real-Time Multiplayer"],
    liveUrl: "https://chesscraft-98un.onrender.com/",
    githubUrl: "https://github.com/krish6587/chesscraft"
  }
];



