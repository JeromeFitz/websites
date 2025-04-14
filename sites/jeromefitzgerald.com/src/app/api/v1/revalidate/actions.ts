'use server'
import { envServer as env } from '@jeromefitz/next-config/env.server.mjs'

// eslint-disable-next-line @typescript-eslint/require-await
export async function isValid(signature: null | string): Promise<boolean> {
  return env.REVALIDATE_TOKEN === signature
}
