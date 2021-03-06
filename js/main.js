window.localStorage.setItem('needForJsBest', 0);

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
    speed: 5,
    speedPlayer: 3,
    traffic: 5
}

function getQuantityElementElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}


function startGame() {
    start.classList.add('hide');
    settings.speed = 3;
    gameArea.innerHTML = '';
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
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px';
        enemy.style.background = `transparent url('img/enemy${Math.floor(Math.random() * 6 ) + 1}.png') center / cover no-repeat`;
        gameArea.appendChild(enemy);
    }
    settings.score = 0;
    settings.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2 + 'px';
    car.style.top = 'auto';
    car.style.transform  = '';
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
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && 
            carRect.bottom >= enemyRect.top &&
            carRect.right >= enemyRect.left && 
            carRect.left <= enemyRect.right) {
            car.style.transform = `rotate(${Math.random() * 90}deg)`;
            enemy.style.transform = `rotate(${Math.random() * 60}deg)`;
            settings.start = false;
            start.classList.remove('hide');
            
            if (window.localStorage.getItem('needForJsBest') < settings.score) {
                window.localStorage.setItem('needForJsBest', settings.score);
                score.innerHTML = 'SCORE <br/>' + settings.score + '<br/> You are the best for now!';
            } else {
                score.innerHTML = 'SCORE <br/>' + settings.score + '<br/> Best: ' + window.localStorage.getItem('needForJsBest') ;
            }

            start.style.top = score.offsetHeight + 'px';
            
        }

        enemy.y += settings.speed / 2;
        
        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * settings.traffic;
            enemy.style.background = `transparent url('img/enemy${Math.floor(Math.random() * 6 ) + 1}.png') center / cover no-repeat`;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px';
            settings.speed += 0.2;
        }

        enemy.style.top = enemy.y + 'px';
    })
}

function playGame() {
    if (settings.start) {
        settings.score += Math.floor(settings.speed);
        score.innerHTML = 'SCORE <br/>' + settings.score;
        moveRoad();
        moveEnemy();
        if (controls.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speedPlayer;
            car.style.transform = 'rotate(-10deg)';
        }
        if (controls.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speedPlayer;
            car.style.transform = 'rotate(10deg)';
        }
        if (controls.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speedPlayer;
        }
        if (controls.ArrowUp && settings.y > 0) {
            settings.y -= settings.speedPlayer;
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
    car.style.transform = '';
    e.preventDefault();
    controls[key] = false
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);


// startGame();