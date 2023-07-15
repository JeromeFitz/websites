import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { cx } from '@jeromefitz/ds/utils/cx'

import { getPodcastData } from '~app/(notion)/_config'
import { blocks } from '~components/Notion/Notion.Config'

function PodcastEpisodes({ properties }) {
  const { episodeSlugs, episodeTitles, ...props } = getPodcastData(properties)
  console.dir(props)
  return (
    <>
      <p className="pb-3 font-extrabold uppercase tracking-tight">
        <strong>Episodes</strong>
      </p>
      <ul className={cx(blocks['bulleted_list'].className)}>
        {episodeSlugs.map((slug, i) => {
          const href = `${props.href}/${slug}`
          return (
            <li key={slug} className={cx(blocks['bulleted_list_item'].className)}>
              <Anchor href={href}>{episodeTitles[i]}</Anchor>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export { PodcastEpisodes }
