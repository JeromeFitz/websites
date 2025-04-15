import { validate as uuidValidate } from 'uuid'

const delimiter = '-'
const indexes = [8, 13, 18, 23]

function insertString(str: string, index: number, value: string) {
  return str.substr(0, index) + value + str.substr(index)
}

function setDelimeter(_uuid: string) {
  indexes.map((idx) => {
    _uuid = insertString(_uuid, idx, delimiter)
  })
  return _uuid
}

function uuidConverter(_uuid: string) {
  if (uuidValidate(_uuid)) return _uuid
  if (_uuid.length === 32) return setDelimeter(_uuid)
  return null
}

export { uuidConverter, uuidValidate }
