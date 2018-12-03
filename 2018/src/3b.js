import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const getBox = line => {
  line = _.replace(line, /[\s#]/g, '')
  const splitted = line.split(/[@,:x]/g)
  const claim = splitted[0]
  const X1 = _.toNumber(splitted[1])
  const Y1 = _.toNumber(splitted[2])
  const W = _.toNumber(splitted[3])
  const H = _.toNumber(splitted[4])
  const X2 = X1 + W
  const Y2 = Y1 + H
  return { claim, X1, Y1, X2, Y2 }
}

const isOverlap = (a, b) => {
  return a.X1 < b.X2 && a.Y1 < b.Y2 && a.X2 > b.X1 && a.Y2 > b.Y1
}

const main = async () => {
  const input = await readInput('3b')

  let nonOverlap = null

  for (let i = 0; i < input.length; i++) {
    let overlapWithNothing = true
    const boxA = getBox(input[i])
    for (let j = 0; j < input.length; j++) {
      if (i === j) continue
      const boxB = getBox(input[j])
      const overlap = isOverlap(boxA, boxB) || isOverlap(boxB, boxA)
      if (overlap) {
        console.log(`${boxA.claim}-${boxB.claim}`, boxA, boxB, overlap)
        overlapWithNothing = false
        break
      }
    }
    if (overlapWithNothing) {
      nonOverlap = boxA.claim
      break
    }
  }

  addAnswerLine(nonOverlap)
  await writeAnswer(getAnswer(), '3b')
}

main()
