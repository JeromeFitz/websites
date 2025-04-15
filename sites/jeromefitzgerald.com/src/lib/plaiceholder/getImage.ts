import { getPlaiceholder } from 'plaiceholder'

const getImage = async (src: string) => {
  // console.dir(`src: ${src}`)
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  )

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 })

  return {
    ...plaiceholder,
    img: { height, src, width },
  }
}

export { getImage }

/**
 * @note(plaiceholder) usage
 * ref: https://plaiceholder.co/docs/upgrading-to-3
 *
 */
// const { base64, img } = await getImage(
//   'https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80'
// )
