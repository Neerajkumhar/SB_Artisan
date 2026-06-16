import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to conditionally merge Tailwind CSS classes.
 * Combines clsx for conditional class names and tailwind-merge to resolve conflicts.
 *
 * @param inputs - Array of class names, conditional objects, or arrays.
 * @returns Concatenated and merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
