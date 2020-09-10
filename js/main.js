const gameArea = document.querySelector('.game-area');
const start = document.querySelector('.start');
const score = document.querySelector('.score');

let settings = {
    start: false,
    score: 0,
    speed: 3
}

let car = document.createElement('div');
car.classList.add('car');
car.id = 'player';

let controls = {
    'ArrowUp': false,
    'ArrowDown': false,
    'ArrowLeft': false,
    'ArrowRight': false
}

function startGame() {
    start.classList.add('hide');
    settings.start = true;
    gameArea.appendChild(car, 'beforeEnd');
    playGame();
}

function playGame() {
    console.log('Play game');
    if (settings.start) {
        requestAnimationFrame(playGame);
    } 
}

function startRun(e) {
    const key = e.key;
    if (controls[key] === undefined) {
        return false;
    }
    e.preventDefault();
    controls[key] = true
    console.dir('startRun', key);
}

function stopRun(e) {
    const key = e.key;
    if (controls[key] === undefined) {
        return false;
    }
    e.preventDefault();
    controls[key] = false
    console.dir('stopRun', key);
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
