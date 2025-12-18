import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Normalize and merge Tailwind CSS class names from multiple inputs.
 *
 * Accepts any values supported by `clsx` (strings, objects, arrays) and returns a deduplicated, merged class string according to `tailwind-merge` rules.
 *
 * @param inputs - One or more class value arguments accepted by `clsx`
 * @returns A single class string with Tailwind classes merged and duplicates resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}