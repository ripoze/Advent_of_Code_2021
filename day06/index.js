var data = require('fs').readFileSync('day06/input.txt', 'utf8')
data = data.trim().split(',').map(Number)

function nextDay(timers) {
    timers[9] = timers[0]
    timers[7] += timers[0]
    timers.shift()
    return timers
}

let timers = Array(9).fill(0)
data.map(e => timers[e]++)


//Part 1
for (let i = 0; i < 80; i++) {
    timers = nextDay(timers)
}
console.log('Part 1:', timers.reduce((sum, e) => sum + e, 0)) //379414

//Part 2
for (let i = 80; i < 256; i++) {
    timers = nextDay(timers)
}
console.log('Part 2:', timers.reduce((sum, e) => sum + e, 0)) //1705008653296