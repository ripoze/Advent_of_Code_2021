var data = require('fs').readFileSync('day01/input.txt', 'utf8')
data = data.split('\n').map(Number)

let n

//Part 1
n = data.filter((e, i) => data[i] > data[i - 1], 0).length
console.log(`Part 1: ${n}`) //1475

//Part 2
n = data.filter((e, i) => data[i + 1] + data[i + 2] + data[i + 3] > data[i] + data[i + 1] + data[i + 2], 0).length
console.log(`Part 2: ${n}`) //1516