'use client'
// import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

const Layout = forwardRef(function Layout(props, forwardedRef) {
  const [isLoading, setIsLoading] = useState(false)
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(loadingTimeoutRef.current)
  }, [])

  const title = 'Jerome Fitzgerald'
  return (
    <>
      <Grid ref={forwardedRef}>
        {/* <Grid> */}
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>
              {title}
              <Text as="p">
                <Skeleton loading={isLoading}>
                  {isLoading ? 'lorem' : 'he/him'}
                </Skeleton>
              </Text>
            </>
          </HeadlineTitle>
          <HeadlineTitleSub>
            <Skeleton loading={isLoading}>
              <Badge color="orange" size="2">
                actor
              </Badge>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <Badge className="min-w-7" color="mint" size="2">
                {isLoading ? 'lorem' : 'comedian'}
              </Badge>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <Badge color="purple" size="2">
                writer
              </Badge>
            </Skeleton>
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <>
            <Button onClick={() => setIsLoading(!isLoading)}>
              Set Loading: {isLoading ? 'off' : 'on'}
            </Button>
            <Text weight="bold">
              <Skeleton loading={isLoading}>
                <Text
                  aria-label="an emoji representation of wave"
                  as="span"
                  role="img"
                >
                  👋{` `}
                </Text>
                <Text as="span">Hello</Text>
              </Skeleton>
            </Text>
            <Box>
              <Heading as="h3" mt="-1" size="6">
                <Skeleton loading={isLoading}>Hello Hello Hello</Skeleton>
              </Heading>
            </Box>
            <Text mt="5" size="4">
              <Skeleton loading={isLoading}>
                I mostly focus on writing and performing comedy. With the occasional
                drama or musical number, and a healthy career in engineering
                leadership.
              </Skeleton>
            </Text>
          </>
        </HeadlineContent>
      </Grid>
    </>
  )
})

export { Layout }
