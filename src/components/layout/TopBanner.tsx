import React, { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { useBanner } from "@/context/BannerContext";
import { Link } from "react-router-dom";

const typeStyles: Record<string, string> = {
  info: "bg-primary text-primary-foreground",
  warning: "bg-yellow-500 text-white",
  success: "bg-green-600 text-white",
};

const TopBanner: React.FC = () => {
  const { banner, isVisible, dismiss, setBannerHeight } = useBanner();
  const ref = useRef<HTMLDivElement>(null);

  // Measure actual banner height (handles multi-line wrap on small screens)
  useEffect(() => {
    if (!ref.current || !isVisible) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height ?? 0;
      // Add vertical padding to contentRect height
      const el = ref.current;
      if (el) {
        setBannerHeight(el.offsetHeight);
      }
    });

    observer.observe(ref.current);
    // Set initial height right away
    setBannerHeight(ref.current.offsetHeight);

    return () => observer.disconnect();
  }, [isVisible, setBannerHeight]);

  if (!banner || !isVisible) return null;

  const isInternalLink =
    banner.link && !banner.link.href.startsWith("http");

  return (
    <div
      ref={ref}
      className={`banner-strip fixed top-0 left-0 w-full z-[60] flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-all duration-300 ${typeStyles[banner.type] ?? typeStyles.info}`}
      role="banner"
      aria-live="polite"
    >
      {/*
        Inner wrapper: flex-wrap so text + CTA wrap to a second line on small screens
        instead of overflowing. pr-7 reserves space so text never slides under the X button.
      */}
      <div className={`flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 leading-snug text-center${banner.dismissible ? ' pr-7' : ''}`}>
        <span>{banner.message}</span>

        {/* CTA link */}
        {banner.link && (
          <>
            <span className="opacity-60">·</span>
            {isInternalLink ? (
              <Link
                to={banner.link.href}
                className="underline underline-offset-2 hover:opacity-80 font-semibold whitespace-nowrap transition-opacity"
              >
                {banner.link.label}
              </Link>
            ) : (
              <a
                href={banner.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80 font-semibold whitespace-nowrap transition-opacity"
              >
                {banner.link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </>
        )}
      </div>

      {/* Dismiss button — anchored to the right, never shifts content */}
      {banner.dismissible && (
        <button
          onClick={dismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded hover:opacity-70 transition-opacity"
          aria-label="Cerrar banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default TopBanner;
