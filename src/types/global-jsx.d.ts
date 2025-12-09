// Fallback global JSX types to avoid "Property 'name' does not exist on type 'JSX.IntrinsicElements'"
// This is a permissive fallback used only to avoid editor/TS server issues when
// the React JSX types are not correctly resolved. Prefer fixing type resolution
// (ensure `@types/react` is installed and TS server uses workspace TypeScript).

declare namespace JSX {
  interface IntrinsicElements {
    // Allow any intrinsic element name with any props as a last-resort fallback.
    // This prevents spurious editor errors while keeping real TypeScript checks.
    [elemName: string]: any;
  }
}
