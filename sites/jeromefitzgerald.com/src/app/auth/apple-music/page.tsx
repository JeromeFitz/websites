/** biome-ignore-all lint/correctness/noUndeclaredVariables: MusicKit global */
'use client'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'

import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { useEffect, useState } from 'react'

import { HeaderFull } from '@/components/Header/Header.Full'

export default function Home() {
  const [isMusicKitReady, isMusicKitReadySet] = useState(false)
  const [musicKitInstance, musicKitInstanceSet] = useState(null)
  const [musicKitLoaded, musicKitLoadedSet] = useState(false)
  const [musicUserToken, musicUserTokenSet] = useState(null)

  // 00. Load MusicKit
  useEffect(() => {
    const initializeMusicKit = async () => {
      try {
        // @ts-ignore
        await MusicKit.configure({
          app: {
            build: '1.0.0',
            name: 'Apple Music Kit',
          },
          developerToken: envClient.NEXT_PUBLIC__APPLE_TOKEN_DEVELOPER,
        })
        // @ts-ignore
        musicKitInstanceSet(MusicKit.getInstance())
        musicKitLoadedSet(true)
      } catch (error) {
        console.error('Error configuring MusicKit:', error)
      }
    }

    window.addEventListener('musickitloaded', initializeMusicKit)

    return () => {
      window.removeEventListener('musickitloaded', initializeMusicKit)
    }
  }, [])

  // 01. Authorize MusicKit
  useEffect(() => {
    if (isMusicKitReady) {
      if (musicKitInstance && !musicUserToken) {
        const authorizeUser = async () => {
          try {
            // @ts-ignore
            await musicKitInstance.authorize()
            // @ts-ignore
            musicUserTokenSet(musicKitInstance.musicUserToken)
          } catch (error) {
            console.error('Error authorizing MusicKit:', error)
          }
        }
        authorizeUser()
      }
    }
  }, [isMusicKitReady, musicKitInstance, musicUserToken])

  if (!envClient.IS_DEV) {
    return (
      <Flex direction="column">
        <HeaderFull count={0} overline="" title="Hidden" />
        <Flex
          direction="column"
          gap="9"
          mb={{ initial: '4', md: '6' }}
          pb={{ initial: '4', md: '6' }}
        >
          <Flex direction="column" gap="3">
            <Text size={{ initial: '3', md: '5' }}>
              Nothing to see here. This is a development only “feature” and these
              tokens do not exist on the client side. Despite... Apple Music Kit
              needing to be script inline.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  if (!musicKitLoaded) {
    return null
  }

  return (
    <>
      <Flex direction="column">
        <HeaderFull count={0} overline="" title="Apple Music Kit" />
        <Flex
          direction="column"
          gap="9"
          mb={{ initial: '4', md: '6' }}
          pb={{ initial: '4', md: '6' }}
        >
          <Flex direction="column" gap="3">
            <Text size={{ initial: '3', md: '5' }}>
              <Strong>isMusicKitReady:</Strong> {isMusicKitReady ? 'y' : 'n'}
            </Text>
            <Button
              type="button"
              onClick={() => {
                isMusicKitReadySet(true)
              }}
            >
              isMusicKitReadySet()
            </Button>
            <Separator my="4" orientation="horizontal" size="4" />

            <Text size={{ initial: '3', md: '5' }}>
              <Strong>Music-User-Token:</Strong>
            </Text>
            {/* @ts-ignore */}
            <Code className="wrap-anywhere">{musicKitInstance.musicUserToken}</Code>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
