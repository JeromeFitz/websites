import { Box, Text } from '@radix-ui/themes'

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
        className="animate-pulse rounded-[var(--radius-3)]"
        display="inline-block"
        maxWidth="24rem"
        top="1"
        width="100%"
      >
        <Box
          as="div"
          className={`bg-[var(--mauve-9)] ${colWidth}`}
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
