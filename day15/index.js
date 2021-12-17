var data = require('fs').readFileSync('day15/input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split('').map(Number))

function shortestPath(map) {
    const ADJ = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ]
    const queue = [{ pos: [0, 0], cost: 0 }]
    const visited = new Set()
    while (queue.length) {
        const {
            pos: [x, y],
            cost,
        } = queue.shift()
        if (y === map.length - 1 && x === map[0].length - 1) return cost


        ADJ.map(([dx, dy]) => [dx + x, dy + y])
            .filter(([x, y]) => map[y]?.[x])
            .filter(pos => !visited.has(pos + ""))
            .map(pos => {
                visited.add(pos + "")
                queue.push({ pos, cost: cost + map[pos[1]][pos[0]] })
            })
        queue.sort((a, b) => a.cost - b.cost)
    }
}

//Part 1
console.log('Part 1:', shortestPath(data))

//Part 2
let newGrid = Array.from(Array(data.length * 5), () => new Array(data.length * 5))
for (let y = 0; y < newGrid.length; y++) {
    for (let x = 0; x < newGrid[0].length; x++) {
        dx = x % data.length
        dy = y % data.length
        i = (parseInt(x / data.length) + parseInt(y / data.length)) % data.length
        newGrid[y][x] = data[dy][dx] + i > 9 ? data[dy][dx] + i - 9 : data[dy][dx] + i
    }
}
console.log('Part 2:', shortestPath(newGrid))