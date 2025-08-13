// Quick test for date parsing
import { parseDateString, formatDate } from './utils/markdown/formatters.js';

// Test the date range from your Google Summer of Code event
const testDate = "2025-03-18 to 2025-04-08";
console.log("Input:", testDate);

const parsed = parseDateString(testDate);
console.log("Parsed:", parsed);
console.log("Start date:", parsed.startDate.toDateString());
if (parsed.endDate) {
  console.log("End date:", parsed.endDate.toDateString());
}

const formatted = formatDate(testDate);
console.log("Formatted:", formatted);

// Test individual dates
console.log("\nTesting individual dates:");
console.log("2025-04-08 parsed:", parseDateString("2025-04-08").startDate.toDateString());
console.log("2025-04-08 formatted:", formatDate("2025-04-08"));
