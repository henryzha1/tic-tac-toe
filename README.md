BUSINESS LOGIC
Step 1: player enters preferences:
-user vs user or user vs bot
-if user vs user, names of x and o
-if user vs bot, bot level difficulty, and user x or o

test: after entering preferences, console.log preferences should match

Step 2: start the game
-create a game object
-game object has board object, player object, and prototype methods
-board object: has array of 3 arrays, each array is length 3, each representing a row. each value is x, o, null
-player object contains players information, user vs user or user vs bot, who is x and o
-prototype methods: checkWinner, updateBoard, displayBoard, nextMove? 

test: When game starts, should display a board, and if 2 players should rotate x and o and each square clicked should update the board

Step 3: in progress game
-checks each move for winner
-updates board and display when square is clicked

test: board reacts to clicks properly. if there is a winner, ends the game.

Step 4: winner
-ends the game properly
-provides options for user (new game)
-displays old tic tac toe games on the bottom of page

test: shows what needs to be shown...


INTERFACE LOGIC
step 1: takes in user preferences accurately

step 2: game starts, when submitted, and the board reacts to clicks appropriately and is taken in accurately

step 3: game ends when there is a proper winner, and reacts to new game appropriately after game is over