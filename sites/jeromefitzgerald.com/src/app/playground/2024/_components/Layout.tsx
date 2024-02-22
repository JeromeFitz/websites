'use client'
// import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge, Box, Button, Heading, Skeleton, Text } from '@radix-ui/themes'
import React, { forwardRef } from 'react'

import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

const Layout = forwardRef(function Layout(props, forwardedRef) {
  const [isLoading, setIsLoading] = React.useState(true)
  const loadingTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>()

  React.useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(loadingTimeoutRef.current)
  }, [])

  const title = 'Jerome Fitzgerald'
  return (
    <>
      <Grid as="section" ref={forwardedRef}>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>
              {title}
              <Text as="span" className="block text-xl font-normal tracking-wider">
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
            <p className="flex gap-2 text-4xl font-bold tracking-tight">
              <span
                aria-label="an emoji representation of wave"
                className="ml-0.5 mr-1.5"
                role="img"
              >
                👋
              </span>
              <span className="">Hello</span>
            </p>
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
