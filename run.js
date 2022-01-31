import {then} from '@cullylarson/p'
import {compose, map, filter, split, report} from '@cullylarson/f'
import {readInput} from './lib.js'

const NUM_WORDS_TO_FIND = 2
const EXCLUDE_DUPLICATES_IN_WORDS = true

const flat = xs => xs.flat()

const add = (x, y) => x + y

const scoreCompare = (a, b) => b.score - a.score

const getLetterFrequency = compose(
  letters => letters.reduce((acc, letter) => {
    if(!acc[letter]) {
      acc[letter] = 0
    }

    acc[letter]++

    return acc
  }, {}),
  flat,
  map(split('')),
)

const removeDuplicates = xs => Array.from(new Set(xs))

const scoreWord = (word, letterFrequency) => {
  return compose(
    xs => xs.reduce(add, 0),
    map(x => letterFrequency[x]),
    removeDuplicates,
    split(''),
  )(word)
}

const scoreWords = words => {
  const letterFrequency = getLetterFrequency(words)

  return words.map(word => ({
    word,
    score: scoreWord(word, letterFrequency),
  }))
}

const wordHasLetters = (word, letters) => {
  const wordLetters = word.split('')

  return wordLetters.some(x => letters.includes(x))
}

const findSubPath = (details, startIdx, score, letters, numToFind) => {
  for(let i = startIdx; i < details.length; i++) {
    const detail = details[i]
    const word = detail.word

    if(wordHasLetters(word, letters)) {
      continue
    }

    if(numToFind === 1) {
      return {
        path: [word],
        // need removeDuplicates because the word itself might have duplicates
        letters: removeDuplicates(letters.concat(word.split(''))),
        score: score + detail.score,
      }
    }

    const result = findSubPath(
      details,
      i + 1,
      score,
      [...letters, ...word.split('')],
      numToFind - 1,
    )

    if(result.path.length !== numToFind - 1) {
      continue
    }

    return {
      path: [word, ...result.path],
      // this already has the letters from our word
      letters: result.letters,
      score: score + result.score,
    }
  }

  return {
    path: [],
    letters,
    score,
  }
}

const findPath = (details) => {
  return findSubPath(details, 0, 0, [], NUM_WORDS_TO_FIND)
}

const noDuplicates = x => x.length === removeDuplicates(x).length

then(compose(
  report,
  x => ({
    ...x,
    letters: x.letters.sort(),
    numLetters: x.letters.length,
  }),
  findPath,
  xs => xs.sort(scoreCompare),
  scoreWords,
  xs => EXCLUDE_DUPLICATES_IN_WORDS ? filter(noDuplicates, xs) : xs,
), readInput('5-letter-words.txt'))
