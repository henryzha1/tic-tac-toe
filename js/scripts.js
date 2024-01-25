function Game(gameType, user1, user2, botDifficulty, currentMove, board = [0,0,0,0,0,0,0,0,0]) {
    this.gameType = gameType; //User or BOT
    this.user1 = user1; // X or O
    this.user2 = user2; //X or O
    this.botDifficulty = botDifficulty; //Easy or Hard (Please select difficulty if User game)
    this.currentMove = currentMove; //User1, User2, or Bot
    this.board = board;
}


Game.prototype.updateMatch = function() {
    if(this.gameType === "User") { //user match
        document.getElementById("current").innerText = "Current Move: " + this.currentMove;
        document.getElementById("board").addEventListener("click", (e) => {
            document.getElementById("status").innerText = " ";
            if(this.isValidMove(e)) {
                if(this.currentMove === "User1") {
                    e.target.innerText = this.user1;
                    this.board[parseInt(e.target.id)-1] = this.user1;
                    let winner = this.currentMove;
                    this.currentMove = "User2";
                    document.getElementById("current").innerText = "Current Move: " + this.currentMove;
                    let check = this.checkWinner()
                    if(check) {
                        endMatch(winner, check);
                    }
                    this.currentMove = "User2";
                } else {
                    e.target.innerText = this.user2;
                    this.board[parseInt(e.target.id)-1] = this.user2;
                    let winner = this.currentMove;
                    this.currentMove = "User1";
                    document.getElementById("current").innerText = "Current Move: " + this.currentMove;
                    let check = this.checkWinner()
                    if(check) {
                        endMatch(winner, check);
                    }
                }
            } else {
                document.getElementById("status").innerText = "ILLEGAL MOVE. TRY AGAIN";
            }
        });
    } else { //bot match
        if(this.currentMove === "Bot") {
            if(this.botDifficulty === "Easy") {
                let index = 1;
                let possibleMoves = [];
                this.board.forEach((element) => {
                    if(element === 0) {
                        possibleMoves.push(index);
                    }
                    index++;
                });
                
                let move = "" + possibleMoves[Math.floor(Math.random()*[possibleMoves.length])];
                document.getElementById(move).innerText = this.user2;
                this.board[parseInt(move)-1] = this.user2;
                let winner = this.currentMove;
                this.currentMove = "User1";
                let check = this.checkWinner()
                if(check) {
                    endMatch(winner, check);
                }
            } else { //hard mode

            }
        }
        document.getElementById("board").addEventListener("click", (e) => {
            document.getElementById("status").innerText = " ";
            let gameOver = false;
            if(this.isValidMove(e)) {
                e.target.innerText = this.user1;
                this.board[parseInt(e.target.id)-1] = this.user1;
                let winner = this.currentMove;
                this.currentMove = "Bot";
                let check = this.checkWinner();
                if(check) {
                    gameOver = true;
                    endMatch(winner, check);
                }
            } else {
                document.getElementById("status").innerText = "ILLEGAL MOVE. TRY AGAIN";
            } 
            if(!gameOver && this.currentMove === "Bot") { //bot move
                if(this.botDifficulty === "Easy") {
                    let index = 1;
                    let possibleMoves = [];
                    this.board.forEach((element) => {
                        if(element === 0) {
                            possibleMoves.push(index);
                        }
                        index++;
                    });
                    
                    let move = "" + possibleMoves[Math.floor(Math.random()*[possibleMoves.length])];
                    document.getElementById(move).innerText = this.user2;
                    this.board[parseInt(move)-1] = this.user2;
                    let winner = this.currentMove;
                    this.currentMove = "User1";
                    let check = this.checkWinner()
                    if(check) {
                        endMatch(winner, check);
                    }
                } else { //hard mode
                    
                }
            }
        });
    }
}

Game.prototype.isValidMove = function(e) {
    if(this.board[parseInt(e.target.id) - 1]) {
        return false;
    } else {
        return true;
    }
}


Game.prototype.checkWinner = function() {
    //winning combinations: 
    //rows: [1,2,3] [4,5,6] [7,8,9]
    //columns: [1,4,7] [2,5,8] [3,6,9]
    //diagonals: [1,5,9] [3,5,7]
    const winners = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    let board = winners.map((winner) => {
        let boardCheck = winner.map((id) => {
            if(this.board[id-1]) {
                return this.board[id-1];
            } else {
                return 0;
            }
        });
        return boardCheck;
    });
    let tie = true;
    let win = "";
    let x = board[8];
    for(let i = 0; i < 8; i++) {
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0]) {
            win = board[i][0];
            break;
        } else if(tie) {
            if(board[i][0] === 0 || board[i][1] === 0 || board[i][2] === 0) {
                tie = false;
            }
        }
    }
    if(win) {
        return win;
    } else if(tie) {
        return "tie";
    } else {
        return win;
    }
}

function endMatch(winner, check) {
    document.getElementById("reset").classList.remove("hidden");
    document.getElementById("gameTypeOption").selectedIndex = 0;
    document.getElementById("status").innerText = " ";
    document.getElementById("current").innerText = " ";
    if(check === "tie") {
        document.getElementById("winner").innerText = "ITS A TIE!";
    } else {
        document.getElementById("winner").innerText = "CONGRADULATIONS " + winner.toUpperCase() + " FOR WINNING!";
    }
}

function createBoard() {
    document.getElementById("current").classList.remove("hidden");
    document.getElementById("status").classList.remove("hidden");
    document.getElementById("winner").classList.remove("hidden");
    let div = document.createElement("div");
    div.id = "board";
    document.querySelector("body").append(div);
    for(let i = 1; i < 4; i++) {
        div = document.createElement("div");
        div.id = "row" + i;
        document.getElementById("board").append(div);
        for(let j = 1; j < 4; j++) {
            div = document.createElement("div");
            div.id = (i-1)*3 + j;
            div.innerText = " ";
            let rowId = "row" + i;
            document.getElementById(rowId).append(div);
        }
    }
}

function handleUserGameType(e) {
    e.preventDefault();
    document.getElementById("one").innerText = "User 1: ";
    if(document.getElementById("gameTypeOption").value === "User") {
        document.getElementById("one").innerText = "User 1: ";
        document.getElementById("two").innerText = "User 2: ";
    } else {
        document.querySelector("form#user1>label").innerText = "Who would you like to play as: ";
        document.getElementById("one").innerText = "You: ";
        document.getElementById("two").innerText = "Bot: ";
    }
    const user1Option = document.querySelector("#user1>select").value;
    
    if(user1Option === "X") {
        document.getElementById("one").append("X");
        document.getElementById("two").append("O");
    } else {
        document.getElementById("one").append("O");
        document.getElementById("two").append("X");
    }
    document.getElementById("one").classList.remove("hidden");
    document.getElementById("two").classList.remove("hidden");
    document.getElementById("start").classList.remove("hidden");
}

function handleBotGameType(e) {
    e.preventDefault();

    document.getElementById("user1").classList.remove("hidden");
    document.getElementById("user1").addEventListener("change", handleUserGameType);
}

function handleStartSubmission() {
    document.querySelectorAll("select, button#start").forEach(function(element) {
        element.disabled = true;
    });
    document.getElementById("gameType").removeEventListener("change", handleGameTypeSubmission);
    const gameType = document.getElementById("gameTypeOption").value;
    let user1 = document.getElementById("user1Option").value;
    const bot = document.getElementById("botOption").value;
    let currentMove = "";
    let user2 = "";
    if(user1 === "X") {
        currentMove = "User1";
        user2 = "O";
    } else if(gameType === "User") {
        currentMove = "User2";
        user2 = "X";
    } else if(gameType === "BOT" && user1 === "O") {
        currentMove = "Bot";
        user2 = "X";
        user1 = "O";
    } else if(gameType === "BOT" && user1 === "X") {
        currentMove = "Bot";
        user2 = "O";
        user1 = "X";
    }

    const game = new Game(gameType, user1, user2, bot, currentMove);
    createBoard();
    game.updateMatch();

}

function resetOptions() {
    document.querySelectorAll(".h").forEach(function(element) {
        element.classList.add("hidden");
    });
    document.querySelectorAll("select, button#start").forEach((element) => {
        element.disabled = false;
    });
    if(document.getElementById("board")) {    
        document.getElementById("board").remove();
        document.getElementById("winner").innerText = " ";
        document.getElementById("status").innerText = " ";
        document.getElementById("current").innerText = " ";
    }
    document.getElementById("user1Option").selectedIndex = 0;
    document.getElementById("botOption").selectedIndex = 0;
    document.getElementById("user1").removeEventListener("change", handleUserGameType);
    document.getElementById("bot").removeEventListener("change", handleBotGameType);
    document.getElementById("start").removeEventListener("click", handleStartSubmission);
    document.getElementById("reset").removeEventListener("click", handleGameTypeSubmission);
}

function handleGameTypeSubmission(e) {
    e.preventDefault();
    resetOptions();

    if(document.getElementById("gameTypeOption").value === "User") {
        document.querySelector("form#user1>label").innerText = "Who would User 1 like to play as: ";
        document.getElementById("user1").classList.remove("hidden");
        document.getElementById("user1").addEventListener("change", handleUserGameType);
    } else {
        document.getElementById("bot").classList.remove("hidden");
        document.getElementById("bot").addEventListener("change", handleBotGameType)
    }

    document.getElementById("start").addEventListener("click", handleStartSubmission);

}


window.addEventListener("load", function() {
    document.getElementById("gameType").addEventListener("change", handleGameTypeSubmission);
    document.getElementById("reset").addEventListener("click", () => {
        resetOptions();
        document.getElementById("gameType").addEventListener("change", handleGameTypeSubmission);
    });
});