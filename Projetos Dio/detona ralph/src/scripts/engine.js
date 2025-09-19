const state = {
    view: {
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeleft:document.querySelector("#time-left"),
        score:document.querySelector("#score")
    },
    values: {
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        curretTime:60,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),

    }
}
function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`)
    audio.volume = 0.5;
    audio.play();
}
function countDown(){
    state.values.curretTime--;
    state.view.timeleft.textContent = state.values.curretTime;
    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerID)
        clearInterval(state.actions.timerID)
        alert("Game over! O seu resultado foi: " + state.values.result);
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomsquare = state.view.squares[randomNumber];
    randomsquare.classList.add("enemy");
    state.values.hitPosition = randomsquare.id;
}


function addListenerHitBox(){
 state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition){
            state.values.result++
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("coin")
        }
    })
 })
}
function initialize(){
    addListenerHitBox();
}

initialize()
