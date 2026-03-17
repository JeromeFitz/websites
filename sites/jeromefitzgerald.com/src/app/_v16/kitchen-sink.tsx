/** biome-ignore-all lint/correctness/noUnusedImports: wip */
import { Fragment } from 'react'

import { imageGallery } from '../(segments)/shows/_content/_images'
import { FeedContainer, FeedTag, FeedTagContainer, FeedWrapper } from './Feed'
import { Footer } from './Footer'
import { FooterNavigation, HeaderNavigation } from './Header.Navigation'
import { Main } from './Main'
import {
  ModuleAbout,
  ModuleCredits,
  ModuleHome,
  ModuleImageGallery,
  ModuleShow,
} from './Module'

const Home = () => {
  return (
    <>
      <HeaderNavigation />
      <Main>
        {/* <Fragment /> */}
        <ModuleCredits data={``} />
        {/* <ModuleImageGallery images={imageGallery} /> */}
        {/* <ModuleShow /> */}
        {/* <ModuleHome /> */}
        {/* <FeedContainer>
          <FeedWrapper>
            <FeedTag />
            <FeedTagContainer />
          </FeedWrapper>
        </FeedContainer> */}
        {/* <ModuleAbout /> */}
      </Main>
      <FooterNavigation />
      <Footer />
    </>
  )
}

export { Home as KitchenSink }
