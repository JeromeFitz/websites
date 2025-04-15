function getTitleData({ data, type }: { data: any; type: string }) {
  const typeData = data[type]
  const dataReturn = typeData[0]?.plain_text ?? ''
  return dataReturn
}

export { getTitleData }
