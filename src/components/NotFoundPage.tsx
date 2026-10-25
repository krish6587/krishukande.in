import { ArrowLeft, Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-[100dvh] bg-[#0b0d10] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Big 404 */}
      <h1 className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/[0.03] leading-none select-none tracking-tighter">
        404
      </h1>

      {/* Message */}
      <div className="relative -mt-6 sm:-mt-10 z-10">
        <p className="text-lg sm:text-xl font-bold text-white mb-2">
          Page not found
        </p>
        <p className="text-sm text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            className="btn-glow inline-flex items-center gap-2 rounded-xl bg-accent text-[#06231a] font-bold text-sm px-6 py-3 transition-all duration-200 hover:bg-[#93edcf] hover:scale-[1.02] active:scale-95"
          >
            <Home size={16} />
            Back to Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-[#22262c] text-neutral-300 font-semibold text-sm px-6 py-3 transition-all duration-200 hover:border-neutral-500 hover:text-white hover:bg-white/[0.04] active:scale-95"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="absolute bottom-6 text-xs text-neutral-600 font-mono">
        &copy; 2026 Krish Kumar Ukande
      </p>
    </div>
  );
}
