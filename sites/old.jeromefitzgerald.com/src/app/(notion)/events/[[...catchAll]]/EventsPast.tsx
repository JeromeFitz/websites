'use client'
import { useNotion } from '~hooks/useNotion'
import { PageHeading } from '~ui/PageHeading'

import { Listing } from './Listing'

function EventsPast({}) {
  const { data, isLoading } = useNotion(`events/2023`, {})

  if (isLoading) return null

  return (
    <>
      <hr className="my-8 border-0 md:my-24" />
      <PageHeading overline={`events/2023`} title={'Sampling of Past Events'} />
      <Listing data={data} pathVariables={'pathVariables'} isUpcoming={false} />
    </>
  )
}

export { EventsPast }
