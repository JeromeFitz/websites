import { Anchor } from '@jeromefitz/ds/components/Anchor/index'

import { getPodcastData } from '@/app/(notion)/_config/index'
import { LI, UL } from '@/components/List/index'

function PodcastEpisodes({ properties }) {
  const { episodeSlugs, episodeTitles, ...props } = getPodcastData(properties)
  return (
    <UL>
      {episodeSlugs.map((slug, i) => {
        const href = `${props.href}/${slug}`
        return (
          <LI key={slug}>
            <Anchor href={href}>{episodeTitles[i]}</Anchor>
          </LI>
        )
      })}
    </UL>
  )
}

export { PodcastEpisodes }
