import { draftMode } from 'next/headers.js'

export function GET() {
  draftMode().disable()
  return new Response('Draft mode is disabled')
}
