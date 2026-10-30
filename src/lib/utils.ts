import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes and conditional class values safely.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats currency values cleanly.
 */
export function formatCurrency(amount: number, currency = "$"): string {
  return `${currency}${amount.toLocaleString()}`;
}

