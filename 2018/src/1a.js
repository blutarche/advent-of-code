import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const main = async () => {
  const input = await readInput('1a')

  let sum = 0
  const len = input.length

  for (let i = 0; i < len; i++) {
    const line = input[i]
    const operator = line[0]
    const number = _.toNumber(line.slice(1))
    console.log(operator, number, typeof number)
    if (operator === '+') {
      sum += number
    } else if (operator === '-') {
      sum -= number
    }
    console.log('sum:', sum)
  }
  addAnswerLine(sum)
  await writeAnswer(getAnswer(), '1a')
}

main()
