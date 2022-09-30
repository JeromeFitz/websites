import { AppBar } from '../AppBar'
import { Banner } from '../Banner'

const Header = () => {
  const isEventUpcoming =
    process.env.NEXT_PUBLIC__EVENT_UPCOMING_FLAG === 'true' ? true : false
  return (
    <>
      {isEventUpcoming && <Banner />}
      <AppBar />
    </>
  )
}

export { Header }
