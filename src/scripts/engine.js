const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        meta: document.querySelector("#meta"),
        lives: document.querySelector("#lives"),
        //querySelecto e querySelectorAll
        
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        record: 10,
        currentTime: 60,
        currentLives: 4,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }    
};

function countDown(){          
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime === 0){        
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId);
        alert("Game Over! A sua pontuação foi " + state.values.result);
        state.view.timeLeft.textContent = 60;
        location.reload();
    }   
}
function themeSound(){
    let intro = new Audio("./src/audios/intro.mp3")
    intro.volume = 0.2;   
    intro.loop = 3;
    intro.play();
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`)
    audio.volume = 0.2;    
    audio.play();       
}

function randomSquare(){
    //vai buscar e remover a classe enemy
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    })
    
    //vai sorteio o id que vai receber a classe enemy
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber]; // recebe o numero sorteado 
    randomSquare.classList.add("enemy"); // aplica a classe enemy
    state.values.hitPosition = randomSquare.id; // vai guardar o id do square que pode ser clicado
}

function addListenerHitBox(){ 
      
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () =>{
            let result = 0;
            let meta = state.values.record;
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
                result += state.values.result;

                if(result === meta){             
                    meta *= 2;                     
                    state.view.meta.textContent = meta;     
                }
                state.values.record = meta
   

            }else /*if (square.id != state.values.hitPosition)*/{
                state.values.currentLives--;
                state.view.lives.textContent = state.values.currentLives
                playSound("death");
            }

            if(state.values.currentLives <= 0){           
                alert("GAME OVER");
                playSound("gameover")
                state.values.currentLives = 5;                  
                location.reload();                 
            }                
        });        
    });
};

function initialize() {  
    addListenerHitBox(); 
};
initialize();
themeSound();