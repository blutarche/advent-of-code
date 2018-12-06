import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const MAX_DISTANCE = 10000

const getDistance = (p1, p2) => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

const main = async () => {
  const inputs = await readInput('6')

  let maxX = -1,
    maxY = -1,
    minX = 9999,
    minY = 9999
  const coordinates = _.map(inputs, input => {
    const splitted = input.split(', ')
    const x = _.toNumber(splitted[0])
    const y = _.toNumber(splitted[1])
    if (x > maxX) maxX = x
    if (x < minX) minX = x
    if (y > maxY) maxY = y
    if (y < minY) minY = y
    return { x, y }
  })
  console.log(coordinates)
  console.log(minX, maxX, minY, maxY)
  const grid = {}
  let count = 0
  for (let y = minY - 1; y <= maxY + 1; y++) {
    for (let x = minX - 1; x <= maxX + 1; x++) {
      let sum = 0
      for (let i = 0; i < coordinates.length; i++) {
        const coor = coordinates[i]
        const distance = getDistance({ x, y }, coor)
        sum += distance
      }
      const coorString = `(${x},${y})`
      if (sum < MAX_DISTANCE) {
        grid[coorString] = '#'
        count += 1
      } else {
        grid[coorString] = '.'
      }
    }
  }
  console.log(count)
  addAnswerLine(count)

  await writeAnswer(getAnswer(), '6')
}

main()
