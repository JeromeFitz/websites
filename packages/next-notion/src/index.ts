import { uuidConverter, uuidValidate } from './utils/uuid'

const strings = [
  '27360d9b5f274dc2ac19ad09837b6860',
  '27360d9b5f274dc2ac19ad09837b6860a',
  '27360d9b-5f27-4dc2-ac19-ad09837b6860',
  '27360d9b-5f27-4dc2-ac19-ad09837b6860a',
]

function foo() {
  // @todo(complexity) 11
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: migrate
  strings.map((str) => {
    console.dir(`--- ---`)
    console.dir(`${str}: `)
    const isValid = uuidValidate(str)
    console.dir(`- [${isValid ? 'x' : ' '}] uuidValidate`)
    if (!isValid) {
      const _str = uuidConverter(str)
      console.dir(`- [${_str ? 'x' : ' '}] ${_str}`)
    } else {
      console.dir(`- [${isValid ? 'x' : ' '}] ${str}`)
    }
  })
}

foo()

export default foo
