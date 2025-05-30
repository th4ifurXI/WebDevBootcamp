const p1Button = document.querySelector("#p1Button");
const p2Button = document.querySelector("#p2Button");
const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");

const scoreMaxSelector = document.querySelector("#Max");

const resetButton = document.querySelector("#reset");

let p1Score = 0;
let p2Score = 0;

let winningScore = 5;
let gameOver = false;


const div = document.querySelector("div");

p1Button.addEventListener('click', function(e){
    if(!gameOver){
      if(p1Score != winningScore){
    p1Score += 1 ;
    if (p1Score == winningScore){
        gameOver = true;
    }
    p1Display.textContent = p1Score;
    }  
    }
    
})

p2Button.addEventListener('click', function(e){
    if(!gameOver){
    if(p2Score != winningScore){
    p2Score += 1 ;
        if(p2Score == winningScore){
            gameOver = true;
        }
    p2Display.textContent = p2Score;
    }   

    }

     
})

scoreMaxSelector.addEventListener('change', function(){
    winningScore = parseInt(this.value);
    reset();

})

resetButton.addEventListener('click', reset);

function reset(){
    p1Score = 0;
    p2Score = 0;
    gameOver = false;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
}

