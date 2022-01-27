import { EmojiAPI } from 'emoji-api'

const emoji = new EmojiAPI()

const emojiApi = async (req, res) => {
  const icon = req?.query?.emoji
  const data = await emoji.get(icon)
  const apple = data?.images[0]
  delete data.images
  data.images = [apple]

  return !!data
    ? res.status(200).json(data)
    : res.status(500).json({
        error: {
          code: 'server_error',
          message: 'Internal server error',
        },
      })
}

export default emojiApi
