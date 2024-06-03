import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { LI } from '@/components/List/index'

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

function CreditsLoading({ size }) {
  return (
    <>
      {Array(size)
        .fill(0)
        .map((_, i) => {
          return (
            <LI key={`rl-${i}`}>
              <Loading />
            </LI>
          )
        })}
    </>
  )
}

export { CreditsLoading }
