import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

/**
 * @todo(radix) replace with Skeleton
 */
function RelationLoading() {
  // So ... (10 - 5 + 1) you mean .. 6? 🤣
  const random = Math.floor(Math.random() * (10 - 5 + 1)) + 5
  const colWidth = random === 12 ? 'w-full' : `w-${random}/12`
  return (
    <>
      <Box
        className="rounded-3 animate-pulse"
        display="inline-block"
        maxWidth="24rem"
        top="1"
        width="100%"
      >
        <Box
          as="div"
          className={`bg-gray-9 ${colWidth}`}
          display="inline-block"
          height="100%"
        >
          <Text as="span">&nbsp;</Text>
        </Box>
      </Box>
    </>
  )
}

export { RelationLoading }
