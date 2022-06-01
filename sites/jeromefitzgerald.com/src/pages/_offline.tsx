import { PageHeading } from '@jeromefitz/design-system'

const OFFLINE = {
  description: 'You are currently offline. Please check your internet connection.',
  title: 'Offline',
}

const Offline = () => {
  return (
    <>
      <PageHeading description={OFFLINE.description} title={OFFLINE.title} />
    </>
  )
}

export default Offline
