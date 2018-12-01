import { promises as fs } from 'fs'
import path from 'path'

export const writeAnswer = (arrayOfLines, filename) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, '../answer/', filename),
      arrayOfLines.join('\n'),
      err => {
        if (err) {
          reject(err)
        }
        resolve()
      }
    )
  })
}

export const readInput = async fileName => {
  const content = await fs.readFile(path.join(__dirname, '../input/', fileName))
  return content.toString().split('\n')
}
