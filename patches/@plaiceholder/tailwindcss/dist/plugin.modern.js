import childProcess from 'child_process'
import crypto from 'crypto'
import v8 from 'v8'

import plugin$1 from 'tailwindcss/plugin'

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

var cryptoRandomString = (length) => {
  if (!Number.isFinite(length)) {
    throw new TypeError('Expected a finite number')
  }

  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

var uniqueString = () => cryptoRandomString(32)

const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g

var escapeStringRegexp = (string) => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string')
  }

  return string.replace(matchOperatorsRegex, '\\$&')
}

class Subsume {
  static parse(text, id) {
    return new Subsume(id).parse(text)
  }

  static parseAll(text, ids) {
    if (ids && !Array.isArray(ids)) {
      throw new TypeError('IDs is supposed to be an array')
    }

    const result = {
      data: new Map(),
      rest: text,
    }
    const idList = ids ? ids : Subsume._extractIDs(text)

    if (!ids) {
      try {
        Subsume._checkIntegrity(text)
      } catch (error) {
        throw new Error(
          `Could not parse because the string's integrity is compromised: ${error.message}`
        )
      }
    }

    for (const id of idList) {
      if (result.data.get(id)) {
        throw new Error(
          "IDs aren't supposed to be repeated at the same level in a string"
        )
      }

      const res = Subsume.parse(result.rest, id)
      result.data.set(id, res.data)
      result.rest = res.rest
    }

    return result
  }

  static _extractIDs(text) {
    try {
      Subsume._checkIntegrity(text)
    } catch (error) {
      throw new Error(
        `Could not extract IDs because the string's integrity is compromised: ${error.message}`
      )
    }

    const idRegex = /@@\[(.{32})\]@@.*##\[\1\]##/g
    const idList = []
    let match

    do {
      match = idRegex.exec(text)

      if (match) {
        const [, id] = match
        idList.push(id)
      }
    } while (match)

    return idList
  }

  static _checkIntegrity(text) {
    const delimiterRegex = /([#|@])\1\[(.{32})\]\1{2}/g
    const ids = new Map()
    const idStack = []
    let match

    do {
      match = delimiterRegex.exec(text)

      if (match) {
        const [, embedToken, id] = match

        if (embedToken === '@') {
          let map = ids

          for (const el of idStack) {
            map = map.get(el)
          }

          if (map.get(id)) {
            throw new Error('There are duplicate IDs in the same scope.')
          }

          map.set(id, new Map())
          idStack.push(id)
        } else {
          idStack.pop()
        }
      }
    } while (match)

    if (idStack.length !== 0) {
      throw new Error('There is a mismatch between prefixes and suffixes')
    }

    return ids
  }

  constructor(id) {
    if (id && (id.includes('@@[') || id.includes('##['))) {
      throw new Error('`@@[` and `##[` cannot be used in the ID')
    }

    this.id = id ? id : uniqueString()
    this.prefix = `@@[${this.id}]@@`
    this.postfix = `##[${this.id}]##`
    this.regex = new RegExp(
      escapeStringRegexp(this.prefix) +
        '([\\S\\s]*)' +
        escapeStringRegexp(this.postfix),
      'g'
    )
  }

  compose(text) {
    return this.prefix + text + this.postfix
  }

  parse(text) {
    try {
      Subsume._checkIntegrity(text)
    } catch (error) {
      throw new Error(
        `Could not extract IDs because the string's integrity is compromised: ${error.message}`
      )
    }

    const ret = {}
    ret.rest = text.replace(this.regex, (m, p1) => {
      if (p1) {
        ret.data = p1
      }

      return ''
    })
    return ret
  }
}

var subsume = Subsume

const HUNDRED_MEGABYTES = 1000 * 1000 * 100

var makeSynchronous = (function_) => {
  return (...arguments_) => {
    const serializedArguments = v8.serialize(arguments_).toString('hex')
    const subsume$1 = new subsume()
    const input = `
			const v8 = require('v8');
			const Subsume = require('subsume');

			const subsume = new Subsume('${subsume$1.id}');

			const send = value => {
				const serialized = v8.serialize(value).toString('hex');
				process.stdout.write(subsume.compose(serialized));
			};

			(async () => {
				try {
					const arguments_ = v8.deserialize(Buffer.from('${serializedArguments}', 'hex'));
					const result = await (${function_})(...arguments_);
					send({result});
				} catch (error) {
					send({error});
				}
			})();
		`
    const {
      error: subprocessError,
      stdout,
      stderr,
    } = childProcess.spawnSync(process.execPath, ['-'], {
      input,
      encoding: 'utf8',
      maxBuffer: HUNDRED_MEGABYTES,
      env: _extends({}, process.env, {
        ELECTRON_RUN_AS_NODE: '1',
      }),
    })

    if (subprocessError) {
      throw subprocessError
    }

    const { data, rest } = subsume$1.parse(stdout)
    process.stdout.write(rest)
    process.stderr.write(stderr)

    if (!data) {
      return
    }

    const { error, result } = v8.deserialize(Buffer.from(data, 'hex'))

    if (error) {
      throw error
    }

    return result
  }
}

const classNamePrefix = 'plaiceholder'

const getPlaiceholder = makeSynchronous(async (imageUrl) => {
  const { getPlaiceholder } = require('plaiceholder')

  const { css } = await getPlaiceholder(imageUrl)
  return css
})
var plugin = plugin$1(async (props) => {
  if (typeof props === 'undefined') {
    // console.warn("warn - `@plaiceholder/tailwindcss` no props passed");
    return
  } else {
    console.warn(
      "warn - `@plaiceholder/tailwindcss` uses Tailwind's JIT engine and is not covered by semver."
    )
    const { config, matchUtilities } = props
    const configMode = await config('mode')

    if (typeof configMode === 'undefined') {
      // console.warn("warn - `@plaiceholder/tailwindcss` no config passed.");
      return
    } else {
      if (configMode !== 'jit') {
        console.warn('warn - `@plaiceholder/tailwindcss` only supports JIT mode.') // console.warn(configMode)
      }
    }

    if (typeof matchUtilities === 'undefined') {
      // console.warn("warn - `@plaiceholder/tailwindcss` no matchUtilities passed.");
      return
    } else {
      matchUtilities({
        [classNamePrefix]: (url) => getPlaiceholder(url),
      })
    } // console.warn("warn - `@plaiceholder/tailwindcss` complete");
  }
})

export default plugin
//# sourceMappingURL=plugin.modern.js.map
