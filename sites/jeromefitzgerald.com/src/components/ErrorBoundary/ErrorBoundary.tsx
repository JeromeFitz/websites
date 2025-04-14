'use client'
import type { ReactNode } from 'react'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import * as DataList from '@radix-ui/themes/dist/esm/components/data-list.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { Component } from 'react'

import { ArticleMain } from '@/components/Article/Article.Main'
import {
  ContainerContent,
  ContainerWithSidebar,
} from '@/components/Container/Container.Main'
import { ContainerSite } from '@/components/Container/Container.Site'
import { HeaderSidebar } from '@/components/Header/Header.Sidebar'
import { ExclamationTriangleIcon } from '@/components/Icon/index'
import { cx } from '@/utils/cx'

interface PropsChildren {
  children?: ReactNode
}

class ErrorBoundary extends Component<PropsChildren> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error, errorInfo) {
    // // You can also log the error to an error reporting service
    // // logErrorToMyService(error, errorInfo)
    // console.dir(`> componentDidCatch`)
    // console.dir(errorInfo)
    // console.dir(error)
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.state.hasError) {
      const title = 'Error'
      const message = `Well this is embarassing.`
      const body = `Hey, sometimes these things happen. This is an error that has sent an alert, so Jerome already knows most likely, heh.`

      return (
        <ContainerSite>
          <ContainerContent>
            <ContainerWithSidebar>
              <HeaderSidebar title={title}>
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
                      'py-6 pl-4 pr-1',
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
                          <Code variant="ghost">Boundary</Code>
                        </Badge>
                      </DataList.Value>
                    </DataList.Item>
                  </DataList.Root>
                </Flex>
              </HeaderSidebar>
              <ArticleMain>
                <Text as="p" size="8" weight="medium">
                  {message}
                </Text>
                <Text size="4">{body}</Text>
                <Separator my="8" />
                <Text size="4">
                  Please try and go back to the{` `}
                  <Link asChild>
                    <a href="/">homepage</a>
                  </Link>
                  .
                </Text>
              </ArticleMain>
            </ContainerWithSidebar>
          </ContainerContent>
        </ContainerSite>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
