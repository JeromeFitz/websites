import { v4 as uuid } from 'uuid'

export const colors = [
  'default',
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
]

export const setMultiSelect = (values: []) => {
  const multiSelect = []
  values.map((value) => {
    multiSelect.push({
      id: uuid(),
      color: colors[Math.floor(Math.random() * colors.length)],
      value,
    })
    return true
  })
  return { options: values }
}

const noop = () => {}

export default noop
