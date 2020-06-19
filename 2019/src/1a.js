import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const main = async () => {
  const input = await readInput('1')

  let sum = 0
  const len = input.length

  for (let i = 0; i < len; i++) {
    const line = input[i]
    const number = _.toNumber(line)
    console.log('main -> number', number)
    const fuel = Math.floor(number / 3) - 2
    console.log('main -> fuel', fuel)
    sum += fuel
  }
  addAnswerLine(sum)
  await writeAnswer(getAnswer(), '1a')
}

main()
