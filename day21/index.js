console.time('codezup')

class deterministicDice {
    constructor() {
        this.last = 0
        this.timesRolled = 0
    }
    roll() {
        this.last++
        if (this.last > 100) this.last = 1
        this.timesRolled++
    }
    roll3() {
        let result = []
        for (let i = 0; i < 3; i++) {
            this.roll()
            result.push(this.last)
        }
        return result.reduce((acc, e) => acc + e, 0)
    }
}

class player {
    constructor(position) {
        this.position = position
        this.points = 0
    }
    update(moves) {
        this.position += moves
        this.position = (this.position - 1) % 10 + 1
        this.points += this.position
    }
}

function diracDiceRoll(p1Position, p1Points, p2Position, p2Points, roll, turn) {
    let wins = 0
    if (turn == 1) {
        p1Position += roll
        p1Position = (p1Position - 1) % 10 + 1
        p1Points += p1Position
    }
    if (turn == 2) {
        p2Position += roll
        p2Position = (p2Position - 1) % 10 + 1
        p2Points += p2Position
    }
    turn = turn == 1 ? 2 : 1

    if (p1Points >= 21 || p2Points >= 21) {
        return p1Points >= 21 ? 1 : 0
    }
    wins += diracDiceRoll(p1Position, p1Points, p2Position, p2Points, 9, turn) * 1
    wins += diracDiceRoll(p1Position, p1Points, p2Position, p2Points, 8, turn) * 3
    wins += diracDiceRoll(p1Position, p1Points, p2Position, p2Points, 7, turn) * 6
    wins += diracDiceRoll(p1Position, p1Points, p2Position, p2Points, 6, turn) * 7
    wins += diracDiceRoll(p1Position, p1Points, p2Position, p2Points, 5, turn) * 6
    wins += diracDiceRoll(p1Position, p1Points, p2Position, p2Points, 4, turn) * 3
    wins += diracDiceRoll(p1Position, p1Points, p2Position, p2Points, 3, turn) * 1
    return wins
}

//Part 1
let dice = new deterministicDice()
let player1 = new player(10)
let player2 = new player(6)
let turn = 1

while (player1.points < 1000 && player2.points < 1000) {
    let moves = dice.roll3()
    if (turn == 1) player1.update(moves)
    if (turn == 2) player2.update(moves)
    turn = turn == 1 ? 2 : 1
}
console.timeEnd('codezup')
console.log('Part 1:', Math.min(player1.points, player2.points) * dice.timesRolled) //900099


//Part 2
let wins = 0
player1 = new player(10)
player2 = new player(6)
wins += diracDiceRoll(player1.position, player1.points, player2.position, player2.points, 9, 1)
wins += diracDiceRoll(player1.position, player1.points, player2.position, player2.points, 8, 1) * 3
wins += diracDiceRoll(player1.position, player1.points, player2.position, player2.points, 7, 1) * 6
wins += diracDiceRoll(player1.position, player1.points, player2.position, player2.points, 6, 1) * 7
wins += diracDiceRoll(player1.position, player1.points, player2.position, player2.points, 5, 1) * 6
wins += diracDiceRoll(player1.position, player1.points, player2.position, player2.points, 4, 1) * 3
wins += diracDiceRoll(player1.position, player1.points, player2.position, player2.points, 3, 1)

console.log('Part 2:', wins)//306719685234774