import { Anchor } from '@jeromefitz/ds/components/Anchor/index'

import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { cache } from 'react'

import { getEventData } from '@/app/(notion)/_config/index'

const CreditsItem = cache(({ item }) => {
  if (!item) return null
  const { properties } = item
  if (!properties) return null
  const { href, isPublished, title } = getEventData(properties)

  if (isPublished) {
    return <Anchor href={href}>{title}</Anchor>
  }
  return <Text size={{ initial: '2', md: '3' }}>{title}</Text>
})

export { CreditsItem }
