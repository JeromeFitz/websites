import useSWR from 'swr'
import format from 'comma-number'

import fetcher from '~lib/fetcher'
import { Card } from '~components/Metrics'

const Analytics = () => {
  const { data } = useSWR('/api/views', fetcher)

  const pageViews = format(data?.total)
  const link = 'https://jeromefitzgerald.com'

  return <Card header="All-Time Views" link={link} metric={pageViews} />
}

export default Analytics
