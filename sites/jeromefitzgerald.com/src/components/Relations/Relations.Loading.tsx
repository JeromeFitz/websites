import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

// function createRandomString(length) {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   let result = ''
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length))
//   }
//   return result
// }

function Loading() {
  // const random = createRandomString(Math.floor(Math.random() * 16) + 11)
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
