var data = require('fs').readFileSync('day11/input.txt', 'utf8')
data = data.trim().split('\n').map(e => e.split('').map(Number))

function printGrid(i) {
    i.map(row => console.log(row.join('')))
    console.log('')
}

function step(i) {
    let flashes = 0
    i = i.map(row => {
        return row.map(e => {
            return e + 1
        })
    })

    while (i.flat().filter(e => e > 9).length != 0) {
        i.map((row, y) => {
            row.map((e, x) => {
                if (e > 9) {
                    if (x < i[0].length - 1) {
                        if (i[y][x + 1] != 0) i[y][x + 1]++
                            if (y > 0 && i[y - 1][x + 1] != 0) { i[y - 1][x + 1]++ }
                        if (y < i.length - 1 && i[y + 1][x + 1] != 0) { i[y + 1][x + 1]++ }
                    }
                    if (x > 0) {
                        if (i[y][x - 1] != 0) i[y][x - 1]++
                            if (y > 0 && i[y - 1][x - 1] != 0) { i[y - 1][x - 1]++ }
                        if (y < i.length - 1 && i[y + 1][x - 1] != 0) { i[y + 1][x - 1]++ }
                    }
                    if (y < i.length - 1 && i[y + 1][x] != 0) { i[y + 1][x]++ }
                    if (y > 0 && i[y - 1][x] != 0) { i[y - 1][x]++ }
                    i[y][x] = 0
                    flashes++
                }
            })
        })

    }
    return [i, flashes]
}

//Part 1
let part1Data = JSON.parse(JSON.stringify(data))
let flashes = 0
for (let i = 0; i < 100; i++) {
    let res = step(part1Data)
    part1Data = res[0]
    flashes += res[1]
}
console.log('Part 1:', flashes) //1721

//Part 2
for (let i = 1; i < 10000; i++) {
    data = step(data)[0]
    if (data.flat().filter(e => e > 0).length == 0) {
        console.log('Part 2:', i)
        break
    }
}