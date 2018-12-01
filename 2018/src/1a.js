import { readInput, writeAnswer } from './utils'

const main = async () => {
  const input = await readInput('1a')
  console.log(input)
  await writeAnswer(['a', 'b'], '1a')
}

main()
