/** biome-ignore-all lint/correctness/noUnusedImports: wip */
import { FeedContainer, FeedTag, FeedTagContainer, FeedWrapper } from './Feed'
import { Footer } from './Footer'
import { HeaderNavigation } from './Header.Navigation'
import { Main } from './Main'
import { ModuleAbout, ModuleHome, ModuleShow } from './Module'

const Home = () => {
  return (
    <>
      <HeaderNavigation />
      <Main>
        <></>
        {/* <ModuleShow /> */}
        <ModuleHome />
        {/* <FeedContainer>
          <FeedWrapper>
            <FeedTag />
            <FeedTagContainer />
          </FeedWrapper>
        </FeedContainer> */}
        {/* <ModuleAbout /> */}
      </Main>
      <Footer />
    </>
  )
}

export { Home as KitchenSink }
