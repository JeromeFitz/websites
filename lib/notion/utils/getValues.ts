function getValues(obj: any) {
  const vals: any = []

  Object.keys(obj).forEach((key) => {
    vals.push(obj[key])
  })
  return vals
}

export default getValues
