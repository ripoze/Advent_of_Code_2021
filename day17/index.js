var data = require('fs').readFileSync('day17/input.txt', 'utf8')
data = data.trim()

let coordinates = data.match(/(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/).map(Number)

let area = {
    x1: coordinates[1],
    x2: coordinates[2],
    y1: coordinates[3],
    y2: coordinates[4],
}


function testProbe(xVelocity, yVelocity, target) {
    let x = 0
    let y = 0
    let maxY = 0

    while (1) {
        x += xVelocity
        y += yVelocity
        maxY = Math.max(y, maxY)
        if (x >= target.x1 && x <= target.x2 && y <= target.y2 && y >= target.y1) {
            return { result: true, max: maxY }
        }
        if (x > target.x2 || y < target.y1) {
            return { result: false, max: null }
        }
        xVelocity = Math.max(xVelocity - 1, 0)
        yVelocity -= 1
    }
}

testProbe(23, -10, area)
//Part 1
let highestY = 0
for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
        if (testProbe(i, j, area).result) {
            highestY = Math.max(highestY, testProbe(i, j, area).max)
        }
    }
}
console.log('Part 1:', highestY);//5778

//Part 2
let solutions = []
for (let i = 0; i < 1000; i++) {
    for (let j = -1000; j < 1000; j++) {
        if (testProbe(i, j, area).result) {
            solutions.push([i, j])
        }
    }
}
console.log('Part 2:', solutions.length);//922 too low