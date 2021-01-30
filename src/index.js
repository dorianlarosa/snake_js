import './style.scss';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const gridElem = 40;
const snake = [
    [9, 9],
    [8, 9],
    [7, 9]
];
let apple = [5, 5];
let direction = 'est';
let speed = 30;
let start;


const drawMap = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawSnake = () => {
    ctx.fillStyle = "blue";

    for (const index in snake) {
        const itemCoordonates = snake[index];
        ctx.fillRect(itemCoordonates[0] * gridElem, itemCoordonates[1] * gridElem, gridElem, gridElem);
    }
};

const drawApple = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
};


const updateSnakeposition = () => {
    let indexSnake = 0;
    let newHead;

    switch (direction) {
        case 'est':
            newHead = [snake[0][0] + 1, snake[0][1]];
            break;
            
        case 'south':
            newHead = [snake[0][0], snake[0][1] + 1];
            break;

        case 'west':
            newHead = [snake[0][0] - 1, snake[0][1]];
            break;

        case 'north':
            newHead = [snake[0][0], snake[0][1] - 1];
            break;
    }

    snake.unshift(newHead);
    snake.pop();
};

const move = (timestamp) => {
    if (!start) start = timestamp;
    const x = ((timestamp - start) / 1000) * speed;

    if (x > 10) {
        updateSnakeposition();
        drawMap();
        drawSnake();
        drawApple();
        start = 0;
    }

    requestAnimationFrame(move);
};
requestAnimationFrame(move);


window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp' && direction != 'south') direction = 'north';
    if (e.key == 'ArrowDown' && direction != 'north') direction = 'south';
    if (e.key == 'ArrowRight' && direction != 'west') direction = 'est';
    if (e.key == 'ArrowLeft' && direction != 'est') direction = 'west';
})