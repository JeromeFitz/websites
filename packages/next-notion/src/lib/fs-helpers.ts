/* eslint-disable @typescript-eslint/restrict-plus-operands */
import fs from 'node:fs'
import { promisify } from 'node:util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const writeFileSyncRecursive = (filename, content, charset) => {
  // create folder path if not exists
  filename
    .split('/')
    .slice(0, -1)
    .reduce((last, folder) => {
      const folderPath = last ? last + '/' + folder : folder
      if (!fs.existsSync('/' + folderPath)) {
        fs.mkdirSync('/' + folderPath)
      }
      return folderPath
    })

  fs.writeFileSync(filename, content, charset)
}

export { readFile, writeFile, writeFileSyncRecursive }
