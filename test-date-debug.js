// Quick test for date parsing
const today = new Date();
today.setHours(0, 0, 0, 0);

// Test DD-MM-YYYY parsing
const parseDate = (dateStr) => {
  // If it's a DD-MM-YYYY format, parse it manually
  const ddmmyyyyMatch = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddmmyyyyMatch) {
    const [, day, month, year] = ddmmyyyyMatch;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  
  // For other formats, use regular Date constructor
  return new Date(dateStr);
};

const testStartDate = "04-10-2025";
const testEndDate = "05-10-2025";

const parsedStart = parseDate(testStartDate);
const parsedEnd = parseDate(testEndDate);
