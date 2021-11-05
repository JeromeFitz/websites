import { Heading as _Heading, Paragraph, Skeleton } from '~styles/system/components'

const SkeletonTitle = () => (
  <Skeleton
    as="span"
    variant="heading"
    css={{
      fontSize: 'inherit',
      height: '$fontSizes$8',
      mb: '$1',
      pr: 'var(--width-1_4)',
    }}
  >
    &nbsp;
  </Skeleton>
)

const SkeletonDescription = () => (
  <Skeleton
    as="span"
    variant="text"
    css={{
      fontSize: 'inherit',
      height: '$fontSizes$5',
      mb: '$7',
      mt: '$2',
      pr: 'var(--width-2_4)',
    }}
  >
    &nbsp;
  </Skeleton>
)

const SkeletonHeading = () => {
  return (
    <>
      <_Heading size="4">
        <SkeletonTitle />
      </_Heading>
      <Paragraph size="2" as="p" css={{ mt: '$2', mb: '$7' }}>
        <SkeletonDescription />
      </Paragraph>
    </>
  )
}

const Heading = ({ title, description }) => {
  return (
    <>
      <_Heading size="4">{title}</_Heading>
      <Paragraph size="2" as="p" css={{ mt: '$2', mb: '$7' }}>
        {description}
      </Paragraph>
    </>
  )
}

export { SkeletonHeading, SkeletonTitle, SkeletonDescription }
export default Heading
