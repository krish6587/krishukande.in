import { useState, useEffect } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[60] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#CC5500] via-[#9CAF88] to-[#CC5500] transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(204,85,0,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
