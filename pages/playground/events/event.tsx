import ListingEvent from '~components/Notion/Listing/ListingEvent'
import PageHeading from '~components/PageHeading'
import mockData from '~data/mock/notion/event'

const properties = {
  title: mockData?.info?.data?.title,
  seoDescription: mockData?.info?.data?.seoDescription,
}

const PlaygroundEvent = () => {
  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <ListingEvent data={mockData} />
    </>
  )
}

export default PlaygroundEvent
