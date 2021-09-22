const classNamePrefix = 'plaiceholder'

const extractImgSrc = (plaiceholderClass) =>
  plaiceholderClass.replace([classNamePrefix, '-['].join(''), '').replace(']', '')

exports.extractImgSrc = extractImgSrc
//# sourceMappingURL=utils.js.map
