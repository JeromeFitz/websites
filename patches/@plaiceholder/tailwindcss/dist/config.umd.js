;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = global || self), factory((global.tailwindcss = {})))
})(this, function (exports) {
  const classNamePrefix = 'plaiceholder'

  exports.classNamePrefix = classNamePrefix
})
//# sourceMappingURL=config.umd.js.map
