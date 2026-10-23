import React from "react";
import type { SkillItem } from "../../types/portfolio";
import { getSkillIcon } from "../icons/TechIcons";

interface SkillCardProps {
  skill: SkillItem;
  index?: number;
  isHighlighted?: boolean;
  isDimmed?: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  index = 0,
  isHighlighted = false,
  isDimmed = false,
}) => {
  const IconComponent = getSkillIcon(skill.name);

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Skill: ${skill.name} (${skill.category})`}
      style={{
        animationDelay: `${(index % 16) * 35}ms`,
      }}
      className={`group flex flex-col justify-between select-none transition-all duration-200 cursor-pointer py-2 px-1 ${
        isHighlighted
          ? "opacity-100 z-10"
          : isDimmed
          ? "opacity-25 grayscale"
          : "opacity-85 hover:opacity-100"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-5 h-5 shrink-0 flex items-center justify-center">
            <IconComponent
              className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                isHighlighted
                  ? "text-amber"
                  : isDimmed
                  ? "text-[#4C5840]"
                  : "text-sage group-hover:text-amber"
              }`}
            />
          </div>
          <span
            className={`text-base sm:text-lg font-medium tracking-tight truncate transition-colors duration-200 ${
              isHighlighted
                ? "text-amber font-semibold"
                : "text-[#F3F0E7] group-hover:text-amber"
            }`}
          >
            {skill.name}
          </span>
        </div>

        <span
          className={`text-[11px] font-mono shrink-0 transition-colors duration-200 ${
            isHighlighted
              ? "text-amber"
              : "text-sage-dim group-hover:text-sage"
          }`}
        >
          {skill.category}
        </span>
      </div>

      {/* Underline */}
      <div
        className={`mt-2.5 h-[2px] w-full transition-all duration-300 rounded-full ${
          isHighlighted
            ? "bg-amber shadow-[0_0_8px_rgba(204,85,0,0.8)]"
            : "bg-[#4C5840] group-hover:bg-amber"
        }`}
      />
    </div>
  );
};

export default SkillCard;
