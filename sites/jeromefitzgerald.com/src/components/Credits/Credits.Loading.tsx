import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { LI } from '@/components/List/index'

function CreditsLoading({ size }: { size: number }) {
  return (
    <>
      {Array(size)
        .fill(0)
        .map((_, i) => {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: migrate
            <LI key={`rl-${i}`}>
              <Loading />
            </LI>
          )
        })}
    </>
  )
}

function Loading() {
  const random = 'ABCDEFGHIJKLMNOP'
  return (
    <Skeleton loading={true}>
      <Text as="span" size={{ initial: '2', md: '3' }}>
        {random}
      </Text>
    </Skeleton>
  )
}

export { CreditsLoading }
