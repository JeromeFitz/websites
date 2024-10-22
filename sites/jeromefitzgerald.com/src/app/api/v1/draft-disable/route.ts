import { draftMode } from 'next/headers.js'

export async function GET() {
  const draft = await draftMode()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Type 'DraftMode' has no call signatures
  draft().disable()
  return new Response('Draft mode is disabled')
}
