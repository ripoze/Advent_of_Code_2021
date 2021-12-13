var data = require('fs').readFileSync('day13/input.txt', 'utf8')
data = data.trim().split('\n\n')

let points = data[0].split('\n').map(e => e.split(',').map(Number))
let folds = data[1]
    .split('\n')
    .map(e => e
        .slice(11)
        .split('=')
    )

function fold(points, axis, num) {
    num = Number(num)
    points = points.map(point => {
        point[0] = axis == 'x' && point[0] > num ? num - (point[0] - num) : point[0]
        point[1] = axis == 'y' && point[1] > num ? num - (point[1] - num) : point[1]
        return point
    })
    points = Array.from(new Set(points.map(JSON.stringify)), JSON.parse) //remove duplicates
    return points
}

function drawPage(points) {
    let maxX = Math.max(...points.map(e => e[0]))
    let maxY = Math.max(...points.map(e => e[1]))
    let grid = Array(maxY + 1).fill().map(() => Array(maxX + 1).fill('.'))
    points.map(point => grid[point[1]][point[0]] = '#')
    grid.map(row => {
        console.log(row.join(''))
    })
}

//Part 1
points = fold(points, folds[0][0], folds[0][1])
console.log('Part 1:', points.length) //765

//Part 2
for (let i = 1; i < folds.length; i++) {
    points = fold(points, folds[i][0], folds[i][1])
}
drawPage(points)