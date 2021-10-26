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

const withPlaiceholder = (nextConfig) => {
  require('sharp')

  const sharp = 'commonjs sharp'
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (Array.isArray(config.externals)) {
        config.externals.push({
          sharp,
        })
      } else {
        config.externals = _extends({}, config.externals, {
          sharp,
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
//# sourceMappingURL=index.modern.js.map
