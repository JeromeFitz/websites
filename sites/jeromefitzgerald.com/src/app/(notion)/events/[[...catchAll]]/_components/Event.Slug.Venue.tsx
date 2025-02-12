import { getPageDataFromNotion } from '@jeromefitz/shared/notion/utils/index'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { Suspense } from 'react'

import type { PageObjectResponseVenue } from '@/app/(notion)/_config/index'

import { getPropertyTypeDataVenue } from '@/app/(notion)/_config/index'

function Venue({ id }) {
  if (!id) return null
  return (
    <>
      <Suspense fallback={<VenueWithSkeleton />}>
        <VenueIndividual id={id} />
      </Suspense>
    </>
  )
}

async function VenueIndividual({ id }) {
  const item: PageObjectResponseVenue = await getPageDataFromNotion(id)
  if (!item) return <VenueWithSkeleton />
  const { properties } = item

  const addressStreet = getPropertyTypeDataVenue(properties, 'Address.Street')
  const addressCity = getPropertyTypeDataVenue(properties, 'Address.City')
  // const addressNeighborhood = getPropertyTypeDataVenue(
  //   properties,
  //   'Address.Neighborhood',
  // )
  const addressState = getPropertyTypeDataVenue(properties, 'Address.State')?.name
  const addressPostalCode = getPropertyTypeDataVenue(properties, 'Address.ZipCode')

  const street = addressStreet
  const city = `${addressCity}, ${addressState} ${addressPostalCode}`
  // const neighborhood = addressNeighborhood

  return (
    <VenueWithSkeleton
      city={city}
      isLoading={false}
      // neighborhood={neighborhood}
      street={street}
    />
  )
}

function VenueWithSkeleton({
  city = '',
  isLoading = true,
  // neighborhood = '',
  street = '',
}) {
  return (
    <Flex
      align="start"
      direction="column"
      gap="1"
      justify="end"
      width="100%"
      wrap="nowrap"
    >
      <Skeleton
        loading={isLoading}
        maxWidth="10rem"
        mb="1"
        minHeight="var(--line-height-2)"
      >
        <Text as="p" size="2">
          {street}
        </Text>
      </Skeleton>
      <Skeleton
        loading={isLoading}
        maxWidth="10rem"
        mb="1"
        minHeight="var(--line-height-2)"
      >
        <Text as="p" size="2">
          {city}
        </Text>
      </Skeleton>
      {/* <Skeleton
        loading={isLoading}
        maxWidth="10rem"
        mb="1"
        minHeight="var(--line-height-2)"
      >
        <Text as="p" size="2">
          {neighborhood}
        </Text>
      </Skeleton> */}
    </Flex>
  )
}

export { Venue }
