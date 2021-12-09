var data = require('fs').readFileSync('day09/input.txt', 'utf8')
data = data.trim().split('\n').map(e => e.split('').map(Number))


function findLowpoints(data) {
    let result = []
    data.map((row, y) => {
        row.map((item, x) => {
            let adjacents = []
            adjacents[0] = y < data.length - 1 ? data[y + 1][x] : 10
            adjacents[1] = y > 0 ? data[y - 1][x] : 10
            adjacents[2] = x < row.length - 1 ? data[y][x + 1] : 10
            adjacents[3] = x > 0 ? data[y][x - 1] : 10
            if (item < Math.min(...adjacents)) {
                result.push({ x: x, y: y, value: item, isBasin: true })
            }
        })
    })
    return result
}

function findBasin(data, lowpoint) {
    function extendBasin(data) {
        let orgData = JSON.parse(JSON.stringify(data))
        data.map((row, y) => {
            row.map((item, x) => {
                let adjacents = []
                adjacents[0] = y < data.length - 1 && item.isBasin ? data[y + 1][x] : null
                adjacents[1] = y > 0 && item.isBasin ? data[y - 1][x] : null
                adjacents[2] = x < row.length - 1 && item.isBasin ? data[y][x + 1] : null
                adjacents[3] = x > 0 && item.isBasin ? data[y][x - 1] : null
                adjacents = adjacents.filter(e => Boolean(e) && e.value < 9)
                adjacents.map(item => {
                    data[item.y][item.x].isBasin = true
                })
            })
        })
        if (JSON.stringify(orgData) == JSON.stringify(data)) {
            return
        }
        extendBasin(data)
    }

    let grid = data.map((row, y) => {
        return row.map((item, x) => {
            return { x: x, y: y, value: item, isBasin: false }
        })
    })
    grid[lowpoint.y][lowpoint.x].isBasin = true
    extendBasin(grid)
    return grid
}

//Part 1
let lowPoints = findLowpoints(data)
console.log('Part 1:', lowPoints.reduce((sum, e) => sum + e.value + 1, 0)) //508

//Part 2
let basins = new Set()
lowPoints.map(point => {
    let res = findBasin(data, point).flat().filter(e => e.isBasin == true)
    basins.add(JSON.stringify(res))
})
let result = []
for (b of basins) {
    let e = JSON.parse(b)
    result.push(e.length)
}
result.sort((a, b) => b - a)
console.log('Part 2:', result[0] * result[1] * result[2]) //1564640