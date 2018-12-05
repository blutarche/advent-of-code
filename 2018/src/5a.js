import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

let polymer = null

const isDestroyable = (c1, c2) => _.toLower(c1) === _.toLower(c2) && c1 !== c2

const destroyPolymer = idx => {
  // console.log('@0', polymer)
  polymer = polymer.slice(0, idx) + polymer.slice(idx + 2)
  // console.log('@1', polymer)
  const nextIdx = idx - 1
  if (nextIdx > 0 && nextIdx + 1 < polymer.length) {
    const c1 = polymer[nextIdx]
    const c2 = polymer[nextIdx + 1]
    if (isDestroyable(c1, c2)) {
      destroyPolymer(nextIdx)
    }
  }
}

const main = async () => {
  const inputs = await readInput('5')
  polymer = inputs[0]

  while (true) {
    let destroyed = false
    for (let i = 0; i < polymer.length - 1; i++) {
      const c1 = polymer[i]
      const c2 = polymer[i + 1]
      if (isDestroyable(c1, c2)) {
        destroyPolymer(i)
        destroyed = true
        break
      }
    }
    if (!destroyed) break
  }
  console.log(polymer)

  addAnswerLine(polymer.length)
  await writeAnswer(getAnswer(), '5a')
}

main()
