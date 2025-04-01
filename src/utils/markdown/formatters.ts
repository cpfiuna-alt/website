
// Function to format date in human-readable format
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// Function to check if an event is upcoming based on its date
export function isUpcomingEvent(dateString: string): boolean {
  try {
    const eventDate = new Date(dateString);
    if (isNaN(eventDate.getTime())) {
      return false;
    }
    const today = new Date();
    return eventDate >= today;
  } catch (error) {
    console.error('Error checking if event is upcoming:', error);
    return false;
  }
}
