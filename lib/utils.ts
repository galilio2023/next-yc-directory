import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine multiple CSS class values into a single, normalized class string.
 *
 * Accepts any number of class value inputs (strings, arrays, objects, etc.), ignores falsy values, and merges Tailwind-style utilities so duplicates/conflicts are resolved.
 *
 * @param inputs - Class value(s) to combine
 * @returns A single string containing the merged and deduplicated class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string into a long US date (e.g., "January 1, 2024").
 *
 * @param date - A date value accepted by the JavaScript `Date` constructor (for example, an ISO 8601 string)
 * @returns The date formatted as `Month Day, Year` in the en-US locale
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}