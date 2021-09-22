const classNamePrefix = 'plaiceholder'

const extractImgSrc = (plaiceholderClass) =>
  plaiceholderClass.replace([classNamePrefix, '-['].join(''), '').replace(']', '')

export { extractImgSrc }
//# sourceMappingURL=utils.esm.js.map
