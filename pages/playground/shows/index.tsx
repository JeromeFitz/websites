import ListingShows from '~components/Notion/Listing/ListingShows'
import PageHeading from '~components/PageHeading'
import mockData from '~data/mock/notion/shows'

const properties = {
  title: mockData?.info?.data?.title,
  seoDescription: 'Playground for Layout Purposes',
}

const PlaygroundShows = () => {
  const { images, items } = mockData

  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <ListingShows images={images} items={items?.results} />
    </>
  )
}
export default PlaygroundShows
