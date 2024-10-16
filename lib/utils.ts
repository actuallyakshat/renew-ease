import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIndianNumber(amount: number): string {
  const absAmount = Math.abs(amount);

  if (absAmount >= 1_00_00_000) {
    // Crores
    return (amount / 1_00_00_000).toFixed(2) + " cr";
  } else if (absAmount >= 1_00_000) {
    // Lakhs
    return (amount / 1_00_000).toFixed(2) + " lacs";
  } else {
    // Below 1 lakh, format with commas
    return new Intl.NumberFormat('en-IN').format(amount);
  }
}
