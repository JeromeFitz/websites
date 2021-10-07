import dynamic from 'next/dynamic'

import Layout from '~components/Layout'

const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})

const Shows = () => {
  return (
    <>
      <Layout>
        <Breadcrumb isIndex={true} title={`Playground: Shows`} />
      </Layout>
    </>
  )
}

export default Shows
