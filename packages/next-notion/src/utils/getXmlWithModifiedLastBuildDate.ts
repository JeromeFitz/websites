import { setCharAt } from '@jeromefitz/utils'
import _map from 'lodash/map'
import _slice from 'lodash/slice'

const getXmlWithModifiedLastBuildDate = ({ xmlOriginal }) => {
  /**
   * @hack
   * `lastBuildDate` is set by node-rss
   * ref: https://github.com/maxnowack/node-podcast/issues/16#issuecomment-363369279
   *
   * Instead, this should be the same as `pubDate` not a timestamp
   */
  let xml = xmlOriginal
  const dateExample = 'Thu, 06 Feb 2020 13:00:00 GMT'
  const lbdTerm = '<lastBuildDate>'
  const lbd: number = xmlOriginal.indexOf(lbdTerm)
  const lbdElement = lbd + lbdTerm.length
  const pbdTerm = '<pubDate>'
  const pbd: number = xmlOriginal.indexOf(pbdTerm)
  const pbdElement = pbd + pbdTerm.length
  const _pubDate = _slice(xmlOriginal, pbdElement, pbdElement + dateExample.length)
  _map(_pubDate, (c: string, i: number) => {
    xml = setCharAt(xml, lbdElement + i, c)
  })
  return xml
}

export { getXmlWithModifiedLastBuildDate }
