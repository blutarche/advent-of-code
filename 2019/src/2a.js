import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const main = async () => {
  const input = await readInput('2a')

  let sum = 0
  const len = input.length

  const line = input[0]

  const ar = line.split(',')

  for (let i = 0; i < ar.length; i++) {
    ar[i] = _.toNumber(ar[i])
  }

  ar[1] = 12
  ar[2] = 2

  for (let op = 0; op < ar.length; op += 4) {
    if (ar[op] === 99) break
    const operator = ar[op]
    const a = ar[op + 1]
    const b = ar[op + 2]
    const pos = ar[op + 3]
    let temp = 0
    if (operator === 1) {
      temp = ar[a] + ar[b]
    } else {
      temp = ar[a] * ar[b]
    }
    ar[pos] = temp
    console.log(ar)
  }

  console.log(ar[0])

  addAnswerLine(sum)
  await writeAnswer(getAnswer(), '2a')
}

main()
