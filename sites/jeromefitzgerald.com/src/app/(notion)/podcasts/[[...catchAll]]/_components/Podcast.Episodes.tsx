import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { cx } from '@jeromefitz/ds/utils/cx'

import { getPodcastData } from '@/app/(notion)/_config'
import { blocks } from '@/components/Notion/Notion.Config'

function PodcastEpisodes({ properties }) {
  const { episodeSlugs, episodeTitles, ...props } = getPodcastData(properties)
  return (
    <>
      <ul className={cx(blocks['bulleted_list'].className)}>
        {episodeSlugs.map((slug, i) => {
          const href = `${props.href}/${slug}`
          return (
            <li className={cx(blocks['bulleted_list_item'].className)} key={slug}>
              <Anchor href={href}>{episodeTitles[i]}</Anchor>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export { PodcastEpisodes }
