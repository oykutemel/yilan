document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector(".game-container");
  const snakeHead = document.getElementById("snake-head");
  const food = document.getElementById("food");

  let snake = [{ x: 0, y: 0 }];
  let direction = "right";
  let foodPosition = getRandomPosition();

  function getRandomPosition() {
    const x = Math.floor(Math.random() * 15) * 20;
    const y = Math.floor(Math.random() * 15) * 20;
    return { x, y };
  }

  function update() {
    let newHead;

    switch (direction) {
      case "up":
        newHead = { x: snake[0].x, y: snake[0].y - 20 };
        break;
      case "down":
        newHead = { x: snake[0].x, y: snake[0].y + 20 };
        break;
      case "left":
        newHead = { x: snake[0].x - 20, y: snake[0].y };
        break;
      case "right":
        newHead = { x: snake[0].x + 20, y: snake[0].y };
        break;
    }

    snake.unshift(newHead);

    if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
      foodPosition = getRandomPosition();
    } else {
      snake.pop();
    }

    if (
      newHead.x < 0 ||
      newHead.x >= 300 ||
      newHead.y < 0 ||
      newHead.y >= 300 ||
      checkCollision(newHead)
    ) {
      alert("Game Over!");
      resetGame();
    }

    updateGameBoard();
  }

  function updateGameBoard() {
    snakeHead.style.left = `${snake[0].x}px`;
    snakeHead.style.top = `${snake[0].y}px`;

    food.style.left = `${foodPosition.x}px`;
    food.style.top = `${foodPosition.y}px`;

    const segments = document.querySelectorAll(".snake-segment");
    segments.forEach((segment) => segment.remove());

    for (let i = 1; i < snake.length; i++) {
      const bodySegment = document.createElement("div");
      bodySegment.className = "snake-segment";
      bodySegment.style.left = `${snake[i].x}px`;
      bodySegment.style.top = `${snake[i].y}px`;
      gameContainer.appendChild(bodySegment);
    }
  }

  function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    snake = [{ x: 0, y: 0 }];
    direction = "right";
    foodPosition = getRandomPosition();

    const segments = document.querySelectorAll(".snake-segment");
    segments.forEach((segment) => segment.remove());

    updateGameBoard();
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  });

  setInterval(update, 150);
});
