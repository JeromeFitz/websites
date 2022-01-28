import mockData from '~data/mock/notion/shows'
import ShowsListing from '~lib/notion/app/routes/Shows/Listing'

const MockShows = () => {
  /**
   * @hack(notion)
   * Since Notion does not have an embed currently,
   *  this page is very hacked. However, due to this
   *  being the index/homepage this is acceptable
   *  (well to me I guess heh)
   *
   * @todo(notion)
   * - Production:  Pull from `./cache/shows.json`
   * - Development: Pull from `mockData`
   */
  const { images, items } = mockData
  const dataShows = {
    items,
  }
  const routeTypeShows = 'shows'
  return (
    <>
      <ShowsListing data={dataShows} images={images} routeType={routeTypeShows} />
    </>
  )
}

export default MockShows
