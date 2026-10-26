import React from "react";
import type { ProjectItem } from "../../types/portfolio";
import { ExternalLink, Sparkles, Tag } from "lucide-react";

interface ProjectDetailsProps {
  project: ProjectItem;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Title + Stats Row */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs text-sage font-semibold tracking-wider uppercase">
            PROJECT 0{project.id}
          </span>
          {project.stats && project.stats.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {project.stats.map((stat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sage/15 border border-sage/30 text-sage text-[11px] font-semibold"
                >
                  <Sparkles className="w-3 h-3 text-sage shrink-0" />
                  <span>{stat}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F3F0E7] tracking-tight leading-snug">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber transition-colors duration-200"
          >
            {project.title}
          </a>
        </h3>
      </div>

      <p className="text-[#D8D4C8] text-sm sm:text-base leading-relaxed">
        {project.description}
      </p>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <Tag className="w-3.5 h-3.5 text-sage-dim shrink-0" />
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-[#20261B] border border-[#4C5840] text-[11px] font-mono text-sage-light hover:border-sage transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-amber text-[#F3F0E7] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold shadow-[0_0_18px_rgba(204,85,0,0.3)] transition-all duration-200 hover:bg-amber-hover hover:scale-[1.02] active:scale-95"
        >
          <span>Live Preview</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#20261B] border border-[#4C5840] text-[#F3F0E7] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 hover:bg-[#2A3323] hover:border-sage hover:scale-[1.02] active:scale-95"
        >
          <svg className="w-4 h-4 text-sage fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;
