import useSWR from 'swr'
import format from 'comma-number'

import fetcher from '~lib/fetcher'
import { Card } from '~components/Metrics'

export default function GitHub() {
  const { data } = useSWR('/api/github', fetcher)

  const stars = format(data?.stars)
  const link = 'https://github.com/JeromeFitz'

  return <Card header="GitHub Stars" link={link} metric={stars} />
}
