
// Function to parse date string (single date or range)
export function parseDateString(dateString: string): { startDate: Date; endDate?: Date; isRange: boolean } {
  const trimmed = dateString.trim();
  
  // Function to parse a date string avoiding timezone issues
  const parseDate = (dateStr: string): Date => {
    // If it's a YYYY-MM-DD format, parse it manually to avoid timezone issues
    const isoDateMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoDateMatch) {
      const [, year, month, day] = isoDateMatch;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    // For other formats, use regular Date constructor
    return new Date(dateStr);
  };
  
  // Check if it's a range (contains "to", "-", or "–")
  const rangeIndicators = [' to ', ' - ', ' – ', ' hasta '];
  const rangeIndicator = rangeIndicators.find(indicator => trimmed.includes(indicator));
  
  if (rangeIndicator) {
    const [startStr, endStr] = trimmed.split(rangeIndicator).map(s => s.trim());
    const startDate = parseDate(startStr);
    const endDate = parseDate(endStr);
    
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      return { startDate, endDate, isRange: true };
    }
  }
  
  // Single date
  const singleDate = parseDate(trimmed);
  if (!isNaN(singleDate.getTime())) {
    return { startDate: singleDate, isRange: false };
  }
  
  // Fallback to current date if parsing fails
  return { startDate: new Date(), isRange: false };
}

// Function to format date in human-readable format (handles both single dates and ranges)
export function formatDate(dateString: string): string {
  try {
    const { startDate, endDate, isRange } = parseDateString(dateString);
    
    const formatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    if (isRange && endDate) {
      const startFormatted = startDate.toLocaleDateString('es-ES', formatOptions);
      const endFormatted = endDate.toLocaleDateString('es-ES', formatOptions);
      
      // If same year, don't repeat it
      if (startDate.getFullYear() === endDate.getFullYear()) {
        if (startDate.getMonth() === endDate.getMonth()) {
          // Same month and year, just show day range
          const startDay = startDate.getDate();
          const endDay = endDate.getDate();
          const monthYear = endDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
          return `${startDay} - ${endDay} de ${monthYear}`;
        } else {
          // Same year, different months
          const startMonthDay = startDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' });
          const endMonthDay = endDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' });
          const year = endDate.getFullYear();
          return `${startMonthDay} - ${endMonthDay} de ${year}`;
        }
      } else {
        // Different years
        return `${startFormatted} - ${endFormatted}`;
      }
    }
    
    return startDate.toLocaleDateString('es-ES', formatOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// Function to check if an event is upcoming based on its date (handles ranges)
export function isUpcomingEvent(dateString: string): boolean {
  try {
    const { startDate, endDate } = parseDateString(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to beginning of day
    
    // For ranges, check if today is before the end date
    if (endDate) {
      return endDate >= today;
    }
    
    // For single dates, check if it's today or in the future
    return startDate >= today;
  } catch (error) {
    console.error('Error checking if event is upcoming:', error);
    return false;
  }
}

// Function to get the primary date for sorting (start date for ranges)
export function getPrimaryDate(dateString: string): Date {
  try {
    const { startDate } = parseDateString(dateString);
    return startDate;
  } catch (error) {
    console.error('Error getting primary date:', error);
    return new Date();
  }
}
