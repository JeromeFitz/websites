import ListingEvents from '~components/Notion/Listing/ListingEvents'
import PageHeading from '~components/PageHeading'
import mockData from '~data/mock/notion/events'

const properties = {
  title: mockData?.info?.properties?.title,
  seoDescription: 'Playground for Layout Purposes',
}

const PlaygroundEvents = () => {
  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <ListingEvents items={mockData?.items?.results} />
    </>
  )
}

export default PlaygroundEvents
