import "server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId: projectId || "temporary-id-for-build",
  dataset: dataset || "production",
  apiVersion: apiVersion || "2024-01-01",
  useCdn: false,
  token,
});

if (!token && process.env.NODE_ENV === "production" && !process.env.CI) {
  throw new Error("Write token not found");
}
