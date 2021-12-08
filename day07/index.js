var data = require('fs').readFileSync('day07/input.txt', 'utf8')
data = data.trim().split(',').map(Number)

function fuelConsumptionPt1(positions, pos) {
    return positions.reduce((sum, e) => sum + Math.abs(e - pos), 0)
}

function fuelConsumptionPt2(positions, pos) {
    return positions.reduce((sum, e) => sum + (Math.abs(e - pos) ** 2 + Math.abs(e - pos)) / 2, 0)
}

//Part 1
let result = Infinity
for (let i = 0; i < Math.max(...data); i++) {
    let consumption = fuelConsumptionPt1(data, i)
    result = consumption < result ? consumption : result
}
console.log('Part 1:', result) //329389

//Part 2
result = Infinity
for (let i = 0; i < Math.max(...data); i++) {
    let consumption = fuelConsumptionPt2(data, i)
    result = consumption < result ? consumption : result
}
console.log('Part 2:', result) //86397080