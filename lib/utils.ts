import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string): string {
  if (!address) return ""
  const visibleLength = 6
  const suffixLength = 4
  if (address.length <= visibleLength + suffixLength) {
    return address
  }
  return `${address.substring(0, visibleLength)}...${address.substring(address.length - suffixLength)}`
}

