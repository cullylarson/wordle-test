import fs from 'fs'
import {promisify} from 'util'
import {then} from '@cullylarson/p'
import {compose, filter, split} from '@cullylarson/f'

const readFile = promisify(fs.readFile)

export const readInput = (fileName) => then(compose(
  filter(Boolean),
  split('\n'),
), readFile(fileName, {encoding: 'utf8'}))
