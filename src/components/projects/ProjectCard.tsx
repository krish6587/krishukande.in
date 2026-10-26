import React from "react";
import type { ProjectItem } from "../../types/portfolio";
import { ExternalLink, Sparkles, Tag } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group relative w-full rounded-2xl sm:rounded-3xl border border-[#1e232c] bg-[#101318]/90 p-5 sm:p-7 lg:p-8 backdrop-blur-md transition-all duration-500 hover:border-accent/40 hover:shadow-[0_12px_45px_-12px_rgba(127,231,196,0.14)]"
      aria-label={`Project: ${project.title}`}
    >
      {/* Subtle ambient hover glow in corner */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
        {/* Project Screenshot Showcase (Left Column on Desktop) */}
        <div className="w-full lg:col-span-7">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/img relative block w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#222732] bg-[#07090c] shadow-lg transition-all duration-500 group-hover:border-accent/35"
          >
            {/* Aspect container with object-contain to avoid any cropping */}
            <div className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center p-2 sm:p-3 bg-[#080a0e]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="eager"
                decoding="async"
                className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
              />

              {/* Ambient bottom gradient overlay for smooth contrast */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080a0e]/70 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Hover pill: Live Preview */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-xs font-semibold text-white opacity-0 translate-y-1 group-hover/img:opacity-100 group-hover/img:translate-y-0 transition-all duration-300 shadow-lg">
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
              </div>
            </div>
          </a>
        </div>

        {/* Project Content / Details Column (Right Column on Desktop) */}
        <div className="flex flex-col gap-3.5 sm:gap-4 lg:col-span-5 w-full">
          {/* Index + Stats Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs text-accent font-semibold tracking-widest uppercase">
              // {numStr} &mdash; PROJECT
            </span>

            {project.stats && project.stats.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {project.stats.map((stat, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[11px] font-semibold"
                  >
                    <Sparkles className="w-3 h-3 text-accent shrink-0" />
                    <span>{stat}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Project Title */}
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              {project.title}
            </a>
          </h3>

          {/* Description */}
          <p className="text-neutral-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Tag className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-[#161a22] border border-[#252b37] text-[11px] font-mono text-neutral-300 hover:border-neutral-500 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-[#06231a] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold shadow-[0_0_18px_rgba(127,231,196,0.22)] transition-all duration-200 hover:bg-[#93edcf] hover:scale-[1.02] active:scale-95 text-center"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#161a22] border border-[#2d3440] text-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 hover:bg-[#1d232e] hover:border-zinc-500 hover:scale-[1.02] active:scale-95 text-center"
            >
              <svg
                className="w-4 h-4 text-zinc-300 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
