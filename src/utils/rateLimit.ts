/**
 * Rate Limiting Utilities
 * Client-side rate limiting to prevent form spam and abuse
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

const STORAGE_PREFIX = 'rateLimit_';
const DEFAULT_BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

/**
 * Check if an action is rate limited
 * @param key - Unique identifier for the action (e.g., 'contact_form', 'admission_form')
 * @param config - Rate limit configuration
 * @returns Object with allowed status and remaining attempts
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): {
  allowed: boolean;
  remainingAttempts: number;
  resetTime?: number;
  message?: string;
} {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  const now = Date.now();
  const blockDuration = config.blockDurationMs || DEFAULT_BLOCK_DURATION;

  try {
    const stored = localStorage.getItem(storageKey);
    let entry: RateLimitEntry;

    if (stored) {
      entry = JSON.parse(stored);

      // Check if we're still in the time window
      const timeSinceFirst = now - entry.firstAttempt;

      if (timeSinceFirst > config.windowMs) {
        // Window has passed, reset counter
        entry = {
          count: 0,
          firstAttempt: now,
          lastAttempt: now,
        };
      } else if (entry.count >= config.maxAttempts) {
        // User is blocked
        const blockEndsAt = entry.lastAttempt + blockDuration;
        const timeRemaining = blockEndsAt - now;

        if (timeRemaining > 0) {
          return {
            allowed: false,
            remainingAttempts: 0,
            resetTime: blockEndsAt,
            message: `Has excedido el límite de intentos. Intenta de nuevo en ${Math.ceil(timeRemaining / 60000)} minutos.`,
          };
        } else {
          // Block period has expired, reset
          entry = {
            count: 0,
            firstAttempt: now,
            lastAttempt: now,
          };
        }
      }
    } else {
      // First attempt
      entry = {
        count: 0,
        firstAttempt: now,
        lastAttempt: now,
      };
    }

    const remainingAttempts = config.maxAttempts - entry.count;

    return {
      allowed: true,
      remainingAttempts,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Fail open - allow the request if there's an error
    return {
      allowed: true,
      remainingAttempts: config.maxAttempts,
    };
  }
}

/**
 * Record an attempt
 * @param key - Unique identifier for the action
 */
export function recordAttempt(key: string): void {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  const now = Date.now();

  try {
    const stored = localStorage.getItem(storageKey);
    let entry: RateLimitEntry;

    if (stored) {
      entry = JSON.parse(stored);
      entry.count += 1;
      entry.lastAttempt = now;
    } else {
      entry = {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
      };
    }

    localStorage.setItem(storageKey, JSON.stringify(entry));
  } catch (error) {
    console.error('Failed to record attempt:', error);
  }
}

/**
 * Reset rate limit for a key (useful after successful operations)
 * @param key - Unique identifier for the action
 */
export function resetRateLimit(key: string): void {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Failed to reset rate limit:', error);
  }
}

/**
 * Get rate limit info for display
 * @param key - Unique identifier for the action
 * @param config - Rate limit configuration
 */
export function getRateLimitInfo(
  key: string,
  config: RateLimitConfig
): {
  attempts: number;
  maxAttempts: number;
  resetTime?: number;
} {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  const now = Date.now();

  try {
    const stored = localStorage.getItem(storageKey);

    if (!stored) {
      return {
        attempts: 0,
        maxAttempts: config.maxAttempts,
      };
    }

    const entry: RateLimitEntry = JSON.parse(stored);
    const timeSinceFirst = now - entry.firstAttempt;

    if (timeSinceFirst > config.windowMs) {
      return {
        attempts: 0,
        maxAttempts: config.maxAttempts,
      };
    }

    return {
      attempts: entry.count,
      maxAttempts: config.maxAttempts,
      resetTime: entry.firstAttempt + config.windowMs,
    };
  } catch (error) {
    console.error('Failed to get rate limit info:', error);
    return {
      attempts: 0,
      maxAttempts: config.maxAttempts,
    };
  }
}

/**
 * Common rate limit configurations
 */
export const rateLimitConfigs = {
  // Contact form: 3 attempts per 15 minutes
  contactForm: {
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000,
    blockDurationMs: 30 * 60 * 1000, // 30 min block
  },
  // Admission form: 2 attempts per hour (more restrictive)
  admissionForm: {
    maxAttempts: 2,
    windowMs: 60 * 60 * 1000,
    blockDurationMs: 60 * 60 * 1000, // 1 hour block
  },
  // Newsletter: 5 attempts per 30 minutes
  newsletter: {
    maxAttempts: 5,
    windowMs: 30 * 60 * 1000,
    blockDurationMs: 60 * 60 * 1000, // 1 hour block
  },
};
