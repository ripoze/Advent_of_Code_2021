var data = require('fs').readFileSync('day04/input.txt', 'utf8')
data = data.split('\n\n')


let numbers = data.splice(0, 1)[0].split(',').map(Number)
let boards = data.map(e => e.split('\n').map(e => e.match(/\d+/g).map(e => [Number(e), false])))


function markBoards(boards, number) {
    boards = boards.map(board => {
        board = board.map(row => {
            row = row.map(item => {
                item[1] = item[0] == number ? true : item[1]
            })
        })
    })
}

function checkForWinningBoard(boards) {
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        let board = boards[boardIndex]
        let winning = false
            //Rows
        board.map(row => winning = row.every(item => item[1]) ? true : winning)
            //Columns
        for (let col = 0; col < board[0].length; col++) {
            winning = board[0][col][1] && board[1][col][1] && board[2][col][1] && board[3][col][1] && board[4][col][1] ? true : winning
        }

        if (winning) return boardIndex
    }
    return false
}

function countUnmarked(board) {
    return board.flat().filter(e => e[1] == false).reduce((sum, e) => sum + e[0], 0)
}

//Part 1
for (let numberIndex = 0; numberIndex < numbers.length; numberIndex++) {
    let number = numbers[numberIndex]
    markBoards(boards, number)
    let result = checkForWinningBoard(boards)
    if (result !== false) {
        console.log(`Part 1: ${number * countUnmarked(boards[result])}`) // 10374
        break
    }
}

//Part 2
for (let numberIndex = 0; numberIndex < numbers.length; numberIndex++) {
    let number = numbers[numberIndex]
    markBoards(boards, number)
    while (checkForWinningBoard(boards) !== false && boards.length > 1) {
        let result = checkForWinningBoard(boards)
        boards.splice(result, 1)
    }
    if (boards.length == 1 && checkForWinningBoard(boards) !== false) {
        console.log(`Part 2: ${number * countUnmarked(boards[0])}`) // 24742
        break
    }
}