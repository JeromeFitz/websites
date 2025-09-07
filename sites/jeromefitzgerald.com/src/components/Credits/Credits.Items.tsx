import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { LI } from '@/components/List/index'

// import { CreditsItem } from './Credits.Item'

/**
 * @todo(dynamic-credits)
 * title only? items are string[]
 * has data? items should be dynamically loaded via CreditsItem and have attributes
 */
const CreditsItems = ({ items }: { items: string[] }) => {
  return (
    <>
      {items.map((item: string, i: number) => {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: migrate
          <LI key={i}>
            <Text>{item}</Text>
            {/* <CreditsItem item={item} /> */}
          </LI>
        )
      })}
    </>
  )
}

export { CreditsItems }
