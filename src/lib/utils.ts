import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Smooth-scrolls to an in-page section without touching window.location.hash
 * — using a plain href="#id" anchor causes the browser to append the hash,
 * which then auto-jumps back to that section on every future page load.
 */
export function scrollToId(id: string) {
  const target = id.startsWith('#') ? id : `#${id}`
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
