'use server'

import { envServer as env } from 'next-config/env.server'

export async function isValid(signature: null | string): Promise<boolean> {
  return env.REVALIDATE_TOKEN === signature
}
