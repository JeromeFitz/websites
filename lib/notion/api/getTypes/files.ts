import _size from 'lodash/size'

const files = (data: any) => {
  // console.dir(`> getTypeFilesNormalized`)
  // console.dir(data)
  const returnData = _size(data.files) > 0 ? data?.files[0]?.name : null
  // console.dir(`> returnData`)
  // console.dir(returnData)
  return returnData
  // // @todo(zeroArray)
  // (data.files[0].type === 'external'
  //   ? {
  //       name: data.files[0].name,
  //       url: data.files[0].external.url,
  //       expiryTime: null,
  //     }
  //   : {
  //       name: data.files[0].name,
  //       url: data.files[0].file.url,
  //       expiryTime: data.files[0].file.expiry_time,
  //     })
}

export default files
