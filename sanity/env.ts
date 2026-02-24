export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const token = process.env.SANITY_WRITE_TOKEN;

function assertValue<T>(v: T | undefined, name: string): T {
  if (v === undefined) {
    // During build time on CI, we allow missing values to prevent build crashes
    // for static pages that don't strictly need Sanity at that moment.
    if (process.env.NODE_ENV === "production" && process.env.CI) {
      console.warn(`Warning: Environment variable ${name} is missing during build.`);
      return "" as unknown as T;
    }
    
    throw new Error(`Missing environment variable: ${name}`);
  }

  return v;
}
