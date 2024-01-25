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
    document.getElementById("two").innerText = "User 2: ";

    const user1Option = document.querySelector("#user1>select").value;
    if(user1Option === "X") {
        document.getElementById("one").append("X");
        document.getElementById("two").append("O");
    } else {
        document.getElementById("one").append("O");
        document.getElementById("two").append("X");
    }
    document.getElementById("one").removeAttribute("class");
    document.getElementById("two").removeAttribute("class");
    document.getElementById("start").removeAttribute("class");
}

function handleBotGameType(e) {
    e.preventDefault();

    document.getElementById("user1").removeAttribute("class");
    document.getElementById("user1").addEventListener("change", handleUserGameType);
}

function handleStartSubmission() {
    document.getElementById("start").disabled = true;
    const gameType = document.querySelector("#gameType>select").value;
    const user1 = document.getElementById("user1Option").value;
    const bot = document.getElementById("botOption").value;
    document.querySelector("body").append(gameType + user1 + bot);

    const game = new Game(gameType, user1, bot);
    game.startMatch;
    //........ START HERE

}

function resetOptions() {
    document.getElementById("user1").setAttribute("class", "hidden");
    document.getElementById("user1").removeEventListener("change", handleUserGameType);
    document.getElementById("user1Option").selectedIndex = 0;
    document.getElementById("one").setAttribute("class", "hidden");
    document.getElementById("two").setAttribute("class", "hidden");
    document.getElementById("bot").setAttribute("class", "hidden");
    document.getElementById("bot").removeEventListener("change", handleBotGameType);
    document.getElementById("botOption").selectedIndex = 0;
    document.getElementById("start").setAttribute("class", "hidden");
    document.getElementById("start").removeEventListener("click", handleStartSubmission);
}

function handleGameTypeSubmssion(e) {
    e.preventDefault();
    resetOptions();

    if(document.querySelector("#gameType>select").value === "User") {
        document.getElementById("user1").removeAttribute("class");
        document.getElementById("user1").addEventListener("change", handleUserGameType);
    } else {
        document.getElementById("bot").removeAttribute("class");
        document.getElementById("bot").addEventListener("change", handleBotGameType)
    }

    document.getElementById("start").addEventListener("click", handleStartSubmission);

}


window.addEventListener("load", function() {
    document.getElementById("gameType").addEventListener("change", handleGameTypeSubmssion);
});