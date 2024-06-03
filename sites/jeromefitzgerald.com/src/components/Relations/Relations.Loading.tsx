import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

function Loading() {
  const random = 'ABCDEFGHIJKLMNOP'
  return (
    <Skeleton loading={true}>
      <Text as="span">{random}</Text>
    </Skeleton>
  )
}

function RelationsLoading({ size }) {
  return (
    <>
      {Array(size)
        .fill(0)
        .map((_, i) => {
          return (
            <li key={`rl-${i}`}>
              <Loading />
            </li>
          )
        })}
    </>
  )
}

export { RelationsLoading }
