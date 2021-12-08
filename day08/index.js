var data = require('fs').readFileSync('day08/input.txt', 'utf8')
data = data.trim().split('\n').map(e => e.split(' | '))

let outputs = data.map(e => e[1].split(' '))

//Part 1
console.log('Part 1:', outputs.flat().filter(e => [2, 3, 4, 7].includes(e.length)).length)


//Part 2
outputs = data.map(e => e[1].split(' '))
let inputs = data.map(e => e[0].split(' '))

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

function decodeInputs(input) {
    set1 = new Set()
    set2 = new Set()

    let key = {}
    input = input.map(e => e.split(''))

    key[1] = new Set(...input.filter(e => e.length == 2))
    key[4] = new Set(...input.filter(e => e.length == 4))
    key[7] = new Set(...input.filter(e => e.length == 3))
    key[8] = new Set(...input.filter(e => e.length == 7))

    //3 - 1 = 3 segments
    input.map(e => {
        if (difference(new Set(e), key[1]).size == 3) {
            key[3] = new Set([...e])
        }
    })

    //6 - 1 = 5 segments
    input.map(e => {
        if (e.length == 6 && difference(new Set(e), key[1]).size == 5) {
            key[6] = new Set([...e])
        }
    })

    //0-1=4  && 0-4=3 segments
    input.map(e => {
        if (e.length == 6 && difference(new Set(e), key[1]).size == 4 && difference(new Set(e), key[4]).size == 3) {
            key[0] = new Set([...e])
        }
    })

    //9-1=4 && 9-4=2
    input.map(e => {
        if (e.length == 6 && difference(new Set(e), key[1]).size == 4 && difference(new Set(e), key[4]).size == 2) {
            key[9] = new Set([...e])
        }
    })

    //2-1=3 && 2-9=1
    input.map(e => {
        if (difference(new Set(e), key[1]).size == 4 && key[9] && difference(new Set(e), key[9]).size == 1 && e.length == 5) {
            key[2] = new Set([...e])
        }
    })

    //5-1=3 && 5-6=1
    input.map(e => {
        if (difference(new Set(e), key[1]).size == 4 && difference(new Set(e), key[9]).size == 0 && e.length == 5) {
            key[5] = new Set([...e])
        }
    })

    return key
}

function decodeOutput(output, key) {
    let areSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
    output = output.map(e => {
        for (k in key) {
            if (areSetsEqual(key[k], new Set(e))) {
                return k
            }
        }
    })
    return Number(output.join(''))
}

let sum = inputs.reduce((sum, input, i) => {
    let key = decodeInputs(input)
    return sum += decodeOutput(outputs[i], key)
}, 0)

console.log('Part 2:', sum) //1055164