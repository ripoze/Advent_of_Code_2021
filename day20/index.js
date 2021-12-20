var data = require('fs').readFileSync('day20/input.txt', 'utf8')
data = data.trim().split('\n\n')

let algorithm = data[0].split('').map(c => c == '#')
let grid = Array(1000).fill().map(() => Array(1000).fill('.'))

//Initial grid from input data
data[1].split('\n').map((row, y) => {
    row.split('').map((c, x) => {
        grid[y + grid.length / 2][x + grid[0].length / 2] = c
    })
})
let background = '.'

function enhance(grid, algorithm) {
    let newGrid = Array(grid.length).fill().map(() => Array(grid[0].length).fill(background))
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            let sum = 0
            let pixel = '#'
            sum += grid[y - 1]?.[x - 1] == pixel ? 256 : 0
            sum += grid[y - 1]?.[x + 0] == pixel ? 128 : 0
            sum += grid[y - 1]?.[x + 1] == pixel ? 64 : 0
            sum += grid[y + 0]?.[x - 1] == pixel ? 32 : 0
            sum += grid[y + 0]?.[x + 0] == pixel ? 16 : 0
            sum += grid[y + 0]?.[x + 1] == pixel ? 8 : 0
            sum += grid[y + 1]?.[x - 1] == pixel ? 4 : 0
            sum += grid[y + 1]?.[x + 0] == pixel ? 2 : 0
            sum += grid[y + 1]?.[x + 1] == pixel ? 1 : 0
            if (algorithm[sum]) {
                newGrid[y][x] = '#'
            }
        }
    }
    return newGrid
}

//Part 1
for (let i = 0; i < 2; i++) {
    grid = enhance(grid, algorithm)
    //remove right column and top and bottom rows
    grid = grid.map(row => {
        row.pop()
        return row
    })
    grid.shift()
    grid.pop()
}



console.log('Part 1:', grid.flat().filter(e => e == '#').length) //5498

//Part 2
for (let i = 0; i < 48; i++) {
    grid = enhance(grid, algorithm)
    grid = grid.map(row => {
        row.pop()
        return row
    })
    grid.shift()
    grid.pop()
}
console.log('Part 2:', grid.flat().filter(e => e == '#').length) //16014

