var data = require('fs').readFileSync('day02/input.txt', 'utf8')
data = data.split('\n').map(e => e.split(' ')).map(e => [e[0], Number(e[1])])
data.pop()

let position = 0
let depth = 0

// Part 1
data.map(e => {
    position += e[0] == 'forward' ? e[1] : 0
    depth += e[0] == 'down' ? e[1] : 0
    depth += e[0] == 'up' ? -e[1] : 0
})

console.log(`Part 1: Position:${position}, Depth: ${depth}, Multiply: ${position * depth}`) //1989265

//Part 2
position = 0
depth = 0
let aim = 0

data.map(e => {
    position += e[0] == 'forward' ? e[1] : 0
    depth += e[0] == 'forward' ? aim * e[1] : 0
    aim += e[0] == 'down' ? +e[1] : 0
    aim += e[0] == 'up' ? -e[1] : 0
})

console.log(`Part 1: Position:${position}, Depth: ${depth}, Multiply: ${position * depth}`) //2089174012