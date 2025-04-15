import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { cache } from 'react'

// import { getEventData } from '@/app/(notion)/_config/index'
import { Anchor } from '@/components/Anchor/index'

const CreditsItem = cache(({ item }: { item: any }) => {
  if (!item) return null
  const { properties } = item
  if (!properties) return null
  // const { href, isPublished, title } = getEventData(properties)

  if (item.isPublished) {
    return <Anchor href={item.slugPreview}>{item.title}</Anchor>
  }
  return <Text size={{ initial: '2', md: '3' }}>{item.title}</Text>
})

export { CreditsItem }
