import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

if (!projectId) {
  console.error("Sanity Project ID is missing. Please check your environment variables.");
}

export const client = createClient({
  projectId: projectId || "temporary-id-for-build",
  dataset: dataset || "production",
  apiVersion: apiVersion || "2024-01-01",
  useCdn: true,
});
