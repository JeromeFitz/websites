import { envServer } from '@jeromefitz/next-config/env.server.mjs'

export async function getAppleMusic({
  limit,
  offset,
  route,
  userToken,
}: {
  limit: number
  offset: number
  route: string
  userToken: string
}) {
  const endpoint = `${envServer.APPLE_API}${route}?limit=${limit}&offset=${offset}`

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${envServer.APPLE_TOKEN_DEVELOPER}`,
      'Music-User-Token': userToken,
    },
  })

  if (!response.ok) {
    console.dir(`❎ Failed to fetch: ${endpoint}.`)
    return { data: null, next: null }
  }

  const data = await response.json()

  return data
}
