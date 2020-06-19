import { promises as fs } from 'fs'
import path from 'path'
import _ from 'lodash'

export const writeAnswer = (answer, filename) => {
  console.log('******************')
  console.log('*     ANSWER     *')
  console.log('******************')
  console.log(answer)
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, '../answer/', filename), answer, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

export const readInput = async fileName => {
  const content = await fs.readFile(path.join(__dirname, '../input/', fileName))
  const splitted = content.toString().split('\n')
  return _.filter(splitted, s => s && s.length > 0)
}

const answerLines = []
export const addAnswerLine = str => answerLines.push(str)
export const getAnswer = () => answerLines.join('\n')
