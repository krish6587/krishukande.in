import React, { useState } from "react";
import type { ProjectItem } from "../../types/portfolio";
import { ExternalLink } from "lucide-react";

interface ProjectPreviewProps {
  project: ProjectItem;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-[#4C5840] bg-[#1E2319] shadow-xl transition-all duration-500 hover:border-amber/50">
      {/* Main Image Container without fake frames */}
      <div className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center p-2 sm:p-3 bg-[#1B2016]">
        {/* Skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#20261B] via-[#2A3323] to-[#20261B]" />
        )}

        <img
          key={project.id}
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-contain object-center transition-all duration-700 ease-out group-hover:scale-[1.02] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Ambient overlay gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B2016]/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

        {/* Quick hover badge */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-xs font-semibold text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber hover:text-[#F3F0E7] hover:border-amber shadow-lg"
        >
          <span>Live Preview</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber" />
        </a>
      </div>
    </div>
  );
};

export default ProjectPreview;
