function Game(gameType, user1, user2, botDifficulty, currentMove, board = []) {
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
                    this.currentMove = "User2";
                    this.board[parseInt(e.target.id)-1] = this.user1;
                    if(this.checkWinner()) {
                        endMatch();
                    }
                } else {
                    e.target.innerText = this.user2;
                    this.currentMove = "User1";
                    this.board[parseInt(e.target.id)-1] = this.user2;
                    if(this.checkWinner()) {
                        endMatch();
                    }
                }
                document.getElementById("current").innerText = "Current Move: " + this.currentMove;
            } else {
                document.getElementById("status").innerText = "ILLEGAL MOVE. TRY AGAIN";
            }
        });
    } else { //bot match

    }
}

Game.prototype.isValidMove = function(e) {
    if(this.board[parseInt(e.target.id) - 1]) {
        return false;
    } else {
        return true;
    }
}


Game.prototype.checkWinner = function() { //need to finish this
  
}

function endMatch() {
    document.getElementById("reset").classList.remove("hidden");
    document.getElementById("board").remove();
    document.getElementById("gameTypeOption").selectedIndex = 0;
}

function createBoard() {
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
    const gameType = document.getElementById("gameTypeOption").value;
    const user1 = document.getElementById("user1Option").value;
    const bot = document.getElementById("botOption").value;
    let currentMove = "";
    let user2 = "";
    if(user1 === "X") {
        currentMove = "User1";
        user2 = "O";
    } else if(gameType === "User") {
        currentMove = "User2";
        user2 = "X";
    } else {
        currentMove = "Bot";
        user2 = "bot";
    }

    console.log(gameType);
    const game = new Game(gameType, user1, user2, bot, currentMove);
    createBoard();
    game.updateMatch();
    //........ START HERE TOMORROW

}

function resetOptions() {
    document.querySelectorAll(".h").forEach(function(element) {
        element.classList.add("hidden");
    });
    document.querySelectorAll("select, button#start").forEach((element) => {
        element.disabled = false;
    });
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