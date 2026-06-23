// import { Fragment } from 'react'

// import { imageGallery } from '../(segments)/shows/_content/_images'
// import { FeedContainer, FeedTag, FeedTagContainer, FeedWrapper } from './feed'
import { Footer } from "./footer";
import { FooterNavigation, HeaderNavigation } from "./header.navigation";
import { Main } from "./main";
import {
  // ModuleAbout,
  ModuleCredits,
  // ModuleHome,
  // ModuleImageGallery,
  // ModuleShow,
} from "./module";

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
  );
};

export { Home as KitchenSink };
