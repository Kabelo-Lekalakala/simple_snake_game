//////////////////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
const button = document.getElementById("btn");
//////////////////////////////////////////////////////////////////////////////////////

const gridSize = 20;
let score;

function randFood(min, max) {
    const randNum = Math.round((Math.random() * (max - min) + min) / gridSize) * gridSize;
    return randNum
}

let foodX;
let foodY;
let foodColour = "red";

let food = {
    x: randFood(0, canvas.width - gridSize),
    y: randFood(0, canvas.width - gridSize)
}

const keys = {};
let movementInterval = null;
let direction = "right";

let snakeColour = "green";
let snake = [];
snake[0] =
{
    x: 0,
    y: 0
}

let snakeX = snake[0].x;
let snakeY = snake[0].y;

function boundary() {
    if (snakeY < 0 || snakeY > 500 || snakeX < 0 || snakeX > 500) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function whereYOUat() {
    console.log(`xPosition: ${snakeX},yPosition: ${snakeY}`);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "l" && direction !== "left") direction = "right";
    if (event.key === "h" && direction !== "right") direction = "left";
    if (event.key === "k" && direction !== "down") direction = "up";
    if (event.key === "j" && direction !== "up") direction = "down";
});

function moveSnake() {
    if (direction === "right") snakeX += gridSize;
    if (direction === "left") snakeX -= gridSize;
    if (direction === "up") snakeY -= gridSize;
    if (direction === "down") snakeY += gridSize;
}

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = snakeColour;
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }
}

function checkScore() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        score += 1;
        food = {
            x: randFood(0, canvas.width - gridSize),
            y: randFood(0, canvas.width - gridSize)
        }
    }
    else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}




///////////////////////////////////////////////////////////////////////////


// Start movement every 1 second
function startGame() {
    if (!movementInterval) {
        movementInterval = setInterval(() => {
            clear();
            moveSnake();
            drawSnake();
            whereYOUat();
            checkScore();
            ctx.fillStyle = foodColour;
            ctx.fillRect(food.x, food.y, gridSize, gridSize);
            boundary();
        }, 100);
    }

}

///////////////////////////////////////////////////////////////////////////////

document.getElementById("btn").addEventListener("click", startGame);
