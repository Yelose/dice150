const scoreP1El = document.querySelector(".p1-score");
const scoreP2El = document.querySelector(".p2-score");
const rollsP1El = document.querySelector(".p1-rolls");
const rollsP2El = document.querySelector(".p2-rolls");
const p1CurrentScoreEl = document.querySelector(".p1-current");
const p2CurrentScoreEl = document.querySelector(".p2-current");
const p1ContainerEl = document.querySelector(".p1-container");
const p2ContainerEl = document.querySelector(".p2-container");
const diceEl = document.querySelector(".roll-number");
const diceNumberEl = document.querySelector(".roll-number p");
const p1NextShopRollEl = document.querySelector(".p1-next-shop-roll");
const p2NextShopRollEl = document.querySelector(".p2-next-shop-roll");

const newGameButton = document.querySelector(".btn-new-game");
const rollDiceButton = document.querySelector(".btn-roll-dice");
const holdButton = document.querySelector(".btn-hold");
const buyAndHoldButton = document.querySelector(".btn-buy");

scoreP1El.textContent = "0";
scoreP2El.textContent = "0";
p1CurrentScoreEl.textContent = "0";
p2CurrentScoreEl.textContent = "0";

function makeInvisible (element){
    element.style.visibility = "hidden"
}
function makeVisible (element) {
    element.style.visibility = "visible"
}
function seeActivePlayer (element) {
    element.classList.add("active")
}
function hideUnactivePlayer (element) {
    element.classList.remove("active")
}
let p1rolls = [1,1,2,3,4]
let p2rolls = [1,1,2,3,4]
let p1GlobalScore = 0;
let p2GlobalScore = 0;
let p1CurrentScore = 0;
let p2CurrentScore = 0;
let p1NextRoll = p1rolls.length;
let p2NextRoll = p2rolls.length;

holdButton.addEventListener("click", addPointsToGlobalScore);

function addPointsToGlobalScore (){
    if (playersTurn == 1){
        p1GlobalScore += p1CurrentScore
        seeActivePlayer(p2ContainerEl)
        hideUnactivePlayer(p1ContainerEl)
        scoreP1El.textContent = p1GlobalScore
        p1CurrentScore = 0
        p1CurrentScoreEl.textContent = 0
        if (p1GlobalScore >= 150) {
            window.alert("Player 1 wins")
        } else {
            makeInvisible(diceEl)
            playersTurn = 2
        }
    } else if (playersTurn == 2) {
        p2GlobalScore += p2CurrentScore
        seeActivePlayer(p1ContainerEl)
        hideUnactivePlayer(p2ContainerEl)
        scoreP2El.textContent = p2GlobalScore
        p2CurrentScore = 0
        p2CurrentScoreEl.textContent = 0
        if (p2GlobalScore >= 150) {
            window.alert("Player 2 wins")
        } else {
            makeInvisible(diceEl)
            playersTurn = 1
        }
    }
}


function rollDice(rolls){
    var randomRoll = rolls[Math.floor(Math.random()*rolls.length)]
    makeVisible(diceEl)
    return randomRoll
}
function printCurrentRollsInHTML (element, array) {
    for (let i = 0; i < array.length; i++) {
        const roll = array[i];     
        element.innerHTML += `<div><h5>${roll}</h5></div>`
    }
}

printCurrentRollsInHTML (rollsP1El, p1rolls)
printCurrentRollsInHTML (rollsP2El, p2rolls)
makeInvisible (diceEl)
let playersTurn = 1

seeActivePlayer(p1ContainerEl)
hideUnactivePlayer(p2ContainerEl)

rollDiceButton.addEventListener("click", rollDiceClick )
function rollDiceClick () {
    let roll = 0
    if (playersTurn == 1) {
        makeVisible(diceEl)
        roll = rollDice(p1rolls)
        if (roll !== 1){
            p1CurrentScore += roll;
            p1CurrentScoreEl.textContent = p1CurrentScore;
        } else {
            p1CurrentScore = 0
            p1CurrentScoreEl.textContent = p1CurrentScore;
            playersTurn = 2;
            seeActivePlayer(p2ContainerEl)
            hideUnactivePlayer(p1ContainerEl)
        }
    }
    else if (playersTurn == 2) {
        seeActivePlayer(p2ContainerEl)
        roll = rollDice(p2rolls)
        if (roll !== 1){
            p2CurrentScore += roll;
            p2CurrentScoreEl.textContent = p2CurrentScore;
        } else {
            p2CurrentScore = 0
            p2CurrentScoreEl.textContent = p2CurrentScore;
            playersTurn = 1;
            seeActivePlayer(p1ContainerEl)
            hideUnactivePlayer(p2ContainerEl)
        }
    }
    diceNumberEl.textContent = roll
} 
p1NextShopRollEl.textContent = p1NextRoll
p2NextShopRollEl.textContent = p2NextRoll

buyAndHoldButton.addEventListener("click", buyRoll)
function buyRoll (){
    if (playersTurn == 1 && (p1GlobalScore >= p1NextRoll * 2)){
        p1rolls.push(p1NextRoll);
        rollsP1El.innerHTML = ""
        printCurrentRollsInHTML (rollsP1El, p1rolls);
        p1GlobalScore -= p1NextRoll*2;
        playersTurn = 2
        scoreP1El.innerHTML = p1GlobalScore;
        seeActivePlayer(p2ContainerEl)
        hideUnactivePlayer(p1ContainerEl)
        p1NextRoll = p1rolls.length
        p1CurrentScore = 0
        p1CurrentScoreEl.textContent = 0
        p1NextShopRollEl.textContent = p1NextRoll;
        makeInvisible(diceEl)
    }
    else if (playersTurn == 2 && (p2GlobalScore >= p2NextRoll * 2)){
        p2rolls.push(p2NextRoll);
        rollsP2El.innerHTML = ""
        printCurrentRollsInHTML (rollsP2El, p2rolls);
        p2GlobalScore -= p2NextRoll*2;
        playersTurn = 1
        scoreP2El.innerHTML = p2GlobalScore;
        seeActivePlayer(p1ContainerEl)
        hideUnactivePlayer(p2ContainerEl)
        p2NextRoll = p2rolls.length
        p2CurrentScore = 0
        p2CurrentScoreEl.textContent = 0
        p2NextShopRollEl.textContent = p2NextRoll;
        makeInvisible(diceEl)
    }
}
function newGame(){
    playersTurn = 1
    rollsP1El.textContent = ""
    rollsP2El.textContent = ""
    makeInvisible (diceEl)
    seeActivePlayer(p1ContainerEl)
    hideUnactivePlayer(p2ContainerEl)
    p1rolls = [1,1,2,3,4]
    p2rolls = [1,1,2,3,4]
    printCurrentRollsInHTML (rollsP1El, p1rolls)
    printCurrentRollsInHTML (rollsP2El, p2rolls)
    p1GlobalScore = 0;
    p2GlobalScore = 0;
    p1CurrentScore = 0;
    p2CurrentScore = 0;
    p1NextRoll = p1rolls.length;
    p2NextRoll = p2rolls.length;
    scoreP1El.textContent = "0";
    scoreP2El.textContent = "0";
    p1CurrentScoreEl.textContent = "0";
    p2CurrentScoreEl.textContent = "0";
    p1NextShopRollEl.textContent = p1NextRoll;
    p2NextShopRollEl.textContent = p2NextRoll;
}
newGameButton.addEventListener("click", newGame)
