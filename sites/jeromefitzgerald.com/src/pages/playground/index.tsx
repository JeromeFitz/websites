import { Box, PageHeading, Separator } from '@jeromefitz/design-system/components'

import { Shadows } from '~styles/const'

const properties = {
  title: 'Playground',
  seoDescription: 'Quick behind the scenes test of stuff.',
}

const PagesPlayground = () => {
  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <Separator margin="my3" size="full" />
      <Box
        css={{
          boxShadow: Shadows[3],
          height: '125px',
          width: '125px',
          border: '1px solid black',
        }}
      />
    </>
  )
}

export default PagesPlayground
