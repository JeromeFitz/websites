import { Notion as Blocks } from '~components/Notion'

function PageClient({ data }) {
  return <Blocks data={data?.blocks} />
}

export { PageClient }
