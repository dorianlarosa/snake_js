import './style.scss';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// init game var
const initialPositionSnake = [{
        x: 9,
        y: 9
    },
    {
        x: 8,
        y: 9
    },
    {
        x: 7,
        y: 9
    }, {
        x: 6,
        y: 9
    }
];
const initialDirection = 'est';
const gridElem = 40;

let snake = [...initialPositionSnake];
let apple = [5, 5];
let direction = initialDirection;
let queueDirection = initialDirection;
let nextsMoves = [];
let speed = 50;
let stopGame = false;
let start;


const drawMap = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawSnake = () => {
    ctx.fillStyle = "blue";

    for (const index in snake) {
        const itemCoordonates = snake[index];
        ctx.fillRect(itemCoordonates.x * gridElem, itemCoordonates.y * gridElem, gridElem, gridElem);
    }
};

const drawApple = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
};

const updateSnakePosition = () => {
    let newHead;

    switch (direction) {
        case 'est':
            newHead = {
                x: snake[0].x + 1,
                y: snake[0].y
            };
            break;

        case 'south':
            newHead = {
                x: snake[0].x,
                y: snake[0].y + 1
            };
            break;

        case 'west':
            newHead = {
                x: snake[0].x - 1,
                y: snake[0].y
            };
            break;

        case 'north':
            newHead = {
                x: snake[0].x,
                y: snake[0].y - 1
            };
            break;
    }

    snake.unshift(newHead);
    snake.pop();

};

const checkSnakeColisionWithWall = () => {
    for (const index in snake) {
        const snakeItem = snake[index];
        if (snakeItem.y >= canvas.height / gridElem ||
            snakeItem.y < 0 ||
            snakeItem.x >= canvas.width / gridElem ||
            snakeItem.x < 0) {
            loseGame();
        }
    }
}

const checkSnakeColisionWithBody = () => {
    let head = snake[0];
    let body = [...snake];
    body.shift();

    // check if head has same coordonates of one body item
    for (const index in body) {
        body.filter(bodyItem => {
            if (JSON.stringify(bodyItem) === JSON.stringify(head)) loseGame();
        })
    }
}

const movementIsPossible = (directionWant) => {
    let notAutorisedDirection = [];
    let autorisedDirection = [];

    switch (directionWant) {
        case 'est':
            notAutorisedDirection.push("est");
            notAutorisedDirection.push("west");
            autorisedDirection.push("south");
            autorisedDirection.push("north");

            break;

        case 'south':
            notAutorisedDirection.push("south");
            notAutorisedDirection.push("north");
            autorisedDirection.push("est");
            autorisedDirection.push("west");
            break;

        case 'west':
            notAutorisedDirection.push("est");
            notAutorisedDirection.push("west");
            autorisedDirection.push("south");
            autorisedDirection.push("north");
            break;

        case 'north':
            notAutorisedDirection.push("south");
            notAutorisedDirection.push("north");
            autorisedDirection.push("est");
            autorisedDirection.push("west");
            break;
    }

    if (nextsMoves[nextsMoves.length - 1] != notAutorisedDirection[0] && nextsMoves[nextsMoves.length - 1] != notAutorisedDirection[1]) {
        if ((direction === notAutorisedDirection[0] && nextsMoves.length > 0) || (direction === notAutorisedDirection[0] && nextsMoves.length > 0) || (direction === autorisedDirection[0]) || (direction === autorisedDirection[0]) ) {
            nextsMoves.push(directionWant)
        } else {
            console.log('cant move 2 '+ directionWant);
        }
    } else {
        console.log('cant move 1 '+ directionWant);
    }
};

const loseGame = () => {
    snake = [...initialPositionSnake];
    direction = initialDirection;
    stopGame = true;
}

const move = (timestamp) => {
    if (!start) start = timestamp;
    const x = ((timestamp - start) / 1000) * speed;

    if (x > 10) {
        if (nextsMoves.length > 0) {
            direction = nextsMoves[0];
            nextsMoves.shift();
        }
        updateSnakePosition();
        checkSnakeColisionWithWall();
        checkSnakeColisionWithBody();
        drawMap();
        drawSnake();
        drawApple();
        start = null;
    }
    if (!stopGame) requestAnimationFrame(move);
};
requestAnimationFrame(move);

// @todo refactoriser
window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp') {
        if (nextsMoves[nextsMoves.length - 1] != 'south' && nextsMoves[nextsMoves.length - 1] != 'north') {
            if ((direction === 'south' && nextsMoves.length > 0) || (direction === 'north' && nextsMoves.length > 0) || (direction === 'est') || (direction === 'west') ) {
                nextsMoves.push('north')
            } else {
                console.log('cant move north 2');
            }
        } else {
            console.log('cant move north 1');
        }
    }
    if (e.key == 'ArrowDown') {
        if (nextsMoves[nextsMoves.length - 1] != 'south' && nextsMoves[nextsMoves.length - 1] != 'north') {
            if ((direction === 'south' && nextsMoves.length > 0) || (direction === 'north' && nextsMoves.length > 0) || (direction === 'est') || (direction === 'west') ) {
                nextsMoves.push('south')
            } else {
                console.log('cant move south 2');
            }
        } else {
            console.log('cant move south 1');
        }
    }

    if (e.key == 'ArrowRight') {
        if (nextsMoves[nextsMoves.length - 1] != 'west' && nextsMoves[nextsMoves.length - 1] != 'est') {
            if ((direction === 'west' && nextsMoves.length > 0) || (direction === 'est' && nextsMoves.length > 0) || (direction === 'south') || (direction === 'north') ) {
                nextsMoves.push('est')
            } else {
                console.log('cant move est 2');
            }
        } else {
            console.log('cant move est 1');
        }
    }

    if (e.key == 'ArrowLeft') {
        if (nextsMoves[nextsMoves.length - 1] != 'west' && nextsMoves[nextsMoves.length - 1] != 'est') {
            console.log(direction);
            console.log(nextsMoves);
            if ((direction === 'west' && nextsMoves.length > 0) || (direction === 'est' && nextsMoves.length > 0) || (direction === 'south') || (direction === 'north') ) {
                nextsMoves.push('west')
            } else {
                console.log('cant move west 2');
            }
        } else {
            console.log('cant move west 1');
        }
    }
    console.log(nextsMoves);
})


// window.addEventListener('keydown', (e) => {
//     if (e.key == 'ArrowUp' && direction != 'south') nextsMoves.push('north');
//     if (e.key == 'ArrowDown' && direction != 'north') nextsMoves.push('south');
//     if (e.key == 'ArrowRight' && direction != 'west') nextsMoves.push('est');
//     if (e.key == 'ArrowLeft' && direction != 'est') nextsMoves.push('west');

// })