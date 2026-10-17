export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Databases"
  | "Cloud"
  | "Other";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  isWorkStack?: boolean;
  level?: string;
  iconName?: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  image: string;
  thumbnail: string;
  stats: string[];
  description: string;
  tags?: string[];
  liveUrl: string;
  githubUrl: string;
}
