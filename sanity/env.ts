export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

if (!projectId) {
  console.warn("Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity features may not work correctly.");
}

export const token = process.env.SANITY_WRITE_TOKEN;
