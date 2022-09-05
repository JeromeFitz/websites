import { CommandMenuItem, Flex, Icon } from '@jeromefitz/design-system'
import { Command } from 'cmdk'
import { fetcher } from 'next-notion/src/lib/fetcher'
import { getNextPageStatus } from 'next-notion/src/utils'
import { useRouter } from 'next/router'
import React from 'react'
import useSWRImmutable from 'swr/immutable'

import useStore from '~store/useStore'

function ListDynamic({ icon, routeType }) {
  const getUrl = `/api/v1/cms/${routeType}`
  const router = useRouter()

  const handleRouteInternal = (url) => {
    void router.push(url)
  }

  const commandMenuOpenSet = useStore.use.commandMenuOpenSet()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isValidating } = useSWRImmutable<any>(
    [getUrl],
    (url) => fetcher(url),
    {}
  )

  const { isDataUndefined, isError, isLoading } = getNextPageStatus(
    data,
    error,
    // url
    getUrl
  )

  const items = data?.items?.results

  return (
    <>
      {isLoading && !isDataUndefined && (
        <Command.Loading>
          <CommandMenuItem>
            <Flex gap="3">
              <Icon.Clock />
              One moment…
            </Flex>
          </CommandMenuItem>
        </Command.Loading>
      )}
      {isError && isDataUndefined && (
        <Command.Loading>
          <CommandMenuItem>
            <Flex gap="3">
              <Icon.Error />
              Seems to be an error…
            </Flex>
          </CommandMenuItem>
        </Command.Loading>
      )}

      <>
        {!!items &&
          items?.map((item) => {
            const { id, properties } = item
            const { slug, title } = properties

            return (
              <CommandMenuItem
                key={id}
                onSelect={() => {
                  handleRouteInternal(`/${routeType}/${slug}`)
                  commandMenuOpenSet()
                }}
                value={slug}
              >
                <Flex gap="3">
                  {icon}
                  {title}
                </Flex>
              </CommandMenuItem>
            )
          })}
        {!!items && (
          <CommandMenuItem
            onSelect={() => {
              handleRouteInternal(`/${routeType}`)
              commandMenuOpenSet()
            }}
          >
            <Flex gap="3">
              <Icon.ListBullet /> View All
            </Flex>
          </CommandMenuItem>
        )}
      </>
    </>
  )
}

export { ListDynamic }
