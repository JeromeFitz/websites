import { Separator, PageHeading } from '@jeromefitz/design-system/components'

const properties = {
  title: 'Playground Template',
  seoDescription: 'Anything that you want to play around with.',
}

const PlaygroundTemplate = () => {
  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <Separator
        css={{ margin: '1rem 0', padding: '0', width: '100% !important' }}
      />
    </>
  )
}

export default PlaygroundTemplate
