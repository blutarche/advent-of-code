import _ from 'lodash'
import moment from 'moment'

import { readInput, writeAnswer, addAnswerLine, getAnswer } from './utils'

const getLogs = inputs => {
  return _(inputs)
    .map(input => {
      const guardRegex = /Guard #([0-9]+)/
      const wakeRegex = /wakes up/
      const sleepRegex = /falls asleep/
      const dateRegex = /\[([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2})\]/
      const matchedTime = dateRegex.exec(input)
      const time = moment(matchedTime[1], 'YYYY-MM-DD HH:mm')
      if (guardRegex.test(input)) {
        const matchedGuard = guardRegex.exec(input)
        const guardId = _.toNumber(matchedGuard[1])
        return {
          time,
          guardId
        }
      } else if (wakeRegex.test(input)) {
        return {
          time,
          value: -1
        }
      } else if (sleepRegex.test(input)) {
        return {
          time,
          value: 1
        }
      }
    })
    .sortBy(log => log.time.valueOf())
    .value()
}

const main = async () => {
  const inputs = await readInput('4a')

  const logs = getLogs(inputs)

  const mostSleepGuard = _.chain(logs)
    .reduce(
      (result, log) => {
        let { guardLogs, currentGuard, lastSleep } = result
        if (log.guardId) {
          currentGuard = log.guardId
          if (!guardLogs[log.guardId]) {
            guardLogs[log.guardId] = {
              timeSpendSleeping: 0,
              sleepLogs: _.map(_.range(60), () => 0)
            }
          }
          return { guardLogs, currentGuard, lastSleep }
        }
        const minute = log.time.minute()
        guardLogs[currentGuard].sleepLogs[minute] += log.value
        if (log.value === 1) {
          lastSleep = log.time
        } else {
          const timeSpendSleeping = log.time.diff(lastSleep, 'minute')
          guardLogs[currentGuard].timeSpendSleeping += timeSpendSleeping
        }
        return { guardLogs, currentGuard, lastSleep }
      },
      {
        guardLogs: {},
        currentGuard: null,
        lastSleep: null
      }
    )
    .get('guardLogs')
    .reduce((mostSleepGuard, log, key) => {
      if (!mostSleepGuard) {
        return {
          ...log,
          id: key
        }
      }
      if (log.timeSpendSleeping > mostSleepGuard.timeSpendSleeping) {
        return {
          ...log,
          id: key
        }
      }
      return mostSleepGuard
    }, null)
    .value()
  console.log('mostSleepGuard', mostSleepGuard)

  const minuteSpendMostSleeping = _.chain(mostSleepGuard.sleepLogs)
    .reduce(
      (result, log, idx) => {
        let { count, currentMax, maxMinute } = result
        count += log
        if (currentMax < count) {
          currentMax = count
          maxMinute = idx
        }
        return { count, currentMax, maxMinute }
      },
      {
        count: 0,
        currentMax: -1,
        maxMinute: null
      }
    )
    .get('maxMinute')
    .value()
  console.log('minuteSpendMostSleeping', minuteSpendMostSleeping)

  const answer = mostSleepGuard.id * minuteSpendMostSleeping
  console.log(answer)

  addAnswerLine(answer)
  await writeAnswer(getAnswer(), '4a')
}

main()
