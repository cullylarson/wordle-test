import {then} from '@cullylarson/p'
import {compose, curry, filter, report} from '@cullylarson/f'
import {readInput} from './lib.js'

const HAS_LETTERS = (process.argv[2] || '').split('')
const SKIP_LETTERS = (process.argv[3] || '').split('')

const containsAllLetters = curry((letters, word) => {
  const wordLetters = word.split('')

  return letters.filter(x => wordLetters.includes(x)).length === letters.length
})

const doesntContainLetters = curry((letters, word) => {
  const wordLetters = word.split('')

  return !letters.some(x => wordLetters.includes(x))
})

then(compose(
  report,
  filter(doesntContainLetters(SKIP_LETTERS)),
  filter(containsAllLetters(HAS_LETTERS)),
), readInput('5-letter-words.txt'))
