var data = require('fs').readFileSync('day25/input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split(''))

function moveEast(data) {
    let newGrid = [...data.map(row => [...row])]
    data.map((row, y) => {
        row.map((e, x) => {
            if (x <= data[0].length - 2) {
                if (e == '>' && data[y][x + 1] == '.') {
                    newGrid[y][x] = '.'
                    newGrid[y][x + 1] = '>'
                }
            } else {
                if (e == '>' && data[y][0] == '.') {
                    newGrid[y][x] = '.'
                    newGrid[y][0] = '>'
                }
            }
        })
    })
    return newGrid
}

function moveSouth(data) {
    let newGrid = [...data.map(row => [...row])]
    data.map((row, y) => {
        row.map((e, x) => {
            if (y <= data.length - 2) {
                if (e == 'v' && data[y + 1][x] == '.') {
                    newGrid[y][x] = '.'
                    newGrid[y + 1][x] = 'v'
                }
            } else {
                if (e == 'v' && data[0][x] == '.') {
                    newGrid[y][x] = '.'
                    newGrid[0][x] = 'v'
                }
            }
        })
    })
    return newGrid
}

function printMap(data) {
    data.map((row, y) => console.log(y, row.join('')))
}


let oldGrid=[]
let i = 0
while(JSON.stringify(oldGrid) != JSON.stringify(data)){
    oldGrid=[...data.map(row => [...row])]
    data=moveEast(data)
    data=moveSouth(data)
    i++
}
console.log('Part 1:',i);