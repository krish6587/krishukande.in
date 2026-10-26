import React, { useState, useEffect, useCallback, useRef } from "react";
import { PROJECTS_DATA } from "../../data/projectsData";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Tag,
} from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  const totalProjects = PROJECTS_DATA.length;
  const currentProject = PROJECTS_DATA[currentIndex];

  const goToProject = useCallback(
    (index: number, newDirection?: "left" | "right") => {
      if (isTransitioning || index === currentIndex) return;
      const calculatedDir =
        newDirection || (index > currentIndex ? "right" : "left");
      setDirection(calculatedDir);
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);
    },
    [currentIndex, isTransitioning]
  );

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = (currentIndex - 1 + totalProjects) % totalProjects;
    goToProject(nextIdx, "left");
  }, [currentIndex, totalProjects, goToProject, isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = (currentIndex + 1) % totalProjects;
    goToProject(nextIdx, "right");
  }, [currentIndex, totalProjects, goToProject, isTransitioning]);

  // Keyboard navigation for ArrowLeft and ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const numStr = String(currentIndex + 1).padStart(2, "0");

  return (
    <section
      id="projects"
      className="relative w-full bg-[#353D2C] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-32 overflow-hidden border-t border-[#4C5840]/60"
    >
      {/* ── Subtle Geometric Background Accents ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-15"
        aria-hidden="true"
      >
        <svg
          className="absolute -left-20 top-1/4 w-[500px] h-[500px] text-accent/20 blur-[1px]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="200,40 360,340 40,340"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <polygon
            points="200,90 320,310 80,310"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polygon
            points="200,140 280,280 120,280"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
        <svg
          className="absolute -right-24 bottom-10 w-[450px] h-[450px] text-white/5"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="200,30 370,350 30,350"
            stroke="currentColor"
            strokeWidth="1"
          />
          <polygon
            points="200,110 310,310 90,310"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-6 sm:gap-8">
        {/* ── Section Header & Switcher Tabs ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-sage font-semibold tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
              <span>// 03 &mdash; Selected Works</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F3F0E7] font-sans leading-tight">
              Featured Projects<span className="text-amber">.</span>
            </h2>
          </div>

          {/* Project Switcher Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-[#262C20]/90 border border-[#4C5840] p-1.5 rounded-2xl backdrop-blur-md overflow-x-auto max-w-full scrollbar-none shadow-lg">
            {PROJECTS_DATA.map((p, idx) => {
              const isActive = idx === currentIndex;
              const pNum = String(idx + 1).padStart(2, "0");
              const shortTitle = p.title.split("—")[0].trim();

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goToProject(idx)}
                  className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? "bg-amber text-[#F3F0E7] shadow-[0_0_15px_rgba(204,85,0,0.4)] font-bold scale-[1.02]"
                      : "text-[#D8D4C8] hover:text-[#F3F0E7] hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono">{pNum}</span>
                  <span className="hidden sm:inline">{shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Showcase Carousel with Clean Full-Size Layout ── */}
        <div className="relative w-full">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Project"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#262C20]/95 text-[#F3F0E7] border border-[#4C5840] shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:bg-amber hover:text-[#F3F0E7] hover:border-amber hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Project"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#262C20]/95 text-[#F3F0E7] border border-[#4C5840] shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:bg-amber hover:text-[#F3F0E7] hover:border-amber hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Card Container */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#4C5840] bg-[#2A3123]/95 shadow-2xl backdrop-blur-md"
          >
            {/* Slide Content Grid with Smooth Transition */}
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 xs:p-6 sm:p-7 lg:p-9 items-center transition-all duration-400 ease-out transform ${
                isTransitioning
                  ? direction === "right"
                    ? "opacity-0 -translate-x-6 scale-[0.99]"
                    : "opacity-0 translate-x-6 scale-[0.99]"
                  : "opacity-100 translate-x-0 scale-100"
              }`}
            >
              {/* Left: Clean Full-Size Screenshot (No fake frames/URL bars) */}
              <div className="lg:col-span-7 flex flex-col w-full">
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/img relative block w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#4C5840] bg-[#1E2319] shadow-lg transition-all duration-500 hover:border-amber/40"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center p-2 sm:p-3 bg-[#1B2016]">
                    <img
                      key={currentProject.id}
                      src={currentProject.image}
                      alt={currentProject.title}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
                    />

                    {/* Ambient bottom gradient */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B2016]/70 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity duration-300"
                      aria-hidden="true"
                    />

                    {/* Quick Preview Hover Pill */}
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-xs font-semibold text-white opacity-0 translate-y-1 group-hover/img:opacity-100 group-hover/img:translate-y-0 transition-all duration-300 hover:bg-amber hover:text-[#F3F0E7] hover:border-amber shadow-lg">
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Right: Project Details */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 w-full">
                {/* Number & Highlight Stats */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-sage font-semibold tracking-widest uppercase">
                    // {numStr} &mdash; PROJECT
                  </span>

                  {currentProject.stats && currentProject.stats.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {currentProject.stats.map((stat, idx) => (
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

                {/* Title */}
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-[#F3F0E7] tracking-tight leading-snug">
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber transition-colors duration-200"
                  >
                    {currentProject.title}
                  </a>
                </h3>

                {/* Description */}
                <p className="text-[#D8D4C8] text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-4">
                  {currentProject.description}
                </p>

                {/* Tech Stack Tags */}
                {currentProject.tags && currentProject.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <Tag className="w-3.5 h-3.5 text-sage-dim shrink-0" />
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#20261B] border border-[#4C5840] text-[11px] font-mono text-sage-light hover:border-sage transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber text-[#F3F0E7] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold shadow-[0_0_18px_rgba(204,85,0,0.3)] transition-all duration-200 hover:bg-amber-hover hover:scale-[1.02] active:scale-95 text-center"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#20261B] border border-[#4C5840] text-[#F3F0E7] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 hover:bg-[#2A3323] hover:border-sage hover:scale-[1.02] active:scale-95 text-center"
                  >
                    <svg
                      className="w-4 h-4 text-sage fill-current"
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
          </div>

          {/* ── Navigation Helper Bottom Bar ── */}
          <div className="flex items-center justify-between mt-4 px-2 text-xs font-mono text-zinc-400">
            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {PROJECTS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToProject(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-7 bg-amber shadow-[0_0_10px_rgba(204,85,0,0.6)]"
                      : "w-2 bg-[#4C5840] hover:bg-sage"
                  }`}
                />
              ))}
            </div>

            {/* Keyboard Hint */}
            <div className="hidden sm:flex items-center gap-2 select-none">
              <span>Use</span>
              <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-zinc-700 text-zinc-400">
                &larr;
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-zinc-700 text-zinc-400">
                &rarr;
              </kbd>
              <span>keys to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
