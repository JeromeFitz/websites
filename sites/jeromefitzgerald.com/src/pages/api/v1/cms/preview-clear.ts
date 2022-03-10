// eslint-disable-next-line @typescript-eslint/require-await
const PreviewClear = async (_, res) => {
  res.clearPreviewData()
  res.writeHead(307, { Location: '/' })
  res.end()
}

export default PreviewClear
