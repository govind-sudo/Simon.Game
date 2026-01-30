// Function to update heading based on device
function updateHeading() {
    let h2 = document.querySelector("h2");
    // Check if the device is mobile/touch-capable
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        h2.innerText = "Touch anywhere to start the game";
    } else {
        h2.innerText = "Press any key to start the game";
    }
}

// Call it immediately on load
updateHeading();

let gameseq=[];
let userseq=[];

let btns = ["red","blue","yellow","navy"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Works for both Keyboard (PC) and Screen Tap (Mobile)
["keypress", "touchstart"].forEach(event => {
    document.addEventListener(event, function() {
        if (started == false) {
            console.log("Game started");
            started = true;
            levelUp();
        }
    });
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },270);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },270);
}

function levelUp(){
    userseq=[];
    level++;
    h2.innerText =`Level ${level}`;

    //random btn choose
    let rand = Math.floor(Math.random()*4);
    let randcolor = btns[rand];
    let rbtn = document.querySelector(`#${randcolor}`);
    console.log(rbtn);
    gameseq.push(randcolor);
    btnflash(rbtn);
}

function check(indx){

    if(userseq[indx] === gameseq[indx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over! Score: <b>${level}</b> <br> Tap anywhere to restart.`;
    
    // Haptic Feedback (only works on Android/supported mobile browsers)
    if (window.navigator.vibrate) {
        window.navigator.vibrate(200); 
    }

    document.body.classList.add("game-over");
    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 200);

    reset();
    }
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

function btnPress(){
    //btn was pressed
    if(started == true){
        let btn = this;
        userflash(btn);

        let usercolor = btn.getAttribute("id");
        userseq.push(usercolor);

        check(userseq.length-1);
    }
}

let allbtns = document.querySelectorAll(".color");

for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}




