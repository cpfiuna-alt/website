
import { format } from 'date-fns';
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
