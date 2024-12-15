import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function approximateTimeDifference(diff: number) {
  const day = 24 * 60 * 60 * 1000
  if (diff <= day * 1.5) return 'today'
  if (diff > day && diff <= day * 14)
    return `${Math.floor(diff / day)} days ago`
  if (diff > 14 * day) return `${Math.floor(diff / (7 * day))} weeks ago`
}
