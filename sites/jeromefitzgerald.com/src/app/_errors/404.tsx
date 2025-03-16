import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { ExclamationTriangleIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import * as DataList from '@radix-ui/themes/dist/esm/components/data-list.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'

// @todo(types)
function FourOhFour({
  isNotPublished = false,
  segmentInfo = {},
}: {
  isNotPublished: boolean
  segmentInfo: any
}) {
  const title = '404'
  // const message = `Page Not Found`
  // // const body = `Hey, sometimes these things happen. I bet if this page existed it would be pretty cool.`

  return (
    <ContainerWithSidebar>
      <HeaderSidebar title={''}>
        <Flex
          className={cx(
            'content-center items-center overflow-auto',
            'border-gray-7 border-t-1',
          )}
          direction="column"
          gap="0"
          justify="start"
          p="0"
          position="relative"
          width="100%"
          wrap="nowrap"
        >
          <DataList.Root
            className={cx(
              'py-6 pr-1 pl-4',
              'gap-x-[var(--space-3)] md:!gap-x-[var(--space-1)]',
              'w-full',
            )}
            size="2"
          >
            <DataList.Item align="start">
              <DataList.Label
                className="flex flex-row items-center justify-start"
                minWidth="88px"
              >
                <ExclamationTriangleIcon />
                <Text className="font-mono" ml="1" size="1">
                  Error
                </Text>
              </DataList.Label>
              <DataList.Value className="font-mono">
                <Badge size="2">
                  <Code variant="ghost">
                    {title}
                    {isNotPublished ? '*!*' : ''}
                  </Code>
                </Badge>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Flex>
      </HeaderSidebar>
      <ArticleMain>
        <Text as="p" size="8" weight="medium">
          Hey, sometimes these things happen.
        </Text>
        <Text size="4">I bet if this page existed it would be pretty cool.</Text>
        <Separator my="8" />
        <Text size="4">
          Please try and go back to the{` `}
          <Anchor href="/">homepage</Anchor>.
        </Text>
        {!isObjectEmpty(segmentInfo) && (
          <>
            <Separator my="8" />
            <Heading as="h2">Error Information:</Heading>
            <Box asChild mb="4" pb="2" width="100%">
              <ul className="list-inside list-disc">
                <Text asChild>
                  <li>
                    <Strong>url: </Strong>
                    <Text as="span">{segmentInfo?.slug}</Text>
                  </li>
                </Text>
              </ul>
            </Box>
          </>
        )}
      </ArticleMain>
    </ContainerWithSidebar>
  )
}

export { FourOhFour }
