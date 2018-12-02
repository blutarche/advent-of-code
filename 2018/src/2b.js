import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const findOnlyDiffIndex = (boxes, currentBox) => {
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i]
    let diff = 0
    const firstDiffIndex = null
    for (let j = 0; j < box.length; j++) {
      const chBox = box[j]
      const chCurrentBox = currentBox[j]
      if (chBox !== chCurrentBox) {
        diff += 1
        if (_.isNull(firstDiffIndex)) firstDiffIndex = j
      }
    }
    if (diff === 1) {
      console.log(box)
      console.log(currentBox)
      console.log(firstDiffIndex)
      return firstDiffIndex
    }
  }
  return null
}

const main = async () => {
  const input = await readInput('2b')

  let answer = null

  for (let i = 0; i < input.length; i++) {
    const currentBox = input[i]
    for (let j = i + 1; j < input.length; j++) {
      const idx = findOnlyDiffIndex(_.slice(input, j), currentBox)
      if (!_.isNull(idx)) {
        answer = currentBox.slice(0, idx) + currentBox.slice(idx + 1)
        break
      }
    }
    if (answer) break
  }

  addAnswerLine(answer)
  await writeAnswer(getAnswer(), '2b')
}

main()
