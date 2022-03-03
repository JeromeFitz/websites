// import _isEmpty from 'lodash/isEmpty'
// import _size from 'lodash/size'

const getDataReturn = async ({ data, pathVariables }) => {
  /**
   * @note(plaiceholder)
   *
   * Update empty `images` object for SSR/API takeover
   * Need to do some thinkig as this generates _every_ time
   * And we should probably cache the images somewhere else.
   *
   */
  let images = !!data?.images ? {} : data?.images
  // if (_isEmpty(data?.images) || _size(data?.images) === 0) {
  // console.dir(`> ${pathVariables.url}: getImages`)
  const { getImages } = await import('./getImages')
  images = await getImages({ data, pathVariables })
  // }
  return { ...data, images }
}

export { getDataReturn }
