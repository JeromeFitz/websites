import fs from 'node:fs'
import path from 'node:path'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server.js'

const configDirectory = path.resolve(
  process.cwd(),
  'src/app/api/v1/token-generation/apple-music',
)

const privateKey = fs.readFileSync(
  // @hack
  path.join(configDirectory, envClient.IS_DEV ? 'AuthKey.p8' : 'route.ts'),
  'utf8',
)

const getMusicKitDeveloperToken = async () => {
  return await jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    expiresIn: '180d',
    header: {
      alg: 'ES256',
      kid: envServer.APPLE_AUTH_KID,
    },
    issuer: envServer.APPLE_AUTH_ISS,
  })
}

export async function GET() {
  if (!envClient.IS_DEV) {
    return NextResponse.json({})
  }

  const APPLE_TOKEN_DEVELOPER = await getMusicKitDeveloperToken()
  const response = await fetch(
    // ☁️ Who Is The Sky?
    `${envServer.APPLE_API}/catalog/us/albums/1816027264`,
    {
      headers: {
        Authorization: `Bearer ${APPLE_TOKEN_DEVELOPER}`,
      },
    },
  )
  let statusMessage
  const { status, statusText } = response
  if (response.status === 401) {
    statusMessage =
      '❎ The generated token is unauthorized to access the Apple Music API'
  } else if (response.status === 429) {
    statusMessage = '❎ The generated token was rejected by the Apple Music API'
  } else {
    statusMessage = `✅ Test passed`
  }

  const data = await response.json()

  return NextResponse.json({
    APPLE_TOKEN_DEVELOPER,
    data,
    status,
    statusMessage,
    statusText,
  })
}
