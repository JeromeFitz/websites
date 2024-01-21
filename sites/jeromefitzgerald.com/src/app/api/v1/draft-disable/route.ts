// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { draftMode } from 'next/headers'

export function GET() {
  draftMode().disable()
  return new Response('Draft mode is disabled')
}
