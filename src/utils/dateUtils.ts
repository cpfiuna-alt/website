
import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format a date with Spanish locale
 * @param date Date to format
 * @param formatString Format string (date-fns format)
 * @returns Formatted date string
 */
export const formatDateEs = (date: Date | number | string, formatString: string): string => {
  try {
    // Handle case where date is already a Date object but invalid
    if (date instanceof Date && isNaN(date.getTime())) {
      return 'Fecha desconocida';
    }
    
    const dateObj = new Date(date);
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Fecha desconocida';
    }
    return format(dateObj, formatString, { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Fecha desconocida';
  }
};

/**
 * Parse a date string in a few common formats and return a Date or null.
 * Tries native Date constructor first, then common formats like dd-MM-yyyy and yyyy-MM-dd.
 */
export const parseDateString = (dateStr?: string | null): Date | null => {
  if (!dateStr) return null;

  // Try native parsing first
  const native = new Date(dateStr);
  if (!isNaN(native.getTime())) return native;

  // Try common explicit formats
  const formats = ['dd-MM-yyyy', 'yyyy-MM-dd', 'MM-dd-yyyy'];
  for (const fmt of formats) {
    try {
      const parsed = parse(dateStr, fmt, new Date());
      if (isValid(parsed)) return parsed;
    } catch (e) {
      // continue
    }
  }

  return null;
};

/**
 * Format a date in standard Spanish format (d 'de' MMMM, yyyy)
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatSpanishDate = (date: Date | number | string): string => {
  return formatDateEs(date, "d 'de' MMMM, yyyy");
};

/**
 * Format a date for events display
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatEventDate = (date: Date | number | string): string => {
  return formatDateEs(date, "EEEE, d 'de' MMMM, yyyy");
};
