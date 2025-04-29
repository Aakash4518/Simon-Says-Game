let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "yellow", "blue"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve stored high score
let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("highScore");

// Display the stored high score
highScoreDisplay.innerText = `High Score: ${highScore}`;

// Game start
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

// Button flash function
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

// User flash function
function userBtnFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

// Random button flash
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randomBtn = document.getElementById(randomColor);

    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

// Function to check user input
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => (document.body.style.backgroundColor = "white"), 150);

        updateHighScore(); // Update high score if applicable
        reset();
    }
}

// Button event listener
function btnPress() {
    let btn = this;
    userBtnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

// Add event listeners to all buttons
let allbtns = document.querySelectorAll(".btn");
allbtns.forEach(btn => btn.addEventListener("click", btnPress));

// Reset function
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Function to update high score
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
}
