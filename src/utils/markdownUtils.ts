
// Re-export everything from the markdown modules
export * from './markdown/parser';
export * from './markdown/formatters';
export * from './markdown/types';

// Also explicitly export ProjectFrontMatter for compatibility
import { ProjectFrontMatter } from './markdown/types';
export type { ProjectFrontMatter };
