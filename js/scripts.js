function Game(gameType, user1, botDifficulty = 0) {
    this.gameType = gameType; //User or BOT
    this.user1 = user1; // X or O
    this.botDifficulty = botDifficulty; //Easy or Hard (Please select difficulty if User game)
}

Game.prototype.startMatch = function() {

}

Game.prototype.updateMatch = function() {

}

Game.prototype.checkWinner = function() {

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
    document.querySelector("body").append(gameType + " game. User 1: " + user1 + " Bot level: " + bot);

    const game = new Game(gameType, user1, bot);
    game.startMatch;
    //........ START HERE TOMORROW

}

function resetOptions() {
    document.querySelectorAll(".h").forEach(function(element) {
        element.classList.add("hidden");
    });
    document.getElementById("user1Option").selectedIndex = 0;
    document.getElementById("botOption").selectedIndex = 0;
    document.getElementById("user1").removeEventListener("change", handleUserGameType);
    document.getElementById("bot").removeEventListener("change", handleBotGameType);
    document.getElementById("start").removeEventListener("click", handleStartSubmission);
}

function handleGameTypeSubmssion(e) {
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
    document.getElementById("gameType").addEventListener("change", handleGameTypeSubmssion);
});