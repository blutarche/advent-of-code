import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const main = async () => {
  const input = await readInput('3')

  const grid = {}

  for (let i = 0; i < input.length; i++) {
    const line = _.replace(input[i], ' ', '')
    const splitted = line.split(/[@,:x]/g)
    const X = _.toNumber(splitted[1])
    const Y = _.toNumber(splitted[2])
    const W = _.toNumber(splitted[3])
    const H = _.toNumber(splitted[4])
    console.log(X, Y, W, H)
    for (let x = X; x < X + W; x++) {
      for (let y = Y; y < Y + H; y++) {
        const coor = `${x},${y}`
        if (!grid[coor]) grid[coor] = 1
        else grid[coor] += 1
      }
    }
  }
  let count = 0
  for (let x = 0; x < 1001; x++) {
    for (let y = 0; y < 1001; y++) {
      if (grid[`${x},${y}`] > 1) count++
    }
  }

  addAnswerLine(count)
  await writeAnswer(getAnswer(), '3a')
}

main()
