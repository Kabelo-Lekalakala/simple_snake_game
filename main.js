//////////////////////////////////////////////////////////////////////////////////////
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
const button = document.getElementById("btn");
//////////////////////////////////////////////////////////////////////////////////////

class Rectangle {
    constructor(xCord = 0, yCord = 0, unit = 20) {
        this.xCord = xCord;
        this.yCord = yCord;
        this.unit = unit;
    }
    drawSnake(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.xCord, this.yCord, this.unit, this.unit);
    }
}

const gridSize = 20;
const Player = new Rectangle(0, 0, gridSize, gridSize);

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
    x: Player.xCord,
    y: Player.yCord
}

let snakeX = snake[0].x;
let snakeY = snake[0].y;

function boundary() {
    if (Player.yCord || Player.yCord > 500 || Player.xCord < 0 || Player.xCord > 500) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function whereYOUat() {
    console.log(`xPosition: ${Player.xCord},yPosition: ${Player.yCord}`);
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

function moveDirection() {
    if (direction === "right") Player.xCord += gridSize;
    if (direction === "left") Player.xCord -= gridSize;
    if (direction === "up") Player.yCord -= gridSize;
    if (direction === "down") Player.yCord += gridSize;
}

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = snakeColour;
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }
    Player.drawSnake(ctx);
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
        x: Player.xCord,
        y: Player.yCord
    }
    snake.unshift(newHead);
}




///////////////////////////////////////////////////////////////////////////


// Start movement every 100ms 
function startGame() {
    if (!movementInterval) {
        movementInterval = setInterval(() => {
            clear();
            moveDirection();
            drawSnake();
            whereYOUat();
            checkScore();
            ctx.fillStyle = foodColour;
            ctx.fillRect(food.x, food.y, gridSize, gridSize);
            // boundary();
        }, 100);
    }

}

///////////////////////////////////////////////////////////////////////////////

document.getElementById("btn").addEventListener("click", startGame);
