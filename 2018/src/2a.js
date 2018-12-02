import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const main = async () => {
  const input = await readInput('2a')

  let twoCount = 0
  let threeCount = 0

  input.forEach(line => {
    let twos = []
    let threes = []
    let dict = {}
    console.log(line)
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (!dict[ch]) {
        dict[ch] = 1
      } else {
        dict[ch] += 1
      }
      if (dict[ch] === 2) {
        twos.push(ch)
      } else if (dict[ch] === 3) {
        threes.push(ch)
        twos = _.reject(twos, c => c === ch)
      } else if (dict[ch] === 4) {
        threes = _.reject(threes, c => c === ch)
      }
    }
    console.log('twos', twos)
    console.log('threes', threes)
    console.log('dict', dict)
    if (twos.length > 0) twoCount += 1
    if (threes.length > 0) threeCount += 1
  })
  console.log(twoCount)
  console.log(threeCount)
  addAnswerLine(twoCount * threeCount)
  await writeAnswer(getAnswer(), '2a')
}

main()
