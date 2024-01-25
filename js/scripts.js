function getUserPreferences(e) {
    e.preventDefault();
    document.getElementById("user1").setAttribute("class", "hidden");
    document.getElementById("user1Option").selectedIndex = 0;
    document.getElementById("one").setAttribute("class", "hidden");
    document.getElementById("two").setAttribute("class", "hidden");


    const game = document.querySelector("#gameType>select").value;
    if(game === "User") {
        document.getElementById("user1").removeAttribute("class");
        document.getElementById("user1").addEventListener("change", function(e) {
            e.preventDefault();
            document.getElementById("one").innerText = "User 1: ";
            document.getElementById("two").innerText = "User 2: ";

            document.getElementById("one").setAttribute("class", "hidden");
            document.getElementById("two").setAttribute("class", "hidden");

            const user1Option = document.querySelector("#user1>select").value;
            if(user1 === "X") {
                document.getElementById("one").append("X");
                document.getElementById("two").append("O");
            } else {
                document.getElementById("one").append("O");
                document.getElementById("two").append("X");
            }
            document.getElementById("one").removeAttribute("class");
            document.getElementById("two").removeAttribute("class");
        })
    } else {
        document.getElementById("bot").removeAttribute("class");
        const botOption = document.getElementById("botOption").value;
        document.getElementById("bot").addEventListener("change", function(e) {
            document.getElementById("user1").removeAttribute("class");
            const user1Option = document.getElementById("user1").value;
        });
    }

}


window.addEventListener("load", function() {
    document.getElementById("gameType").addEventListener("change", function(e) {
        getUserPreferences(e);
        

    })
});