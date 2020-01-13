export const analyseText = (sentence) => {
    let sentenceLowerCase = sentence.toLowerCase()
    let trimmedText = stripAllCharExceptAlphabet(sentenceLowerCase)
    let letterStats = countLetterAppearance(trimmedText)
    let letterInfo = []
    for (var key in letterStats) {
        let charIndexes = getCharIndexesInString(key, trimmedText)
        let charBefore = getCharRelationInString(charIndexes, trimmedText, true)
        let charAfter = getCharRelationInString(charIndexes, trimmedText, false)
        let maxDistance = countMaxDistanceBetweenCharsIndexes(charIndexes)

        if (charBefore.length == 0) {
            charBefore = "none"
        }

        letterInfo.push({char: key.toUpperCase(), count: letterStats[key], charBefore: charBefore, charAfter: charAfter, maxDistance: maxDistance})
    }
    return letterInfo
}

export const countLetterAppearance = (sentence) => {
    return [...sentence].reduce((total, letter) => { total[letter] = total[letter] ? total[letter] + 1 : 1; return total }, {})
}

export const stripAllCharExceptAlphabet = (sentence) => {
    return sentence.replace(/[^a-z]/g, '')
}

export const getCharIndexesInString = (char, text) => {
    return [...text.matchAll(new RegExp(char, 'gi'))].map(letter => letter.index)
}

export const getCharRelationInString = (charIndexes, text, toggleBefore) => {
    let char = []
    for (var index in charIndexes) {
        let charFound
        if (toggleBefore) {
            charFound = text.charAt(charIndexes[index] - 1)
        } else {
            charFound = text.charAt(charIndexes[index] + 1)
        }
        if (charFound) {
            char.push(charFound)
        }
    }

    return char.join(',')
}

export const countMaxDistanceBetweenCharsIndexes = (charIndexes) => {
    if (charIndexes.length > 1) {
        return charIndexes[charIndexes.length - 1] - charIndexes[0]
    }
}