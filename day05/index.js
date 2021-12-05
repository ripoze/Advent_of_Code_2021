var data = require('fs').readFileSync('day05/input.txt', 'utf8')
data = data.trim().split('\n')

let lines = data.map(e => e.match(/\d+/g).map(Number))
var arr = Array(1000).fill().map(() => Array(1000).fill(0))


//Part 1
lines.map(line => {
    //Horizontal or vertical lines
    if (line[0] == line[2] || line[1] == line[3]) {
        for (let x = Math.min(line[0], line[2]); x <= Math.max(line[0], line[2]); x++) {
            for (let y = Math.min(line[1], line[3]); y <= Math.max(line[1], line[3]); y++) {
                arr[y][x]++
            }
        }
    }
})
console.log(`Part 1: ${arr.flat().filter(e => e > 1).length}`) //5294


//Part 2
lines.map(line => {
    //Diagonal lines
    if (line[0] != line[2] && line[1] != line[3]) {
        let x = line[0]
        let y = line[1]
        arr[y][x]++
            while (x != line[2]) {
                x += line[0] > line[2] ? -1 : 1
                y += line[1] > line[3] ? -1 : 1
                arr[y][x]++
            }
    }
})
console.log(`Part 2: ${arr.flat().filter(e => e > 1).length}`) //21698