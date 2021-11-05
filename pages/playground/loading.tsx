import { useState } from 'react'

import PageHeading, { SkeletonHeading } from '~components/PageHeading'
import { Separator } from '~styles/system/components/Separator'

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
        <PageHeading description={text.error.text} title={text.error.title} />
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
        <SkeletonHeading />
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
      <PageHeading
        description={properties.title}
        title={properties.seoDescription}
      />
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
