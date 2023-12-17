const bord = document.getElementById("gamebord");
const intra=document.getElementsByClassName('instruction')[0];
const logo=document.getElementsByClassName('logo')[0];
const scores=document.getElementById('score');

let snake = [{ x: 10, y: 10 }];
let food = genfood();
let gamestared = false;
const gridSize = 20;
let direction='right'
let gameInterval;
let gameSpeedDelay = 200;
let score=0

function draw() {
  bord.innerHTML = "";
  drawsnak();
  drawfood()
}

const drawsnak = () => {
  snake.forEach((e) => {
    const element = creategameelement("div", "snake");
    setposition(element, e);
    bord.appendChild(element);
  });
};

function creategameelement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const setposition = (element, segment) => {
  element.style.gridColumn = segment.x;
  element.style.gridRow = segment.y;
};

function drawfood() {
  if (gamestared) {
    const foodelement = creategameelement("div", "food");
    setposition(foodelement, food);
    bord.appendChild(foodelement);
  }
}

function genfood() {
  const x = Math.floor(Math.random() * 20) + 1;
  const y = Math.floor(Math.random() * 20) + 1;
  return { x, y };
}

const move = () => {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y -= 1;
      break;
    case "down":
      head.y += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "right":
      head.x += 1;
      break;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food = genfood();
    score+=1;
    scores.innerHTML=score
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
};



function increaseSpeed() {
  //   console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = genfood();
  direction = 'right';
  gameSpeedDelay = 200;
  // updateScore();
}

function stopGame() {
  clearInterval(gameInterval);
  gamestared = false;
  intra.style.display = 'block';
  logo.style.display = 'block';
}

function handleKeyPress(event) {
  if (
    (!gamestared && event.code === 'Space') ||
    (!gamestared && event.key === ' ')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function startGame() {
  intra.style.display = 'none';
  logo.style.display = 'none';
  gamestared = true; 
  gameInterval = setInterval(() => {
    move();
    drawfood();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// startGame()
