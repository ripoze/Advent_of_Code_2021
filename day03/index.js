var data = require('fs').readFileSync('day03/input.txt', 'utf8')
data = data.split('\n')
data.pop()

function mostCommonBit(data, bit) {
    let sum = data.reduce((sum, e, i) => {
        return sum += e.split('')[bit] == '1' ? 1 : 0
    }, 0)
    return sum >= data.length / 2 ? '1' : '0'
}

function leastCommonBit(data, bit) {
    let sum = data.reduce((sum, e, i) => {
        return sum += e.split('')[bit] == '1' ? 1 : 0
    }, 0)
    return sum >= data.length / 2 ? '0' : '1'
}

function gammaRate(data) {
    let gamma = ''
    for (let i = 0; i < data[0].length; i++) {
        let bit = mostCommonBit(data, i)
        gamma += bit
    }
    return parseInt(gamma, 2)
}

function epsilonRate(data) {
    let gamma = ''
    for (let i = 0; i < data[0].length; i++) {
        let bit = leastCommonBit(data, i)
        gamma += bit
    }
    return parseInt(gamma, 2)
}

function oxygenGeneratorRating(data, startBit = 0) {
    let nextData = []
    let filter = mostCommonBit(data, startBit)
    for (let i = 0; i < data.length; i++) {
        if (data[i][startBit] == filter) nextData.push(data[i])
    }
    if (nextData.length > 1) return oxygenGeneratorRating(nextData, ++startBit)
    return parseInt(nextData[0], 2)

}

function co2ScrubberRating(data, startBit = 0) {
    let nextData = []
    let filter = leastCommonBit(data, startBit)
    for (let i = 0; i < data.length; i++) {
        if (data[i][startBit] == filter) nextData.push(data[i])
    }
    if (nextData.length > 1) return co2ScrubberRating(nextData, ++startBit)
    return parseInt(nextData[0], 2)

}

console.log('Part 1: ' + gammaRate(data) * epsilonRate(data)) //1458194
console.log('Part 2: ' + oxygenGeneratorRating(data) * co2ScrubberRating(data)) //2829354