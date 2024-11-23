import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string | undefined) {
  if (!address) return 'Unknown';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

/**
 * Formats a number to a more readable string with K, M, B suffixes
 * @param num - The number to format
 * @param decimals - The number of decimal places to show (default: 2)
 * @returns A formatted string representation of the number
 */
export function formatNumber(num: number, decimals: number = 2): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  return num.toFixed(decimals);
}

/**
 * Formats a number to a currency string
 * @param num - The number to format
 * @param currency - The currency symbol (default: '$')
 * @param decimals - The number of decimal places to show (default: 2)
 * @returns A formatted currency string
 */
export function formatCurrency(
  num: number,
  currency: string = '$',
  decimals: number = 2
): string {
  return currency + formatNumber(num, decimals);
}

export function getParamAsString(
  param: string | string[] | undefined
): string | undefined {
  if (typeof param === 'string') return param;
  if (Array.isArray(param)) return param[0];
  return undefined;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const allowNumbersAndDot = (value: string): string => {
  // Remove any character that is not a number or dot
  let sanitized = value.replace(/[^0-9.]/g, '');

  // Ensure the dot is only after a number and there's only one dot
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }

  // If the input starts with a dot, remove it
  if (sanitized.startsWith('.')) {
    sanitized = sanitized.substring(1);
  }

  return sanitized;
};
