import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function StickyNavbar() {
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      /* Show navbar after scrolling past 80% of viewport height */
      setShow(scrollY > window.innerHeight * 0.8);

      const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));

      /* If scrolled to the very bottom of the page, activate contact */
      const isAtBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      /* Check which section is currently active relative to the sticky navbar */
      const navbarOffset = 140;
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // If top of the section is at or above the navbarOffset and bottom is below it
        if (rect.top <= navbarOffset && rect.bottom > navbarOffset) {
          current = id;
          break;
        }
      }

      // Fallback: check section closest above the viewport cutoff
      if (!current) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= navbarOffset + 80) {
              current = sectionIds[i];
              break;
            }
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="bg-[#262C20]/90 backdrop-blur-xl border-b border-[#4C5840]/50 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between h-14 sm:h-16">
          {/* Logo / Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("");
            }}
            className="text-[#F3F0E7] font-bold text-sm sm:text-base tracking-tight hover:text-amber transition-colors"
          >
            Krish<span className="text-amber">.</span>
          </a>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveSection(id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-amber bg-amber/[0.12]"
                      : "text-neutral-300 hover:text-[#F3F0E7] hover:bg-white/[0.05]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-amber shadow-[0_0_8px_rgba(204,85,0,0.6)]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => setActiveSection("contact")}
            className="hidden sm:inline-flex items-center rounded-lg bg-amber text-[#F3F0E7] text-xs font-bold px-4 py-1.5 transition-all duration-200 hover:bg-amber-hover shadow-[0_0_12px_rgba(204,85,0,0.25)]"
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
