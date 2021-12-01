var data = require('fs').readFileSync('input.txt', 'utf8')

data = data.split('\n').map(n => Number(n))
data.pop()

let increased_counter

//Part 1
increased_counter = data.reduce((sum, item, i) => {
    sum += data[i] > data[i - 1] ? 1 : 0
    return sum
}, 0)
console.log(increased_counter) //1475


//Part 2
increased_counter = data.reduce((sum, item, i) => {
    let sum1 = data[i] + data[i + 1] + data[i + 2]
    let sum2 = data[i + 1] + data[i + 2] + data[i + 3]

    sum += sum2 > sum1 ? 1 : 0
    return sum
}, 0)
console.log(increased_counter) //1516