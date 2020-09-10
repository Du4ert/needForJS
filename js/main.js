const gameArea = document.querySelector('.game-area');
const start = document.querySelector('.start');
const score = document.querySelector('.score');



let car = document.createElement('div');
car.classList.add('car');
car.id = 'player';

let controls = {
    'ArrowUp': false,
    'ArrowDown': false,
    'ArrowLeft': false,
    'ArrowRight': false
}

let settings = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 2
}

function getQuantityElementElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}


function startGame() {
    start.classList.add('hide');
    for (let i = 0; i < getQuantityElementElements(100); i ++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElementElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = (Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px';
        enemy.style.background = `transparent url('../img/enemy${Math.floor(Math.random() * 7)}.png') center / cover no-repeat`;
        gameArea.appendChild(enemy);
    }
    settings.start = true;
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += settings.speed; 
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    })
}


function moveEnemy() {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        enemy.y += settings.speed / 2;
        
        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * settings.traffic;
            enemy.style.background = `transparent url('../img/enemy${Math.floor(Math.random() * 7)}.png') center / cover no-repeat`;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px';
            console.log(enemy.style.left);
        }

        enemy.style.top = enemy.y + 'px';
    })
}

function playGame() {
    if (settings.start) {
        moveRoad();
        moveEnemy();
        if (controls.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speed;
        }
        if (controls.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed;
        }
        if (controls.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speed;
        }
        if (controls.ArrowUp && settings.y > 0) {
            settings.y -= settings.speed;
        }

        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';
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
}

function stopRun(e) {
    const key = e.key;
    if (controls[key] === undefined) {
        return false;
    }
    e.preventDefault();
    controls[key] = false
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);


startGame();