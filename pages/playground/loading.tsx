import { Heading, Paragraph, Skeleton, Separator } from '@modulz/design-system'
import { useState } from 'react'

const text = {
  error: {
    title: 'Error',
    text: 'Er, Something happened.',
  },
}

const properties = {
  title: 'Page Title',
  seoDescription: 'Page Description',
}

const SkeletonHeading = () => (
  <Skeleton
    as="span"
    variant="heading"
    css={{
      fontSize: '$8',
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
      height: '$fontSizes$5',
      width: '50%',
      mb: '$7',
      mt: '$2',
      pr: 'var(--width-2_4)',
    }}
  />
)

const Loading = () => {
  const [loading, loadingSet] = useState(true)
  const [error, errorSet] = useState(false)
  const [data, dataSet] = useState(false)

  const handleClickLoading = () => {
    loadingSet(!loading)
  }
  const handleClickError = () => {
    errorSet(!error)
  }
  const handleClickData = () => {
    dataSet(!data)
  }

  const status = {
    loading: loading ? 'loading' : 'loaded',
    error: error ? 'true' : 'false',
    data: data ? 'true' : 'false',
  }

  const isError = error
  const isDataUndefined = !data

  if (isError && isDataUndefined)
    return (
      <>
        <Heading size="4">{text.error.title}</Heading>
        <Paragraph size="2" as="p" css={{ mt: '$2', mb: '$7' }}>
          {text.error.text}
        </Paragraph>
        <Separator
          css={{ margin: '1rem 0', padding: '0', width: '100% !important' }}
        />
        <button onClick={() => handleClickLoading()}>
          Toggle Loading: {status.loading}
        </button>
        <button onClick={() => handleClickError()}>
          Toggle Error: {status.error}
        </button>
        <button onClick={() => handleClickData()}>Toggle Data: {status.data}</button>
      </>
    )

  if (loading && isDataUndefined)
    return (
      <>
        <Heading size="4">
          <SkeletonHeading />
        </Heading>
        <Paragraph size="2" as="p" css={{ mt: '$2', mb: '$7' }}>
          <SkeletonDescription />
        </Paragraph>
        <Separator
          css={{ margin: '1rem 0', padding: '0', width: '100% !important' }}
        />
        <button onClick={() => handleClickLoading()}>
          Toggle Loading: {status.loading}
        </button>
        <button onClick={() => handleClickError()}>
          Toggle Error: {status.error}
        </button>
        <button onClick={() => handleClickData()}>Toggle Data: {status.data}</button>
      </>
    )

  return (
    <>
      <Heading size="4">{properties.title}</Heading>
      <Paragraph size="2" as="p" css={{ mt: '$2', mb: '$7' }}>
        {properties.seoDescription}
      </Paragraph>
      <Separator
        css={{ margin: '1rem 0', padding: '0', width: '100% !important' }}
      />
      <button onClick={() => handleClickLoading()}>
        Toggle Loading: {status.loading}
      </button>
      <button onClick={() => handleClickError()}>
        Toggle Error: {status.error}
      </button>
      <button onClick={() => handleClickData()}>Toggle Data: {status.data}</button>
    </>
  )
}

export default Loading
