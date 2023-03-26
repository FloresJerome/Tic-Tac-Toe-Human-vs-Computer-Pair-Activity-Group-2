let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let player1ScoreRef = document.getElementById("player1-score");
let player2ScoreRef = document.getElementById("player2-score");

//Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

//Player 'X' plays first
let xTurn = true;
let count = 0;
let player1Score = 0;
let player2Score = 0;


//Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
        player1Score++;
        player1ScoreRef.innerText = player1Score;
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
        player2Score++;
        player2ScoreRef.innerText = player2Score;
    }
};

//Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#128528 <br> It's a Draw";
};

//New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    xTurn = true; // Reset AI to start with X
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    xTurn = true; // Reset AI to start with X
});

//Win Logic
const winChecker = () => {
    //Loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Check if elements are filled
        //If 3 empty elements are same and would give win as would
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                //If all 3 buttons have same values then pass the value to winFunction
                winFunction(element1);
            }
        }
    }
};

// Function for AI move
const aiMove = () => {
    // Select a random button that is not already clicked
    const availableBtns = Array.from(btnRef).filter((btn) => !btn.innerText);
    const selectedBtn = availableBtns[Math.floor(Math.random() * availableBtns.length)];
    // Display O on selected button
    selectedBtn.innerText = "O";
    selectedBtn.disabled = true;
    // Increment count and check for win/draw
    count++;
    winChecker();
    if (count === 9) {
        drawFunction();
    }
    // Switch turn to player
    xTurn = true;
};

const playClickSound = () => {
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0; // Reset the sound to the beginning
    sound.play();
}

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //Display X
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //Display O
            element.innerText = "O";
            element.disabled = true;
        }
        //Increment count on each click
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        //Check for win on every click
        winChecker();
        // Play Click Sound
        playClickSound();
        // Make AI move
        if (!xTurn && count < 9) {
            setTimeout(aiMove, 500);
        }
    });
});
//Enable Buttons and disable popup on page load
window.onload = enableButtons;

window.addEventListener('click', () => {
    document.getElementById('song').play()
})