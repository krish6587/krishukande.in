import React, { useState } from "react";
import type { SkillCategory } from "../../types/portfolio";
import { ALL_SKILLS } from "../../data/skillsData";
import { SkillCard } from "./SkillCard";
import { SkillTabs } from "./SkillTabs";

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");
  const [hoveredCategory, setHoveredCategory] = useState<SkillCategory | null>(null);

  // Active target category is either the one currently hovered or the one locked via click
  const currentCategory = hoveredCategory || (activeCategory !== "All" ? activeCategory : null);

  return (
    <section
      id="skills"
      className="relative min-h-[600px] w-full bg-[#353D2C] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* ── Decorative Background: Faded Concentric Circles SVG ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg
          className="absolute -right-32 -top-20 w-[650px] h-[650px] text-sage/25 blur-[1px]"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="210" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="300" cy="300" r="70" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg
          className="absolute -left-40 bottom-10 w-[500px] h-[500px] text-amber/20"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="170" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-6 sm:gap-9">
        {/* Section Header */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Small Label Above Heading */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-sage font-semibold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber animate-ping" />
            <span>02 &mdash; Toolkit &amp; Skills</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F3F0E7] font-sans leading-tight">
            I can Design, Develop, Deploy<span className="text-amber">.</span>
          </h2>

          {/* Short intro paragraph */}
          <p className="text-[#D8D4C8] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mt-1">
            Explore my development toolkit. Hover over any category below to highlight my skills across the stack.
          </p>
        </div>

        {/* Hover / Click Category Tabs */}
        <SkillTabs
          activeCategory={activeCategory}
          hoveredCategory={hoveredCategory}
          onSelectCategory={setActiveCategory}
          onHoverCategory={setHoveredCategory}
        />

        {/* Grid of ALL Skills with responsive columns and underline highlighting */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 pt-1 sm:pt-2">
          {ALL_SKILLS.map((skill, index) => {
            const isMatch = currentCategory !== null && skill.category === currentCategory;
            const isDimmed = currentCategory !== null && !isMatch;

            return (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                isHighlighted={isMatch}
                isDimmed={isDimmed}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
