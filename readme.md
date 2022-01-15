# Wordle Test

I want to find the best combination of words to use in [Wordle](https://www.powerlanguage.co.uk/wordle/).

I got a list of every 5-letter English word (well, I just found [a list](https://github.com/charlesreid1/five-letter-words/blob/master/sgb-words.txt), not sure if it's exhaustive). I used that to find the frequency of every letter in the list. From there I scored every word by totalling their individual letter frequencies (without counting duplicates). The higher the score, the more frequently its letters occur.

At this point, I wanted to recursively go through each combination of words and find the best total score. However, that's `5657*5656*5655*5654*5653 = 5.7831303e+18` possibilities. I think that's too many. So instead I just tried to find the first set of four words that didn't have duplicate letters.

That worked. Though, there might be better combinations if it kept searching.

Running it with five words takes a long time (I wasn't patient enough to let it finish). Some interesting results just looking for two or three words. I could potentially do an exhaustive search of the three-letter space (only `180937334760` possibilities).
