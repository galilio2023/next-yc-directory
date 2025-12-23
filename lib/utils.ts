import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a US-style readable date (e.g., "December 31, 2025").
 *
 * @param date - A string accepted by the JavaScript Date constructor (commonly ISO 8601).
 * @returns The date formatted as "Month day, year" (long month name, numeric day, numeric year).
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Creates a deep clone of a JSON-serializable value using JSON serialization.
 *
 * @param response - The value to clone; should be JSON-serializable.
 * @returns A deep-cloned copy of `response`.
 *
 * Note: Non-JSON-serializable values (for example functions, `undefined`, or symbols) are not preserved and may be lost or transformed during serialization.
 */
export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}