let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Keydown for desktop
document.addEventListener("keydown", function() {
    if(started == false) {
        console.log("The game has started");
        started = true;
        levelUp();
    }
});

// Click for mobile - but ONLY on non-button elements
document.addEventListener("click", function(e) {
    // Check if the clicked element is NOT a game button
    if(started == false && !e.target.classList.contains('btn')) {
        console.log("The game has started");
        started = true;
        levelUp();
    }
});

let btns = ["red", "green", "yellow", "purple"];

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //selection of random buttons
    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`#${randomColor}`);
    game_Flash(randombtn);
    gameSeq.push(randomColor);
    
    console.log("Random Index:", randomIdx);
    console.log("Random color:", randomColor);
    console.log("Random button:", randombtn);
    console.log("Game Sequence:", gameSeq);
}

function game_Flash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 250);
}

function user_Flash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash")
    }, 100);
}

function btnPress() {
    // Prevent button clicks from starting the game
    if(!started) {
        return;
    }
    
    console.log(this);
    let btn1 = this;
    user_Flash(btn1);

    let userColor = btn1.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(let allBtn of allBtns){
    allBtn.addEventListener("click", btnPress);
}

function checkAns(idx){
    console.log("current level", level);
    if(userSeq[idx] == gameSeq[idx]) {
        console.log("Moving to next level.");
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        h2.innerHTML = `Game over!<br>Your score was ${level - 1} <br>Press any key or tap to start.`;
        console.log("Game Over");
        score();
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

let scoreHeading = document.createElement("h2");
scoreHeading.id = "scoreBoard";
scoreHeading.innerHTML = "<b>Scores:</b>";
document.querySelector("body").append(scoreHeading);

function score(){
    let highScore = level - 1;
    let li = document.createElement("li");
    li.innerText = highScore;
    document.querySelector("#scoreBoard").appendChild(li);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}