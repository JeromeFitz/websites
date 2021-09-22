;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = global || self), factory((global.tailwindcss = {})))
})(this, function (exports) {
  const classNamePrefix = 'plaiceholder'

  const extractImgSrc = (plaiceholderClass) =>
    plaiceholderClass.replace([classNamePrefix, '-['].join(''), '').replace(']', '')

  exports.extractImgSrc = extractImgSrc
})
//# sourceMappingURL=utils.umd.js.map
