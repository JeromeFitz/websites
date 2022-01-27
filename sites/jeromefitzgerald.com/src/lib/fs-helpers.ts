/* eslint-disable @typescript-eslint/restrict-plus-operands */
import fs from 'fs'
import { promisify } from 'util'

export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)
export const writeFileSyncRecursive = (filename, content, charset) => {
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
