import { twMerge } from "tailwind-merge"
import clsx, { ClassValue } from "clsx"

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

/**
 * 2 => $2/mo
 */
export const createMonthlyPriceString = (price: number) => `$${price}/mo`

/**
 * 20 => $2/yr
 */
export const createYearlyPriceString = (price: number) => `$${price}/yr`
