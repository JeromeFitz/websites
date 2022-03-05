import { getCatchAll } from 'next-notion/src/getCatchAll'
import { getDataReturn } from 'next-notion/src/getDataReturn'

const getStaticPropsCatchAll = async ({
  catchAll,
  clear,
  notionConfig,
  pathVariables,
  preview,
}) => {
  /**
   * @todo
   *
   * [ ] Cache should be separate from `next-notion`
   * [ ] Images should be separate from `next-notion`
   * [ ] Images from `next-notion` should pass Slugger ID to check against Cache
   *
   * So how do we do this, haha
   *
   * - Change manner in initial data creation to focus on KEYS and TYPE
   * - - `notion` = CMS
   * - - `image` = IMAGE
   * - - And then a fallback I guess, but right now only ones we need
   *
   * When we say "images" should be separate, what we mean is they should
   *  not have their data mutated inline to the CMS content.
   * CMS content holds the URL reference, that is what we need.
   * Since images could (will) be shared throughout the site, we
   *  have a separate IMAGE cache that holds any render data separate
   *  we then add that as a custom `images` key to the content.
   *
   * That was a lot huh heh. Well writing it outs helps me remember
   *  how this was initially written sometimes and I hope I remember
   *  to delete this and make it more pithy and sensible, haha.
   *
   */

  return await getDataReturn({
    data: await getCatchAll({
      catchAll,
      clear,
      notionConfig,
      pathVariables,
      preview,
    }),
    pathVariables,
  })
}

export { getStaticPropsCatchAll }
