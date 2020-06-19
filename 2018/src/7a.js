import _ from 'lodash'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const getNodes = inputs => {
  let nodes = {}
  let reverseNodes = {}
  _.forEach(inputs, input => {
    const [from, to] = input
      .replace('Step ', '')
      .replace('must be finished before step ', '')
      .replace(' can begin.', '')
      .split(' ')
    if (!nodes[from]) {
      nodes[from] = [to]
    } else {
      nodes[from].push(to)
      nodes[from].sort()
    }
    if (!nodes[to]) nodes[to] = []

    if (!reverseNodes[to]) {
      reverseNodes[to] = [from]
    } else {
      reverseNodes[to].push(from)
      reverseNodes[to].sort()
    }
    if (!reverseNodes[from]) reverseNodes[from] = []
  })
  return { nodes, reverseNodes }
}

const findStartNode = reverseNodes => {
  return _.findKey(reverseNodes, o => o.length === 0)
}

let answer = ''
let possibleNodes = []
let nodes = {}
let reverseNodes = {}

const traverse = currentNode => {
  answer += currentNode
  // console.log('=====>', currentNode)
  // console.log('possibleNodes', possibleNodes)
  if (possibleNodes.length === 0) return null
  reverseNodes = _.mapValues(reverseNodes, reverseNode => {
    return _.filter(reverseNode, o => o !== currentNode)
  })
  possibleNodes = _.reject(possibleNodes, o => o === currentNode)
  const nextPossibleNodes =
    _.filter(nodes[currentNode], o => {
      return !_.includes(answer, o)
    }) || []
  // console.log('nextPossibleNodes', nextPossibleNodes)
  possibleNodes = [...(possibleNodes || []), ...(nextPossibleNodes || [])]
  possibleNodes = _.chain(possibleNodes)
    .uniq()
    .sort()
    .value()
  // console.log('@after possibleNodes', possibleNodes)
  const nextNodeIndex = _.findIndex(possibleNodes, o => {
    // console.log('>>> reverseNodes', o, reverseNodes[o])
    return !_.includes(answer, o) && reverseNodes[o].length === 0
  })
  // console.log('nextNode', possibleNodes[nextNodeIndex])
  if (nextNodeIndex !== -1) traverse(possibleNodes[nextNodeIndex])
}

const main = async () => {
  const inputs = await readInput('7')
  const resp = getNodes(inputs)
  nodes = resp.nodes
  reverseNodes = resp.reverseNodes
  console.log('nodes', nodes)
  console.log('reverseNodes', reverseNodes)
  const keys = Object.keys(reverseNodes)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (reverseNodes[key].length === 0) possibleNodes.push(key)
  }
  possibleNodes = _.chain(possibleNodes)
    .uniq()
    .sort()
    .value()
  traverse(possibleNodes[0])

  addAnswerLine(answer)
  await writeAnswer(getAnswer(), '7a')
}

main()
