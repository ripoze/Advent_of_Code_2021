var data = require('fs').readFileSync('day14/input.txt', 'utf8')
data = data.trim().split('\n\n')

let template = data[0]
let rules = data[1]
    .split('\n')
    .map(e => e
        .split(' -> '))
    .reduce((acc, e) => {
        acc[e[0]] = e[1]
        return acc
    }, {})

function polymerize(pairs, rules) {
    let result = new Map()
    for (let pair of pairs.keys()) {
        let numberOfPairs = pairs.get(pair)
        let n = pair[0] + rules[pair]
        result.set(n, (result.get(n) ?? 0) + numberOfPairs)
        n = rules[pair] + pair[1]
        result.set(n, (result.get(n) ?? 0) + numberOfPairs)
    }
    return result
}

function countElements(pairs) {
    let elements = {}
    for ([pair, numberOfPairs] of pairs.entries()) {
        if (pair[0] in elements) {
            elements[pair[0]] += numberOfPairs
        } else {
            elements[pair[0]] = numberOfPairs
        }

    }
    elements[template[template.length - 1]]++
    elements = Object.values(elements).sort((a, b) => b - a)

    return elements[0] - elements[elements.length - 1]
}

let pairs = new Map()
for (let i = 0; i < template.length - 1; i++) {
    let pair = [template[i], template[i + 1]].join('')
    pairs.set(pair, (pairs.get(pair) ?? 0) + 1)
}

//Part 1
for (let i = 0; i < 10; i++) {
    pairs = polymerize(pairs, rules)
}
console.log('Part 1:', countElements(pairs)) //2027

//Part 2
for (let i = 0; i < 30; i++) {
    pairs = polymerize(pairs, rules)
}
console.log('Part 2:', countElements(pairs)) //2265039461737
