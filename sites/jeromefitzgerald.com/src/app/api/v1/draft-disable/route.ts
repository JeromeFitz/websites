import { draftMode } from 'next/headers'

export function GET() {
  draftMode().disable()
  return new Response('Draft mode is disabled')
}
