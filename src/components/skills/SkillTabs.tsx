import React from "react";
import type { SkillCategory } from "../../types/portfolio";
import { SKILL_CATEGORIES, ALL_SKILLS } from "../../data/skillsData";
import { MousePointer } from "lucide-react";

interface SkillTabsProps {
  activeCategory: SkillCategory | "All";
  hoveredCategory: SkillCategory | null;
  onSelectCategory: (category: SkillCategory | "All") => void;
  onHoverCategory: (category: SkillCategory | null) => void;
}

export const SkillTabs: React.FC<SkillTabsProps> = ({
  activeCategory,
  hoveredCategory,
  onSelectCategory,
  onHoverCategory,
}) => {
  // Compute counts for each category
  const getCategoryCount = (cat: SkillCategory | "All") => {
    if (cat === "All") return ALL_SKILLS.length;
    return ALL_SKILLS.filter((s) => s.category === cat).length;
  };

  const categories: (SkillCategory | "All")[] = ["All", ...SKILL_CATEGORIES];

  const currentHoveredOrActive = hoveredCategory || (activeCategory !== "All" ? activeCategory : null);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Category Filter Pills with Mouse Hover Trigger */}
      <div className="flex items-center justify-between flex-wrap gap-2.5 sm:gap-3 border-b border-[#4C5840] pb-4 sm:pb-5">
        <div
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none max-w-full"
          onMouseLeave={() => onHoverCategory(null)}
        >
          {categories.map((cat) => {
            const isHovered = hoveredCategory === cat;
            const isSelected = activeCategory === cat;
            const isCurrent = isHovered || isSelected;
            const count = getCategoryCount(cat);

            return (
              <button
                key={cat}
                type="button"
                onMouseEnter={() => onHoverCategory(cat === "All" ? null : cat)}
                onClick={() => {
                  if (activeCategory === cat && cat !== "All") {
                    onSelectCategory("All");
                  } else {
                    onSelectCategory(cat);
                  }
                }}
                className={`group relative shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border select-none ${
                  isCurrent
                    ? "bg-amber text-[#F3F0E7] border-amber shadow-[0_0_20px_rgba(204,85,0,0.35)] scale-105"
                    : "bg-[#262C20]/80 text-[#D8D4C8] border-[#4C5840] hover:text-[#F3F0E7] hover:border-sage hover:bg-[#2E3626]"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors ${
                    isCurrent
                      ? "bg-black/30 text-[#F3F0E7] font-bold"
                      : "bg-black/30 text-sage group-hover:text-[#F3F0E7]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Interaction Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#D8D4C8] bg-[#262C20] px-3.5 py-1.5 rounded-lg border border-[#4C5840]">
          {currentHoveredOrActive ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
              <span className="text-[#F3F0E7] font-semibold">
                Highlighting: <span className="text-amber">{currentHoveredOrActive}</span>
              </span>
            </>
          ) : (
            <>
              <MousePointer className="w-3.5 h-3.5 text-sage animate-bounce" />
              <span className="text-[#D8D4C8]">Hover any category to highlight</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillTabs;
