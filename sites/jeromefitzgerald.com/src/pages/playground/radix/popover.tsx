import {
  Code,
  Separator,
  PageHeading,
  Paragraph,
} from '@jeromefitz/design-system/components'

const properties = {
  title: 'Radix: Popover',
  seoDescription: 'Can we lazy load the JS?',
}

const PlaygroundPopover = () => {
  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <Separator
        css={{ margin: '1rem 0', padding: '0', width: '100% !important' }}
      />
      <Paragraph>
        The package is quite small (<Code>11.5K gzipped</Code>). But we want to see
        if we can make that smaller by abstracting out the <Code>Trigger</Code> from
        the <Code>Content</Code> to only show the <Code>Trigger</Code> on SSR, and
        then on hydration load the <Code>Content</Code>... content.
      </Paragraph>
    </>
  )
}

export default PlaygroundPopover
