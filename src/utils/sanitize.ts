/**
 * Input Sanitization Utilities
 * Prevents XSS, SQL injection, and other malicious inputs
 */

/**
 * Sanitize text input by removing HTML tags and dangerous characters
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script injection attempts
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Limit length to prevent DoS
    .slice(0, 1000);
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';
  
  return email
    .trim()
    .toLowerCase()
    // Remove any characters that shouldn't be in an email
    .replace(/[^a-z0-9@._+-]/g, '')
    .slice(0, 254); // Max email length per RFC 5321
}

/**
 * Sanitize phone number (Paraguay format)
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return '';
  
  // Keep only digits, spaces, +, and dashes
  return phone
    .trim()
    .replace(/[^\d\s+()-]/g, '')
    .slice(0, 20);
}

/**
 * Sanitize URL input
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.toString().slice(0, 500);
  } catch {
    return '';
  }
}

/**
 * Validate and sanitize common form inputs
 */
export interface SanitizedFormData {
  [key: string]: string;
}

export function sanitizeFormData(data: Record<string, unknown>): SanitizedFormData {
  const sanitized: SanitizedFormData = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Apply appropriate sanitization based on field name
      if (key.toLowerCase().includes('email')) {
        sanitized[key] = sanitizeEmail(value);
      } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('telefono')) {
        sanitized[key] = sanitizePhone(value);
      } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('website')) {
        sanitized[key] = sanitizeUrl(value);
      } else {
        sanitized[key] = sanitizeText(value);
      }
    }
  }
  
  return sanitized;
}

/**
 * Check for common spam patterns
 */
export function containsSpamPatterns(text: string): boolean {
  const spamPatterns = [
    /viagra|cialis|pharmacy/gi,
    /\bcasino\b/gi,
    /\blottery\b/gi,
    /\bwin\s+money\b/gi,
    /\bclick\s+here\b/gi,
    /http.*http.*http/gi, // Multiple URLs
    /<a\s+href/gi, // HTML links
  ];
  
  return spamPatterns.some(pattern => pattern.test(text));
}

/**
 * Validate text length
 */
export function validateLength(
  text: string,
  min: number = 1,
  max: number = 5000
): { valid: boolean; message?: string } {
  const length = text.trim().length;
  
  if (length < min) {
    return {
      valid: false,
      message: `El texto debe tener al menos ${min} caracteres`,
    };
  }
  
  if (length > max) {
    return {
      valid: false,
      message: `El texto no puede exceder ${max} caracteres`,
    };
  }
  
  return { valid: true };
}
