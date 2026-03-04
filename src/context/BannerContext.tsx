import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ACTIVE_BANNER, type BannerConfig } from "@/data/banners";

interface BannerContextValue {
  banner: BannerConfig | null;
  isVisible: boolean;
  bannerHeight: number;
  dismiss: () => void;
  setBannerHeight: (h: number) => void;
}

const BannerContext = createContext<BannerContextValue>({
  banner: null,
  isVisible: false,
  bannerHeight: 0,
  dismiss: () => {},
  setBannerHeight: () => {},
});

export const useBanner = () => useContext(BannerContext);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const banner = ACTIVE_BANNER;

  // Check whether this banner was already dismissed in a previous session
  const wasAlreadyDismissed = (): boolean => {
    if (!banner) return false;
    try {
      return localStorage.getItem(`banner-dismissed-${banner.id}`) === "true";
    } catch {
      return false;
    }
  };

  const [isVisible, setIsVisible] = useState<boolean>(
    () => !!banner && !wasAlreadyDismissed()
  );
  const [bannerHeight, setBannerHeightState] = useState<number>(0);

  const setBannerHeight = useCallback((h: number) => {
    setBannerHeightState(h);
  }, []);

  const dismiss = useCallback(() => {
    if (banner) {
      try {
        localStorage.setItem(`banner-dismissed-${banner.id}`, "true");
      } catch {
        // Private browsing may throw — fail silently
      }
    }
    setIsVisible(false);
  }, [banner]);

  // Keep the CSS custom property in sync so Header and main both react
  useEffect(() => {
    const height = isVisible ? bannerHeight : 0;
    document.documentElement.style.setProperty(
      "--banner-height",
      `${height}px`
    );
  }, [isVisible, bannerHeight]);

  // Reset height immediately when banner disappears
  useEffect(() => {
    if (!isVisible) {
      setBannerHeightState(0);
    }
  }, [isVisible]);

  return (
    <BannerContext.Provider
      value={{ banner, isVisible, bannerHeight, dismiss, setBannerHeight }}
    >
      {children}
    </BannerContext.Provider>
  );
};
