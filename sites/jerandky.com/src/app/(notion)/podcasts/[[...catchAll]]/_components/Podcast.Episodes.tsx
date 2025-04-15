import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { cx } from '@jeromefitz/ds/utils/cx'

import { blocks } from '../../../../../components/Notion/Notion.Config'
import { getPodcastData } from '../../../_config'

function PodcastEpisodes({ properties }) {
  const { episodeSlugs, episodeTitles, ...props } = getPodcastData(properties)
  return (
    <>
      <p className="pb-3 font-extrabold uppercase tracking-tight">
        <strong>Episodes</strong>
      </p>
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
