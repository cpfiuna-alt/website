/**
 * ───────────────────────────────────────────────
 *  BANNER CONFIGURATION
 * ───────────────────────────────────────────────
 *  To show a banner:  set ACTIVE_BANNER to a BannerConfig object.
 *  To hide it:        set ACTIVE_BANNER to null.
 *
 *  The `id` field is used as the localStorage key for dismissal;
 *  change it when you want the banner to reappear even for users
 *  who dismissed a previous one.
 * ───────────────────────────────────────────────
 */

export type BannerType = "info" | "warning" | "success";

export interface BannerConfig {
  /** Unique key — change to force the banner to reappear after a previous dismiss */
  id: string;
  /** Main message text (Spanish) */
  message: string;
  /** Visual style */
  type: BannerType;
  /** Optional call-to-action link */
  link?: {
    href: string;
    label: string;
  };
  /** Whether the user can dismiss the banner */
  dismissible: boolean;
}

// ╔══════════════════════════════════════════════════════════════════════╗
// ║  🚩  BANNER ON/OFF SWITCH                                            ║
// ║  Set to `null` to hide the banner completely site-wide.              ║
// ╚══════════════════════════════════════════════════════════════════════╝
export const ACTIVE_BANNER: BannerConfig | null = {
  id: "admisiones-2026",   // ← bump this ID to reset dismissals for returning users
  message: "¡Las admisiones al </cpf> del 2026 están abiertas!",
  type: "info",              // "info" | "warning" | "success"
  link: {
    href: "/admision",
    label: "Unite",
  },

  // ┌──────────────────────────────────────────────────────────────────┐
  // │  🔒  DISMISSABLE TOGGLE                                          │
  // │  true  → shows an ✕ button; choice is saved in localStorage      │
  // │  false → no ✕; banner stays until YOU set ACTIVE_BANNER = null   │
  // └──────────────────────────────────────────────────────────────────┘
  dismissible: false,
};
