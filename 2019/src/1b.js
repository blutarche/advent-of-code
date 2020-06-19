import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const main = async () => {
  const input = await readInput('1b')

  let sum = 0
  const len = input.length

  for (let i = 0; i < len; i++) {
    const line = input[i]
    const number = _.toNumber(line)

    let n = number
    let tempSum = 0
    while (n > 0) {
      console.log('main -> number', number)
      const fuel = Math.floor(n / 3) - 2
      console.log('main -> fuel', fuel)
      if (fuel <= 0) break
      tempSum += fuel
      n = fuel
    }
    sum += tempSum
  }
  addAnswerLine(sum)
  await writeAnswer(getAnswer(), '1b')
}

main()
