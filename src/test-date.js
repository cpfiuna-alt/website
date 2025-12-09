// Quick test for date parsing
import { parseDateString, formatDate } from './utils/markdown/formatters.js';

// Test the date range from your Google Summer of Code event
const testDate = "2025-03-18 to 2025-04-08";

const parsed = parseDateString(testDate);

const formatted = formatDate(testDate);
