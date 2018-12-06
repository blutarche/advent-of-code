import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

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
  for (let y = minY - 1; y <= maxY + 1; y++) {
    for (let x = minX - 1; x <= maxX + 1; x++) {
      let minimumDistance = 9999,
        minimumCount = 0,
        minimumIndex = null
      for (let i = 0; i < coordinates.length; i++) {
        const coor = coordinates[i]
        const distance = getDistance({ x, y }, coor)
        if (distance < minimumDistance) {
          minimumDistance = distance
          minimumCount = 1
          minimumIndex = i
        } else if (distance === minimumDistance) {
          minimumDistance = distance
          minimumCount += 1
          minimumIndex = null
        }
      }
      const coorString = `(${x},${y})`
      if (minimumCount === 1) {
        grid[coorString] = minimumIndex
      } else {
        grid[coorString] = '.'
      }
    }
  }

  let count = {}
  let infiniteIndex = {}

  for (let y = minY - 1; y <= maxY + 1; y++) {
    const coorStringLeft = `(${minX - 1},${y})`
    const coorStringRight = `(${maxX + 1},${y})`
    const left = grid[coorStringLeft]
    if (left !== '.') infiniteIndex[left] = true
    const right = grid[coorStringRight]
    if (right !== '.') infiniteIndex[right] = true
  }
  for (let x = minX - 1; x <= maxX + 1; x++) {
    const coorStringTop = `(${x},${minY - 1})`
    const coorStringBottom = `(${x},${maxY + 1})`
    const top = grid[coorStringTop]
    if (top !== '.') infiniteIndex[top] = true
    const bottom = grid[coorStringBottom]
    if (bottom !== '.') infiniteIndex[bottom] = true
  }
  console.log(infiniteIndex)

  for (let y = minY - 1; y <= maxY + 1; y++) {
    let line = ''
    for (let x = minX - 1; x <= maxX + 1; x++) {
      const coorString = `(${x},${y})`
      const value = grid[coorString]
      line += grid[coorString]
      if (value !== '.' && !infiniteIndex[value]) {
        if (_.isUndefined(count[value])) count[value] = 1
        else count[value] += 1
      }
    }
    // console.log(line)
  }

  let max = -1,
    maxIndex = null
  const keys = Object.keys(count)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = count[key]
    if (value > max) {
      max = value
      maxIndex = key
    }
  }

  console.log(maxIndex, ':', max)
  addAnswerLine(max)

  await writeAnswer(getAnswer(), '6a')
}

main()
