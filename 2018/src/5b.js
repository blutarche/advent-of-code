import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

let polymer = null

const isDestroyable = (c1, c2) => _.toLower(c1) === _.toLower(c2) && c1 !== c2

const generatePairOfAlphabet = () => {
  return _.map(_.range(26), i => {
    const smol = String.fromCharCode('a'.charCodeAt(0) + i)
    const lark = String.fromCharCode('A'.charCodeAt(0) + i)
    return new RegExp(`[${smol}${lark}]`, 'g')
  })
}

const destroyPolymer = idx => {
  // console.log('@0', polymer)
  polymer = polymer.slice(0, idx) + polymer.slice(idx + 2)
  // console.log('@1', polymer)
  const nextIdx = idx - 1
  if (nextIdx > 0 && nextIdx + 1 < polymer.length) {
    const c1 = polymer[nextIdx]
    const c2 = polymer[nextIdx + 1]
    if (isDestroyable(c1, c2)) {
      return destroyPolymer(nextIdx)
    } else {
      return nextIdx + 1
    }
  } else {
    return nextIdx
  }
}

const main = async () => {
  const inputs = await readInput('5')
  polymer = inputs[0]
  const originalPolymer = polymer

  const alphabets = generatePairOfAlphabet()

  let leastLength = polymer.length
  alphabets.forEach(regex => {
    polymer = originalPolymer.replace(regex, '')
    let nextIdx = 0
    while (true) {
      let destroyed = false
      for (let i = nextIdx; i < polymer.length - 1; i++) {
        const c1 = polymer[i]
        const c2 = polymer[i + 1]
        if (isDestroyable(c1, c2)) {
          nextIdx = destroyPolymer(i)
          destroyed = true
          break
        }
      }
      if (!destroyed) break
    }
    console.log(regex, polymer, polymer.length)
    if (polymer.length < leastLength) leastLength = polymer.length
  })

  // console.log(polymer)

  addAnswerLine(leastLength)
  await writeAnswer(getAnswer(), '5b')
}

main()
