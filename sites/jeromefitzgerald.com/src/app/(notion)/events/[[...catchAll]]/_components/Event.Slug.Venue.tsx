import { cx } from '@jeromefitz/ds/utils/cx'
import { getPageDataFromNotion } from '@jeromefitz/shared/notion/utils'

import { Suspense } from 'react'

import type { PageObjectResponseVenue } from '@/app/(notion)/_config'

import { getPropertyTypeDataVenue } from '@/app/(notion)/_config'

function VenueLoading() {
  return (
    <>
      <div className="relative top-[0.125rem] inline-block w-full max-w-sm animate-pulse rounded-md">
        <div className="mb-2 h-4 w-11/12 rounded bg-[var(--mauve-9)]"></div>
        <div className="mb-2 h-4 w-11/12 rounded bg-[var(--mauve-9)]"></div>
        <div className="h-4 w-11/12 rounded bg-[var(--mauve-9)]"></div>
      </div>
    </>
  )
}

async function VenueIndividual({ id }) {
  const item: PageObjectResponseVenue = await getPageDataFromNotion(id)
  if (!item) return null
  const { properties } = item

  const addressStreet = getPropertyTypeDataVenue(properties, 'Address.Street')
  const addressCity = getPropertyTypeDataVenue(properties, 'Address.City')
  const addressNeighborhood = getPropertyTypeDataVenue(
    properties,
    'Address.Neighborhood',
  )
  const addressState = getPropertyTypeDataVenue(properties, 'Address.State')
  const addressPostalCode = getPropertyTypeDataVenue(
    properties,
    'Address.PostalCode',
  )

  // console.dir(`addressPostalCode: ${addressPostalCode}`)
  // console.dir(addressPostalCode)

  return (
    <div className={cx('text-xl')}>
      <span>{addressStreet}</span>
      <br />
      <span>
        {addressCity}, {addressState} {addressPostalCode}
      </span>
      <br />
      <span>{addressNeighborhood}</span>
    </div>
  )
}

function Venue({ id }) {
  if (!id) return null
  return (
    <>
      <p className={cx('mb-1 mt-2 pb-1 pt-2 text-2xl font-bold leading-relaxed')}>
        <strong>Arcade Comedy Theater</strong>
      </p>
      <Suspense fallback={<VenueLoading />}>
        <VenueIndividual id={id} />
        {/* <VenueLoading /> */}
      </Suspense>
    </>
  )
}

export { Venue }
