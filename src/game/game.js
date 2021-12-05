let userName = document.getElementById('name'),
    startButton = document.querySelector(".game .start-screen .start button"),
    startScreen = document.querySelector('.game .start-screen'),
    namePlace = document.querySelector('.game .information .name h3 span');
    timePlace = document.querySelector('.game .information .time h3'),
    wrongPlace = document.querySelector('.game .information .wrong h3 span'),
    cards = Array.from(document.querySelectorAll('.game .the-game .box')),
    backFace = document.querySelector(".game .the-game .box .back"),
    gameHolder = document.querySelector(".game .the-game"),
    // Audio
    correct = document.getElementById('correct'),
    fail = document.getElementById('wrong');

var wrong = 0,
    duration = 600;

// Hide Start Screen On clicking Start
startButton.onclick = function () {
    let nameValue = userName.value;
    if (nameValue === '') {
        return false
    } else{
        namePlace.textContent = nameValue;
        startScreen.style.opacity = "0";
        startScreen.style.display = "none";
        time();
    }
}

// Trigger Timer
function time() {
    var seconds = 0,
        minutes = 0;
    setInterval(function () {
        seconds += 1
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0
            timePlace.textContent = minutes + " : " + seconds
        } else{
            timePlace.textContent = minutes + " : " + seconds
        }
    }, duration)
}

// Start

let test = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
shuffle(test);

cards.forEach((card, index) => {
    card.style.order = test[index];
    card.onclick = function () {
        flipBlock(card);
    }
});


function shuffle(array) {

    var current = 20,
    temp,
    random;

    while(current > 0){
        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

    }    
    return array
}

function flipBlock(selectBlock) {
    selectBlock.classList.add('flipped');

    let allSelectedCards = cards.filter(flippedBlock => flippedBlock.classList.contains('flipped'));
    if (allSelectedCards.length === 2) {
        stopClicking();
        check(allSelectedCards[0], allSelectedCards[1]);
        console.log(allSelectedCards)
        
    } else{
        console.log(allSelectedCards)
    }
}

function stopClicking() {
    gameHolder.classList.add('stop');

    setTimeout(function () {
        gameHolder.classList.remove('stop');
    }, duration)
}

function check(firstCard, secondCard) {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        firstCard.classList.add('right');
        secondCard.classList.add('right');

        correct.play();

    } else{
        fail.play();
        setTimeout(function () {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            wrong += 1;
            wrongPlace.textContent = wrong;
        }, duration);
    }
}