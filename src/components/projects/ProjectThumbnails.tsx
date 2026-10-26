import React from "react";
import type { ProjectItem } from "../../types/portfolio";

interface ProjectThumbnailsProps {
  projects: ProjectItem[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export const ProjectThumbnails: React.FC<ProjectThumbnailsProps> = ({
  projects,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
          Projects List ({projects.length})
        </span>
        <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
          Use &larr; &rarr; or &uarr; &darr; keys
        </span>
      </div>

      {/* Grid of 8 numbered thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
        {projects.map((p, idx) => {
          const isSelected = p.id === selectedId;
          const numStr = String(idx + 1).padStart(2, "0");

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              aria-label={`Select Project ${idx + 1}: ${p.title}`}
              className={`group relative flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer select-none ${
                isSelected
                  ? "bg-[#2E3626] border-amber shadow-[0_0_20px_rgba(204,85,0,0.25)] translate-x-1"
                  : "bg-[#242A1F]/80 border-[#4C5840] hover:border-sage hover:bg-[#2C3425] hover:translate-x-0.5"
              }`}
            >
              {/* Thumbnail Image */}
              <div className="relative h-12 w-14 sm:w-16 shrink-0 overflow-hidden rounded-lg bg-black/40 border border-white/5">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    isSelected ? "scale-110" : "opacity-75 group-hover:scale-105 group-hover:opacity-100"
                  }`}
                />
                {/* Number overlay */}
                <div
                  className={`absolute top-0.5 left-0.5 px-1 rounded text-[10px] font-mono font-bold ${
                    isSelected
                      ? "bg-amber text-[#F3F0E7]"
                      : "bg-black/75 text-zinc-300 group-hover:text-white"
                  }`}
                >
                  {numStr}
                </div>
              </div>

              {/* Title & snippet */}
              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className={`text-xs font-semibold truncate transition-colors duration-200 ${
                    isSelected ? "text-amber font-bold" : "text-[#F3F0E7] group-hover:text-amber"
                  }`}
                >
                  {p.title.split("—")[0].trim() || `Project ${idx + 1}`}
                </span>
                <span className="text-[11px] text-sage truncate mt-0.5">
                  {p.stats[0] || "Featured Build"}
                </span>
              </div>

              {/* Active Indicator Bar */}
              {isSelected && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-amber animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectThumbnails;
