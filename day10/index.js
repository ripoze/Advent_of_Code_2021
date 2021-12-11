var data = require('fs').readFileSync('day10/input.txt', 'utf8')
data = data.trim().split('\n')

function isCorrupted(line) {
    let corrupted = false
    let lastOpeningCharacter = ''
    let openingCharacters = { '{': 0, '<': 0, '[': 0, '(': 0 }
    let closingCharacters = { '}': 0, '>': 0, ']': 0, ')': 0 }

    while (1) {
        line = line.split('{}').join('')
        line = line.split('()').join('')
        line = line.split('<>').join('')
        line = line.split('[]').join('')
        if (line.indexOf('()') == -1 && line.indexOf('[]') == -1 && line.indexOf('<>') == -1 && line.indexOf('{}') == -1) {
            break
        }
    }
    for (c of line) {
        if (Object.keys(openingCharacters).includes(c)) { lastOpeningCharacter = c }
        if (Object.keys(closingCharacters).includes(c)) {
            if (lastOpeningCharacter !== c) {
                corrupted = c
                break
            }
        }
    }
    if (corrupted == ')') { return 3 }
    if (corrupted == ']') { return 57 }
    if (corrupted == '}') { return 1197 }
    if (corrupted == '>') { return 25137 }
    return false
}

function autoComplete(line) {
    while (1) {
        line = line.split('{}').join('')
        line = line.split('()').join('')
        line = line.split('<>').join('')
        line = line.split('[]').join('')
        if (line.indexOf('()') == -1 && line.indexOf('[]') == -1 && line.indexOf('<>') == -1 && line.indexOf('{}') == -1) {
            break
        }
    }
    line = line.split('').reverse().join('').replace(/</g, '>').replace(/{/g, '}').replace(/\[/g, ']').replace(/\(/g, ')')
    let score = 0
    for (c of line) {
        score *= 5
        if (c == ')') { score += 1 }
        if (c == ']') { score += 2 }
        if (c == '}') { score += 3 }
        if (c == '>') { score += 4 }
    }
    return score
}
//Part 1
console.log('Part 1 :', data.reduce((sum, line) => sum + isCorrupted(line), 0)) //296535

//Part 2
data = data.filter(line => !isCorrupted(line))
let scores = data.map(line => autoComplete(line)).sort((a, b) => a - b)
console.log('Part 2 :', scores[parseInt(scores.length / 2)]) //4245130838