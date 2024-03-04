import { AnchorUnstyled as Anchor } from '@jeromefitz/ds/components/Anchor/index'

import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { cache } from 'react'

import { getEventData } from '@/app/(notion)/_config/index'

const RelationsItem = cache(({ item }) => {
  if (!item) return null
  const { properties } = item
  if (!properties) return null
  const { href, isPublished, title } = getEventData(properties)

  if (isPublished) {
    return (
      <Link asChild>
        <Anchor href={href}>{title}</Anchor>
      </Link>
    )
  }
  return <Text>{title}</Text>
})

export { RelationsItem }
