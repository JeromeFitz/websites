import type { ClassValue } from 'clsx'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
  // return clsx(inputs)
}

export { cx, twMerge }
