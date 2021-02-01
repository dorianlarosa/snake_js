import './style.scss';

// IMAGES

// apple
import imgApple from './images/apple.png';
let image = new Image();
image.src = imgApple;

// body snake
import imgBodySnake from './images/body_snake.png';
let imageBodySnake = new Image();
imageBodySnake.src = imgBodySnake;

import imgBodySnakeVertical from './images/body_snake_vertical.png';
let imageBodySnakeVertical = new Image();
imageBodySnakeVertical.src = imgBodySnakeVertical;

// head snake
import imgHeadSnakeRight from './images/head_snake_right.png';
let imageHeadSnakeRight = new Image();
imageHeadSnakeRight.src = imgHeadSnakeRight;

import imgHeadSnakeLeft from './images/head_snake_left.png';
let imageHeadSnakeLeft = new Image();
imageHeadSnakeLeft.src = imgHeadSnakeLeft;

import imgHeadSnakeTop from './images/head_snake_top.png';
let imageHeadSnakeTop = new Image();
imageHeadSnakeTop.src = imgHeadSnakeTop;

import imgHeadSnakeBottom from './images/head_snake_bottom.png';
let imageHeadSnakeBottom = new Image();
imageHeadSnakeBottom.src = imgHeadSnakeBottom;

// turn snake
import imgSnakeTurn1 from './images/turn_snake_1.png';
let imageSnakeTurn1 = new Image();
imageSnakeTurn1.src = imgSnakeTurn1;

import imgSnakeTurn2 from './images/turn_snake_2.png';
let imageSnakeTurn2 = new Image();
imageSnakeTurn2.src = imgSnakeTurn2;

import imgSnakeTurn3 from './images/turn_snake_3.png';
let imageSnakeTurn3 = new Image();
imageSnakeTurn3.src = imgSnakeTurn3;

import imgSnakeTurn4 from './images/turn_snake_4.png';
let imageSnakeTurn4 = new Image();
imageSnakeTurn4.src = imgSnakeTurn4;

// queue snake
import imgSnakeLastBodyTop from './images/last_body_snake_top.png';
let imageSnakeLastBodyTop = new Image();
imageSnakeLastBodyTop.src = imgSnakeLastBodyTop;

import imgSnakeLastBodyLeft from './images/last_body_snake_left.png';
let imageSnakeLastBodyLeft = new Image();
imageSnakeLastBodyLeft.src = imgSnakeLastBodyLeft;

import imgSnakeLastBodyRight from './images/last_body_snake_right.png';
let imageSnakeLastBodyRight = new Image();
imageSnakeLastBodyRight.src = imgSnakeLastBodyRight;

import imgSnakeLastBodyBottom from './images/last_body_snake_bottom.png';
let imageSnakeLastBodyBottom = new Image();
imageSnakeLastBodyBottom.src = imgSnakeLastBodyBottom;



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// init game var
const initialPositionSnake = [{
        x: 4,
        y: 1
    },
    {
        x: 3,
        y: 1
    },
    {
        x: 2,
        y: 1
    }, {
        x: 1,
        y: 1
    }
];

const initialPositionApple = {
    x: 10,
    y: 10
};

const initialDirection = 'right';
const initialSpeed = 7;
const gridElem = 25;


let snake = [...initialPositionSnake];
let direction = initialDirection;
let apple = {
    ...initialPositionApple
};
let nextsMoves = [];

let score = 0;
let speed = initialSpeed;
let lastScoreIncreaseSpeed;


// DRAW GAME

const drawMap = () => {
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let c = 0;
    let countColumn = canvas.width / gridElem;

    for (let indexColumn = 0; indexColumn < countColumn; indexColumn++) {
        let l = 0;
        if (indexColumn % 2) {
            l = gridElem;
        } else {
            l = 0;
        }
        for (let indexLine = 0; indexLine < countColumn; indexLine++) {
            ctx.fillStyle = "rgb(29, 29, 29)";
            ctx.fillRect(c, l, gridElem, gridElem);
            l += gridElem + gridElem;
        }

        c += gridElem;
    }
};

const drawSnake = () => {

    for (const index in snake) {
        let currentSnakeItem = snake[index];
        let nextItem = snake[parseFloat(index) + 1];
        let prevItem = snake[index - 1];

        // determine head image
        if (prevItem == undefined) {
            switch (direction) {
                case 'right':
                    ctx.drawImage(imageHeadSnakeRight, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
                    break;
                case 'bottom':
                    ctx.drawImage(imageHeadSnakeBottom, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
                    break;
                case 'left':
                    ctx.drawImage(imageHeadSnakeLeft, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
                    break;
                case 'top':
                    ctx.drawImage(imageHeadSnakeTop, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
                    break;
            }
        }

        // determine last item body image
        else if (nextItem == undefined) {
            if (prevItem.x > currentSnakeItem.x) {
                ctx.drawImage(imageSnakeLastBodyRight, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else if (prevItem.x < currentSnakeItem.x) {
                ctx.drawImage(imageSnakeLastBodyLeft, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else if (prevItem.y < currentSnakeItem.y) {
                ctx.drawImage(imageSnakeLastBodyTop, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else if (prevItem.y > currentSnakeItem.y) {
                ctx.drawImage(imageSnakeLastBodyBottom, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            }
        }

        // determine body image
        else {
            if (currentSnakeItem.x > prevItem.x && currentSnakeItem.y > nextItem.y || currentSnakeItem.x > nextItem.x && currentSnakeItem.y > prevItem.y) {
                ctx.drawImage(imageSnakeTurn3, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else if (currentSnakeItem.x < prevItem.x && currentSnakeItem.y < nextItem.y || currentSnakeItem.x < nextItem.x && currentSnakeItem.y < prevItem.y) {
                ctx.drawImage(imageSnakeTurn1, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else if (currentSnakeItem.x > nextItem.x && currentSnakeItem.y < prevItem.y || currentSnakeItem.x > prevItem.x && currentSnakeItem.y < nextItem.y) {
                ctx.drawImage(imageSnakeTurn2, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else if (currentSnakeItem.x < nextItem.x && currentSnakeItem.y > prevItem.y || currentSnakeItem.x < prevItem.x && currentSnakeItem.y > nextItem.y) {
                ctx.drawImage(imageSnakeTurn4, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else if (currentSnakeItem.x != prevItem.x) {
                ctx.drawImage(imageBodySnake, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else if (currentSnakeItem.y != prevItem.y) {
                ctx.drawImage(imageBodySnakeVertical, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            } else {
                ctx.drawImage(image, currentSnakeItem.x * gridElem, currentSnakeItem.y * gridElem, gridElem, gridElem);
            }
        }
    }
};

const drawApple = () => {
    ctx.drawImage(image, apple.x * gridElem, apple.y * gridElem, gridElem, gridElem);
};

const drawScore = () => {
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.textBaseline = "top";
    ctx.fillText(score, gridElem, gridElem);
};

const updateSnakePosition = () => {
    let newHead;
    switch (direction) {
        case 'right':
            newHead = {
                x: snake[0].x + 1,
                y: snake[0].y
            };
            break;

        case 'bottom':
            newHead = {
                x: snake[0].x,
                y: snake[0].y + 1
            };
            break;

        case 'left':
            newHead = {
                x: snake[0].x - 1,
                y: snake[0].y
            };
            break;

        case 'top':
            newHead = {
                x: snake[0].x,
                y: snake[0].y - 1
            };
            break;
    }

    snake.unshift(newHead);

    if (snakeEatApple()) {
        score++;
        generatePositionAvailableForApple();
    } else {
        snake.pop();
    }
};

// COLISIONS
const snakeColisionWithWall = () => {
    for (const index in snake) {
        const snakeItem = snake[index];
        if (snakeItem.y >= canvas.height / gridElem ||
            snakeItem.y < 0 ||
            snakeItem.x >= canvas.width / gridElem ||
            snakeItem.x < 0) {
            return true;
        }
    }

    return false;
}

const snakeColisionWithBody = () => {
    const [head, ...body] = snake;
    body.shift();

    // check if head has same coordonates of one body item

    for (let bodyElem of body) {
        if (bodyElem.x === head.x && bodyElem.y === head.y) {
            return true;
        }
    }

    return false;
}

const gameover = () => {
    return (snakeColisionWithBody() || snakeColisionWithWall()) ? true : false;
};


// EAT APPLE
const snakeEatApple = () => {
    return (JSON.stringify(snake[0]) === JSON.stringify(apple)) ? true : false;
}

const generatePositionAvailableForApple = () => {
    const {
        x,
        y
    } = {
        x: Math.trunc(Math.random() * canvas.width / gridElem),
        y: Math.trunc(Math.random() * canvas.width / gridElem),
    };


    if (snake.some(snakeItems => JSON.stringify(snakeItems) === JSON.stringify({
            x,
            y
        }))) {
        return generatePositionAvailableForApple();
    } else {
        apple = {
            x: x,
            y: y
        };
    }
}


const move = () => {
    if (!gameover()) {
        if (nextsMoves.length > 0) {
            direction = nextsMoves[0];
            nextsMoves.shift();
        }
        updateSnakePosition();
        drawMap();
        drawSnake();
        drawApple();
        drawScore();
        if (score % 10 === 0 && score != 0 && lastScoreIncreaseSpeed != score) {
            speed += 1;
            lastScoreIncreaseSpeed = score;
        }

        setTimeout(() => {
            requestAnimationFrame(move);
        }, 1000 / speed);

    } else {
        toggleGameOverPopUp();
        document.getElementById('score').innerText = score;
    }

};

const runGame = () => {
    snake = [...initialPositionSnake];
    direction = initialDirection;
    apple = {
        ...initialPositionApple
    };
    nextsMoves = [];

    score = 0;
    speed = initialSpeed;
    lastScoreIncreaseSpeed = 0;
    requestAnimationFrame(move);
}

// EVENTS
// @todo refactoriser
window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp') {
        if (nextsMoves[nextsMoves.length - 1] != 'bottom' && nextsMoves[nextsMoves.length - 1] != 'top') {
            if ((direction === 'bottom' && nextsMoves.length > 0) || (direction === 'top' && nextsMoves.length > 0) || (direction === 'right') || (direction === 'left')) {
                nextsMoves.push('top')
            } else {
                console.log('cant move top 2');
            }
        } else {
            console.log('cant move top 1');
        }
    }
    if (e.key == 'ArrowDown') {
        if (nextsMoves[nextsMoves.length - 1] != 'bottom' && nextsMoves[nextsMoves.length - 1] != 'top') {
            if ((direction === 'bottom' && nextsMoves.length > 0) || (direction === 'top' && nextsMoves.length > 0) || (direction === 'right') || (direction === 'left')) {
                nextsMoves.push('bottom')
            } else {
                console.log('cant move bottom 2');
            }
        } else {
            console.log('cant move bottom 1');
        }
    }

    if (e.key == 'ArrowRight') {
        if (nextsMoves[nextsMoves.length - 1] != 'left' && nextsMoves[nextsMoves.length - 1] != 'right') {
            if ((direction === 'left' && nextsMoves.length > 0) || (direction === 'right' && nextsMoves.length > 0) || (direction === 'bottom') || (direction === 'top')) {
                nextsMoves.push('right')
            } else {
                console.log('cant move right 2');
            }
        } else {
            console.log('cant move right 1');
        }
    }

    if (e.key == 'ArrowLeft') {
        if (nextsMoves[nextsMoves.length - 1] != 'left' && nextsMoves[nextsMoves.length - 1] != 'right') {
            if ((direction === 'left' && nextsMoves.length > 0) || (direction === 'right' && nextsMoves.length > 0) || (direction === 'bottom') || (direction === 'top')) {
                nextsMoves.push('left')
            } else {
                console.log('cant move left 2');
            }
        } else {
            console.log('cant move left 1');
        }
    }
})

document.getElementById('btn-play-game').addEventListener('click', (e) => {
    runGame();
    hideStartPopUp();
});

document.getElementById('btn-replay-game').addEventListener('click', (e) => {
    runGame();
    toggleGameOverPopUp();
});

window.addEventListener('load', (e) => {
    drawMap();
    drawScore();
}); 


// DESPLAY POPUP
const hideStartPopUp = () => {
    document.querySelector('.container-popup__start').classList.add('hide');
}

const toggleGameOverPopUp = () => {
    document.querySelector('.container-popup__game-over').classList.toggle('hide');
}