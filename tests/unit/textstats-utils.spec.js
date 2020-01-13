import * as utils from '@/utils/TextStats'

describe('stripAllCharExceptAlphabet function', () => {
    it('should strip all characters expect alphabet correctly', () => {
        const sentence = "it's cool and awesome!=/@#%"
        const trimmedText = utils.stripAllCharExceptAlphabet(sentence)
        expect(trimmedText).toBe("itscoolandawesome")
    })
})

describe('countLetterAppearance function', () => {
    it('should return the occurrence of the letters appeared correctly', () => {
        const sentence = "its cool and awesome"
        const trimmedText = utils.stripAllCharExceptAlphabet(sentence)
        const letterStats = utils.countLetterAppearance(trimmedText)
        expect(letterStats).toStrictEqual({
            i: 1,
            t: 1,
            s: 2,
            c: 1,
            o: 3,
            l: 1,
            a: 2,
            n: 1,
            d: 1,
            w: 1,
            e: 2,
            m: 1
          })
    })
})

describe('getCharIndexesInString function', () => {
    it('should return character indexes correctly', () => {
        const sentence = "its cool and awesome"
        const trimmedText = utils.stripAllCharExceptAlphabet(sentence)
        let charIndexes = utils.getCharIndexesInString('o', trimmedText)
        expect(charIndexes).toStrictEqual([ 4, 5, 14 ])
    })
})

describe('getCharRelationInString function', () => {
    it('should return the character that exists before it correctly', () => {
        const sentence = "its cool and awesome"
        const trimmedText = utils.stripAllCharExceptAlphabet(sentence)
        let charIndexes = utils.getCharIndexesInString('o', trimmedText)
        let charBefore = utils.getCharRelationInString(charIndexes, trimmedText, true)
        expect(charBefore).toBe("c,o,s")
    })

    it('should return the character that exists after it correctly', () => {
        const sentence = "its cool and awesome"
        const trimmedText = utils.stripAllCharExceptAlphabet(sentence)
        let charIndexes = utils.getCharIndexesInString('o', trimmedText)
        let charBefore = utils.getCharRelationInString(charIndexes, trimmedText, false)
        expect(charBefore).toBe("o,l,m")
    })
})

describe('countMaxDistanceBetweenCharsIndexes function', () => {
    it('should return the max distance between the two same characters correctly', () => {
        const sentence = "its cool and awesome"
        const trimmedText = utils.stripAllCharExceptAlphabet(sentence)
        let charIndexes = utils.getCharIndexesInString('o', trimmedText)
        let maxDistance = utils.countMaxDistanceBetweenCharsIndexes(charIndexes)
        expect(maxDistance).toBe(10)
    })
})

describe('analyseText function', () => {
    it('should return analysis of the characters correctly', () => {
        const sentence = "its cool and awesome"
        const analysisResult = utils.analyseText(sentence)
        expect(analysisResult).toStrictEqual([
            {
              char: 'I',
              count: 1,
              charBefore: 'none',
              charAfter: 't',
              maxDistance: undefined
            },
            {
              char: 'T',
              count: 1,
              charBefore: 'i',
              charAfter: 's',
              maxDistance: undefined
            },
            {
              char: 'S',
              count: 2,
              charBefore: 't,e',
              charAfter: 'c,o',
              maxDistance: 11
            },
            {
              char: 'C',
              count: 1,
              charBefore: 's',
              charAfter: 'o',
              maxDistance: undefined
            },
            {
              char: 'O',
              count: 3,
              charBefore: 'c,o,s',
              charAfter: 'o,l,m',
              maxDistance: 10
            },
            {
              char: 'L',
              count: 1,
              charBefore: 'o',
              charAfter: 'a',
              maxDistance: undefined
            },
            {
              char: 'A',
              count: 2,
              charBefore: 'l,d',
              charAfter: 'n,w',
              maxDistance: 3
            },
            {
              char: 'N',
              count: 1,
              charBefore: 'a',
              charAfter: 'd',
              maxDistance: undefined
            },
            {
              char: 'D',
              count: 1,
              charBefore: 'n',
              charAfter: 'a',
              maxDistance: undefined
            },
            {
              char: 'W',
              count: 1,
              charBefore: 'a',
              charAfter: 'e',
              maxDistance: undefined
            },
            {
              char: 'E',
              count: 2,
              charBefore: 'w,m',
              charAfter: 's',
              maxDistance: 4
            },
            {
              char: 'M',
              count: 1,
              charBefore: 'o',
              charAfter: 'e',
              maxDistance: undefined
            }
          ])
    })
})