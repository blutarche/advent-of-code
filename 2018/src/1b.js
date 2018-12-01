import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const main = async () => {
  const input = await readInput('1b')

  let foundFrequency = {}
  let answer = null
  let sum = 0
  const len = input.length

  while (!answer) {
    for (let i = 0; i < len; i++) {
      const line = input[i]
      const operator = line[0]
      const number = _.toNumber(line.slice(1))
      if (operator === '+') {
        sum += number
      } else if (operator === '-') {
        sum -= number
      }
      if (foundFrequency[sum]) {
        answer = sum
        break
      } else {
        foundFrequency[sum] = true
      }
    }
  }
  addAnswerLine(answer)
  await writeAnswer(getAnswer(), '1b')
}

main()
