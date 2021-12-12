var data = require('fs').readFileSync('day12/input.txt', 'utf8')
data = data.trim().split('\n')

function pathsPart1(g, src, dst) {
    let paths = []
    const findPaths = (label = src, path = []) => {
        const nextPath = [...path, label];
        if (label === dst) {
            paths.push(nextPath)
            return
        }
        g[label].forEach((point) => {
            if (point.toLowerCase() == point && path.includes(point)) return
            findPaths(point, nextPath)
        })
    }
    findPaths()
    return paths
}

function pathsPart2(g, src, dst) {
    let paths = []
    const findPaths = (label, path = [], smallCaveVisited = false) => {
        const nextPath = [...path, label];
        if (label === dst) {
            paths.push(nextPath)
            return
        }
        g[label].forEach((point) => {
            let nextsmallCaveVisited = smallCaveVisited
            if (point.toLowerCase() == point && path.includes(point)) {
                if (smallCaveVisited) {
                    return
                }
                nextsmallCaveVisited = true
            }
            findPaths(point, nextPath, nextsmallCaveVisited)
        })
    }
    findPaths(src)
    return paths
}

function createMap(input) {
    let graph = []
    for (edge of input) {
        [a, b] = edge.split('-')
        if (!graph[a]) graph[a] = []
        if (!graph[b]) graph[b] = []
        if (b !== 'start') graph[a].push(b)
        if (a !== 'start') graph[b].push(a)
    }
    return graph
}

console.log('Part 1:', pathsPart1(createMap(data), 'start', 'end').length) //3779
console.log('Part 2:', pathsPart2(createMap(data), 'start', 'end').length) //96988