function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

  return _extends.apply(this, arguments)
}

var withPlaiceholder = function withPlaiceholder(nextConfig) {
  require('sharp')

  var sharp = 'commonjs sharp'
  return Object.assign({}, nextConfig, {
    webpack: function webpack(config, options) {
      if (Array.isArray(config.externals)) {
        config.externals.push({
          sharp: sharp,
        })
      } else {
        config.externals = _extends({}, config.externals, {
          sharp: sharp,
        })
      }

      if (typeof (nextConfig == null ? void 0 : nextConfig.webpack) === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}

export { withPlaiceholder }
//# sourceMappingURL=index.esm.js.map
